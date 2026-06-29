/**
 * 画布渲染器主组件
 *
 * 将画布状态渲染为可交互的网格编辑器。
 * 使用 forwardRef 将内部画布 div 的引用暴露给父组件。
 *
 * 交互行为：
 * - 点击空白区域：清除选中
 * - 点击组件：选中（Ctrl/Shift/Meta + 点击 = 多选）
 * - 拖拽空白区域：平移画布（鼠标左键）
 * - 拖拽缩放手柄：调整组件尺寸
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-25
 */

"use client";

import React, { forwardRef, useCallback, useMemo, useRef, useState, useEffect, type CSSProperties, type MouseEvent as RMouseEvent } from "react";
import { cn, CELL_HEIGHT, CELL_WIDTH, RULER_SIZE, getPreviewTailwindClasses } from "./renderer-utils";
import type { CanvasComponent, DropTargetInfo } from "./types";
import { isContainerType } from "../shared/canvas-utils";
import { Minimap } from "./minimap";
import { HorizontalRuler, VerticalRuler } from "./ruler";
import { CanvasComponentItem } from "./canvas-component-item";
import { BoundingBoxOverlay } from "./bounding-box-overlay";
import { BreadcrumbBar } from "./breadcrumb-bar";
import { computeAlignGuides, SmartGuideOverlay } from "./smart-guides";
import { MarqueeOverlay } from "./marquee-overlay";
import { BemTools } from "./bem-tools";

/**
 * CanvasRenderer 组件的 Props
 *
 * 接收画布状态（组件列表、选中、缩放、平移等）和回调函数，
 * 不直接依赖 Zustand Store，由父组件桥接。
 */
export interface CanvasRendererProps {
  /** 画布上的所有组件 */
  components: CanvasComponent[];
  /** 当前选中的组件 ID 列表 */
  selectedIds: string[];
  /** 当前"主选中"的节点 ID */
  activeNodeId?: string | null;
  /** 子组件编辑模式作用域（为空时表示正常模式） */
  editScope?: { rootId: string; path: { id: string; type: string }[] } | null;
  /** 当前 hover 的组件 ID（鼠标移入时高亮） */
  hoveredId: string | null;
  /** 选中组件回调（id: 组件ID, multi: 是否多选模式） */
  onSelect: (id: string, multi?: boolean) => void;
  /** 清除所有选中状态回调 */
  onClearSelection: () => void;
  /** 选中嵌套子节点回调（用于点击 children 中的子组件） */
  onSelectChild?: (nodeId: string) => void;
  /** 双击组件回调（容器组件双击进入子编辑模式） */
  onDoubleClickComponent?: (compId: string) => void;
  /** 退出子组件编辑模式回调 */
  onExitChildEdit?: () => void;
  /** 调整组件尺寸回调（width, height: 列/行跨度；x, y 可选用于 w/n 把手） */
  onResize: (id: string, width: number, height: number, x?: number, y?: number) => void;
  /** Hover 状态回调 */
  onHover: (id: string | null) => void;
  /** 当前缩放比例 */
  zoom: number;
  /** 当前视口的画布宽度（px） */
  viewportWidth: number;
  /** 当前水平平移偏移量（px） */
  panX: number;
  /** 当前垂直平移偏移量（px） */
  panY: number;
  /** 平移回调（dx, dy: 新的绝对平移位置） */
  onPan: (dx: number, dy: number) => void;
  /** 网格列数 */
  gridCols: number;
  /** 网格间距（px） */
  gridGap: number;
  pageBackground?: string;
  pagePadding?: number;
  pageMaxWidth?: number | null;
  /** 组件最小行高（px），设为 0 时自适应由内容撑开 */
  minRowHeight?: number;
  /** B10: 拖拽对齐辅助线信息（被拖组件的网格坐标） */
  dragAlignInfo?: { gridX: number; gridY: number; gridWidth: number; gridHeight: number } | null;
  /** 定位模式: grid = 12列网格, free = 自由定位 */
  positionMode?: "grid" | "free";
  /** BEM: 删除组件回调（可从 store 直接调用） */
  onDeleteComponent?: (id: string) => void;
  /** BEM: 复制组件回调 */
  onCopyComponent?: (id: string) => void;
  /** BEM: 锁定切换回调 */
  onLockToggle?: (id: string) => void;
  /** 拖拽插入位置信息 */
  dropTarget?: DropTargetInfo | null;
}

/**
 * 画布渲染器组件
 *
 * 将画布状态渲染为可交互的网格编辑器。
 * 使用 forwardRef 将内部画布 div 的引用暴露给父组件（用于滚轮缩放等）。
 */
export const CanvasRenderer = forwardRef<HTMLDivElement, CanvasRendererProps>(
  function CanvasRenderer({
    components, selectedIds, activeNodeId: activeNodeIdProp, editScope, hoveredId, onSelect, onClearSelection, onSelectChild, onDoubleClickComponent, onExitChildEdit, onResize, onHover,
    zoom, viewportWidth, panX, panY, onPan, gridCols, gridGap,
    pageBackground, pagePadding, pageMaxWidth, minRowHeight, dragAlignInfo,
    positionMode = "grid",
    onDeleteComponent, onCopyComponent, onLockToggle, dropTarget,
  }, ref) {
    const activeNodeId = activeNodeIdProp ?? null;
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPanning, _setIsPanning] = useState(false);
    const panStart = useRef({ x: 0, y: 0 });
    /** 框选状态 */
    const [marquee, setMarquee] = useState<{ startX: number; startY: number; currentX: number; currentY: number } | null>(null);
    const marqueeStartRef = useRef<{ x: number; y: number; clientX: number; clientY: number } | null>(null);
    const marqueeRef = useRef<{ startX: number; startY: number; currentX: number; currentY: number } | null>(null);

    const onPanRef = useRef(onPan);
    onPanRef.current = onPan;

    const componentsRef = useRef(components);
    componentsRef.current = components;
    const onSelectRef = useRef(onSelect);
    onSelectRef.current = onSelect;
    const onClearSelectionRef = useRef(onClearSelection);
    onClearSelectionRef.current = onClearSelection;

    const columnWidth = useMemo(() => {
      const maxW = typeof pageMaxWidth === "number" && pageMaxWidth > 0 ? pageMaxWidth : viewportWidth;
      const effectiveWidth = Math.min(viewportWidth, maxW);
      const padding = typeof pagePadding === "number" ? pagePadding : 0;
      const contentWidth = effectiveWidth - 2 * padding;
      const gap = gridGap ?? 0;
      return Math.max(1, (contentWidth - (gridCols - 1) * gap) / gridCols);
    }, [viewportWidth, pageMaxWidth, pagePadding, gridCols, gridGap]);

    // B10: 拖拽对齐辅助线计算
    const alignGuides = useMemo(() => {
      if (!dragAlignInfo) return [];
      const visible = components.filter((c) => !c.hidden);
      return computeAlignGuides(dragAlignInfo, visible, columnWidth, gridGap, CELL_HEIGHT, 5);
    }, [dragAlignInfo, components, columnWidth, gridGap]);

    const handleMouseDown = useCallback((e: RMouseEvent) => {
      if (e.button !== 0) return;
      if (!(e.target instanceof HTMLElement)) return;

      if (e.target.closest('[data-canvas-comp="true"]')) return;

      const inCanvas = !!e.target.closest('[data-canvas-bg="true"]');
      const isBlankArea = e.target === e.currentTarget || inCanvas;
      if (!isBlankArea) return;

      const canvasEl = containerRef.current?.querySelector('[data-canvas-bg="true"]') as HTMLElement | null;
      if (canvasEl) {
        const rect = canvasEl.getBoundingClientRect();
        const x = (e.clientX - rect.left) / zoom;
        const y = (e.clientY - rect.top) / zoom;
        marqueeStartRef.current = { x, y, clientX: e.clientX, clientY: e.clientY };
        setMarquee({ startX: x, startY: y, currentX: x, currentY: y });
      }
    }, [zoom]);

    const handleMarqueeMove = useCallback((e: MouseEvent) => {
      if (!marqueeStartRef.current) return;
      const start = marqueeStartRef.current;
      const canvasEl = containerRef.current?.querySelector('[data-canvas-bg="true"]') as HTMLElement | null;
      if (!canvasEl) return;
      const rect = canvasEl.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / zoom;
      const cy = (e.clientY - rect.top) / zoom;
      const nextMarquee = { startX: start.x, startY: start.y, currentX: cx, currentY: cy };
      marqueeRef.current = nextMarquee;
      setMarquee(nextMarquee);
    }, [zoom]);

    const handleMarqueeUp = useCallback((e: MouseEvent) => {
      const start = marqueeStartRef.current;
      marqueeStartRef.current = null;
      setMarquee(null);

      if (!start) return;

      const dist = Math.hypot(e.clientX - start.clientX, e.clientY - start.clientY);
      if (dist < 5) {
        onClearSelectionRef.current();
        return;
      }

      const endX = marqueeRef.current?.currentX ?? start.x;
      const endY = marqueeRef.current?.currentY ?? start.y;
      const left = Math.min(start.x, endX);
      const top = Math.min(start.y, endY);
      const right = Math.max(start.x, endX);
      const bottom = Math.max(start.y, endY);

      const columnWidth = columnWidthRef.current;
      const gap = gridGapRef.current;
      const cellW = columnWidth + gap;
      const cellH = CELL_HEIGHT + gap;

      const gridLeft = Math.max(1, Math.floor(left / cellW) + 1);
      const gridRight = Math.max(1, Math.ceil(right / cellW));
      const gridTop = Math.max(1, Math.floor(top / cellH) + 1);
      const gridBottom = Math.max(1, Math.ceil(bottom / cellH));

      const hitIds: string[] = [];
      for (const comp of componentsRef.current) {
        if (comp.hidden) continue;
        const cx = comp.position.x;
        const cy = comp.position.y;
        const cw = cx + comp.position.width - 1;
        const ch = cy + comp.position.height - 1;
        const overlap = cx <= gridRight && cw >= gridLeft && cy <= gridBottom && ch >= gridTop;
        if (overlap) hitIds.push(comp.id);
      }

      if (hitIds.length > 0) {
        const first = hitIds[0]!;
        onSelectRef.current(first, false);
        for (let i = 1; i < hitIds.length; i++) {
          onSelectRef.current(hitIds[i]!, true);
        }
      } else {
        onClearSelectionRef.current();
      }
    }, []);

    const columnWidthRef = useRef(columnWidth);
    columnWidthRef.current = columnWidth;
    const gridGapRef = useRef(gridGap);
    gridGapRef.current = gridGap;

    /**
     * 监听鼠标移动和点击事件，处理选中框的更新和删除
     */
    useEffect(() => {
      if (!marquee) return;
      window.addEventListener("mousemove", handleMarqueeMove);
      window.addEventListener("mouseup", handleMarqueeUp);
      return () => {
        window.removeEventListener("mousemove", handleMarqueeMove);
        window.removeEventListener("mouseup", handleMarqueeUp);
      };
    }, [marquee, handleMarqueeUp, handleMarqueeMove]);

    return (
      <div
        ref={containerRef}
        data-testid="canvas-container"
        className="relative flex-1 overflow-hidden bg-muted/30"
        style={{ cursor: isPanning ? "grabbing" : "default" }}
        onMouseDown={handleMouseDown}
      >
        {/* 画布背景层 */}
        <div
          ref={ref}
          data-canvas-bg="true"
          className="absolute top-4 rounded-lg border bg-background shadow-sm transition-shadow"
          style={{
            left: `${panX + 16}px`,
            top: `${panY + 16}px`,
            width: `${viewportWidth}px`,
            minHeight: "600px",
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
            backgroundColor: pageBackground,
          }}
          onClick={(e) => {
            if (!(e.target instanceof HTMLElement)) return;
            if (e.target.closest('[data-canvas-comp="true"]')) return;
            onClearSelection();
          }}
        >
          {/* 面包屑导航栏 */}
          {editScope && (
            <BreadcrumbBar
              editScope={editScope}
              onNavigate={(idx) => {
                if (idx === -1) onExitChildEdit?.();
              }}
            />
          )}
          {/* 选中框覆盖层 */}
          {marquee && <MarqueeOverlay marquee={marquee} />}

          {/* 网格辅助线 */}
          <div className="flex">
            <VerticalRuler
              width={RULER_SIZE}
              height={600}
              zoom={zoom}
              panY={panY}
            />
            <div className="flex-1 min-w-0">
              <HorizontalRuler
                width={viewportWidth}
                height={RULER_SIZE}
                zoom={zoom}
                panX={panX}
              />
              <div
                data-testid="canvas-grid"
                className={cn("relative", positionMode === "free" ? "" : "grid")}
                style={positionMode === "free" ? {
                  padding: typeof pagePadding === "number" ? `${pagePadding}px` : undefined,
                  width: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  maxWidth: typeof pageMaxWidth === "number" && pageMaxWidth > 0 ? `${pageMaxWidth}px` : undefined,
                  minHeight: "500px",
                  backgroundImage: `radial-gradient(circle, rgba(128,128,128,0.20) 1px, transparent 1px)`,
                  backgroundSize: `20px 20px`,
                } : {
                  gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                  gap: `${gridGap}px`,
                  padding: typeof pagePadding === "number" ? `${pagePadding}px` : undefined,
                  width: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  maxWidth: typeof pageMaxWidth === "number" && pageMaxWidth > 0 ? `${pageMaxWidth}px` : undefined,
                  backgroundImage: `linear-gradient(rgba(128,128,128,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.12) 1px, transparent 1px)`,
                  backgroundSize: `${columnWidth}px ${CELL_HEIGHT}px`,
                }}
              >
                {components.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-muted/10">
                      <span className="text-2xl text-muted-foreground/40">+</span>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">拖拽组件到此处</p>
                    <p className="mt-1 text-xs text-muted-foreground/60">从左侧组件面板拖拽组件到画布上</p>
                  </div>
                )}
                {components.length > 0 && components.every((c) => c.hidden) && (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-sm font-medium text-muted-foreground">所有组件已隐藏</p>
                    <p className="mt-1 text-xs text-muted-foreground/60">在工具栏中取消隐藏以显示组件</p>
                  </div>
                )}

                {components.filter((c) => !c.hidden && selectedIds.includes(c.id)).length > 1 && (
                  <BoundingBoxOverlay
                    components={components.filter((c) => !c.hidden && selectedIds.includes(c.id))}
                    columnWidth={columnWidth}
                    gridGap={gridGap}
                    gridCols={gridCols}
                  />
                )}

                <SmartGuideOverlay guides={alignGuides} />

                {components.filter((c) => !c.hidden).map((comp) => {
                  const { x: rawX, y: rawY, width: rawW, height: rawH } = comp.position;
                  if (rawX < 1 || rawY < 1 || rawW < 1 || rawH < 1) return null;

                  const clampedX = Math.max(1, Math.min(gridCols, rawX));
                  const clampedY = Math.max(1, rawY);
                  const clampedWidth = Math.max(1, Math.min(gridCols - clampedX + 1, rawW));
                  const clampedHeight = Math.max(1, rawH);
                  const isDimmed = editScope != null && comp.id !== editScope.rootId;
                  const previewTailwind = getPreviewTailwindClasses(comp.node);

                  return (
                    <CanvasComponentItem
                      key={comp.id}
                      comp={comp}
                      x={positionMode === "free" ? rawX : clampedX}
                      y={positionMode === "free" ? rawY : clampedY}
                      width={positionMode === "free" ? rawW : clampedWidth}
                      height={positionMode === "free" ? rawH : clampedHeight}
                      isDimmed={isDimmed}
                      previewTailwind={previewTailwind}
                      gridCols={gridCols}
                      onSelect={onSelect}
                      onSelectChild={onSelectChild}
                      onDoubleClick={isContainerType(comp.node.type) ? () => onDoubleClickComponent?.(comp.id) : undefined}
                      onHover={onHover}
                      minRowHeight={minRowHeight}
                      positionMode={positionMode}
                      columnWidth={columnWidth}
                    />
                  );
                })}
              </div>

              {/* BEM Tools 组件 */}
              <BemTools
                components={components}
                selectedIds={selectedIds}
                activeNodeId={activeNodeId}
                hoveredId={hoveredId}
                columnWidth={columnWidth}
                gridGap={gridGap}
                pagePadding={typeof pagePadding === "number" ? pagePadding : 0}
                cellWidth={CELL_WIDTH}
                cellHeight={CELL_HEIGHT}
                gridCols={gridCols}
                zoom={zoom}
                positionMode={positionMode}
                onResize={onResize}
                onDeleteComponent={onDeleteComponent ?? onClearSelection}
                onCopyComponent={onCopyComponent ?? (() => { })}
                onLockToggle={onLockToggle ?? (() => { })}
                dropTarget={dropTarget ?? null}
              />
            </div>
          </div>
        </div>

        {/* 地图组件 */}
        {components.length > 0 && (
          <Minimap
            components={components}
            zoom={zoom}
            panX={panX}
            panY={panY}
            viewportWidth={viewportWidth}
            viewportHeight={600}
            columnWidth={columnWidth}
            gridCols={gridCols}
            gridGap={gridGap}
            cellHeight={CELL_HEIGHT}
            onPan={onPan}
            onZoom={(_z) => { }}
          />
        )}
      </div>
    );
  },
);
