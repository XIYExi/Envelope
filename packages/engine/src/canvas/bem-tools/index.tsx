/**
 * BEM Tools 组件
 */

"use client";

import type { CanvasComponent } from "../types";
import { bemToolsManager } from "./manager";
import { BorderSelecting } from "./border-selecting";
import { BorderDetecting } from "./border-detecting";
import { BorderResizing } from "./border-resizing";

export { bemToolsManager } from "./manager";
export type { BemToolComponent } from "./manager";

export interface BemToolsProps {
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
}

export function BemTools(props: BemToolsProps) {
  const {
    components, selectedIds, activeNodeId, hoveredId,
    columnWidth, gridGap, pagePadding, cellWidth, cellHeight, gridCols,
    zoom, positionMode, onResize, onDeleteComponent, onCopyComponent, onLockToggle,
  } = props;

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
      {/* 组件悬停检测工具 */}
      <BorderDetecting
        hoveredId={hoveredId}
        components={components}
        selectedIds={selectedIds}
        columnWidth={columnWidth}
        gridGap={gridGap}
        pagePadding={pagePadding}
        cellWidth={cellWidth}
        cellHeight={cellHeight}
        positionMode={positionMode}
      />

      {/* 组件选中工具 */}
      <BorderSelecting
        components={components}
        selectedIds={selectedIds}
        activeNodeId={activeNodeId}
        columnWidth={columnWidth}
        gridGap={gridGap}
        pagePadding={pagePadding}
        cellWidth={cellWidth}
        cellHeight={cellHeight}
        positionMode={positionMode}
        onDeleteComponent={onDeleteComponent}
        onCopyComponent={onCopyComponent}
        onLockToggle={onLockToggle}
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
      />

      {/* 插件工具 */}
      {pluginTools.map((Tool, i) => (
        <Tool key={i} />
      ))}
    </div>
  );
}
