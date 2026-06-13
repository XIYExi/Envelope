import type { DragItem } from "./types";

export const DND_TYPES = {
  MATERIAL: "material",
  CANVAS_COMPONENT: "canvas-component",
} as const;

export function createMaterialDragItem(materialName: string): DragItem {
  return {
    type: "material",
    materialName,
  };
}

export function createComponentDragItem(componentId: string): DragItem {
  return {
    type: "canvas-component",
    componentId,
  };
}

export function gridSnap(value: number, gridSize: number): number {
  return Math.round(value / gridSize) * gridSize;
}

export function pixelToGrid(pixel: number, cellSize: number): number {
  return Math.round(pixel / cellSize);
}

export function gridToPixel(grid: number, cellSize: number): number {
  return grid * cellSize;
}

export const CANVAS_GRID_COLS = 12;
export const CANVAS_GRID_GAP = 4;
export const CANVAS_CELL_SIZE = 80;
