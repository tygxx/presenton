import hashlib

MAX_EXPORT_BASENAME_BYTES = 200


def _truncate_to_utf8_boundary(text: str, max_bytes: int) -> str:
    """Truncate ``text`` so its UTF-8 encoding is at most ``max_bytes`` long,
    cutting only on whole-character boundaries.

    Unlike ``encoded[:max_bytes].decode("utf-8", errors="ignore")`` this never
    slices through the middle of a multi-byte (e.g. CJK) character — it drops
    the last partial character entirely instead of silently mangling it. For
    pure-ASCII input the result is identical to a plain byte slice.
    """
    if max_bytes <= 0:
        return ""

    encoded = text.encode("utf-8")
    if len(encoded) <= max_bytes:
        return text

    # Back off to the start of the last complete UTF-8 character. UTF-8
    # continuation bytes match 0b10xxxxxx (0x80-0xBF); a boundary is any byte
    # that is not a continuation byte.
    cut = max_bytes
    while cut > 0 and (encoded[cut] & 0xC0) == 0x80:
        cut -= 1

    return encoded[:cut].decode("utf-8", errors="ignore")


def safe_export_basename(name: str, max_bytes: int = MAX_EXPORT_BASENAME_BYTES) -> str:
    name = (name or "").strip() or "presentation"

    encoded = name.encode("utf-8")

    if len(encoded) <= max_bytes:
        return name

    suffix = hashlib.md5(encoded).hexdigest()[:8]
    budget = max_bytes - len(suffix) - 1
    truncated = _truncate_to_utf8_boundary(name, budget).rstrip()

    return f"{truncated}_{suffix}" if truncated else suffix
