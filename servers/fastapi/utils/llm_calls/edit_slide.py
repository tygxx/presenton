from datetime import datetime
from typing import Optional

from llmai import get_client
from llmai.shared import JSONSchemaResponse, Message, SystemMessage, UserMessage
from models.presentation_layout import SlideLayoutModel
from models.sql.slide import SlideModel
from utils.llm_config import get_llm_config
from utils.llm_client_error_handler import handle_llm_client_exceptions
from utils.llm_utils import generate_structured_with_schema_retries
from utils.llm_provider import get_model
from utils.schema_utils import (
    add_field_in_schema,
    ensure_array_schemas_have_items,
    remove_fields_from_schema,
)


def _has_cjk(text: Optional[str]) -> bool:
    """Lightweight heuristic: True if text contains a meaningful share of CJK characters."""
    if not text:
        return False
    cjk = 0
    total = 0
    for ch in str(text):
        if ch.isspace():
            continue
        total += 1
        code = ord(ch)
        if (
            0x4E00 <= code <= 0x9FFF
            or 0x3000 <= code <= 0x303F
            or 0xFF00 <= code <= 0xFFEF
        ):
            cjk += 1
    if total == 0:
        return False
    return (cjk / total) >= 0.15


def _resolve_prompt_language(
    language: Optional[str], content: Optional[str] = None
) -> str:
    s = "" if language is None else str(language).strip()
    if s and s.lower() not in {"auto", "auto-detect"}:
        return s
    if _has_cjk(content):
        return "Chinese (Simplified) — keep all field values in 简体中文"
    return "auto-detect"


def get_system_prompt(
    tone: Optional[str] = None,
    verbosity: Optional[str] = None,
    instructions: Optional[str] = None,
    memory_context: Optional[str] = None,
):
    memory_block = (
        "\n    # Retrieved Presentation Memory Context\n"
        f"    {memory_context}\n"
        "    - Use this context only if it is relevant to the user prompt.\n"
        "    - Prefer this context over assumptions when resolving ambiguity.\n"
        if memory_context
        else ""
    )

    return f"""
    Edit Slide data and speaker note based on provided prompt, follow mentioned steps and notes and provide structured output.

    {"# User Instruction:" if instructions else ""}
    {instructions or ""}

    {"# Tone:" if tone else ""}
    {tone or ""}

    {"# Verbosity:" if verbosity else ""}
    {verbosity or ""}

    # Notes
    - Provide output in language mentioned in **Input** (see **Slide Content Language**).
    - All field values in the output (titles, body text, labels, speaker note, etc.) must use the **Slide Content Language**.
    - Exception: icon/image search queries (**Icon queries**, fields like __icon_query__) and **Image prompts** (e.g. __image_prompt__) must always be written in **English** noun phrases, even when the slide content language is not English, so they match English asset libraries.
    - The goal is to change Slide data based on the provided prompt.
    - Do not change **Image prompts** and **Icon queries** if not asked for in prompt.
    - Generate **Image prompts** and **Icon queries** if asked to generate or change in prompt.
    - Make sure to follow language guidelines.
    - Speaker note should be normal text, not markdown.
    - Speaker note should be simple, clear, concise and to the point.
    {memory_block}

    **Go through all notes and steps and make sure they are followed, including mentioned constraints**
    """


def get_user_prompt(prompt: str, slide_data: dict, language: str):
    # Fall back to detecting the language from the existing slide data (and the
    # user's prompt) so CJK slides keep their language even when none is passed.
    detection_source = f"{slide_data}\n{prompt}"
    display_language = _resolve_prompt_language(language, detection_source)
    return f"""
        ## Icon Query And Image Prompt Language
        English (icon/image search queries and image prompts must always be English noun phrases, even when the slide content is in another language)

        ## Current Date and Time
        {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}

        ## Slide Content Language
        {display_language}

        ## Prompt
        {prompt}

        ## Slide data
        {slide_data}
    """


def get_messages(
    prompt: str,
    slide_data: dict,
    language: Optional[str],
    tone: Optional[str] = None,
    verbosity: Optional[str] = None,
    instructions: Optional[str] = None,
    memory_context: Optional[str] = None,
) -> list[Message]:
    return [
        SystemMessage(
            content=get_system_prompt(tone, verbosity, instructions, memory_context),
        ),
        UserMessage(
            content=get_user_prompt(prompt, slide_data, language),
        ),
    ]


async def get_edited_slide_content(
    prompt: str,
    slide: SlideModel,
    language: Optional[str],
    slide_layout: SlideLayoutModel,
    tone: Optional[str] = None,
    verbosity: Optional[str] = None,
    instructions: Optional[str] = None,
    memory_context: Optional[str] = None,
):
    model = get_model()

    response_schema = remove_fields_from_schema(
        slide_layout.json_schema, ["__image_url__", "__icon_url__"]
    )
    response_schema = add_field_in_schema(
        response_schema,
        {
            "__speaker_note__": {
                "type": "string",
                "minLength": 100,
                "maxLength": 500,
                "description": "Speaker note for the slide",
            }
        },
        True,
    )
    response_schema = ensure_array_schemas_have_items(response_schema)

    client = get_client(config=get_llm_config())
    try:
        response_format = JSONSchemaResponse(
            name="response",
            json_schema=response_schema,
            strict=False,
        )
        messages = get_messages(
            prompt,
            slide.content,
            language,
            tone,
            verbosity,
            instructions,
            memory_context,
        )

        return await generate_structured_with_schema_retries(
            client,
            model,
            messages=messages,
            response_format=response_format,
            json_schema=response_schema,
            strict=False,
            validate_schema=True,
        )

    except Exception as e:
        raise handle_llm_client_exceptions(e)
