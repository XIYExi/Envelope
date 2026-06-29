/**
 * Dragon 拖拽引擎 — 模块入口
 *
 * 为 Envelope 画布提供拖拽相关基础设施的独立模块。
 * 参考 lowcode-engine `designer/src/designer/` 架构。
 *
 * @author xiye
 * @date 2026-06-29
 */

export { CanvasScroller } from "./scroller";
export type { ScrollConfig, ScrollViewport } from "./scroller";
export { Detecting } from "./detecting";
export type { DetectingListener } from "./detecting";
export { Location } from "./location";
export type { LocationConfig } from "./location";
export { Dragon } from "./dragon";
export type { DragContext, DragMoveResult } from "./dragon";

