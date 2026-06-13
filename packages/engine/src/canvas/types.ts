import type { ComponentNode } from "../schemas/page.schema";

export interface CanvasComponent {
  id: string;
  node: ComponentNode;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface CanvasState {
  components: CanvasComponent[];
  selectedIds: string[];
  zoom: number;
  viewport: "mobile" | "tablet" | "desktop" | "fluid";
  gridCols: number;
  gridGap: number;
}

export interface CanvasActions {
  addComponent: (comp: CanvasComponent) => void;
  removeComponent: (id: string) => void;
  updateComponent: (id: string, updates: Partial<CanvasComponent>) => void;
  selectComponent: (id: string, multi?: boolean) => void;
  clearSelection: () => void;
  moveComponent: (id: string, x: number, y: number) => void;
  resizeComponent: (id: string, width: number, height: number) => void;
  setZoom: (zoom: number) => void;
  setViewport: (viewport: CanvasState["viewport"]) => void;
  copySelected: () => void;
  deleteSelected: () => void;
  clearAll: () => void;
  getSelectedComponents: () => CanvasComponent[];
}

export type DragItemType = "material" | "canvas-component";

export interface DragItem {
  type: DragItemType;
  materialName?: string;
  componentId?: string;
}
