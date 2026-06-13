import { create } from "zustand";
import type { CanvasState, CanvasActions, CanvasComponent } from "./types";

let nextId = 1;
function generateId(): string {
  return `comp_${Date.now()}_${nextId++}`;
}

export const useCanvasStore = create<CanvasState & CanvasActions>((set, get) => ({
  components: [],
  selectedIds: [],
  zoom: 1,
  viewport: "desktop",
  gridCols: 12,
  gridGap: 4,

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
      components: state.components.map((c) =>
        c.id === id ? { ...c, position: { ...c.position, x, y } } : c,
      ),
    })),

  resizeComponent: (id, width, height) =>
    set((state) => ({
      components: state.components.map((c) =>
        c.id === id
          ? { ...c, position: { ...c.position, width, height } }
          : c,
      ),
    })),

  setZoom: (zoom) => set({ zoom }),
  setViewport: (viewport) => set({ viewport }),

  copySelected: () => {
    const { components, selectedIds } = get();
    const copies = selectedIds
      .map((sid) => components.find((c) => c.id === sid))
      .filter(Boolean) as CanvasComponent[];

    const newComps: CanvasComponent[] = copies.map((c) => ({
      ...c,
      id: generateId(),
      node: { ...c.node, id: generateId() },
      position: { ...c.position, x: c.position.x + 2, y: c.position.y + 1 },
    }));

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
): CanvasComponent {
  return {
    id: generateId(),
    node: {
      id: generateId(),
      type,
      category,
      props,
    },
    position: { x: 1, y: 1, width: 3, height: 2 },
  };
}
