/**
 * BEM Tools 共享工具函数
 *
 * 提供网格坐标到像素坐标的转换函数，
 * 供所有 BEM Tools 子组件使用。
 * 
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-29
 */

import type { CanvasComponent } from "../types";

/**
 * 像素坐标系中的矩形区域
 */
export interface PixelRect {
  /** 左上角 X 坐标（px） */
  x: number;
  /** 左上角 Y 坐标（px） */
  y: number;
  /** 矩形宽度（px） */
  width: number;
  /** 矩形高度（px） */
  height: number;
}

/**
 * 将组件的网格单位位置转换为像素坐标
 *
 * 在 grid 模式下，x/y 是网格列/行号（从 1 开始），width/height 是跨度。
 * 在 free 模式下，x/y 是像素值，width/height 是跨度（仍需换算为像素）。
 *
 * 返回值是画布内部的像素坐标（未应用 zoom 和 pan），
 * 调用方（如 CanvasRenderer 中的 BemTools 容器）负责全局偏移。
 */
export function computePixelRect(
  position: CanvasComponent["position"],
  columnWidth: number,
  gap: number,
  padding: number,
  cellWidth: number,
  cellHeight: number,
  positionMode: "grid" | "free",
): PixelRect | null {
  const { x, y, width, height } = position;

  // 宽或高小于 1 格时返回 null，避免渲染异常
  if (width < 1 || height < 1) return null;

  // 自由布局模式：直接用像素坐标，宽高按跨度乘基准尺寸
  if (positionMode === "free") {
    return {
      x,
      y,
      width: width * (columnWidth || cellWidth),
      height: height * cellHeight,
    };
  }

  // 网格布局模式：将网格坐标换算为像素坐标
  // X = (列号 - 1) × (列宽 + 间距) + 内边距
  // Y = (行号 - 1) × (行高 + 间距) + 内边距
  // 宽度 = 跨度 × 列宽 + (跨度 - 1) × 间距
  // 高度 = 跨度 × 行高 + (跨度 - 1) × 间距
  return {
    x: (x - 1) * (columnWidth + gap) + padding,
    y: (y - 1) * (cellHeight + gap) + padding,
    width: width * columnWidth + (width - 1) * gap,
    height: height * cellHeight + (height - 1) * gap,
  };
}
