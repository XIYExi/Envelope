/**
 * 画布状态管理（Zustand Store）
 *
 * 使用 Zustand 管理画布的全部状态和操作，包括：
 * - 组件的增删改查、移动、缩放
 * - 选中状态管理（单选/多选）
 * - 视图控制（缩放、平移、视口切换）
 * - 剪贴板操作（复制、删除、清空）
 *
 * 所有位置和尺寸计算均基于当前 gridCols 动态计算，
 * 不硬编码固定列数以支持自定义网格布局。
 *
 * @author xiye
 * @date 2026-06-14
 */

"use client";

import { create } from "zustand";
import type { CanvasState, CanvasActions, CanvasComponent, CanvasSnapshot, CanvasClipboard, CanvasClipboardItem } from "./types";
import { syncAggregateSlots, getSlotsForType } from "../slots";
import type { ComponentNode } from "../schemas/page.schema";
import { isContainerType } from "../shared/canvas-utils";

/**
 * 生成唯一 ID
 *
 * 使用 crypto.randomUUID() 生成符合 UUID v4 规范的唯一标识符，
 * 用于画布组件和组件节点的 ID 生成。
 *
 * @returns UUID v4 格式的唯一字符串
 */
function generateId(): string {
  return crypto.randomUUID();
}

function isAutoName(node: ComponentNode): boolean {
  const name = typeof node.name === "string" ? node.name.trim() : "";
  if (!name) return true;
  return name === `${node.type}-${node.id}`;
}

function cloneNodeWithNewIds(node: ComponentNode): ComponentNode {
  const id = generateId();
  return {
    ...node,
    id,
    name: isAutoName(node) ? `${node.type}-${id}` : node.name,
    props: node.props ? structuredClone(node.props) : undefined,
    tailwindClasses: node.tailwindClasses,
    dataBindings: node.dataBindings ? structuredClone(node.dataBindings) : undefined,
    eventBindings: node.eventBindings ? structuredClone(node.eventBindings) : undefined,
    children: node.children ? node.children.map(cloneNodeWithNewIds) : undefined,
    grid: undefined,
  };
}

function nodeContainsId(node: ComponentNode, targetId: string): boolean {
  if (node.id === targetId) return true;
  const children = node.children ?? [];
  for (const c of children) {
    if (nodeContainsId(c, targetId)) return true;
  }
  return false;
}

type NodeLocation =
  | {
      kind: "root";
      rootIndex: number;
      rootId: string;
      node: ComponentNode;
    }
  | {
      kind: "child";
      rootIndex: number;
      rootId: string;
      parentId: string;
      index: number;
      node: ComponentNode;
    };

function findNodeLocation(components: CanvasComponent[], nodeId: string): NodeLocation | null {
  for (let i = 0; i < components.length; i += 1) {
    const comp = components[i]!;
    if (comp.id === nodeId) {
      return { kind: "root", rootIndex: i, rootId: comp.id, node: comp.node };
    }

    type FoundChild = { kind: "child"; parentId: string; index: number; node: ComponentNode };
    const walk = (parent: ComponentNode): FoundChild | null => {
      const children = parent.children ?? [];
      for (let j = 0; j < children.length; j += 1) {
        const child = children[j]!;
        if (child.id === nodeId) {
          return { kind: "child", parentId: parent.id, index: j, node: child };
        }
        const nested = walk(child);
        if (nested) return nested;
      }
      return null;
    };

    const found = walk(comp.node);
    if (found) return { ...found, rootIndex: i, rootId: comp.id };
  }
  return null;
}

function canNodeHaveChildren(type: string): boolean {
  return isContainerType(type);
}

// Backward-compatible re-export for external consumers
export const COMPONENT_TYPES_THAT_SUPPORT_CHILDREN = {
  has: (type: string) => isContainerType(type),
} as const;

function findNodeInComponents(components: CanvasComponent[], nodeId: string): ComponentNode | null {
  for (const comp of components) {
    const search = (n: ComponentNode): ComponentNode | null => {
      if (n.id === nodeId) return n;
      for (const child of n.children ?? []) {
        const found = search(child);
        if (found) return found;
      }
      return null;
    };
    const found = search(comp.node);
    if (found) return found;
  }
  return null;
}

function reflowRootComponentsByOrder(
  components: CanvasComponent[],
  onlyForIds?: Set<string>,
): CanvasComponent[] {
  if (onlyForIds) {
    const maxY = components
      .filter((c) => !onlyForIds.has(c.id))
      .reduce((max, c) => Math.max(max, c.position.y + c.position.height), 0);
    let y = Math.max(1, maxY + 1);
    return components.map((c) => {
      if (!onlyForIds.has(c.id)) return c;
      const nextY = y;
      y += Math.max(1, Math.round(c.position.height));
      return { ...c, position: { ...c.position, y: nextY } };
    });
  }
  let y = 1;
  return components.map((c) => {
    const nextY = y;
    y += Math.max(1, Math.round(c.position.height));
    return { ...c, position: { ...c.position, y: nextY } };
  });
}

function removeNodeFromTree(
  node: ComponentNode,
  targetId: string,
): { nextNode: ComponentNode; removed: ComponentNode | null; removedParentId: string | null; removedIndex: number } {
  const children = node.children ?? [];
  if (children.length === 0) return { nextNode: node, removed: null, removedParentId: null, removedIndex: -1 };

  let removed: ComponentNode | null = null;
  let removedParentId: string | null = null;
  let removedIndex = -1;
  let changed = false;

  const nextChildren: ComponentNode[] = [];
  for (let i = 0; i < children.length; i += 1) {
    const child = children[i]!;
    if (child.id === targetId) {
      removed = child;
      removedParentId = node.id;
      removedIndex = i;
      changed = true;
      continue;
    }
    const res = removeNodeFromTree(child, targetId);
    if (res.removed) {
      removed = res.removed;
      removedParentId = res.removedParentId;
      removedIndex = res.removedIndex;
    }
    if (res.nextNode !== child) changed = true;
    nextChildren.push(res.nextNode);
  }

  if (!changed) return { nextNode: node, removed, removedParentId, removedIndex };

  const next: ComponentNode = {
    ...node,
    children: nextChildren.length > 0 ? nextChildren : undefined,
  };
  return { nextNode: syncAggregateSlots(next, "children"), removed, removedParentId, removedIndex };
}

function insertNodeIntoTree(
  node: ComponentNode,
  parentId: string,
  index: number,
  child: ComponentNode,
): { nextNode: ComponentNode; inserted: boolean } {
  if (node.id === parentId) {
    if (!canNodeHaveChildren(node.type)) {
      return { nextNode: node, inserted: false };
    }
    // B8: Slot 类型校验 — 如果父组件 slot 声明了 allowedChildTypes，则只允许匹配的子组件类型
    const slots = getSlotsForType(node.type);
    if (slots.length > 0) {
      const allowedTypes = new Set(slots.flatMap(s => s.allowedChildTypes));
      if (allowedTypes.size > 0 && !allowedTypes.has(child.type)) {
        return { nextNode: node, inserted: false };
      }
    }
    const children = node.children ?? [];
    const nextChildren = children.slice();
    const safeIndex = Math.max(0, Math.min(nextChildren.length, index));
    nextChildren.splice(safeIndex, 0, child);
    const next: ComponentNode = { ...node, children: nextChildren };
    return { nextNode: syncAggregateSlots(next, "children"), inserted: true };
  }

  const children = node.children ?? [];
  if (children.length === 0) return { nextNode: node, inserted: false };

  let inserted = false;
  let changed = false;
  const nextChildren = children.map((c) => {
    if (inserted) return c;
    const res = insertNodeIntoTree(c, parentId, index, child);
    if (res.inserted) inserted = true;
    if (res.nextNode !== c) changed = true;
    return res.nextNode;
  });

  if (!inserted) return { nextNode: node, inserted: false };
  if (!changed) return { nextNode: node, inserted: true };

  const next: ComponentNode = { ...node, children: nextChildren };
  return { nextNode: syncAggregateSlots(next, "children"), inserted: true };
}

function updateNodeInTree(
  node: ComponentNode,
  targetId: string,
  updates: Partial<Omit<ComponentNode, "id">>,
): { nextNode: ComponentNode; updated: boolean } {
  if (node.id === targetId) {
    const next: ComponentNode = {
      ...node,
      ...updates,
      props: Object.prototype.hasOwnProperty.call(updates, "props") ? updates.props : node.props,
      dataBindings: Object.prototype.hasOwnProperty.call(updates, "dataBindings") ? updates.dataBindings : node.dataBindings,
      eventBindings: Object.prototype.hasOwnProperty.call(updates, "eventBindings") ? updates.eventBindings : node.eventBindings,
      children: Object.prototype.hasOwnProperty.call(updates, "children") ? updates.children : node.children,
    };

    const hasProps = Object.prototype.hasOwnProperty.call(updates, "props");
    const hasChildren = Object.prototype.hasOwnProperty.call(updates, "children");
    const source = hasChildren && !hasProps ? "children" : "props";
    return { nextNode: (hasProps || hasChildren) ? syncAggregateSlots(next, source) : next, updated: true };
  }

  const children = node.children ?? [];
  if (children.length === 0) return { nextNode: node, updated: false };

  let updated = false;
  let changed = false;
  const nextChildren = children.map((c) => {
    if (updated) return c;
    const res = updateNodeInTree(c, targetId, updates);
    if (res.updated) updated = true;
    if (res.nextNode !== c) changed = true;
    return res.nextNode;
  });

  if (!updated) return { nextNode: node, updated: false };
  if (!changed) return { nextNode: node, updated: true };
  return { nextNode: { ...node, children: nextChildren }, updated: true };
}

/**
 * 创建一个新的 ComponentNode（不带画布 Grid 位置信息）
 *
 * 用途：
 * - 组件树面板 / 嵌套插入：只需要 node 结构，不需要 CanvasComponent.position
 * - 剪贴板 Paste：当需要把“节点”粘贴到某个父节点 children 时直接复用
 *
 * 注意：
 * - 会自动生成 id，并将默认 name 规范化为 `${type}-${id}`
 * - 会执行聚合组件 slots 初始化（props → children），确保编辑器内部始终拥有 children tree
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
export function createComponentNode(
  type: string,
  category: string,
  props: Record<string, unknown> = {},
): ComponentNode {
  const id = generateId();
  return syncAggregateSlots({
    id,
    type,
    name: `${type}-${id}`,
    category,
    props,
  }, "props");
}

/**
 * 数值钳制（闭区间）
 *
 * @param value - 原始值
 * @param min - 最小值
 * @param max - 最大值
 * @returns 钳制后的值
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * 规范化网格列数
 *
 * 关键点：
 * - gridCols 必须为正整数（至少 1）
 * - UI/外部调用可能传入小数/非法值，这里统一做兜底
 *
 * @param cols - 输入列数
 * @returns 规范化后的列数（>= 1 的整数）
 */
function normalizeGridCols(cols: number): number {
  if (!Number.isFinite(cols)) return 1;
  return Math.max(1, Math.floor(cols));
}

/**
 * 根据组件宽度对 x 做右边界钳制
 *
 * 设计目标：
 * - 始终保证组件落在有效网格范围内（1 <= x <= gridCols - width + 1）
 * - 在 gridCols 变小时，优先保持 width（若 width > gridCols 则会被上层逻辑先钳制）
 *
 * @param x - 目标起始列（可能越界）
 * @param width - 组件列跨度（>= 1）
 * @param gridCols - 当前网格列数（>= 1）
 * @returns 钳制后的起始列
 */
function clampXByWidth(x: number, width: number, gridCols: number): number {
  const w = Math.max(1, width);
  const rightMostX = Math.max(1, gridCols - w + 1);
  return clamp(Math.round(x), 1, rightMostX);
}

function takeSnapshot(state: CanvasState): CanvasSnapshot {
  return {
    components: structuredClone(state.components),
    selectedIds: structuredClone(state.selectedIds),
    activeNodeId: state.activeNodeId,
    zoom: state.zoom,
    viewport: state.viewport,
    gridCols: state.gridCols,
    gridGap: state.gridGap,
    minRowHeight: state.minRowHeight,
    panX: state.panX,
    panY: state.panY,
    pageBackground: state.pageBackground,
    pagePadding: state.pagePadding,
    pageMaxWidth: state.pageMaxWidth,
  };
}

function snapshotEquals(a: CanvasSnapshot, b: CanvasSnapshot): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

let batching = false;
let batchStartSnapshot: CanvasSnapshot | null = null;
let lastCoalesceKey: string | null = null;
let lastCoalesceAt = 0;

/**
 * 画布全局状态 Store
 *
 * 组合 CanvasState 和 CanvasActions，通过 Zustand 的 create 函数创建。
 * 所有 action 使用 set((state) => ...) 模式以确保基于最新状态更新。
 *
 * @example
 * const components = useCanvasStore((s) => s.components);
 * const addComponent = useCanvasStore((s) => s.addComponent);
 */
export const useCanvasStore = create<CanvasState & CanvasActions>((set, get) => ({
  // ========== 初始状态 ==========
  components: [],
  selectedIds: [],
  activeNodeId: null,
  zoom: 1,
  viewport: "desktop",
  gridCols: 12,
  gridGap: 4,
  minRowHeight: 40,
  panX: 0,
  panY: 0,
  pageBackground: "#ffffff",
  pagePadding: 16,
  pageMaxWidth: null,
  clipboard: null,
  editScope: null,
  canUndo: false,
  canRedo: false,
  historyPast: [],
  historyFuture: [],
  historyLimit: 200,

  // ========== 组件操作 ==========

  addComponent: (comp) => {
    set((state) => {
      if (batching) return { components: [...state.components, comp] };
      const prev = takeSnapshot(state);
      const partial = { components: [...state.components, comp] };
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },

  removeComponent: (id) => {
    set((state) => {
      const partial = {
        components: state.components.filter((c) => c.id !== id),
        selectedIds: state.selectedIds.filter((sid) => sid !== id),
        activeNodeId: state.activeNodeId === id ? null : state.activeNodeId,
      };
      if (batching) return partial;
      const prev = takeSnapshot(state);
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },

  updateComponent: (id, updates) => {
    set((state) => {
      const partial = {
        components: state.components.map((c) => {
          if (c.id !== id) return c;

          const next = {
            ...c,
            ...updates,
            node: updates.node ? { ...c.node, ...updates.node } : c.node,
          };

          if (!updates.node) return next;

          /**
           * 聚合组件 slots 同步（props ↔ children）
           *
           * 约定：
           * - 仅传入 props（常见于右侧属性面板）：认为“props 为真实来源”，据此重建 children tree；
           * - 仅传入 children（未来/外部场景）：认为“children 为真实来源”，回写 slots props。
           *
           * @author xiye
           * @date 2026-06-22
           * @since 3.0.0
           */
          const hasProps = Object.prototype.hasOwnProperty.call(updates.node, "props");
          const hasChildren = Object.prototype.hasOwnProperty.call(updates.node, "children");
          const source = hasChildren && !hasProps ? "children" : "props";
          return { ...next, node: syncAggregateSlots(next.node, source) };
        }),
      };
      if (batching) return partial;
      const prev = takeSnapshot(state);
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },

  selectComponent: (id, multi = false) => {
    set((state) => {
      const partial = multi
        ? (() => {
            const already = state.selectedIds.includes(id);
            const nextSelectedIds = already ? state.selectedIds.filter((s) => s !== id) : [...state.selectedIds, id];
            return {
              selectedIds: nextSelectedIds,
              activeNodeId: nextSelectedIds.length === 1 ? nextSelectedIds[0]! : null,
            };
          })()
        : { selectedIds: [id], activeNodeId: id };
      if (batching) return partial;
      const prev = takeSnapshot(state);
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;

      const now = Date.now();
      const coalesce = lastCoalesceKey === "select" && now - lastCoalesceAt < 250;
      lastCoalesceKey = "select";
      lastCoalesceAt = now;
      if (coalesce) return { ...partial, historyFuture: [], canRedo: false };

      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },

  selectNode: (nodeId) => {
    set((state) => {
      const loc = findNodeLocation(state.components, nodeId);
      if (!loc) return {};
      const partial = {
        selectedIds: [loc.rootId],
        activeNodeId: nodeId,
      };
      if (batching) return partial;
      const prev = takeSnapshot(state);
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },

  clearSelection: () => {
    set((state) => {
      const partial = { selectedIds: [] as string[], activeNodeId: null };
      if (batching) return partial;
      const prev = takeSnapshot(state);
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },

  /**
   * 移动组件（拖拽/对齐操作使用）
   *
   * 关键点：
   * - x 必须同时考虑组件 width，保证右边界不越界（否则会出现“store 数据非法但渲染层被动裁剪”的隐性问题）
   * - y 只要求 >= 1（当前网格未限制最大行数）
   *
   * @param id - 目标组件 ID
   * @param x - 目标起始列（网格单位，1 为基准）
   * @param y - 目标起始行（网格单位，1 为基准）
   */
  moveComponent: (id, x, y) => {
    set((state) => {
      const partial = {
        components: state.components.map((c) => {
          if (c.id !== id) return c;
          // 关键：移动时需要同时考虑 “组件宽度” 与 “网格总列数”，避免 x 越界导致渲染侧被动裁剪
          const clampedX = clampXByWidth(x, c.position.width, state.gridCols);
          const clampedY = Math.max(1, Math.round(y));
          return { ...c, position: { ...c.position, x: clampedX, y: clampedY } };
        }),
      };
      if (batching) return partial;
      const prev = takeSnapshot(state);
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;

      const now = Date.now();
      const coalesce = lastCoalesceKey === "move" && now - lastCoalesceAt < 250;
      lastCoalesceKey = "move";
      lastCoalesceAt = now;
      if (coalesce) return { ...partial, historyFuture: [], canRedo: false };

      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },

  /**
   * 缩放组件（由画布缩放手柄驱动）
   *
   * 约束规则：
   * - width/height 最小为 1
   * - x/y 最小为 1
   * - x 需要考虑 width：优先保持 width，在必要时再对 x 做钳制
   *
   * @param id - 目标组件 ID
   * @param width - 目标宽度（列跨度）
   * @param height - 目标高度（行跨度）
   * @param x - 目标起始列（可选；西向/西北/西南手柄会传入）
   * @param y - 目标起始行（可选；北向/西北/东北手柄会传入）
   */
  resizeComponent: (id, width, height, x, y) => {
    set((state) => {
      const partial = {
        components: state.components.map((c) => {
          if (c.id !== id) return c;
          const nextHeight = Math.max(1, Math.round(height));
          const nextXInput = x !== undefined ? x : c.position.x;
          const nextXPre = clamp(Math.round(nextXInput), 1, state.gridCols);
          const maxWidthByX = Math.max(1, state.gridCols - nextXPre + 1);
          const nextWidthRaw = Math.max(1, Math.round(width));
          const nextWidth = clamp(nextWidthRaw, 1, maxWidthByX);
          const nextX = clampXByWidth(nextXPre, nextWidth, state.gridCols);
          const nextY = y !== undefined ? Math.max(1, Math.round(y)) : c.position.y;
          return {
            ...c,
            position: { ...c.position, x: nextX, y: nextY, width: nextWidth, height: nextHeight },
          };
        }),
      };
      if (batching) return partial;
      const prev = takeSnapshot(state);
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;

      const now = Date.now();
      const coalesce = lastCoalesceKey === "resize" && now - lastCoalesceAt < 250;
      lastCoalesceKey = "resize";
      lastCoalesceAt = now;
      if (coalesce) return { ...partial, historyFuture: [], canRedo: false };

      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },

  setZoom: (zoom) => {
    set((state) => {
      const partial = { zoom: Math.max(0.25, Math.min(2, zoom)) };
      if (batching) return partial;
      const prev = takeSnapshot(state);
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;

      const now = Date.now();
      const coalesce = lastCoalesceKey === "zoom" && now - lastCoalesceAt < 250;
      lastCoalesceKey = "zoom";
      lastCoalesceAt = now;
      if (coalesce) return { ...partial, historyFuture: [], canRedo: false };

      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },
  setViewport: (viewport) => {
    set((state) => {
      const partial = { viewport };
      if (batching) return partial;
      const prev = takeSnapshot(state);
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },
  /**
   * 设置网格列数
   *
   * 关键点：
   * - gridCols 会影响所有组件的 x/width 合法范围
   * - 这里必须同步“回收”已有组件位置，否则历史数据会出现越界
   *
   * @param gridCols - 新的网格列数（允许输入小数/非法值，内部会 normalize）
   */
  setGridCols: (gridCols) => {
    set((state) => {
      const nextCols = normalizeGridCols(gridCols);
      const partial = {
        gridCols: nextCols,
        // 关键：gridCols 改变时同步钳制所有组件的位置/宽度，避免出现不可达或负跨度的布局状态
        components: state.components.map((c) => {
          const nextW = clamp(Math.round(c.position.width), 1, nextCols);
          const nextX = clampXByWidth(c.position.x, nextW, nextCols);
          const nextY = Math.max(1, Math.round(c.position.y));
          const nextH = Math.max(1, Math.round(c.position.height));
          return { ...c, position: { ...c.position, x: nextX, y: nextY, width: nextW, height: nextH } };
        }),
      };
      const prev = takeSnapshot(state);
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },
  setGridGap: (gridGap) => {
    set((state) => {
      const partial = { gridGap };
      if (batching) return partial;
      const prev = takeSnapshot(state);
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },
  /**
   * 设置组件最小行高（px）
   *
   * 设为 0 时表示自适应：不设置 minHeight，由内容撑开行高。
   *
   * @param height - 最小行高值（>= 0）
   */
  setMinRowHeight: (height) => {
    set((state) => {
      const partial = { minRowHeight: Math.max(0, Math.round(height)) };
      if (batching) return partial;
      const prev = takeSnapshot(state);
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },
  /**
   * 缩放到适配所有可见组件
   *
   * 计算所有非隐藏组件的外包围盒，将缩放和平移调整为刚好容纳全部组件。
   * 使用默认网格尺寸估算像素值。
   */
  zoomToFit: () => {
    set((state) => {
      if (state.components.length === 0) return {};
      const visible = state.components.filter((c) => !c.hidden);
      if (visible.length === 0) return {};
      const minX = Math.min(...visible.map((c) => c.position.x));
      const maxX = Math.max(...visible.map((c) => c.position.x + c.position.width));
      const minY = Math.min(...visible.map((c) => c.position.y));
      const maxY = Math.max(...visible.map((c) => c.position.y + c.position.height));
      const colW = 80;
      const rowH = 40;
      const gap = state.gridGap;
      const contentW = (maxX - minX + 1) * (colW + gap);
      const contentH = (maxY - minY + 1) * (rowH + gap);
      const vpW = 800;
      const vpH = 600;
      const fitZoom = Math.min(vpW / contentW, vpH / contentH, 2) * 0.9;
      const zoomVal = Math.max(0.25, fitZoom);
      const cx = ((minX + maxX) / 2) * (colW + gap);
      const cy = ((minY + maxY) / 2) * (rowH + gap);
      const newPanX = -cx * zoomVal + vpW / 2 - 16;
      const newPanY = -cy * zoomVal + vpH / 2 - 16;
      if (batching) return { zoom: zoomVal, panX: newPanX, panY: newPanY };
      return { zoom: zoomVal, panX: newPanX, panY: newPanY };
    });
  },
  /**
   * 缩放到适配当前选中组件
   *
   * 计算选中组件的外包围盒，将缩放和平移调整为选中的组件区域。
   * 无选中时静默调用 zoomToFit。
   */
  zoomToSelection: () => {
    set((state) => {
      if (state.selectedIds.length === 0) {
        return {};
      }
      const selected = state.components.filter((c) => state.selectedIds.includes(c.id) && !c.hidden);
      if (selected.length === 0) return {};
      const minX = Math.min(...selected.map((c) => c.position.x));
      const maxX = Math.max(...selected.map((c) => c.position.x + c.position.width));
      const minY = Math.min(...selected.map((c) => c.position.y));
      const maxY = Math.max(...selected.map((c) => c.position.y + c.position.height));
      const colW = 80;
      const rowH = 40;
      const gap = state.gridGap;
      const contentW = (maxX - minX + 1) * (colW + gap);
      const contentH = (maxY - minY + 1) * (rowH + gap);
      const vpW = 800;
      const vpH = 600;
      const fitZoom = Math.min(vpW / contentW, vpH / contentH, 2) * 0.9;
      const zoomVal = Math.max(0.25, fitZoom);
      const cx = ((minX + maxX) / 2) * (colW + gap);
      const cy = ((minY + maxY) / 2) * (rowH + gap);
      const newPanX = -cx * zoomVal + vpW / 2 - 16;
      const newPanY = -cy * zoomVal + vpH / 2 - 16;
      if (batching) return { zoom: zoomVal, panX: newPanX, panY: newPanY };
      return { zoom: zoomVal, panX: newPanX, panY: newPanY };
    });
  },
  setPan: (panX, panY) => {
    set((state) => {
      const partial = { panX, panY };
      if (batching) return partial;
      const prev = takeSnapshot(state);
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;

      const now = Date.now();
      const coalesce = lastCoalesceKey === "pan" && now - lastCoalesceAt < 250;
      lastCoalesceKey = "pan";
      lastCoalesceAt = now;
      if (coalesce) return { ...partial, historyFuture: [], canRedo: false };

      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },
  setPageBackground: (pageBackground) => {
    set((state) => {
      const partial = { pageBackground };
      if (batching) return partial;
      const prev = takeSnapshot(state);
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },
  setPagePadding: (pagePadding) => {
    set((state) => {
      const partial = { pagePadding };
      if (batching) return partial;
      const prev = takeSnapshot(state);
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },
  /**
   * 设置页面内容最大宽度（px）
   *
   * 约定：
   * - 传入 null / 非正数 / 非有限值：表示不限制（渲染层不设置 max-width）
   * - 传入正数：会向下取整，避免出现小数像素导致的布局抖动
   *
   * @author xiye
   * @date 2026-06-22
   * @since 3.0.0
   */
  setPageMaxWidth: (pageMaxWidth) => {
    set((state) => {
      const normalized =
        typeof pageMaxWidth === "number" && Number.isFinite(pageMaxWidth) && pageMaxWidth > 0
          ? Math.floor(pageMaxWidth)
          : null;
      const partial = { pageMaxWidth: normalized };
      if (batching) return partial;
      const prev = takeSnapshot(state);
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },

  /**
   * 复制当前选中的组件
   *
   * 规则：
   * - 复制后的组件会在原位置基础上做轻微偏移，避免完全重叠
   * - 必须保证 CanvasComponent.id 与 node.id 一致（否则后续基于 id 的映射会出现歧义）
   * - 偏移后的 x 仍要做边界钳制，避免复制到画布外
   */
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

  pasteClipboard: (target) => {
    set((state) => {
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

      const prev = takeSnapshot(state);

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
        const partial: Partial<CanvasState> = {
          components: nextComponents,
          selectedIds: firstId ? [firstId] : [],
          activeNodeId: firstId,
          ...(clipboard.mode === "cut" ? { clipboard: null } : {}),
        };
        if (batching) return partial;
        const next = takeSnapshot({ ...(state as CanvasState), ...partial });
        if (snapshotEquals(prev, next)) return partial;
        const past = [...state.historyPast, prev];
        const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
        lastCoalesceKey = null;
        return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
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
      const partial: Partial<CanvasState> = {
        components: nextComponents,
        selectedIds: insertedRootId ? [insertedRootId] : state.selectedIds,
        activeNodeId: firstInserted,
        ...(clipboard.mode === "cut" ? { clipboard: null } : {}),
      };

      if (batching) return partial;
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },

  insertNode: (node, target) => {
    set((state) => {
      const prev = takeSnapshot(state);
      const parentId = target.parentId;
      const index = target.index ?? (parentId === null ? state.components.length : 0);

      if (parentId === null) {
        const nextComponents = state.components.slice();
        const safeIndex = Math.max(0, Math.min(nextComponents.length, index));
        // B9: 支持外部传入 position，避免先 insert 后 move 的两步闪跳
        const pos = target.position
          ? { x: target.position.x, y: target.position.y, width: target.position.width ?? 3, height: target.position.height ?? 2 }
          : (() => {
            const maxY = nextComponents.length > 0
              ? Math.max(...nextComponents.map((c) => c.position.y + c.position.height))
              : 0;
            return { x: 1, y: Math.max(1, maxY + 1), width: 3, height: 2 };
          })();
        nextComponents.splice(safeIndex, 0, {
          id: node.id,
          node,
          position: pos,
        });
        const partial = { components: nextComponents, selectedIds: [node.id], activeNodeId: node.id };
        if (batching) return partial;
        const next = takeSnapshot({ ...(state as CanvasState), ...partial });
        if (snapshotEquals(prev, next)) return partial;
        const past = [...state.historyPast, prev];
        const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
        lastCoalesceKey = null;
        return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
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
      const partial = { components: nextComponents, selectedIds: [insertedRootId], activeNodeId: node.id };
      if (batching) return partial;
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },

  moveNode: (nodeId, target) => {
    set((state) => {
      const loc = findNodeLocation(state.components, nodeId);
      if (!loc) return {};

      const targetParentId = target.parentId;
      if (targetParentId && nodeContainsId(loc.node, targetParentId)) return {};

      const prev = takeSnapshot(state);

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
      const partial = {
        components: nextComponents,
        selectedIds: nextLoc ? [nextLoc.rootId] : [],
        activeNodeId: nodeId,
      };

      if (batching) return partial;
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },

  updateNode: (nodeId, updates) => {
    set((state) => {
      const loc = findNodeLocation(state.components, nodeId);
      if (!loc) return {};

      const prev = takeSnapshot(state);

      if (loc.kind === "root") {
        const partial = {
          components: state.components.map((c) => {
            if (c.id !== nodeId) return c;
            const nextNode: ComponentNode = { ...c.node, ...updates } as ComponentNode;
            const hasProps = Object.prototype.hasOwnProperty.call(updates, "props");
            const hasChildren = Object.prototype.hasOwnProperty.call(updates, "children");
            const source = hasChildren && !hasProps ? "children" : "props";
            const synced = (hasProps || hasChildren) ? syncAggregateSlots(nextNode, source) : nextNode;
            return { ...c, node: synced };
          }),
        };
        if (batching) return partial;
        const next = takeSnapshot({ ...(state as CanvasState), ...partial });
        if (snapshotEquals(prev, next)) return partial;
        const past = [...state.historyPast, prev];
        const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
        lastCoalesceKey = null;
        return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
      }

      const partial = {
        components: state.components.map((c) => {
          if (c.id !== loc.rootId) return c;
          const res = updateNodeInTree(c.node, nodeId, updates);
          if (!res.updated) return c;
          return { ...c, node: res.nextNode };
        }),
      };

      if (batching) return partial;
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },

  deleteSelected: () => {
    set((state) => {
      if (state.selectedIds.length === 0) return {};

      const active = state.activeNodeId;
      const activeLoc = active ? findNodeLocation(state.components, active) : null;

      const isMultiRoot = state.selectedIds.length > 1;
      const shouldDeleteRoots = isMultiRoot || !activeLoc || activeLoc.kind === "root";

      const prev = takeSnapshot(state);

      if (shouldDeleteRoots) {
        const nextComponents = state.components.filter((c) => !state.selectedIds.includes(c.id));
        const partial = { components: nextComponents, selectedIds: [] as string[], activeNodeId: null };
        if (batching) return partial;
        const next = takeSnapshot({ ...(state as CanvasState), ...partial });
        if (snapshotEquals(prev, next)) return partial;
        const past = [...state.historyPast, prev];
        const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
        lastCoalesceKey = null;
        return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
      }

      const loc = activeLoc;
      if (!loc || loc.kind !== "child") return {};

      const nextComponents = state.components.map((c) => {
        if (c.id !== loc.rootId) return c;
        const res = removeNodeFromTree(c.node, active!);
        if (!res.removed) return c;
        return { ...c, node: res.nextNode };
      });

      const partial = { components: nextComponents, selectedIds: [loc.rootId], activeNodeId: loc.rootId };
      if (batching) return partial;
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },

  clearAll: () => {
    set((state) => {
      const partial = { components: [] as CanvasComponent[], selectedIds: [] as string[], activeNodeId: null };
      if (batching) return partial;
      const prev = takeSnapshot(state);
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },

  selectAll: () => {
    set((state) => {
      const visibleIds = state.components
        .filter((c) => !c.hidden)
        .map((c) => c.id);
      const firstId = visibleIds[0] ?? null;
      const partial = { selectedIds: visibleIds, activeNodeId: firstId };
      if (batching) return partial;
      const prev = takeSnapshot(state);
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },

  getSelectedComponents: () => {
    const { components, selectedIds } = get();
    return components.filter((c) => selectedIds.includes(c.id));
  },

  // ========== Lock & Hide ==========

  toggleLock: (id) => {
    set((state) => {
      const partial = {
        components: state.components.map((c) =>
          c.id === id ? { ...c, locked: !c.locked } : c,
        ),
      };
      if (batching) return partial;
      const prev = takeSnapshot(state);
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },

  toggleHidden: (id) => {
    set((state) => {
      const partial = {
        components: state.components.map((c) =>
          c.id === id ? { ...c, hidden: !c.hidden } : c,
        ),
      };
      if (batching) return partial;
      const prev = takeSnapshot(state);
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },

  batchToggleLock: (ids) => {
    set((state) => {
      const partial = {
        components: state.components.map((c) =>
          ids.includes(c.id) ? { ...c, locked: !c.locked } : c,
        ),
      };
      if (batching) return partial;
      const prev = takeSnapshot(state);
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },

  batchToggleHidden: (ids) => {
    set((state) => {
      const partial = {
        components: state.components.map((c) =>
          ids.includes(c.id) ? { ...c, hidden: !c.hidden } : c,
        ),
      };
      if (batching) return partial;
      const prev = takeSnapshot(state);
      const next = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, next)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },

  // ========== Z-Order ==========

  zIndexMove: (ids, direction) => {
    set((state) => {
      const next = state.components.slice();
      const indices = ids
        .map((id) => next.findIndex((c) => c.id === id))
        .filter((i) => i >= 0)
        .sort((a, b) => a - b);

      if (indices.length === 0) return {};

      if (direction === "top") {
        const moved = indices.map((i) => next[i]!);
        const remaining = next.filter((_, i) => !indices.includes(i));
        const partial = { components: [...remaining, ...moved] };
        if (batching) return partial;
        const prev = takeSnapshot(state);
        const nextSnap = takeSnapshot({ ...(state as CanvasState), ...partial });
        if (snapshotEquals(prev, nextSnap)) return partial;
        const past = [...state.historyPast, prev];
        const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
        lastCoalesceKey = null;
        return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
      }

      if (direction === "bottom") {
        const moved = indices.map((i) => next[i]!);
        const remaining = next.filter((_, i) => !indices.includes(i));
        const partial = { components: [...moved, ...remaining] };
        if (batching) return partial;
        const prev = takeSnapshot(state);
        const nextSnap = takeSnapshot({ ...(state as CanvasState), ...partial });
        if (snapshotEquals(prev, nextSnap)) return partial;
        const past = [...state.historyPast, prev];
        const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
        lastCoalesceKey = null;
        return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
      }

      if (direction === "up") {
        for (let i = indices.length - 1; i >= 0; i--) {
          const idx = indices[i]!;
          if (idx < next.length - 1 && !indices.includes(idx + 1)) {
            [next[idx], next[idx + 1]] = [next[idx + 1]!, next[idx]!];
          }
        }
      }

      if (direction === "down") {
        for (let i = 0; i < indices.length; i++) {
          const idx = indices[i]!;
          if (idx > 0 && !indices.includes(idx - 1)) {
            [next[idx], next[idx - 1]] = [next[idx - 1]!, next[idx]!];
          }
        }
      }

      const partial = { components: next };
      if (batching) return partial;
      const prev = takeSnapshot(state);
      const nextSnap = takeSnapshot({ ...(state as CanvasState), ...partial });
      if (snapshotEquals(prev, nextSnap)) return partial;
      const past = [...state.historyPast, prev];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return { ...partial, historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },

  // ========== Align & Distribute ==========

  alignSelected: (direction) => {
    const state = get();
    const comps = state.components.filter((c) => state.selectedIds.includes(c.id));
    if (comps.length < 2) return;

    const minX = Math.min(...comps.map((c) => c.position.x));
    const maxRight = Math.max(...comps.map((c) => c.position.x + c.position.width - 1));
    const minY = Math.min(...comps.map((c) => c.position.y));
    const maxBottom = Math.max(...comps.map((c) => c.position.y + c.position.height - 1));

    const moves: { id: string; x: number; y: number }[] = [];

    for (const c of comps) {
      let nx = c.position.x;
      let ny = c.position.y;
      switch (direction) {
        case "left": nx = minX; break;
        case "right": nx = maxRight - c.position.width + 1; break;
        case "centerH": nx = Math.round((minX + maxRight) / 2 - c.position.width / 2); break;
        case "top": ny = minY; break;
        case "bottom": ny = maxBottom - c.position.height + 1; break;
        case "centerV": ny = Math.round((minY + maxBottom) / 2 - c.position.height / 2); break;
      }
      if (nx !== c.position.x || ny !== c.position.y) {
        moves.push({ id: c.id, x: nx, y: ny });
      }
    }

    if (moves.length === 0) return;
    state.batch(() => {
      for (const m of moves) {
        state.moveComponent(m.id, m.x, m.y);
      }
    });
  },

  distributeSelected: (direction) => {
    const state = get();
    const comps = state.components.filter((c) => state.selectedIds.includes(c.id));
    if (comps.length < 3) return;

    const sorted = [...comps].sort((a, b) =>
      direction === "horizontal" ? a.position.x - b.position.x : a.position.y - b.position.y,
    );
    const moves: { id: string; x?: number; y?: number }[] = [];

    if (direction === "horizontal") {
      const first = sorted[0]!;
      const last = sorted[sorted.length - 1]!;
      const start = first.position.x;
      const end = last.position.x + last.position.width - 1;
      const totalWidth = sorted.reduce((sum, c) => sum + c.position.width, 0);
      const gap = (end - start + 1 - totalWidth) / (sorted.length - 1);
      let cursor = start;
      for (const c of sorted) {
        const newX = Math.round(cursor);
        if (c.id !== first.id && c.id !== last.id) {
          moves.push({ id: c.id, x: newX });
        }
        cursor += c.position.width + gap;
      }
    } else {
      const first = sorted[0]!;
      const last = sorted[sorted.length - 1]!;
      const start = first.position.y;
      const end = last.position.y + last.position.height - 1;
      const totalHeight = sorted.reduce((sum, c) => sum + c.position.height, 0);
      const gap = (end - start + 1 - totalHeight) / (sorted.length - 1);
      let cursor = start;
      for (const c of sorted) {
        const newY = Math.round(cursor);
        if (c.id !== first.id && c.id !== last.id) {
          moves.push({ id: c.id, y: newY });
        }
        cursor += c.position.height + gap;
      }
    }

    if (moves.length === 0) return;
    state.batch(() => {
      for (const m of moves) {
        const comp = state.components.find((c) => c.id === m.id);
        if (!comp) continue;
        state.moveComponent(m.id, m.x ?? comp.position.x, m.y ?? comp.position.y);
      }
    });
  },

  // ========== Batch Edit ==========

  batchUpdateSelectedProps: (key, value) => {
    const state = get();
    const ids = state.selectedIds;
    if (ids.length === 0) return;
    state.batch(() => {
      for (const id of ids) {
        const loc = findNodeLocation(state.components, id);
        if (!loc) continue;
        const node = loc.node;
        const currentProps = node.props ?? {};
        const nextProps = { ...currentProps };
        if (value === undefined) {
          delete nextProps[key];
        } else {
          nextProps[key] = value;
        }
        state.updateNode(node.id, { props: Object.keys(nextProps).length > 0 ? nextProps : undefined });
      }
    });
  },

  // ========== Child Edit Mode ==========

  enterChildEdit: (rootId, path) => {
    set({ editScope: { rootId, path } });
  },

  exitChildEdit: () => {
    set({ editScope: null });
  },

  undo: () => {
    set((state) => {
      if (state.historyPast.length === 0) return {};
      const past = state.historyPast.slice();
      const prev = past.pop()!;
      const current = takeSnapshot(state);
      const future = [...state.historyFuture, current];
      lastCoalesceKey = null;
      return {
        ...prev,
        historyPast: past,
        historyFuture: future,
        canUndo: past.length > 0,
        canRedo: future.length > 0,
      };
    });
  },

  redo: () => {
    set((state) => {
      if (state.historyFuture.length === 0) return {};
      const future = state.historyFuture.slice();
      const next = future.pop()!;
      const current = takeSnapshot(state);
      const past = [...state.historyPast, current];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      lastCoalesceKey = null;
      return {
        ...next,
        historyPast: limitedPast,
        historyFuture: future,
        canUndo: limitedPast.length > 0,
        canRedo: future.length > 0,
      };
    });
  },

  clearHistory: () => {
    lastCoalesceKey = null;
    batchStartSnapshot = null;
    batching = false;
    set({ historyPast: [], historyFuture: [], canUndo: false, canRedo: false });
  },

  hydrate: (partial) => {
    lastCoalesceKey = null;
    batchStartSnapshot = null;
    batching = false;
    set({
      ...partial,
      selectedIds: partial.selectedIds ?? [],
      activeNodeId: partial.activeNodeId ?? null,
      pageMaxWidth: partial.pageMaxWidth ?? null,
      minRowHeight: partial.minRowHeight ?? 40,
      historyPast: [],
      historyFuture: [],
      canUndo: false,
      canRedo: false,
      clipboard: null,
    });
  },

  batch: (fn) => {
    if (batching) {
      fn();
      return;
    }
    batching = true;
    batchStartSnapshot = takeSnapshot(get());
    lastCoalesceKey = null;
    lastCoalesceAt = 0;
    try {
      fn();
    } finally {
      batching = false;
    }
    const before2 = batchStartSnapshot;
    batchStartSnapshot = null;
    if (!before2) return;
    const after2 = takeSnapshot(get());
    if (snapshotEquals(before2, after2)) return;
    set((state) => {
      const past = [...state.historyPast, before2];
      const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
      return { historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
    });
  },
}));

/**
 * 创建一个新的画布组件
 *
 * 根据组件类型、分类和属性生成一个新的 CanvasComponent 对象。
 * 自动分配唯一的 ID 和默认位置（新组件放在已有组件下方）。
 *
 * @param type - 组件类型名称，如 "Button"、"Card"
 * @param category - 组件所属分类，如 "form"、"layout"
 * @param props - 组件属性对象（可选，默认为空对象）
 * @param existingComponents - 已有组件列表，用于计算默认位置（可选，默认为空数组）
 * @returns 新创建的画布组件对象
 *
 * @example
 * const comp = createCanvasComponent("Button", "form", { label: "Submit" }, existing);
 * // => { id: "uuid", node: { ... }, position: { x: 1, y: 5, width: 3, height: 2 } }
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
  const id = generateId();
  /**
   * 聚合组件 slots 初始化（props → children）
   *
   * 新增组件时物料默认值通常仅存在于 props，编辑器内部需要同时生成 children tree，
   * 以便后续导出/渲染阶段可以真正按 children 结构处理 slots。
   *
   * @author xiye
   * @date 2026-06-22
   * @since 3.0.0
   */
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
