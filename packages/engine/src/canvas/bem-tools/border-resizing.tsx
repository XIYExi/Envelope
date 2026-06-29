/**
 * 组件缩放手柄工具
 *
 * 当鼠标悬浮在某个组件上时，在其上方绘制蓝色虚线边框 + 组件名标签。
 * 已选中的组件不显示悬停框（选中框已提供视觉反馈）。
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-29
 */
"use client";

import React, { useCallback, useRef } from "react";
import type { CanvasComponent } from "../types";
import { computePixelRect } from "./shared";
import { CELL_HEIGHT, CELL_WIDTH, allResizeDirections } from "../renderer-utils";
import { calcResizeNext, snapGridDelta, type ResizeDirection } from "../resize-utils";

/**
 * 组件缩放手柄容器属性
 */
interface BorderResizingProps {
  /** 当前选中的组件实例 */
  activeComponent: CanvasComponent | null;
  /** 网格列数 */
  gridCols: number;
  /** 每列宽度（px） */
  columnWidth: number;
  /** 网格间距（px） */
  gridGap: number;
  /** 页面内边距（px） */
  pagePadding: number;
  /** 单元格基准高度（px） */
  cellHeight: number;
  /** 缩放比例 */
  zoom: number;
  /** 布局模式 */
  positionMode: "grid" | "free";
  /** 缩放手柄点击事件处理函数 */
  onResize: (id: string, width: number, height: number, x?: number, y?: number) => void;
}

/**
 * 缩放手柄容器
 *
 * 在主选中（且未锁定）组件上覆盖一层透明容器，
 * 容器的四角和四边各放置一个 ResizeHandle 拖拽圆点。
 */
export function BorderResizing({
  activeComponent, gridCols, columnWidth, gridGap, pagePadding, cellHeight, zoom, positionMode, onResize,
}: BorderResizingProps) {
  // 没有选中或已锁定的组件不显示缩放手柄
  if (!activeComponent || activeComponent.locked)
    return null;

  // 计算选中组件的像素坐标和尺寸
  const rect = computePixelRect(
    activeComponent.position, columnWidth, gridGap, pagePadding, CELL_WIDTH, cellHeight, positionMode,
  );
  if (!rect)
    return null;

  return (
    // 透明覆盖层，与选中组件完全重叠
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
      {/* 遍历 8 个方向（n/s/e/w/ne/nw/se/sw），各渲染一个拖拽手柄 */}
      {allResizeDirections.map(dir => (
        <ResizeHandle
          key={dir}
          direction={dir}
          compId={activeComponent.id}
          startPos={activeComponent.position}
          gridCols={gridCols}
          zoom={zoom}
          onResize={onResize}
        />
      ))}
    </div>
  );
}


/**
 * 单个缩放手柄属性
 */
interface ResizeHandleProps {
  /** 手柄方向 */
  direction: ResizeDirection;
  /** 手柄所属组件 ID */
  compId: string;
  /** 手柄起始位置 */
  startPos: { x: number; y: number; width: number; height: number };
  /** 网格列数 */
  gridCols: number;
  /** 缩放比例 */
  zoom: number;
  /** 缩放手柄点击事件处理函数 */
  onResize: (id: string, width: number, height: number, x?: number, y?: number) => void;
}

// 手柄圆点直径（px）
const HANDLE_SIZE = 10;
// 手柄偏移量：使圆点中心对齐组件边框
const HANDLE_OFFSET = -HANDLE_SIZE / 2 + 1;

// 8 个方向对应的 CSS 定位和鼠标指针样式
const handlePositionStyle: Record<ResizeDirection, React.CSSProperties> = {
  n: { left: "50%", top: HANDLE_OFFSET, marginLeft: HANDLE_OFFSET, cursor: "n-resize" },
  s: { left: "50%", bottom: HANDLE_OFFSET, marginLeft: HANDLE_OFFSET, cursor: "s-resize" },
  e: { right: HANDLE_OFFSET, top: "50%", marginTop: HANDLE_OFFSET, cursor: "e-resize" },
  w: { left: HANDLE_OFFSET, top: "50%", marginTop: HANDLE_OFFSET, cursor: "w-resize" },
  ne: { top: HANDLE_OFFSET, right: HANDLE_OFFSET, cursor: "ne-resize" },
  nw: { top: HANDLE_OFFSET, left: HANDLE_OFFSET, cursor: "nw-resize" },
  se: { bottom: HANDLE_OFFSET, right: HANDLE_OFFSET, cursor: "se-resize" },
  sw: { bottom: HANDLE_OFFSET, left: HANDLE_OFFSET, cursor: "sw-resize" },
};

/**
 * 单个缩放手柄
 *
 * 白色圆形拖拽点，蓝色边框。
 * 通过 pointer 事件监听拖拽过程，实时计算新的尺寸和位置。
 */
const ResizeHandle = React.memo(function ResizeHandle({
  direction, compId, startPos, gridCols, zoom, onResize,
}: ResizeHandleProps) {
  // 是否正在拖拽中
  const isResizingRef = useRef(false);
  // 拖拽起始时鼠标的 clientX/clientY
  const startClientRef = useRef({ x: 0, y: 0 });
  // 拖拽起始时组件的 position（始终保持最新引用）
  const startStateRef = useRef(startPos);
  startStateRef.current = startPos;

  /**
   * 手柄拖拽开始处理
   *
   * 1. 记录起始鼠标位置和组件状态
   * 2. 在 window 上注册 pointermove/pointerup 监听器（支持拖拽移出手柄区域）
   * 3. 每次移动时计算 delta（已缩放和网格对齐）
   * 4. 调用 calcResizeNext 获取新的位置和尺寸
   */
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    isResizingRef.current = true;
    startClientRef.current = { x: e.clientX, y: e.clientY };

    // 拖拽移动处理
    const handleMove = (ev: PointerEvent) => {
      if (!isResizingRef.current) return;
      // 将鼠标位移转换为网格单位（除以 CELL_WIDTH/HEIGHT × zoom）
      const dx = (ev.clientX - startClientRef.current.x) / (CELL_WIDTH * zoom);
      const dy = (ev.clientY - startClientRef.current.y) / (CELL_HEIGHT * zoom);
      // 对位移进行网格吸附
      const deltaCols = snapGridDelta(dx);
      const deltaRows = snapGridDelta(dy);
      // 根据方向和位移计算新的位置和尺寸
      const next = calcResizeNext(direction, { ...startStateRef.current, gridCols }, deltaCols, deltaRows);
      onResize(compId, next.width, next.height, next.x, next.y);
    };

    // 拖拽结束处理
    const handleUp = () => {
      isResizingRef.current = false;
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };

    // 全局监听，确保拖拽过程中即使鼠标移出画布也能正常响应
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  }, [direction, compId, gridCols, zoom, onResize]);

  return (
    <div
      className={`bem-resize-handle ${direction}`}
      onPointerDown={handlePointerDown}
      style={{
        position: "absolute",
        width: HANDLE_SIZE,
        height: HANDLE_SIZE,
        borderRadius: "50%",
        border: "2px solid #3b82f6",
        backgroundColor: "#fff",
        // 手柄可交互（突破父级 pointerEvents: none）
        pointerEvents: "auto",
        zIndex: 30,
        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
        ...handlePositionStyle[direction],
      }}
    />
  );
});
