import { useFontLoader } from "../../hooks/useFontLoad";
import type { Theme } from "../../services/api/types";

const THEME_CSS_KEYS = [
  "--primary-color",
  "--background-color",
  "--card-color",
  "--stroke",
  "--primary-text",
  "--background-text",
  "--graph-0",
  "--graph-1",
  "--graph-2",
  "--graph-3",
  "--graph-4",
  "--graph-5",
  "--graph-6",
  "--graph-7",
  "--graph-8",
  "--graph-9",
] as const;

/**
 * 检测一段文本中是否含 CJK（中日韩）字符。
 * 范围覆盖：CJK 统一表意文字、中文标点、全角符号、假名、谚文。
 * 轻量内联启发式，不引第三方依赖。
 */
function containsCjk(text: string | null | undefined): boolean {
  if (!text) return false;
  return /[　-〿぀-ヿ㐀-䶿一-鿿가-힯豈-﫿＀-￯]/.test(
    text
  );
}

/**
 * 运行时检测幻灯片文本是否含 CJK，含则给根容器加 'cjk' class（触发 globals.css 的 .cjk 排版修复），
 * 否则不动（不主动移除，避免误删上层显式加的 class），保证英文/拉丁幻灯片零影响。
 *
 * 主题常在幻灯片内容渲染入 DOM 之前应用，此时 textContent 可能为空，故在下一帧/短延时后再复检几次。
 * 防御式实现：任何异常都静默回退到原行为。
 */
export function applyCjkClassToElement(element: HTMLElement | null): void {
  if (!element) return;

  const check = () => {
    try {
      if (containsCjk(element.textContent)) {
        element.classList.add("cjk");
        return true;
      }
    } catch {
      /* 忽略：保持原有渲染行为 */
    }
    return false;
  };

  // 立即查一次（内容已就绪时直接命中）。
  if (check()) return;

  // 内容可能在随后才渲染：用 rAF + 递增延时复查若干次，命中即停。
  if (typeof window === "undefined") return;
  const delays = [0, 120, 400, 1000];
  delays.forEach((delay) => {
    try {
      window.setTimeout(() => {
        if (typeof window.requestAnimationFrame === "function") {
          window.requestAnimationFrame(() => {
            check();
          });
        } else {
          check();
        }
      }, delay);
    } catch {
      /* 忽略 */
    }
  });
}

/** Remove theme inline variables from a container (e.g. before switching themes). */
export function clearPresentationThemeFromElement(element: HTMLElement | null): void {
  if (!element) return;
  for (const key of THEME_CSS_KEYS) {
    element.style.removeProperty(key);
  }
  element.style.removeProperty("font-family");
  element.style.removeProperty("--heading-font-family");
  element.style.removeProperty("--body-font-family");
}

/**
 * Apply presentation theme CSS variables + font loading to a DOM subtree
 * (editor: #presentation-slides-wrapper, present: #presentation-mode-wrapper).
 */
export function applyPresentationThemeToElement(
  element: HTMLElement | null,
  theme: Theme | null | undefined
): void {
  if (!element || !theme?.data) return;
  if (!theme.data.colors?.["graph_0"]) return;
  const colors = theme.data.colors;
  const cssVariables: Record<string, string> = {
    "--primary-color": colors["primary"],
    "--background-color": colors["background"],
    "--card-color": colors["card"],
    "--stroke": colors["stroke"],
    "--primary-text": colors["primary_text"],
    "--background-text": colors["background_text"],
    "--graph-0": colors["graph_0"],
    "--graph-1": colors["graph_1"],
    "--graph-2": colors["graph_2"],
    "--graph-3": colors["graph_3"],
    "--graph-4": colors["graph_4"],
    "--graph-5": colors["graph_5"],
    "--graph-6": colors["graph_6"],
    "--graph-7": colors["graph_7"],
    "--graph-8": colors["graph_8"],
    "--graph-9": colors["graph_9"],
  };
  Object.entries(cssVariables).forEach(([key, value]) => {
    element.style.setProperty(key, value);
  });
  useFontLoader({ [theme.data.fonts.textFont.name]: theme.data.fonts.textFont.url });
  // 主题字体后追加 CJK 兜底栈：拉丁字体不含中文字形时仍能正常显示中文，避免豆腐块。
  const fontStack = `"${theme.data.fonts.textFont.name}", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", "Noto Sans TC", "WenQuanYi Micro Hei", sans-serif`;
  element.style.setProperty("font-family", fontStack);
  element.style.setProperty("--heading-font-family", fontStack);
  element.style.setProperty("--body-font-family", fontStack);

  // 检测幻灯片是否含中文，含则加 'cjk' class 触发集中式排版修复（仅中文生效）。
  applyCjkClassToElement(element);
}
