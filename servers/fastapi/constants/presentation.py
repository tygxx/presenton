import re
from pathlib import Path

MAX_NUMBER_OF_SLIDES = 50

# 中文场景内置模板组的优先顺序（替换上游英文内置组）。动态发现会按此顺序排列，
# 未列出的模板目录按字母序追加在后面。
_PREFERRED_TEMPLATE_ORDER = [
    "business-cn",
    "tech-cn",
    "medical-cn",
    "education-cn",
    "food-cn",
    "finance-cn",
    "gov-cn",
    "realestate-cn",
    "culture-cn",
    "green-cn",
    "retail-cn",
    "travel-cn",
    "manufacturing-cn",
]


def _normalize_template_group_id(directory_name: str) -> str:
    """Map template folder names to the runtime template IDs."""
    cleaned = re.sub(r"(?<!^)(?=[A-Z])", "-", directory_name).lower()
    return cleaned.replace("_", "-")


def _discover_default_templates() -> list[str]:
    templates_dir = (
        Path(__file__).resolve().parents[2]
        / "nextjs"
        / "app"
        / "presentation-templates"
    )

    if not templates_dir.is_dir():
        return list(_PREFERRED_TEMPLATE_ORDER)

    discovered = {
        _normalize_template_group_id(entry.name)
        for entry in templates_dir.iterdir()
        if entry.is_dir() and (entry / "settings.json").is_file()
    }

    ordered = [name for name in _PREFERRED_TEMPLATE_ORDER if name in discovered]
    extras = sorted(discovered - set(ordered))
    return ordered + extras


DEFAULT_TEMPLATES = _discover_default_templates()
