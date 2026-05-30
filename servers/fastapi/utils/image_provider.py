from enums.image_provider import ImageProvider
from utils.get_env import (
    get_disable_image_generation_env,
    get_image_provider_env,
)
from utils.parsers import parse_bool_or_none


def contains_cjk(text: str | None, threshold: float = 0.15) -> bool:
    """Lightweight CJK heuristic (no third-party dependency).

    Returns True when the share of CJK characters among non-space characters is
    at least ``threshold``. Used to route image queries: stock libraries
    (Pexels/Pixabay) need English search terms, whereas generative providers
    (DALL-E/Gemini/...) accept CJK prompts directly.
    """
    if not text:
        return False
    cjk = 0
    total = 0
    for ch in str(text):
        if ch.isspace():
            continue
        total += 1
        code = ord(ch)
        # CJK Unified Ideographs, CJK symbols/punctuation, fullwidth/halfwidth forms
        if (
            0x4E00 <= code <= 0x9FFF
            or 0x3000 <= code <= 0x303F
            or 0xFF00 <= code <= 0xFFEF
        ):
            cjk += 1
    if total == 0:
        return False
    return (cjk / total) >= threshold


def is_image_generation_disabled() -> bool:
    return parse_bool_or_none(get_disable_image_generation_env()) or False


def is_pixels_selected() -> bool:
    return ImageProvider.PEXELS == get_selected_image_provider()


def is_pixabay_selected() -> bool:
    return ImageProvider.PIXABAY == get_selected_image_provider()


def is_openai_compatible_selected() -> bool:
    return ImageProvider.OPENAI_COMPATIBLE == get_selected_image_provider()


def is_gemini_flash_selected() -> bool:
    return ImageProvider.GEMINI_FLASH == get_selected_image_provider()


def is_nanobanana_pro_selected() -> bool:
    return ImageProvider.NANOBANANA_PRO == get_selected_image_provider()


def is_dalle3_selected() -> bool:
    return ImageProvider.DALLE3 == get_selected_image_provider()


def is_gpt_image_1_5_selected() -> bool:
    return ImageProvider.GPT_IMAGE_1_5 == get_selected_image_provider()


def is_comfyui_selected() -> bool:
    return ImageProvider.COMFYUI == get_selected_image_provider()


def is_open_webui_selected() -> bool:
    return ImageProvider.OPEN_WEBUI == get_selected_image_provider()


def get_selected_image_provider() -> ImageProvider | None:
    """
    Get the selected image provider from environment variables.
    Returns:
        ImageProvider: The selected image provider.
    """
    image_provider_env = get_image_provider_env()
    if image_provider_env:
        return ImageProvider(image_provider_env)
    return None
