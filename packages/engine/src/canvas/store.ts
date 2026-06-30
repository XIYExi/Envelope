/**
 * 画布状态管理（Zustand Store）
 *
 * 使用 Zustand 管理画布的全部状态和操作，各功能域已拆分为独立切片。
 *
 * 切片结构：
 * - store/history.ts    withHistory 高阶函数 + undo/redo/batch
 * - store/tree-ops.ts   树操作工具函数（纯函数）
 * - store/viewport.ts   视口/页面状态切片
 * - store/component-crud.ts  组件增删改
 * - store/selection.ts  选中操作
 * - store/clipboard.ts  剪贴板 + insertNode/moveNode/updateNode
 * - store/component-ops.ts  Lock/Hide/Z-Order/Align/Distribute
 *
 * @author xiye
 * @date 2026-06-25
 */

"use client";

import { create } from "zustand";
import type { CanvasState, CanvasActions, CanvasComponent } from "./types";
import type { ComponentNode } from "../schemas/page.schema";
import { syncAggregateSlots } from "../slots";
import { isContainerType } from "../shared/canvas-utils";

import { NodeManager, SelectionManager } from "./document";
import { resetHistoryState, undoOp, redoOp, clearHistoryOp, hydrateOp, batchOp, withHistory } from "./store/history";
import { viewportInitialState, createViewportSlice } from "./store/viewport";
import { createComponentCrudSlice } from "./store/component-crud";
import { createSelectionSlice } from "./store/selection";
import { createClipboardSlice } from "./store/clipboard";
import { createComponentOpsSlice } from "./store/component-ops";
import { generateId as genId } from "./store/tree-ops";

// 全局 NodeManager 和 SelectionManager 实例
const _nodeManager = new NodeManager();
const _selectionManager = new SelectionManager();

// 聚合所有切片创建 store
export const useCanvasStore = create<CanvasState & CanvasActions>((set, get) => ({
  // ========== 初始状态 ==========
  components: [],
  selectedIds: [],
  activeNodeId: null,
  clipboard: null,
  editScope: null,
  dropTarget: null,
  canUndo: false,
  canRedo: false,
  historyPast: [],
  historyFuture: [],
  historyLimit: 200,

  // 视口初始状态
  ...viewportInitialState,

  // ========== 视口操作 ==========
  ...createViewportSlice(set, get),

  // ========== 组件移动/缩放 ==========
  moveComponent: (id: string, x: number, y: number) => {
    /** 根据组件宽度对 x 做右边界钳制（仅 grid 模式使用） */
    function clampXByWidth(xVal: number, width: number, gridCols: number): number {
      const w = Math.max(1, width);
      const rightMostX = Math.max(1, gridCols - w + 1);
      return Math.max(1, Math.min(rightMostX, Math.round(xVal)));
    }
    set(withHistory((state, id2, x2, y2) => ({
      components: state.components.map((c) => {
        if (c.id !== id2) return c;
        const clampedY = Math.max(1, Math.round(y2));
        // free 模式下 x/y 为像素坐标，跳过 grid 钳制，仅做下界保护
        if (state.positionMode === "free") {
          const freeX = Math.max(0, Math.round(x2));
          return { ...c, position: { ...c.position, x: freeX, y: clampedY } };
        }
        // grid 模式：保持原有右边界钳制逻辑
        const clampedX = clampXByWidth(x2, c.position.width, state.gridCols);
        return { ...c, position: { ...c.position, x: clampedX, y: clampedY } };
      }),
    }), { coalesceKey: "move" })(get(), id, x, y));
  },

  resizeComponent: (id: string, width: number, height: number, x?: number, y?: number) => {
    /** 数值钳制 */
    function clamp(value: number, min: number, max: number): number {
      return Math.max(min, Math.min(max, value));
    }
    /** 根据组件宽度对 x 做右边界钳制（仅 grid 模式使用） */
    function clampXByWidth(xVal: number, widthVal: number, gridCols: number): number {
      const w = Math.max(1, widthVal);
      const rightMostX = Math.max(1, gridCols - w + 1);
      return clamp(Math.round(xVal), 1, rightMostX);
    }
    set(withHistory((state, id2, width2, height2, x2, y2) => ({
      components: state.components.map((c) => {
        if (c.id !== id2) return c;
        const nextHeight = Math.max(1, Math.round(height2));
        // free 模式下跳过所有 grid 相关钳制，仅做基本下界保护
        if (state.positionMode === "free") {
          const freeX = x2 !== undefined ? Math.max(0, Math.round(x2)) : c.position.x;
          const freeY = y2 !== undefined ? Math.max(1, Math.round(y2)) : c.position.y;
          const freeWidth = Math.max(1, Math.round(width2));
          return {
            ...c,
            position: { ...c.position, x: freeX, y: freeY, width: freeWidth, height: nextHeight },
          };
        }
        // grid 模式：保持原有钳制逻辑
        const nextXInput = x2 !== undefined ? x2 : c.position.x;
        const nextXPre = clamp(Math.round(nextXInput), 1, state.gridCols);
        const maxWidthByX = Math.max(1, state.gridCols - nextXPre + 1);
        const nextWidthRaw = Math.max(1, Math.round(width2));
        const nextWidth = clamp(nextWidthRaw, 1, maxWidthByX);
        const nextX = clampXByWidth(nextXPre, nextWidth, state.gridCols);
        const nextY = y2 !== undefined ? Math.max(1, Math.round(y2)) : c.position.y;
        return {
          ...c,
          position: { ...c.position, x: nextX, y: nextY, width: nextWidth, height: nextHeight },
        };
      }),
    }), { coalesceKey: "resize" })(get(), id, width, height, x, y));
  },

  // ========== 组件 CRUD ==========
  ...createComponentCrudSlice(set, get),

  // ========== 选中操作 ==========
  ...createSelectionSlice(set, get, () => _selectionManager, () => _nodeManager),

  // ========== 剪贴板 + 节点操作 ==========
  ...createClipboardSlice(set, get, () => ({
    insertNode: _nodeManager.insertNode.bind(_nodeManager),
    removeNode: _nodeManager.removeNode.bind(_nodeManager),
    moveNode: _nodeManager.moveNode.bind(_nodeManager),
    updateNode: _nodeManager.updateNode.bind(_nodeManager),
    locate: _nodeManager.locate.bind(_nodeManager),
    reflowY: _nodeManager.reflowY.bind(_nodeManager),
    findNode: _nodeManager.findNode.bind(_nodeManager),
  })),

  // ========== Lock/Hide/Z-Order/Align/Distribute ==========
  ...createComponentOpsSlice(set, get),

  setDropTarget: (target) => set({ dropTarget: target }),

  // ========== 历史系统 ==========
  undo: () => {
    set(undoOp(get()));
  },

  redo: () => {
    set(redoOp(get()));
  },

  clearHistory: () => {
    set(clearHistoryOp());
  },

  hydrate: (partial) => {
    set(hydrateOp(partial));
    // 重建 NodeIndex
    const newComponents = partial.components;
    if (newComponents) {
      _nodeManager.index.rebuild(newComponents);
    }
  },

  batch: (fn: () => void) => {
    batchOp(get, set, fn);
  },
}));

// ========== 重新导出工具函数（供外部使用，保持兼容） ==========
export {
  generateId, isAutoName, cloneNodeWithNewIds,
  createComponentNode,
} from "./store/tree-ops";

// 向后兼容：代理 findNodeLocation 到 NodeManager
export { _nodeManager as _getNodeManager };

/**
 * 使用 NodeManager 的 findNodeLocation
 * 与旧版 tree-ops.findNodeLocation 签名兼容
 */
export function findNodeLocation(
  components: import("./types").CanvasComponent[],
  nodeId: string,
): import("./store/tree-ops").NodeLocation | null {
  return _nodeManager.locate(components, nodeId) as any;
}

export { isContainerType };

/**
 * 创建一个新的画布组件
 *
 * 根据组件类型、分类和属性生成一个新的 CanvasComponent 对象。
 *
 * @param type - 组件类型名称
 * @param category - 组件所属分类
 * @param props - 组件属性对象（可选）
 * @param existingComponents - 已有组件列表（可选）
 * @returns 新创建的画布组件对象
 */
export function createCanvasComponent(
  type: string,
  category: string,
  props: Record<string, unknown> = {},
  existingComponents: CanvasComponent[] = [],
): CanvasComponent {
  let y = 1;
  if (existingComponents.length > 0) {
    y = Math.max(...existingComponents.map((c) => c.position.y + c.position.height));
  }
  const id = genId();
  const node = syncAggregateSlots({
    id,
    type,
    name: `${type}-${id}`,
    category,
    props,
  }, "props");
  return {
    id,
    node,
    position: { x: 1, y, width: 3, height: 2 },
  };
}
