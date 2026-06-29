/**
 * 画布核心模块入口
 *
 * 统一导出画布系统的所有公共 API：
 * - 类型定义（CanvasComponent, CanvasState, CanvasActions, DragItem 等）
 * - 状态管理（useCanvasStore, createCanvasComponent）
 * - 拖拽工具函数（网格对齐、坐标转换、拖拽项工厂）
 * - 渲染器（CanvasRenderer）
 *
 * @author xiye
 * @date 2026-06-14
 */

export * from "./types";
export * from "./store";
export * from "./dnd";
export * from "./renderer";
export * from "./ctrl-context";
export * from "./minimap";
export * from "./ruler";
export { BemTools, bemToolsManager } from "./bem-tools/index";
export type { BemToolsProps, BemToolComponent } from "./bem-tools/index";
export { CanvasScroller, Detecting, Dragon, Location } from "./dragon/index";
export type { ScrollConfig, ScrollViewport, DetectingListener } from "./dragon/index";
export { buildNodeIndex } from "../shared/canvas-utils";
