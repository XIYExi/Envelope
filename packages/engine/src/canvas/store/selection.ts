/**
 * 画布选中操作切片
 *
 * 包含单选、多选、清除选中、全选等操作。
 * 选中管理委托给 SelectionManager。
 *
 * @author xiye
 * @date 2026-06-29
 */

import type { CanvasState, CanvasActions } from "../types";
import { SelectionManager } from "../document/selection-manager";
import type { NodeManager } from "../document/node-manager";

export function createSelectionSlice(
  set: (partial: Partial<CanvasState & CanvasActions>) => void,
  get: () => CanvasState & CanvasActions,
  getSelectionManager: () => SelectionManager,
  getNodeManager: () => NodeManager,
) {
  const sel = () => getSelectionManager();
  const nm = () => getNodeManager();

  return {
    selectComponent: (id: string, multi = false) => {
      const state = get();
      if (multi) {
        const nextIds = sel().toggle(state.selectedIds, id);
        set({
          selectedIds: nextIds,
          activeNodeId: nextIds.length === 1 ? nextIds[0]! : null,
        });
        return;
      }
      set({ selectedIds: [id], activeNodeId: id });
    },

    selectNode: (nodeId: string) => {
      const state = get();
      const loc = nm().locate(state.components, nodeId);
      if (!loc) {
        set({ selectedIds: [nodeId], activeNodeId: nodeId });
        return;
      }
      set({
        selectedIds: [loc.rootId],
        activeNodeId: nodeId,
      });
    },

    clearSelection: () => {
      set({ selectedIds: [], activeNodeId: null });
    },

    selectAll: () => {
      const state = get();
      const visibleIds = sel().selectAll(state.components);
      const firstId = visibleIds[0] ?? null;
      set({ selectedIds: visibleIds, activeNodeId: firstId });
    },

    getSelectedComponents: () => {
      const { components, selectedIds } = get();
      return components.filter((c) => selectedIds.includes(c.id));
    },
  };
}
