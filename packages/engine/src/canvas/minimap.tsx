/**
 * 画布小地图组件
 *
 * 显示当前画布所有组件的缩略布局，
 * 蓝色矩形标识当前视口可见范围，
 * 支持点击/拖拽导航画布。
 *
 * @author xiye
 * @date 2026-06-24
 */

"use client";

import { useMemo, useRef, useCallback } from "react";
import type { CanvasComponent } from "./types";

interface MinimapProps {
  /** 画布上的所有组件 */
  components: CanvasComponent[];
  /** 当前缩放比例 */
  zoom: number;
  /** 水平平移偏移量（px） */
  panX: number;
  /** 垂直平移偏移量（px） */
  panY: number;
  /** 视口宽度（px） */
  viewportWidth: number;
  /** 视口高度（px） */
  viewportHeight: number;
  /** 每列的像素宽度 */
  columnWidth: number;
  /** 网格列数 */
  gridCols: number;
  /** 网格间距（px） */
  gridGap: number;
  /** 每行的像素高度 */
  cellHeight: number;
  /** 平移回调 */
  onPan: (x: number, y: number) => void;
  /** 缩放回调 */
  onZoom: (zoom: number) => void;
}

/** 小地图的固定像素尺寸 */
const MINIMAP_WIDTH = 160;
const MINIMAP_HEIGHT = 120;

/**
 * 画布小地图组件
 *
 * 在画布右下角渲染一个缩略图，显示所有组件的布局轮廓，
 * 蓝色边框表示当前视口的可见范围。
 * 点击小地图任意位置可将视口中心移至该位置。
 */
export function Minimap({
  components, zoom, panX, panY, viewportWidth, viewportHeight,
  columnWidth, gridCols, gridGap, cellHeight,
  onPan,
}: MinimapProps) {
  // 计算画布内容的总宽高（像素）
  const contentBounds = useMemo(() => {
    if (components.length === 0) return { width: viewportWidth, height: 600 };
    const maxRight = Math.max(...components.map((c) => (c.position.x + c.position.width) * (columnWidth + gridGap)));
    const maxBottom = Math.max(...components.map((c) => (c.position.y + c.position.height) * (cellHeight + gridGap)));
    return {
      width: Math.max(viewportWidth, maxRight),
      height: Math.max(600, maxBottom),
    };
  }, [components, columnWidth, gridGap, cellHeight, viewportWidth]);

  // 缩略比例：将内容缩放到小地图尺寸内
  const scale = useMemo(() => {
    const sx = MINIMAP_WIDTH / contentBounds.width;
    const sy = MINIMAP_HEIGHT / contentBounds.height;
    return Math.min(sx, sy, 1);
  }, [contentBounds]);

  // 视口矩形（蓝色框）在小地图中的坐标和尺寸
  const viewportRect = useMemo(() => {
    const vpLeft = (-panX - 16) * scale;
    const vpTop = (-panY - 16) * scale;
    const vpW = (viewportWidth / zoom) * scale;
    const vpH = (viewportHeight / zoom) * scale;
    return { left: vpLeft, top: vpTop, width: vpW, height: vpH };
  }, [panX, panY, zoom, scale, viewportWidth, viewportHeight]);

  const isDragging = useRef(false);

  /**
   * 鼠标按下小地图时，将视口导航到点击位置
   */
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / scale;
    const my = (e.clientY - rect.top) / scale;
    const newPanX = -mx + viewportWidth / 2 / zoom;
    const newPanY = -my + viewportHeight / 2 / zoom;
    onPan(newPanX, newPanY);
  }, [scale, viewportWidth, viewportHeight, zoom, onPan]);

  return (
    <div
      className="absolute bottom-3 right-3 z-50 overflow-hidden rounded-lg border bg-background shadow-lg"
      style={{ width: MINIMAP_WIDTH, height: MINIMAP_HEIGHT }}
    >
      <svg
        width={MINIMAP_WIDTH}
        height={MINIMAP_HEIGHT}
        viewBox={`0 0 ${MINIMAP_WIDTH} ${MINIMAP_HEIGHT}`}
        className="cursor-pointer"
        onMouseDown={handleMouseDown}
      >
        {/* 背景 */}
        <rect width={MINIMAP_WIDTH} height={MINIMAP_HEIGHT} fill="transparent" />

        {/* 组件矩形 */}
        {components.map((comp) => (
          <rect
            key={comp.id}
            x={comp.position.x * (columnWidth + gridGap) * scale}
            y={comp.position.y * (cellHeight + gridGap) * scale}
            width={comp.position.width * (columnWidth + gridGap) * scale}
            height={comp.position.height * (cellHeight + gridGap) * scale}
            fill={comp.locked ? "oklch(0.7 0 0 / 0.4)" : "oklch(0.5 0.1 240 / 0.5)"}
            rx={1}
          />
        ))}

        {/* 视口框（蓝色边框） */}
        <rect
          x={Math.max(0, viewportRect.left)}
          y={Math.max(0, viewportRect.top)}
          width={Math.min(MINIMAP_WIDTH - Math.max(0, viewportRect.left), viewportRect.width)}
          height={Math.min(MINIMAP_HEIGHT - Math.max(0, viewportRect.top), viewportRect.height)}
          fill="none"
          stroke="oklch(0.6 0.2 240)"
          strokeWidth={1.5}
          rx={1}
        />
      </svg>
    </div>
  );
}
