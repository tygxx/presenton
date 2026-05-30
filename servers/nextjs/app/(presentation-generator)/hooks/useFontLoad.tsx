
// 判断字体名是否为 CJK（中日韩）字体：命中常见 CJK 字体名关键字或本身含 CJK 字符。
const CJK_FONT_NAME_HINTS = [
    "noto sans sc",
    "noto serif sc",
    "noto sans tc",
    "noto serif tc",
    "noto sans jp",
    "noto sans kr",
    "source han",
    "思源",
    "pingfang",
    "苹方",
    "microsoft yahei",
    "微软雅黑",
    "yahei",
    "hiragino",
    "songti",
    "宋体",
    "heiti",
    "黑体",
    "kaiti",
    "楷体",
    "fangsong",
    "仿宋",
    "wenquanyi",
    "文泉驿",
    "ma shan",
    "zcool",
    "long cang",
    "liu jian",
    "zhi mang",
];

const isCjkFontName = (name: string): boolean => {
    if (!name) return false;
    const lower = name.toLowerCase();
    if (CJK_FONT_NAME_HINTS.some((hint) => lower.includes(hint))) return true;
    // 字体名本身含 CJK 字符（如「思源黑体」）
    return /[一-鿿぀-ヿ가-힯]/.test(name);
};

// 给 Google Fonts CSS URL 补上简体中文 subset，确保按需加载中文字形（否则只下载拉丁字形，中文仍是豆腐块）。
const withChineseSubset = (url: string): string => {
    try {
        if (!/fonts\.googleapis\.com/.test(url)) return url;
        if (/(\?|&)subset=/.test(url)) return url; // 已显式指定 subset，尊重原值
        if (/subset=chinese-simplified/.test(url)) return url;
        const sep = url.includes("?") ? "&" : "?";
        return `${url}${sep}subset=chinese-simplified`;
    } catch {
        return url;
    }
};

export const useFontLoader = (fonts: Record<string, string>) => {
    const injectFonts = () => {
        if (typeof document === 'undefined' || !fonts || typeof fonts !== 'object') return;

        const ensureStylesheetLink = (href: string) => {
            const existing = document.querySelector(`link[rel="stylesheet"][data-font-url="${href}"]`);
            if (existing) return;
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.setAttribute('data-font-url', href);
            link.href = href;
            document.head.appendChild(link);
        };

        const ensureFontFaceStyle = (name: string, srcUrl: string, isCjk: boolean) => {
            const existing = document.querySelector(`style[data-font-url="${srcUrl}"]`);
            if (existing) return;
            const styleEl = document.createElement('style');
            styleEl.setAttribute('data-font-url', srcUrl);
            // CJK 字体体积大、加载慢：用 fallback 避免 FOIT 期长时间空白/豆腐，先用兜底字体显示。
            const fontDisplay = isCjk ? 'fallback' : 'swap';
            styleEl.textContent = `@font-face {\n  font-family: '${name}';\n  src: url('${srcUrl}');\n   font-style: normal;\n  font-display: ${fontDisplay};\n}`;
            document.head.appendChild(styleEl);
        };

        Object.entries(fonts).forEach(([name, url]) => {
            if (!name || !url) return;
            const cjk = isCjkFontName(name);
            const isCss = /\.css(\?|$)/i.test(url) || /fonts\.googleapis\.com/.test(url);
            if (isCss) {
                // CJK 字体走 Google Fonts 时补 subset，确保中文字形被下载。
                ensureStylesheetLink(cjk ? withChineseSubset(url) : url);
            } else {
                ensureFontFaceStyle(name, url, cjk);
            }
        });
    };
    injectFonts();
};
