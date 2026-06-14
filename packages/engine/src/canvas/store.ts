"use client";

import { create } from "zustand";
import type { CanvasState, CanvasActions, CanvasComponent } from "./types";

function generateId(): string {
  return crypto.randomUUID();
}

export const useCanvasStore = create<CanvasState & CanvasActions>((set, get) => ({
  // ========== Initial state ==========
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

  // ========== Component operations ==========

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
        const clampedX = Math.max(1, Math.min(12, x));
        const clampedY = Math.max(1, y);
        return { ...c, position: { ...c.position, x: clampedX, y: clampedY } };
      }),
    })),

  resizeComponent: (id, width, height) =>
    set((state) => ({
      components: state.components.map((c) => {
        if (c.id !== id) return c;
        const clampedWidth = Math.max(1, Math.min(12 - c.position.x + 1, width));
        const clampedHeight = Math.max(1, height);
        return { ...c, position: { ...c.position, width: clampedWidth, height: clampedHeight } };
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
      .filter(Boolean) as CanvasComponent[];

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
