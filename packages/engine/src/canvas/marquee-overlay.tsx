/**
 * 框选覆盖层
 *
 * 在画布空白区拖拽时显示蓝色半透明矩形，表示框选范围。
 *
 * @author xiye
 * @date 2026-06-25
 */

"use client";

import React from "react";

export function MarqueeOverlay({ marquee }: { marquee: { startX: number; startY: number; currentX: number; currentY: number } }) {
  const left = Math.min(marquee.startX, marquee.currentX);
  const top = Math.min(marquee.startY, marquee.currentY);
  const width = Math.abs(marquee.currentX - marquee.startX);
  const height = Math.abs(marquee.currentY - marquee.startY);

  if (width < 1 && height < 1) return null;

  return (
    <div
      className="pointer-events-none absolute z-50 border-2 border-blue-400 bg-blue-100/30"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  );
}
