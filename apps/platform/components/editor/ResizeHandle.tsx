/**
 * 面板宽度拖拽手柄
 *
 * 渲染在面板边缘，用户拖拽可调整相邻面板的宽度。
 * 折叠时隐藏，拖拽中使用 PointerEvent 实现高精度交互。
 *
 * @author xiye
 * @date 2026-06-23
 */
"use client";

import { useCallback, useRef } from "react";

interface ResizeHandleProps {
  /** 拖拽方向：'left' 表示拖动手柄使左侧面板变宽，'right' 表示使右侧面板变宽 */
  edge: "left" | "right";
  /** 面板当前宽度（px） */
  panelWidth: number;
  /** 宽度变更回调 */
  onResize: (newWidth: number) => void;
  /** 最小宽度（px） */
  minWidth: number;
  /** 最大宽度（px） */
  maxWidth: number;
  /** 面板是否折叠（折叠时隐藏手柄） */
  collapsed: boolean;
}

/**
 * 面板宽度拖拽手柄
 *
 * 放置于面板与画布之间，鼠标拖拽时实时调整面板宽度。
 * 使用 PointerEvent 实现，支持精确控制。
 */
export function ResizeHandle({
  edge,
  panelWidth,
  onResize,
  minWidth,
  maxWidth,
  collapsed,
}: ResizeHandleProps) {
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      draggingRef.current = true;
      startXRef.current = e.clientX;
      startWidthRef.current = panelWidth;
    },
    [panelWidth],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current) return;
      const deltaX = e.clientX - startXRef.current;
      const delta = edge === "right" ? deltaX : -deltaX;
      const newWidth = Math.min(maxWidth, Math.max(minWidth, Math.round(startWidthRef.current + delta)));
      onResize(newWidth);
    },
    [edge, minWidth, maxWidth, onResize],
  );

  const handlePointerUp = useCallback(() => {
    draggingRef.current = false;
  }, []);

  if (collapsed) return null;

  return (
    <div
      className="group relative shrink-0"
      style={{ width: "6px", cursor: "col-resize" }}
    >
      <div
        className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full transition-colors group-hover:bg-blue-400/60 group-active:bg-blue-500/80"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ touchAction: "none" }}
      />
    </div>
  );
}
