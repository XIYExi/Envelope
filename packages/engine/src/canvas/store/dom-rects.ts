/**
 * DomRectsSlice — 画布组件 DOM 矩形注册表
 *
 * 替代 lowcode-engine OffsetObserver 的 MobX @obx/@computed 模式，
 * 使用 Zustand 集中管理所有画布组件和嵌套子组件的 DOM 矩形。
 *
 * 工作流程：
 *   1. CanvasRenderer 使用 ResizeObserver 监听 canvas grid 容器内
 *      所有 [data-canvas-comp="true"] 和 [data-canvas-child] 元素
 *   2. 每次回调调用 batchRegisterDomRects 批量写入 store
 *   3. BEM Tools 通过 props 读取 domRects 获取实际像素位置
 *   4. OffsetObserver 基于 domRects + panX/panY/zoom 做偏移补偿
 *
 * @reference lowcode-engine-main/packages/designer/src/designer/offset-observer.ts
 *   MobX @obx/@computed → Zustand slice 映射
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-30
 */

import type { DomRectEntry } from "../types";

/** DomRects slice 初始状态 */
export const domRectsInitialState = {
  domRects: {} as Record<string, DomRectEntry>,
};

/**
 * 创建 DomRects Zustand slice
 *
 * 提供 registerDomRect / unregisterDomRect / batchRegisterDomRects
 * 三个 action 用于更新 store 中的 DOM 矩形注册表。
 */
export function createDomRectsSlice(
  set: (partial: Record<string, unknown>) => void,
  get: () => Record<string, unknown>,
) {
  return {
    ...domRectsInitialState,

    /** 注册单个组件的 DOM 矩形 */
    registerDomRect(id: string, rect: DomRectEntry) {
      set({ domRects: { ...(get() as any).domRects, [id]: rect } });
    },

    /** 注销单个组件的 DOM 矩形 */
    unregisterDomRect(id: string) {
      const state = get() as any;
      if (!(id in state.domRects)) return;
      const next = { ...state.domRects };
      delete next[id];
      set({ domRects: next });
    },

    /** 批量注册多个组件的 DOM 矩形（ResizeObserver 回调专用，减少 set 次数） */
    batchRegisterDomRects(entries: Array<{ id: string; rect: DomRectEntry }>) {
      const state = get() as any;
      const next = { ...state.domRects };
      for (const { id, rect } of entries) {
        next[id] = rect;
      }
      set({ domRects: next });
    },
  };
}
