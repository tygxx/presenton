# 中文场景内置模板组 — 设计文档

- 日期：2026-05-31
- 分支：feat/custom-zh
- 目标线上：http://117.50.183.46:40010/templates （柒核 46，端口 40010）

## 1. 背景与目标

线上 `/templates` 现有模板全是英文（13 个内置代码组 + 个别 DB 自定义模板），不符合国内中文场景使用。目标：

- 删除全部现有英文**内置**模板组，替换为面向中文场景的成套模板。
- 覆盖 **13 个行业场景**（科技/医疗/教育/美食/金融/党政/房产/国潮/新能源/电商/企业商务/旅游/智能制造）。
- 每个场景 **22 张独立版式**（≥20，满足"不少于 20 页"，留 QA 容错余量；QA 后每组接受 ≥20 张通过）。
- 每张版式**全中文示例内容**、视觉"高大上"、调性**每场景自适应**（科技/电商大胆冲击；医疗/金融/党政稳重精致）。

## 2. 已锁定的决策（来自 brainstorming）

| 决策点 | 选择 |
|---|---|
| 模板形态 | **内置代码模板（TSX）**，编译进 Next.js bundle |
| 部署 | 删旧组 + 加新组 → 提交 feat/custom-zh → **重建镜像 + 重新部署 46** |
| 每模板版式数 | **22 张独立版式**（预览即一套 22 页完整 demo） |
| 场景数 | **13 个**（原 12 + 智能制造/工业） |
| 设计调性 | **每场景自适应**，由各自 design token 决定 |
| 生成方式 | **Workflow 批量并行**生产 286 张 TSX（13×22） |
| 删除范围 | 全部 13 个英文内置组（general/modern/standard/swift/Code/Education/ProductOverview/Report/pitch-deck/neo-*） |

## 3. 架构

### 3.1 目录结构（每个场景一个组目录）

```
servers/nextjs/app/presentation-templates/{scenario-id}/
  ├── settings.json
  ├── CoverSlide.tsx
  ├── TableOfContentsSlide.tsx
  ├── ...（共 22 个 TSX）
  └── ClosingSlide.tsx
```

- 组 id 用 ASCII kebab-case + `-cn` 后缀：`tech-cn`、`medical-cn`…（用于 URL / 后端白名单 / `templateName:layoutId`）。
- 组显示名用中文（`name: "科技互联网"`）。
- `settings.json`：`{ "description": "<中文描述>", "ordered": true, "default": <仅 business-cn 为 true>, "icon_weight": "regular" }`。`ordered:true` 让预览按封面→…→结尾的顺序展示。

### 3.2 单张 TSX 的导出契约（新组统一约定）

```tsx
import React from 'react'
import * as z from "zod";
import { ImageSchema, IconSchema } from '../defaultSchemes';

export const layoutId = '{scenario-id}-{slidetype}'   // kebab-case, e.g. 'tech-cn-cover'
export const layoutName = '封面'                        // 中文显示名
export const layoutDescription = '……该版式用途的中文描述……'

const schema = z.object({ /* … */ })
export const Schema = schema
type SlideData = z.infer<typeof schema>

const CoverSlide: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
  const { /* … */ } = slideData || {}
  return ( /* … */ )
}
export default CoverSlide
```

> 注：现有组导出名不统一（general 用 `layoutId`，Code 用 `slideLayoutId`），靠 index.tsx import 别名兜住。新组**统一用 `layoutId/layoutName/layoutDescription`**；因为 TSX 与 index.tsx 注册都由脚本生成，内部一致即可。

### 3.3 index.tsx 注册（脚本程序化生成）

每个 layout 需 5 处接入：① import 组件+4 个具名导出（别名化）；② import settings.json；③ `{scenario}Templates: TemplateWithData[]` 数组（用 `createTemplateEntry(Comp, Schema, Id, Name, Desc, "{scenario-id}", "FileName")`）；④ 并入 `allLayouts`；⑤ 并入 `templates` 导出（`{ id, name, description: settings.description, settings, layouts }`）。

删除旧组：移除其全部 import、数组、allLayouts/templates 条目。**用脚本重写 index.tsx**（解析现有结构→剔除旧组→插入新组），再 `tsc` 校验。

### 3.4 后端引用同步（删旧组后必改，否则生成链路报错）

- `servers/fastapi/constants/presentation.py:1`：`DEFAULT_TEMPLATES` 由 `["general","modern","standard","swift"]` 改为 **13 个新组 id 全列表**。理由：`api/v1/ppt/endpoints/presentation.py:608` 用 `if request.template not in DEFAULT_TEMPLATES` 判定内置 vs 自定义；不在白名单且不以 `custom-` 开头 → 直接 400。
- `servers/fastapi/models/generate_presentation_request.py:30`：`default="general"` → `default="business-cn"`。
- `handler.py:384/454/480` 引用 `DEFAULT_TEMPLATES`（拼描述/返回内置列表），随常量自动生效，无需单独改。
- 前端：`selectedTemplate` 初始 `null`、列表从编译的 `templates` 读，**无硬编码默认**，无需改。

## 4. 场景清单与 Design Token（13 个）

每个场景一份 design token，约束同组 22 张风格统一、跨组区分明显。token 包含：主色/辅色/背景/文字色、标题字体气质、装饰母题、构图偏好、调性。**全部通过 CSS 变量上色**（`var(--primary-color,…)` 等），以便随主题切换；token 里的具体色值作为 TSX 内的 fallback 默认值（保证预览即"高大上"）。

| # | 场景 | id | 主色/辅色 fallback | 背景 | 装饰母题 / 调性 |
|---|---|---|---|---|---|
| 1 | 科技互联网 | `tech-cn` | #3b82f6 / #8b5cf6 渐变 | 近黑 #0a0e1a | 几何网格、光晕、等宽数字；大胆未来感 |
| 2 | 医疗健康 | `medical-cn` | #0ea5e9 / #10b981 | 纯净白 #f8fafc | 圆角卡片、脉搏波、十字；稳重可信 |
| 3 | 教育培训 | `education-cn` | #f97316 / #2563eb | 米白 #fffdf7 | 书本/灯泡/成长曲线；明亮亲和 |
| 4 | 美食餐饮 | `food-cn` | #e8590c / #c92a2a | 暖米 #fdf6ec | 圆盘构图、焦糖金描边；温暖诱人 |
| 5 | 金融投资 | `finance-cn` | #0f172a / #d4af37 | 深藏青 #0f172a | 衬线标题、数据网格、增长曲线；高端稳重 |
| 6 | 党政政务 | `gov-cn` | #c1121f / #d4af37 | 米白 #faf7f2 | 对称庄重、华表/纹样、烫金线；权威 |
| 7 | 房产建筑 | `realestate-cn` | #3f3f46 / #b08d57 | 高级灰 #f4f4f5 | 极简线条、大留白、细分割线；轻奢质感 |
| 8 | 国潮文创 | `culture-cn` | #c0392b / #1a1a1a | 宣纸米黄 #f5ecd9 | 水墨笔触、传统纹样、描金；东方雅致 |
| 9 | 新能源环保 | `green-cn` | #16a34a / #0891b2 | 白绿 #f0fdf4 | 叶片/地球/能源；自然清新 |
| 10 | 电商新零售 | `retail-cn` | #db2777 / #facc15 | 亮白 #ffffff | 卡片化、价签、撞色；年轻潮流冲击 |
| 11 | 企业商务（默认组） | `business-cn` | #1e3a8a / #f97316 | 银白 #f8fafc | 经典网格、数据图表、稳健大气；通用商务 |
| 12 | 旅游文旅 | `travel-cn` | #0891b2 / #f59e0b | 天青 #f0f9ff | 风景全幅大图、目的地卡片；明媚向往 |
| 13 | 智能制造 | `manufacturing-cn` | #1d4ed8 / #f97316 | 工业灰 #1f2937 | 齿轮/产线/精密、金属质感；硬核可靠 |

## 5. 版式分类（22 类，每场景实现这套，用各自 token 呈现）

固定顺序（preview 即 demo deck 顺序）：

1. **Cover 封面** — 主标题/副标题/汇报人/日期 + 视觉背景
2. **TableOfContents 目录** — 编号分节（4–6 项）
3. **SectionDivider 章节分隔** — 大节号 + 节标题
4. **BigStatement 金句首屏** — 一句大字主张 + 简短支撑
5. **ThreePoints 三栏要点** — 3 列 图标+标题+描述
6. **FourFeatures 四宫格特性** — 4 卡 图标网格
7. **IconList 图标要点列表** — 竖向 4–6 条 图标+文字
8. **KpiMetrics 大数字 KPI** — 3–4 个大数字 + 标签
9. **Comparison 左右对比** — 两栏 vs / before-after
10. **Timeline 时间线** — 横向 4–6 里程碑
11. **ProcessSteps 流程步骤** — 编号步骤/管线 3–5 步
12. **Roadmap 路线图** — 分阶段计划（阶段卡）
13. **BarChart 柱状图** — 数据 + 要点（用 recharts/现有 chart 原语）
14. **PieDonut 饼/环图** — 占比 + 图例
15. **LineChart 折线趋势** — 趋势 + 注解
16. **DataTable 数据表格** — 表头 2–5 列、行 3–6
17. **ImageLeft 图文左** — 大图在左 + 文本在右
18. **ImageRight 图文右** — 文本在左 + 大图在右
19. **FullBleedImage 全幅大图** — 满幅图 + 标题叠加
20. **Quote 客户证言** — 引言 + 头像 + 署名
21. **TeamGrid 团队介绍** — 3–4 成员卡（头像/姓名/职位）
22. **Closing 结尾联系** — 致谢 + 联系方式

> 字段规格：每类的 Schema 字段、`.min/.max`、`.default(中文)`、`.meta({description})` 由生成 agent 按"硬约束 + 参考样例"产出。数组类（要点/步骤/成员）给 `.min().max()`。图片槽用 `ImageSchema`，图标槽用 `IconSchema`。

## 6. 每张 TSX 的硬约束（QA 据此校验）

**结构/尺寸**
- 外层固定：`className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video z-20 mx-auto overflow-hidden"` + `style` 含 `background: var(--background-color,<fallback>)`、`fontFamily: var(--heading-font-family,<fallback>)`。
- 禁 `absolute` 定位（除顶部 logo / 背景装饰层）；用 flex/grid/gap/padding。禁固定 height、禁 `min-height` 卡片、禁 scroll、禁动画/过渡。内容垂直水平居中、自适应。

**主题化**
- 所有颜色走 CSS 变量带 fallback：`--primary-color`/`--primary-text`/`--background-color`/`--background-text`/`--card-color`/`--stroke`/`--heading-font-family`/`--graph-0..5`。fallback 用该场景 token 色值。

**中文排版（c3d274ac 已入库规则）**
- 行高 ≥1.6（`leading-relaxed`/`leading-loose`/`leading-[1.7]`），禁 `leading-none/tight`。
- 禁负字距（无 `tracking-[-…]`）。
- 文本容器加 `break-words` + inline `{ overflowWrap:'break-word', wordBreak:'break-word' }`，禁 `whitespace-nowrap`。
- 字段 `.max()` 按中文 ≈ 拉丁 ×0.6 折减（标题 ~24、副标题 ~40、正文 ~90 起步，按容器调）。

**素材策略（关键，规避 46 国内网络取图问题）**
- **优先 CSS/SVG 装饰**（渐变、几何形、纹样、图标）营造高大上，**不依赖外网图片** → 预览/PDF 离线可渲染、风格一致。
- 真正需要照片的槽（ImageLeft/Right、FullBleed、Closing 背景）用现有 S3 占位图 `https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png`，`__image_prompt__` 写**中文**（用户生成真 deck 时 AI 按提示出图）。
- 图标用 phosphor `RemoteSvgIcon`，`__icon_query__` 写**英文名词**（命中 icons.json 英文 tag）。

**全中文示例内容**
- 标题/正文/数据/姓名/数值全部填该行业真实感中文文案（预览即成品级 demo）。

**编译**
- 每张过 `tsc`（`npx tsc --noEmit` 范围内）零报错；zod schema 能 `getSchemaDefaults` 出默认值。

## 7. 生成策略（Workflow）

- **阶段 0（我手工）**：写好 13 份 design token（§4 扩展为精确色卡/字体/母题/构图）+ 22 类版式规格（§5 扩展为字段级 Schema 提示）+ 1 张黄金参考 TSX（含全部硬约束、可直接抄结构）。
- **阶段 1 生成**：`pipeline`/`parallel`，286 个 agent（每 agent 一张 = 场景×版式），输入 = 场景 token + 版式规格 + 黄金参考 + §6 硬约束，schema 强约束产出 `{ fileName, tsx }`。
- **阶段 2 校验+修复**：逐张静态校验（结构正则 + 关键约束扫描）；批量 `tsc --noEmit`；失败项进修复 agent（最多 2 轮）。
- **阶段 3 注册+清理**：脚本删 13 旧组目录、重写 index.tsx、改后端 `DEFAULT_TEMPLATES` + 默认 template。
- **阶段 4 构建核验**：`npm run build`（Next.js 编译全过）、`py_compile`、抽样浏览器渲染 3–4 个场景的 cover/chart/table，核验中文不豆腐、不溢出、主题色生效。
- **阶段 5 部署**：提交 feat/custom-zh → 重建镜像（已含国内网络补丁）→ 重新部署 46 → 线上 `/templates` 抽验 13 组、随机预览页、生成一份中文 demo deck。

模型：生成/修复用强模型（继承主 loop）；校验类可降级。具体在实现计划里定。

## 8. 风险与缓解

| 风险 | 缓解 |
|---|---|
| 286 张里少数 `tsc` 失败 | 阶段 2 自动修复 2 轮；每组目标 22、接受 ≥20 |
| 视觉同质化（covers 雷同） | design token 给差异化构图母题；agent 提示强调"按本场景母题构图,勿照搬" |
| 图表版式编译复杂（recharts） | 黄金参考含 1 个 chart 范例；chart 类统一用现有 `GeneralChart` 原语 |
| 删旧组断链（后端/测试 fixture） | §3.4 同步改引用；阶段 4 跑 80 单测 + build 兜底 |
| 46 重建踩国内网络坑 | 补丁已在仓库 Dockerfile（见部署记忆）；按既有流程 |
| bundle 体积增大（286 张 vs 旧 190 张） | 可接受；如构建超时再分组懒加载（YAGNI，暂不做） |

## 9. 验收标准

- `/templates` 内置 tab 显示 **13 个中文场景组**，每组 ≥20 张版式；**英文内置组全部消失**。
- 每组预览页：封面→结尾顺序、全中文、无豆腐块、无文字溢出/重叠、主题色生效、视觉"高大上"且各场景调性区分明显。
- 选任一中文组生成 demo：流程不报错、产出中文 deck。
- `tsc --noEmit`、`npm run build`、`py_compile`、后端 80 单测全过。
- 46 线上同样表现。

## 10. 非目标（YAGNI）

- 不做"上传 PPTX→视觉模型重画"那条慢路径。
- 不做 DB 自定义模板注入（已选内置代码路线）。
- 不做模板懒加载/分包优化（除非 build 超时）。
- 不替每张配真实版权照片（用 CSS/SVG + 占位图 + 中文 image_prompt）。
</content>
</invoke>
