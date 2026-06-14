/**
 * 拖拽与网格工具函数
 *
 * 提供画布拖拽操作和网格对齐的工具函数：
 * - 拖拽项工厂函数：创建不同类型的 DragItem
 * - 网格对齐：像素值与网格单位的相互转换
 *
 * 画布使用 12 列 CSS Grid 布局，所有组件的位置和尺寸
 * 都需要对齐到网格单元格，避免出现像素级的错位。
 *
 * @author xiye
 * @date 2026/6/13
 */
import type { DragItem } from "./types";

/**
 * 拖拽类型常量
 *
 * 与 DragItemType 对应的运行时常量，
 * 避免在代码中硬编码字符串。
 */
export const DND_TYPES = {
  /** 从素材面板拖出的新组件 */
  MATERIAL: "material",
  /** 在画布内拖动的已有组件 */
  CANVAS_COMPONENT: "canvas-component",
} as const;

/**
 * 创建素材拖拽项
 *
 * 从左侧素材面板拖出新组件时调用，
 * 记录被拖拽的组件类型名称（如 "Button"）。
 *
 * @param materialName - 组件类型名称，如 "Button"、"Card"
 * @returns DragItem 对象，type 为 "material"
 */
export function createMaterialDragItem(materialName: string): DragItem {
  return {
    type: "material",
    materialName,
  };
}

/**
 * 创建画布组件拖拽项
 *
 * 在画布内拖动已有组件（改变位置）时调用，
 * 记录被拖动组件的 ID。
 *
 * @param componentId - 画布组件的 ID
 * @returns DragItem 对象，type 为 "canvas-component"
 */
export function createComponentDragItem(componentId: string): DragItem {
  return {
    type: "canvas-component",
    componentId,
  };
}

/**
 * 网格对齐（吸附）
 *
 * 将像素值对齐到最近的网格边界，实现"吸附"效果。
 * 例如：gridSnap(85, 80) 返回 80，gridSnap(82, 80) 返回 80
 *
 * @param value - 原始像素值
 * @param gridSize - 网格单元格大小（px）
 * @returns 对齐后的像素值
 */
export function gridSnap(value: number, gridSize: number): number {
  if (gridSize <= 0) return value;
  return Math.round(value / gridSize) * gridSize;
}

/**
 * 像素转网格单位
 *
 * 将像素坐标转换为网格列/行号。
 * 例如：pixelToGrid(160, 80) 返回 2（第 2 列）
 *
 * @param pixel - 像素坐标
 * @param cellSize - 单个网格单元格的像素大小
 * @returns 网格单位（整数）
 */
export function pixelToGrid(pixel: number, cellSize: number): number {
  if (cellSize <= 0) return pixel;
  return Math.round(pixel / cellSize);
}

/**
 * 网格单位转像素
 *
 * 将网格列/行号转换为像素坐标。
 * 例如：gridToPixel(2, 80) 返回 160（px）
 *
 * @param grid - 网格单位（整数）
 * @param cellSize - 单个网格单元格的像素大小
 * @returns 像素值
 */
export function gridToPixel(grid: number, cellSize: number): number {
  if (cellSize <= 0) return grid;
  return grid * cellSize;
}

/** 画布默认列数（12 列 Grid 布局） */
export const CANVAS_GRID_COLS = 12;

/** 画布默认网格间距（4px） */
export const CANVAS_GRID_GAP = 4;

/** 单个网格单元格的像素宽度（80px，配合 12 列 = 960px 总宽） */
export const CANVAS_CELL_SIZE = 80;
