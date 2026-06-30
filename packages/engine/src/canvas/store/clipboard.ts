/**
 * 画布剪贴板操作切片
 *
 * 包含复制、剪切、粘贴、插入节点、移动节点、更新节点等操作。
 * 树操作委托给 NodeManager。
 *
 * @author xiye
 * @date 2026-06-29
 */

import type { CanvasComponent, CanvasState, CanvasActions, CanvasClipboard, CanvasClipboardItem } from "../types";
import type { ComponentNode } from "../../schemas/page.schema";
import { withHistory } from "./history";
import { cloneNodeWithNewIds, generateId } from "./tree-ops";
import { createDefaultRegistry, validateProps } from "@envelope/materials";
import { syncAggregateSlots } from "../../slots";

export function createClipboardSlice(
  set: (partial: Partial<CanvasState & CanvasActions>) => void,
  get: () => CanvasState & CanvasActions,
  getManager: () => { insertNode: Function; removeNode: Function; moveNode: Function; updateNode: Function; locate: Function; reflowY: Function; findNode: Function },
) {
  const getNodeManager = () => {
    const m = getManager();
    return {
      insertNode: m.insertNode,
      removeNode: m.removeNode,
      moveNode: m.moveNode,
      updateNode: m.updateNode,
      locate: m.locate,
      reflowY: m.reflowY,
      findNode: m.findNode,
    };
  };

  return {
    copySelected: () => {
      const state = get();
      if (state.selectedIds.length === 0) return;

      const primaryId = state.activeNodeId ?? state.selectedIds[0] ?? null;
      if (!primaryId) return;

      const nm = getNodeManager();
      const loc = nm.locate(state.components, primaryId);
      if (!loc) return;

      const items: CanvasClipboardItem[] = (() => {
        if (state.selectedIds.length > 1) {
          const map = new Map(state.components.map((c) => [c.id, c]));
          return state.selectedIds
            .map((id) => map.get(id))
            .filter((c): c is CanvasComponent => Boolean(c))
            .map((c) => ({ kind: "canvas-component", component: structuredClone(c) }));
        }
        if (loc.kind === "root") {
          const comp = state.components[loc.rootIndex]!;
          return [{ kind: "canvas-component", component: structuredClone(comp) }];
        }
        return [{ kind: "component-node", node: structuredClone(loc.node) }];
      })();

      const clipboard: CanvasClipboard = { mode: "copy", items };
      set({ clipboard });
    },

    cutSelected: () => {
      const state = get();
      if (state.selectedIds.length === 0) return;
      get().copySelected();
      set({ clipboard: get().clipboard ? { ...get().clipboard!, mode: "cut" } : null });
      get().deleteSelected();
    },

    pasteClipboard: (target?: { parentId: string | null; index?: number }) => {
      set(withHistory((state) => {
        const clipboard = state.clipboard;
        if (!clipboard || clipboard.items.length === 0) return {};

        const nm = getNodeManager();

        const inferredTarget = (() => {
          if (target) return target;
          if (state.activeNodeId) {
            const loc = nm.locate(state.components, state.activeNodeId);
            if (!loc) return { parentId: null as string | null, index: state.components.length };
            if (loc.kind === "root") return { parentId: null as string | null, index: loc.rootIndex + 1 };
            return { parentId: loc.parentId, index: loc.index + 1 };
          }
          if (state.selectedIds.length > 0) {
            const map = new Map(state.components.map((c, idx) => [c.id, idx]));
            const maxIndex = Math.max(...state.selectedIds.map((id) => map.get(id) ?? -1));
            return { parentId: null as string | null, index: Math.max(0, maxIndex + 1) };
          }
          return { parentId: null as string | null, index: state.components.length };
        })();

        const parentId = inferredTarget.parentId;
        const index = inferredTarget.index ?? (parentId === null ? state.components.length : 0);

        const clonedNodes = clipboard.items.map((it) => {
          if (it.kind === "canvas-component") return cloneNodeWithNewIds(it.component.node);
          return cloneNodeWithNewIds(it.node);
        });

        let nextComponents = state.components.slice();
        const pastedIds: string[] = [];

        if (parentId === null) {
          const safeIndex = Math.max(0, Math.min(nextComponents.length, index));
          const newComps = clonedNodes.map((n) => ({
            id: n.id,
            node: n,
            position: { x: 1, y: 1, width: 3, height: 2 },
          }));
          nextComponents.splice(safeIndex, 0, ...newComps);
          pastedIds.push(...newComps.map((nc) => nc.id));
          nextComponents = nm.reflowY(nextComponents, new Set(pastedIds));
          const firstId = pastedIds[0] ?? null;
          return {
            components: nextComponents,
            selectedIds: firstId ? [firstId] : [],
            activeNodeId: firstId,
            ...(clipboard.mode === "cut" ? { clipboard: null } : {}),
          };
        }

        let insertedRootId: string | null = null;
        for (const cloned of clonedNodes) {
          const res = nm.insertNode(nextComponents, parentId, index, cloned);
          if (res !== nextComponents) {
            nextComponents = res;
            if (!insertedRootId) insertedRootId = cloned.id;
          }
        }

        return {
          components: nextComponents,
          selectedIds: insertedRootId ? [insertedRootId] : state.selectedIds,
          activeNodeId: clonedNodes[0]?.id ?? null,
          ...(clipboard.mode === "cut" ? { clipboard: null } : {}),
        };
      })(get()));
    },

    insertNode: (node: ComponentNode, target: { parentId: string | null; index?: number; position?: { x: number; y: number; width?: number; height?: number } }) => {
      set(withHistory((state) => {
        const parentId = target.parentId;
        const index = target.index ?? (parentId === null ? state.components.length : 0);
        const nm = getNodeManager();

        if (parentId === null) {
          const nextComponents = state.components.slice();
          const safeIndex = Math.max(0, Math.min(nextComponents.length, index));
          const pos = target.position
            ? { x: target.position.x, y: target.position.y, width: target.position.width ?? 3, height: target.position.height ?? 2 }
            : (() => {
              const maxY = nextComponents.length > 0
                ? Math.max(...nextComponents.map((c) => c.position.y + c.position.height))
                : 0;
              return { x: 1, y: Math.max(1, maxY + 1), width: 3, height: 2 };
            })();
          nextComponents.splice(safeIndex, 0, { id: node.id, node, position: pos });
          return { components: nextComponents, selectedIds: [node.id], activeNodeId: node.id };
        }

        const nextComponents = nm.insertNode(state.components, parentId, index, node);
        if (nextComponents === state.components) return {};
        return { components: nextComponents, selectedIds: [nextComponents.find((c: CanvasComponent) => c.id === (state.activeNodeId ?? state.selectedIds[0]))?.id ?? nextComponents[0]?.id ?? ""].filter(Boolean), activeNodeId: node.id };
      })(get()));
    },

    moveNode: (nodeId: string, target: { parentId: string | null; index?: number }) => {
      set(withHistory((state) => {
        const nm = getNodeManager();
        const nextComponents = nm.moveNode(state.components, nodeId, target);
        if (nextComponents === state.components) return {};

        const nextLoc = nm.locate(nextComponents, nodeId);
        return {
          components: nextComponents,
          selectedIds: nextLoc
            ? [nextLoc.kind === "root" ? nextLoc.rootId : nextLoc.rootId]
            : [],
          activeNodeId: nodeId,
        };
      })(get()));
    },

    updateNode: (nodeId: string, updates: Partial<Omit<ComponentNode, "id">>) => {
      const hasPropsUpdate = Object.prototype.hasOwnProperty.call(updates, "props");
      if (hasPropsUpdate) {
        const state = get();
        const nm = getNodeManager();
        const node = nm.findNode(state.components, nodeId);
        if (node) {
          const registry = createDefaultRegistry();
          const material = registry.get(node.type);
          if (material && updates.props) {
            const errors = validateProps(updates.props as Record<string, unknown>, material);
            if (errors.length > 0) {
              console.warn(
                `[canvas] 组件 "${node.type}" 属性校验失败:`,
                errors.map((e) => e.message).join("; "),
              );
            }
          }
        }
      }

      set(withHistory((state) => {
        const nm = getNodeManager();
        const nextComponents = nm.updateNode(state.components, nodeId, updates);
        if (nextComponents === state.components) return {};
        return { components: nextComponents };
      }, { coalesceKey: "updateNode" })(get()));
    },
  };
}
