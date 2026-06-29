/**
 * 画布剪贴板操作切片
 *
 * 包含复制、剪切、粘贴、插入节点、移动节点、更新节点等操作。
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { CanvasComponent, CanvasState, CanvasActions, CanvasClipboard, CanvasClipboardItem } from "../types";
import type { ComponentNode } from "../../schemas/page.schema";
import { withHistory } from "./history";
import {
  cloneNodeWithNewIds, findNodeLocation, findNodeInComponents, canNodeHaveChildren,
  removeNodeFromTree, insertNodeIntoTree, reflowRootComponentsByOrder, nodeContainsId,
  updateNodeInTree,
} from "./tree-ops";
import { createDefaultRegistry, validateProps } from "@envelope/materials";
import { syncAggregateSlots } from "../../slots";

export function createClipboardSlice(
  set: (partial: Partial<CanvasState & CanvasActions>) => void,
  get: () => CanvasState & CanvasActions,
) {
  return {
    copySelected: () => {
      const state = get();
      if (state.selectedIds.length === 0) return;

      const primaryId = state.activeNodeId ?? state.selectedIds[0] ?? null;
      if (!primaryId) return;

      const loc = findNodeLocation(state.components, primaryId);
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

        const inferredTarget = (() => {
          if (target) return target;
          if (state.activeNodeId) {
            const loc = findNodeLocation(state.components, state.activeNodeId);
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

        if (parentId === null) {
          const safeIndex = Math.max(0, Math.min(nextComponents.length, index));
          const newComps = clonedNodes.map((n) => ({
            id: n.id,
            node: n,
            position: { x: 1, y: 1, width: 3, height: 2 },
          }));
          nextComponents.splice(safeIndex, 0, ...newComps);
          const pastedIds = new Set(newComps.map((nc) => nc.id));
          nextComponents = reflowRootComponentsByOrder(nextComponents, pastedIds);
          const firstId = newComps[0]?.id ?? null;
          return {
            components: nextComponents,
            selectedIds: firstId ? [firstId] : [],
            activeNodeId: firstId,
            ...(clipboard.mode === "cut" ? { clipboard: null } : {}),
          };
        }

        let insertedRootId: string | null = null;
        nextComponents = nextComponents.map((c) => {
          if (insertedRootId) return c;
          const res = insertNodeIntoTree(c.node, parentId, index, clonedNodes[0]!);
          if (!res.inserted) return c;
          insertedRootId = c.id;

          let nextNode = res.nextNode;
          for (let i = 1; i < clonedNodes.length; i += 1) {
            const more = insertNodeIntoTree(nextNode, parentId, index + i, clonedNodes[i]!);
            nextNode = more.nextNode;
          }

          return { ...c, node: nextNode };
        });

        const firstInserted = clonedNodes[0]?.id ?? null;
        return {
          components: nextComponents,
          selectedIds: insertedRootId ? [insertedRootId] : state.selectedIds,
          activeNodeId: firstInserted,
          ...(clipboard.mode === "cut" ? { clipboard: null } : {}),
        };
      })(get(), target));
    },

    insertNode: (node: ComponentNode, target: { parentId: string | null; index?: number; position?: { x: number; y: number; width?: number; height?: number } }) => {
      set(withHistory((state) => {
        const parentId = target.parentId;
        const index = target.index ?? (parentId === null ? state.components.length : 0);

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

        let insertedRootId: string | null = null;
        const nextComponents = state.components.map((c) => {
          if (insertedRootId) return c;
          const res = insertNodeIntoTree(c.node, parentId, index, node);
          if (!res.inserted) return c;
          insertedRootId = c.id;
          return { ...c, node: res.nextNode };
        });

        if (!insertedRootId) return {};
        return { components: nextComponents, selectedIds: [insertedRootId], activeNodeId: node.id };
      })(get(), node, target));
    },

    moveNode: (nodeId: string, target: { parentId: string | null; index?: number }) => {
      set(withHistory((state) => {
        const loc = findNodeLocation(state.components, nodeId);
        if (!loc) return {};

        const targetParentId = target.parentId;
        if (targetParentId && nodeContainsId(loc.node, targetParentId)) return {};

        let removedKind: "canvas-component" | "component-node" | null = null;
        let removedComponent: CanvasComponent | null = null;
        let removedNode: ComponentNode | null = null;
        let originParentId: string | null = null;
        let originIndex = -1;

        let nextComponents = state.components.slice();

        if (loc.kind === "root") {
          originParentId = null;
          originIndex = loc.rootIndex;
          const removedComp = nextComponents.splice(loc.rootIndex, 1)[0]!;
          removedKind = "canvas-component";
          removedComponent = removedComp;
        } else {
          originParentId = loc.parentId;
          originIndex = loc.index;
          const rootComp = nextComponents[loc.rootIndex];
          if (!rootComp) return {};
          const res = removeNodeFromTree(rootComp.node, nodeId);
          if (!res.removed) return {};
          removedKind = "component-node";
          removedNode = res.removed;
          nextComponents[loc.rootIndex] = { ...rootComp, node: res.nextNode };
        }

        if (!removedKind) return {};

        const adjustedIndex = (() => {
          const raw = target.index ?? (targetParentId === null ? nextComponents.length : 0);
          if (originParentId !== targetParentId) return raw;
          if (originIndex >= 0 && originIndex < raw) return Math.max(0, raw - 1);
          return raw;
        })();

        if (targetParentId === null) {
          const safeIndex = Math.max(0, Math.min(nextComponents.length, adjustedIndex));
          const maxY = nextComponents.length > 0
            ? Math.max(...nextComponents.map((c) => c.position.y + c.position.height))
            : 0;
          const newY = Math.max(1, maxY + 1);
          const compsToInsert: CanvasComponent[] = [];
          if (removedKind === "canvas-component" && removedComponent) {
            compsToInsert.push({ ...removedComponent, position: { ...removedComponent.position, y: newY } });
          } else if (removedKind === "component-node" && removedNode) {
            compsToInsert.push({ id: removedNode.id, node: removedNode, position: { x: 1, y: newY, width: 3, height: 2 } });
          } else {
            return {};
          }
          nextComponents.splice(safeIndex, 0, ...compsToInsert);
        } else {
          const targetNode = findNodeInComponents(nextComponents, targetParentId);
          if (targetNode && !canNodeHaveChildren(targetNode.type)) return {};
          const nodeToInsert = removedKind === "canvas-component" ? removedComponent?.node : removedNode;
          if (!nodeToInsert) return {};
          let inserted = false;
          nextComponents = nextComponents.map((c) => {
            if (inserted) return c;
            const res = insertNodeIntoTree(c.node, targetParentId, adjustedIndex, nodeToInsert);
            if (!res.inserted) return c;
            inserted = true;
            return { ...c, node: res.nextNode };
          });
          if (!inserted) return {};
        }

        const nextLoc = findNodeLocation(nextComponents, nodeId);
        return {
          components: nextComponents,
          selectedIds: nextLoc ? [nextLoc.rootId] : [],
          activeNodeId: nodeId,
        };
      })(get(), nodeId, target));
    },

    updateNode: (nodeId: string, updates: Partial<Omit<ComponentNode, "id">>) => {
      // 校验 props
      const hasPropsUpdate = Object.prototype.hasOwnProperty.call(updates, "props");
      if (hasPropsUpdate) {
        const state = get();
        const node = findNodeInComponents(state.components, nodeId);
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
        const loc = findNodeLocation(state.components, nodeId);
        if (!loc) return {};

        if (loc.kind === "root") {
          const components = state.components.map((c) => {
            if (c.id !== nodeId) return c;
            const nextNode: ComponentNode = { ...c.node, ...updates } as ComponentNode;
            const hasProps = Object.prototype.hasOwnProperty.call(updates, "props");
            const hasChildren = Object.prototype.hasOwnProperty.call(updates, "children");
            const source = hasChildren && !hasProps ? "children" : "props";
            const synced = (hasProps || hasChildren) ? syncAggregateSlots(nextNode, source) : nextNode;
            return { ...c, node: synced };
          });
          return { components };
        }

        const components = state.components.map((c) => {
          if (c.id !== loc.rootId) return c;
          const res = updateNodeInTree(c.node, nodeId, updates);
          if (!res.updated) return c;
          return { ...c, node: res.nextNode };
        });
        return { components };
      }, { coalesceKey: "updateNode" })(get(), nodeId, updates));
    },
  };
}
