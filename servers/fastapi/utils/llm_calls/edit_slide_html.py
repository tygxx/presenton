import asyncio
from typing import Optional
from fastapi import HTTPException
from llmai import get_client
from llmai.shared import SystemMessage, UserMessage
from utils.llm_config import get_llm_config
from utils.llm_client_error_handler import handle_llm_client_exceptions
from utils.llm_utils import extract_text, get_generate_kwargs
from utils.llm_provider import get_model

system_prompt = """
    You are an expert HTML slide editor. Your task is to modify slide HTML content based on user prompts while maintaining proper structure, styling, and functionality.

    Guidelines:
    1. **Preserve Structure**: Maintain the overall HTML structure, including essential containers, classes, and IDs
    2. **Content Updates**: Modify text, images, lists, and other content elements as requested
    3. **Style Consistency**: Keep existing CSS classes and styling unless specifically asked to change them
    4. **Responsive Design**: Ensure modifications work across different screen sizes
    5. **Accessibility**: Maintain proper semantic HTML and accessibility attributes
    6. **Clean Output**: Return only the modified HTML without explanations unless errors occur

    Common Edit Types:
    - Text content changes (headings, paragraphs, lists)
    - Image updates (src, alt text, captions)
    - Layout modifications (adding/removing sections)
    - Style adjustments (colors, fonts, spacing via classes)
    - Interactive elements (buttons, links, forms)

    Error Handling:
    - If the HTML structure is invalid, fix it while making requested changes
    - If a request would break functionality, suggest an alternative approach
    - For unclear prompts, make reasonable assumptions and note any ambiguities

    Output Format:
    Return the complete modified HTML. If the original HTML contains <style> or <script> tags, preserve them unless specifically asked to modify.
"""


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


def _resolve_content_language(
    language: Optional[str], content: Optional[str] = None
) -> Optional[str]:
    """Resolve the slide's content language for the edit prompt.

    Returns an explicit language string, or None when it can't be determined
    (in which case no language directive is added and behaviour is unchanged).
    """
    s = "" if language is None else str(language).strip()
    if s and s.lower() not in {"auto", "auto-detect"}:
        return s
    if _has_cjk(content):
        return "Chinese (Simplified) / 简体中文"
    return None


def get_user_prompt(
    prompt: str,
    html: str,
    memory_context: Optional[str] = None,
    language: Optional[str] = None,
):
    memory_block = (
        f"\n        **Retrieved Presentation Memory Context:**\n        {memory_context}\n"
        if memory_context
        else ""
    )

    content_language = _resolve_content_language(language, html)
    language_block = (
        f"\n        **Content Language:** {content_language}. Keep all visible text in this "
        "language; do not translate existing content to English unless the edit request explicitly asks for it.\n"
        if content_language
        else ""
    )

    return f"""
        Please edit the following slide HTML based on this prompt:

        **Edit Request:** {prompt}
        {language_block}{memory_block}

        **Current HTML:**
        ```html
        {html}
        ```

        Return the modified HTML with your changes applied.
    """


async def get_edited_slide_html(
    prompt: str,
    html: str,
    memory_context: Optional[str] = None,
    language: Optional[str] = None,
):
    model = get_model()

    client = get_client(config=get_llm_config())
    try:
        response = await asyncio.to_thread(
            client.generate,
            **get_generate_kwargs(
                model=model,
                messages=[
                    SystemMessage(content=system_prompt),
                    UserMessage(
                        content=get_user_prompt(prompt, html, memory_context, language)
                    ),
                ],
            ),
        )
        response_text = extract_text(response.content)
        if response_text is None:
            raise HTTPException(status_code=400, detail="LLM did not return any content")
        return extract_html_from_response(response_text) or html
    except Exception as e:
        raise handle_llm_client_exceptions(e)


def extract_html_from_response(response_text: str) -> Optional[str]:
    start_index = response_text.find("<")
    end_index = response_text.rfind(">")

    if start_index != -1 and end_index != -1 and end_index > start_index:
        return response_text[start_index : end_index + 1]

    return None
