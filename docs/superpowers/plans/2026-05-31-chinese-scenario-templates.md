# 中文场景内置模板组 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: 本计划由主会话用 **Workflow 工具**驱动批量生成 + 主 loop 做确定性收尾（superpowers:executing-plans 内联执行）。步骤用 `- [ ]` 跟踪。

**Goal:** 删掉 13 个英文内置模板组，用 Workflow 批量生成 13 个中文场景模板组（每组 22 张高大上中文版式 = 286 张 TSX），注册进 Next.js 并改后端引用，重建部署到柒核 46。

**Architecture:** 主 loop 先手工产出"生成知识"（13 份 design token + 22 类版式规格 + 黄金参考 TSX），再用一个 Workflow 把 286 个生成 agent 并行铺开（每 agent 写一个 .tsx 文件并返回元数据），随后主 loop 做确定性收尾：tsc 校验+修复回合 → 脚本化重写 index.tsx 并删旧组 → 改后端 DEFAULT_TEMPLATES → 构建+单测+浏览器抽验 → 重建镜像部署 46。

**Tech Stack:** Next.js 15 + React + zod v4 + Tailwind（前端模板）；FastAPI（后端常量）；Workflow 编排；chrome-devtools MCP（渲染抽验）；Docker（46 部署）。

参考 spec：`docs/superpowers/specs/2026-05-31-chinese-scenario-templates-design.md`

---

## 文件结构

**新增**
- `servers/nextjs/app/presentation-templates/{scenario-id}/settings.json` ×13
- `servers/nextjs/app/presentation-templates/{scenario-id}/*.tsx` ×286（每组 22 张）
- `scripts/gen-template-index.mjs`（一次性：根据各组目录重写 index.tsx 注册块）—— 临时工具脚本

**修改**
- `servers/nextjs/app/presentation-templates/index.tsx`（替换全部组注册）
- `servers/fastapi/constants/presentation.py:1`（DEFAULT_TEMPLATES）
- `servers/fastapi/models/generate_presentation_request.py:30`（default template）

**删除**
- 13 个旧组目录：`general/ modern/ standard/ swift/ Code/ Education/ ProductOverview/ Report/ pitch-deck/ neo-general/ neo-modern/ neo-standard/ neo-swift/`

**13 个新组 id（固定）**
`tech-cn medical-cn education-cn food-cn finance-cn gov-cn realestate-cn culture-cn green-cn retail-cn business-cn travel-cn manufacturing-cn`

**22 类版式 slidetype（固定顺序，文件名 PascalCase）**
`Cover TableOfContents SectionDivider BigStatement ThreePoints FourFeatures IconList KpiMetrics Comparison Timeline ProcessSteps Roadmap BarChart PieDonut LineChart DataTable ImageLeft ImageRight FullBleedImage Quote TeamGrid Closing`

---

## Task 1: 生成知识（design tokens + 版式规格）

**Files:**
- 体现在 Workflow 脚本里的 JS 数据（`SCENARIOS`、`LAYOUT_SPECS` 两个数组）。先写成独立 mjs 便于核对，再内联进 workflow。
- Create: `scripts/_gen-knowledge.mjs`（仅供人工核对 token 完整性，可选）

- [ ] **Step 1: 写 `SCENARIOS`（13 项）**，每项形如：

```js
{ id:'tech-cn', name:'科技互联网', desc:'…中文组描述…', isDefault:false,
  palette:{ primary:'#3b82f6', secondary:'#8b5cf6', bg:'#0a0e1a', text:'#e5e7eb', card:'#111827', stroke:'#1f2937' },
  fontVibe:'无衬线现代、等宽数字点缀', motif:'几何网格/光晕/电路线', compose:'深底+霓虹渐变高光，左对齐大标题', tone:'大胆未来感' }
```
（13 项色值/母题取自 spec §4 表，逐项填全，禁省略。）

- [ ] **Step 2: 写 `LAYOUT_SPECS`（22 项）**，每项含 slidetype、中文 layoutName、用途、字段清单（名/类型/拉丁 max/是否数组及数量/是否 ImageSchema/IconSchema）。例：

```js
{ type:'KpiMetrics', name:'核心数据', file:'KpiMetrics',
  purpose:'3-4 个大数字 KPI + 标签 + 可选趋势', 
  fields:'title(≤40拉丁); metrics: array(min3 max4) of { value(≤8), label(≤24), delta(≤16 可选), icon:IconSchema }',
  note:'大数字用超大字重；中文 max 记得×0.6' }
```

- [ ] **Step 3: 核对** — `node scripts/_gen-knowledge.mjs` 打印 `SCENARIOS.length===13 && LAYOUT_SPECS.length===22`，确认无字段缺失。Expected: 打印 `13 22 OK`。

- [ ] **Step 4: Commit**

```bash
git add scripts/_gen-knowledge.mjs
git commit -m "chore: 中文模板生成知识（13 design token + 22 版式规格）"
```

---

## Task 2: 黄金参考 TSX（结构基准）

手写 2 张完全合规的样例，作为生成 agent 的"照抄结构"基准：一张纯 CSS 装饰型（Cover），一张图表型（BarChart，用现有 chart 原语）。

**Files:**
- Create: `servers/nextjs/app/presentation-templates/business-cn/Cover.tsx`（黄金参考之一，正式产物，business-cn 组首张）
- 参考既有：`servers/nextjs/app/presentation-templates/general/ChartWithBulletsSlideLayout.tsx`（看 chart 原语怎么用）、`general/IntroSlideLayout.tsx`（看外层结构）

- [ ] **Step 1: 读现有 chart 范例**，确认图表原语 import 路径与用法

Run: `grep -rn "GeneralChart\|recharts\|from \"./.*Chart" servers/nextjs/app/presentation-templates/general/ChartWithBulletsSlideLayout.tsx`
Expected: 看到图表组件的真实 import 与 props，记录供 BarChart 规格引用。

- [ ] **Step 2: 手写 `business-cn/Cover.tsx`**，必须含 spec §6 全部硬约束：外层 `className`、CSS 变量 fallback、CJK 行高/break-words/去负字距、全中文示例、`export const layoutId/layoutName/layoutDescription/Schema` + `export default`。

- [ ] **Step 3: 单文件 tsc 自检**

Run: `cd servers/nextjs && npx tsc --noEmit -p tsconfig.json 2>&1 | grep -i "business-cn/Cover" || echo "Cover OK"`
Expected: `Cover OK`（无该文件报错）。

- [ ] **Step 4: Commit**

```bash
git add servers/nextjs/app/presentation-templates/business-cn/Cover.tsx
git commit -m "feat(templates): business-cn 黄金参考封面版式"
```

---

## Task 3: Workflow 批量生成 286 张 TSX

用 Workflow 把 (13 场景 × 22 版式) 铺成 286 个生成 agent；每 agent **直接 Write 文件**到对应组目录，返回小元数据 `{ ok, scenario, file, layoutId, layoutName, layoutDescription, varBase }`。已存在的 `business-cn/Cover.tsx`（黄金参考）跳过。

**Files:**
- Create（运行期）: workflow 脚本（自动持久化到 session 目录，返回 scriptPath）
- 产物: 285 个新 `.tsx` + 13 个 `settings.json`

- [ ] **Step 1: 写 settings.json ×13**（主 loop 直接写，不进 workflow）

每个：`{ "description":"<场景 desc>", "ordered":true, "default":<business-cn 为 true 其余 false>, "icon_weight":"regular" }`

- [ ] **Step 2: 写并跑 Workflow**

脚本要点（embed Task1 的 SCENARIOS/LAYOUT_SPECS + Task2 黄金参考全文）：
```
meta.phases = [{title:'Generate'}]
const JOBS = SCENARIOS.flatMap(s => LAYOUT_SPECS.map(l => ({s,l})))
                      .filter(j => !(j.s.id==='business-cn' && j.l.type==='Cover'))
await pipeline(JOBS,
  j => agent(buildPrompt(j.s, j.l, GOLDEN_COVER, GOLDEN_BAR, HARD_RULES), {
    label:`${j.s.id}:${j.l.file}`, phase:'Generate', schema: META_SCHEMA }))
return results.filter(Boolean)
```
`buildPrompt` 强约束：写 1280×720 合规 TSX、按本场景 motif 构图（勿照搬其他场景）、全中文示例、CJK 规则、CSS 变量 fallback 用本场景 palette、图标英文 query/图片中文 prompt、统一导出契约；并指示 agent **用 Write 工具落盘到** `servers/nextjs/app/presentation-templates/{id}/{file}.tsx`，返回元数据。

Run: 主 loop 调 Workflow（schema 强约束元数据）。
Expected: 返回 ≥280 条 `ok:true`；产物目录各 22 个 tsx（business-cn 含黄金参考）。

- [ ] **Step 3: 落盘完整性核查**

Run: `for d in servers/nextjs/app/presentation-templates/*-cn/; do echo "$(basename $d): $(ls $d/*.tsx 2>/dev/null|wc -l)"; done`
Expected: 13 行，每行 `*-cn: 22`（少于 22 的组记录待补）。

- [ ] **Step 4: Commit（先存生成产物，便于回滚/审阅）**

```bash
git add servers/nextjs/app/presentation-templates/*-cn/
git commit -m "feat(templates): 生成 13 中文场景组 286 张版式（未注册）"
```

---

## Task 4: 编译校验 + 修复回合

新 tsx 已在 project 内，`tsc --noEmit` 会全量检查（即使尚未在 index.tsx 注册）。对报错文件跑修复 agent，最多 2 轮。

**Files:** 同 Task 3 产物（按需 Write 覆盖）

- [ ] **Step 1: 全量 tsc，收集报错文件清单**

Run: `cd servers/nextjs && npx tsc --noEmit 2>&1 | grep -oE "app/presentation-templates/[a-z-]+/[A-Za-z]+\.tsx" | sort -u`
Expected: 理想为空；否则得到待修文件列表。

- [ ] **Step 2: 修复 Workflow（仅对报错文件）**

每个报错文件一个 agent：传入文件现有内容 + tsc 报错原文 + 硬约束，要求修正并 Write 覆盖。
Run: Workflow（phase:'Repair'）。

- [ ] **Step 3: 复跑 tsc 直到干净（≤2 轮）**

Run: `cd servers/nextjs && npx tsc --noEmit 2>&1 | grep -c "presentation-templates/.*-cn/"`
Expected: `0`。仍坏的文件：从该组删除（保证组 ≥20 张即可），记录。

- [ ] **Step 4: Commit**

```bash
git add servers/nextjs/app/presentation-templates/*-cn/
git commit -m "fix(templates): 修复中文版式 tsc 报错"
```

---

## Task 5: 注册新组 + 删旧组 + 改后端引用

**Files:**
- Create: `scripts/gen-template-index.mjs`
- Modify: `servers/nextjs/app/presentation-templates/index.tsx`
- Delete: 13 旧组目录
- Modify: `servers/fastapi/constants/presentation.py`、`servers/fastapi/models/generate_presentation_request.py`

- [ ] **Step 1: 写 `scripts/gen-template-index.mjs`**

扫描 `presentation-templates/*-cn/` 各目录的 `.tsx`（按 22 类固定顺序排序），读取每个文件的 `export const layoutId/layoutName/layoutDescription`，生成全新 index.tsx：保留顶部 `import {…} from "./utils"` 与底部 helper 函数（`getTemplatesByTemplateName` 等原样保留），中间 5 块全部按新组重写（imports / settings imports / 每组 `xxxTemplates` 数组 / `allLayouts` / `templates`）。组顺序：business-cn first（默认），其余按 spec 表。

- [ ] **Step 2: 跑脚本生成 index.tsx**

Run: `node scripts/gen-template-index.mjs && head -5 servers/nextjs/app/presentation-templates/index.tsx`
Expected: 文件重写成功，import 指向 `*-cn` 文件。

- [ ] **Step 3: 删 13 旧组目录**

Run: `cd servers/nextjs/app/presentation-templates && rm -rf general modern standard swift Code Education ProductOverview Report pitch-deck neo-general neo-modern neo-standard neo-swift && ls -d */`
Expected: 只剩 13 个 `*-cn/` 目录。

- [ ] **Step 4: 改后端 DEFAULT_TEMPLATES**

`servers/fastapi/constants/presentation.py:1` 改为：
```python
DEFAULT_TEMPLATES = ["business-cn","tech-cn","medical-cn","education-cn","food-cn","finance-cn","gov-cn","realestate-cn","culture-cn","green-cn","retail-cn","travel-cn","manufacturing-cn"]
```

- [ ] **Step 5: 改默认 template**

`servers/fastapi/models/generate_presentation_request.py:30`：`default="general"` → `default="business-cn"`。

- [ ] **Step 6: tsc 再次确认无断链**

Run: `cd servers/nextjs && npx tsc --noEmit 2>&1 | grep -c "error TS" || echo 0`
Expected: `0`（删旧组后无残留 import 引用）。

- [ ] **Step 7: Commit**

```bash
git add -A servers/nextjs/app/presentation-templates servers/fastapi/constants/presentation.py servers/fastapi/models/generate_presentation_request.py scripts/gen-template-index.mjs
git commit -m "feat(templates): 注册 13 中文场景组、删除英文内置组、同步后端默认模板"
```

---

## Task 6: 构建 + 后端校验

**Files:** 无（验证门）

- [ ] **Step 1: Next.js 生产构建**

Run: `cd servers/nextjs && npm run build 2>&1 | tail -25`
Expected: `Compiled successfully` / 无 type error。失败 → 回 Task 4/5 修。

- [ ] **Step 2: 后端 py_compile + 单测**

Run: `cd servers/fastapi && python -m py_compile constants/presentation.py models/generate_presentation_request.py && python -m pytest -q 2>&1 | tail -15`
Expected: 编译通过；单测全过（spec 的 80 单测基线）。失败 → 排查旧组引用。

- [ ] **Step 3: Commit（若有修复）**

```bash
git add -A && git commit -m "fix: 构建/单测修正" || echo "nothing to commit"
```

---

## Task 7: 浏览器渲染抽验（视觉 QA）

本机起服务，用 chrome-devtools 抽查若干组的预览，确认中文不豆腐、不溢出、主题色与调性到位。

**Files:** 无（验证门）

- [ ] **Step 1: 本机起前后端**（参考本机裸跑 runbook 的环境变量，两端 USER_CONFIG_PATH 一致）

Run: 后台启 FastAPI + Next.js（dev 或 `npm start`）。
Expected: `http://localhost:<port>/templates` 可访问。

- [ ] **Step 2: /templates 列表抽验**

用 chrome-devtools 打开 `/templates` 内置 tab，截图。
Expected: 显示 13 个中文组、无英文组；每组 layout 计数 ≥20。

- [ ] **Step 3: 预览页抽验 4 组**（tech-cn / medical-cn / food-cn / finance-cn 各打开 template-preview，截图 cover+chart+table+全幅图）

Expected: 全中文、无豆腐块/溢出/重叠；主题色生效；4 组调性区分明显。问题页 → 记录并回 Task 4 修。

- [ ] **Step 4: 生成 1 份中文 demo**（选 business-cn 走 upload→outline→生成）

Expected: 流程不报错，产出中文 deck（验证 DEFAULT_TEMPLATES 改动生效）。

- [ ] **Step 5: Commit（若有修复）**

```bash
git add -A && git commit -m "fix(templates): 视觉 QA 修正" || echo "nothing to commit"
```

---

## Task 8: 部署到柒核 46

**Files:** 无（部署）

- [ ] **Step 1: 推分支 / 同步代码到 46**（按部署记忆：rsync 或 git，确认用仓库内含国内补丁的 Dockerfile）

- [ ] **Step 2: 重建镜像**

Run（46 上）: `cd /data/presenton && docker compose build`（按部署记忆补丁；预计 ~20-30min）。
Expected: 构建成功。

- [ ] **Step 3: 重启服务**

Run（46 上）: `docker compose up -d`
Expected: `presenton-production-1` 起来。

- [ ] **Step 4: 线上验收**

打开 `http://117.50.183.46:40010/templates`：13 中文组、无英文组、预览正常、生成中文 demo 正常。
Expected: 全部满足 spec §9 验收标准。

- [ ] **Step 5: 收尾 commit / 清理临时脚本**

```bash
git rm scripts/_gen-knowledge.mjs scripts/gen-template-index.mjs 2>/dev/null; git commit -m "chore: 清理一次性生成脚本" || echo "skip"
```

---

## Self-Review

- **Spec 覆盖**：13 场景(T1/T3)、22 版式(T1/T3)、删旧组(T5)、后端引用(T5)、CJK/素材硬约束(T2/T3)、构建+单测(T6)、视觉 QA(T7)、46 部署(T8)、验收标准(T7/T8) — 均有对应任务。
- **占位符**：无 TBD；token/规格在 T1 要求逐项填全。
- **类型一致**：组 id、slidetype 文件名、导出契约（`layoutId/layoutName/layoutDescription/Schema/export default`）全计划统一；DEFAULT_TEMPLATES 与组 id 集合一致；默认组 business-cn 在 settings 与后端一致。
- **风险**：少量 tsc 失败→T4 修复回合 + 每组 ≥20 容错；视觉问题→T7 回修。
</content>
