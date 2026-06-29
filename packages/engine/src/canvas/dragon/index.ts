/**
 * Dragon 拖拽引擎 — 模块入口
 *
 * 为 Envelope 画布提供拖拽相关基础设施的独立模块。
 * 参考 lowcode-engine `designer/src/designer/` 架构。
 *
 * 当前模块包含：
 * - CanvasScroller：拖拽到画布边缘时的自动滚动
 * - Detecting：悬停检测管理器（与选中系统分离）
 *
 * 后续阶段（Phase 1.3）将在此目录下添加：
 * - Dragon：统一拖拽状态管理，封装 dnd-kit 回调
 * - Location：插入位置计算引擎（before/after/append）
 * - OffsetObserver：画布位置偏移观测器
 *
 * @author xiye
 * @date 2026-06-29
 */

export { CanvasScroller } from "./scroller";
export type { ScrollConfig, ScrollViewport } from "./scroller";
export { Detecting } from "./detecting";
export type { DetectingListener } from "./detecting";

