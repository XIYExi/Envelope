/**
 * 画布渲染器入口（re-export）
 *
 * 所有内部实现已拆分到独立子模块，本文件仅保留公共 API 的聚合导出。
 *
 * 拆分结构：
 * - renderer-utils.ts        工具函数与常量
 * - simulated-content.tsx    模拟内容协调器（UnifiedSimulatedContent + ChildrenSlot）
 * - simulated-components-form.tsx   表单/展示类组件模拟
 * - simulated-components-layout.tsx 容器/布局类组件模拟
 * - canvas-component-item.tsx 单组件渲染项（useDraggable/useDroppable）
 * - bounding-box-overlay.tsx  多选包围盒
 * - breadcrumb-bar.tsx        面包屑导航
 * - smart-guides.tsx          智能对齐辅助线
 * - marquee-overlay.tsx       框选覆盖层
 * - canvas-renderer.tsx       主渲染器组件
 *
 * @author xiye
 * @date 2026-06-25
 */

export { CanvasRenderer, type CanvasRendererProps } from "./canvas-renderer";
export { CanvasComponentItem } from "./canvas-component-item";
export { BoundingBoxOverlay } from "./bounding-box-overlay";
export { BreadcrumbBar } from "./breadcrumb-bar";
export { SmartGuideOverlay, computeAlignGuides, type AlignGuide } from "./smart-guides";
export { MarqueeOverlay } from "./marquee-overlay";
export { UnifiedSimulatedContent, ChildrenSlot, SelectChildContext } from "./simulated-content";
export {
  cn, pstr, pnum, pbool, parr, getPreviewTailwindClasses,
  CELL_HEIGHT, CELL_WIDTH, RESIZE_HANDLE_SIZE, RULER_SIZE,
  COMPACT_STYLES, resizeHandleStyles, allResizeDirections,
} from "./renderer-utils";
