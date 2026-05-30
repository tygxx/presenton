import math
import re
from typing import Iterable, List, Optional

from models.presentation_outline_model import (
    PresentationOutlineModel,
    SlideOutlineModel,
)


HEADING_PATTERN = re.compile(r"^\s{0,3}#+\s*(.+)$", re.MULTILINE)
FIRST_SENTENCE_PATTERN = re.compile(r"^\s*([^.?!]+?[.?!])", re.DOTALL)
IMAGE_URL_PATTERN = re.compile(
    r"https?://[-\w./%~:!$&'()*+,;=]+?\.(?:jpe?g|png|webp)(?:\?[^\s\"\'\\]*)?",
    re.IGNORECASE | re.UNICODE,
)


def get_presentation_title_from_presentation_outline(
    presentation_outline: PresentationOutlineModel,
) -> str:
    if not presentation_outline.slides:
        return "Untitled Presentation"

    first_content = presentation_outline.slides[0].content or ""

    if re.match(r"^\s*#{1,6}\s*Page\s+\d+\b", first_content):
        first_content = re.sub(
            r"^\s*#{1,6}\s*Page\s+\d+\b[\s,:\-]*",
            "",
            first_content,
            count=1,
        )

    return (
        first_content[:100]
        .replace("#", "")
        .replace("/", "")
        .replace("\\", "")
        .replace("\n", " ")
    )


def _get_toc_count_for_total_slides(total_slides: int, title_slide: bool) -> int:
    if total_slides <= 0:
        return 0

    first_pass = math.ceil(((total_slides - 1) if title_slide else total_slides) / 10)
    return math.ceil((total_slides - first_pass) / 10)


def get_no_of_toc_required_for_n_outlines(
    *,
    n_outlines: int,
    title_slide: bool,
    target_total_slides: Optional[int] = None,
) -> int:
    if target_total_slides is not None:
        adjusted_total = max(target_total_slides, n_outlines)
        return _get_toc_count_for_total_slides(adjusted_total, title_slide)

    if n_outlines <= 0:
        return 0

    return math.ceil(((n_outlines - 1) if title_slide else n_outlines) / 10)


def get_no_of_outlines_to_generate_for_n_slides(
    *,
    n_slides: int,
    toc: bool,
    title_slide: bool,
) -> int:
    if toc:
        n_toc_1 = math.ceil(((n_slides - 1) if title_slide else n_slides) / 10)
        n_toc_2 = math.ceil((n_slides - n_toc_1) / 10)

        return n_slides - n_toc_2

    else:
        return n_slides


def _text_has_cjk(text: Optional[str]) -> bool:
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


def _toc_is_cjk(
    language: Optional[str], outlines: List[SlideOutlineModel]
) -> bool:
    """Decide whether to render the TOC with Chinese labels.

    Prefers an explicit language hint; otherwise falls back to detecting CJK in
    the outline content so the default (English) behaviour is preserved.
    """
    if language:
        s = str(language).strip().lower()
        if s and s not in {"auto", "auto-detect"}:
            if any(
                token in s
                for token in ("chinese", "zh", "中文", "简体", "繁體", "繁体")
            ):
                return True
            # An explicit non-Chinese language: keep English labels.
            return _text_has_cjk(language)
    return any(_text_has_cjk(o.content) for o in outlines)


def get_presentation_outline_model_with_toc(
    *,
    outline: PresentationOutlineModel,
    n_toc_slides: int,
    title_slide: bool,
    language: Optional[str] = None,
) -> PresentationOutlineModel:
    if n_toc_slides <= 0:
        return outline

    outline_with_toc = outline.model_copy(deep=True)
    insertion_index = 1 if title_slide else 0

    existing_outlines = outline_with_toc.slides
    outlines_for_toc = existing_outlines[insertion_index:]
    if not outlines_for_toc:
        return outline_with_toc

    sections = _split_outlines_evenly(outlines_for_toc, n_toc_slides)
    if not sections:
        return outline_with_toc

    use_cjk_labels = _toc_is_cjk(language, outlines_for_toc)
    toc_heading = "## 目录" if use_cjk_labels else "## Table of Contents"

    toc_slides: List[SlideOutlineModel] = []
    outlines_before_toc = 1 if title_slide else 0
    total_toc_slides = len(sections)
    global_outline_index = 0

    for section_index, section in enumerate(sections):
        section_lines = [
            toc_heading,
            "",
        ]

        for outline in section:
            outline_title = _extract_outline_title(outline.content)
            page_number = (
                outlines_before_toc + total_toc_slides + global_outline_index + 1
            )
            if use_cjk_labels:
                section_lines.append(
                    f"- 第 {page_number} 页：{outline_title}"
                )
            else:
                section_lines.append(
                    f"- Page number: {page_number}, Title: {outline_title}"
                )
            global_outline_index += 1

        toc_slides.append(
            SlideOutlineModel(
                content="\n".join(
                    line for line in section_lines if line is not None
                ).strip()
            )
        )

    for offset, toc_slide in enumerate(toc_slides):
        existing_outlines.insert(insertion_index + offset, toc_slide)

    return outline_with_toc


def _split_outlines_evenly(
    outlines: Iterable[SlideOutlineModel], n_sections: int
) -> List[List[SlideOutlineModel]]:
    """Split outlines into n contiguous sections with near-equal sizes."""
    outlines_list = list(outlines)
    if n_sections <= 0 or not outlines_list:
        return []

    total = len(outlines_list)
    n_sections = max(1, n_sections)
    base_size = total // n_sections
    remainder = total % n_sections

    sections: List[List[SlideOutlineModel]] = []
    start = 0
    for section_index in range(n_sections):
        current_size = base_size + (1 if section_index < remainder else 0)
        end = start + current_size
        sections.append(outlines_list[start:end])
        start = end

    return sections


def _extract_outline_title(content: str) -> str:
    """Get a human-friendly title from an outline's markdown content."""
    text = content or ""

    heading_match = HEADING_PATTERN.search(text)
    if heading_match:
        return heading_match.group(1).strip()

    sentence_match = FIRST_SENTENCE_PATTERN.search(text.strip())
    if sentence_match:
        return sentence_match.group(1).strip()

    for line in text.splitlines():
        stripped_line = line.strip()
        if stripped_line:
            return stripped_line

    return "Slide"


def get_images_for_slides_from_outline(
    slides: List[SlideOutlineModel],
) -> List[List[str]]:
    """
    Extract image URLs (png, jpg, jpeg, webp) from each slide's content in the outline.

    Args:
        outline: PresentationOutlineModel containing slides with content

    Returns:
        List of lists of image URLs, one list per slide
    """
    result: List[List[str]] = []

    for slide in slides:
        content = slide.content or ""
        image_urls = IMAGE_URL_PATTERN.findall(content)
        # Remove duplicates while preserving order
        unique_urls = list(dict.fromkeys(image_urls))
        result.append(unique_urls)

    return result
