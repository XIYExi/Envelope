/**
 * 智能对齐辅助线系统
 *
 * 在拖拽过程中计算并显示对齐辅助线，帮助用户精确定位组件。
 *
 * @author xiye
 * @date 2026-06-25
 */

"use client";

import React from "react";
import type { CanvasComponent } from "./types";

/** 对齐辅助线定义 */
export interface AlignGuide {
  axis: "h" | "v";
  position: number;
}

/**
 * 计算拖拽对齐辅助线
 *
 * 比较被拖组件与所有其他组件的六种边缘（左/右/水平中/上/下/垂直中），
 * 当距离小于 threshold px 时生成对应的辅助线。
 */
export function computeAlignGuides(
  dragInfo: { gridX: number; gridY: number; gridWidth: number; gridHeight: number },
  components: CanvasComponent[],
  colW: number,
  gap: number,
  cellH: number,
  threshold = 5,
): AlignGuide[] {
  const cellW = colW + gap;
  const cellHTotal = cellH + gap;

  const dLeft = (dragInfo.gridX - 1) * cellW;
  const dTop = (dragInfo.gridY - 1) * cellHTotal;
  const dRight = dLeft + dragInfo.gridWidth * colW + (dragInfo.gridWidth - 1) * gap;
  const dBottom = dTop + dragInfo.gridHeight * cellH + (dragInfo.gridHeight - 1) * gap;
  const dCenterX = (dLeft + dRight) / 2;
  const dCenterY = (dTop + dBottom) / 2;

  const guides: AlignGuide[] = [];

  for (const comp of components) {
    if (comp.hidden) continue;

    const cx = comp.position.x;
    const cy = comp.position.y;
    const cw = comp.position.width;
    const ch = comp.position.height;

    const cLeft = (cx - 1) * cellW;
    const cTop = (cy - 1) * cellHTotal;
    const cRight = cLeft + cw * colW + (cw - 1) * gap;
    const cBottom = cTop + ch * cellH + (ch - 1) * gap;
    const cCenterX = (cLeft + cRight) / 2;
    const cCenterY = (cTop + cBottom) / 2;

    if (Math.abs(dLeft - cLeft) < threshold) guides.push({ axis: "v", position: dLeft });
    else if (Math.abs(dCenterX - cCenterX) < threshold) guides.push({ axis: "v", position: dCenterX });
    else if (Math.abs(dRight - cRight) < threshold) guides.push({ axis: "v", position: dRight });

    if (Math.abs(dTop - cTop) < threshold) guides.push({ axis: "h", position: dTop });
    else if (Math.abs(dCenterY - cCenterY) < threshold) guides.push({ axis: "h", position: dCenterY });
    else if (Math.abs(dBottom - cBottom) < threshold) guides.push({ axis: "h", position: dBottom });
  }

  const seen = new Set<string>();
  const unique: AlignGuide[] = [];
  for (const g of guides) {
    const key = `${g.axis}:${Math.round(g.position)}`;
    if (!seen.has(key)) { seen.add(key); unique.push(g); }
  }
  return unique;
}

/**
 * 对齐辅助线覆盖层
 *
 * 在拖拽过程中显示蓝色虚线对齐指示线。
 */
export function SmartGuideOverlay({ guides }: { guides: AlignGuide[] }) {
  if (guides.length === 0) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-50">
      {guides.map((g, i) =>
        g.axis === "v" ? (
          <div
            key={i}
            className="absolute top-0 h-full w-0 border-l-2 border-dashed border-blue-400/80"
            style={{ left: `${g.position}px` }}
          />
        ) : (
          <div
            key={i}
            className="absolute left-0 w-full h-0 border-t-2 border-dashed border-blue-400/80"
            style={{ top: `${g.position}px` }}
          />
        ),
      )}
    </div>
  );
}
