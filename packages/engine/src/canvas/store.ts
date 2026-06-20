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
import type { CanvasState, CanvasActions, CanvasComponent, CanvasSnapshot } from "./types";

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

function takeSnapshot(state: CanvasState): CanvasSnapshot {
  return {
    components: structuredClone(state.components),
    selectedIds: structuredClone(state.selectedIds),
    zoom: state.zoom,
    viewport: state.viewport,
    gridCols: state.gridCols,
    gridGap: state.gridGap,
    panX: state.panX,
    panY: state.panY,
    pageBackground: state.pageBackground,
    pagePadding: state.pagePadding,
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
  zoom: 1,
  viewport: "desktop",
  gridCols: 12,
  gridGap: 4,
  panX: 0,
  panY: 0,
  pageBackground: "#ffffff",
  pagePadding: 16,
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
        components: state.components.map((c) => (c.id === id ? { ...c, ...updates } : c)),
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
            return {
              selectedIds: already ? state.selectedIds.filter((s) => s !== id) : [...state.selectedIds, id],
            };
          })()
        : { selectedIds: [id] };
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

  clearSelection: () => {
    set((state) => {
      const partial = { selectedIds: [] as string[] };
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

  moveComponent: (id, x, y) => {
    set((state) => {
      const partial = {
        components: state.components.map((c) => {
          if (c.id !== id) return c;
          const clampedX = Math.max(1, Math.min(state.gridCols, x));
          const clampedY = Math.max(1, y);
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

  resizeComponent: (id, width, height, x, y) => {
    set((state) => {
      const partial = {
        components: state.components.map((c) => {
          if (c.id !== id) return c;
          const newX = x !== undefined ? Math.max(1, Math.min(state.gridCols, x)) : c.position.x;
          const maxWidth = state.gridCols - newX + 1;
          const clampedWidth = Math.max(1, Math.min(maxWidth, width));
          const clampedHeight = Math.max(1, height);
          const newY = y !== undefined ? Math.max(1, y) : c.position.y;
          return {
            ...c,
            position: { ...c.position, x: newX, y: newY, width: clampedWidth, height: clampedHeight },
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
  setGridCols: (gridCols) => {
    set((state) => {
      const partial = { gridCols };
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

  copySelected: () => {
    set((state) => {
      const componentMap = new Map(state.components.map((c) => [c.id, c]));
      const copies = state.selectedIds
        .map((sid) => componentMap.get(sid))
        .filter((c): c is CanvasComponent => c !== undefined);

      const newComps: CanvasComponent[] = copies.map((c) => {
        const clonedNode = structuredClone(c.node);
        clonedNode.id = generateId();
        return {
          id: generateId(),
          node: clonedNode,
          position: { ...c.position, x: c.position.x + 2, y: c.position.y + 1 },
        };
      });

      const partial = {
        components: [...state.components, ...newComps],
        selectedIds: newComps.map((c) => c.id),
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

  deleteSelected: () => {
    set((state) => {
      const partial = {
        components: state.components.filter((c) => !state.selectedIds.includes(c.id)),
        selectedIds: [] as string[],
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

  clearAll: () => {
    set((state) => {
      const partial = { components: [] as CanvasComponent[], selectedIds: [] as string[] };
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
    set({ ...partial, historyPast: [], historyFuture: [], canUndo: false, canRedo: false });
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
      const before = batchStartSnapshot;
      batchStartSnapshot = null;
      if (!before) return;
      const after = takeSnapshot(get());
      if (snapshotEquals(before, after)) return;
      set((state) => {
        const past = [...state.historyPast, before];
        const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
        return { historyPast: limitedPast, historyFuture: [], canUndo: limitedPast.length > 0, canRedo: false };
      });
    }
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
  return {
    id,
    node: {
      id,
      type,
      name: `${type}-${id}`,
      category,
      props,
    },
    position: { x: 1, y, width: 3, height: 2 },
  };
}
