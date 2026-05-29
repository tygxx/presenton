# 自定义主题与模板设计方案

**日期**: 2026-05-29
**分支**: feat/custom-zh
**目标**: 为 Presenton 设计一批高质量、覆盖多场景的内置主题与（后续）模板版式，适配国内中文演示场景。

## 背景与约束（来自代码探查）

- **主题 = 纯数据**。内置主题写在
  `servers/nextjs/app/(presentation-generator)/(dashboard)/theme/components/ThemePanel/constants.ts`
  的 `DEFAULT_THEMES` 数组里。一套主题 16 个颜色 + 1 个字体 + 可选 logo/公司名。
  通过 `applyPresentationThemeToElement` 把颜色注入 CSS 变量
  （`--primary-color` / `--background-color` / `--card-color` / `--stroke` /
  `--primary-text` / `--background-text` / `--graph-0..9` + `font-family`），
  幻灯片版式组件用 `var(--xxx, fallback)` 消费。
- 加内置主题 = 往 `DEFAULT_THEMES` 追加对象、重启前端。**不动后端**。
- **关键契约**：每套主题必须有完整 16 色（缺 `graph_0` 会被运行时判定为无效而整套不应用）。
- **字体策略（已定）**：用 `FONT_OPTIONS` 里已验证 URL 的拉丁字体（管标题+数字设计感），
  中文走系统字体（macOS 上是苹方/黑体，已体面）。单一 `font-family`，无法注入字体栈，
  所以中文无法通过主题强制指定宋/楷（那需中文网络字体，本方案不采用）。
- **模板版式 = React 组件 + Zod schema**，按组目录注册在
  `servers/nextjs/app/presentation-templates/index.tsx`，用主题 CSS 变量、`ImageSchema`/`IconSchema`、
  `RemoteSvgIcon`。做一组新版式是真正的前端工程（阶段 2/3）。

## 设计决策

1. **交付方式**：代码 seed 进 `DEFAULT_THEMES`（"内置"标签），**只追加，不动现有 5 套**
   （锋黄 / 浅玫瑰 / 薄荷蓝 / 商务蓝 / 商务深色）。进 git、永久、可复现。
2. **图表色升级**：`graph_0..9` 用**协调的多彩分类调色板**（distinct 但同源协调），
   而非现有的同色深浅渐变 —— 真实饼图/多系列柱状图上更清晰。`graph_0` 放最常用、最醒目的色。
3. **对比度校验**：每套主题用脚本验证关键文字对（`background_text` on `background`、
   `primary_text` on `primary`）的 WCAG 对比度，目标 AA（≥4.5:1）；大标题至少 AA-Large（≥3:1）。

## 阶段 1：10 套新主题（完整调色板）

字段顺序与现有一致：`id, name, description, logo:null, logo_url:null, company_name:null,
data.colors{16}, data.fonts.textFont{name,url}`。所有字体 URL 取自 `FONT_OPTIONS`。

### 1. 深海蓝 deep-ocean（科技 / 企业，浅色）— Inter
primary `#1d4ed8` · background `#ffffff` · card `#eef2ff` · stroke `#d6dcee` ·
primary_text `#ffffff` · background_text `#0f1b3d`
graph: `#1d4ed8 #0d9488 #6366f1 #0ea5e9 #14b8a6 #8b5cf6 #f59e0b #ef4444 #22c55e #64748b`

### 2. 石墨科技 graphite-tech（互联网 / 暗色）— Montserrat
primary `#22d3ee` · background `#0d1117` · card `#161b22` · stroke `#2a313c` ·
primary_text `#04141a` · background_text `#e6edf3`
graph: `#22d3ee #3b82f6 #a78bfa #f472b6 #2dd4bf #38bdf8 #818cf8 #a3e635 #fbbf24 #fb7185`

### 3. 翡翠金融 emerald-finance（金融 / 投资，奶白衬线）— Lora
primary `#047857` · background `#fbfaf7` · card `#eaf2ec` · stroke `#d8d2c4` ·
primary_text `#ffffff` · background_text `#14271f`
graph: `#047857 #c79a3a #0d9488 #65a30d #15803d #d97706 #4d7c5a #92722a #5b6b63 #1e3a2f`

### 4. 暖阳橙 warm-sun（教育 / 培训，暖色圆体）— Nunito
primary `#c2410c` · background `#fffaf3` · card `#ffedd5` · stroke `#f0d9bf` ·
primary_text `#ffffff` · background_text `#3d2510`
graph: `#ea580c #f59e0b #0d9488 #eab308 #dc2626 #16a34a #b45309 #0ea5e9 #e11d48 #84cc16`

### 5. 临床青 clinical-teal（医疗 / 健康，纯白）— Open Sans
primary `#0f766e` · background `#ffffff` · card `#e6f5f3` · stroke `#cfe6e2` ·
primary_text `#ffffff` · background_text `#0f2e2a`
graph: `#0f766e #2563eb #16a34a #06b6d4 #4f46e5 #0ea5e9 #10b981 #64748b #7c3aed #f59e0b`

### 6. 政务正红 govern-red（政务 / 汇报，米白）— Source Sans Pro
primary `#c8102e` · background `#fffdf9` · card `#fbeaec` · stroke `#e8d9c8` ·
primary_text `#ffffff` · background_text `#1f1a17`
graph: `#c8102e #b8860b #8c0d22 #d4a017 #6b7280 #1e3a5f #7f1d1d #a16207 #44403c #4d7c0f`

### 7. 暮光紫 twilight-purple（营销 / 创意，浅色）— Raleway
primary `#7c3aed` · background `#ffffff` · card `#f3e8ff` · stroke `#e4d4f4` ·
primary_text `#ffffff` · background_text `#2a1245`
graph: `#7c3aed #db2777 #2563eb #ec4899 #4f46e5 #c026d3 #0ea5e9 #f43f5e #14b8a6 #f59e0b`

### 8. 午夜霓虹 midnight-neon（发布会 / 炫酷，深色）— Kanit
primary `#ff2d95` · background `#0a0a12` · card `#15151f` · stroke `#2a2a3a` ·
primary_text `#12030a` · background_text `#f0eefb`
graph: `#ff2d95 #22d3ee #a78bfa #a3e635 #3b82f6 #e879f9 #2dd4bf #fbbf24 #38bdf8 #fb7185`

### 9. 墨韵 ink-wash（国风 / 文化，宣纸衬线）— Fraunces
primary `#9d2933` · background `#f5f1e6` · card `#ece4d2` · stroke `#d8cbb0` ·
primary_text `#f5f1e6` · background_text `#1c1a17`
graph: `#1c1a17 #9d2933 #8a6d3b #3a5a6b #5e7355 #7a5230 #595550 #b8860b #4a3b52 #2f4538`
> 国风靠配色+留白营造，中文仍是系统字体（非真宋楷）。

### 10. 数据靛蓝 data-indigo（数据报告 / 年报，纯白，图表优化）— DM Sans
primary `#4338ca` · background `#ffffff` · card `#eef2ff` · stroke `#d8ddf0` ·
primary_text `#ffffff` · background_text `#15183a`
graph（最大可区分性）: `#4338ca #059669 #f59e0b #e11d48 #0ea5e9 #7c3aed #0d9488 #ea580c #2563eb #db2777`

## 验收（阶段 1）

1. 写脚本计算 15 套主题（5 旧 + 10 新）的 WCAG 对比度，关键文字对 < 4.5 告警、< 3.0 修正。
2. `npx tsc --noEmit` 通过。
3. Chrome 打开 `/theme`，逐套切换看真实渲染 + 截图确认质感与可读性。

## 阶段 2 / 3：模板版式组（阶段 1 验收后细化）

新建一个内置版式组（约 8-10 个 React 版式：封面 / 目录 / 三栏要点 / 大 KPI /
左右对比 / 时间线 / 图文混排 / 团队 / 图表页 / 结尾），全部用主题 CSS 变量自动适配配色，
图片/图标用 `ImageSchema`/`IconSchema`。注册流程：建目录 + `settings.json` + 各版式 `.tsx`
+ 在 `index.tsx` 注册（imports / 数组 / templates 条目 / allLayouts）。
具体做哪个场景在阶段 1 验收后定。
