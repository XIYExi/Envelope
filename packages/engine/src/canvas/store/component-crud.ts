/**
 * 画布组件 CRUD 切片
 *
 * 包含组件的增删改、清空等基本操作。
 * 所有 action 使用 withHistory 自动处理历史记录。
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { CanvasComponent, CanvasState, CanvasActions } from "../types";
import { withHistory } from "./history";
import { syncAggregateSlots } from "../../slots";
import { findNodeLocation, removeNodeFromTree } from "./tree-ops";

export function createComponentCrudSlice(
  set: (partial: Partial<CanvasState & CanvasActions>) => void,
  get: () => CanvasState & CanvasActions,
) {
  return {
    addComponent: (comp: CanvasComponent) => {
      set(withHistory((state) => ({
        components: [...state.components, comp],
      }))(get(), comp));
    },

    removeComponent: (id: string) => {
      set(withHistory((state) => ({
        components: state.components.filter((c) => c.id !== id),
        selectedIds: state.selectedIds.filter((sid) => sid !== id),
        activeNodeId: state.activeNodeId === id ? null : state.activeNodeId,
      }))(get(), id));
    },

    updateComponent: (id: string, updates: Partial<Omit<CanvasComponent, "id">>) => {
      set(withHistory((state) => ({
        components: state.components.map((c) => {
          if (c.id !== id) return c;

          const next = {
            ...c,
            ...updates,
            node: updates.node ? { ...c.node, ...updates.node } : c.node,
          };

          if (!updates.node) return next;

          const hasProps = Object.prototype.hasOwnProperty.call(updates.node, "props");
          const hasChildren = Object.prototype.hasOwnProperty.call(updates.node, "children");
          const source = hasChildren && !hasProps ? "children" : "props";
          return { ...next, node: syncAggregateSlots(next.node, source) };
        }),
      }))(get(), id, updates));
    },

    deleteSelected: () => {
      set(withHistory((state) => {
        if (state.selectedIds.length === 0) return {};

        const active = state.activeNodeId;
        const activeLoc = active ? findNodeLocation(state.components, active) : null;

        const isMultiRoot = state.selectedIds.length > 1;
        const shouldDeleteRoots = isMultiRoot || !activeLoc || activeLoc.kind === "root";

        if (shouldDeleteRoots) {
          return {
            components: state.components.filter((c) => !state.selectedIds.includes(c.id)),
            selectedIds: [] as string[],
            activeNodeId: null,
          };
        }

        const loc = activeLoc;
        if (!loc || loc.kind !== "child") return {};

        const nextComponents = state.components.map((c) => {
          if (c.id !== loc.rootId) return c;
          const res = removeNodeFromTree(c.node, active!);
          if (!res.removed) return c;
          return { ...c, node: res.nextNode };
        });

        return { components: nextComponents, selectedIds: [loc.rootId], activeNodeId: loc.rootId };
      })(get()));
    },

    clearAll: () => {
      set(withHistory((state) => ({
        components: [] as CanvasComponent[],
        selectedIds: [] as string[],
        activeNodeId: null,
      }))(get()));
    },
  };
}
