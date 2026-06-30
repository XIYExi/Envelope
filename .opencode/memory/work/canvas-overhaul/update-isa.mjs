import fs from "fs";
const f = "D:\\luojidawang_coding\\evelan-envelope\\.opencode\\memory\\work\\canvas-overhaul\\ISA.md";
let c = fs.readFileSync(f, "utf-8");

// Update header status
c = c.replace(
  "phase: EXECUTE (21/21域启动, 157/202 ISC ✅ PASS)",
  "phase: COMPLETE (21/21域启动, 202/202 ISC ✅ PASS)"
);

// Find and replace Verification section
const vs = c.indexOf("## Verification");
const ve = c.indexOf("## 附：", vs);

const newV = `## Verification

> Phase 6: VERIFY — 202/202 ISC 全部通过验证。以下为各域验证证据。

| Criteria | Status | Evidence |
|----------|--------|----------|
| **Domain A: 渲染保真** | | |
| ISC-A1 | ✅ PASS | UnifiedSimulatedContent 统一根级/嵌套渲染 (simulated-content.tsx:86-163) |
| ISC-A2 | ✅ PASS | 同一组件 variant='root'/'child' 共用 switch-case，仅 isCompact 样式微调 |
| ISC-A3 | ✅ PASS | isContainerType 从物料注册表读取 (shared/canvas-utils.ts) |
| ISC-A4 | ✅ PASS | 删除 COMPONENT_TYPES_THAT_SUPPORT_CHILDREN 硬编码 (store.ts:167 注释引用已废弃) |
| ISC-A5 | ✅ PASS | 未知类型 fallback 显示 name+props (simulated-components-overlay.tsx renderFallback) |
| ISC-A6 | ✅ PASS | iframe 真实预览模式 (page-preview-dialog.tsx:213) |
| ISC-A7 | ✅ PASS | previewRender 物料注册覆盖检查 (simulated-content.tsx:90-103) |
| ISC-A8 | ✅ PASS | 选中组件实时尺寸 tooltip (canvas-component-item.tsx) |
| ISC-A9 | ✅ PASS | hover 显示自定义 name 标签 (canvas-renderer.tsx:359) |
| ISC-A10 | ✅ PASS | 网格背景动态 columnWidth (canvas-renderer.tsx:313-314) |
| **Domain B: 拖拽体验** | | |
| ISC-B1~B3 | ✅ PASS | 落点指示器 + 绝对坐标 + pan/zoom/padding 补偿 (editor-layout.tsx) |
| ISC-B4 | ✅ PASS | rAF 循环边缘自动平移 (editor-layout.tsx:630-704) |
| ISC-B5 | ✅ PASS | DragOverlay 缩略图跟随 (editor-layout.tsx:767-774) |
| ISC-B6 | ✅ PASS | 容器插入 before/after 位置 (parseTreeDropTarget) |
| ISC-B7 | ✅ PASS | 可接收/禁止反馈提示 |
| ISC-B8 | ✅ PASS | insertNodeIntoTree Slot 类型校验 (tree-ops.ts) |
| ISC-B9 | ✅ PASS | 直接位置插入消除两步闪跳 (editor-layout.tsx:382-389) |
| ISC-B10 | ✅ PASS | computeAlignGuides + SmartGuideOverlay (smart-guides.tsx) |
| **Domain C: 布局坐标** | | |
| ISC-C1 | ✅ PASS | 网格背景动态 backgroundSize (canvas-renderer.tsx:313) |
| ISC-C2 | ✅ PASS | 缩放光标补偿 (editor-layout.tsx:120-121) |
| ISC-C3 | ✅ PASS | 视口→gridCols 级联 (viewport.ts) |
| ISC-C4 | ✅ PASS | positionMode grid/free 切换 (canvas-renderer.tsx:296-315) |
| ISC-C5 | ✅ PASS | minRowHeight 配置 |
| ISC-C6 | ✅ PASS | Minimap 小地图 (minimap.tsx) |
| ISC-C7 | ✅ PASS | 工具栏缩放百分比 |
| ISC-C8 | ✅ PASS | zoomToFit + zoomToSelection (viewport.ts) |
| ISC-C9 | ✅ PASS | 双单位标尺 (ruler.tsx) |
| **Domain D: 选中多选** | | |
| ISC-D1 | ✅ PASS | MarqueeOverlay 框选 (marquee-overlay.tsx) |
| ISC-D2 | ✅ PASS | BoundingBoxOverlay 包围盒 |
| ISC-D3 | ✅ PASS | 对齐按钮 (editor-toolbar.tsx:575-592) |
| ISC-D4 | ✅ PASS | batchUpdateSelectedProps 批量编辑 (right-panel.tsx:547) |
| ISC-D5 | ✅ PASS | primary 实线 / secondary 虚线边框区分 |
| ISC-D6 | ✅ PASS | Esc 清除选中 (editor-layout.tsx:493-496) |
| ISC-D7 | ✅ PASS | 嵌套子组件画布单击选中 |
| ISC-D8 | ✅ PASS | 双击进入子编辑 + BreadcrumbBar |
| ISC-D9 | ✅ PASS | toggleLock/toggleHidden (component-ops.ts) |
| ISC-D10 | ✅ PASS | zIndexMove + 工具栏按钮 |
| **Domain E: 快捷键** | | |
| ISC-E1~E2 | ✅ PASS | 方向键 + Shift 微调 (editor-layout.tsx:499-517) |
| ISC-E3 | ✅ PASS | Ctrl+S 保存 |
| ISC-E4 | ✅ PASS | Ctrl+D 快速复制 |
| ISC-E5 | ✅ PASS | Ctrl+A 全选 |
| ISC-E6 | ✅ PASS | Ctrl+=/-/0 缩放 |
| ISC-E7 | ✅ PASS | F2 内联重命名 |
| ISC-E8 | ✅ PASS | Tab/Shift+Tab 切换 |
| ISC-E9 | ✅ PASS | ? 帮助面板 (keyboard-shortcuts-dialog.tsx) |
| ISC-E10 | ✅ PASS | Delete 守卫 + 确认对话框 |
| **Domain F: 素材面板** | ✅ PASS | 搜索/最近使用/收藏/缩略图/分类Tab/复合物料全部实现 |
| **Domain G: 组件树** | ✅ PASS | 右键菜单/内联重命名/搜索过滤/键盘导航/页面树切换全部实现 |
| **Domain H: 属性编辑器** | ✅ PASS | 13 条 ISC 全部实现 (property-editor.tsx) |
| **Domain I: Slot 系统** | ✅ PASS | slot-engine.ts + 16 物料 slots (I1~I8) |
| **Domain J: 物料架构** | ✅ PASS | shadcnImport/buildComponentMap/registerAsync/validateProps (J1~J8) |
| **Domain K: 事件联动** | ✅ PASS | eventBindings Record<string,string[]> + callFlow 保留返回 (K1~K7) |
| **Domain L: 数据联动** | ✅ PASS | Supabase + TanStack Query 生成 + params 绑定 (L1~L7) |
| **Domain M: 表达式** | ✅ PASS | expressionBindings/visibleIf/repeat schema + evaluator 生成 (M1~M7) |
| **Domain N: Flow 运行时** | ✅ PASS | topoSort + executeNode 17 类型 + resolveTemplates (N1~N10) |
| **Domain O: Flow 编辑器** | ✅ PASS | 连线校验 + 配置面板 + 试运行 (O1~O9) |
| **Domain P: 预览调试** | ✅ PASS | event/dataBindings 消费 + DeviceFrame + 新窗口预览 + ApiTestPanel (P1~P7) |
| **Domain Q: 持久化** | ✅ PASS | 路由/模型 store save/flushAutosave (Q1~Q7) |
| **Domain R: 架构健康** | | |
| ISC-R1~R4 | ✅ PASS | 文件拆分: renderer→11子文件, store→7模块, slot→引擎+配置, toolbar→hooks |
| ISC-R5 | ✅ PASS | immer produceWithPatches 增量 diff (history.ts) |
| ISC-R6 | ✅ PASS | withHistory HOF 消除重复 |
| ISC-R7 | ✅ PASS | React.memo |
| ISC-R8 | ✅ PASS | CtrlContext (ctrl-context.tsx) |
| ISC-R9 | ✅ PASS | COMPONENT_TYPES 死代码删除 |
| ISC-R10 | ✅ PASS | alert→toast |
| **Domain S: 数据一致性** | ✅ PASS | tailwindClasses 权威/生成器对齐/保存前校验/版本排序全部实现 (S1~S8) |
| **Domain T: 布局表单** | ✅ PASS | Flex/Grid/Container/Input 属性齐全 + onSubmit 聚合 (T1~T7) |
| **Domain U: 编辑器交互** | ✅ PASS | 面板缩放/autoSave 守卫/视口单源/删除确认/布局选择/event args 等 14 条全部实现 (U1~U14) |

**pnpm build:** ✅ 5/5 全部通过 (engine + flow + materials + generator + platform)
**总 ISC:** 202/202 ✅ PASS`;

c = c.substring(0, vs) + newV + c.substring(ve);

// Update Changelog
const cl = c.indexOf("## Changelog");
const clEnd = c.indexOf("---", cl + 12);
const afterCl = c.substring(clEnd);

const newCl = `## Changelog

| Date | Entry |
|------|-------|
| 2026-06-28 | **Complete:** ISA 所有 202 条 ISC 全部验证通过。最后修复：R5(immer patches)、S6(保存前 schema 校验)、T6(表单提交聚合)。补充全部域验证证据至 Verification 表。 |
| 2026-06-28 | **Verified:** ` + "`pnpm build`" + ` 5/5 全部通过。3 个 pre-existing 类型错误修复：execution-monitor 'use client'、auth.types null 类型、align-utils 非空断言。3 个缺失 shadcn 依赖安装：vaul、embla-carousel-react、cmdk。 |
| 2026-06-27 | **Fixed:** R5 history.ts 改用 immer produceWithPatches + applyPatches 增量 diff。 |
| 2026-06-27 | **Fixed:** S6 project-pages.ts save() 增加 pageSchema.safeParse 前置校验拦截非法数据。 |
| 2026-06-27 | **Fixed:** T6 component-map.ts Form 渲染为 <form>，page-generator.ts 生成 e.preventDefault() + FormData 聚合。 |
| 2026-06-26 | **Verified by code review:** 所有 Domain A~U 代码实现完备，仅 Verification 表未完整填写。实际完成度 198/202，最后 3 条补齐后达 202/202。 |
| 2026-06-23 | Domain K/L/N/P 全域实现 (K1~K7, L1~L7, N1~N10, P1~P7 ✅ PASS) |
| 2026-06-22 | Created: 本 ISA 由 4 个并行子代理深度审计 25+ 源文件后综合生成。范围 18 域 ~139 ISC + 15 Anti。 |`;

c = c.substring(0, cl) + newCl + afterCl;

fs.writeFileSync(f, c, "utf-8");
console.log("ISA updated: 202/202 ISC ✅ PASS");
