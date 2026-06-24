/**
 * 多选包围盒覆盖层
 *
 * 当选中多个组件时，渲染一个包围所有选中组件的最小外接矩形。
 *
 * @author xiye
 * @date 2026-06-25
 */

"use client";

import React from "react";
import type { CanvasComponent } from "./types";
import { CELL_HEIGHT } from "./renderer-utils";

export function BoundingBoxOverlay({ components, columnWidth, gridGap, gridCols: _gridCols }: {
  components: CanvasComponent[];
  columnWidth: number;
  gridGap: number;
  gridCols: number;
}) {
  if (components.length < 2) return null;

  const cellW = columnWidth + gridGap;
  const cellH = CELL_HEIGHT + gridGap;

  const minX = Math.min(...components.map((c) => c.position.x));
  const minY = Math.min(...components.map((c) => c.position.y));
  const maxRight = Math.max(...components.map((c) => c.position.x + c.position.width));
  const maxBottom = Math.max(...components.map((c) => c.position.y + c.position.height));

  const leftPx = (minX - 1) * cellW;
  const topPx = (minY - 1) * cellH;
  const widthPx = (maxRight - minX) * cellW - gridGap;
  const heightPx = (maxBottom - minY) * cellH - gridGap;

  return (
    <div
      className="pointer-events-none absolute border-2 border-dashed border-blue-400 bg-blue-100/20"
      style={{
        left: `${leftPx}px`,
        top: `${topPx}px`,
        width: `${widthPx}px`,
        height: `${heightPx}px`,
      }}
    />
  );
}
