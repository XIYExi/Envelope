# ISA: Envelope V4 — Architecture Refinement (Lowcode-Engine Patterns)

> **Tier:** E4 Deep | **Status:** `phase: OBSERVE` | **Created:** 2026-06-29
> **Reference:** `lowcode-engine-main/packages/designer/src/` 为直接代码参考源

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
当前 dnd-kit 的 `useDraggable`/`useDroppable` 各自为战，缺少：
- **位置计算引擎**：精确计算 before/after/append 三种插入位置
- **多传感器架构**：拖拽状态、检测状态、滚动状态各自独立管理
- **OffsetObserver**：容器滚动/缩放时定位偏差无补偿
- **Scroller**：拖拽到画布边缘自动滚动（目前已实现但作为 editor-layout 内联逻辑）

### 3. 无插件系统
编辑器外壳硬编码在 `apps/platform/components/editor/` 下：
- 大纲树、属性面板、物料面板、工具栏都是写死的 React 组件
- 新增功能需要修改核心布局组件
- 无法实现第三方扩展
- lowcode-engine 的每个功能都是插件（plugin-designer, plugin-outline-pane...），通过 `PluginManager` 生命周期管理

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

DnD 架构：

```
Dragon (统一拖拽状态)
  ├── Sensors[ ] (传感器列表, 当前只有一个 CanvasSensor)
  ├── Location (位置计算, before/after/append)
  ├── Detecting (悬停检测, 独立于选中)
  ├── Scroller (边缘自动滚动, 从 editor-layout 抽出)
  └── OffsetObserver (iframe/容器偏移补偿)
```

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
| ISC-V4-B2 | Location 引擎精确计算插入位置（before/after/append） |
| ISC-V4-B3 | Detecting 独立管理悬停检测，与 Selection 分离 |
| ISC-V4-B4 | Scroller 从 editor-layout 抽出为独立模块，支持配置阈值和速度 |
| ISC-V4-B5 | OffsetObserver 跟踪画布容器偏移（scroll/zoom/transform） |
| ISC-V4-B6 | 拖拽过程中 BEM Tools 的 InsertionView 消费 Location 结果 |
| ISC-V4-B7 | 多 Sensor 架构允许未来支持多个模拟器（如 iframe 内拖拽） |
| ISC-V4-B8 | 拖拽结束时 Dragon 统一触发放置回调，避免多处散落逻辑 |
| ISC-V4-B9 | 现有 dnd-kit 的 DndContext/Sensor/useDraggable 代码保持不变，Dragon 作为其上层封装 |
| ISC-V4-B10 | 拖拽自动滚动行为可配置（开启/关闭/速度） |

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
| ISC-V4-D5 | SkeletonAPI 允许插件注册左侧/右侧/顶部/底部面板 |
| ISC-V4-D6 | EventBus 提供 `on/emit/off/once` 接口，支持通配符和命名空间 |
| ISC-V4-D7 | 现有 Panel 组件（Pages/Models/Routing/Flows/API）逐一封装为插件 |
| ISC-V4-D8 | 外壳组件可在无插件时降级渲染（不影响 V3 使用） |
| ISC-V4-D9 | ShellProxy 模式：内部类不直接暴露，通过接口访问 |

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
| ISC-V4-F7 | MaterialDefinition 增加 `liveTextEditing?: { paths: string[] }` |
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

---

## Verification

*To be populated during Phase 6.*

---

## Changelog

| Date | Entry |
|------|-------|
| 2026-06-29 | **Created:** V4 Architecture ISA。基于对 lowcode-engine `designer/src/` 的深度阅读分析，提取 6 大架构升级方向（BEM Tools/Dragon/Document Model/Plugin System/EventBus/Material Pipeline），共 6 组 ISC ~60 条。参考代码来源标注完成。 |
| 2026-06-29 | **Conjectured:** V4 的核心价值不在于新功能，而在于**架构可扩展性**——让 envelope 从"功能完整的低代码编辑器"进化为"可扩展的低代码编辑器框架"。 |
| 2026-06-29 | **Conjectured:** BEM Tools + Dragon 是最高优先级，因为它们覆盖了画布交互 80% 的技术债。插件系统可延后，但设计上需提前考虑到。 |
