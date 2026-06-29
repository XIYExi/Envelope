/**
 * 画布选中操作切片
 *
 * 包含单选、多选、清除选中、全选等操作。
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { CanvasState, CanvasActions } from "../types";
import { findNodeLocation } from "./tree-ops";

export function createSelectionSlice(
  set: (partial: Partial<CanvasState & CanvasActions>) => void,
  get: () => CanvasState & CanvasActions,
) {
  return {
    // 选中操作不入历史栈，符合 Figma 等业界惯例
    selectComponent: (id: string, multi = false) => {
      const state = get();
      if (multi) {
        const already = state.selectedIds.includes(id);
        const nextSelectedIds = already ? state.selectedIds.filter((s) => s !== id) : [...state.selectedIds, id];
        set({
          selectedIds: nextSelectedIds,
          activeNodeId: nextSelectedIds.length === 1 ? nextSelectedIds[0]! : null,
        });
        return;
      }
      set({ selectedIds: [id], activeNodeId: id });
    },

    // 选中操作不入历史栈，符合 Figma 等业界惯例
    selectNode: (nodeId: string) => {
      const loc = findNodeLocation(get().components, nodeId);
      if (!loc) return;
      set({
        selectedIds: [loc.rootId],
        activeNodeId: nodeId,
      });
    },

    // 选中操作不入历史栈，符合 Figma 等业界惯例
    clearSelection: () => {
      set({ selectedIds: [] as string[], activeNodeId: null });
    },

    // 选中操作不入历史栈，符合 Figma 等业界惯例
    selectAll: () => {
      const visibleIds = get().components
        .filter((c) => !c.hidden)
        .map((c) => c.id);
      const firstId = visibleIds[0] ?? null;
      set({ selectedIds: visibleIds, activeNodeId: firstId });
    },

    getSelectedComponents: () => {
      const { components, selectedIds } = get();
      return components.filter((c) => selectedIds.includes(c.id));
    },
  };
}
