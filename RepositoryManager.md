# RepositoryManager — Envelope

## Purpose
Full-stack lowcode project generation platform. Visually design complete Next.js applications (shadcn/ui + Tailwind + Supabase), export clean source code or deploy directly. Electron desktop app.

## Reference Project
- **lowcode-engine** (Alibaba): `lowcode-engine-main/` — 成熟的企业级低代码引擎源码。本项目的核心画布交互、拖拽定位、BEM Tools 覆盖层等架构直接参考其设计模式，在 Zustand + dnd-kit + React 技术栈上适配实现。

## Current State
- **V2** (git default): abandoned prototype. UmiJS + dva + antd/semantic-ui + react-dnd H5 page editor. ~35%.
- **V3** (current): complete rewrite with Zustand + dnd-kit + CSS Grid + React Flow + shadcn/ui. Canvas overhaul (202/202 ISC ✅). V3 is functionally complete but lacks plugin architecture and BEM Tools overlay separation from lowcode-engine.
- **V4** (target): Architecture refinement incorporating lowcode-engine patterns. See `.opencode/memory/work/v4-architecture/ISA.md`.

## Architecture (V4 Target)
```
envelope/
├── apps/
│   └── platform/          # Next.js App Router — the editor IDE
├── packages/
│   ├── engine/            # Core lowcode engine
│   │   ├── canvas/        #   Canvas rendering + BEM Tools overlay layer
│   │   ├── bem-tools/     #   Selection/hover/resize/insertion overlays (NEW, adapted from lowcode-engine)
│   │   ├── dragon/        #   Drag & drop location engine (NEW, adapted from lowcode-engine Dragon+Sensors)
│   │   ├── document/      #   Node tree model (flat Map + tree, adapted from lowcode-engine DocumentModel)
│   │   ├── schemas/       #   Zod schema definitions
│   │   ├── property-editor/ # Reflective property editor
│   │   ├── slots/         #   Slot composition engine
│   │   └── expression/    #   Expression evaluator
│   ├── materials/         # shadcn/ui component schemas with metadata transducers
│   ├── flow/              # Business logic flow engine (Thing Model + React Flow)
│   ├── generator/         # JSON/YAML → Next.js source code generator
│   ├── runtime/           # Platform runtime mode (dynamic config rendering)
│   ├── shell/             # Shell proxy pattern (NEW, adapted from lowcode-engine Shell)
│   └── editor-core/       # Plugin system + event bus + hotkey (NEW, adapted from lowcode-engine)
├── plugins/               # Editor plugins (NEW, OUTLINE_PANE, BEM_TOOLS, COMMAND, etc.)
└── templates/
    └── nextjs-base/       # Base Next.js template for generated projects
```

## Key Dependencies
- **Editor:** Next.js 14+ (App Router), shadcn/ui, Tailwind CSS, Zustand, TanStack Query, React Flow, DnD Kit, Monaco Editor
- **Backend:** Supabase (Auth, PostgreSQL, Storage, Realtime)
- **Build:** pnpm workspace + Turborepo + TypeScript strict + Vitest

## Execution Paths
- `pnpm dev` — start editor dev server
- `pnpm build` — build all packages
- `pnpm test` — run all tests; `pnpm test -- --coverage` — with coverage

## V4 Key Architecture Changes (Lowcode-Engine Inspired)

### 1. BEM Tools 覆盖层系统
借鉴 lowcode-engine 的 `BemTools` 架构，将选中框、悬停高亮、缩放手柄、插入指示器渲染在**画布上方的独立覆盖层**：
- `BorderSelecting` — 选中实线框 + 顶部操作工具栏（复制/移动/删除/锁定）
- `BorderDetecting` — 悬停虚线高亮
- `BorderContainer` — 容器边界指示
- `BorderResizing` — 八向缩放手柄（DragResizeEngine 事件引擎）
- `InsertionView` — 拖拽插入指示线/占位框
- `BemToolsManager` — 插件式注册自定义 BEM Tools

### 2. Dragon + Location 拖拽定位引擎
借鉴 `Dragon` + `Sensor` + `Location` 架构：
- **Dragon**: 统一拖拽状态管理，支持多模拟器
- **Sensors**: 定位传感器计算精确落点（before/after/append）
- **Location**: 位置计算引擎，返回 `{ target, type: 'before'|'after'|'append', index, rect }`
- **Detecting**: 悬停检测分离，与选中系统解耦
- **Scroller**: 拖拽到画布边缘自动滚动
- **OffsetObserver**: iframe 偏移量跟踪

### 3. Document Model 节点模型
借鉴 flat `Map<id, Node>` + tree 双结构：
- **NodeManager**: O(1) 节点查找 + 树操作统一入口
- **Selection**: 主/次选中分离 + 框选队列
- **History**: immer patches 增量 diff（已有）
- **Clipboard**: 序列化/反序列化子系统

### 4. Plugin System 插件架构
借鉴 `editor-core` + `IPublicModelPluginContext`：
- **PluginManager**: 插件注册/初始化/销毁生命周期
- **PluginContext**: 作用域上下文（skeleton/event/logger 按插件隔离）
- **Shell Proxy**: 内部类通过 IPublicModel* 接口暴露
- **Event Bus**: 编辑器中各模块通过事件通信解耦

### 5. Component Meta 管道
借鉴 `ComponentMeta.transformMetadata` transducers：
- **Metadata Transducers**: 注册式转换管道链
- **Nesting Rules**: `parentWhitelist`/`childWhitelist` 嵌套验证
- **Available Actions**: 基于 `disableBehaviors` 动态过滤操作
- **Live Text Editing**: 画布内联文本编辑配置
- **Snippets**: 物料拖拽预设

## Change History
| Date | Change |
|------|--------|
| 2026-06-29 | V4 Architecture defined: BEM Tools, Dragon, Document Model, Plugin System. ISA created at `.opencode/memory/work/v4-architecture/ISA.md`. Reference project `lowcode-engine-main/` for direct code reference. |
| 2026-06-28 | Canvas Overhaul completed (202/202 ISC). All 18 domains verified. `pnpm build` 5/5. |
| 2026-06-14 | F09-F17 completed: Material system, Canvas, Property Editor, Flow Engine, Code Generator, etc. |
| ~2023 (V2) | Original Envelope V2 prototype — abandoned mid-prototype. |
