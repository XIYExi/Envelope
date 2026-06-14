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
import type { CanvasState, CanvasActions, CanvasComponent } from "./types";

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

  // ========== 组件操作 ==========

  addComponent: (comp) =>
    set((state) => ({ components: [...state.components, comp] })),

  removeComponent: (id) =>
    set((state) => ({
      components: state.components.filter((c) => c.id !== id),
      selectedIds: state.selectedIds.filter((sid) => sid !== id),
    })),

  updateComponent: (id, updates) =>
    set((state) => ({
      components: state.components.map((c) =>
        c.id === id ? { ...c, ...updates } : c,
      ),
    })),

  selectComponent: (id, multi = false) =>
    set((state) => {
      if (multi) {
        const already = state.selectedIds.includes(id);
        return {
          selectedIds: already
            ? state.selectedIds.filter((s) => s !== id)
            : [...state.selectedIds, id],
        };
      }
      return { selectedIds: [id] };
    }),

  clearSelection: () => set({ selectedIds: [] }),

  moveComponent: (id, x, y) =>
    set((state) => ({
      components: state.components.map((c) => {
        if (c.id !== id) return c;
        const clampedX = Math.max(1, Math.min(state.gridCols, x));
        const clampedY = Math.max(1, y);
        return { ...c, position: { ...c.position, x: clampedX, y: clampedY } };
      }),
    })),

  resizeComponent: (id, width, height, x, y) =>
    set((state) => ({
      components: state.components.map((c) => {
        if (c.id !== id) return c;
        const newX = x !== undefined ? Math.max(1, Math.min(state.gridCols, x)) : c.position.x;
        const maxWidth = state.gridCols - newX + 1;
        const clampedWidth = Math.max(1, Math.min(maxWidth, width));
        const clampedHeight = Math.max(1, height);
        return {
          ...c,
          position: { ...c.position, x: newX, width: clampedWidth, height: clampedHeight },
        };
      }),
    })),

  setZoom: (zoom) => set({ zoom: Math.max(0.25, Math.min(2, zoom)) }),
  setViewport: (viewport) => set({ viewport }),
  setGridCols: (gridCols) => set({ gridCols }),
  setGridGap: (gridGap) => set({ gridGap }),
  setPan: (panX, panY) => set({ panX, panY }),
  setPageBackground: (pageBackground) => set({ pageBackground }),
  setPagePadding: (pagePadding) => set({ pagePadding }),

  copySelected: () => {
    const { components, selectedIds } = get();
    const componentMap = new Map(components.map((c) => [c.id, c]));
    const copies = selectedIds
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

    set((state) => ({
      components: [...state.components, ...newComps],
      selectedIds: newComps.map((c) => c.id),
    }));
  },

  deleteSelected: () => {
    const { selectedIds } = get();
    set((state) => ({
      components: state.components.filter((c) => !selectedIds.includes(c.id)),
      selectedIds: [],
    }));
  },

  clearAll: () => set({ components: [], selectedIds: [] }),

  getSelectedComponents: () => {
    const { components, selectedIds } = get();
    return components.filter((c) => selectedIds.includes(c.id));
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
