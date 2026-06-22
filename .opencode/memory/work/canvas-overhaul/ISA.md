# ISA: 低代码设计器画布与联动系统重构

> **Tier:** E4 Deep | **状态:** `phase: OBSERVE → THINK` | **创建:** 2026-06-22
> **前身:** "Canvas Overhaul — Drag, Hierarchy, Nesting, Styling"（已归档，本 ISA 为其深度重构版）

---

## Problem

Envelope V3 的低代码设计器在 **UI 层骨架已完整**（三栏布局、5 种编辑模式、70+ 物料、模拟渲染画布、反射式属性编辑器、React Flow 流程编辑器、API/路由/数据模型编辑器均已落地），但在 **"低代码"的核心价值兑现上存在系统性缺陷**。经过对 `packages/engine`、`packages/materials`、`packages/flow`、`packages/generator`、`apps/platform/components/editor` 的全量代码审计，问题集中在六个层面：

### 层面一：渲染保真度不可信

画布使用 `SimulatedContent`（`renderer.tsx:154-840`，约 700 行 switch-case）模拟组件外观，而非真实 shadcn 组件渲染。同一组件在根级（`SimulatedContent`）与嵌套（`SimulatedChildContent`，`renderer.tsx:876-1108`）由两套独立 switch 渲染，样式不一致（根级 Button `px-3 py-1 text-xs` vs 子级 `px-2 py-0.5 text-[10px]`）。用户在画布所见与最终导出/预览的真实渲染**不保证一致**，破坏"所见即所得"这一低代码平台的存在理由。

### 层面二：拖拽体验断裂

- **无落点指示器**：拖拽过程中不显示插入线/占位框，用户松手前无法预知组件落点。
- **落点坐标用 delta 位移而非绝对坐标**（`editor-layout.tsx:293-294`），从素材面板拖到画布中部时，`delta.y` 包含面板高度+画布偏移，落点与鼠标位置不一致。
- **无对齐引导线/智能吸附**：全代码库无 guideline/snap。
- **无自动滚动**：`autoScroll={false}` 显式关闭（`editor-layout.tsx:451`）。
- **容器拖入只追加末尾**：不传 index（`editor-layout.tsx:279`），无法插入到指定位置。
- **无 DragOverlay 浮动预览**：拖拽时仅原组件半透明，无跟随光标的缩略图。

### 层面三：布局与坐标系统误导

- **网格背景与实际列边界不对齐（P0 视觉 bug）**：背景固定 `backgroundSize: 80px 40px`（`renderer.tsx:1474-1476`），但实际列宽 = `viewportWidth / 12`。mobile 375px 视口下每列 ~31px，背景线每 80px 一条，**用户看到的网格线完全不对应组件实际落点**。
- **缩放原点在 top-left 而非光标位置**（`renderer.tsx:1460`）：Ctrl+滚轮缩放时画面跑到左上角，用户需反复平移找回位置。
- **响应式只是改画布外框宽度**：组件本身不响应式重排，切到 mobile 视口 12 列组件仍占满 12 列只变窄。
- **pan 偏移用绝对 px 不补偿 zoom**：缩放后平移手感"变快/变慢"。

### 层面四：选中、多选与批量操作缺失

- **无框选（marquee）**：多选只能逐个 Ctrl+点击，效率极低。
- **多选后无批量操作**：无对齐（左/右/居中/等距分布）、无批量改属性、无成组。
- **嵌套子组件无法在画布上直接选中**：`CanvasComponentItem` 只对根级渲染（`renderer.tsx:1503`），嵌套子组件通过 `SimulatedChildContent` 渲染但无 `useDraggable`/点击选中绑定。
- **无 Esc 取消选中**、**无尺寸/坐标 tooltip**、**hover 态与选中态同色系**难以区分主次选中。

### 层面五：联动体系运行时缺失

这是最致命的层面——**设计层有 UI，运行时不工作**：

- **Flow 运行时只支持单节点**（`flow-runtime-generator.ts:110-113`）：当流程含多个非事件节点时直接返回输入不执行。条件分支、循环、多步骤流水线、邮件/通知/自定义代码节点**全部不执行**。
- **模板变量未实现**：模板中 `{{event.data.email}}`、`{{result[0].id}}` 等在运行时无解析逻辑，带变量的 config 直接传给 Supabase 会导致查询失败。
- **数据绑定完全未实现**：`page-generator.ts:127` 只生成 TODO 注释，无 Supabase 查询、无 TanStack Query、无响应式更新。用户配置的 `table.column` 绑定在生成项目中**完全不生效**。
- **flow 输出不回写组件**：`callFlow` 返回值在 handler 中被丢弃（`page-generator.ts:176-181`），flow 结果无法驱动 UI 变化。
- **组件间联动机制完全缺失**：无表达式系统、无响应式变量、无 pub/sub，无法实现"选下拉→刷新表格"这种最基本联动。
- **数据模型编辑器与路由编辑器不持久化**：`data-model-editor.tsx:325`、`routing-editor.tsx:305` 用 `useState`，刷新即丢失。
- **预览不可交互**：`RuntimeNodeRenderer` 不消费 `eventBindings`，点击按钮无反应，无法验证联动逻辑。
- **FlowBindingStore.bindEvent 是死代码**：right-panel 直接写 `ComponentNode.eventBindings`，绕过 store；FlowBindingStore.eventBindings 永远为空。

### 层面六：架构技术债

- **四文件严重超标**：`renderer.tsx` 1541 行、`store.ts` 1320 行、`aggregate-slot-mapper.ts` 1917 行、`editor-toolbar.tsx` 1054 行。
- **容器类型三处硬编码**：`store.ts:109-119` `COMPONENT_TYPES_THAT_SUPPORT_CHILDREN`、`renderer.tsx:62-71` `CONTAINER_TYPES`、物料 `isContainer`/`supportsChildren` 字段——三处独立维护，新增容器需改三处。
- **Slot 系统 1917 行手写同步逻辑**：20 个聚合组件 × 2 方向 ≈ 40 个手写函数，无声明式 slot 定义，新增聚合组件成本极高。
- **物料↔渲染器↔生成器四方耦合**：新增组件需同步改物料定义、renderer switch、COMPONENT_MAP、SHADCN_IMPORT_MAP。
- **历史快照 O(n) 深拷贝**：每次 action `structuredClone(state.components)` + `JSON.stringify` 比较两次，100+ 组件时性能瓶颈。
- **20 处重复的历史合并代码**：约 200 行冗余。
- **模块级可变状态**：`renderer.tsx:29-30` `_globalCtrlDown` 非 React 范式，SSR 泄漏风险。

### 用户视角的根本痛点

一个用户想"创建一个带数据绑定的注册表单页"需要约 24 步，跨 3 次模式切换，2 次手敲 `table.column`，且最终预览中按钮点击无反应、数据绑定不生效。对比 amis（一行 Schema 生成表单）、lowcode-engine（拖入 Input 自动配对 Label + 可视化数据源绑定），Envelope 当前更接近"组件原子拼装器"而非"低代码平台"。

---

## Vision

Envelope 的画布与联动系统应成为**开发者真正可信赖的低代码设计器**——用户在画布上的每一次操作都能准确反映最终产物，每一次联动配置都能在运行时真实生效，每一项交互都符合业界成熟预期。

具体而言，理想状态具备七项特质：

1. **渲染可信**：画布显示与最终产物视觉一致；模拟模式用于编辑态（轻量+交互绑定），真实模式用于验证态（iframe 渲染真实 shadcn 组件）；同一组件在根级与嵌套表现统一。
2. **拖拽可预测**：拖拽过程中实时显示落点指示器（插入线/占位框）；落点坐标基于鼠标绝对位置而非 delta 位移；有智能对齐线与边缘吸附；拖到画布边缘自动平移。
3. **布局不误导**：网格背景与实际列边界精确对齐；缩放以光标为中心；响应式视口切换能预览真实断点行为；支持自由定位作为 Grid 的补充。
4. **操作高效**：框选、多选批量对齐/分布、方向键微调、Esc 取消、Ctrl+S 保存、Ctrl+D 复制、组件树右键菜单、内联重命名等业界标配齐全；嵌套子组件可在画布双击进入编辑。
5. **联动真实运行**：Flow 运行时支持完整图执行（拓扑排序+端口传递+条件分支+循环+模板变量解析）；数据绑定生成可运行的 Supabase + TanStack Query 代码；flow 输出回写客户端状态驱动组件更新；组件间可通过响应式表达式直接联动（不强制经过 flow）。
6. **配置即生效**：数据模型、路由编辑器的修改持久化；中间件/auth 守卫配置生成对应代码；预览模式可交互验证事件绑定；flow 编辑器有试运行与执行日志。
7. **架构可演进**：物料定义为单一真相源，渲染器与生成器从注册表派生；slot 系统声明式配置驱动；历史系统增量 diff；超大文件拆分到合理体积。

成功的样子：一个开发者在 10 步以内完成"带数据绑定的注册表单页"，拖入即见落点，配置即生效，预览可点击验证，导出的项目 `npm run dev` 即可运行且数据真实加载。

---

## Out of Scope

本 ISA **明确排除**以下内容，避免范围蔓延：

- **AI 生成能力增强**（ISC-122~130 范围）——AI Agent 的 prompt 模板、自然语言生成页面等不在本次重构范围。
- **多用户实时协作**——Google Docs 式同时编辑、光标共享、评论批注属 v2。
- **插件/组件市场**——第三方物料分发、付费插件不在本次。
- **运行时模式（动态配置渲染）**——平台直接 serve 生产流量的能力已 deferred 到 v2。
- **移动端原生应用生成**——React Native/Flutter 输出。
- **非 Next.js 框架生成**——Remix/Nuxt/SvelteKit。
- **完整 i18n 框架**——组件文本的 i18n key 绑定属后续迭代。
- **版本历史对比/回滚 UI**——快照 diff 可视化属 v2。
- **完整主题系统**——CSS 变量编辑器/预设切换作为独立 ISA 推进。
- **公式表达式编辑器的高级形态**（语法高亮+自动补全 IDE）——本次只实现基础表达式求值，高级编辑器 UI 属 P2。

---

## Principles

1. **渲染一致性优先于渲染性能**：画布显示必须与最终产物一致，宁可牺牲一些性能也要保证所见即所得。模拟模式仅作为编辑态的轻量选项，真实模式必须可达。
2. **落点可预测是拖拽的底线**：用户松手前必须能看到组件将落在何处。任何无落点指示的拖拽都不可接受。
3. **配置即生效（Config is Law）**：用户在编辑器中的每一项配置（数据绑定、事件绑定、中间件、auth 守卫）都必须在生成的代码中真实生效。生成 TODO 注释等于功能不存在。
4. **联动必须有运行时**：设计层的 flow/绑定 UI 必须有对应的运行时实现。不存在"只设计不执行"的联动。
5. **物料定义是单一真相源**：物料的 `isContainer`/`supportsChildren`/`slots`/`editableProps` 是渲染器、store、生成器、属性编辑器共同的唯一数据源。消除所有硬编码的容器类型列表与 switch-case 分支。
6. **声明式优于命令式**：slot 系统用配置声明而非手写同步函数；新增组件的成本应与组件复杂度成正比，而非与平台耦合度成正比。
7. **历史系统不能成为性能瓶颈**：撤销/重做采用增量 diff 或结构共享，绝不在每次 action 做全量深拷贝+全量序列化比较。
8. **业界标配是最低门槛**：框选、对齐线、方向键微调、右键菜单、内联重命名、Esc 取消、Ctrl+S——这些不是"锦上添花"，是低代码设计器的存在前提。
9. **渐进式重构而非推倒重来**：现有 Zustand + dnd-kit + CSS Grid + React Flow 选型合理。重构在现有架构上演进，不更换核心库。
10. **用户工作流步数是度量标准**：以"完成常见任务所需步数"作为体验度量，目标是主路径（带数据绑定的表单页）从 24 步降到 10 步以内。

---

## Constraints

| # | 约束 | 理由 |
|---|------|------|
| C1 | 保留 dnd-kit，不更换拖拽库 | 现有选型合理，更换成本高且无收益 |
| C2 | 保留 Zustand store 模式 | 与项目一致，不引入新的状态管理库 |
| C3 | 保留 CSS Grid 12 列布局作为主模式 | 与 Tailwind 生态对齐，生成代码符合 Next.js 惯例 |
| C4 | 保留 React Flow 作为流程编辑器 | 业界标准，不更换 |
| C5 | 保留 Zod 全栈校验 | 类型与校验同源，不引入额外校验库 |
| C6 | 物料定义结构向后兼容 | 现有 70+ 物料定义不破坏，新增字段为可选 |
| C7 | ComponentNode schema 向后兼容 | 现有页面 JSON 可继续加载，新字段为可选 |
| C8 | 生成的项目零 Envelope 运行时依赖 | 零锁定原则不可破 |
| C9 | TypeScript strict 模式零新增错误 | 质量门禁不降级 |
| C10 | 重构期间 `pnpm build` 与 `pnpm test` 持续通过 | 不允许长期红色构建 |
| C11 | 联动运行时代码生成到用户项目中（非平台运行时） | 保持零锁定 |
| C12 | 表达式系统语法不引入新 DSL | 复用已有 `{{...}}` 模板语法或 JS 子集，不造新语言 |

---

## Goal

将 Envelope 低代码设计器从"组件原子拼装器"重构为"配置即生效的可信赖低代码平台"——渲染可信、拖拽可预测、布局不误导、操作高效、联动真实运行、架构可演进，使开发者能在 10 步以内完成带数据绑定的表单页且导出项目可真实运行。

---

## Criteria

> ISC 编号规则：`ISC-{域}{序号}`，域字母对应分组（A-R 共 18 域）。每条 ISC 原子化、二元可验、8-12 词。Anti-Criteria 用 `Anti:ISC-{序号}` 前缀（避免与域 A 编号冲突）。

### A. 渲染保真与画布呈现

| ID | Criterion |
|----|-----------|
| ISC-A1 | 统一根级与嵌套两套模拟渲染器为单一组件 |
| ISC-A2 | 同一组件在根级与嵌套画布样式完全一致 |
| ISC-A3 | 容器类型判定从物料注册表读取单一真相源 |
| ISC-A4 | 删除 renderer.tsx 与 store.ts 中硬编码容器类型列表 |
| ISC-A5 | 未知组件类型 fallback 显示物料 displayName 与属性提示 |
| ISC-A6 | 提供真实预览模式 iframe 渲染真实 shadcn 组件 |
| ISC-A7 | 模拟渲染可由物料注册自定义 previewRender 函数 |
| ISC-A8 | 选中组件实时显示尺寸 tooltip 如 4×2 cols 320×80px |
| ISC-A9 | hover 组件显示用户自定义 name 标签 |
| ISC-A10 | 网格背景对比度提升至清晰可见且不喧宾夺主 |

### B. 拖拽与落点体验

| ID | Criterion |
|----|-----------|
| ISC-B1 | 拖拽进行中画布实时显示落点占位框或插入线 |
| ISC-B2 | 落点坐标基于鼠标在画布的绝对位置计算 |
| ISC-B3 | 落点坐标计算减去 panX panY 与 pagePadding 偏移 |
| ISC-B4 | 开启拖拽到画布边缘的自动平移 autoScroll |
| ISC-B5 | 使用 dnd-kit DragOverlay 显示跟随光标的拖拽缩略图 |
| ISC-B6 | 容器拖入支持 before after 插入位置选择 |
| ISC-B7 | 拖拽时容器显示可接收图标提示与非容器禁用反馈 |
| ISC-B8 | 拖入容器时校验子组件类型是否被父 slot 允许 |
| ISC-B9 | 新素材拖入画布去除先插末尾再移动的两步闪烁 |
| ISC-B10 | 拖拽时显示与相邻组件的智能对齐辅助线 |

### C. 布局与坐标系统

| ID | Criterion |
|----|-----------|
| ISC-C1 | 网格背景尺寸与实际列宽精确对齐 |
| ISC-C2 | 缩放原点改为光标位置 pan 偏移按 zoom 差值补偿 |
| ISC-C3 | 视口切换提供响应式预览按断点重排组件 |
| ISC-C4 | 支持自由定位模式作为 Grid 的补充选项 |
| ISC-C5 | 行高支持自适应内容或 min-height 配置 |
| ISC-C6 | 画布小地图显示全局内容概览与当前视口框 |
| ISC-C7 | 工具栏显示缩放百分比并支持手动输入 |
| ISC-C8 | 提供 zoom-to-fit 与 zoom-to-selection 一键操作 |
| ISC-C9 | 画布顶部与左侧显示像素与网格双单位标尺 |

### D. 选中、多选与批量操作

| ID | Criterion |
|----|-----------|
| ISC-D1 | 空白处拖拽实现框选矩形选中框内组件 |
| ISC-D2 | 多选时显示包围盒 bounding box |
| ISC-D3 | 多选后提供左对齐右对齐居中与等距分布按钮 |
| ISC-D4 | 多选后支持批量修改共有属性 |
| ISC-D5 | 区分主选中实线边框与次选中虚线边框 |
| ISC-D6 | Esc 键清除当前选中 |
| ISC-D7 | 嵌套子组件可在画布单击选中 |
| ISC-D8 | 双击容器进入子编辑模式显示面包屑路径 |
| ISC-D9 | 选中组件支持锁定与隐藏状态 |
| ISC-D10 | 选中组件支持 z-order 上移下移置顶置底 |

### E. 键盘快捷键体系

| ID | Criterion |
|----|-----------|
| ISC-E1 | 方向键微调选中组件位置 1 网格单位 |
| ISC-E2 | Shift 加方向键微调 10 网格单位 |
| ISC-E3 | Ctrl+S 保存并阻止浏览器默认保存对话框 |
| ISC-E4 | Ctrl+D 快速复制选中组件 |
| ISC-E5 | Ctrl+A 全选当前画布组件 |
| ISC-E6 | Ctrl+0 重置缩放 Ctrl 等号放大 Ctrl 减号缩小 |
| ISC-E7 | F2 内联重命名选中组件 |
| ISC-E8 | Tab 与 Shift+Tab 在组件间切换选中 |
| ISC-E9 | 快捷键帮助面板按问号键唤起 |
| ISC-E10 | Backspace 守卫补充 select 元素防浏览器后退 |

### F. 物料面板体验

| ID | Criterion |
|----|-----------|
| ISC-F1 | 物料面板顶部提供搜索框按名称描述过滤 |
| ISC-F2 | 提供 Recently Used 最近使用物料分区 |
| ISC-F3 | 提供 Favorites 收藏物料分区 |
| ISC-F4 | 物料项渲染小型外观缩略图预览 |
| ISC-F5 | 分类 Tab 固定顶部仅内容区滚动 |
| ISC-F6 | 提供 Form Group 等复合物料如带 Label 的 Input |

### G. 组件树面板

| ID | Criterion |
|----|-----------|
| ISC-G1 | 组件树节点支持右键上下文菜单 |
| ISC-G2 | 右键菜单含复制剪切粘贴删除重命名上下移动 |
| ISC-G3 | 双击节点文本进入内联重命名输入模式 |
| ISC-G4 | 组件树顶部提供搜索框过滤节点并展开父链 |
| ISC-G5 | 新插入容器节点自动加入展开集 |
| ISC-G6 | 树节点支持键盘导航方向键 Enter F2 |
| ISC-G7 | 拖拽把手扩大至整行可拖拽 |
| ISC-G8 | TreeDropSlot 仅在拖拽进行中显示降低视觉噪音 |
| ISC-G9 | 节点显示用户自定义 name 优先于 type |
| ISC-G10 | 左面板 Pages 模式下展开页面树替代 select 切换 |

### H. 属性编辑器

| ID | Criterion |
|----|-----------|
| ISC-H1 | 属性分组头可折叠并持久化到 localStorage |
| ISC-H2 | order 大于阈值或标记 advanced 的属性默认折叠 |
| ISC-H3 | required 字段空值时红框提示并阻止保存 |
| ISC-H4 | dataBinding 字段改为下拉从数据模型表列选择 |
| ISC-H5 | eventBinding 无 flow 时提供创建流程引导入口 |
| ISC-H6 | Tailwind 类编辑器分类面板间距颜色排版布局 |
| ISC-H7 | 复杂属性 json 类型提供表格化可视化编辑器 |
| ISC-H8 | icon 字段集成 Lucide 图标可搜索网格选择器 |
| ISC-H9 | color 字段读取项目主题色提供快捷选择 |
| ISC-H10 | image 上传端点可配置非硬编码 |
| ISC-H11 | 多选时显示共有属性支持批量编辑 |
| ISC-H12 | 属性变更 debounce 避免历史栈冗余条目 |
| ISC-H13 | 页面级设置移出属性面板至独立页面设置区 |

### I. Slot 插槽系统

| ID | Criterion |
|----|-----------|
| ISC-I1 | MaterialDefinition 新增 slots 声明字段 |
| ISC-I2 | slot 声明含 name label allowedChildTypes max defaultText |
| ISC-I3 | aggregate-slot-mapper 用通用引擎替代手写函数 |
| ISC-I4 | 新增聚合组件无需修改 slot 同步代码仅加配置 |
| ISC-I5 | slot 校验在 insertNodeIntoTree 拦截非法子类型 |
| ISC-I6 | maxChildren 字段在插入时校验或删除未使用字段 |
| ISC-I7 | ComponentNode children 支持 string 联合类型消除 Text 节点 hack |
| ISC-I8 | 反向同步保留非 Text 自定义子组件不丢失 |

### J. 物料架构单一真相源

| ID | Criterion |
|----|-----------|
| ISC-J1 | 物料定义新增 shadcnImport 字段声明导入路径与组件 |
| ISC-J2 | 生成器 COMPONENT_MAP 从物料注册表派生而非独立维护 |
| ISC-J3 | 生成器 SHADCN_IMPORT_MAP 从物料注册表派生 |
| ISC-J4 | 新增组件仅需新增物料定义一处 |
| ISC-J5 | 物料注册提供 registerAsync 支持按需加载 |
| ISC-J6 | 物料注册失败可选严格模式抛异常 |
| ISC-J7 | MaterialRegistry 接口去重删除重复定义 |
| ISC-J8 | props 运行时按物料 editableProps 校验拦截非法值 |

### K. 事件联动运行时

| ID | Criterion |
|----|-----------|
| ISC-K1 | 一个事件可绑定多个 flow 依次执行 |
| ISC-K2 | 事件类型按组件类型白名单校验避免不合理绑定 |
| ISC-K3 | 统一绑定存储删除 FlowBindingStore 死代码 |
| ISC-K4 | 事件 handler 调用 callFlow 后保留返回值 |
| ISC-K5 | flow 输出回写客户端 Zustand store 驱动组件更新 |
| ISC-K6 | 组件可订阅 store 字段实现响应式更新 |
| ISC-K7 | onPageLoad 生成 useEffect 正确注入依赖 |

### L. 数据联动运行时

| ID | Criterion |
|----|-----------|
| ISC-L1 | dataBindings 生成可运行的 Supabase 查询代码 |
| ISC-L2 | dataBindings 生成 TanStack Query useQuery 包装 |
| ISC-L3 | 数据查询结果回填组件 props 响应式更新 |
| ISC-L4 | 支持 table.column 单列绑定的运行时求值 |
| ISC-L5 | 数据查询参数可绑定 URL searchParams 或动态路由 params |
| ISC-L6 | 数据查询参数可绑定其他组件当前值 |
| ISC-L7 | 数据绑定 UI 从数据模型编辑器表列自动补全 |

### M. 组件间联动与表达式

| ID | Criterion |
|----|-----------|
| ISC-M1 | 引入响应式表达式语法复用模板花括号或 JS 子集 |
| ISC-M2 | 组件属性可绑定表达式如引用另一组件值 |
| ISC-M3 | 表达式支持基础运算字段访问与三元条件 |
| ISC-M4 | 运行时表达式求值器在生成项目中实现 |
| ISC-M5 | 表达式依赖变化时自动重算并更新组件 |
| ISC-M6 | 组件支持 visibleIf 条件渲染表达式 |
| ISC-M7 | 组件支持 repeat 循环渲染绑定数组数据 |

### N. Flow 运行时

| ID | Criterion |
|----|-----------|
| ISC-N1 | Flow 运行时实现拓扑排序沿 edge 依次执行节点 |
| ISC-N2 | 端口数据沿 edge 从源输出传递到目标输入 |
| ISC-N3 | condition.if 根据 config 求值选择 true false 分支 |
| ISC-N4 | loop.forEach 遍历数组对每元素执行子图 |
| ISC-N5 | 模板变量花括号在节点执行前解析 |
| ISC-N6 | 节点 error 输出端口有错误时走 error 分支 |
| ISC-N7 | flow.delay 节点执行异步等待 |
| ISC-N8 | action.email notification custom.code 节点真实执行 |
| ISC-N9 | Supabase 客户端在 runFlow 中复用单例 |
| ISC-N10 | Flow 执行产出日志记录每节点输入输出与耗时 |

### O. Flow 编辑器

| ID | Criterion |
|----|-----------|
| ISC-O1 | 连线时实时校验端口类型不兼容时拒绝或警告 |
| ISC-O2 | 节点配置面板按节点类型生成 config 编辑表单 |
| ISC-O3 | db 节点 table 字段从数据模型表列表下拉选择 |
| ISC-O4 | db 节点 where 条件列名从表 schema 自动补全 |
| ISC-O5 | 拖线时高亮兼容端口类型提示 |
| ISC-O6 | condition.switch 根据 config cases 动态生成输出端口 |
| ISC-O7 | Flow 编辑器提供试运行按钮调用 runFlow 显示结果 |
| ISC-O8 | 试运行高亮当前执行节点与执行路径 |
| ISC-O9 | 试运行显示每节点输入输出变量监视面板 |

### P. 预览与调试

| ID | Criterion |
|----|-----------|
| ISC-P1 | 预览模式消费 eventBindings 实现事件交互 |
| ISC-P2 | 预览模式点击绑定 flow 的按钮触发流程或 toast 提示 |
| ISC-P3 | 预览模式消费 dataBindings 显示模拟数据 |
| ISC-P4 | 预览提供移动端设备框架外壳模拟 |
| ISC-P5 | 预览支持新窗口打开走真实路由预览 |
| ISC-P6 | API 端点测试发送真实请求至开发服务器 |
| ISC-P7 | API 端点测试执行绑定的 flow 返回真实结果 |

### Q. 路由与数据模型持久化

| ID | Criterion |
|----|-----------|
| ISC-Q1 | 路由编辑器修改持久化到 project routes store |
| ISC-Q2 | 数据模型编辑器修改持久化到 project models store |
| ISC-Q3 | 路由与页面建立显式 pageId 关联非路径模糊匹配 |
| ISC-Q4 | authGuard requiredRole 生成 Next.js middleware 代码 |
| ISC-Q5 | API 中间件配置生成对应 auth 限流 CORS 日志代码 |
| ISC-Q6 | 数据模型 schema 变更通知数据绑定 UI 刷新选项 |
| ISC-Q7 | 数据模型表列变更提示受影响的 flow db 节点 |

### R. 代码架构健康度

| ID | Criterion |
|----|-----------|
| ISC-R1 | renderer.tsx 拆分至单文件不超过 400 行 |
| ISC-R2 | store.ts 拆分树操作历史视口为独立模块 |
| ISC-R3 | aggregate-slot-mapper.ts 用声明式引擎缩减至 400 行内 |
| ISC-R4 | editor-toolbar.tsx 拆分导出导入同步为独立 hook |
| ISC-R5 | 历史系统改增量 diff 消除每次全量深拷贝 |
| ISC-R6 | 历史合并逻辑抽取 withHistory 高阶函数消除 20 处重复 |
| ISC-R7 | CanvasComponentItem 添加 React.memo 减少不必要重渲染 |
| ISC-R8 | 全局 Ctrl 状态改为 React Context 消除模块级可变状态 |
| ISC-R9 | 删除 useEditorStore 中未被消费的历史死代码 |
| ISC-R10 | window.alert 替换为 shadcn toast 通知 |

### S. 数据一致性与生成器契约补充

| ID | Criterion |
|----|-----------|
| ISC-S1 | 统一 tailwindClasses 为权威样式字段废弃 props.className |
| ISC-S2 | 生成器与物料集合对齐消除引用不存在组件 |
| ISC-S3 | 生成器占位符对未映射类型输出告警而非静默 |
| ISC-S4 | ComponentNode name 字段 transform 不破坏幂等性 |
| ISC-S5 | props.className 与 tailwindClasses 迁移后移除兼容回退 |
| ISC-S6 | 保存或导出前强制执行 schema 校验拦截非法数据 |
| ISC-S7 | 迁移注册表 getLatestVersion 改语义版本数值排序 |
| ISC-S8 | 迁移路径查找校验 to 版本在目标链路上防分叉走错 |

### T. 布局组件与表单能力补充

| ID | Criterion |
|----|-----------|
| ISC-T1 | Flex justify 补 around evenly align 补 baseline |
| ISC-T2 | Grid 支持 rows areas autoFlow 等高级配置 |
| ISC-T3 | Container 支持 padding margin 属性非仅 maxWidth |
| ISC-T4 | Layout 组件 gap 字段统一为 number 类型带校验 |
| ISC-T5 | Input 组件支持 required pattern minLength 校验规则 |
| ISC-T6 | 表单提交自动聚合多个字段值为 flow event.data |
| ISC-T7 | 表单字段间联动如选省份联动城市下拉 |

### U. 编辑器交互与持久化补充

| ID | Criterion |
|----|-----------|
| ISC-U1 | 三栏面板宽度可拖拽调整非固定 w-48 w-64 w-72 |
| ISC-U2 | 折叠面板卸载内容而非仅视觉隐藏减少性能浪费 |
| ISC-U3 | findNodeById 建立 id 到 node 索引缓存避免递归 |
| ISC-U4 | autoSave 30s 定时器保证最长 30s 必触发非仅重置 |
| ISC-U5 | 视口状态统一为单一 store 消除双源漂移 |
| ISC-U6 | 删除操作撤销栈满时提示用户或要求确认 |
| ISC-U7 | 工具栏同步状态 Badge 折叠为单图标点击展开详情 |
| ISC-U8 | 路由 layout 字段从文本输入改为布局列表选择 |
| ISC-U9 | 动态路由 params 传递到页面组件与 flow 输入 |
| ISC-U10 | API customHandler 字段持久化并生成对应代码 |
| ISC-U11 | API 请求 body 运行时按 schema 校验拦截非法请求 |
| ISC-U12 | RLS 策略模板生成完整 SQL 而非仅存模板标识 |
| ISC-U13 | 事件 args 完整传递到 flow trigger 节点供消费 |
| ISC-U14 | 依赖组件类型的事件白名单如 Card 不可绑 onSubmit |

### Anti-Criteria（必须不发生）

| ID | Criterion |
|----|-----------|
| Anti:ISC-1 | 不可在模拟与真实渲染间出现视觉不一致误导用户 |
| Anti:ISC-2 | 不可在拖拽松手前无任何落点指示 |
| Anti:ISC-3 | 不可让网格背景线与实际列边界错位 |
| Anti:ISC-4 | 不可生成 TODO 注释冒充已实现的数据绑定 |
| Anti:ISC-5 | 不可让多节点 flow 在运行时静默不执行 |
| Anti:ISC-6 | 不可让数据模型或路由编辑器修改刷新后丢失 |
| Anti:ISC-7 | 不可让预览模式中事件绑定完全无响应 |
| Anti:ISC-8 | 不可将容器类型列表维护在三处独立硬编码 |
| Anti:ISC-9 | 不可在每次 action 做全量深拷贝导致百组件卡顿 |
| Anti:ISC-10 | 不可让生成的项目包含 Envelope 运行时依赖 |
| Anti:ISC-11 | 不可让一个事件绑定仅限单个 flow |
| Anti:ISC-12 | 不可让 flow 输出返回值在 handler 中被丢弃 |
| Anti:ISC-13 | 不可让 props.className 与 tailwindClasses 双字段并存无权威源 |
| Anti:ISC-14 | 不可让 generator 引用 materials 中不存在的组件类型 |
| Anti:ISC-15 | 不可让删除操作在撤销栈满后不可恢复且无确认 |

---

## Test Strategy

| ISC 域 | 验证类型 | 方法 | 阈值 | 工具 |
|--------|----------|------|------|------|
| A 渲染保真 | 视觉+单元 | 根级与嵌套同组件渲染快照对比；未知类型 fallback 截图 | 快照一致 | Vitest + Playwright |
| B 拖拽 | 集成 | Playwright 模拟拖拽断言落点指示器 DOM；绝对坐标计算单测 | 落点偏差 ≤1 网格 | Playwright + Vitest |
| C 布局坐标 | 单元+视觉 | 网格背景尺寸 vs 列宽断言；缩放原点数学验证；标尺渲染快照 | 背景与列宽差 ≤1px | Vitest |
| D 选中多选 | 集成 | Playwright 框选模拟；批量对齐后位置断言；面包屑 DOM 断言 | 框选命中 100% | Playwright |
| E 快捷键 | 集成 | Playwright 键盘事件模拟断言组件移动复制保存 | 全部快捷键生效 | Playwright |
| F 物料面板 | 单元+视觉 | 搜索过滤断言；最近使用 localStorage 持久化；缩略图渲染快照 | 搜索命中率 100% | Vitest |
| G 组件树 | 集成 | 右键菜单 DOM 断言；内联重命名后 store 状态断言；搜索过滤 | 全菜单项可用 | Playwright + Vitest |
| H 属性编辑器 | 单元+集成 | 折叠态 localStorage；required 校验拦截；dataBinding 下拉选项来自数据模型 | 校验拦截 100% | Vitest |
| I Slot 系统 | 单元 | 声明式 slot 配置驱动的同步结果与手写版等价；非法子类型拦截 | 20 聚合组件全通过 | Vitest |
| J 物料架构 | 单元 | 新增组件仅改一处；generator 从注册表派生导入映射；props 校验 | 单一处修改通过 | Vitest |
| K 事件联动 | 集成 | 生成项目 npm run dev 后点击按钮触发 flow；多 flow 顺序执行 | 事件真实触发 | Playwright + shell |
| L 数据联动 | 集成 | 生成项目 useQuery 真实查询 Supabase；数据回填组件 | 查询返回数据 | Vitest + Supabase local |
| M 表达式 | 单元 | 表达式求值器断言；依赖变化触发重算；条件渲染显隐 | 求值正确 100% | Vitest |
| N Flow 运行时 | 单元+集成 | 多节点 flow 拓扑执行；条件分支路径断言；模板变量解析 | 17 节点类型全执行 | Vitest |
| O Flow 编辑器 | 集成 | 连线类型校验；config 表单编辑；试运行结果显示 | 类型不兼容拒绝 | Playwright + Vitest |
| P 预览调试 | 集成 | 预览中点击按钮触发 flow toast；数据绑定显示模拟数据 | 交互真实响应 | Playwright |
| Q 持久化 | 集成 | 路由/模型编辑后刷新页面状态保留；middleware 代码生成 | 刷新不丢失 | Playwright + shell |
| R 架构健康 | 静态 | 文件行数阈值断言；memo 包裹；无模块级可变状态；无死代码 | 行数达标 100% | ESLint + 自定义脚本 |
| S 数据一致性 | 单元+集成 | tailwindClasses 权威源断言；generator 与物料集合 diff；保存前校验拦截；迁移版本排序 | 集合完全对齐 | Vitest |
| T 布局表单 | 单元+集成 | Flex/Grid 属性渲染；Input 校验规则拦截；表单聚合数据断言；字段联动 | 校验拦截 100% | Vitest |
| U 编辑器交互 | 集成+视觉 | 面板宽度调整；autoSave 必触发；删除确认；同步 Badge 折叠；params 传递；body 校验 | 刷新不丢失+校验生效 | Playwright + Vitest |

---

## Features

| # | Feature | 描述 | 满足 ISC | 依赖 | 可并行 |
|---|---------|------|-----------|------|--------|
| F-R1 | 渲染统一与真相源 | 统一两套模拟渲染器；容器类型从注册表读取；物料 previewRender 注册 | A1-A10, J1-J4 | — | 是 |
| F-R2 | 拖拽落点与对齐 | 落点指示器；绝对坐标；DragOverlay；autoScroll；对齐线；容器 before/after | B1-B10 | F-R1 | 是 |
| F-R3 | 布局坐标修复 | 网格背景对齐；光标缩放；响应式预览；小地图；标尺；zoom 控件 | C1-C9 | — | 是 |
| F-R4 | 选中多选批量 | 框选；包围盒；对齐分布；批量属性；锁定隐藏；z-order；嵌套选中 | D1-D10 | F-R2 | 是 |
| F-R5 | 快捷键体系 | 方向键 Ctrl+S/D/A/0 F2 Tab 帮助面板 select 守卫 | E1-E10 | — | 是 |
| F-R6 | 物料面板升级 | 搜索；最近使用；收藏；缩略图；复合物料 | F1-F6 | F-R1 | 是 |
| F-R7 | 组件树升级 | 右键菜单；内联重命名；搜索；键盘导航；页面树 | G1-G10 | — | 是 |
| F-R8 | 属性编辑器升级 | 折叠分组；校验；dataBinding 下拉；Tailwind 分类；复杂属性编辑器 | H1-H13 | F-R1 | 是 |
| F-R9 | 声明式 Slot 系统 | MaterialDefinition slots 字段；通用同步引擎；slot 校验；string children | I1-I8 | F-R1 | 否（核心） |
| F-R10 | 物料单一真相源 | 物料 shadcnImport 字段；generator 派生；registerAsync；props 校验 | J1-J8 | F-R9 | 否（核心） |
| F-R11 | 事件联动运行时 | 多 flow 绑定；事件白名单；统一存储；flow 输出回写 store；组件订阅 | K1-K7 | F-R12 | 是 |
| F-R12 | Flow 完整运行时 | 拓扑执行；端口传递；条件循环；模板变量；错误分支；单例 client；日志 | N1-N10 | — | 否（核心） |
| F-R13 | 数据联动运行时 | Supabase 查询生成；TanStack Query 包装；回填组件；参数绑定 | L1-L7 | F-R12 | 是 |
| F-R14 | 组件间联动表达式 | 响应式表达式；属性绑定；条件渲染；循环渲染；求值器 | M1-M7 | F-R13 | 是 |
| F-R15 | Flow 编辑器升级 | 实时类型校验；config 编辑表单；数据模型联动；试运行；变量监视 | O1-O9 | F-R12 | 是 |
| F-R16 | 预览调试真实化 | 事件交互预览；数据模拟；设备框架；新窗口预览；API 真实测试 | P1-P7 | F-R11, F-R13 | 是 |
| F-R17 | 路由模型持久化 | 路由模型 store 持久化；pageId 关联；auth middleware 生成；中间件代码 | Q1-Q7 | — | 是 |
| F-R18 | 架构健康治理 | 文件拆分；历史增量 diff；withHistory 抽取；memo；Context；死代码清理 | R1-R10 | F-R1, F-R9 | 是 |
| F-R19 | 数据一致性与契约 | tailwindClasses 统一；generator 对齐物料；保存前校验；迁移修复 | S1-S8 | F-R10 | 是 |
| F-R20 | 布局与表单能力 | Flex/Grid/Container 属性补全；Input 校验；表单聚合；字段联动 | T1-T7 | F-R1 | 是 |
| F-R21 | 编辑器交互持久化 | 面板可调宽；autoSave 修复；删除确认；同步 Badge 折叠；params 传递；API 校验；RLS SQL | U1-U14 | F-R17 | 是 |

**并行批次规划**：
- **批次 1（核心串行）**：F-R9 声明式 Slot → F-R10 单一真相源 → F-R12 Flow 运行时
- **批次 2（可并行）**：F-R1, F-R2, F-R3, F-R4, F-R5, F-R6, F-R7, F-R8, F-R17, F-R18, F-R19, F-R20, F-R21
- **批次 3（依赖批次 1）**：F-R11, F-R13, F-R14, F-R15, F-R16

---

## Decisions

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-22 | **D01: 保留模拟渲染但提供真实预览模式** | 纯模拟无法保证保真，纯真实无法支持拖拽手柄。模拟模式用于编辑态轻量交互，真实模式（iframe）用于验证态。两者共存而非互斥。 |
| 2026-06-22 | **D02: 落点坐标改用 dnd-kit over.rect 绝对坐标** | delta 位移从素材面板起算，含面板高度偏移，与用户直觉不符。over.rect + active.rect + 画布 getBoundingClientRect 计算画布内绝对偏移，再除以 CELL_SIZE×zoom 并减去 pan/padding。 |
| 2026-06-22 | **D03: 网格背景用 CSS 变量与列宽联动** | 背景固定 80px 导致 mobile 视口下网格线与列边界错位。改用 `backgroundSize: calc(100% / 12) var(--cell-height)` 让背景随视口宽度自适应。 |
| 2026-06-22 | **D04: 缩放原点改光标位置** | transformOrigin top-left 导致缩放画面跑左上角。缩放前将 pan 偏移按 zoom 差值补偿：`newPan = mousePos - (mousePos - oldPan) × (newZoom / oldZoom)`。 |
| 2026-06-22 | **D05: Slot 系统声明式配置驱动** | 1917 行手写同步不可维护。MaterialDefinition 新增 `slots: SlotDefinition[]`，通用引擎读取配置执行 props↔children 双向同步。预期减少 ~1500 行。 |
| 2026-06-22 | **D06: 物料定义为单一真相源** | 容器类型三处硬编码、物料↔渲染器↔生成器四方耦合是核心债务。物料的 isContainer/supportsChildren/slots/shadcnImport/editableProps 成为渲染器、store、生成器、属性编辑器唯一数据源。 |
| 2026-06-22 | **D07: Flow 运行时重写为图执行器** | 当前单节点执行使条件/循环/多步骤全部失效。重写：拓扑排序→端口数据传递→条件分支→循环体→模板变量解析→错误分支→异步等待。 |
| 2026-06-22 | **D08: 表达式语法复用花括号模板** | 不造新 DSL。复用已有 `{{...}}` 模板语法，扩展为支持基础运算、字段访问、三元条件的 JS 子集。运行时求值器生成到用户项目。 |
| 2026-06-22 | **D09: 数据绑定生成 TanStack Query + Supabase** | 生成 `useQuery({ queryKey, queryFn: () => supabase.from(table).select(column).eq(...) })`，结果回填组件 props。参数可绑定 URL/组件值。 |
| 2026-06-22 | **D10: flow 输出回写 Zustand store** | 生成的项目含一个 `useAppStore`（Zustand），callFlow 返回值写入 store，组件通过 selector 订阅自动更新。实现 flow→UI 闭环。 |
| 2026-06-22 | **D11: 历史系统改增量 diff** | 每次全量 structuredClone + JSON.stringify 比较在百组件时卡顿。改用 immer patch 或结构共享，只存 diff。 |
| 2026-06-22 | **D12: 路由模型编辑器接入 save store** | 当前 useState 不持久化是 bug 级缺陷。接入已有的 project-routes/project-models store 的 save 方法。 |
| 2026-06-22 | **D13: 预览模式消费绑定** | RuntimeNodeRenderer 读取 eventBindings 绑定 onClick→callFlow（或 toast 提示）；读取 dataBindings 显示 mock 数据。让预览成为真正的验证工具。 |
| 2026-06-22 | **D14: 渐进式重构不推倒重来** | Zustand/dnd-kit/CSS Grid/React Flow/Zod 选型合理。在现有架构上演进，重构期间 build/test 持续通过。 |
| 2026-06-22 | **D15: 复合物料解决表单步数痛点** | 新增"带 Label 的 Input""Form Group"等复合物料，拖入即生成 Label+Input+校验结构，将表单搭建从逐个原子组件降到一次拖入。 |

---

## Changelog

| Date | Entry |
|------|-------|
| 2026-06-22 | **Created:** 本 ISA 由 4 个并行子代理深度审计 25+ 源文件后综合生成。前身 "Canvas Overhaul — Drag, Hierarchy, Nesting, Styling" 已归档（其 15 条 ISC 已全部 ✅ PASS 但范围过窄，仅覆盖 bug 修复，未触及联动运行时与架构债）。本 ISA 范围扩展至渲染保真、拖拽体验、布局坐标、选中批量、快捷键、物料面板、组件树、属性编辑器、slot 系统、物料架构、事件联动运行时、数据联动运行时、组件间联动表达式、flow 运行时、flow 编辑器、预览调试、路由模型持久化、代码架构健康共 18 个域 ~110 条 ISC。 |
| 2026-06-22 | **Conjectured:** 渲染保真度是用户信任的基石；模拟+真实双模式共存优于单模式。 |
| 2026-06-22 | **Conjectured:** 联动运行时缺失（flow 单节点、数据绑定 TODO、组件间无联动）是平台从"拼装器"到"低代码"的临界点。 |
| 2026-06-22 | **Conjectured:** 声明式 slot + 物料单一真相源是架构债的根治方案，预期消除 ~3000 行硬编码与重复代码。 |
| 2026-06-22 | **Reviewed:** 对 ISA 完整性交叉检查，发现三类问题并修正：(1) Anti-Criteria 编号与域 A 冲突，改为 `Anti:ISC-{n}` 前缀；(2) 补充域 S（数据一致性与生成器契约，8 条）、域 T（布局组件与表单能力，7 条）、域 U（编辑器交互与持久化，14 条）共 29 条遗漏 ISC；(3) Features 表新增 F-R19/F-R20/F-R21。ISC 总数从 ~110 增至 ~139+15 Anti。 |
| 2026-06-22 | **Deferred（已考虑但推迟到后续迭代）:** pan 惯性动量；pan 与框选模式切换（空格键临时切平移）；嵌套深度限制；缩放手柄方向箭头；容器空态引导增强；吸附高亮设计；sub-cell 像素精度；新手 onboarding 引导；空状态模板/快捷键入口；e2e 测试覆盖面扩展；物料版本管理字段；单例注册表重置（测试隔离）；options value 支持 number/boolean；defaultValue 类型约束；属性 dependsOn 条件显示；unregister/has/clear 注册表操作；无障碍 ariaProps/role；动画 transition 属性；richText 改真实富文本编辑器；code 字段语法高亮；i18n 错误提示本地化；注释计数矛盾修复；generator props→JSX 自动推导。这些属 P2 或代码质量层面，不阻断核心工作流，可在 F-R18 架构健康治理期间视情纳入。 |

---

## Verification

*本节在 Phase 6: VERIFY 填充。当前无已验证条目。验证时每条 ISC 需提供工具证据（测试输出/diff/截图/构建日志），禁止"应该工作"式断言。*

| Criteria | Status | Evidence |
|----------|--------|----------|
| *待执行阶段填充* | — | — |

---

## 附：用户工作流目标度量

**基准（当前）**：创建带数据绑定的注册表单页 ≈ 24 步，跨 3 次模式切换，2 次手敲绑定，预览不可交互验证。

**目标（重构后）**：≤ 10 步——
1. 拖入"Form Group"复合物料（含 Label+Input+校验） × 3
2. 拖入 Button
3. 选中 Input → dataBinding 下拉选 users.name（自动补全）
4. 选中 Button → eventBinding 下拉选 send-welcome flow
5. 点击 Preview → 点击按钮 → toast 提示"将触发 send-welcome"
6. Ctrl+S 保存

**度量规则**：以完成相同产物的用户操作步数为验收标准，而非 ISC 通过数。ISC 是手段，步数是目标。
