# ISA: Envelope V5 — Canvas Fidelity (Real Component Rendering)

> **Tier:** E3 Advanced | **Status:** `phase: EXECUTE` | **Created:** 2026-07-01
> **Reference:** `lowcode-engine-main/packages/react-simulator-renderer/` + `lowcode-engine-main/packages/designer/src/builtin-simulator/`
> **Depends on:** V4 Architecture (BEM Tools, EventBus, MaterialRegistry, previewRender hook)

---

## Problem

Envelope 画布使用 `simulated-content.tsx` 中的 **49 个 case 的 switch-case**（分布在 3 个文件约 700+ 行）手工模拟组件外观。这导致：

1. **所见非所得**：模拟 Button 的 `px-3 py-1 text-xs` 与真实 shadcn Button 样式不一致
2. **维护成本高**：每次 shadcn 升级都要同步更新模拟代码
3. **新组件接入慢**：新增物料需要手写模拟渲染函数
4. **嵌套样式不一致**：根级和子级渲染用两套不同的模拟代码

lowcode-engine 通过 `BuiltinSimulator`（iframe + `LowCodeRenderer` + `React.createElement(realComp)`) 渲染真实组件。Envelope 不用 iframe（Electron 桌面应用，共享 Tailwind 配置，第一方可信组件），但通过 `previewRender` 注入机制实现相同目标：**画布渲染真实 shadcn 组件，不是模拟占位**。

---

## Vision

画布上看到的组件与最终导出的 Next.js 应用中的组件**视觉一致**。用户拖入一个 Button，画布上渲染的是真实的 `@/components/ui/button` Button 组件，不是手写的 `<button className="px-3 py-1 text-xs">` 模拟。

```
UnifiedSimulatedContent (engine, 不变)
  ├── 检查 registry.get(type)?.previewRender  ← V5 注入真实组件
  │    └── 有 previewRender → 渲染真实 shadcn 组件
  └── 无 previewRender → fallback 到 switch-case 模拟渲染（保留）
```

---

## Out of Scope

- **iframe 沙箱**：Envelope 不使用 iframe，通过 pointer-events gate 隔离交互
- **Runtime Mode**：动态配置渲染预览（V3 deferred ISC-102~108，不属于本 ISA）
- **AI 生成**：自然语言生成页面（V3 ISC-122~130，不属于本 ISA）
- **删除 SimulatedContent**：保留作为 fallback，未注册 previewRender 的物料仍走 switch-case
- **子组件（variant="child"）真实渲染**：previewRender 仅对 root 组件生效，子组件仍用模拟渲染

---

## Principles

1. **previewRender 注入，不修改 engine** — 利用 V4 已有的 previewRender hook，在 platform 层注入真实组件
2. **渐进式迁移** — 分批迁移组件，每批完成后验证，未迁移的走 fallback
3. **真实组件 + 静态预览** — 表单/展示/布局组件渲染真实 shadcn；覆盖层组件渲染静态预览态
4. **pointer-events gate 不变** — 真实组件在 `pointer-events:none` 下不响应交互，与模拟组件行为一致
5. **designMode 标记** — 渲染时注入 `data-design-mode` 属性，组件可据此禁用交互

---

## Constraints

| # | 约束 | 理由 |
|---|------|------|
| C1 | engine 包不依赖任何 UI 库 | engine 保持 UI-agnostic，previewRender 在 platform 注入 |
| C2 | 保留 SimulatedContent switch-case | fallback 机制，未迁移组件仍可渲染 |
| C3 | previewRender 函数签名：`(props, children?) => ReactNode` | 对齐 lowcode `customCreateElement(Component, props, children)` |
| C4 | `pnpm build` 持续通过 | 每里程碑验证 |
| C5 | 不破坏 V4 的 63 ISC | V5 新增功能，不影响已有架构 |
| C6 | 不破坏现有 217 测试 | Engine 测试全量通过 |

---

## Goal

在 V4 架构基础上，通过 `previewRender` 注入机制，将画布从模拟占位渲染升级为真实 shadcn 组件渲染，实现所见即所得的画布保真度。

---

## Criteria

> 编号规则: `ISC-V5-{组}-{序号}`

### V5-A: previewRender 注册基础设施

| ID | Criterion |
|----|-----------|
| ISC-V5-A1 | `registerPreviewRenderers(registry)` 函数在 platform 初始化时注入真实组件渲染 |
| ISC-V5-A2 | `PreviewRenderFn` 类型定义：`(props: Record<string, unknown>, children?: ReactNode) => ReactNode` |
| ISC-V5-A3 | 未注册 previewRender 的物料 fallback 到 SimulatedContent switch-case |
| ISC-V5-A4 | `filterDesignProps` 工具函数过滤设计态专用 prop（label/text/titleText 等） |

### V5-B: 表单组件真实渲染

| ID | Criterion |
|----|-----------|
| ISC-V5-B1 | Button 渲染真实 shadcn Button，label 作为 children |
| ISC-V5-B2 | Input 渲染真实 shadcn Input，placeholder 透传 |
| ISC-V5-B3 | Label 渲染真实 shadcn Label，label 作为 children |
| ISC-V5-B4 | Textarea 渲染真实 shadcn Textarea |
| ISC-V5-B5 | Checkbox 渲染真实 shadcn Checkbox + Label |
| ISC-V5-B6 | Switch 渲染真实 shadcn Switch |
| ISC-V5-B7 | Select 渲染真实 shadcn Select（静态预览态） |
| ISC-V5-B8 | Slider 渲染真实 shadcn Slider |
| ISC-V5-B9 | Toggle 渲染真实 shadcn Toggle |
| ISC-V5-B10 | ToggleGroup 渲染真实 shadcn ToggleGroup |

### V5-C: 布局容器真实渲染

| ID | Criterion |
|----|-----------|
| ISC-V5-C1 | Card 渲染真实 shadcn Card，children 透传 |
| ISC-V5-C2 | CardContent 渲染真实 shadcn CardContent |
| ISC-V5-C3 | Box 渲染为 div + className（无对应 shadcn，用原生 div） |
| ISC-V5-C4 | Flex 渲染为 div + flex className |
| ISC-V5-C5 | Container 渲染为 div + container className |
| ISC-V5-C6 | Grid 渲染为 div + grid className |
| ISC-V5-C7 | Separator 渲染真实 shadcn Separator |
| ISC-V5-C8 | ScrollArea 渲染真实 shadcn ScrollArea |
| ISC-V5-C9 | AspectRatio 渲染真实 shadcn AspectRatio |
| ISC-V5-C10 | Form 渲染为 form 元素 + children 透传 |

### V5-D: 展示组件真实渲染

| ID | Criterion |
|----|-----------|
| ISC-V5-D1 | Avatar 渲染真实 shadcn Avatar + AvatarFallback |
| ISC-V5-D2 | Badge 渲染真实 shadcn Badge，text 作为 children |
| ISC-V5-D3 | Alert 渲染真实 shadcn Alert + AlertTitle + AlertDescription |
| ISC-V5-D4 | Progress 渲染真实 shadcn Progress |
| ISC-V5-D5 | Skeleton 渲染真实 shadcn Skeleton |
| ISC-V5-D6 | Text 渲染为 span + text prop 作为 children + data-live-edit-prop |
| ISC-V5-D7 | Breadcrumb 渲染真实 shadcn Breadcrumb（静态预览态） |
| ISC-V5-D8 | Pagination 渲染真实 shadcn Pagination（静态预览态） |

### V5-E: 复合组件真实渲染

| ID | Criterion |
|----|-----------|
| ISC-V5-E1 | Tabs 渲染真实 shadcn Tabs（静态预览态） |
| ISC-V5-E2 | TabsContent 渲染真实 shadcn TabsContent |
| ISC-V5-E3 | Accordion 渲染真实 shadcn Accordion（静态预览态） |
| ISC-V5-E4 | Table 渲染真实 shadcn Table（静态预览态） |
| ISC-V5-E5 | ResizablePanelGroup 渲染真实 shadcn ResizablePanelGroup |

### V5-F: 覆盖层组件静态预览

| ID | Criterion |
|----|-----------|
| ISC-V5-F1 | Dialog 渲染为静态预览（不打开 portal） |
| ISC-V5-F2 | AlertDialog 渲染为静态预览 |
| ISC-V5-F3 | Sheet 渲染为静态预览 |
| ISC-V5-F4 | Popover 渲染为静态预览 |
| ISC-V5-F5 | Tooltip 渲染为静态预览 |
| ISC-V5-F6 | HoverCard 渲染为静态预览 |
| ISC-V5-F7 | Drawer 渲染为静态预览 |
| ISC-V5-F8 | DropdownMenu/ContextMenu 渲染为静态预览 |

### V5-G: 迁移验证

| ID | Criterion |
|----|-----------|
| ISC-V5-G1 | `pnpm build` 通过 |
| ISC-V5-G2 | Engine 217+ 测试通过 |
| ISC-V5-G3 | 未注册 previewRender 的物料正常 fallback 到 SimulatedContent |
| ISC-V5-G4 | data-live-edit-prop 属性在真实渲染中保留（V4-F8 内联编辑兼容） |

---

## Test Strategy

| ISC Group | Method | Tools |
|-----------|--------|-------|
| V5-A | Unit (register + fallback) | Vitest |
| V5-B~F | Visual diff (画布 vs 真实组件) | Manual + Playwright |
| V5-G | Integration (build + test) | pnpm build + pnpm test |

---

## Verification

### M1+M2+M3 — 全组完成（2026-07-01）

| ISC | Status | Evidence |
|-----|--------|----------|
| ISC-V5-A1 | ✅ PASS | `registerPreviewRenderers(registry)` 在 editor-layout registry 创建后调用 |
| ISC-V5-A2 | ✅ PASS | `PreviewRenderFn = (props, children?) => ReactNode` 类型定义于 types.ts |
| ISC-V5-A3 | ✅ PASS | 未注册物料 fallback 到 SimulatedContent switch-case（engine 无修改） |
| ISC-V5-A4 | ✅ PASS | `filterDesignProps` 剥离 label/text/titleText 等设计态专用 prop |
| ISC-V5-B1~B10 | ✅ PASS | 10 个表单组件渲染函数（form.tsx） |
| ISC-V5-C1~C10 | ✅ PASS | 11 个布局容器渲染函数（layout.tsx，Box/Flex/Container/Grid/Form 用原生 div） |
| ISC-V5-D1~D8 | ✅ PASS | 8 个展示组件渲染函数（display.tsx） |
| ISC-V5-E1~E5 | ✅ PASS | 5 个复合组件渲染函数（composite.tsx） |
| ISC-V5-F1~F8 | ✅ PASS | 13 个覆盖层组件渲染函数（overlay.tsx，含 Dialog/AlertDialog/Sheet Content 变体） |
| ISC-V5-G1 | ✅ PASS | `pnpm build` 通过 |
| ISC-V5-G2 | ✅ PASS | Engine 217/217 测试通过 |
| ISC-V5-G3 | ✅ PASS | 未注册物料正常 fallback（SimulatedContent switch-case 保留） |
| ISC-V5-G4 | ✅ PASS | data-live-edit-prop 在真实渲染中保留（Button/Label/Badge/Alert/Text） |

---

## Changelog

| Date | Entry |
|------|-------|
| 2026-07-01 | **Created:** V5 Canvas Fidelity ISA。基于 lowcode-engine `BuiltinSimulator` + `SimulatorRenderer` 架构分析，制定通过 previewRender 注入真实 shadcn 组件的方案。7 组 50 ISC，分 3 里程碑执行。 |
| 2026-07-01 | **M1 Complete:** V5-A + V5-B + V5-D。previewRender 基础设施（registerPreviewRenderers + filterDesignProps + PreviewRenderFn 类型）；18 个表单+展示组件真实渲染；修复 EditorEventMap index signature（TS build 通过）；setMaterialRegistry 注入 engine 全局注册表。 |
| 2026-07-01 | **M2+M3 Complete:** V5-C + V5-E + V5-F + V5-G。布局容器（11 组件，Box/Flex/Container/Grid/Form 用原生 div 无 shadcn 对应）；复合组件（5 组件）；覆盖层组件（16 组件，Dialog/AlertDialog/Sheet Content 变体 + 静态预览态，对齐 lowcode designMode="design"）。50/50 ISC 全部完成。Engine build + 217 tests pass。 |

---

## Features

| # | Feature | Description | ISC | Depends On |
|---|---------|-------------|-----|------------|
| F-V5-1 | previewRender 基础设施 | registerPreviewRenderers + PreviewRenderFn + filterDesignProps + fallback | V5-A1~A4 | — |
| F-V5-2 | 表单组件 | Button/Input/Label/Textarea/Checkbox/Switch/Select/Slider/Toggle/ToggleGroup | V5-B1~B10 | F-V5-1 |
| F-V5-3 | 布局容器 | Card/Card*/Box/Flex/Container/Grid/Separator/ScrollArea/AspectRatio/Form | V5-C1~C10 | F-V5-1 |
| F-V5-4 | 展示组件 | Avatar/Badge/Alert/Progress/Skeleton/Text/Breadcrumb/Pagination | V5-D1~D8 | F-V5-1 |
| F-V5-5 | 复合组件 | Tabs/TabsContent/Accordion/Table/ResizablePanelGroup | V5-E1~E5 | F-V5-1 |
| F-V5-6 | 覆盖层静态预览 | Dialog/AlertDialog/Sheet/Popover/Tooltip/HoverCard/Drawer/Menu | V5-F1~F8 | F-V5-1 |
| F-V5-7 | 迁移验证 | build + test + fallback + live-edit 兼容 | V5-G1~G4 | F-V5-2~6 |

---

## Decisions

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-01 | **D01: 不用 iframe，通过 previewRender 注入真实组件** | Envelope 是 Electron 桌面应用，共享 Tailwind 配置，第一方可信组件。iframe 增加坐标映射复杂度和调试难度。lowcode-engine 用 iframe 是因为要支持第三方不可信组件。对齐 lowcode 的"真实组件渲染"目标，但用更简单的注入机制实现。@reference `lowcode-engine-main/packages/designer/src/builtin-simulator/host-view.tsx` iframe architecture |
| 2026-07-01 | **D02: 保留 SimulatedContent 作为 fallback** | 渐进式迁移，未注册 previewRender 的物料仍走 switch-case。子组件（variant="child"）也继续用模拟渲染。 |
| 2026-07-01 | **D03: 覆盖层组件用静态预览态** | Dialog/Popover/Tooltip 等在 pointer-events:none 下无法打开 portal。渲染为静态外观预览，不响应交互。对齐 lowcode `designMode: "design"` 模式。 |
| 2026-07-01 | **D04: previewRender 在 platform 层注入，engine 不修改** | engine 包保持 UI-agnostic。platform 在 `createDefaultRegistry()` 后调用 `registerPreviewRenderers(registry)` 注入。利用 V4 已有的 previewRender hook（`UnifiedSimulatedContent` lines 90-104）。 |

---

## Reference Map (Lowcode-Engine)

| Envelope Feature | Reference File | Adaptation Notes |
|-----------------|---------------|-----------------|
| previewRender hook | `react-simulator-renderer/src/renderer-view.tsx:179-267` customCreateElement | Envelope 用 previewRender 函数替代 customCreateElement |
| 真实组件渲染 | `react-simulator-renderer/src/renderer.ts:362-372` buildComponents | Envelope 从 registry.get(name).previewRender 获取渲染函数 |
| designMode | `react-simulator-renderer/src/renderer-view.tsx:255` getDeviceView | Envelope 用 data-design-mode 属性标记 |
| 静态预览态 | `react-simulator-renderer/src/renderer-view.tsx:179` designMode="design" | 覆盖层组件不打开 portal，渲染静态外观 |
| children 透传 | `react-simulator-renderer/src/renderer-view.tsx:243` leaf.isContainer | Envelope 容器组件的 previewRender 接收 children 参数 |
| fallback 机制 | 无对应 | Envelope 独有：未注册 previewRender 的物料走 SimulatedContent switch-case |

---

## Changelog

| Date | Entry |
|------|-------|
| 2026-07-01 | **Created:** V5 Canvas Fidelity ISA。基于 lowcode-engine `BuiltinSimulator` + `SimulatorRenderer` 架构分析，制定通过 previewRender 注入真实 shadcn 组件的方案。7 组 50 ISC，分 3 里程碑执行。 |
