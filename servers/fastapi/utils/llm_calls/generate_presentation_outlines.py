from datetime import datetime
from typing import Optional

from llmai import get_client
from llmai.shared import (
    JSONSchemaResponse,
    Message,
    ResponseStreamCompletionChunk,
    SystemMessage,
    UserMessage,
    WebSearchTool,
)

from models.presentation_outline_model import PresentationOutlineModel
from utils.get_dynamic_models import get_presentation_outline_model_with_n_slides
from utils.llm_client_error_handler import handle_llm_client_exceptions
from utils.llm_config import enable_web_grounding, get_llm_config
from utils.llm_provider import get_model
from utils.llm_utils import (
    get_generate_kwargs,
    serialize_structured_content,
    stream_generate_events,
)
from utils.schema_utils import prepare_schema_for_validation


def get_system_prompt(
    verbosity: Optional[str] = None,
    include_title_slide: bool = True,
    include_table_of_contents: bool = False,
):
    verbosity_instruction = (
        "Slide content should be around 20 words but detailed enough to generate a good slide."
        if verbosity == "concise"
        else (
            "Slide content should be around 60 words but detailed enough to generate a good slide."
            if verbosity == "text-heavy"
            else "Slide content should be around 40 words but detailed enough to generate a good slide."
        )
    )

    title_slide_instruction = (
        "Include presenter name in first slide."
        if include_title_slide
        else "Do not include presenter name in any slides."
    )

    toc_instruction = (
        "Include a table of contents slide in the outline sequence."
        if include_table_of_contents
        else ""
    )
    toc_block = f"{toc_instruction}\n" if toc_instruction else ""

    slide_outline_structure = (
        "Each slide content:\n"
        "   - Must have a ## title.\n"
        # "   - Must have content either in multiple bullet points or table or both.\n"
        "   - Must be in Markdown format.\n"
        "   - Don't use **bold** and __italic__ text."
        "   - First slide title must be the same as the presentation title."
    )

    system = (
        "Generate presentation title and content for slides.\n"
        "Generate flow based on user **content** and use **context** just for reference.\n"
        "Presentation title should be plain text, not markdown. It should be a concise title for the presentation.\n"
        "Each slide content should contain the content for that slide.\n"
        f"{verbosity_instruction}\n"
        "Follow user instructions strictly and literally without reinterpretation or generalization.\n"
        "Apply slide-specific instructions only to the exact slide mentioned and only once. "
        "Do not apply patterns across multiple slides unless explicitly requested. "
        "Resolve ambiguous instructions using the most direct interpretation.\n"
        "Follow the user's specified tone across all slides. "
        "Maintain clarity, readability, and factual accuracy. "
        "If no tone is provided, use a clear and professional style. "
        "Ensure logical flow between slides and avoid repetition or generic filler content.\n"
        "Include numerical data, tables or code if required or asked by the user.\n"
        "When the Number of Slides is 'auto-detect', infer a suitable count from the depth of the "
        "content/context and prefer a thorough, well-developed deck over a sparse one: for a normal "
        "topic aim for roughly 10-15 slides (more when the material is rich), and only produce fewer "
        "when the content is genuinely minimal. Never produce fewer than 8 slides for a substantive topic.\n"
        f"{title_slide_instruction}\n"
        f"{toc_block}"
        f"{slide_outline_structure}\n"
        "Slide content must not contain any presentation branding/styling information.\n"
        "Title slide must only contain title, presenter name, date and overview.\n"
        "Only include URLs if they appear in the provided content/context.\n"
        "Make sure data used is strictly from the provided content/context.\n"
        "Make sure data is consistent across all slides."
        "Write the presentation title and every slide's content in the **Language** specified in the user message; "
        "do not translate the output to English when another language is requested.\n"
        "Use the web search tool when the user request requires current, factual, or external information.\n"
        "If the answer may be outdated or uncertain, prefer using the web search tool.\n"
    )

    return system


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
    # No explicit language: infer it from the content rather than leaving it to
    # the model. Declaring the target language explicitly stops CJK input from
    # drifting into English output.
    if _has_cjk(content):
        return "Chinese (Simplified) — write all titles and slide content in 简体中文"
    return "auto-detect"


def _resolve_prompt_n_slides(n_slides: Optional[int]) -> str:
    if n_slides is None:
        return "auto-detect"
    return str(n_slides)


def get_user_prompt(
    content: str,
    n_slides: Optional[int],
    language: Optional[str],
    additional_context: Optional[str] = None,
    tone: Optional[str] = None,
    instructions: Optional[str] = None,
    include_title_slide: bool = True,
    include_table_of_contents: bool = False,
):
    display_language = _resolve_prompt_language(language, content)
    display_slides = _resolve_prompt_n_slides(n_slides)
    toc_text = f"Include Table Of Contents: {str(include_table_of_contents).lower()}\n"
    return (
        f"Content: {content or ''}\n"
        f"Number of Slides: {display_slides}\n"
        f"Language: {display_language} (write the presentation title and all slide content in this language)\n"
        f"Tone: {tone or ''}\n"
        f"Today's Date: {datetime.now().strftime('%Y-%m-%d')}\n"
        f"Include Title Slide: {include_title_slide}\n"
        f"{toc_text if include_table_of_contents else ''}"
        f"Instructions: {instructions or ''}\n"
        f"Context: {additional_context or 'None'}\n"
    )


def get_messages(
    content: str,
    n_slides: Optional[int],
    language: Optional[str],
    additional_context: Optional[str] = None,
    tone: Optional[str] = None,
    verbosity: Optional[str] = None,
    instructions: Optional[str] = None,
    include_title_slide: bool = True,
    include_table_of_contents: bool = False,
) -> list[Message]:
    return [
        SystemMessage(
            content=get_system_prompt(
                verbosity,
                include_title_slide,
                include_table_of_contents,
            ),
        ),
        UserMessage(
            content=get_user_prompt(
                content,
                n_slides,
                language,
                additional_context,
                tone,
                instructions,
                include_title_slide,
                include_table_of_contents,
            ),
        ),
    ]


async def generate_ppt_outline(
    content: str,
    n_slides: Optional[int],
    language: Optional[str] = None,
    additional_context: Optional[str] = None,
    tone: Optional[str] = None,
    verbosity: Optional[str] = None,
    instructions: Optional[str] = None,
    include_title_slide: bool = True,
    web_search: bool = False,
    include_table_of_contents: bool = False,
):
    model = get_model()
    response_model = (
        get_presentation_outline_model_with_n_slides(n_slides)
        if n_slides is not None
        else PresentationOutlineModel
    )

    client = get_client(config=get_llm_config())
    use_search_tool = web_search

    try:
        outline_schema = prepare_schema_for_validation(
            response_model.model_json_schema(),
            strict=True,
        )
        response_format = JSONSchemaResponse(
            name="response",
            json_schema=outline_schema,
            strict=True,
        )
        emitted_content = False
        async for event in stream_generate_events(
            client,
            **get_generate_kwargs(
                model=model,
                messages=get_messages(
                    content,
                    n_slides,
                    language,
                    additional_context,
                    tone,
                    verbosity,
                    instructions,
                    include_title_slide,
                    include_table_of_contents,
                ),
                response_format=response_format,
                tools=([WebSearchTool()] if use_search_tool else None),
                stream=True,
            ),
        ):
            if getattr(event, "type", None) == "content":
                chunk = getattr(event, "chunk", None)
                if chunk:
                    emitted_content = True
                    yield chunk
            elif (
                isinstance(event, ResponseStreamCompletionChunk) and not emitted_content
            ):
                final_content = serialize_structured_content(event.content)
                if final_content:
                    yield final_content
    except Exception as e:
        yield handle_llm_client_exceptions(e)
