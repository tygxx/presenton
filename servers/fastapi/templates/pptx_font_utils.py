import asyncio
import os
from pathlib import Path
import re
import subprocess
import tempfile
import urllib
import zipfile
from functools import lru_cache
import aiohttp
import xml.etree.ElementTree as ET
from typing import Dict, List, Optional, Sequence, Set, Tuple
from pydantic import BaseModel
from pptx import Presentation
from fontTools.ttLib import TTFont

DEFAULT_GOOGLE_FONT_WEIGHTS = (400, 700)
PPT_NS = {
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
}
REL_NS = "http://schemas.openxmlformats.org/package/2006/relationships"
_TEXT_STYLE_TAGS = ("a:rPr", "a:defRPr", "a:endParaRPr")
_FONT_TAGS = ("a:latin", "a:ea", "a:cs")
_THEME_FONT_REFERENCES = {"+mn-lt", "+mj-lt", "+mn-ea", "+mj-ea", "+mn-cs", "+mj-cs"}
_SFNT_FORMATS = {
    "\x00\x01\x00\x00": "TrueType",
    "true": "TrueType",
    "typ1": "PostScript Type 1",
    "OTTO": "OpenType CFF",
    "ttcf": "TrueType Collection",
    "wOFF": "WOFF",
    "wOF2": "WOFF2",
}


class FontDetail(BaseModel):
    """Detailed information about a font file."""

    file: str
    size_bytes: int
    error: Optional[str] = None
    eot_extraction_error: Optional[str] = None
    family_name: Optional[str] = None
    subfamily_name: Optional[str] = None
    unique_id: Optional[str] = None
    full_name: Optional[str] = None
    version: Optional[str] = None
    postscript_name: Optional[str] = None
    trademark: Optional[str] = None
    manufacturer: Optional[str] = None
    designer: Optional[str] = None
    description: Optional[str] = None
    vendor_url: Optional[str] = None
    designer_url: Optional[str] = None
    license: Optional[str] = None
    license_url: Optional[str] = None
    weight_class: Optional[int] = None
    width_class: Optional[int] = None
    cap_height: Optional[int] = None
    x_height: Optional[int] = None
    ascent: Optional[int] = None
    descent: Optional[int] = None
    units_per_em: Optional[int] = None
    created: Optional[int] = None
    modified: Optional[int] = None
    ascender: Optional[int] = None
    descender: Optional[int] = None
    line_gap: Optional[int] = None
    num_glyphs: Optional[int] = None
    format: Optional[str] = None


_STYLE_TOKENS = {
    "italic",
    "italics",
    "ital",
    "oblique",
    "roman",
    "gras",
    "bolditalic",
    "bolditalics",
    "thin",
    "hairline",
    "extralight",
    "ultralight",
    "light",
    "demilight",
    "semilight",
    "book",
    "regular",
    "normal",
    "medium",
    "semibold",
    "demibold",
    "bold",
    "extrabold",
    "ultrabold",
    "black",
    "extrablack",
    "ultrablack",
    "heavy",
    "narrow",
    "condensed",
    "semicondensed",
    "extracondensed",
    "ultracondensed",
    "expanded",
    "semiexpanded",
    "extraexpanded",
    "ultraexpanded",
}
_STYLE_MODIFIERS = {"semi", "demi", "extra", "ultra"}

# Chinese weight/style suffixes that foundries append to a family name, often
# without any separator (e.g. "微软雅黑粗", "思源黑体细"). Listed longest-first so
# multi-char tokens ("超粗", "特粗") are stripped before single-char ones.
#
# NOTE: single chars that double as typeface-category names (黑 as in 黑体, 中, 标,
# 正, 重) are deliberately excluded — stripping them would mangle real family names
# like "微软雅黑" or "黑体". Only unambiguous weight words remain.
_CJK_WEIGHT_TOKENS: Tuple[str, ...] = (
    "极细", "纤细", "超细", "特细", "细体",
    "超粗", "特粗", "极粗", "粗体", "中等", "标准", "常规", "普通",
    "纤", "细", "粗",
)
_CJK_RANGE_PATTERN = re.compile(r"[㐀-鿿　-〿＀-￯]")


def _contains_cjk(value: Optional[str]) -> bool:
    """Heuristic: True when the string carries CJK ideographs / fullwidth marks."""
    if not value:
        return False
    return _CJK_RANGE_PATTERN.search(value) is not None


def _strip_cjk_weight_suffix(name: str) -> str:
    """Trim a trailing Chinese weight token from a CJK family name.

    Only strips when a real family stub remains and at least one CJK character is
    left, so plain weight words ("粗体") or non-CJK names are never mangled.
    """
    if not _contains_cjk(name):
        return name
    stripped = name.strip()
    for token in _CJK_WEIGHT_TOKENS:
        if len(stripped) > len(token) and stripped.endswith(token):
            candidate = stripped[: -len(token)].rstrip(" -_·")
            if candidate and _contains_cjk(candidate):
                return candidate
    return stripped


# ---------------------------------------------------------------------------
# Auto-substitution for fonts Google Fonts does not host.
#
# Chinese system/foundry fonts (微软雅黑, 宋体, 黑体, MiSans ...) and a few
# proprietary Latin office fonts (Arial, Calibri ...) are not on Google Fonts,
# so the availability check reports them as "missing" and the user is asked to
# upload font files they usually cannot legally obtain. Instead we map each to a
# visually-similar family that IS hosted on Google Fonts (the free Noto CJK
# families, and the metric-compatible Liberation/Croscore Latin twins). Matching
# is done on a folded key (lowercased, separators removed) with a fallback that
# strips trailing weight/style tokens, so weight-suffixed names still resolve.
# ---------------------------------------------------------------------------
_FONT_SUBSTITUTE_GROUPS: List[Tuple[str, Tuple[str, ...]]] = [
    # --- Simplified-Chinese sans (黑体类) -> Noto Sans SC ---
    ("Noto Sans SC", (
        "微软雅黑", "微软雅黑 Light", "微软雅黑 Bold", "Microsoft YaHei",
        "Microsoft YaHei UI", "Microsoft YaHei Light", "MS YaHei",
        "msyh", "msyhl", "msyhbd",
    )),
    ("Noto Sans SC", ("黑体", "SimHei", "simhei")),
    ("Noto Sans SC", (
        "华文黑体", "STHeiti", "STHeiti Light", "STHeiti Medium",
        "Heiti SC", "Heiti SC Light", "Heiti SC Medium",
    )),
    ("Noto Sans SC", (
        "等线", "等线 Light", "DengXian", "DengXian Light", "DengXian Bold", "Dengxian",
    )),
    ("Noto Sans SC", (
        "苹方", "苹方-简", "苹方 简", "PingFang SC", "PingFangSC",
        "PingFang SC Regular", "PingFang SC Medium", "PingFang SC Light",
        "PingFang SC Semibold",
    )),
    ("Noto Sans SC", (
        "冬青黑体", "冬青黑体简体中文", "Hiragino Sans GB", "Hiragino Sans GB W3",
        "Hiragino Sans GB W6", "HiraginoSansGB",
    )),
    ("Noto Sans SC", ("幼圆", "YouYuan", "youyuan")),
    ("Noto Sans SC", (
        "文泉驿微米黑", "文泉驿微米黑体", "WenQuanYi Micro Hei",
        "WenQuanYi Micro Hei Mono", "wqy-microhei",
    )),
    ("Noto Sans SC", (
        "思源黑体", "思源黑体 CN", "思源黑体 CN Regular", "思源黑体 CN Medium",
        "思源黑体 CN Bold", "思源黑体 CN Light", "Source Han Sans",
        "Source Han Sans SC", "Source Han Sans CN", "Source Han Sans SC Regular",
        "Source Han Sans SC Medium", "Source Han Sans SC Bold",
        "Source Han Sans SC Light", "Source Han Sans CN Normal",
        "Noto Sans CJK SC", "Noto Sans CJK SC Regular", "Noto Sans CJK SC Bold",
        "SourceHanSansSC", "SourceHanSansCN",
    )),
    ("Noto Sans SC", (
        "方正黑体", "方正黑体简体", "方正黑体_GBK", "FZHei", "FZHei-B01",
        "FZHei-B01S", "FZHeiTi", "FZHTJW",
    )),
    ("Noto Sans SC", (
        "方正兰亭黑", "方正兰亭黑简体", "方正兰亭中黑", "方正兰亭粗黑",
        "方正兰亭黑_GBK", "Lantinghei", "Lantinghei SC", "FZLanTingHei",
        "FZLTHJW", "FZLTXHJW", "FZLTZHJW",
    )),
    ("Noto Sans SC", ("微软简黑体", "微软简中黑", "MS Hei", "MSHei")),
    ("Noto Sans SC", ("黑体-简",)),
    ("Noto Sans SC", ("兰亭黑", "兰亭黑-简", "LanTingHei", "LanTingHeiSC")),
    ("Noto Sans SC", ("方正综艺", "方正综艺简体", "FZZongYi", "FZZY", "FZZongYi-M09S")),
    ("Noto Sans SC", (
        "汉仪黑体", "汉仪中黑", "汉仪粗黑", "HYHei", "HYZhongHei", "HiraganaHYHei",
    )),
    ("Noto Sans SC", (
        "造字工房力黑", "造字工房力黑体", "MFLiHei", "MFLiHei_Noncommercial",
    )),
    # --- Brand / vendor Simplified-Chinese sans -> Noto Sans SC ---
    ("Noto Sans SC", (
        "MiSans", "MiSans VF", "MiSans Latin", "小米MiSans", "MiSans Regular",
        "MiSans Demibold",
    )),
    ("Noto Sans SC", (
        "OPPO Sans", "OPPOSans", "OPPOSans R", "OPPOSans M", "OPPOSans H",
        "OPPOSans B", "OPPOSans L", "OPPO Sans R", "OPPO Sans M", "OPPO Sans H",
        "OPPOSans 3.0", "OPPOSans 4.0",
    )),
    ("Noto Sans SC", (
        "HarmonyOS Sans", "HarmonyOS Sans SC", "鸿蒙", "鸿蒙字体",
        "HarmonyOS_Sans", "HarmonyOS Sans Condensed", "HarmonyOS Sans Naskh",
    )),
    ("Noto Sans SC", (
        "阿里巴巴普惠体", "Alibaba PuHuiTi", "AlibabaPuHuiTi",
        "Alibaba PuHuiTi 2.0", "Alibaba PuHuiTi 3.0", "阿里巴巴普惠体 2.0",
        "阿里巴巴普惠体 3.0", "AlibabaPuHuiTi-2", "AlibabaPuHuiTi-3", "Alibaba-PuHuiTi",
    )),
    ("Noto Sans SC", (
        "小米兰亭", "小米兰亭Pro", "MI Lan Pro", "MI Lan", "MiLanPro",
        "Mi Lan Pro", "小米兰亭 Pro",
    )),
    ("Noto Sans SC", (
        "vivo Sans", "vivoSans", "vivo Sans T", "vivoType", "vivo 字体", "OriginSans",
    )),
    ("Noto Sans SC", (
        "钉钉进步体", "DingTalk JinBuTi", "DingTalkJinBuTi", "DingTalk_JinBuTi",
        "进步体", "钉钉 进步体",
    )),
    ("Noto Sans SC", (
        "得意黑", "Smiley Sans", "SmileySans", "得意黑 Oblique",
        "Smiley Sans Oblique", "SmileySans-Oblique",
    )),
    ("Noto Sans SC", (
        "抖音美好体", "抖音美好体 VF", "Douyin Sans", "DouyinSans",
        "抖音字体", "TikTok Sans",
    )),
    ("Noto Sans SC", (
        "京东JD体", "京东体", "JDLangZhengTi", "京东朗正体", "JD Zheng Hei",
        "京东正黑", "JDZhengHT", "JD LangZheng",
    )),
    ("Noto Sans SC", (
        "腾讯体", "TencentSans", "Tencent Sans", "QQ字体", "TTTGB", "腾讯字体",
    )),
    ("Noto Sans SC", (
        "联想小新体", "Lenovo XiaoXin", "LenovoXiaoXin", "小新潮酷体", "Lenovo Sans",
    )),
    # --- Simplified-Chinese serif / kai / fangsong -> Noto Serif SC ---
    # (Kai/FangSong have no exact free match; Noto Serif SC is the closest fallback.)
    ("Noto Serif SC", (
        "宋体", "SimSun", "中易宋体", "宋体-PUA", "simsun", "SimSun-ExtB",
    )),
    ("Noto Serif SC", ("新宋体", "NSimSun", "nsimsun")),
    ("Noto Serif SC", (
        "华文宋体", "STSong", "STSong-Light", "华文中宋", "STZhongsong",
    )),
    ("Noto Serif SC", (
        "思源宋体", "Source Han Serif", "Source Han Serif SC", "Source Han Serif CN",
        "Noto Serif CJK SC", "Noto Serif CJK", "思源宋體",
    )),
    ("Noto Serif SC", (
        "方正书宋", "FZShuSong", "方正书宋_GBK", "FZShuSong-Z01", "FZShuSong-Z01S",
        "方正书宋简体",
    )),
    ("Noto Serif SC", (
        "方正小标宋", "FZXiaoBiaoSong", "方正小标宋_GBK", "FZXiaoBiaoSong-B05",
        "FZXiaoBiaoSong-B05S", "方正小标宋简体",
    )),
    ("Noto Serif SC", (
        "楷体", "KaiTi", "Kaiti", "楷体_GB2312", "KaiTi_GB2312", "simkai",
        "STKaiti", "华文楷体", "方正楷体", "FZKai", "FZKai-Z03", "FZKai-Z03S",
        "楷体_GBK", "Kaiti SC",
    )),
    ("Noto Serif SC", (
        "仿宋", "FangSong", "Fangsong", "仿宋_GB2312", "FangSong_GB2312", "simfang",
        "STFangsong", "华文仿宋", "方正仿宋", "FZFangSong", "FZFangSong-Z02",
        "FZFangSong-Z02S", "仿宋_GBK", "Fangsong SC",
    )),
    # --- Traditional-Chinese sans -> Noto Sans TC ---
    ("Noto Sans TC", (
        "微軟正黑體", "微软正黑体", "Microsoft JhengHei", "MS JhengHei",
        "Microsoft JhengHei UI", "Microsoft JhengHei Light", "Microsoft JhengHei Bold",
        "msjh", "msjhl", "msjhbd",
    )),
    ("Noto Sans TC", (
        "蘋方-繁", "蘋方", "蘋方 繁", "PingFang TC", "PingFangTC", "PingFang HK",
        "PingFangHK", "PingFang TC Regular", "PingFang TC Medium", "PingFang TC Light",
        "PingFang TC Semibold", "苹方-繁",
    )),
    ("Noto Sans TC", ("黑體-繁", "黑體", "Heiti TC", "Heiti TC Light", "Heiti TC Medium", "黑体-繁")),
    # 思源黑體 / Noto Sans CJK TC (Traditional)
    ("Noto Sans TC", (
        "思源黑體", "思源黑體 TC", "思源黑體 TW", "思源黑体 TC", "思源黑体 TW",
        "Source Han Sans TC", "Source Han Sans TW", "Source Han Sans HC",
        "Source Han Sans TC Regular", "Source Han Sans TC Medium",
        "Source Han Sans TC Bold", "Source Han Sans TC Light",
        "Noto Sans CJK TC", "Noto Sans CJK TC Regular", "Noto Sans CJK TC Bold",
        "Noto Sans CJK HK", "SourceHanSansTC", "SourceHanSansTW", "SourceHanSansHC",
    )),
    # 華康 (DynaFont / DynaComware) 黑體系列
    ("Noto Sans TC", (
        "華康黑體", "華康儷黑", "華康中黑體", "華康超黑體", "華康新特黑體",
        "華康儷中黑", "華康儷粗黑", "DFHei", "DFLiHei", "DFPHei", "DFHeiStd",
        "DFGothic", "DFPGothic", "DFKaiHei", "DFLiHei-Bd", "華康圓體", "DFYuan",
        "DFPYuanW", "華康儷圓",
    )),
    # 文鼎 (Arphic) 黑體系列
    ("Noto Sans TC", (
        "文鼎黑體", "文鼎中黑", "文鼎特黑", "文鼎powerverbatim", "AR PL UKai",
        "文鼎中圓", "AR HeitiM", "AR HeitiB", "ARHei", "ARPLNew", "文鼎新黑",
    )),
    # 造字工房 (Makefont) 繁體黑體變體
    ("Noto Sans TC", (
        "造字工房黑體", "造字工房尚黑", "造字工房悅黑", "MFShangHei", "MFYueHei",
        "MFLiHei_繁", "造字工房力黑繁",
    )),
    # 蒙納 (Monotype) 繁體黑體
    ("Noto Sans TC", (
        "蒙納黑體", "蒙納超明", "Mona Hei", "MHei", "MNHei", "MSungHK",
    )),
    # --- Traditional-Chinese serif -> Noto Serif TC ---
    ("Noto Serif TC", (
        "新細明體", "PMingLiU", "PMingLiU-ExtB", "MingLiU_HKSCS", "新细明体",
    )),
    ("Noto Serif TC", (
        "細明體", "MingLiU", "MingLiU-ExtB", "MingLiU_HKSCS-ExtB", "细明体",
    )),
    ("Noto Serif TC", (
        "標楷體", "DFKai-SB", "DFKaiShu", "KaiU", "BiauKai", "華康楷書體",
        "DFKaiSho", "文鼎楷書", "AR PL KaitiM", "標楷體 繁", "标楷体",
    )),
    # 思源宋體 / Noto Serif CJK TC (Traditional)
    ("Noto Serif TC", (
        "思源宋體", "思源宋體 TC", "思源宋體 TW", "思源宋体 TC", "思源宋体 TW",
        "Source Han Serif TC", "Source Han Serif TW", "Source Han Serif HC",
        "Source Han Serif TC Regular", "Source Han Serif TC Bold",
        "Noto Serif CJK TC", "Noto Serif CJK HK", "SourceHanSerifTC",
        "SourceHanSerifTW", "SourceHanSerifHC",
    )),
    # 華康 / 文鼎 明體 (serif) 系列
    ("Noto Serif TC", (
        "華康明體", "華康儷宋", "華康中明體", "華康粗明體", "華康新特明體",
        "DFMing", "DFSong", "DFPMing", "DFMingStd", "DFPHaiBao", "華康儷中宋",
        "文鼎明體", "文鼎中明", "文鼎粗明", "AR PL Mingti2L", "AR PL SungtiL",
        "ARMingti", "ARSungti", "文鼎報宋",
    )),
    # --- Proprietary Latin office fonts -> metric-compatible Google twins ---
    ("Arimo", ("Arial", "Arial MT", "ArialMT", "Arial Regular", "Helvetica")),
    ("Tinos", (
        "Times New Roman", "TimesNewRoman", "TimesNewRomanPSMT",
        "Times New Roman PS", "Times",
    )),
    ("Cousine", (
        "Courier New", "CourierNew", "CourierNewPSMT", "Courier",
        "Consolas", "Consolas Regular",
    )),
    ("Carlito", ("Calibri", "Calibri Light", "Calibri Regular")),
    ("Caladea", ("Cambria", "Cambria Math", "Cambria Regular")),
    # --- Monospace / fixed-pitch Chinese fonts -> Noto Sans Mono ---
    # Google Fonts does not host the Noto CJK Mono families via the CSS2 API, so
    # we approximate with Noto Sans Mono for correct fixed-pitch Latin metrics in
    # code blocks; CJK glyphs come from the fontconfig fallback chain at PDF time.
    ("Noto Sans Mono", (
        # Simplified-Chinese fixed-pitch families
        "等距更纱黑体", "等距更纱黑体 SC", "更纱黑体 Mono", "更纱黑体 Mono SC",
        "Sarasa Mono SC", "Sarasa Fixed SC", "Sarasa Mono CL", "SarasaMonoSC",
        "文泉驿等宽微米黑", "文泉驿等宽正黑", "WenQuanYi Micro Hei Mono",
        "WenQuanYi Zen Hei Mono", "wqy-microhei-mono", "wqy-zenhei-mono",
        "思源等宽", "思源黑体 Mono", "Source Han Mono", "Source Han Mono SC",
        "SourceHanMono", "SourceHanMonoSC", "Noto Sans Mono CJK SC",
        "冬青黑体等宽", "苹方等宽", "PingFang SC Mono",
    )),
    ("Noto Sans Mono", (
        # Traditional-Chinese fixed-pitch families
        "等距更纱黑体 TC", "更纱黑体 Mono TC", "Sarasa Mono TC", "Sarasa Fixed TC",
        "SarasaMonoTC", "Source Han Mono TC", "SourceHanMonoTC",
        "Noto Sans Mono CJK TC", "蘋方等寬",
    )),
    # Decorative/display Latin fonts (DIN Alternate, Bock Medium, Bebas Neue,
    # Impact ...) have no metric-compatible free twin and are intentionally left
    # unmapped so they stay reported as missing rather than silently distorted.
]


def _fold_font_name(name: str) -> str:
    """Lowercase a font name and strip whitespace/separators for fuzzy matching."""
    return re.sub(r"[\s_\-.]+", "", (name or "").strip().lower())


def _build_font_substitute_lookup() -> Dict[str, str]:
    lookup: Dict[str, str] = {}
    for substitute, originals in _FONT_SUBSTITUTE_GROUPS:
        for original in originals:
            key = _fold_font_name(original)
            if key:
                lookup.setdefault(key, substitute)
    return lookup


_FONT_SUBSTITUTE_LOOKUP: Dict[str, str] = _build_font_substitute_lookup()


def _lookup_font_substitute(font_name: str) -> Optional[str]:
    """Return a Google-hosted substitute family for a font, or None if unmapped."""
    if not font_name:
        return None
    folded = _fold_font_name(font_name)
    if folded in _FONT_SUBSTITUTE_LOOKUP:
        return _FONT_SUBSTITUTE_LOOKUP[folded]
    # Fallback: peel off trailing weight/style tokens (e.g. "微软雅黑 Bold").
    tokens = [t for t in re.split(r"[\s_\-.]+", (font_name or "").strip().lower()) if t]
    while len(tokens) > 1 and tokens[-1] in _STYLE_TOKENS:
        tokens.pop()
        candidate = "".join(tokens)
        if candidate in _FONT_SUBSTITUTE_LOOKUP:
            return _FONT_SUBSTITUTE_LOOKUP[candidate]
    # CJK fallback: foundry weight suffixes are usually glued on without a
    # separator (e.g. "微软雅黑粗", "思源黑体细"), so the split above misses them.
    if _contains_cjk(font_name):
        cjk_stub = _strip_cjk_weight_suffix(font_name.strip())
        if cjk_stub and cjk_stub != font_name.strip():
            stub_folded = _fold_font_name(cjk_stub)
            if stub_folded and stub_folded in _FONT_SUBSTITUTE_LOOKUP:
                return _FONT_SUBSTITUTE_LOOKUP[stub_folded]
    return None


def _clean_font_metadata_string(value: str) -> str:
    return "".join(
        char
        for char in value
        if char == "\t" or char == "\n" or char == "\r" or ord(char) >= 32
    ).strip()


def _normalize_font_format(value: object) -> Optional[str]:
    if not value:
        return None
    if isinstance(value, bytes):
        raw = value.decode("latin1", errors="ignore")
    else:
        raw = str(value)
    return _SFNT_FORMATS.get(raw, _clean_font_metadata_string(raw) or None)


def normalize_font_family_name(raw_name: str) -> str:
    """Normalize raw font family labels by trimming weight/style tokens."""
    if not raw_name:
        return raw_name
    name = raw_name.replace("_", " ").replace("-", " ")
    name = re.sub(r"(?<=[a-z0-9])([A-Z])", r" \1", name)
    name = re.sub(r"([A-Z]+)([A-Z][a-z])", r"\1 \2", name)
    name = re.sub(r"\s+", " ", name).strip()
    lower_name = name.lower()
    for style in sorted(_STYLE_TOKENS, key=len, reverse=True):
        if lower_name.endswith(" " + style):
            name = name[: -(len(style) + 1)]
            lower_name = lower_name[: -(len(style) + 1)]
            break
    tokens_original = name.split(" ")
    tokens_filtered: List[str] = []
    for index, tok in enumerate(tokens_original):
        lower_tok = tok.lower()
        if index == 0:
            tokens_filtered.append(tok)
            continue
        if lower_tok in _STYLE_TOKENS or lower_tok in _STYLE_MODIFIERS:
            continue
        # Drop a trailing Chinese weight word that ended up as its own token
        # (e.g. "微软雅黑-粗" -> ["微软雅黑", "粗"]); only when CJK text precedes it.
        if (
            index == len(tokens_original) - 1
            and tok in _CJK_WEIGHT_TOKENS
            and any(_contains_cjk(t) for t in tokens_filtered)
        ):
            continue
        tokens_filtered.append(tok)
    if not tokens_filtered:
        tokens_filtered = tokens_original
    normalized = " ".join(tokens_filtered).strip()
    normalized = re.sub(r"\s+", " ", normalized)
    # Separator-less CJK suffix (e.g. "微软雅黑粗", "思源黑体细") — guarded so plain
    # Latin and bare weight words are never touched.
    normalized = _strip_cjk_weight_suffix(normalized)
    return normalized


# CJK Google Fonts families do not ship an italic/oblique cut, so requesting one
# yields an invalid stylesheet. They also benefit from an explicit Unicode subset
# so the served file actually contains the Han glyphs we need. Map each hosted CJK
# family to the subset(s) it should request.
_CJK_GOOGLE_FONT_SUBSETS: Dict[str, Tuple[str, ...]] = {
    "noto sans sc": ("chinese-simplified",),
    "noto serif sc": ("chinese-simplified",),
    "noto sans tc": ("chinese-traditional",),
    "noto serif tc": ("chinese-traditional",),
    "noto sans hk": ("chinese-traditional",),
    "noto serif hk": ("chinese-traditional",),
    "noto sans jp": ("japanese",),
    "noto serif jp": ("japanese",),
    "noto sans kr": ("korean",),
    "noto serif kr": ("korean",),
}


def _cjk_google_font_subsets(family_name: str) -> Optional[Tuple[str, ...]]:
    """Return the Google Fonts subset(s) for a hosted CJK family, else None."""
    return _CJK_GOOGLE_FONT_SUBSETS.get((family_name or "").strip().lower())


def build_google_fonts_stylesheet_url(
    family_name: str,
    weights: Optional[Sequence[int]] = DEFAULT_GOOGLE_FONT_WEIGHTS,
    variants: Optional[Sequence[str]] = None,
) -> str:
    encoded_family = urllib.parse.quote_plus(family_name)
    requested_variants = set(variants or [])
    requested_weights = set(weights or [])
    cjk_subsets = _cjk_google_font_subsets(family_name)
    # CJK families have no italic cut on Google Fonts; requesting one is invalid.
    is_cjk = cjk_subsets is not None
    subset_suffix = (
        f"&subset={urllib.parse.quote_plus(','.join(cjk_subsets))}"
        if cjk_subsets
        else ""
    )
    if requested_variants:
        requested_weights = {400}
        if "bold" in requested_variants or "bold_italic" in requested_variants:
            requested_weights.add(700)
        # Honour named non-standard weights (semibold/medium/...) so we fetch the
        # matching cut instead of falling back to plain 400/700.
        for variant in requested_variants:
            extended_weight = _EXTENDED_WEIGHT_VARIANTS.get(variant)
            if extended_weight:
                requested_weights.add(extended_weight)
    want_italic = (not is_cjk) and (
        "italic" in requested_variants or "bold_italic" in requested_variants
    )
    if requested_weights:
        normalized_weights = sorted(
            {int(weight) for weight in requested_weights if int(weight) > 0}
        )
        if want_italic:
            italic_weights = set()
            if "italic" in requested_variants:
                italic_weights.add(400)
            if "bold_italic" in requested_variants:
                italic_weights.add(700)
            weights_param = ";".join(
                [*(f"0,{weight}" for weight in normalized_weights)]
                + [*(f"1,{weight}" for weight in sorted(italic_weights))]
            )
            return (
                "https://fonts.googleapis.com/css2"
                f"?family={encoded_family}:ital,wght@{weights_param}"
                f"{subset_suffix}&display=swap"
            )
        weight_selector = ";".join(str(weight) for weight in normalized_weights)
        return (
            "https://fonts.googleapis.com/css2"
            f"?family={encoded_family}:wght@{weight_selector}{subset_suffix}&display=swap"
        )
    return (
        "https://fonts.googleapis.com/css2"
        f"?family={encoded_family}{subset_suffix}&display=swap"
    )


def _resolve_theme_typeface(
    typeface: Optional[str], theme_fonts: Optional[Dict[str, str]] = None
) -> Optional[str]:
    if not typeface:
        return None
    cleaned = typeface.strip()
    if not cleaned:
        return None
    if cleaned.startswith("+mj"):
        resolved = (theme_fonts or {}).get("major", "")
        return resolved.strip() or None
    if cleaned.startswith("+mn"):
        resolved = (theme_fonts or {}).get("minor", "")
        return resolved.strip() or None
    return cleaned


def _extract_typefaces_from_text_style_node(
    text_style_node: ET.Element, theme_fonts: Optional[Dict[str, str]] = None
) -> List[str]:
    fonts: List[str] = []
    seen = set()
    font_tags = _FONT_TAGS
    latin_elem = text_style_node.find("a:latin", PPT_NS)
    latin_typeface = (
        _resolve_theme_typeface(latin_elem.get("typeface"), theme_fonts)
        if latin_elem is not None
        else None
    )
    if latin_typeface and latin_typeface not in _THEME_FONT_REFERENCES:
        # Latin text can carry ea/cs fallback faces; counting those adds false positives.
        font_tags = ("a:latin",)
    for font_tag in font_tags:
        font_elem = text_style_node.find(font_tag, PPT_NS)
        if font_elem is None:
            continue
        resolved = _resolve_theme_typeface(font_elem.get("typeface"), theme_fonts)
        if not resolved or resolved in _THEME_FONT_REFERENCES or resolved in seen:
            continue
        seen.add(resolved)
        fonts.append(resolved)
    return fonts


def _extract_fonts_from_xml_root(
    root: ET.Element, theme_fonts: Optional[Dict[str, str]] = None
) -> Set[str]:
    fonts: Set[str] = set()
    for style_tag in _TEXT_STYLE_TAGS:
        for style_elem in root.findall(f".//{style_tag}", PPT_NS):
            fonts.update(_extract_typefaces_from_text_style_node(style_elem, theme_fonts))
    return fonts


def extract_fonts_from_oxml(xml_content: str) -> List[str]:
    """Extract font names referenced by text style nodes inside PPTX XML."""
    try:
        root = ET.fromstring(xml_content)
        return sorted(_extract_fonts_from_xml_root(root))
    except Exception as exc:
        print(f"Error extracting fonts from OXML: {exc}")
        return []


# Helper: Fetch TTF/OTF file URLs for a Google Fonts family via Webfonts Developer API
async def get_google_font_file_urls(family_name: str, api_key: str) -> List[str]:
    encoded_family = urllib.parse.quote_plus(family_name)
    api_url = f"https://www.googleapis.com/webfonts/v1/webfonts?family={encoded_family}&key={api_key}"
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(
                api_url, timeout=aiohttp.ClientTimeout(total=20)
            ) as resp:
                if resp.status != 200:
                    return []
                data = await resp.json()
                items = data.get("items", []) or []
                if not items:
                    return []
                urls: List[str] = []
                # Take first matching family
                files = (items[0] or {}).get("files", {}) or {}
                for _variant, url in files.items():
                    if not url:
                        continue
                    # Prefer directly loadable TTF/OTF files; upgrade to https.
                    fixed_url = url.replace("http://", "https://")
                    lower = fixed_url.lower()
                    if lower.endswith(".ttf") or lower.endswith(".otf"):
                        urls.append(fixed_url)
                return urls
    except Exception:
        return []


async def check_google_font_availability(
    font_name: str, variants: Optional[Sequence[str]] = None
) -> bool:
    """Return True when Google Fonts serves the requested family/variants."""
    try:
        url = build_google_fonts_stylesheet_url(font_name, variants=variants)
        async with aiohttp.ClientSession() as session:
            async with session.get(
                url, timeout=aiohttp.ClientTimeout(total=10)
            ) as response:
                if response.status != 200:
                    return False
                css = await response.text()
                if "@font-face" not in css:
                    return False
                return "fonts.gstatic.com/l/font?kit=" not in css
    except Exception as exc:
        print(f"Error checking Google Font availability for {font_name}: {exc}")
        return False


def extract_raw_fonts_and_embedded_details(
    pptx_path: str, temp_dir: str
) -> Tuple[Set[str], List[FontDetail], List[str]]:
    raw_fonts = extract_used_fonts_from_pptx(pptx_path)

    emb_font_details: List[FontDetail] = []
    emb_font_paths: List[str] = []

    if not raw_fonts:
        return raw_fonts, emb_font_details, emb_font_paths

    with zipfile.ZipFile(pptx_path, "r") as zip_ref:
        emb_fonts_paths_rel = [
            path
            for path in zip_ref.namelist()
            if path.startswith("ppt/fonts/") and path.endswith(".fntdata")
        ]

        for rel_path in emb_fonts_paths_rel:
            try:
                zip_ref.extract(rel_path, temp_dir)
                font_path = os.path.join(temp_dir, rel_path)

                detail = get_font_details(font_path)
                emb_font_details.append(detail)
                emb_font_paths.append(font_path)

            except zipfile.BadZipFile:
                # CORRUPTED EMBEDDED FONT — SKIP
                print(f"Skipping corrupted embedded font: {rel_path}")
                continue
            except Exception as exc:
                # Font parsing failed — also skip
                print(f"Failed to parse embedded font {rel_path}: {exc}")
                continue

    return raw_fonts, emb_font_details, emb_font_paths


# Named weight variants beyond plain regular/bold that we still want to surface
# (e.g. font files / runs that explicitly carry a 600+ "semibold"/"medium" weight).
# Mapping each to an approximate Google Fonts numeric weight so the downstream URL
# builder can request the right cut instead of silently dropping the variant.
_EXTENDED_WEIGHT_VARIANTS: Dict[str, int] = {
    "thin": 100,
    "extralight": 200,
    "extra_light": 200,
    "ultralight": 200,
    "light": 300,
    "medium": 500,
    "semibold": 600,
    "demibold": 600,
    "extrabold": 800,
    "extra_bold": 800,
    "ultrabold": 800,
    "black": 900,
    "heavy": 900,
    "extrablack": 900,
    "extra_black": 900,
    "ultrablack": 900,
}


def normalize_font_variants(variants: Optional[Sequence[str]]) -> List[str]:
    order = ("regular", "bold", "italic", "bold_italic")
    variant_set = set(variants or [])
    if not variant_set:
        variant_set = {"regular"}
    normalized = [variant for variant in order if variant in variant_set]
    # Preserve non-standard weight variants (semibold/demibold/medium/...) instead
    # of silently discarding them; they sort after the canonical four for
    # deterministic, backward-compatible output.
    extras = sorted(
        v
        for v in variant_set
        if v not in order and v in _EXTENDED_WEIGHT_VARIANTS
    )
    if not normalized and not extras:
        normalized = ["regular"]
    return normalized + extras


def _merge_font_variants(
    target: Dict[str, Set[str]], source: Dict[str, Set[str]]
) -> None:
    for font_name, variants in source.items():
        target.setdefault(font_name, set()).update(variants)


def _is_truthy_ooxml_flag(value: Optional[str]) -> bool:
    return str(value or "").lower() in {"1", "true", "on"}


def _font_style_variant(
    font_name: str,
    r_pr: Optional[ET.Element],
    default_rprs: Sequence[ET.Element] = (),
) -> str:
    bold = False
    italic = False
    for style_node in [r_pr, *default_rprs]:
        if style_node is None:
            continue
        if style_node.get("b") is not None:
            bold = _is_truthy_ooxml_flag(style_node.get("b"))
            break
    for style_node in [r_pr, *default_rprs]:
        if style_node is None:
            continue
        if style_node.get("i") is not None:
            italic = _is_truthy_ooxml_flag(style_node.get("i"))
            break

    inferred_weight = _extract_weight_from_name(font_name)
    if inferred_weight == "bold":
        bold = True
    compact_name = _normalize_compact(font_name)
    if "italic" in compact_name or "oblique" in compact_name:
        italic = True

    if bold and italic:
        return "bold_italic"
    if bold:
        return "bold"
    if italic:
        return "italic"
    return "regular"


def extract_used_font_variants_from_pptx(pptx_path: str) -> Dict[str, Set[str]]:
    """Return font names and regular/bold/italic variants used by slide content."""

    def _local_name(tag: str) -> str:
        if "}" in tag:
            return tag.rsplit("}", 1)[-1]
        return tag

    def _read_zip_xml(zip_ref: zipfile.ZipFile, path: str) -> Optional[ET.Element]:
        try:
            return ET.fromstring(zip_ref.read(path))
        except Exception:
            return None

    def _get_relationships(
        zip_ref: zipfile.ZipFile, path: str
    ) -> Dict[str, Dict[str, str]]:
        dir_name = os.path.dirname(path)
        filename = os.path.basename(path)
        rels_path = os.path.join(dir_name, "_rels", f"{filename}.rels").replace("\\", "/")
        rels_xml = _read_zip_xml(zip_ref, rels_path)
        if rels_xml is None:
            return {}

        rels: Dict[str, Dict[str, str]] = {}
        for rel in rels_xml.findall(f"{{{REL_NS}}}Relationship"):
            rel_id = rel.get("Id")
            rel_type = rel.get("Type")
            target = rel.get("Target")
            if not rel_id or not rel_type or not target:
                continue
            if target.startswith("/"):
                resolved = target[1:]
            else:
                resolved = os.path.normpath(os.path.join(dir_name, target)).replace(
                    "\\", "/"
                )
            rels[rel_id] = {"path": resolved, "type": rel_type}
        return rels

    def _load_theme_fonts(zip_ref: zipfile.ZipFile) -> Dict[str, str]:
        presentation_xml = _read_zip_xml(zip_ref, "ppt/presentation.xml")
        if presentation_xml is None:
            return {}
        pres_rels = _get_relationships(zip_ref, "ppt/presentation.xml")
        theme_path = next(
            (
                rel["path"]
                for rel in pres_rels.values()
                if "theme" in rel.get("type", "")
            ),
            "ppt/theme/theme1.xml",
        )
        theme_xml = _read_zip_xml(zip_ref, theme_path)
        if theme_xml is None:
            return {}

        font_scheme = theme_xml.find(".//a:fontScheme", PPT_NS)
        if font_scheme is None:
            return {}

        theme_fonts: Dict[str, str] = {}
        major = font_scheme.find("a:majorFont/a:latin", PPT_NS)
        minor = font_scheme.find("a:minorFont/a:latin", PPT_NS)
        if major is not None and major.get("typeface"):
            theme_fonts["major"] = major.get("typeface", "").strip()
        if minor is not None and minor.get("typeface"):
            theme_fonts["minor"] = minor.get("typeface", "").strip()
        return theme_fonts

    def _get_slide_paths(zip_ref: zipfile.ZipFile) -> List[str]:
        presentation_xml = _read_zip_xml(zip_ref, "ppt/presentation.xml")
        pres_rels = _get_relationships(zip_ref, "ppt/presentation.xml")
        if presentation_xml is None:
            slide_paths = [
                name
                for name in zip_ref.namelist()
                if name.startswith("ppt/slides/slide") and name.endswith(".xml")
            ]
            slide_paths.sort(
                key=lambda name: int(
                    os.path.basename(name).replace("slide", "").replace(".xml", "")
                )
            )
            return slide_paths

        slide_id_list = presentation_xml.find("p:sldIdLst", PPT_NS)
        if slide_id_list is None:
            return []

        slide_paths: List[str] = []
        rel_attr = f"{{{PPT_NS['r']}}}id"
        for slide_id in slide_id_list.findall("p:sldId", PPT_NS):
            rel_id = slide_id.get(rel_attr)
            rel_info = pres_rels.get(rel_id or "")
            if not rel_info or "slide" not in rel_info.get("type", ""):
                continue
            slide_paths.append(rel_info["path"])
        return slide_paths

    def _is_placeholder(shape: ET.Element) -> bool:
        nv_sp_pr = shape.find("p:nvSpPr", PPT_NS)
        if nv_sp_pr is None:
            return False
        nv_pr = nv_sp_pr.find("p:nvPr", PPT_NS)
        if nv_pr is None:
            return False
        return nv_pr.find("p:ph", PPT_NS) is not None

    def _is_hidden(shape: ET.Element) -> bool:
        nv_container = shape.find("p:nvSpPr", PPT_NS)
        if nv_container is None:
            nv_container = shape.find("p:nvPicPr", PPT_NS)
        if nv_container is None:
            nv_container = shape.find("p:nvGraphicFramePr", PPT_NS)
        if nv_container is None:
            return False
        c_nv_pr = nv_container.find("p:cNvPr", PPT_NS)
        if c_nv_pr is None:
            return False
        return c_nv_pr.get("hidden") in {"1", "true"}

    def _get_placeholder_key(shape: ET.Element) -> Optional[Tuple[str, Optional[str]]]:
        nv_sp_pr = shape.find("p:nvSpPr", PPT_NS)
        if nv_sp_pr is None:
            return None
        nv_pr = nv_sp_pr.find("p:nvPr", PPT_NS)
        if nv_pr is None:
            return None
        ph = nv_pr.find("p:ph", PPT_NS)
        if ph is None:
            return None
        return (ph.get("type") or "body", ph.get("idx"))

    def _placeholder_style_key(ph_type: str) -> str:
        if ph_type in {"title", "ctrTitle"}:
            return "title"
        if ph_type == "body":
            return "body"
        return "other"

    def _build_placeholder_text_style_map(
        layout_xml: Optional[ET.Element], master_xml: Optional[ET.Element]
    ) -> Dict[Tuple[str, Optional[str]], Dict[int, List[ET.Element]]]:
        style_map: Dict[Tuple[str, Optional[str]], Dict[int, List[ET.Element]]] = {}

        tx_styles = master_xml.find("p:txStyles", PPT_NS) if master_xml is not None else None
        txstyle_defaults: Dict[str, Dict[int, ET.Element]] = {}
        if tx_styles is not None:
            for name, key in (
                ("p:titleStyle", "title"),
                ("p:bodyStyle", "body"),
                ("p:otherStyle", "other"),
            ):
                style_elem = tx_styles.find(name, PPT_NS)
                if style_elem is None:
                    continue
                per_level: Dict[int, ET.Element] = {}
                for level in range(1, 10):
                    lvl_pr = style_elem.find(f"a:lvl{level}pPr", PPT_NS)
                    if lvl_pr is None:
                        continue
                    def_rpr = lvl_pr.find("a:defRPr", PPT_NS)
                    if def_rpr is not None:
                        per_level[level - 1] = def_rpr
                if per_level:
                    txstyle_defaults[key] = per_level

        for xml_root in (master_xml, layout_xml):
            if xml_root is None:
                continue
            sp_tree = xml_root.find(".//p:spTree", PPT_NS)
            if sp_tree is None:
                continue
            for child in sp_tree:
                if _local_name(child.tag) != "sp":
                    continue
                placeholder_key = _get_placeholder_key(child)
                if not placeholder_key:
                    continue
                base_defaults = txstyle_defaults.get(
                    _placeholder_style_key(placeholder_key[0]), {}
                )
                tx_body = child.find("p:txBody", PPT_NS)
                lst_style = (
                    tx_body.find("a:lstStyle", PPT_NS) if tx_body is not None else None
                )
                per_level: Dict[int, List[ET.Element]] = {}
                for level in range(1, 10):
                    defaults: List[ET.Element] = []
                    if lst_style is not None:
                        lvl_pr = lst_style.find(f"a:lvl{level}pPr", PPT_NS)
                        if lvl_pr is not None:
                            def_rpr = lvl_pr.find("a:defRPr", PPT_NS)
                            if def_rpr is not None:
                                defaults.append(def_rpr)
                    if level - 1 in base_defaults:
                        defaults.append(base_defaults[level - 1])
                    if defaults:
                        per_level[level - 1] = defaults
                if per_level:
                    style_map[placeholder_key] = per_level
        return style_map

    def _paragraph_level(p_pr: Optional[ET.Element]) -> int:
        if p_pr is None:
            return 0
        level_value = p_pr.get("lvl")
        if level_value is None:
            return 0
        try:
            return int(level_value)
        except ValueError:
            return 0

    def _build_local_text_style_map(tx_body: ET.Element) -> Dict[int, List[ET.Element]]:
        lst_style = tx_body.find("a:lstStyle", PPT_NS)
        if lst_style is None:
            return {}
        local_map: Dict[int, List[ET.Element]] = {}
        for level in range(1, 10):
            lvl_pr = lst_style.find(f"a:lvl{level}pPr", PPT_NS)
            if lvl_pr is None:
                continue
            def_rpr = lvl_pr.find("a:defRPr", PPT_NS)
            if def_rpr is not None:
                local_map[level - 1] = [def_rpr]
        return local_map

    def _get_default_rprs(
        p_pr: Optional[ET.Element],
        local_text_styles: Dict[int, List[ET.Element]],
        placeholder_text_styles: Optional[
            Dict[Tuple[str, Optional[str]], Dict[int, List[ET.Element]]]
        ],
        placeholder_key: Optional[Tuple[str, Optional[str]]],
    ) -> List[ET.Element]:
        level = _paragraph_level(p_pr)
        defaults: List[ET.Element] = list(local_text_styles.get(level, []))
        if not placeholder_text_styles or not placeholder_key:
            return defaults
        style_map = placeholder_text_styles.get(placeholder_key)
        if style_map is None and placeholder_key[0]:
            style_map = placeholder_text_styles.get((placeholder_key[0], None))
        if style_map:
            defaults.extend(style_map.get(level, []))
        return defaults

    def _extract_effective_run_font_variants(
        r_pr: Optional[ET.Element],
        default_rprs: Sequence[ET.Element],
        theme_fonts: Dict[str, str],
    ) -> Dict[str, Set[str]]:
        variant_fonts: Dict[str, Set[str]] = {}
        if r_pr is not None:
            direct_fonts = _extract_typefaces_from_text_style_node(r_pr, theme_fonts)
            if direct_fonts:
                for font_name in direct_fonts:
                    variant_fonts.setdefault(font_name, set()).add(
                        _font_style_variant(font_name, r_pr, default_rprs)
                    )
                return variant_fonts
        for default_rpr in default_rprs:
            inherited_fonts = _extract_typefaces_from_text_style_node(
                default_rpr, theme_fonts
            )
            if inherited_fonts:
                for font_name in inherited_fonts:
                    variant_fonts.setdefault(font_name, set()).add(
                        _font_style_variant(font_name, r_pr, [default_rpr])
                    )
                return variant_fonts
        return variant_fonts

    def _collect_fonts_from_text_body(
        tx_body: ET.Element,
        placeholder_text_styles: Optional[
            Dict[Tuple[str, Optional[str]], Dict[int, List[ET.Element]]]
        ],
        placeholder_key: Optional[Tuple[str, Optional[str]]],
        theme_fonts: Dict[str, str],
    ) -> Dict[str, Set[str]]:
        font_variants: Dict[str, Set[str]] = {}
        local_text_styles = _build_local_text_style_map(tx_body)
        run_tags = {f"{{{PPT_NS['a']}}}r", f"{{{PPT_NS['a']}}}fld"}

        for paragraph in tx_body.findall("a:p", PPT_NS):
            p_pr = paragraph.find("a:pPr", PPT_NS)
            default_rprs = _get_default_rprs(
                p_pr, local_text_styles, placeholder_text_styles, placeholder_key
            )
            for child in paragraph:
                if child.tag not in run_tags:
                    continue
                text_node = child.find("a:t", PPT_NS)
                if text_node is None or not text_node.text:
                    continue
                _merge_font_variants(
                    font_variants,
                    _extract_effective_run_font_variants(
                        child.find("a:rPr", PPT_NS),
                        default_rprs,
                        theme_fonts,
                    ),
                )
        return font_variants

    def _iter_shape_nodes(parent: ET.Element):
        for child in parent:
            tag_name = _local_name(child.tag)
            if tag_name == "grpSp":
                yield from _iter_shape_nodes(child)
                continue
            if tag_name in {"sp", "graphicFrame"}:
                yield child

    def _collect_fonts_from_shape_tree(
        sp_tree: ET.Element,
        theme_fonts: Dict[str, str],
        skip_placeholders: bool = False,
        placeholder_text_styles: Optional[
            Dict[Tuple[str, Optional[str]], Dict[int, List[ET.Element]]]
        ] = None,
    ) -> Dict[str, Set[str]]:
        font_variants: Dict[str, Set[str]] = {}
        for shape in _iter_shape_nodes(sp_tree):
            if _is_hidden(shape):
                continue
            if _local_name(shape.tag) == "sp":
                if skip_placeholders and _is_placeholder(shape):
                    continue
                tx_body = shape.find("p:txBody", PPT_NS)
                if tx_body is None:
                    continue
                _merge_font_variants(
                    font_variants,
                    _collect_fonts_from_text_body(
                        tx_body,
                        placeholder_text_styles,
                        _get_placeholder_key(shape),
                        theme_fonts,
                    ),
                )
                continue
            for tx_body in shape.findall(".//a:txBody", PPT_NS):
                _merge_font_variants(
                    font_variants,
                    _collect_fonts_from_text_body(
                        tx_body,
                        placeholder_text_styles=None,
                        placeholder_key=None,
                        theme_fonts=theme_fonts,
                    ),
                )
        return font_variants

    raw_font_variants: Dict[str, Set[str]] = {}
    try:
        with zipfile.ZipFile(pptx_path, "r") as zip_ref:
            theme_fonts = _load_theme_fonts(zip_ref)

            for slide_path in _get_slide_paths(zip_ref):
                slide_xml = _read_zip_xml(zip_ref, slide_path)
                if slide_xml is None:
                    continue
                slide_rels = _get_relationships(zip_ref, slide_path)
                layout_path = next(
                    (
                        rel["path"]
                        for rel in slide_rels.values()
                        if "slideLayout" in rel.get("type", "")
                    ),
                    None,
                )

                layout_xml = _read_zip_xml(zip_ref, layout_path) if layout_path else None
                layout_rels = (
                    _get_relationships(zip_ref, layout_path) if layout_path else {}
                )
                master_path = next(
                    (
                        rel["path"]
                        for rel in layout_rels.values()
                        if "slideMaster" in rel.get("type", "")
                    ),
                    None,
                )
                master_xml = _read_zip_xml(zip_ref, master_path) if master_path else None
                placeholder_text_styles = _build_placeholder_text_style_map(
                    layout_xml, master_xml
                )

                if master_xml is not None:
                    master_sp_tree = master_xml.find(".//p:spTree", PPT_NS)
                    if master_sp_tree is not None:
                        _merge_font_variants(
                            raw_font_variants,
                            _collect_fonts_from_shape_tree(
                                master_sp_tree,
                                theme_fonts=theme_fonts,
                                skip_placeholders=True,
                            ),
                        )

                if layout_xml is not None:
                    layout_sp_tree = layout_xml.find(".//p:spTree", PPT_NS)
                    if layout_sp_tree is not None:
                        _merge_font_variants(
                            raw_font_variants,
                            _collect_fonts_from_shape_tree(
                                layout_sp_tree,
                                theme_fonts=theme_fonts,
                                skip_placeholders=True,
                            ),
                        )

                slide_sp_tree = slide_xml.find(".//p:spTree", PPT_NS)
                if slide_sp_tree is not None:
                    _merge_font_variants(
                        raw_font_variants,
                        _collect_fonts_from_shape_tree(
                            slide_sp_tree,
                            theme_fonts=theme_fonts,
                            placeholder_text_styles=placeholder_text_styles,
                        ),
                    )

            for name in zip_ref.namelist():
                if not name.startswith("ppt/charts/") or not name.endswith(".xml"):
                    continue
                chart_xml = _read_zip_xml(zip_ref, name)
                if chart_xml is None:
                    continue
                for font_name in _extract_fonts_from_xml_root(chart_xml, theme_fonts):
                    raw_font_variants.setdefault(font_name, set()).add("regular")
    except Exception:
        print("Failed to read PPTX XML parts, returning empty fonts list")
        return {}

    return raw_font_variants


def extract_used_fonts_from_pptx(pptx_path: str) -> Set[str]:
    """Return all font names referenced in a PPTX (slides, masters, layouts, theme)."""
    return set(extract_used_font_variants_from_pptx(pptx_path).keys())


async def get_available_and_unavailable_fonts_for_pptx(
    pptx_path: str, temp_dir: str
) -> Tuple[List[Tuple[str, Optional[str]]], List[Tuple[str, Optional[str]]]]:
    """
    Return lists of available/unavailable fonts for a PPTX file.

    Args:
        pptx_path: Path to the PPTX file to inspect.
        temp_dir: Temporary directory for extracted assets.

    Returns:
        Tuple of (available_fonts, unavailable_fonts) where each entry is a list
        of (font_name, url or None).
    """
    raw_fonts, emb_font_details, _ = await asyncio.to_thread(
        extract_raw_fonts_and_embedded_details,
        pptx_path,
        temp_dir,
    )
    font_variants_by_name = await asyncio.to_thread(
        extract_used_font_variants_from_pptx, pptx_path
    )

    if not raw_fonts:
        return [], []

    found_fonts_with_url: Dict[str, str] = {}
    for font_name in raw_fonts:
        match_index = get_index_of_matching_font_detail_or_none(
            font_name, emb_font_details
        )
        if match_index is None:
            continue
        found_fonts_with_url[font_name] = (
            "https://example.com/just-a-placeholder-url.ttf"
        )

    matched_fonts = set(found_fonts_with_url.keys())
    fonts_to_check_raw = sorted(raw_fonts - matched_fonts)

    normalized_variants: Dict[str, Set[str]] = {}
    for font_name, variants in font_variants_by_name.items():
        normalized_name = normalize_font_family_name(font_name)
        if normalized_name:
            normalized_variants.setdefault(normalized_name, set()).update(variants)

    # Auto-substitute well-known fonts Google Fonts does not host (Chinese
    # system/foundry fonts, proprietary Latin office fonts) with a visually
    # similar free family it does host, so they are recognized as available
    # instead of being reported as missing.
    substituted: List[Tuple[str, str]] = []  # (original_name, substitute_family)
    remaining_raw: List[str] = []
    for raw_name in fonts_to_check_raw:
        substitute = _lookup_font_substitute(raw_name)
        if substitute:
            substituted.append((raw_name, substitute))
        else:
            remaining_raw.append(raw_name)

    distinct_substitutes = sorted({sub for _, sub in substituted})
    substitute_availability = (
        await asyncio.gather(
            *[check_google_font_availability(sub) for sub in distinct_substitutes]
        )
        if distinct_substitutes
        else []
    )
    substitute_is_available = dict(zip(distinct_substitutes, substitute_availability))

    fonts_to_check = list({normalize_font_family_name(font) for font in remaining_raw})

    availability_results: List[bool] = []
    if fonts_to_check:
        availability_results = await asyncio.gather(
            *[
                check_google_font_availability(
                    font,
                    variants=normalize_font_variants(normalized_variants.get(font)),
                )
                for font in fonts_to_check
            ]
        )

    available_fonts: List[Tuple[str, Optional[str]]] = []
    unavailable_fonts: List[Tuple[str, Optional[str]]] = []

    for font_name, font_url in found_fonts_with_url.items():
        available_fonts.append((font_name, font_url))

    for original_name, substitute in substituted:
        if substitute_is_available.get(substitute):
            normalized_original = normalize_font_family_name(original_name)
            substitute_url = build_google_fonts_stylesheet_url(
                substitute,
                variants=normalize_font_variants(
                    normalized_variants.get(normalized_original)
                ),
            )
            available_fonts.append((original_name, substitute_url))
        else:
            unavailable_fonts.append(
                (normalize_font_family_name(original_name), None)
            )

    for font, is_available in zip(fonts_to_check, availability_results):
        if is_available:
            google_fonts_url = build_google_fonts_stylesheet_url(
                font,
                variants=normalize_font_variants(normalized_variants.get(font)),
            )
            available_fonts.append((font, google_fonts_url))
        else:
            unavailable_fonts.append((font, None))

    return available_fonts, unavailable_fonts


def create_font_alias_config(
    raw_fonts: List[str],
    extra_includes: Optional[List[str]] = None,
    temp_dir: Optional[str] = None,
    explicit_aliases: Optional[Dict[str, str]] = None,
    protected_font_names: Optional[Sequence[str]] = None,
) -> str:
    """Create a fontconfig alias file mapping variant families to normalized names."""
    mappings: Dict[str, str] = {}
    explicit_aliases = {
        src: dst
        for src, dst in (explicit_aliases or {}).items()
        if src and dst and src != dst
    }
    protected_names = {name for name in (protected_font_names or []) if name}
    explicit_names = set(explicit_aliases.keys()).union(explicit_aliases.values())
    skip_normalization = protected_names.union(explicit_names)
    for font_name in raw_fonts:
        if font_name in skip_normalization:
            continue
        normalized = normalize_font_family_name(font_name)
        if normalized and normalized != font_name:
            mappings[font_name] = normalized
    fd, fonts_conf_path = tempfile.mkstemp(
        prefix="fonts_alias_",
        suffix=".conf",
        dir=temp_dir,
    )
    os.close(fd)
    with open(fonts_conf_path, "w", encoding="utf-8") as cfg:
        cfg.write(
            """<?xml version='1.0'?>
<!DOCTYPE fontconfig SYSTEM "urn:fontconfig:fonts.dtd">
<fontconfig>
  <include>/etc/fonts/fonts.conf</include>
"""
        )
        if extra_includes:
            for include_path in extra_includes:
                if not include_path:
                    continue
                cfg.write(f"  <include>{include_path}</include>\n")
        for src, dst in explicit_aliases.items():
            cfg.write(
                f"""
  <match target="pattern">
    <test name="family" compare="eq">
      <string>{src}</string>
    </test>
    <edit name="family" mode="assign" binding="strong">
      <string>{dst}</string>
    </edit>
  </match>
"""
            )
        for src, dst in mappings.items():
            cfg.write(
                f"""
  <match target="pattern">
    <test name="family" compare="eq">
      <string>{src}</string>
    </test>
    <edit name="family" mode="assign" binding="strong">
      <string>{dst}</string>
    </edit>
  </match>
"""
            )
        cfg.write("\n</fontconfig>\n")
    return fonts_conf_path


def _replace_fonts_in_xml_root(
    root: ET.Element,
    font_mapping: Dict[str, str],
    font_variant_mapping: Optional[Dict[str, Dict[str, str]]] = None,
) -> bool:
    def _first_typeface(style_elem: Optional[ET.Element]) -> Optional[str]:
        if style_elem is None:
            return None
        for font_tag in _FONT_TAGS:
            font_elem = style_elem.find(font_tag, PPT_NS)
            if font_elem is not None and font_elem.get("typeface"):
                return font_elem.get("typeface")
        return None

    changed = False
    for style_tag in _TEXT_STYLE_TAGS:
        for style_elem in root.findall(f".//{style_tag}", PPT_NS):
            for font_tag in _FONT_TAGS:
                font_elem = style_elem.find(font_tag, PPT_NS)
                if font_elem is None:
                    continue
                typeface = font_elem.get("typeface")
                if not typeface:
                    continue
                replacement = None
                variant_mapping = (font_variant_mapping or {}).get(typeface)
                if variant_mapping:
                    variant = _font_style_variant(typeface, style_elem, [])
                    replacement = variant_mapping.get(variant)
                if replacement is None:
                    replacement = font_mapping.get(typeface)
                if replacement and replacement != typeface:
                    font_elem.set("typeface", replacement)
                    changed = True

    run_tags = {f"{{{PPT_NS['a']}}}r", f"{{{PPT_NS['a']}}}fld"}
    for paragraph in root.findall(".//a:p", PPT_NS):
        p_pr = paragraph.find("a:pPr", PPT_NS)
        paragraph_default = (
            p_pr.find("a:defRPr", PPT_NS) if p_pr is not None else None
        )
        inherited_typeface = _first_typeface(paragraph_default)
        if not inherited_typeface:
            continue
        variant_mapping = (font_variant_mapping or {}).get(inherited_typeface)
        if not variant_mapping:
            original_typeface = next(
                (
                    source
                    for source, replacement in font_mapping.items()
                    if replacement == inherited_typeface
                ),
                None,
            )
            if original_typeface:
                variant_mapping = (font_variant_mapping or {}).get(original_typeface)
                inherited_typeface = original_typeface
        if not variant_mapping:
            continue
        for child in paragraph:
            if child.tag not in run_tags:
                continue
            r_pr = child.find("a:rPr", PPT_NS)
            if r_pr is None:
                r_pr = ET.Element(f"{{{PPT_NS['a']}}}rPr")
                child.insert(0, r_pr)
            if _first_typeface(r_pr):
                continue
            variant = _font_style_variant(inherited_typeface, r_pr, [paragraph_default])
            replacement = variant_mapping.get(variant)
            if not replacement:
                continue
            latin = ET.SubElement(r_pr, f"{{{PPT_NS['a']}}}latin")
            latin.set("typeface", replacement)
            changed = True
    return changed


def _replace_fonts_in_pptx_xml(
    pptx_path: str,
    font_mapping: Dict[str, str],
    output_path: str,
    font_variant_mapping: Optional[Dict[str, Dict[str, str]]] = None,
) -> None:
    xml_prefixes = (
        "ppt/slides/",
        "ppt/slideLayouts/",
        "ppt/slideMasters/",
        "ppt/charts/",
    )
    with zipfile.ZipFile(pptx_path, "r") as src, zipfile.ZipFile(
        output_path, "w", compression=zipfile.ZIP_DEFLATED
    ) as dst:
        for info in src.infolist():
            data = src.read(info.filename)
            if info.filename.endswith(".xml") and info.filename.startswith(xml_prefixes):
                try:
                    root = ET.fromstring(data)
                    if _replace_fonts_in_xml_root(
                        root, font_mapping, font_variant_mapping
                    ):
                        data = ET.tostring(
                            root, encoding="utf-8", xml_declaration=True
                        )
                except Exception:
                    pass
            dst.writestr(info, data)


# ---------------------------------------------------------------------------
# OpenXML font embedding (defensive).
#
# Renaming font references inside the XML keeps the deck looking right only on
# machines that already have the substitute (Noto CJK) families installed. To
# survive moving the .pptx to another machine we additionally embed the actual
# TrueType files into ppt/fonts/ and wire up the OpenXML parts PowerPoint expects.
#
# EVERY step here is best-effort: any failure (missing fontconfig, missing font
# file, malformed XML, ...) makes the whole embed a no-op and the previously
# written (rename-only) output_path is left untouched. Embedding must never raise
# or produce a corrupt file.
# ---------------------------------------------------------------------------
_FONT_REL_TYPE = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/font"
_CT_NS = "http://schemas.openxmlformats.org/package/2006/content-types"
# Schema order of CT_Presentation children; embeddedFontLst must slot in here.
_PRESENTATION_CHILD_ORDER = (
    "sldMasterIdLst",
    "notesMasterIdLst",
    "handoutMasterIdLst",
    "sldIdLst",
    "sldSz",
    "notesSz",
    "smartTags",
    "embeddedFontLst",
    "custShowLst",
    "photoAlbum",
    "custDataLst",
    "kinsoku",
    "defaultTextStyle",
    "modifyVerifier",
    "extLst",
)


def _fc_match_font_file(family_name: str) -> Optional[str]:
    """Resolve a family name to an on-disk TTF/OTF/TTC path via fontconfig.

    fc-match always returns *some* file, even when the requested family is not
    installed, so we verify the matched family list actually contains the family
    we asked for. Returns None when fontconfig is unavailable, the match is a
    mismatch, or the file is not a usable sfnt container.
    """
    if not family_name or not family_name.strip():
        return None
    try:
        result = subprocess.run(
            ["fc-match", "-f", "%{file}\t%{family}", family_name],
            check=True,
            capture_output=True,
            text=True,
            timeout=15,
        )
    except Exception:
        return None
    out = (result.stdout or "").strip()
    if not out or "\t" not in out:
        return None
    file_path, matched_families = out.split("\t", 1)
    file_path = file_path.strip()
    if not file_path or not os.path.isfile(file_path):
        return None
    if os.path.splitext(file_path)[1].lower() not in (".ttf", ".otf", ".ttc", ".otc"):
        return None
    # Confirm the match is genuine: the requested family must appear among the
    # matched family aliases (case/space-insensitive). Otherwise fontconfig just
    # gave us its generic fallback and embedding it would be wrong.
    requested = _fold_font_name(family_name)
    candidates = {
        _fold_font_name(fam) for fam in matched_families.split(",") if fam.strip()
    }
    if requested and not any(
        requested == cand or requested in cand or cand in requested
        for cand in candidates
        if cand
    ):
        return None
    return file_path


def _read_font_bytes_for_embedding(file_path: str) -> Optional[bytes]:
    """Read a font file's bytes, flattening .ttc/.otc collections to a single face."""
    try:
        ext = os.path.splitext(file_path)[1].lower()
        if ext in (".ttc", ".otc"):
            # PowerPoint embeds single faces; extract the first face from a collection.
            try:
                font = TTFont(file_path, fontNumber=0)
                buffer = tempfile.NamedTemporaryFile(
                    delete=False, suffix=".ttf"
                )
                tmp_path = buffer.name
                buffer.close()
                try:
                    font.save(tmp_path)
                    font.close()
                    with open(tmp_path, "rb") as handle:
                        return handle.read()
                finally:
                    try:
                        os.unlink(tmp_path)
                    except Exception:
                        pass
            except Exception:
                return None
        with open(file_path, "rb") as handle:
            return handle.read()
    except Exception:
        return None


def _collect_embed_target_families(
    font_mapping: Dict[str, str],
    font_variant_mapping: Optional[Dict[str, Dict[str, str]]],
) -> List[str]:
    """Collect the distinct destination families we should try to embed.

    Only CJK substitute families are worth embedding (those are what go missing
    across machines); Latin twins like Arimo/Tinos are widely available and skipped.
    """
    targets: List[str] = []
    seen: Set[str] = set()

    def _consider(name: Optional[str]) -> None:
        if not name:
            return
        cleaned = name.strip()
        if not cleaned:
            return
        key = cleaned.lower()
        if key in seen:
            return
        # Embed CJK Noto families and anything else that itself carries CJK text.
        if _cjk_google_font_subsets(cleaned) is None and not _contains_cjk(cleaned):
            return
        seen.add(key)
        targets.append(cleaned)

    for dst in (font_mapping or {}).values():
        _consider(dst)
    for variant_map in (font_variant_mapping or {}).values():
        for dst in (variant_map or {}).values():
            _consider(dst)
    return targets


def _embed_fonts_in_pptx(
    pptx_path: str,
    font_mapping: Dict[str, str],
    font_variant_mapping: Optional[Dict[str, Dict[str, str]]],
) -> bool:
    """Embed CJK substitute font files into an already-written PPTX, in place.

    Returns True when at least one font was embedded. On any error the file is
    rewritten back to its original bytes so the caller's rename-only output stays
    intact. Never raises.
    """
    families = _collect_embed_target_families(font_mapping, font_variant_mapping)
    if not families:
        return False

    # Resolve each family to real font bytes; skip families we cannot locate.
    resolved: List[Tuple[str, bytes]] = []
    for family in families:
        file_path = _fc_match_font_file(family)
        if not file_path:
            continue
        font_bytes = _read_font_bytes_for_embedding(file_path)
        if not font_bytes:
            continue
        resolved.append((family, font_bytes))
    if not resolved:
        return False

    original_bytes: Optional[bytes] = None
    try:
        with open(pptx_path, "rb") as handle:
            original_bytes = handle.read()

        pres_rels_name = "ppt/_rels/presentation.xml.rels"
        with zipfile.ZipFile(pptx_path, "r") as zip_ref:
            names = zip_ref.namelist()
            name_set = set(names)
            existing = {name: zip_ref.read(name) for name in names}

        content_types_raw = existing.get("[Content_Types].xml")
        presentation_raw = existing.get("ppt/presentation.xml")
        if content_types_raw is None or presentation_raw is None:
            return False

        # Skip when the deck already declares embedded fonts to avoid clobbering.
        if b"embeddedFontLst" in presentation_raw:
            return False

        pres_rels_raw = existing.get(pres_rels_name)

        # 1) Allocate font part names + relationship ids.
        existing_rel_ids = {
            rid.decode("ascii")
            for rid in re.findall(rb'Id="(rId\d+)"', pres_rels_raw or b"")
        }

        def _next_rel_id() -> str:
            n = 1
            while f"rId{n}" in existing_rel_ids:
                n += 1
            rid = f"rId{n}"
            existing_rel_ids.add(rid)
            return rid

        font_parts: Dict[str, bytes] = {}  # part name -> font bytes
        # (typeface, rId, part_target_relative_to_ppt)
        embed_entries: List[Tuple[str, str, str]] = []
        next_font_index = 1
        for family, font_bytes in resolved:
            part_name = f"ppt/fonts/font{next_font_index}.fntdata"
            while part_name in name_set or part_name in font_parts:
                next_font_index += 1
                part_name = f"ppt/fonts/font{next_font_index}.fntdata"
            next_font_index += 1
            font_parts[part_name] = font_bytes
            rid = _next_rel_id()
            # Relationship targets in presentation.xml.rels are relative to ppt/.
            embed_entries.append((family, rid, part_name[len("ppt/"):]))

        # 2) [Content_Types].xml — ensure the fntdata default extension exists.
        content_types_xml = _ensure_fntdata_content_type(content_types_raw)

        # 3) presentation.xml.rels — append font relationships.
        pres_rels_xml = _append_font_relationships(pres_rels_raw, embed_entries)

        # 4) presentation.xml — embedTrueTypeFonts flag + <p:embeddedFontLst>.
        presentation_xml = _inject_embedded_font_list(presentation_raw, embed_entries)
        if presentation_xml is None:
            return False

        # 5) Rewrite the archive with the new + amended parts.
        tmp_fd, tmp_path = tempfile.mkstemp(suffix=".pptx", dir=os.path.dirname(pptx_path) or None)
        os.close(tmp_fd)
        overrides = {
            "[Content_Types].xml": content_types_xml,
            "ppt/presentation.xml": presentation_xml,
            pres_rels_name: pres_rels_xml,
        }
        try:
            with zipfile.ZipFile(
                tmp_path, "w", compression=zipfile.ZIP_DEFLATED
            ) as dst:
                for name in names:
                    dst.writestr(name, overrides.get(name, existing[name]))
                # presentation.xml.rels may be brand new.
                if pres_rels_name not in name_set:
                    dst.writestr(pres_rels_name, pres_rels_xml)
                for part_name, font_bytes in font_parts.items():
                    dst.writestr(part_name, font_bytes)
            os.replace(tmp_path, pptx_path)
        finally:
            if os.path.exists(tmp_path):
                try:
                    os.unlink(tmp_path)
                except Exception:
                    pass
        return True
    except Exception:
        # Restore original bytes on any failure so the rename-only output stays valid.
        if original_bytes is not None:
            try:
                with open(pptx_path, "wb") as handle:
                    handle.write(original_bytes)
            except Exception:
                pass
        return False


def _ensure_fntdata_content_type(content_types_raw: bytes) -> bytes:
    """Add a <Default Extension="fntdata" .../> to [Content_Types].xml if absent."""
    ET.register_namespace("", _CT_NS)
    root = ET.fromstring(content_types_raw)
    for default in root.findall(f"{{{_CT_NS}}}Default"):
        if (default.get("Extension") or "").lower() == "fntdata":
            return content_types_raw
    default = ET.Element(f"{{{_CT_NS}}}Default")
    default.set("Extension", "fntdata")
    default.set("ContentType", "application/x-fontdata")
    root.insert(0, default)
    return ET.tostring(root, encoding="utf-8", xml_declaration=True)


def _append_font_relationships(
    pres_rels_raw: Optional[bytes],
    embed_entries: Sequence[Tuple[str, str, str]],
) -> bytes:
    """Append font relationships to presentation.xml.rels (creating it if needed)."""
    ET.register_namespace("", REL_NS)
    if pres_rels_raw:
        root = ET.fromstring(pres_rels_raw)
    else:
        root = ET.Element(f"{{{REL_NS}}}Relationships")
    for _family, rid, target in embed_entries:
        rel = ET.SubElement(root, f"{{{REL_NS}}}Relationship")
        rel.set("Id", rid)
        rel.set("Type", _FONT_REL_TYPE)
        rel.set("Target", target)
    return ET.tostring(root, encoding="utf-8", xml_declaration=True)


def _inject_embedded_font_list(
    presentation_raw: bytes,
    embed_entries: Sequence[Tuple[str, str, str]],
) -> Optional[bytes]:
    """Set embedTrueTypeFonts and insert <p:embeddedFontLst> into presentation.xml."""
    for prefix, uri in PPT_NS.items():
        ET.register_namespace(prefix, uri)
    root = ET.fromstring(presentation_raw)
    root.set("embedTrueTypeFonts", "1")

    p_uri = PPT_NS["p"]
    r_uri = PPT_NS["r"]
    font_lst = ET.Element(f"{{{p_uri}}}embeddedFontLst")
    for family, rid, _target in embed_entries:
        embedded = ET.SubElement(font_lst, f"{{{p_uri}}}embeddedFont")
        font = ET.SubElement(embedded, f"{{{p_uri}}}font")
        font.set("typeface", family)
        # We embed a single face per family covering the remapped runs; expose it
        # via the regular slot. PowerPoint synthesizes bold/italic from it, which
        # is the safest minimal-and-valid form (no dangling slot references).
        regular = ET.SubElement(embedded, f"{{{p_uri}}}regular")
        regular.set(f"{{{r_uri}}}id", rid)

    # Insert in the schema-defined position within CT_Presentation.
    insert_at = len(list(root))
    order_index = _PRESENTATION_CHILD_ORDER.index("embeddedFontLst")
    later_tags = {
        f"{{{p_uri}}}{tag}" for tag in _PRESENTATION_CHILD_ORDER[order_index + 1:]
    }
    for index, child in enumerate(list(root)):
        if child.tag in later_tags:
            insert_at = index
            break
    root.insert(insert_at, font_lst)
    return ET.tostring(root, encoding="utf-8", xml_declaration=True)


def replace_fonts_in_pptx(
    pptx_path: str,
    font_mapping: Dict[str, str],
    output_path: str,
    font_variant_mapping: Optional[Dict[str, Dict[str, str]]] = None,
) -> None:
    """
    Replace fonts in a PPTX file using python-pptx.

    After rewriting the font references, this also best-effort embeds the local
    TrueType files for the substitute (CJK) families so the deck keeps rendering
    correctly on machines that lack those fonts. The embedding step is fully
    defensive: any failure leaves the rename-only output untouched.

    Args:
        pptx_path: Path to input PPTX file
        font_mapping: Dictionary mapping old font names to new font names
        output_path: Path to save modified PPTX file
    """
    if font_variant_mapping:
        _replace_fonts_in_pptx_xml(
            pptx_path, font_mapping, output_path, font_variant_mapping
        )
    elif font_mapping:
        _replace_fonts_in_pptx_xml(pptx_path, font_mapping, output_path)
    else:
        prs = Presentation(pptx_path)

        # Iterate through all slides
        for slide in prs.slides:
            for shape in slide.shapes:
                if hasattr(shape, "text_frame"):
                    for paragraph in shape.text_frame.paragraphs:
                        for run in paragraph.runs:
                            if run.font.name and run.font.name in font_mapping:
                                run.font.name = font_mapping[run.font.name]

                # Handle tables safely (python-pptx raises ValueError if non-table)
                if getattr(shape, "has_table", False):
                    for row in shape.table.rows:
                        for cell in row.cells:
                            for paragraph in cell.text_frame.paragraphs:
                                for run in paragraph.runs:
                                    if run.font.name and run.font.name in font_mapping:
                                        run.font.name = font_mapping[run.font.name]

        # Update slide layouts
        for slide_layout in prs.slide_layouts:
            for shape in slide_layout.shapes:
                if hasattr(shape, "text_frame"):
                    for paragraph in shape.text_frame.paragraphs:
                        for run in paragraph.runs:
                            if run.font.name and run.font.name in font_mapping:
                                run.font.name = font_mapping[run.font.name]

        # Update slide masters
        for slide_master in prs.slide_masters:
            for shape in slide_master.shapes:
                if hasattr(shape, "text_frame"):
                    for paragraph in shape.text_frame.paragraphs:
                        for run in paragraph.runs:
                            if run.font.name and run.font.name in font_mapping:
                                run.font.name = font_mapping[run.font.name]

        # Save the modified presentation
        prs.save(output_path)

    # Best-effort: embed the substitute CJK font files so the deck survives being
    # opened on a machine without them. Never lets a failure break the export.
    try:
        _embed_fonts_in_pptx(output_path, font_mapping, font_variant_mapping)
    except Exception:
        pass


def extract_font_from_eot(eot_path: Path) -> bytes:
    """Extract embedded font data from an EOT file."""
    with open(eot_path, "rb") as f:
        data = f.read()

    # EOT file structure:
    # - Header (variable length)
    # - Font family name (Unicode, null-terminated)
    # - Font style name (Unicode, null-terminated)
    # - Font version (Unicode, null-terminated)
    # - Font full name (Unicode, null-terminated)
    # - RootString (Unicode, null-terminated)
    # - Signature (4 bytes: "BSGP")
    # - Embedded font data (TTF/OTF) starts with "OTTO" or "ttcf"

    # Find the OpenType font signature - this marks the start of the embedded font
    # "OTTO" = OpenType with CFF (PostScript outlines)
    # "ttcf" = TrueType Collection
    # "\x00\x01\x00\x00" = TrueType with TrueType outlines
    otto_pos = data.find(b"OTTO")
    ttcf_pos = data.find(b"ttcf")
    ttf_pos = data.find(b"\x00\x01\x00\x00")

    font_start = -1
    if otto_pos != -1:
        font_start = otto_pos
    elif ttcf_pos != -1:
        font_start = ttcf_pos
    elif ttf_pos != -1:
        font_start = ttf_pos

    if font_start == -1:
        raise ValueError(
            "Could not find embedded font signature (OTTO/ttcf/TTF) in EOT file"
        )

    # Extract the embedded font from the found position to the end of file
    embedded_font = data[font_start:]

    return embedded_font


def get_font_details(path: str) -> FontDetail:
    """Extract detailed information from a font file."""
    font_path = Path(path)
    details = {
        "file": path,
        "size_bytes": font_path.stat().st_size,
        "error": None,
    }

    try:
        # Check if it's an EOT file
        is_eot = (
            font_path.suffix.lower() == ".fntdata" or font_path.suffix.lower() == ".eot"
        )

        if is_eot:
            # Extract embedded font from EOT
            try:
                embedded_font_data = extract_font_from_eot(font_path)
                # Create a temporary file to hold the extracted font
                with tempfile.NamedTemporaryFile(
                    delete=False, suffix=".ttf"
                ) as tmp_file:
                    tmp_file.write(embedded_font_data)
                    tmp_path = tmp_file.name

                try:
                    font = TTFont(tmp_path)
                finally:
                    # Clean up temp file
                    try:
                        os.unlink(tmp_path)
                    except Exception:
                        pass
            except Exception as e:
                # If extraction fails, try reading EOT metadata directly
                details["eot_extraction_error"] = str(e)
                # Fall through to try direct reading
                font = TTFont(str(font_path))
        else:
            # Try to open the font file directly
            font = TTFont(str(font_path))

        # Get font names from the 'name' table
        name_table = font.get("name")
        if name_table:
            names = {}
            for record in name_table.names:
                name_id = record.nameID
                platform_id = record.platformID
                # Prefer Unicode names (platformID 3) or Mac (platformID 1)
                if platform_id in (1, 3) or name_id not in names:
                    try:
                        name_str = (
                            record.toUnicode()
                            if hasattr(record, "toUnicode")
                            else str(record)
                        )
                        if name_str:
                            cleaned_name = _clean_font_metadata_string(name_str)
                            if cleaned_name:
                                names[name_id] = cleaned_name
                    except Exception:
                        pass

            # Map name IDs to readable names
            name_mapping = {
                1: "family_name",
                2: "subfamily_name",
                3: "unique_id",
                4: "full_name",
                5: "version",
                6: "postscript_name",
                7: "trademark",
                8: "manufacturer",
                9: "designer",
                10: "description",
                11: "vendor_url",
                12: "designer_url",
                13: "license",
                14: "license_url",
            }

            for name_id, key in name_mapping.items():
                if name_id in names:
                    details[key] = names[name_id]

        # Get OS/2 table for additional metrics
        os2_table = font.get("OS/2")
        if os2_table:
            details["weight_class"] = os2_table.usWeightClass
            details["width_class"] = os2_table.usWidthClass
            details["cap_height"] = getattr(os2_table, "sCapHeight", None)
            details["x_height"] = getattr(os2_table, "sxHeight", None)
            details["ascent"] = getattr(os2_table, "usWinAscent", None)
            details["descent"] = getattr(os2_table, "usWinDescent", None)

        # Get head table for font metrics
        head_table = font.get("head")
        if head_table:
            details["units_per_em"] = head_table.unitsPerEm
            details["created"] = head_table.created
            details["modified"] = head_table.modified

        # Get hhea table for horizontal metrics
        hhea_table = font.get("hhea")
        if hhea_table:
            details["ascender"] = hhea_table.ascent
            details["descender"] = hhea_table.descent
            details["line_gap"] = hhea_table.lineGap

        # Get number of glyphs
        if "cmap" in font:
            details["num_glyphs"] = len(font.getGlyphSet())

        # Get font format
        if hasattr(font, "sfntVersion"):
            details["format"] = _normalize_font_format(font.sfntVersion)

        font.close()

    except Exception as e:
        details["error"] = str(e)

    return FontDetail(**details)


def convert_eot_to_ttf(inp_path: str, out_dir: str) -> str:
    """
    Convert an EOT file to TTF format.

    Args:
        inp_path: Path to the input EOT file
        out_dir: Output directory where the converted font file will be saved

    Returns:
        Path to the converted font file
    """
    eot_path = Path(inp_path)
    out_dir_path = Path(out_dir)

    if not eot_path.exists():
        raise FileNotFoundError(f"EOT file not found: {eot_path}")

    # Create output directory if it doesn't exist
    out_dir_path.mkdir(parents=True, exist_ok=True)

    # Extract embedded font from EOT
    embedded_font_data = extract_font_from_eot(eot_path)

    # Determine the font format from the signature
    if embedded_font_data.startswith(b"OTTO"):
        font_format = "otf"
        default_ext = ".otf"
    elif embedded_font_data.startswith(b"ttcf"):
        font_format = "ttc"  # TrueType Collection
        default_ext = ".ttc"
    elif embedded_font_data.startswith(b"\x00\x01\x00\x00"):
        font_format = "ttf"
        default_ext = ".ttf"
    else:
        # Default to TTF if we can't determine
        font_format = "ttf"
        default_ext = ".ttf"

    # Construct output path in the output directory
    output_path = out_dir_path / f"{eot_path.stem}{default_ext}"

    # If the embedded font is OTF but output is requested as TTF,
    # attempt conversion using fonttools
    if font_format == "otf" and output_path.suffix.lower() == ".ttf":
        try:
            # Write to temp file first
            with tempfile.NamedTemporaryFile(delete=False, suffix=".otf") as tmp_file:
                tmp_file.write(embedded_font_data)
                tmp_otf_path = tmp_file.name

            try:
                # Open the OTF font
                font = TTFont(tmp_otf_path)

                # Try to convert CFF to TrueType outlines
                # This is a complex process - fonttools can't directly convert CFF to TTF
                # but we can try to save it and see if it works
                # Note: This may not work perfectly for all fonts
                font.flavor = None

                # Save as TTF (fonttools will attempt conversion)
                font.save(output_path)
                font.close()

                print(
                    "Note: Converted OTF (PostScript outlines) to TTF format. "
                    "Some glyph outlines may need manual adjustment."
                )
            finally:
                # Clean up temp file
                try:
                    os.unlink(tmp_otf_path)
                except Exception:
                    pass
        except Exception as e:
            # If conversion fails, save as OTF instead
            actual_output = output_path.with_suffix(".otf")
            with open(actual_output, "wb") as f:
                f.write(embedded_font_data)
            print(
                f"Warning: Could not convert OTF to TTF ({e}). "
                f"Saved as {actual_output.name} instead. "
                f"OTF to TTF conversion requires glyph outline recompilation."
            )
            return str(actual_output)
    else:
        # Write the extracted font directly to the output file
        with open(output_path, "wb") as f:
            f.write(embedded_font_data)

    return str(output_path)


_WEIGHT_KEYWORDS = {
    "thin": (
        "thin",
        "hairline",
    ),
    "extra_light": (
        "extra light",
        "extra-light",
        "extralight",
        "ultra light",
        "ultra-light",
        "ultralight",
    ),
    "light": ("light",),
    "regular": (
        "regular",
        "normal",
        "book",
    ),
    "medium": ("medium",),
    "semibold": (
        "semi bold",
        "semi-bold",
        "semibold",
        "demi bold",
        "demi-bold",
        "demibold",
    ),
    "bold": ("bold",),
    "extra_bold": (
        "extra bold",
        "extra-bold",
        "extrabold",
        "ultra bold",
        "ultra-bold",
        "ultrabold",
    ),
    "black": (
        "black",
        "heavy",
    ),
    "extra_black": (
        "extra black",
        "extra-black",
        "extrablack",
        "ultra black",
        "ultra-black",
        "ultrablack",
        "super black",
        "super-black",
        "superblack",
    ),
}

_STYLE_KEYWORDS = ("italic", "oblique")

# Chinese weight words mapped to the canonical weight keys above. Ordered
# longest-first so compound words ("超粗"/"中黑") win over single chars ("粗").
#
# NOTE: a bare "黑"/"中"/"重" is intentionally NOT a weight word here — "黑" is the
# Hei typeface category ("微软雅黑", "黑体"), not a bold indicator, so treating it as
# a weight would mis-flag regular-weight families as bold. Compounds like "中黑"
# (a genuine semibold cut) are still recognised.
_CJK_WEIGHT_KEYWORDS: Tuple[Tuple[str, str], ...] = (
    ("极细", "thin"),
    ("纤细", "thin"),
    ("超细", "thin"),
    ("特细", "extra_light"),
    ("细体", "light"),
    ("中黑", "semibold"),
    ("超粗", "extra_bold"),
    ("特粗", "extra_bold"),
    ("极粗", "black"),
    ("粗体", "bold"),
    ("中等", "medium"),
    ("标准", "regular"),
    ("常规", "regular"),
    ("普通", "regular"),
    ("纤", "thin"),
    ("细", "light"),
    ("粗", "bold"),
)


def _extract_cjk_weight_from_name(value: Optional[str]) -> Optional[str]:
    """Map a trailing Chinese weight word to a canonical weight key, else None."""
    if not value:
        return None
    text = value.strip()
    if not _contains_cjk(text):
        return None
    for token, canonical in _CJK_WEIGHT_KEYWORDS:
        # Require the weight word to be a real suffix on a longer family name so a
        # standalone "黑"/"中" never gets misread as a weight on its own.
        if len(text) > len(token) and text.endswith(token):
            return canonical
    return None


_WEIGHT_CLASS_BUCKETS = (
    ("thin", 0, 149),
    ("extra_light", 150, 249),
    ("light", 250, 349),
    ("regular", 350, 449),
    ("medium", 450, 549),
    ("semibold", 550, 649),
    ("bold", 650, 749),
    ("extra_bold", 750, 849),
    ("black", 850, 925),
    ("extra_black", 926, 1000),
)


def _normalize_text(value: Optional[str]) -> str:
    if not value:
        return ""
    lowered = value.lower()
    lowered = re.sub(r"[^a-z0-9]+", " ", lowered)
    return re.sub(r"\s+", " ", lowered).strip()


def _normalize_compact(value: Optional[str]) -> str:
    if not value:
        return ""
    return re.sub(r"[^a-z0-9]+", "", value.lower())


@lru_cache(maxsize=1)
def _get_weight_keyword_index():
    entries = []
    for canonical, phrases in _WEIGHT_KEYWORDS.items():
        for phrase in phrases:
            normalized = _normalize_text(phrase)
            compact = _normalize_compact(phrase)
            if normalized:
                entries.append((normalized, compact, canonical))
    entries.sort(key=lambda item: len(item[0]), reverse=True)
    return tuple(entries)


@lru_cache(maxsize=1)
def _get_removal_keywords():
    keywords = set()
    for normalized, _, _ in _get_weight_keyword_index():
        if normalized:
            keywords.add(normalized)
    for style in _STYLE_KEYWORDS:
        normalized_style = _normalize_text(style)
        if normalized_style:
            keywords.add(normalized_style)
    return tuple(sorted(keywords, key=len, reverse=True))


def _family_key(value: Optional[str]) -> str:
    normalized = _normalize_text(value)
    if not normalized:
        return ""
    cleaned = normalized
    for keyword in _get_removal_keywords():
        pattern = r"\b" + re.escape(keyword) + r"\b"
        cleaned = re.sub(pattern, " ", cleaned)
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    target = cleaned if cleaned else normalized
    return re.sub(r"\s+", "", target)


def _extract_weight_from_name(value: Optional[str]) -> Optional[str]:
    normalized = _normalize_text(value)
    if normalized:
        compact = _normalize_compact(value)
        padded = f" {normalized} "
        for phrase_norm, phrase_compact, canonical in _get_weight_keyword_index():
            if not phrase_norm:
                continue
            if f" {phrase_norm} " in padded:
                return canonical
            if phrase_compact and phrase_compact in compact:
                return canonical
    # Fall back to Chinese weight words ("微软雅黑-粗", "思源黑体细"), which the
    # Latin-only normalization above strips away entirely.
    return _extract_cjk_weight_from_name(value)


def _weight_from_class(weight_class: Optional[int]) -> Optional[str]:
    if weight_class is None:
        return None
    for canonical, lower, upper in _WEIGHT_CLASS_BUCKETS:
        if lower <= weight_class <= upper:
            return canonical
    return None


def _extract_weight_from_detail(font_detail: FontDetail) -> Optional[str]:
    weight = _weight_from_class(font_detail.weight_class)
    if weight:
        return weight
    for candidate in (
        font_detail.subfamily_name,
        font_detail.full_name,
        font_detail.postscript_name,
    ):
        weight = _extract_weight_from_name(candidate)
        if weight:
            return weight
    return None


def _weight_value_from_canonical(weight_key: Optional[str]) -> Optional[int]:
    if not weight_key:
        return None
    for canonical, lower, upper in _WEIGHT_CLASS_BUCKETS:
        if canonical == weight_key:
            return (lower + upper) // 2
    return None


def _weight_value_from_detail(font_detail: FontDetail) -> Optional[int]:
    canonical = _extract_weight_from_detail(font_detail)
    midpoint = _weight_value_from_canonical(canonical)
    if midpoint is not None:
        return midpoint
    if font_detail.weight_class is not None:
        for _, lower, upper in _WEIGHT_CLASS_BUCKETS:
            if lower <= font_detail.weight_class <= upper:
                return (lower + upper) // 2
    return None


def get_index_of_matching_font_detail_or_none(
    font_name: str, font_details: Sequence[FontDetail]
) -> Optional[int]:
    """
    Return the index of the font detail that best matches the provided font name.
    Family equality must match. If the requested weight is unspecified we treat it
    as a regular weight, but we still fall back to the closest match when no exact
    or regular-weight match can be found.
    """
    if not font_name or not font_details:
        return None

    family_key = _family_key(font_name)
    if not family_key:
        return None

    font_weight = _extract_weight_from_name(font_name)
    expected_weight = font_weight or "regular"
    expected_weight_value = _weight_value_from_canonical(expected_weight) or 400

    best_index: Optional[int] = None
    best_score = -1
    fallback_index: Optional[int] = None
    fallback_diff = float("inf")

    for index, font_detail in enumerate(font_details):
        if not font_detail:
            continue

        detail_keys = set()
        for value in (
            font_detail.full_name,
            font_detail.postscript_name,
            font_detail.family_name,
            font_detail.subfamily_name,
        ):
            key = _family_key(value)
            if key:
                detail_keys.add(key)

        if not detail_keys or family_key not in detail_keys:
            continue

        detail_weight = _extract_weight_from_detail(font_detail)
        detail_weight_value = (
            _weight_value_from_detail(font_detail) or expected_weight_value
        )

        score = 1
        if detail_weight == expected_weight:
            score = 3
        elif detail_weight is None and expected_weight == "regular":
            score = 2

        if score > best_score:
            best_index = index
            best_score = score

        diff = abs(detail_weight_value - expected_weight_value)
        if diff < fallback_diff:
            fallback_index = index
            fallback_diff = diff

    if best_score >= 2:
        return best_index
    return fallback_index


def extract_font_name_from_file(file_path: str) -> str:
    """Extract the canonical font family name from a font file."""
    filename = os.path.basename(file_path)
    try:
        font = TTFont(file_path)
        if "name" in font:
            name_table = font["name"]
            for name_id in [1, 4, 6]:
                for record in name_table.names:
                    if record.nameID == name_id:
                        if record.langID == 0x409 or record.langID == 0:
                            font_name = record.toUnicode().strip()
                            if font_name:
                                font.close()
                                return font_name
            for record in name_table.names:
                if record.nameID == 1:
                    font_name = record.toUnicode().strip()
                    if font_name:
                        font.close()
                        return font_name
        font.close()
    except Exception as exc:
        print(f"[FONT DEBUG] Error reading font metadata for {filename}: {exc}")
    base_name = os.path.splitext(filename)[0]
    if "_" in filename and len(filename.split("_")[-1].split(".")[0]) == 8:
        parts = filename.split("_")
        if len(parts) > 1:
            return "_".join(parts[:-1])
    return base_name
