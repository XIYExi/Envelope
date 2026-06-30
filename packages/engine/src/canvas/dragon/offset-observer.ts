/**
 * OffsetObserver — 画布视口偏移跟踪器
 *
 * 提供画布容器 scroll/zoom 偏移的查询能力，
 * 将 Zustand domRects 中的原始 DOM 矩形转换为 BEM Tools 可用的
 * 画布内部像素坐标（补偿 panX/panY/zoom 后）。
 *
 * 与 lowcode-engine OffsetObserver 的关键差异：
 *  - MobX @obx/@computed → 改为从 Zustand store 读取
 *  - 每组件实例独立 → 改为全局单例（所有组件在同一 DOM 树）
 *  - host.computeComponentInstanceRect → 改为 domRects store slice
 *  - ResizeObserver 托管 → 已由 CanvasRenderer 统一管理
 *
 * @reference lowcode-engine-main/packages/designer/src/designer/offset-observer.ts
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-30
 */

import type { DomRectEntry } from "../types";

export interface CanvasViewportState {
  panX: number;
  panY: number;
  zoom: number;
}

export interface OffsetResult {
  /** 左边界（补偿后 px） */
  left: number;
  /** 上边界（补偿后 px） */
  top: number;
  /** 宽度（补偿后 px） */
  width: number;
  /** 高度（补偿后 px） */
  height: number;
  /** 右边界（补偿后 px） */
  right: number;
  /** 下边界（补偿后 px） */
  bottom: number;
  /** 用于 BEM tools transform 偏移的水平分量 */
  offsetLeft: number;
  /** 用于 BEM tools transform 偏移的垂直分量 */
  offsetTop: number;
  /** 用于 BEM tools 边框的宽度 */
  offsetWidth: number;
  /** 用于 BEM tools 边框的高度 */
  offsetHeight: number;
}

/**
 * 画布视口偏移观察器
 *
 * 使用示例：
 * ```
 * const observer = new OffsetObserver();
 * const offset = observer.getOffset(compId, domRects, { panX, panY, zoom });
 * if (offset) {
 *   // offset.left, offset.top, offset.width, offset.height
 * }
 * ```
 */
export class OffsetObserver {
  /**
   * 查询组件的补偿后像素位置
   *
   * 从 domRects store 读取原始 DOM 矩形，
   * 补偿 panX/panY/zoom 偏移后返回 BEM Tools 可用的坐标。
   *
   * @param id - 组件 ID
   * @param domRects - 来自 Zustand store 的 DOM 矩形注册表
   * @param viewport - 画布视口状态（pan + zoom）
   * @returns 补偿后的像素坐标，或 null（组件未注册时）
   */
  static getOffset(
    id: string,
    domRects: Record<string, DomRectEntry>,
    viewport: CanvasViewportState,
  ): OffsetResult | null {
    const rect = domRects[id];
    if (!rect) return null;

    const { panX, panY, zoom } = viewport;
    const left = rect.left;
    const top = rect.top;
    const width = rect.width;
    const height = rect.height;

    return {
      left,
      top,
      width,
      height,
      right: left + width,
      bottom: top + height,

      // 低代码引擎偏移量计算：
      // offsetLeft = left + scrollX * scale（用于 transform translate）
      // 这里 Envelope 使用 pan 替代 scroll，zoom 替代 scale
      offsetLeft: left + panX * zoom,
      offsetTop: top + panY * zoom,
      offsetWidth: width,
      offsetHeight: height,
    };
  }

  /**
   * 检查组件是否已在 domRects 中注册
   */
  static hasOffset(id: string, domRects: Record<string, DomRectEntry>): boolean {
    return id in domRects;
  }
}
