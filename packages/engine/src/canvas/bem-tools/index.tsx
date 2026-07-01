/**
 * BEM Tools 组件
 */

"use client";

import { useMemo } from "react";
import type { CanvasComponent, DropTargetInfo, DomRectEntry } from "../types";
import type { CanvasHost } from "../canvas-host";
import { bemToolsManager } from "./manager";
import { BorderSelecting } from "./border-selecting";
import { BorderDetecting } from "./border-detecting";
import { BorderContainer } from "./border-container";
import { BorderResizing } from "./border-resizing";
import { InsertionView } from "./insertion";

export { bemToolsManager } from "./manager";
export type { BemToolComponent } from "./manager";

export interface BemToolsProps {
  /** 画布统一协调层（坐标系统一入口） */
  host: CanvasHost;
  /**
   * 组件实例
   */
  components: CanvasComponent[];
  /**
   * 选中组件 ID 列表
   */
  selectedIds: string[];
  /**
   * 当前选中组件 ID
   */
  activeNodeId: string | null;
  /**
   * 当前悬停组件 ID
   */
  hoveredId: string | null;
  /**
   * 组件网格列数
   */
  columnWidth: number;
  /**
   * 组件网格间距
   */
  gridGap: number;
  /**
   * 页面内边距
   */
  pagePadding: number;
  /**
   * 组件网格单元格宽度
   */
  cellWidth: number;
  /**
   * 组件网格单元格高度
   */
  cellHeight: number;
  /**
   * 组件网格列数
   */
  gridCols: number;
  /**
   * 缩放比例
   */
  zoom: number;
  /**
   * 水平平移偏移量（px）
   */
  panX: number;
  /**
   * 垂直平移偏移量（px）
   */
  panY: number;
  /**
   * 组件位置模式
   */
  positionMode: "grid" | "free";
  /**
   * 组件缩放回调
   */
  onResize: (id: string, width: number, height: number, x?: number, y?: number) => void;
  /**
   * 组件删除回调
   */
  onDeleteComponent: (id: string) => void;
  /**
   * 组件复制回调
   */
  onCopyComponent: (id: string) => void;
  /**
   * 组件锁定/解锁回调
   */
  onLockToggle: (id: string) => void;
  /**
   * BEM: 拖拽插入位置信息
   */
  dropTarget: DropTargetInfo | null;
  /**
   * 画布组件 DOM 矩形注册表（id → 实际像素矩形），
   * 由 CanvasRenderer 的 ResizeObserver 批量采集。
   * V6: 已废弃，通过 host.getComponentRect() 统一获取。
   */
  domRects?: Record<string, DomRectEntry>;
  /**
   * 缩放开始时回调（禁用悬停检测）
   */
  onResizeStart?: () => void;
  /**
   * 缩放结束时回调（恢复悬停检测）
   */
  onResizeEnd?: () => void;
  /**
   * 画布是否正在滚动/平移中（抑制悬停框闪烁）
   */
  isScrolling?: boolean;
  /**
   * 是否正在拖拽组件（抑制悬停框、隐藏选中工具栏）
   */
  isDragging?: boolean;
  /**
   * 是否正在缩放组件（抑制悬停框闪烁）
   */
  isResizing?: boolean;
}

export function BemTools(props: BemToolsProps) {
  const {
    host, components, selectedIds, activeNodeId, hoveredId,
    columnWidth, gridGap, pagePadding, cellWidth, cellHeight, gridCols,
    zoom, panX, panY, positionMode, onResize, onDeleteComponent, onCopyComponent, onLockToggle, dropTarget,
    onResizeStart, onResizeEnd, isScrolling, isDragging, isResizing,
  } = props;

  // 同步运行时数据到 host（每帧更新）
  useMemo(() => {
    host.setComponents(components);
    host.setSelectedIds(selectedIds);
  }, [host, components, selectedIds]);

  // 当前选中组件实例
  const activeComponent = activeNodeId
    ? components.find(c => c.id === activeNodeId && !c.hidden) ?? null
    : null;
  // 插件工具组件实例
  const pluginTools = bemToolsManager.getAll();

  return (
    <div
      className="bem-tools-layer"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 50,
        overflow: "visible",
      }}
    >
      {/* 组件悬停检测工具 — 拖拽/滚动/缩放时抑制显示，参考 vp.scrolling + dragon.dragging */}
      <BorderDetecting
        hoveredId={hoveredId}
        components={components}
        selectedIds={selectedIds}
        host={host}
        isScrolling={isScrolling}
        isDragging={isDragging}
        isResizing={isResizing}
      />

      {/* 容器边界指示器 — 拖拽时显示目标容器边界 */}
      <BorderContainer
        dropTarget={dropTarget}
        components={components}
        host={host}
      />

      {/* 组件选中工具 — 工具栏按钮由 buildAvailableActions 动态驱动，拖拽中隐藏工具栏 */}
      <BorderSelecting
        components={components}
        selectedIds={selectedIds}
        activeNodeId={activeNodeId}
        host={host}
        onDeleteComponent={onDeleteComponent}
        onCopyComponent={onCopyComponent}
        onLockToggle={onLockToggle}
        isDragging={isDragging}
      />

      {/* 组件缩放工具 */}
      <BorderResizing
        activeComponent={activeComponent}
        gridCols={gridCols}
        columnWidth={columnWidth}
        gridGap={gridGap}
        pagePadding={pagePadding}
        cellHeight={cellHeight}
        zoom={zoom}
        positionMode={positionMode}
        onResize={onResize}
        onResizeStart={onResizeStart}
        onResizeEnd={onResizeEnd}
      />

      {/* 拖拽插入位置指示器 */}
      <InsertionView dropTarget={dropTarget} />

      {/* 插件工具 */}
      {pluginTools.map((Tool, i) => (
        <Tool key={i} />
      ))}
    </div>
  );
}
