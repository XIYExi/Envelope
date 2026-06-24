/**
 * 画布单组件渲染项
 *
 * 包装 useDraggable/useDroppable hook 绑定，
 * 提供缩放手柄交互、选中态/拖拽态/锁定态渲染。
 *
 * @author xiye
 * @date 2026-06-25
 */

"use client";

import React, { useCallback } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import type { CSSProperties } from "react";
import type { MouseEvent as RMouseEvent, PointerEvent as RPointerEvent } from "react";
import type { CanvasComponent } from "./types";
import { createComponentDragItem } from "./dnd";
import { isContainerType } from "../shared/canvas-utils";
import { useCtrlDown } from "./ctrl-context";
import { cn, CELL_HEIGHT, CELL_WIDTH, allResizeDirections, resizeHandleStyles } from "./renderer-utils";
import { calcResizeNext, snapGridDelta } from "./resize-utils";
import { SelectChildContext, UnifiedSimulatedContent } from "./simulated-content";

/**
 * 单个画布组件的渲染包装器
 *
 * 为每个组件绑定 useDraggable（可拖拽）和 useDroppable（容器可接收拖入），
 * 同时保留原有选中、缩放手柄等功能。
 */
export const CanvasComponentItem = React.memo(function CanvasComponentItem({
  comp, x, y, width, height, isSelected, isHovered, previewTailwind,
  gridCols, zoom, onSelect, onHover, onResize, activeResizeCleanupRef,
  isPrimary, onSelectChild, onDoubleClick, isDimmed, minRowHeight,
  positionMode = "grid", columnWidth,
}: {
  comp: CanvasComponent;
  x: number; y: number; width: number; height: number;
  isSelected: boolean; isHovered: boolean; previewTailwind: string;
  gridCols: number; zoom: number;
  onSelect: (id: string, multi?: boolean) => void;
  onHover: (id: string | null) => void;
  onResize: (id: string, width: number, height: number, x?: number, y?: number) => void;
  activeResizeCleanupRef: React.MutableRefObject<(() => void) | null>;
  isPrimary?: boolean;
  onSelectChild?: (nodeId: string) => void;
  onDoubleClick?: (e: React.MouseEvent) => void;
  isDimmed?: boolean;
  minRowHeight?: number;
  positionMode?: "grid" | "free";
  columnWidth?: number;
}) {
  const isLocked = comp.locked === true;

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `canvas-comp:${comp.id}`,
    data: createComponentDragItem(comp.id),
    disabled: isLocked,
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `canvas-container:${comp.id}`,
    data: { parentId: comp.id, type: comp.node.type },
    disabled: !isContainerType(comp.node.type),
  });

  const ctrlDown = useCtrlDown();

  const mergedRef = useCallback((node: HTMLDivElement | null) => {
    setNodeRef(node);
    setDropRef(node);
  }, [setNodeRef, setDropRef]);

  const handleMouseEnter = useCallback(() => { onHover(comp.id); }, [comp.id, onHover]);
  const handleMouseLeave = useCallback(() => { onHover(null); }, [onHover]);

  const handleClick = useCallback((e: RMouseEvent) => {
    e.stopPropagation();
    onSelect(comp.id, e.ctrlKey || e.metaKey || e.shiftKey);
  }, [comp.id, onSelect]);

  return (
    <div
      ref={mergedRef}
      data-canvas-comp="true"
      data-canvas-comp-id={comp.id}
      data-testid={`canvas-comp-${comp.id}`}
      className={cn(
        previewTailwind,
        "group relative rounded-md border transition-all duration-100",
        isSelected && isPrimary
          ? "border-blue-500 ring-2 ring-blue-200 shadow-md z-20"
          : isSelected && !isPrimary
            ? "border-blue-300 border-dashed ring-1 ring-blue-100/50 z-20"
            : isHovered
              ? "border-blue-400 ring-1 ring-blue-100 shadow-sm z-10"
              : "border-transparent",
        isDragging && "opacity-50",
        isOver && isContainerType(comp.node.type)
          ? "ring-2 ring-blue-400 bg-blue-50/30"
          : isOver && !isContainerType(comp.node.type)
            ? "ring-2 ring-red-300 bg-red-50/20"
            : "",
        isDimmed && "opacity-30 pointer-events-none",
      )}
      style={positionMode === "free" ? {
        position: "absolute" as const,
        left: `${x}px`,
        top: `${y}px`,
        width: `${width * (columnWidth ?? CELL_WIDTH)}px`,
        minHeight: (minRowHeight ?? CELL_HEIGHT) > 0 ? `${height * (minRowHeight ?? CELL_HEIGHT)}px` : `${CELL_HEIGHT * height}px`,
      } : {
        gridColumn: `${x} / span ${width}`,
        gridRow: `${y} / span ${height}`,
        minHeight: (minRowHeight ?? CELL_HEIGHT) > 0 ? `${height * (minRowHeight ?? CELL_HEIGHT)}px` : undefined,
      } as CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      {...listeners}
      {...attributes}
    >
      {isContainerType(comp.node.type) && (
        <div className={cn(
          "absolute left-1 top-1 z-30 rounded px-1.5 py-0.5 text-[9px] font-medium text-white",
          isSelected ? "bg-blue-500" : isHovered ? "bg-blue-400/80" : "bg-blue-500/80",
        )}>
          {comp.node.type}
        </div>
      )}

      {isOver && (
        <div className={cn(
          "absolute right-1 top-1 z-30 rounded px-1.5 py-0.5 text-[9px] font-medium shadow-sm",
          isContainerType(comp.node.type)
            ? "bg-blue-500 text-white"
            : "bg-red-400 text-white",
        )}>
          {isContainerType(comp.node.type) ? "+ 可放入" : "⛔ 不允许"}
        </div>
      )}

      <div
        className="h-full w-full"
        style={{ pointerEvents: ctrlDown ? "auto" : "none" } as CSSProperties}
        data-ctrl-gate="true"
      >
        <SelectChildContext.Provider value={onSelectChild ?? null}>
          <UnifiedSimulatedContent comp={comp} variant="root" />
        </SelectChildContext.Provider>
      </div>

      {isSelected && (
        <div className="absolute -right-1.5 -top-1.5 z-30 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white shadow transition-transform duration-150 scale-100">
          ✓
        </div>
      )}

      {isSelected && !isLocked && allResizeDirections.map((dir) => (
        <div
          key={dir}
          data-canvas-resize-handle={dir}
          data-testid={`canvas-resize-handle-${comp.id}-${dir}`}
          className="absolute z-10 rounded-full border border-blue-500 bg-white hover:bg-blue-100"
          style={{ ...resizeHandleStyles[dir], touchAction: "none" }}
          onPointerDown={(e: RPointerEvent<HTMLDivElement>) => {
            e.stopPropagation();
            e.preventDefault();
            activeResizeCleanupRef.current?.();

            const el = e.currentTarget;
            const pointerId = e.pointerId;
            const startClientX = e.clientX;
            const startClientY = e.clientY;

            const startState = { x, y, width, height, gridCols };
            let lastSent = { x, y, width, height };

            const syncResize = (ev: PointerEvent) => {
              if (ev.pointerId !== pointerId) return;

              const rawDx = (ev.clientX - startClientX) / (CELL_WIDTH * zoom);
              const rawDy = (ev.clientY - startClientY) / (CELL_HEIGHT * zoom);
              const deltaCols = snapGridDelta(rawDx);
              const deltaRows = snapGridDelta(rawDy);

              const next = calcResizeNext(dir, startState, deltaCols, deltaRows);

              if (
                next.x === lastSent.x
                && next.y === lastSent.y
                && next.width === lastSent.width
                && next.height === lastSent.height
              ) {
                return;
              }

              lastSent = next;
              onResize(comp.id, next.width, next.height, next.x, next.y);
            };

            const cleanup = () => {
              try {
                el.releasePointerCapture(pointerId);
              } catch {
                // ignore release error
              }
              el.removeEventListener("pointermove", syncResize);
              el.removeEventListener("pointerup", cleanup);
              el.removeEventListener("pointercancel", cleanup);
              el.removeEventListener("lostpointercapture", cleanup);
              window.removeEventListener("pointermove", syncResize);
              window.removeEventListener("pointerup", cleanup);
              window.removeEventListener("pointercancel", cleanup);
              activeResizeCleanupRef.current = null;
            };

            el.addEventListener("pointermove", syncResize);
            el.addEventListener("pointerup", cleanup);
            el.addEventListener("pointercancel", cleanup);
            el.addEventListener("lostpointercapture", cleanup);
            let captured = false;
            try {
              el.setPointerCapture(pointerId);
              captured = el.hasPointerCapture(pointerId);
            } catch {
              captured = false;
            }
            if (!captured) {
              window.addEventListener("pointermove", syncResize);
              window.addEventListener("pointerup", cleanup);
              window.addEventListener("pointercancel", cleanup);
            }
            activeResizeCleanupRef.current = cleanup;
          }}
        />
      ))}
    </div>
  );
});
