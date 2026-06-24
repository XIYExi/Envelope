/**
 * 画布选中操作切片
 *
 * 包含单选、多选、清除选中、全选等操作。
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { CanvasState, CanvasActions } from "../types";
import { withHistory } from "./history";
import { findNodeLocation } from "./tree-ops";

export function createSelectionSlice(
  set: (partial: Partial<CanvasState & CanvasActions>) => void,
  get: () => CanvasState & CanvasActions,
) {
  return {
    selectComponent: (id: string, multi = false) => {
      set(withHistory((state) => {
        if (multi) {
          const already = state.selectedIds.includes(id);
          const nextSelectedIds = already ? state.selectedIds.filter((s) => s !== id) : [...state.selectedIds, id];
          return {
            selectedIds: nextSelectedIds,
            activeNodeId: nextSelectedIds.length === 1 ? nextSelectedIds[0]! : null,
          };
        }
        return { selectedIds: [id], activeNodeId: id };
      }, { coalesceKey: "select" })(get(), id, multi));
    },

    selectNode: (nodeId: string) => {
      set(withHistory((state) => {
        const loc = findNodeLocation(state.components, nodeId);
        if (!loc) return {};
        return {
          selectedIds: [loc.rootId],
          activeNodeId: nodeId,
        };
      })(get(), nodeId));
    },

    clearSelection: () => {
      set(withHistory((state) => ({
        selectedIds: [] as string[],
        activeNodeId: null,
      }))(get()));
    },

    selectAll: () => {
      set(withHistory((state) => {
        const visibleIds = state.components
          .filter((c) => !c.hidden)
          .map((c) => c.id);
        const firstId = visibleIds[0] ?? null;
        return { selectedIds: visibleIds, activeNodeId: firstId };
      })(get()));
    },

    getSelectedComponents: () => {
      const { components, selectedIds } = get();
      return components.filter((c) => selectedIds.includes(c.id));
    },
  };
}
