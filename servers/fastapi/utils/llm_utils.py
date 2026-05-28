import asyncio
import json
import logging
import re
from collections.abc import AsyncGenerator, Sequence
from typing import Any, Optional

import dirtyjson
from fastapi import HTTPException
from llmai.shared import (
    JSONSchemaResponse,
    LLMTool,
    Message,
    ResponseFormat,
    UserMessage,
    normalize_content_parts,
)
from llmai.shared.schema import get_schema_as_dict

from utils.llm_config import get_extra_body
from utils.llm_provider import is_custom_llm_selected
from utils.schema_utils import (
    get_schema_validation_errors,
    relax_length_constraints,
)


LOGGER = logging.getLogger(__name__)


def _provider_lacks_native_json_schema_support() -> bool:
    """Some OpenAI-compatible endpoints (notably Volcengine ARK's GLM/Doubao
    coding-plan models) reject both `response_format.type=json_schema` *and*
    `json_object`. For those providers we drop `response_format` entirely and
    inline the JSON Schema into the prompt; downstream `extract_structured_content`
    parses the raw text via `dirtyjson` as a safety net."""
    try:
        return is_custom_llm_selected()
    except Exception:
        return False


def _build_schema_instruction_message(
    response_format: JSONSchemaResponse,
) -> UserMessage:
    schema_dict = get_schema_as_dict(
        response_format.json_schema,
        strict=response_format.strict,
    )
    schema_text = json.dumps(schema_dict, ensure_ascii=False)
    return UserMessage(
        content=(
            "请只返回符合下面 JSON Schema 的 JSON 对象本身，"
            "不要包含解释、Markdown 代码块、或任何前后缀文本。\n"
            f"JSON Schema:\n{schema_text}"
        )
    )


def get_generate_kwargs(
    model: str,
    messages: Sequence[Message],
    max_tokens: Optional[int] = None,
    tools: Optional[list[LLMTool]] = None,
    response_format: Optional[ResponseFormat] = None,
    stream: bool = False,
) -> dict[str, Any]:
    final_messages: list[Message] = list(messages)
    final_response_format = response_format

    if (
        isinstance(response_format, JSONSchemaResponse)
        and _provider_lacks_native_json_schema_support()
    ):
        final_messages.append(_build_schema_instruction_message(response_format))
        final_response_format = None

    kwargs: dict[str, Any] = {
        "model": model,
        "messages": final_messages,
        "stream": stream,
    }
    if max_tokens is not None:
        kwargs["max_tokens"] = max_tokens
    if tools:
        kwargs["tools"] = tools
    if final_response_format is not None:
        kwargs["response_format"] = final_response_format

    extra_body = get_extra_body()
    if extra_body:
        kwargs["extra_body"] = extra_body

    return kwargs


def structured_validation_feedback_user_message(
    content: dict,
    validation_errors: list[str],
) -> UserMessage:
    max_error_count = 10
    max_json_chars = 6000

    formatted_errors = validation_errors[:max_error_count]
    if len(validation_errors) > max_error_count:
        formatted_errors.append(
            f"...and {len(validation_errors) - max_error_count} more validation errors."
        )

    previous_response = json.dumps(
        content,
        ensure_ascii=False,
        indent=2,
        default=str,
    )
    if len(previous_response) > max_json_chars:
        previous_response = previous_response[:max_json_chars] + "\n... (truncated)"

    return UserMessage(
        content=(
            "The previous JSON response did not match the required response schema.\n\n"
            "Validation errors:\n"
            + "\n".join(f"- {error}" for error in formatted_errors)
            + "\n\nPrevious invalid JSON:\n"
            + f"```json\n{previous_response}\n```\n\n"
            + "Return corrected JSON only. Make sure it fully matches the required schema."
        )
    )


async def generate_structured_with_schema_retries(
    client: Any,
    model: str,
    *,
    messages: Sequence[Message],
    response_format: ResponseFormat,
    json_schema: dict,
    strict: bool = False,
    validate_schema: bool = False,
    validate_schema_max_loop_count: int = 4,
) -> dict:
    """
    Parse retries (inner loop) plus optional JSON Schema validation feedback loops (outer loop),
    matching the overflow-mitigation behavior from structured generation with validate_schema.
    """
    max_validation_loops = max(1, validate_schema_max_loop_count)
    working_messages: list[Message] = list(messages)

    # Providers without native structured output can't reliably honor length bounds;
    # validating against them only causes endless retry loops, so relax those here.
    validation_schema = json_schema
    if _provider_lacks_native_json_schema_support():
        validation_schema = relax_length_constraints(json_schema)

    for validation_attempt in range(max_validation_loops):
        content: Optional[dict] = None
        for attempt in range(3):
            response = await asyncio.to_thread(
                client.generate,
                **get_generate_kwargs(
                    model=model,
                    messages=working_messages,
                    response_format=response_format,
                ),
            )
            content = extract_structured_content(response.content)
            if content is not None:
                break
            if attempt < 2:
                await asyncio.sleep(0.5 * (attempt + 1))

        if content is None:
            raise HTTPException(
                status_code=400,
                detail="LLM did not return any content",
            )

        if not validate_schema:
            return content

        validation_errors = get_schema_validation_errors(
            validation_schema,
            content,
            strict=strict,
        )

        if not validation_errors:
            return content

        formatted_validation_errors = " | ".join(validation_errors)
        if validation_attempt == max_validation_loops - 1:
            LOGGER.warning(
                "Validation error after max fixes, returning last response: %s",
                formatted_validation_errors,
            )
            return content

        LOGGER.warning(
            "Validation error, attempting fix %s/%s: %s",
            validation_attempt + 1,
            max_validation_loops - 1,
            formatted_validation_errors,
        )
        working_messages.append(
            structured_validation_feedback_user_message(content, validation_errors)
        )

    raise HTTPException(status_code=400, detail="LLM did not return any content")


def extract_text(content: Any) -> Optional[str]:
    if content is None:
        return None
    if isinstance(content, str):
        return content
    if isinstance(content, Sequence) and not isinstance(content, (bytes, bytearray)):
        parts: list[str] = []
        for part in content:
            if isinstance(part, str):
                parts.append(part)
                continue
            text = getattr(part, "text", None)
            if isinstance(text, str):
                parts.append(text)
        joined = "".join(parts)
        return joined or None
    text = getattr(content, "text", None)
    if isinstance(text, str):
        return text
    return None


_CODE_FENCE_RE = re.compile(r"```(?:json)?\s*(.*?)\s*```", re.DOTALL | re.IGNORECASE)
_THINK_BLOCK_RE = re.compile(r"<think\b[^>]*>.*?</think>", re.DOTALL | re.IGNORECASE)


def _strip_to_json_payload(raw_text: str) -> str:
    """Best-effort extraction of a JSON object/array from model output that may be
    wrapped in a markdown code fence, padded with prose, or prefixed by a
    `<think>...</think>` reasoning block. Common with providers lacking native
    structured output (Volcengine ARK GLM/Doubao) or reasoning models proxied
    through OpenAI-compatible gateways (e.g. gpt-5.x that emit <think> inline)."""
    text = _THINK_BLOCK_RE.sub("", raw_text).strip()
    fence_match = _CODE_FENCE_RE.search(text)
    if fence_match:
        candidate = fence_match.group(1).strip()
        if candidate:
            return candidate
    starts = [i for i in (text.find("{"), text.find("[")) if i != -1]
    if not starts:
        return text
    start = min(starts)
    end = max(text.rfind("}"), text.rfind("]"))
    if end > start:
        return text[start : end + 1]
    return text


def extract_structured_content(content: Any) -> Optional[dict]:
    if content is None:
        return None
    if isinstance(content, dict):
        return content
    if hasattr(content, "model_dump"):
        dumped = content.model_dump(mode="json")
        if isinstance(dumped, dict):
            return dumped

    raw_text = extract_text(content)
    if not raw_text:
        return None

    for candidate in (raw_text, _strip_to_json_payload(raw_text)):
        try:
            parsed = dirtyjson.loads(candidate)
        except Exception:
            continue
        if isinstance(parsed, dict):
            return dict(parsed)
    return None


def serialize_structured_content(content: Any) -> Optional[str]:
    parsed = extract_structured_content(content)
    if parsed is not None:
        return json.dumps(parsed, ensure_ascii=False)

    raw_text = extract_text(content)
    if raw_text:
        return raw_text
    return None


def message_content_to_text(content: Sequence[Any] | str | None) -> Optional[str]:
    joined = "".join(
        part.text
        for part in normalize_content_parts(content)
        if isinstance(getattr(part, "text", None), str)
    )
    return joined or None


async def stream_generate_events(client: Any, **kwargs) -> AsyncGenerator[Any, None]:
    loop = asyncio.get_running_loop()
    queue: asyncio.Queue[Any] = asyncio.Queue()
    sentinel = object()

    def worker():
        try:
            for event in client.generate(**kwargs):
                loop.call_soon_threadsafe(queue.put_nowait, event)
        except Exception as exc:
            loop.call_soon_threadsafe(queue.put_nowait, exc)
        finally:
            loop.call_soon_threadsafe(queue.put_nowait, sentinel)

    worker_task = asyncio.create_task(asyncio.to_thread(worker))
    try:
        while True:
            item = await queue.get()
            if item is sentinel:
                break
            if isinstance(item, Exception):
                raise item
            yield item
    finally:
        await worker_task
