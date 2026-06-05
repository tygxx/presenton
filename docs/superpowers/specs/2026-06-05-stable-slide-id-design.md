# 稳定 slide 主键（移除编辑时的 id 轮换）— 设计

日期：2026-06-05
分支：feat/custom-zh

## 背景与现象

在演示文稿编辑页通过 AI 编辑某一页（`POST /api/v1/ppt/slide/edit`）时，用户从浏览器
Network 复制出的 cURL 重放后返回 `404 {"detail":"Slide not found"}`，看起来"编辑没效果"。

实测验证：
- 该请求里的 `id`（`dfbe0cae-…`）在该演示文稿当前 11 张 slide 中不存在；
- 用**当前有效 id** 调同一接口：`200`，内容被正确"丰富"，并返回了一个**新的 id**；
- 重新加载页面后内容已持久化并正确渲染。

## 根因

`slide.id`（数据库主键）在每次编辑时被改写为新的 UUID。注释声称是"为了让 nextjs
能感知 slide 更新"，但事实上：

- 主编辑视图 `PresentationPage.tsx` 用 **index** 作为列表 key
  （`key={`${slide.type}-${index}-${slide.index}`}`），不是按 id —— id 轮换从未触发过 remount；
- `TiptapText` 在 `content` prop 变化时会 `editor.commands.setContent(...)`
  （`TiptapText.tsx:55-62`）—— AI 编辑本来就是靠 prop 同步实时刷新的；
- 布局切换由 `slide.layout` 决定渲染哪个组件，与 id 无关。

因此 id 轮换**不带来任何 UI 收益**，反而让"主键"不稳定，导致一切按先前 id 引用该 slide 的
路径失效：

1. **重放请求**：旧 id 是一次性的，编辑成功后立即失效 → 404。
2. **undo 后再编辑**：undo 把 store 回退到旧快照（旧 id），而 DB 已是新 id；
   autosave（`PATCH /presentation/update`，防抖 1s、整体删后重插）尚未追平时即编辑 → 404。

## 三处轮换点

| 位置 | 路径 | 语句 |
|---|---|---|
| `api/v1/ppt/endpoints/slide.py:71` | `POST /slide/edit`（内容编辑） | `slide.id = uuid.uuid4()` |
| `api/v1/ppt/endpoints/slide.py:123` | `POST /slide/edit-html`（UI 未使用） | `slide.id = uuid.uuid4()` |
| `services/chat/memory_layer.py:522` | Chat 工具「替换某页」 | `existing_slide.id = uuid.uuid4()` |

（`presentation.py:550` 的 `slide.id = uuid.UUID(slide.id)` 仅为 str→UUID 类型转换，非轮换；
`presentation_layout.py:34` 的 `slide.id` 指模板布局 id，无关。两者保持不变。）

## 方案：让主键稳定

删除上述 3 处 `slide.id = uuid.uuid4()`。这些 slide 均为已加载的持久对象
（`sql_session.get(...)` 或 `scalar(select(...))`），直接改 `content/layout/speaker_note`
后 commit 即就地 UPDATE，主键保持不变。其后的 `sql_session.add(slide)` 对已在会话中的对象是
no-op，保留或删除均可；为清晰起见保留。顺手修正失实的注释。

**前端无需改动**：`updateSlide` 只是把返回的 slide 整体替换进 store，不断言 id 是否变化；
id 稳定后 undo 快照与 DB 永远一致，竞态消失。

## 为什么安全（已逐项核实）

- **无外键指向 `slides.id`**：仅有 `slides.presentation → presentations.id`；
  `ImageAsset` 与 slide 无关联（只存 `path/extras`）。稳定主键不破坏任何关系。
- **前端零依赖于 id 变化**：全仓 grep 无任何 effect / 比较基于 `slide.id` 改变；
  主视图按 index 渲染，`TiptapText` 按 content 同步 → AI 编辑照常实时刷新。
- 其余 `key={slide.id}` 使用处（present 模式、缩略图、dnd sortable）在稳定 id 下不受影响或更优
  （dnd 尤其受益于稳定 id）。

## 测试

- TDD：新增后端测试，断言 `POST /slide/edit` 后返回的 slide **id 与请求一致**且 `content`
  已更新（沿用现有测试对 LLM/图片调用的 mock 方式）。先红后绿。
- 跑 fastapi 现有测试套件确认无回归。
- 46 端到端手测：UI 编辑就地刷新；重放同一请求返回 200（不再 404）；undo 后再编辑可用。

## 部署

后端改动属 `production` 镜像 → 在 46 上 `docker compose build production` 重建并重启。

## 不在本次范围

- 后端 `(presentation, index)` index 兜底定位（另一备选方案，YAGNI，不做）。
- 修复前**已被轮换掉的历史旧 id**：重放仍会 404（一次性历史遗留）；修复后新产生的 id 全部稳定。
