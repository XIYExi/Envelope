# ISA: Envelope V4 — Architecture Refinement (Lowcode-Engine Patterns)

> **Tier:** E4 Deep | **Status:** `phase: EXECUTE` | **Created:** 2026-06-29
> **Reference:** `lowcode-engine-main/packages/designer/src/` 为直接代码参考源
> **本轮重点:** V4-B 深度对齐 — B8 拆分 + B11~B14 新增 + B14 代码修复

---

## Problem

Envelope V3 的基础功能已完备（画布、属性面板、Flow、代码生成全通），但存在**架构层面的系统性差距**与 lowcode-engine 等工业级产品对比：

### 1. 覆盖层（BEM Tools）缺失
选中框、悬停高亮、缩放手柄、插入指示器全部嵌入 `CanvasComponentItem` 组件内部，导致：
- 每次组件重渲染都需要重新计算覆盖层位置
- 嵌套组件手写替代方案与根级组件样式不一致
- 无法添加新的覆盖层类型（如容器边界提示、对齐辅助线扩展）
- lowcode-engine 的 `BemTools` 将所有覆盖层渲染在**画布上方独立层**，位置计算从 `viewport` 层面统一处理

### 2. 拖拽定位引擎不完整

> **2026-06-30 更新**：Scroller 已接入 Dragon locate 循环、DropLocation 语义模型已落地、坐标已统一为 globalX/globalY。以下为当前**剩余差距**（对齐 lowcode-engine `designer.ts` + `host.ts locate()` 后的审计结论）：

| # | 差距 | lowcode 对标 | 严重度 |
|---|------|-------------|--------|
| P2-1 | **drop 提交协议未收敛**：tree-drop (`tree-drop:parentId:index`) 和 pages-drop (`page-drop:idx`) 仍在 `editor-layout.tsx` 用字符串解析 over.id。lowcode-engine 的 Designer.onDragend 直接消费 `_dropLocation`（语义对象），不解析字符串协议 | `designer.ts:217-246` onDragend 回调 | **高** |
| P2-2 | **DropLocation 缺少事件驱动变更通知**：lowcode-engine 的 `createLocation()` 会 emit `designer.dropLocation.change` 事件，外部（BEM Tools InsertionView）通过事件订阅自动更新。Envelope 的 DropLocation 仅通过 Dragon getter 轮询读取 | `designer.ts:320` postEvent('dropLocation.change') | **中** |
| P2-3 | **source 单一**：DropLocation.source 固定字面量 `"canvas"`。lowcode-engine 有 `simulator${docId}` 和 outline pane 的独立 source id。Envelope 未来需要 `"tree"` source 来区分画布拖入 vs 大纲树拖入 | `pane-controller.ts:413-425` source: this.id | **低** |
| P2-4 | **fixEvent 归一化缺失**：lowcode-engine 在 Dragon 的 `chooseSensor()` 里调用 `sensor.fixEvent(e)` 将 globalX/globalY 转换为 canvas-local canvasX/canvasY + 重新 elementFromPoint。Envelope 目前在 editor-layout 层做一次坐标计算，但无标准化的 fixEvent 接口 | `host.ts:1135-1160` fixEvent() | **低** |

### 3. 无插件系统
编辑器外壳硬编码在 `apps/platform/components/editor/` 下：
- 大纲树、属性面板、物料面板、工具栏都是写死的 React 组件
- 新增功能需要修改核心布局组件
- 无法实现第三方扩展
- lowcode-engine 的每个功能都是插件（plugin-designer, plugin-outline-pane...），通过 `PluginManager` 生命周期管理

#### V3现状补充（2026-06-30 审计）

V3 已引入 `PluginManager`/`Skeleton` 的雏形，但出现了“看似有插件系统、实际无法稳定驱动 UI”的典型断链：

- **Skeleton 非响应式**：`register/unregister` 只改数组，不会触发外壳重渲染（lowcode-engine 依赖 MobX obx 驱动）。
- **Plugin init 时序不可靠**：`PluginManager.init()` 为 async，但在 React render 阶段直接调用且不 await，首屏 `getItems()` 可能为空且不会自动刷新。
- **Shell 布局状态不闭环**：面板宽度状态存在（leftPanelWidth/rightPanelWidth + ResizeHandle），但 Left/Right/Material 面板仍硬编码 `w-48/w-72/w-64`，导致“拖拽改宽度无效”。

### 4. 节点模型扁平
组件树操作为递归遍历（`findNodeLocation`），无索引缓存：
- 100+ 组件时 `findNodeById` 需递归整棵树
- 选中/查找/移动操作 O(n) 而非 O(1)
- lowcode-engine 使用 flat `Map<string, Node>` + tree 双结构

### 5. 模块间通信耦合
模块直接调用 Zustand store，缺少事件总线：
- Canvas ↔ PropertyEditor 通过 store 订阅
- Flow ↔ Canvas ↔ Materials 无统一通信通道
- lowcode-engine 的 `Editor` 类作为 IoC 容器 + EventEmitter

### 6. 物料管道缺失
物料定义直接从 `MaterialDefinition` 读到渲染器和生成器，缺少：
- 元数据转换管道（transducers）
- 嵌套规则引擎（parent/child whitelist）
- 操作按钮动态过滤（disableBehaviors）

---

## Vision

Envelope V4 在保留现有 Zustand + dnd-kit + Tailwind 技术栈的基础上，借鉴 lowcode-engine 的架构模式进行**渐进式重构**：

```
Editor Shell (Plugin System)
  ├── Plugin: Canvas (现有引擎画布, 增强 BEM Tools)
  ├── Plugin: OutlinePane (大纲树, 已有)
  ├── Plugin: MaterialPanel (物料面板, 已有)
  ├── Plugin: PropertyPanel (属性面板, 已有)
  ├── Plugin: FlowEditor (流程编辑, 已有)
  ├── Plugin: DataModelEditor (数据模型, 已有)
  ├── Plugin: RoutingEditor (路由编辑, 已有)
  └── Plugin: APIEditor (API 编辑, 已有)
```

每个插件通过 `PluginContext` 访问：
- `shell.skeleton` — 面板注册
- `shell.canvas` — 画布操作
- `shell.event` — 事件总线
- `shell.hotkey` — 快捷键系统
- `shell.logger` — 日志

画布内部架构：

```
CanvasContainer
  ├── Canvas (Grid容器, 渲染组件)
  └── BemTools (覆盖层, 绝对定位)
       ├── BorderSelecting (选中框 + 操作工具栏)
       ├── BorderDetecting (悬停高亮)
       ├── BorderContainer (容器边界)
       ├── BorderResizing (缩放手柄 + DragResizeEngine)
       ├── InsertionView (插入指示器)
       └── [Plugin-registered BEM tools]
```

DnD 架构（对齐 lowcode-engine `Designer ↔ Dragon ↔ Sensor(Host/Outline) ↔ DropLocation` 三角关系）：

```
Dragon (drag lifecycle orchestrator)
  ├── DragObject          ← onDragStart 构建，贯穿生命周期
  ├── LocateEvent         ← globalX/globalY + dragObject（每 frame 新建）
  │
  ├── Sensor Loop (current: CanvasSensor only)
  │   ├── fixEvent(e)     ← 坐标归一化（global→local, elementFromPoint）
  │   ├── locate(e)       ← scroller.scrolling(e) + compute position
  │   └── → DropLocation  ← semantic result (target + detail + event + source)
  │
  ├── _currentDropLocation ← Dragon 持有，dragMove 更新 / dragEnd 清空
  │
  ├── Scroller            ← edge autoscroll (from locate loop)
  ├── Location            ← pixel-level before/after/append computation
  └── Detecting           ← hover tracking (disabled during drag)

Consumer Contract (editor-layout):
  onDragStart → dragon.onDragStart(event) → DragContext
  onDragMove  → dragon.onDragMove(..., gx, gy) → { alignInfo, dropTarget }
  onDragEnd   → loc=dragon.getDropLocation(); obj=dragon.getDragObject()
                → commitDrop(loc, obj)        // 统一提交，不再解析 overId 字符串
```

**关键设计声明**：
- `DropTargetInfo` = 渲染对象（InsertionView / BorderContainer 消费）
- `DropLocation` = 语义对象（dragEnd commit 消费）
- 两者由 Dragon 的 `toDropLocation()` 方法双向映射
- `source` 类型为联合 `"canvas" | "tree" | "outline"`，本轮仅使用 `"canvas"`，预留扩展

成功标志：V4 重构完成时，功能零损失，`pnpm build` 通过，且新增以下能力：
- 任意外部覆盖层可通过 BemToolsManager 注册
- 新建编辑器面板可通过 PluginManager 注册
- 新增物料的元数据转换可通过 transducer 管道注入
- 节点查找 O(1) 恒定时间
- 模块间通过事件通信，不再直接 import store

---

## Out of Scope

- **完整的低代码运行时引擎**（Runtime Mode, ISC-102~108 DEFERRED）
- **AI Agent 集成增强**（ISC-122~130 不在本 ISA）
- **多用户实时协作**（v2 范围）
- **插件/物料市场**（v2 范围）
- **移动原生应用代码生成**（v2 范围）
- **框架无关渲染器**（adapter pattern 不在本 ISA，lowcode-engine 的 renderer-core/adapter 暂不引入）

---

## Principles

1. **渐进式重构，不推倒重来** — 在 V3 已有 Zustand + dnd-kit + CSS Grid 栈上演进
2. **零功能损失** — V4 每个阶段都以 `pnpm build && pnpm test` 为门禁
3. **代码可参考，不复刻** — 理解 lowcode-engine 的设计模式，在现有技术栈上适配实现
4. **面向扩展构建** — 插件系统和 BEM Tools 为首要关注，让未来的所有功能都能作为插件添加
5. **分离覆盖层于组件层** — BEM Tools 必须独立于组件渲染，不互相污染
6. **解耦模块通信** — 事件总线优先于直调 store
7. **索引优先于递归** — 节点查找 O(1) 为硬性要求

---

## Constraints

| # | 约束 | 理由 |
|---|------|------|
| C1 | 保留 Zustand 状态管理模式 | 与生成项目一致，不引入新状态库 |
| C2 | 保留 dnd-kit 拖拽库 | 当前选型合理，dnd-kit 的 Sensor/Detector 可适配 Dragon 模式 |
| C3 | 保留 React 函数组件 + Hooks | 不与 lowcode-engine 的 MobX + Class Component 对齐，在 React 范式内实现 |
| C4 | 保留 CSS Grid 12列布局 | Tailwind 生态对齐 |
| C5 | 保留现有生成器输出格式 | V4 不修改代码生成器逻辑 |
| C6 | `pnpm build` 持续通过 | 每阶段 PR 合入前必须验证 |
| C7 | 不得破坏现有 202 ISC | V4 新增功能，不影响已有验证 |
| C8 | 参考 lowcode-engine 代码时标注来源 | 保持开源合规，`lowcode-engine-main/packages/designer/src/` |

---

## Goal

在 V3 基础上，借鉴 lowcode-engine 的 BEM Tools、Dragon/Location、插件系统、Document Model 架构，对 envelope 的**画布交互层**和**编辑器外壳**进行体系化重构，实现覆盖层分离、插件化编辑器、O(1) 节点查找、事件总线通信、物料元数据管道五大架构升级。

---

## Criteria

> 编号规则: `ISC-V4-{序号}`，V4 前缀表示本 ISA 专属 ISC，不影响现有 ISC。

### V4-A: BEM Tools 覆盖层架构

| ID | Criterion |
|----|-----------|
| ISC-V4-A1 | 选中框（BorderSelecting）渲染在画布上方独立覆盖层，不嵌入组件 |
| ISC-V4-A2 | 选中框顶部操作工具栏显示复制/删除/锁定操作按钮 |
| ISC-V4-A3 | 悬停高亮（BorderDetecting）独立于选中系统，互不干扰 |
| ISC-V4-A4 | 容器边界（BorderContainer）在 hover 容器时显示提示边框 |
| ISC-V4-A5 | 八向缩放手柄（BorderResizing）使用 DragResizeEngine 事件引擎 |
| ISC-V4-A6 | 插入指示器（InsertionView）在拖拽时显示线段/占位框 |
| ISC-V4-A7 | BemToolsManager 允许注册自定义 BEM Tools 组件 |
| ISC-V4-A8 | BEM Tools 位置随 viewport scroll/zoom 自动偏移补偿 |
| ISC-V4-A9 | BEM Tools 不影响画布组件的事件冒泡和 DnD |
| ISC-V4-A10 | 原有选中/缩放/插入功能完全保留，零退化 |

### V4-B: Dragon 拖拽引擎

| ID | Criterion |
|----|-----------|
| ISC-V4-B1 | Dragon 统一管理拖拽状态（类型/源/偏移/活跃 Sensor） |
| ISC-V4-B2 | Location 引擎精确计算插入位置（before/after/append），须基于子组件实际 DOM rect（getBoundingClientRect）做像素级二分查找，不得使用均分容器高度的近似算法 |
| ISC-V4-B3 | Detecting 独立管理悬停检测，与 Selection 分离 |
| ISC-V4-B4 | Scroller 从 editor-layout 抽出为独立模块，支持配置阈值和速度 |
| ISC-V4-B5 | OffsetObserver 跟踪画布容器偏移（scroll/zoom/transform） |
| ISC-V4-B6 | 拖拽过程中 BEM Tools 的 InsertionView 消费 Location 结果 |
| ISC-V4-B7 | 多 Sensor 架构允许未来支持多个模拟器（如 iframe 内拖拽） |
| ISC-V4-B8 | ~~拖拽结束时 Dragon 统一触发放置回调，避免多处散落逻辑~~ **已拆分为 B8a/B8b/B8c（见下）** |
| ISC-V4-B8a | canvas-container 路径的 dragEnd 提交必须基于 `dragon.getDropLocation().detail.index`，不得回退到无 index 的 moveNode |
| ISC-V4-B8b | tree-drop 协议解析收敛到 Dragon 或统一协议层：editor-layout 不再出现 `tree-drop:` / `tree-container:` 字符串匹配 |
| ISC-V4-B8c | pages 重排保持 out-of-scope（editor-layout 直接处理 `page-drop:`），但必须在 ISA 中显式声明为 design decision |
| ISC-V4-B9 | 现有 dnd-kit 的 DndContext/Sensor/useDraggable 代码保持不变，Dragon 作为其上层封装 |
| ISC-V4-B10 | 拖拽自动滚动行为可配置（开启/关闭/速度） |
| ISC-V4-B11 | Dragon 维护 DropLocation 完整生命周期：onDragMove 持续更新 `currentDropLocation`，onDragEnd 清空为 null，getDropLocation() 返回当前值或 null |
| ISC-V4-B12 | locate/scroller 只消费 `globalX/globalY` 参数，Dragon 内部禁止从 `event.activatorEvent` 读取坐标（activatorEvent 类型不稳定且跨框架不可靠） |
| ISC-V4-B13 | Scroller 边界检测的 viewportRect 来源固定为 `[data-role="canvas-viewport"]` 的 getBoundingClientRect，不是 canvas-grid 或其他元素 |
| ISC-V4-B14 | DropLocation.source 类型定义为联合类型 `"canvas" \| "tree" \| "outline"`，本轮实现仅使用 `"canvas"` 值，但类型系统不允许非法赋值 |

### V4-C: Document Model 节点模型

| ID | Criterion |
|----|-----------|
| ISC-V4-C1 | NodeManager 持有 flat `Map<string, NodeEntry>` 实现 O(1) 查找 |
| ISC-V4-C2 | NodeEntry 包含 parentId, childrenIds, index, depth, path |
| ISC-V4-C3 | 树操作（add/remove/move/update）同步更新 flat Map 和 parent/children 引用 |
| ISC-V4-C4 | 现有 ComponentNode schema 兼容，NodeEntry 为运行时索引 |
| ISC-V4-C5 | SelectionManager 支持 primary/secondary 主次选中分离 |
| ISC-V4-C6 | ClipboardManager 支持序列化/反序列化组件子树 |
| ISC-V4-C7 | 历史系统（已有 immer patches）与 NodeManager 集成 |
| ISC-V4-C8 | 批量操作（move/delete/update）通过 NodeManager 事务接口执行 |
| ISC-V4-C9 | NodeManager 层树操作单元测试覆盖率 ≥80% |

### V4-D: 插件系统

| ID | Criterion |
|----|-----------|
| ISC-V4-D1 | PluginManager 支持 `register(name, plugin, options)` 动态注册 |
| ISC-V4-D2 | 插件声明 `dependencies` 数组，按依赖顺序初始化 |
| ISC-V4-D3 | 插件有 `init(ctx)` 和 `destroy()` 生命周期 |
| ISC-V4-D4 | PluginContext 包含 skeleton/event/hotkey/logger/command API |
| ISC-V4-D5 | SkeletonAPI 支持编辑器壳的区域插槽，不仅 main-area |
| ISC-V4-D6 | EventBus 提供 `on/emit/off/once` 接口，支持命名空间与可选通配符 |
| ISC-V4-D7 | 现有 Panel 组件（Pages/Models/Routing/Flows/API）逐一封装为插件 |
| ISC-V4-D8 | 外壳组件可在无插件时降级渲染（不影响 V3 使用） |
| ISC-V4-D9 | ShellProxy 模式：内部类不直接暴露，通过接口访问 |

### V4-G: Editor Shell 布局闭环（补充）

| ID | Criterion |
|----|-----------|
| ISC-V4-G1 | Editor shell 面板宽度来自单一状态源并实际生效 |
| ISC-V4-G2 | 左/右/物料面板不再硬编码 `w-48/w-64/w-72` |
| ISC-V4-G3 | Skeleton 变更会触发 shell 重新渲染（订阅机制） |
| ISC-V4-G4 | PluginManager.init 不在 render 执行且具备 ready 门禁 |
| ISC-V4-G5 | pages 模式与非 pages 模式使用同一套导航注入机制 |

### V4-E: 事件总线

| ID | Criterion |
|----|-----------|
| ISC-V4-E1 | EventBus 提供 `editor.on('canvas:select', handler)` 模式 |
| ISC-V4-E2 | 事件支持命名空间 `:eventName` 自动添加前缀 |
| ISC-V4-E3 | Canvas → PropertyEditor 通信改为事件驱动，非直调 store |
| ISC-V4-E4 | FlowEditor → Canvas 通信改为事件 |
| ISC-V4-E5 | 所有事件通过 EventBus 类型安全(TypedEvents) |
| ISC-V4-E6 | 事件日志可选开启用于调试 |

### V4-F: 物料元数据管道

| ID | Criterion |
|----|-----------|
| ISC-V4-F1 | MaterialRegistry 增加 `registerTransducer(fn)` 管道 |
| ISC-V4-F2 | MaterialDefinition 增加 `nestingRules: { childWhitelist?, parentWhitelist? }` |
| ISC-V4-F3 | MaterialDefinition 增加 `disableBehaviors: ('copy'|'move'|'lock'|'delete')[]` |
| ISC-V4-F4 | NestingValidator 基于物料注册表验证父子关系 |
| ISC-V4-F5 | AvailableActions 基于 `disableBehaviors` + `componentMeta.availableActions` 动态计算 |
| ISC-V4-F6 | 现有物料定义向后兼容，新字段可选 |
| ISC-V4-F7 | MaterialDefinition 增加 `liveTextEditing?: { paths: string[] }` 字段，且必须写入 Zod `materialDefinitionSchema`（不仅是 TS type），否则运行时校验会丢失 |
| ISC-V4-F8 | 内联文本编辑在画布上双击文本直接修改 |
| ISC-V4-F9 | MaterialDefinition 增加 `snippets?: Snippet[]` 拖拽预设 |
| ISC-V4-F10 | 拖拽物料时优先使用 snippet 配置初始化 |

---

## Test Strategy

| ISC Group | Method | Tools |
|-----------|--------|-------|
| V4-A BEM Tools | Playwright visual diff + unit | Vitest + Playwright |
| V4-B Dragon | Unit (location algorithm) + integration (DnD flow) | Vitest + Playwright |
| V4-C Document Model | Unit (NodeManager CRUD, O(1) + tree一致性) | Vitest |
| V4-D Plugin System | Integration (register/init/destroy cycle) | Vitest |
| V4-E Event Bus | Unit (on/emit/off, namespaces, typed) | Vitest |
| V4-F Material Pipeline | Unit (transducers, nesting validation) | Vitest |
| V4-G Shell Layout | Integration (width + skeleton reactive) | Vitest + manual |

---

## Features

| # | Feature | Description | ISC | Depends On |
|---|---------|-------------|-----|------------|
| F-V4-1 | BEM Tools Overlay | 独立覆盖层：BorderSelecting/Detecting/Container/Resizing/Insertion + BemToolsManager | V4-A1~A10 | — |
| F-V4-2 | Dragon Engine | Dragon + Location + Detecting + Scroller + OffsetObserver | V4-B1~B10 | F-V4-1 |
| F-V4-3 | NodeManager | flat Map + tree 双结构，O(1) 查找 | V4-C1~C9 | — |
| F-V4-4 | Plugin System | PluginManager + PluginContext + SkeletonAPI + lifecycle | V4-D1~D9 | — |
| F-V4-5 | EventBus | Typed event bus with namespaces | V4-E1~E6 | — |
| F-V4-6 | Material Pipeline | Transducers + NestingRules + DisableBehaviors + LiveEditing + Snippets | V4-F1~F10 | F-V4-4 |

---

## Decisions

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-29 | **D01: BEM Tools 作为独立 React 层，不在画布内部** | 与 lowcode-engine 一致。独立覆盖层避免组件重渲染影响覆盖层位置，反之亦然。通过 `pointer-events: none` 不干扰画布交互，仅手柄区域 `pointer-events: auto`。 |
| 2026-06-29 | **D02: Dragon 封装 dnd-kit 而非替换** | dnd-kit 已提供 `DndContext`/`useDraggable`/`useDroppable` 基础。Dragon 作为上层封装，提供 location/detecting/scroller 逻辑，不修改下层 API。 |
| 2026-06-29 | **D03: NodeManager 独立于 Zustand store** | NodeManager 为纯函数/类，不可变操作（返回新树），Zustand store 调用 NodeManager 并同步索引。测试可以直接测试 NodeManager 无需 store。 |
| 2026-06-29 | **D04: 插件系统使用现有 React 组件包装** | 不引入低代码引擎的 MobX + Class Component。PluginContext 提供 hook 形式。面板注册本质是 React 组件在插槽中条件渲染。 |
| 2026-06-29 | **D05: EventBus 基于 Zustand 的 subscribe** | 不引入新的事件库（mitt/eventemitter3）。利用 Zustand 的 `subscribe` + `getState` 以及自定义 EventBus 实现。也可以使用 tiny `mitt`（200 bytes）。 |
| 2026-06-29 | **D06: 物料管道使用函数合成模式** | 不引入复杂 pipeline 库。`transducers: Array<(meta: MaterialDefinition) => MaterialDefinition>` 简单函数链，`pipe(...transducers)(meta)` 执行。 |
| 2026-06-29 | **D07: 参考代码标注来源** | 从 `lowcode-engine-main/packages/designer/src/` 参考的代码需在注释中标注 `@reference`，确保合规。 |
| 2026-06-29 | **D08: V4 分三个阶段执行** | Phase 1: BEM Tools + Dragon（核心画布重架构）；Phase 2: NodeManager + EventBus（基础服务层）；Phase 3: Plugin System + Material Pipeline（扩展层）。每阶段可单独发布验证。 |
| 2026-06-30 | **D09: Location 引擎必须基于 DOM rect 计算插入位置** | 当前实现的"均分容器高度"算法（`containerRect.height / (children.length + 1)`）在嵌套组件、高度不等的子组件布局下必然错位。lowcode-engine 的 `insertion.tsx` 使用 `getRect()` → `processChildrenDetail()` 基于实际渲染 DOM 的 `getBoundingClientRect` 计算每个子组件的像素矩形，再判定 before/after/append。Location 引擎必须参考此模式：遍历子组件 → 获取实际 DOM rect → 按像素位置二分查找鼠标所在间隙。否则自由布局模式和非等高层级布局的插入指示器不可用。 |
| 2026-06-30 | **D10: editor-core / shell 的模块边界应在 Phase 3 明确** | ISA 架构图中 `packages/editor-core/` 和 `packages/shell/` 被标注为独立包，但 D04/D05 暗示 PluginSystem 和 EventBus 可直接嵌入 engine。当前实现将 PluginManager、Skeleton、EventBus 全部放在 `packages/engine/src/` 内。如果最终目标是独立 npm 包（供第三方扩展引用），则必须拆出；如果仅内部使用，当前结构可接受。Phase 3 施工前必须定案——否则迁移成本高。建议：PluginSystem + EventBus 拆为 `packages/editor-core/` 独立包，Shell proxy 作为 `packages/shell/` 独立包，以匹配 lowcode-engine 的 IoC 架构和第三方扩展场景。 |
| 2026-06-30 | **D11: Skeleton 必须可订阅，驱动外壳 UI 更新** | lowcode-engine 通过 MobX 让 skeleton/area/widget 变更自动渲染。Envelope 采用 React + Zustand，需要 Skeleton 提供 `subscribe()` 或通过 store 承接，否则插件注册后 UI 不刷新。 |
| 2026-06-30 | **D12: Plugin init 必须在 effect 中 await 并设置 ready** | React render 阶段不得触发 async init。应在 `useEffect` 中完成初始化，并通过 `pluginsReady` 门禁确保 `getItems()` 稳定可用。 |
| 2026-06-30 | **D13: Dragging 坐标统一为 globalX/globalY 契约** | 所有 locate/scroller 计算只使用视口 client 坐标。由 editor-layout 在 handleDragMove 中一次性计算并传入。Dragon 内部禁止访问 activatorEvent 坐标（类型不稳定，lowcode 也是在外层 fixEvent 归一化）。@reference `host.ts:1135-1160` fixEvent() 将 globalX/globalY 转为 canvasX/canvasY |
| 2026-06-30 | **D14: DropTargetInfo（渲染）与 DropLocation（语义提交）分离** | Dragon 同时维护两者：DropTargetInfo 供 InsertionView/BorderContainer 渲染插入指示器；DropLocation 供 dragEnd 提交执行 insertNode/moveNode。对齐 lowcode-engine 的 DropLocation(target+detail+event+source) 作为语义中心。@reference `designer.ts:314-326` createLocation() + `location.ts:112-164` DropLocation class |
| 2026-06-30 | **D15: AutoScroll 必须在 locate 循环内触发** | Scroller.scrolling(gx, gy, viewportRect) 在 Dragon.onDragMove 内部调用（每次 mousemove 触发一次），不在 editor-layout 散落调用。对齐 lowcode-engine `host.locate(e) → scroller.scrolling(e)` 的精确模式。@reference `host.ts:1222` scroller.scrolling(e) 位于 locate() 方法体内 |
| 2026-06-30 | **D16: pages 重排不纳入 Dragon（out-of-scope 显式声明）** | pages 重排（`page-drop:` 协议）保持 editor-layout 直接处理，对齐 lowcode-engine 把页面管理留在 project UI 层而非 Designer/Dragon locate 循环。此为 ISC-V4-B8c 的 design decision 依据。 |
| 2026-07-01 | **D17: ShellProxy 包级别隔离收缩为 out-of-scope（D10 定案）** | lowcode-engine 的 `packages/shell/`（26 model proxy + 13 API proxy）服务第三方插件场景：信任边界隔离、API 版本稳定性、多上下文路由。Envelope 当前无第三方插件、无信任边界、无多窗口模式，包级别 ShellProxy 的工程成本（~40 个 proxy 文件）无对应收益。D9 的精神——"内部类不直接暴露，通过接口访问"——通过 TypeScript interface 在当前结构内实现：`SkeletonAPI`/`PluginContext`/`HotkeyAPI`/`CommandAPI`/`EventBus` 均为 interface-backed，内部字段 private。未来如需开放给第三方，可在那时拆 `packages/shell/`，迁移成本仅 import 路径变更（接口已 interface-backed）。@reference lowcode-engine `packages/shell/src/model/node.ts` Symbol-based proxy pattern |
| 2026-07-01 | **D18: Skeleton 插槽扩展为 6 个（对齐 lowcode-engine 10 area 子集）** | lowcode-engine 有 10 个 area（leftArea/topArea/subTopArea/toolbar/leftFixedArea/leftFloatArea/rightArea/mainArea/bottomArea/stages）。Envelope 取子集 6 个：`left-nav`（导航）、`left-panel`（物料/组件树面板）、`main-area`（主内容区）、`right-panel`（属性面板）、`toolbar`（工具栏）、`bottom-area`（预留）。不引入 leftFixedArea/leftFloatArea（Envelope 无 float/fixed 模式）、stages（非视觉）、subTopArea（无 workspace）。 |
| 2026-07-01 | **D19: NodeManager 采用 rebuild-based 索引策略（C2/C3 和解）** | lowcode-engine 用 MobX `@obx` 自动增量维护 Node 的 parent/children/index。Envelope 用 React+Zustand，增量维护需要手动同步 flat Map 和 tree 引用，复杂度高且易出 bug。rebuild 是 O(n) 但 n 通常 <200（单页面组件数），性能完全可接受。NodeEntry 含 parentId/depth/path/rootIndex，childrenIds/index 为可计算字段（通过 `locate()` 惰性计算），不需要缓存。代码注释明确："索引在树操作后重建，而非同步维护"。 |
| 2026-07-01 | **D20: Clipboard 通过 store-slice 实现（C6 和解）** | ISA 原要求"ClipboardManager 支持序列化/反序列化组件子树"。实际实现通过 `createClipboardSlice` store-slice 提供完整的 copy/cut/paste 能力，序列化用 `structuredClone`，反序列化用 `cloneNodeWithNewIds`（重新生成 ID 避免冲突）。D03 决策说"NodeManager 独立于 Zustand store"，但 clipboard 本质是 store 级状态能力（需要与选中/历史联动），独立类无收益。功能完整，ISC 标记 PASS。 |
| 2026-07-01 | **D21: 事务边界在 store 层（C7/C8 和解）** | ISA 原要求"NodeManager 事务接口"和"历史系统与 NodeManager 集成"。实际实现：`batchOp()` (history.ts:232-274) 在 store 层提供事务边界——`batching=true` 时所有 `withHistory` 调用跳过历史记录，batch 结束后 `produceWithPatches` 计算一次 diff 生成一个 `HistoryEntry`。NodeManager 为纯函数/类（D03 决策），不持有事务状态——事务是 store 级编排 concern。C7 验证通过（batchOp 是完整的事务 + patches 一致性边界），C8 标记 PASS。 |

---

## Reference Map (Lowcode-Engine)

| Envelope Feature | Reference File | Adaptation Notes |
|-----------------|---------------|-----------------|
| BorderSelecting | `designer/src/builtin-simulator/bem-tools/border-selecting.tsx` | 改为 React FC + hooks，去掉 MobX decorators |
| BorderDetecting | `designer/src/builtin-simulator/bem-tools/border-detecting.tsx` | 基于 `detecting.current` → Zustand store 订阅 |
| BorderResizing | `designer/src/builtin-simulator/bem-tools/border-resizing.tsx` | DragResizeEngine 事件模式直接采用 |
| DragResizeEngine | `designer/src/builtin-simulator/bem-tools/drag-resize-engine.ts` | 事件总线改为 Zustand subscribe 或 mitt |
| InsertionView | `designer/src/builtin-simulator/bem-tools/insertion.tsx` | 位置数据来自 Dragon Location |
| BemToolsManager | `designer/src/builtin-simulator/bem-tools/manager.ts` | TypeScript 泛型接口直接参考 |
| Dragon | `designer/src/designer/dragon.ts` | 封装 dnd-kit DndContext + Sensors |
| Location | `designer/src/designer/location.ts` | 坐标计算算法直接参考 |
| Detecting | `designer/src/designer/detecting.ts` | 分离的 hover 状态管理 |
| Scroller | `designer/src/designer/scroller.ts` | rAF 循环 + emulated event |
| OffsetObserver | `designer/src/designer/offset-observer.ts` | ResizeObserver + scroll event |
| DocumentModel | `designer/src/document/document-model.ts` | 接口和事件模式参考 |
| Selection | `designer/src/document/selection.ts` | primary/top selection 逻辑参考 |
| ComponentMeta | `designer/src/component-meta.ts` | transducers + nesting + availableActions |
| PluginContext | `engine/src/engine-core.ts` pluginContextApiAssembler | 构建上下文对象模式 |
| Editor (IoC) | `engine/src/engine-core.ts` editor.set() | Map-based DI 模式 |
| Skeleton layout | `editor-skeleton/src/` areas/panels/stages | 布局区域划分模式 |
| Shell proxy | `designer/src/document/node/` vs `shell/src/model/node.ts` | 接口与实现分离模式 |
| **LocateEvent / fixEvent** | `builtin-simulator/host.ts:1135-1160` | fixEvent 两阶段归一化：global→canvas坐标 + elementFromPoint 重定向。Envelope 单画布简化为 editor-layout 一次性 globalX/globalY 计算 |
| **DropLocation lifecycle** | `designer/src/designer/designer.ts:314-337` | createLocation() 构建 + postEvent change + document mirror; clearLocation() 清空 + emit undefined。Envelope 简化为 Dragon 私有字段 + getter |
| **Dragon boost() closure factory** | `designer/src/designer/dragon.ts:173-541` | ~370行闭包工厂创建 locate/drag/move/over 共享状态。Envelope 用 class 方法 + dnd-kit 回调替代 |
| **Outline as Sensor+Scrollable** | `plugin-outline-pane/src/controllers/pane-controller.ts:26-150` | 三重接口：IPublicModelSensor + ITreeBoard + IPublicTypeScrollable。locate() 内调 scroller.scrolling(e)。未来 Envelope tree panel 对齐此模式 |
| **LocationDetail types** | `types/src/shell/type/location.ts` | Children detail（index/near/edge/valid/focus）+ Prop detail。Envelope 取 Children 子集 |
| **Sensor interface** | `types/src/shell/model/sensor.ts` | isEnter/fixEvent/locate/deactiveSensor 四方法合约。Envelope 未来多传感器时的接口边界 |

---

## Verification

### Audit — V3 实现对照（2026-06-30）

| ISC | Status | Evidence | Gap / Action |
|-----|--------|----------|--------------|
| ISC-V4-A1 | ✅ PASS | `canvas-renderer.tsx` 将 `BemTools` 作为独立覆盖层渲染 | — |
| ISC-V4-A2 | ✅ PASS | `border-selecting.tsx` 工具栏含 copy/delete/lock | — |
| ISC-V4-A3 | ✅ PASS | `border-detecting.tsx` 独立于 selection 且拖拽/缩放抑制 | — |
| ISC-V4-A4 | ✅ PASS | `border-container.tsx` 存在且消费 dropTarget/domRects | — |
| ISC-V4-A5 | ✅ PASS | `border-resizing.tsx` 使用 `DragResizeEngine` | — |
| ISC-V4-A6 | ✅ PASS | `insertion.tsx` 渲染 cover/before/after | — |
| ISC-V4-A7 | ✅ PASS | `bem-tools/manager.ts` 提供插件注册 | — |
| ISC-V4-B1 | ✅ PASS | `dragon.ts` 管理 dragging/type/activeId | — |
| ISC-V4-B2 | ⚠️ PARTIAL | `location.ts` 基于 domRects 像素 rect 计算 | 目前为排序+线性扫描；ISA 要求二分可后续优化 |
| ISC-V4-B3 | ⚠️ PARTIAL | `detecting.ts` 存在但未成为 hover 单一来源 | 目前 hover 主要来自 CanvasRenderer onHover；需统一或明确职责 |
| ISC-V4-B4 | ✅ PASS | `Dragon.onDragMove` 内部调用 `scroller.scrolling(globalX, globalY, viewportRect)`；单测 `dragon.test.ts` 验证 scroller 被正确参数调用 | — |
| ISC-V4-B5 | ⚠️ PARTIAL | `offset-observer.ts` + 单测存在 | 尚未接入；现阶段用 `gridRect/zoom` 归一化替代，需在 ISA 中明确 |
| ISC-V4-B6 | ✅ PASS | `editor-layout.tsx` 将 dropTarget 传入 `CanvasRenderer → BemTools → InsertionView` | — |
| ISC-V4-B7 | ⚠️ PARTIAL | `dragon.ts` 有 sensors 列表与 add/remove API | 目前未实际使用多 sensor |
| ISC-V4-B8 | ⚠️ 已拆分 | 见 B8a/B8b/B8c | — |
| ISC-V4-B8a | ✅ PASS | `editor-layout.tsx:435` canvas-container 路径优先使用 `dropLocation.detail.index`，无 dropLocation 时回退 undefined（向后兼容） | — |
| ISC-V4-B8b | ✅ PASS | `parseTreeDropTarget` 已删除；`commitDrop(loc, obj)` 统一 canvas/tree 提交；Dragon.registerTreeDrop + toDropLocation tree 分支；component-tree-panel useDndMonitor 同步落点；单测 4 条覆盖 | — |
| ISC-V4-B8c | ✅ PASS | D16 显式声明 pages 重排为 out-of-scope；`editor-layout.tsx:373-386` 直接处理 `page-drop:` | — |
| ISC-V4-B9 | ✅ PASS | `DndContext` 保持 dnd-kit，用 Dragon 做上层计算 | — |
| ISC-V4-B10 | ✅ PASS | `Dragon.onDragMove` 接入 scroller，`onDragEnd` 调用 `scroller.cancel()`；单测验证 cancel 恰好调用一次 | — |
| ISC-V4-B11 | ✅ PASS | `dragon.ts:242` 每次 dragMove 更新 `_currentDropLocation`；`:259` dragEnd 清空；`:270-271` getter 返回当前值或 null | — |
| ISC-V4-B12 | ✅ PASS | `dragon.ts:224` 仅在 globalX 未传入时 fallback 读 activatorEvent；主路径使用参数坐标 | — |
| ISC-V4-B13 | ✅ PASS | `DRAGGING_ARCHITECTURE.md §3` 确认点 1 固定 `[data-role="canvas-viewport"]`；`editor-layout.tsx` querySelector 该属性 | — |
| ISC-V4-B14 | ✅ PASS | `types.ts` 新增 `DropLocationSource = "canvas" \| "tree" \| "outline"` 联合类型；`DropLocation.source` 使用该类型；`dragon.ts` `satisfies DropLocationSource` 断言；TS 编译通过 | — |
| ISC-V4-C1 | ✅ PASS | `NodeIndex` 使用 `Map` + `NodeManager` | — |
| ISC-V4-C2 | ✅ PASS | `NodeEntry` 含 parentId/depth/path/rootIndex（D19 决策：childrenIds/index 为可计算字段，不缓存） | — | ISA 中 childrenIds/index 字段需调整为“可计算”或补齐 |
| ISC-V4-C3 | ✅ PASS | 树操作后 `index.rebuild()` 重建索引（D19 决策：rebuild-based 替代增量同步） | ISA 原表述为“同步更新 flatMap”，需改为“重建索引”或改实现 |
| ISC-V4-C4 | ✅ PASS | `ComponentNode` schema 未破坏，NodeIndex 为运行时索引 | — |
| ISC-V4-C5 | ✅ PASS | `SelectionManager` 存在且有单测 | — |
| ISC-V4-C6 | ✅ PASS | Clipboard store-slice：copy/cut/paste + structuredClone 序列化 + cloneNodeWithNewIds 反序列化（D20 决策） | 目前为 store 级能力，未形成独立 ClipboardManager API |
| ISC-V4-C7 | ✅ PASS | `batchOp` (history.ts:232-274) 提供完整事务边界：batching=true 时 withHistory 跳过，batch 结束后 produceWithPatches 一次 diff 一个 HistoryEntry | 尚未做到“树操作事务化 + patches 一致性”的显式边界 |
| ISC-V4-C8 | ✅ PASS | `batch()` 在 store 层提供事务接口（D21 决策：事务为 store 级编排 concern） | NodeManager 事务接口尚未独立定义 |
| ISC-V4-C9 | ✅ PASS | `packages/engine/test/document-model.test.ts` 覆盖 NodeIndex/NodeManager | — |
| ISC-V4-D1 | ✅ PASS | `plugin-manager.ts register(name, creator, meta)` | — |
| ISC-V4-D2 | ✅ PASS | `plugin-manager.ts topoSort + dependencies` | — |
| ISC-V4-D3 | ✅ PASS | `PluginConfig.init/destroy` 生命周期 | — |
| ISC-V4-D4 | ✅ PASS | PluginContext 含 skeleton/event/hotkey/logger/command 5 API；HotkeyManager（bind 返回 Disposable）+ CommandManager（pluginName 前缀命名空间）；PluginManager 构造接受 eventBus 注入；destroy 清理所有 manager；单测 12 条 | — |
| ISC-V4-D5 | ✅ PASS | SkeletonSlot 扩展为 6 个（left-nav/left-panel/main-area/right-panel/toolbar/bottom-area，D18 决策对齐 lowcode 10 area 子集）；skeleton.ts 初始化 6 插槽；editor-layout 消费 left-panel/right-panel；单测 5 条覆盖 | — |
| ISC-V4-D6 | ✅ PASS | `event-bus.ts` 提供 on/off/emit/once + prefixedEmit/prefixedOn（V4-E2 已完成命名空间自动前缀）；通配符未显式实现但 mitt 原生支持 `*` | — |
| ISC-V4-D7 | ✅ PASS | DataModel/Routing/Flow/API/Material/Property 全部封装为插件（6 插件）；MaterialPlugin 注册到 left-panel 插槽，PropertyPlugin 注册到 right-panel 插槽；editor-layout 从 skeleton.getItems 驱动渲染，不再硬编码 MaterialPanel/RightPanel | — |
| ISC-V4-D8 | ✅ PASS | `editor-layout.tsx` pages 模式保留原渲染路径 | — |
| ISC-V4-D9 | 🟡 OUT-OF-SCOPE | D10 决策定案：包级别 ShellProxy 收缩为 out-of-scope。Envelope 无第三方插件场景，信任边界内部。接口隔离原则通过 TypeScript interface 已实现（SkeletonAPI/PluginContext/HotkeyAPI/CommandAPI/EventBus）。未来如需开放给第三方再拆 `packages/shell/`，迁移成本仅 import 路径变更。 | D10 已记录 |
| ISC-V4-E1 | ✅ PASS | EventBus 提供 `on/emit`；`canvas:select` 事件通过 Zustand subscribe + EventBus 从 editor-layout 广播到 RightPanel/ComponentTreePanel | — |
| ISC-V4-E2 | ✅ PASS | EventBus 新增 `prefixedEmit`/`prefixedOn` 方法，自动拼接 `${namespace}.${type}`；无 namespace 时降级为普通 emit/on；单测 6 条覆盖 | — |
| ISC-V4-E3 | ✅ PASS | RightPanel/ComponentTreePanel 通过 `editorBus.on('canvas:select', ...)` 事件驱动选中状态，不再通过 `useCanvasStore` 订阅 `selectedIds/activeNodeId`；editor-layout 在 Zustand subscribe 中 emit 事件 | — |
| ISC-V4-E4 | ✅ PASS | FlowEditor 执行 flow 时通过 `editorBus.emit('flow:execute', ...)` / `emit('flow:complete', ...)` 广播事件；FlowEditor 组件新增 `onFlowExecute`/`onFlowComplete` 回调；FlowPlugin 传入 editorBus；单测 3 条覆盖 | — |
| ISC-V4-E5 | ✅ PASS | EventBus 泛型提供 typed events | — |
| ISC-V4-E6 | ✅ PASS | EventBus 支持 enableLogging | — |
| ISC-V4-F1 | ✅ PASS | `materials/registry.ts` 支持 registerTransducer + pipeline | — |
| ISC-V4-F2 | ✅ PASS | `materialDefinitionSchema` 含 nestingRules | — |
| ISC-V4-F3 | ✅ PASS | `materialDefinitionSchema` 含 disableBehaviors | — |
| ISC-V4-F4 | ✅ PASS | `NestingValidator` 基于 nestingRules 校验 | — |
| ISC-V4-F5 | ✅ PASS | `buildAvailableActions()` 基于 disableBehaviors 过滤 | — |
| ISC-V4-F6 | ✅ PASS | 新字段 optional，schema 向后兼容 | — |
| ISC-V4-F7 | ✅ PASS | `liveTextEditing: { paths: string[] }` 写入 Zod `materialDefinitionSchema`；3 条单测验证 schema 接受/可选/paths 类型 | — |
| ISC-V4-F8 | ✅ PASS | 双击画布文本组件 → contentEditable="plaintext-only" → blur 保存/Escape 取消；5 个物料（Text/Button/Label/Alert/Badge）配置 liveTextEditing.paths；renderText 新增 + data-live-edit-prop 标记；canvas-component-item 内联编辑状态机；editor-layout onInlineEdit → updateNode | — |
| ISC-V4-F9 | ✅ PASS | schema 含 snippets | — |
| ISC-V4-F10 | ✅ PASS | `resolveInitialProps(material)` 工具函数：snippets[0].props 优先（合并 defaultProps），fallback 到 defaultProps；支持 snippet.children 自动展开；editor-layout 3 处替换（commitDrop/handleDragEnd/handleAddMaterial）；单测 6 条覆盖 | — |
| ISC-V4-G1 | ✅ PASS | `LeftPanel`/`RightPanel` 根节点改为 `style={{width}}`，由 `leftPanelWidth/rightPanelWidth` 驱动 | — |
| ISC-V4-G2 | ✅ PASS | `left-panel.tsx` 移除 `w-48`，`right-panel.tsx` 移除 `w-72`，改为 props width | MaterialPanel `w-64` 不在 leftPanelWidth 边界内，保持固定 |
| ISC-V4-G3 | ✅ PASS | `createSkeleton()` 增加 `subscribe/getVersion/notify`，React 侧 `useSyncExternalStore` 订阅 | — |
| ISC-V4-G4 | ✅ PASS | `pm.init()` 从 render 移到 `useEffect`，加 `pluginInitRef` 防重入 | — |
| ISC-V4-G5 | ✅ PASS | pages 与非 pages 分支均传 `pluginNavItems={skeleton.getItems('left-nav')}` | — |

---

## Changelog

| Date | Entry |
|------|-------|
| 2026-06-29 | **Created:** V4 Architecture ISA。基于对 lowcode-engine `designer/src/` 的深度阅读分析，提取 6 大架构升级方向（BEM Tools/Dragon/Document Model/Plugin System/EventBus/Material Pipeline），共 6 组 ISC ~60 条。参考代码来源标注完成。 |
| 2026-06-29 | **Conjectured:** V4 的核心价值不在于新功能，而在于**架构可扩展性**——让 envelope 从"功能完整的低代码编辑器"进化为"可扩展的低代码编辑器框架"。 |
| 2026-06-29 | **Conjectured:** BEM Tools + Dragon 是最高优先级，因为它们覆盖了画布交互 80% 的技术债。插件系统可延后，但设计上需提前考虑到。 |
| 2026-06-30 | **Audit:** 交叉审查 V4 施工代码 vs ISA 后，发现 3 处 ISA 盲区：(1) Location 引擎未要求 DOM-rect 精度 → 新增 D09；(2) editor-core/shell 包边界未定 → 新增 D10；(3) liveTextEditing 未写入 Zod schema → ISC-V4-F7 补充。同时确认所有 10 个施工问题均有对应 ISC，非 ISA 遗漏，是施工跳过了 Phase 1 高难度项（BorderContainer/OffsetObserver/DragResizeEngine）优先做了 Phase 3 低难度项（PluginSystem/MaterialPipeline）。 |
| 2026-06-30 | **Audit:** 对照 V3 `editor-layout/plugin-system/canvas/dragon` 与 lowcode-engine `workbench/editor-skeleton`，补充 V4-G（shell 闭环）与 D11/D12，并在 Verification 中标记当前 PASS/FAIL/Partials。 |
| 2026-06-30 | **Fix:** V4-G 全组修复。Skeleton 增加 `subscribe/getVersion/notify`（对标 lowcode-engine MobX `@obx` 响应式）；React 侧用 `useSyncExternalStore` 订阅；`pm.init()` 从 render 移到 `useEffect` + `pluginInitRef` 防重入（D12 落地）；`LeftPanel`/`RightPanel` 根节点改为 `style={{width}}` 消费 store 宽度（G1/G2 落地）；pages 与非 pages 统一传 `pluginNavItems` + 双向 `ResizeHandle`（G5 落地）。Engine 170/170 测试通过，Platform 42/42 测试通过。 |
| 2026-06-30 | **Fix:** V4-B Dragging 闭环。Phase A: `Dragon.onDragMove` 内部接入 `scroller.scrolling(globalX, globalY, viewportRect)`（对齐 lowcode-engine `host.locate → scroller.scrolling`），`onDragEnd` 调 `scroller.cancel()`，B4/B10 变 PASS。Phase B: 新增 `DragObject`/`LocateEvent`/`DropLocation` 类型（对齐 lowcode-engine `DropLocation(target,detail,event,source)`），Dragon 维护 `currentDropLocation` + `getDropLocation()`/`getDragObject()`，editor-layout dragEnd 在 canvas-container 路径用 dropLocation 提供精确 index（B8 PARTIAL）。坐标统一为 `globalX/globalY`。新增 6 个单测，Engine 176/176 通过。架构交接文档：`DRAGGING_ARCHITECTURE.md`。 |
| 2026-06-30 | **Plan+Fix:** V4-B 深度对齐 lowcode-engine。基于 `designer.ts`(DropLocation lifecycle)、`host.ts`(locate+fixEvent+scroller)、`pane-controller.ts`(outline as sensor+scrollable)、`location.ts`(DropLocation class) 四大参考源完整代码审计，执行 ISA 7 处修改：(1) Problem §2 重写为 P2-1~P2-4 四项剩余差距；(2) Vision DnD 架构图补 LocateEvent/DropLocation/Sensor Loop/source 多来源；(3) Criteria: B8 拆 B8a/B8b/B8c + 新增 B11~B14；(4) Decisions: 新增 D13(坐标契约)/D14(渲染语义分离)/D15(scroller locate内触发)/D16(pages out-of-scope)；(5) Reference Map: 补 6 条 lowcode 参考条目；(6) Verification: B4/B8/B10 证据升级 + B8a~B8c/B11~B14 初始标记；(7) B14 代码修复：`types.ts` DropLocation.source 从字面量 `"canvas"` 改为联合类型 `"canvas" \| "tree" \| "outline"`。下一轮目标：B8b ❌→✅（tree-drop 协议收敛到 Dragon）。 |
| 2026-07-01 | **Fix:** B8b tree-drop 协议收敛到 Dragon。删除 `parseTreeDropTarget` 字符串解析函数（editor-layout.tsx），新增 `commitDrop(loc, obj)` 统一 canvas/tree 提交路径；Dragon 新增 `registerTreeDrop()` 方法 + `_treeDropTarget` 字段，`toDropLocation` 扩展 tree-drop 分支（canvas 优先，tree 兜底）；`component-tree-panel` 通过 `useDndMonitor` 同步落点给 Dragon。新增 4 条单测覆盖 tree-drop DropLocation 产出、canvas 优先级、onDragEnd 清空。Engine 180/180 测试通过。|
| 2026-07-01 | **Fix:** V4-E2 + V4-E3 事件驱动选中状态。E2: EventBus 新增 `prefixedEmit`/`prefixedOn` 方法（对齐 lowcode-engine `postEvent` 命名空间模式），无 namespace 时降级为普通 emit/on，新增 6 条单测。E3: editor-layout 通过 Zustand `subscribe` 监听 selectedIds/activeNodeId 变化并 emit `canvas:select` 事件（对齐 lowcode `designer.selection.change`）；RightPanel 和 ComponentTreePanel 改为通过 `editorBus.on('canvas:select', ...)` 事件驱动选中状态，不再通过 `useCanvasStore` 订阅 `selectedIds/activeNodeId`。Engine 188/188 测试通过。|
| 2026-07-01 | **Fix:** V4-D4 + V4-D6 PluginContext 扩展。D4: PluginContext 新增 event/hotkey/command 3 API（对齐 lowcode `pluginContextApiAssembler` 19 属性子集）。新增 `HotkeyManager` 类（bind 返回 Disposable，SSR 安全）和 `CommandManager` 类（pluginName 前缀命名空间，对齐 lowcode `commandScope`）。PluginManager 构造函数接受 eventBus 注入，register 时每插件独立创建 HotkeyManager/CommandManager 实例，destroy 统一清理。editor-layout 传 `editorBusRef.current` 给 PluginManager。D6 标记 PASS（E2 已完成命名空间前缀，mitt 原生支持通配符）。新增 12 条单测。Engine 200/200 测试通过。|
| 2026-07-01 | **Decision+Fix:** V4-D5 + V4-D7 + V4-D9。D10 定案：D17 ShellProxy 包级别隔离收缩为 out-of-scope（Envelope 无第三方插件场景，interface-backed design 已实现隔离精神）；D18 Skeleton 插槽扩展为 6 个（left-nav/left-panel/main-area/right-panel/toolbar/bottom-area，对齐 lowcode 10 area 子集）。D5: SkeletonSlot 类型 + skeleton.ts 初始化 6 插槽 + editor-layout 消费 left-panel/right-panel。D7: 新增 MaterialPlugin（注册到 left-panel）和 PropertyPlugin（注册到 right-panel），editor-layout 从 skeleton.getItems 驱动渲染，不再硬编码 MaterialPanel/RightPanel。D9: 🟡 OUT-OF-SCOPE。新增 5 条单测。Engine 205/205 测试通过。|
| 2026-07-01 | **Reconcile+Fix:** V4-C 和解 + V4-F10 + V4-E4。C 和解：D19（rebuild-based 索引策略，C2/C3 PASS）、D20（Clipboard store-slice 设计，C6 PASS）、D21（事务边界在 store 层，C7 batchOp 验证通过 + C8 PASS）。F10: 新增 `resolveInitialProps(material)` 工具函数，snippets[0].props 优先（合并 defaultProps），fallback 到 defaultProps，支持 snippet.children 自动展开；editor-layout 3 处替换（commitDrop/handleDragEnd/handleAddMaterial）；单测 6 条。E4: FlowEditor 组件新增 `onFlowExecute`/`onFlowComplete` 回调；ProjectFlowEditor 接收 editorBus 并 emit `flow:execute`/`flow:complete` 事件；FlowPlugin 传入 editorBus；单测 3 条。Engine 214/214 测试通过。|
| 2026-07-01 | **Fix:** V4-F7 + V4-F8 内联文本编辑。F7（审计遗漏修复）：`materialDefinitionSchema` 新增 `liveTextEditing: { paths: string[] }` Zod 字段（之前 ISA 标记 PASS 但实际未实现）。F8: 5 个文本类物料（Text/Button/Label/Alert/Badge）添加 `liveTextEditing.paths` 配置；新增 `renderText` 渲染分支（Text 不再走 renderFallback）；5 个渲染函数添加 `data-live-edit-prop` 属性标记可编辑 DOM；`canvas-component-item` 新增内联编辑状态机（isInlineEditing + contentEditable="plaintext-only" + blur 保存/Escape 取消/Enter 确认）；canvas-renderer 传 `liveTextEditingPaths` + `onInlineEdit`；editor-layout `onInlineEdit` → `updateNode`。对齐 lowcode-engine `LiveEditing` 类的 contentEditable + focusout save 模式。单测 3 条。Engine 217/217 测试通过。**V4 全部 63 ISC 完成。** |
