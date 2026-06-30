/**
 * 组件缩放手柄工具
 *
 * 在主选中组件的边缘绘制 8 个方向的缩放手柄（n/s/e/w/ne/nw/se/sw），
 * 用户拖拽手柄即可调整组件尺寸。
 *
 * grid 模式: 像素 delta → grid 单位 (moveX / (columnWidth * zoom))
 * free 模式: 像素 delta → 直接应用 (moveX / zoom) 为像素值
 *
 * @reference lowcode-engine-main/packages/designer/src/builtin-simulator/bem-tools/border-resizing.tsx
 *
 * @author xiye
 * @version 3.0.0
 * @date 2026-06-30
 */
"use client";

import React, { useCallback, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import type { CanvasComponent } from "../types";
import { computePixelRect } from "./shared";
import { CELL_HEIGHT, CELL_WIDTH, allResizeDirections } from "../renderer-utils";
import type { ResizeDirection } from "../resize-utils";
import { DragResizeEngine } from "./drag-resize-engine";

interface BorderResizingProps {
  activeComponent: CanvasComponent | null;
  gridCols: number;
  columnWidth: number;
  gridGap: number;
  pagePadding: number;
  cellHeight: number;
  zoom: number;
  positionMode: "grid" | "free";
  onResize: (id: string, width: number, height: number, x?: number, y?: number) => void;
  onResizeStart?: () => void;
  onResizeEnd?: () => void;
}

export function BorderResizing({
  activeComponent, gridCols, columnWidth, gridGap, pagePadding, cellHeight, zoom, positionMode, onResize, onResizeStart, onResizeEnd,
}: BorderResizingProps) {
  if (!activeComponent || activeComponent.locked)
    return null;

  const rect = computePixelRect(
    activeComponent.position, columnWidth, gridGap, pagePadding, CELL_WIDTH, cellHeight, positionMode,
  );
  if (!rect) return null;

  return (
    <div
      className="bem-resize-handles"
      style={{
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        pointerEvents: "none",
        zIndex: 25,
      }}
    >
      {allResizeDirections.map(dir => (
        <ResizeHandle
          key={dir}
          direction={dir}
          compId={activeComponent.id}
          startPos={activeComponent.position}
          gridCols={gridCols}
          columnWidth={columnWidth}
          cellHeight={cellHeight}
          zoom={zoom}
          positionMode={positionMode}
          onResize={onResize}
          onResizeStart={onResizeStart}
          onResizeEnd={onResizeEnd}
        />
      ))}
    </div>
  );
}

interface ResizeHandleProps {
  direction: ResizeDirection;
  compId: string;
  startPos: { x: number; y: number; width: number; height: number };
  gridCols: number;
  columnWidth: number;
  cellHeight: number;
  zoom: number;
  positionMode: "grid" | "free";
  onResize: (id: string, width: number, height: number, x?: number, y?: number) => void;
  onResizeStart?: () => void;
  onResizeEnd?: () => void;
}

const HANDLE_SIZE = 10;
const HANDLE_OFFSET = -HANDLE_SIZE / 2 + 1;

const handlePositionStyle: Record<ResizeDirection, CSSProperties> = {
  n:  { left: "50%", top: HANDLE_OFFSET, marginLeft: HANDLE_OFFSET, cursor: "n-resize" },
  s:  { left: "50%", bottom: HANDLE_OFFSET, marginLeft: HANDLE_OFFSET, cursor: "s-resize" },
  e:  { right: HANDLE_OFFSET, top: "50%", marginTop: HANDLE_OFFSET, cursor: "e-resize" },
  w:  { left: HANDLE_OFFSET, top: "50%", marginTop: HANDLE_OFFSET, cursor: "w-resize" },
  ne: { top: HANDLE_OFFSET, right: HANDLE_OFFSET, cursor: "ne-resize" },
  nw: { top: HANDLE_OFFSET, left: HANDLE_OFFSET, cursor: "nw-resize" },
  se: { bottom: HANDLE_OFFSET, right: HANDLE_OFFSET, cursor: "se-resize" },
  sw: { bottom: HANDLE_OFFSET, left: HANDLE_OFFSET, cursor: "sw-resize" },
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

const ResizeHandle = React.memo(function ResizeHandle({
  direction, compId, startPos, gridCols, columnWidth, cellHeight, zoom, positionMode, onResize, onResizeStart, onResizeEnd,
}: ResizeHandleProps) {
  const handleRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<DragResizeEngine | null>(null);

  const startPosRef = useRef(startPos);
  startPosRef.current = startPos;
  const gridColsRef = useRef(gridCols);
  gridColsRef.current = gridCols;
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;
  const columnWidthRef = useRef(columnWidth);
  columnWidthRef.current = columnWidth;
  const cellHeightRef = useRef(cellHeight);
  cellHeightRef.current = cellHeight;
  const positionModeRef = useRef(positionMode);
  positionModeRef.current = positionMode;
  const onResizeRef = useRef(onResize);
  onResizeRef.current = onResize;
  const onResizeStartRef = useRef(onResizeStart);
  onResizeStartRef.current = onResizeStart;
  const onResizeEndRef = useRef(onResizeEnd);
  onResizeEndRef.current = onResizeEnd;

  const bind = useCallback(() => {
    const el = handleRef.current;
    if (!el) return;

    if (engineRef.current) {
      engineRef.current.destroy();
    }

    const engine = new DragResizeEngine();
    engineRef.current = engine;

    const unsubResize = engine.onResize(({ moveX, moveY, direction: dir }) => {
      const isFree = positionModeRef.current === "free";
      const z = zoomRef.current > 0 ? zoomRef.current : 1;

      if (isFree) {
        // free 模式: moveX/moveY 是屏幕像素 delta，除以 zoom 转画布像素
        const px = moveX / z;
        const py = moveY / z;
        const s = startPosRef.current;

        let nextX = s.x;
        let nextY = s.y;
        let nextW = s.width;
        let nextH = s.height;

        if (dir.includes("e")) { nextW = Math.max(1, s.width + px); }
        if (dir.includes("w")) { nextX = s.x + px; nextW = Math.max(1, s.width - px); }
        if (dir.includes("s")) { nextH = Math.max(1, s.height + py); }
        if (dir.includes("n")) { nextY = s.y + py; nextH = Math.max(1, s.height - py); }

        onResizeRef.current(compId, Math.round(nextW), Math.round(nextH), Math.round(nextX), Math.round(nextY));
        return;
      }

      // grid 模式: 使用动态 columnWidth/cellHeight（非 CELL_WIDTH=80 硬编码）
      const colW = columnWidthRef.current > 0 ? columnWidthRef.current : CELL_WIDTH;
      const rowH = cellHeightRef.current > 0 ? cellHeightRef.current : CELL_HEIGHT;

      const dx = moveX / (colW * z);
      const dy = moveY / (rowH * z);

      // 对齐到整网格值
      const eps = 1e-6;
      const deltaCols = dx >= 0 ? Math.floor(dx + eps) : Math.ceil(dx - eps);
      const deltaRows = dy >= 0 ? Math.floor(dy + eps) : Math.ceil(dy - eps);

      const s = startPosRef.current;
      const gCols = gridColsRef.current;

      let nextX = s.x;
      let nextY = s.y;
      let nextW = s.width;
      let nextH = s.height;

      if (dir.includes("e")) {
        const maxW = gCols - s.x + 1;
        const d = clamp(deltaCols, -(s.width - 1), maxW - s.width);
        nextW = s.width + d;
      }
      if (dir.includes("w")) {
        const minD = -(s.x - 1);
        const maxD = s.width - 1;
        const d = clamp(deltaCols, minD, maxD);
        nextX = s.x + d;
        nextW = s.width - d;
      }
      if (dir.includes("s")) {
        const d = Math.max(-(s.height - 1), deltaRows);
        nextH = s.height + d;
      }
      if (dir.includes("n")) {
        const minD = -(s.y - 1);
        const maxD = s.height - 1;
        const d = clamp(deltaRows, minD, maxD);
        nextY = s.y + d;
        nextH = s.height - d;
      }

      nextX = clamp(nextX, 1, gCols);
      const maxWidthByX = gCols - nextX + 1;
      nextW = clamp(nextW, 1, maxWidthByX);
      nextY = Math.max(1, nextY);
      nextH = Math.max(1, nextH);

      onResizeRef.current(compId, nextW, nextH, nextX, nextY);
    });

    const unsubResizeStart = engine.onResizeStart(() => {
      onResizeStartRef.current?.();
    });
    const unsubResizeEnd = engine.onResizeEnd(() => {
      onResizeEndRef.current?.();
    });

    const unBind = engine.from(el, direction);

    return () => {
      unBind();
      unsubResize();
      unsubResizeStart();
      unsubResizeEnd();
      engine.destroy();
      engineRef.current = null;
    };
  }, [direction, compId]);

  useEffect(() => {
    const cleanup = bind();
    return () => { cleanup?.(); };
  }, [bind]);

  return (
    <div
      ref={handleRef}
      className={`bem-resize-handle ${direction}`}
      style={{
        position: "absolute",
        width: HANDLE_SIZE,
        height: HANDLE_SIZE,
        borderRadius: "50%",
        border: "2px solid #3b82f6",
        backgroundColor: "#fff",
        pointerEvents: "auto",
        zIndex: 30,
        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
        ...handlePositionStyle[direction],
      }}
    />
  );
});
