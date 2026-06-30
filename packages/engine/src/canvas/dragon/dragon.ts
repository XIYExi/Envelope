/**
 * Dragon 拖拽引擎
 *
 * 统一管理拖拽状态（isDragging/dragType/activeId）、
 * 位置计算（delta → 网格单位）、
 * 自动滚动（CanvasScroller）和悬停检测（Detecting）。
 *
 * 作为 dnd-kit 回调与画布业务逻辑之间的中间层，
 * 将散落在 editor-layout 中的 DnD 逻辑集中在此。
 *
 * 参考 lowcode-engine `designer/src/designer/dragon.ts`
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-29
 * @reference lowcode-engine-main/packages/designer/src/designer/dragon.ts
 */

import type { DragStartEvent, DragMoveEvent } from "@dnd-kit/core";
import { CanvasScroller } from "./scroller";
import { Detecting } from "./detecting";
import { Location } from "./location";
import type { DragSensor } from "./sensor";
import { CANVAS_CELL_WIDTH, CANVAS_CELL_HEIGHT, computeColumnWidth } from "../../shared/canvas-utils";
import type { CanvasComponent, DropTargetInfo, DomRectEntry } from "../types";

/**
 * 拖拽上下文：从 DragStartEvent 中解析出的拖拽信息
 */
export interface DragContext {
  /** 拖拽类型: "material" = 从素材面板拖出, "canvas-component" = 画布内组件移动 */
  dragType: "material" | "canvas-component" | null;
  /** 素材名称（material 拖拽时有效） */
  materialName?: string;
  /** 组件 ID（canvas-component 拖拽时有效） */
  componentId?: string;
  /** 拖拽对象中的原始 data */
  dragData: Record<string, unknown> | undefined;
}

/**
 * 拖拽移动事件的计算结果
 *
 * 由 Dragon.onDragMove() 返回，
 * editor-layout 消费此结果更新 UI 状态。
 */
export interface DragMoveResult {
  /** 对齐辅助线信息（传给 SmartGuideOverlay） */
  alignInfo: {
    gridX: number;
    gridY: number;
    gridWidth: number;
    gridHeight: number;
  } | null;
  /** 插入位置信息（传给 InsertionView） */
  dropTarget: DropTargetInfo | null;
}

/**
 * 拖拽引擎
 *
 * 在 editor-layout 的 DndContext 回调中使用：
 *
 * ```typescript
 * const dragon = useRef(new Dragon({ scroller })).current;
 *
 * <DndContext
 *   onDragStart={(e) => dragon.onDragStart(e)}
 *   onDragMove={(e) => {
 *     const result = dragon.onDragMove(e, canvasState);
 *     setDragAlignInfo(result.alignInfo);
 *     store.setDropTarget(result.dropTarget);
 *   }}
 *   onDragEnd={() => dragon.onDragEnd()}
 * />
 * ```
 */
export class Dragon {
  /** 是否正在拖拽 */
  private _dragging = false;

  /** 当前拖拽类型 */
  private _dragType: "material" | "canvas-component" | null = null;

  /** 当前拖拽的素材名称或组件 ID */
  private _activeId: string | null = null;

  /** 拖拽开始时的原始数据 */
  private _dragData: Record<string, unknown> | undefined;

  /** 自动滚动器 */
  readonly scroller: CanvasScroller;

  /** 悬停检测器 */
  readonly detecting: Detecting;

  /** 插入位置计算引擎 */
  readonly location: Location;

  /** 感应器列表（Phase 1 占位，未来支持多画布） */
  private sensors: DragSensor[] = [];

  constructor(opts?: { scroller?: CanvasScroller; detecting?: Detecting }) {
    this.scroller = opts?.scroller ?? new CanvasScroller();
    this.detecting = opts?.detecting ?? new Detecting();
    this.location = new Location();
  }

  // ========== 只读状态 ==========

  /** 是否正在拖拽 */
  get isDragging(): boolean {
    return this._dragging;
  }

  /** 当前拖拽类型 */
  get dragType(): "material" | "canvas-component" | null {
    return this._dragType;
  }

  /** 当前拖拽的素材名称或组件 ID */
  get activeId(): string | null {
    return this._activeId;
  }

  /** 注册拖拽感应器（未来多模拟器支持） */
  addSensor(sensor: DragSensor): void {
    this.sensors.push(sensor);
  }

  /** 移除拖拽感应器 */
  removeSensor(sensor: DragSensor): void {
    const i = this.sensors.indexOf(sensor);
    if (i > -1) this.sensors.splice(i, 1);
  }

  // ========== 拖拽生命周期 ==========

  /**
   * 拖拽开始 — 在 DndContext.onDragStart 中调用
   *
   * 从 event.active.data.current 解析拖拽对象信息。
   */
  onDragStart(event: DragStartEvent): DragContext {
    this._dragging = true;
    this._dragData = event.active.data.current as Record<string, unknown> | undefined;

    const materialName = this._dragData?.materialName as string | undefined;
    const componentId = this._dragData?.componentId as string | undefined;

    this._dragType = materialName ? "material" : componentId ? "canvas-component" : null;
    this._activeId = materialName ?? componentId ?? null;

    return {
      dragType: this._dragType,
      materialName,
      componentId,
      dragData: this._dragData,
    };
  }

  /**
   * 拖拽移动 — 在 DndContext.onDragMove 中调用
   *
   * 计算：
   * 1. 对齐辅助线信息（delta → 网格坐标）
   * 2. 插入位置（通过 Location 引擎）
   *
   * @param event - dnd-kit 拖拽移动事件
   * @param state - 画布状态快照（zoom/components/selectedIds/gridCols/positionMode）
   * @param viewportRect - 画布视口的 getBoundingClientRect
   */
  onDragMove(
    event: DragMoveEvent,
    state: {
      zoom: number;
      components: CanvasComponent[];
      selectedIds: string[];
      gridCols: number;
      positionMode: "grid" | "free";
      domRects?: Record<string, DomRectEntry>;
      gridRect?: DOMRect;
    },
    viewport: {
      width: number;
      padding: number;
      gap: number;
      cellWidth: number;
      cellHeight: number;
      columnWidth: number;
    },
    viewportRect?: DOMRect,
  ): DragMoveResult {
    if (!this._dragging || !this._dragData) {
      return { alignInfo: null, dropTarget: null };
    }

    const { zoom, components, selectedIds, gridCols, positionMode, domRects, gridRect } = state;

    // 1. 计算对齐信息（delta → 网格坐标）
    const alignInfo = this.computeAlignInfo(event, zoom, components, gridCols, viewport.columnWidth);

    // 2. 计算插入位置（通过 Location 引擎）
    //    需要将全局鼠标坐标转换为画布内部坐标
    const dropTarget = this.computeDropTarget(
      event, components, selectedIds,
      viewport, positionMode, viewportRect, domRects, gridRect, zoom,
    );

    return { alignInfo, dropTarget };
  }

  /**
   * 拖拽结束 — 在 DndContext.onDragEnd 中调用
   *
   * 重置所有拖拽状态，停止自动滚动，清除悬停。
   */
  onDragEnd(): void {
    this._dragging = false;
    this._dragType = null;
    this._activeId = null;
    this._dragData = undefined;
    this.scroller.cancel();
    this.detecting.reset();
  }

  // ========== 工具方法 ==========

  /**
   * 将拖拽的像素偏移量转换为网格坐标增量
   *
   * 公式：gridUnits = deltaPixels / (columnWidth * zoom)
   *
   * @param deltaX - dnd-kit event.delta.x（像素）
   * @param deltaY - dnd-kit event.delta.y（像素）
   * @param zoom - 当前缩放比例
   * @param columnWidth - 实际 CSS Grid 列宽（px），默认 CANVAS_CELL_WIDTH
   * @param origin - 起始网格坐标（可选，有则返回绝对坐标）
   */
  deltaToGrid(
    deltaX: number,
    deltaY: number,
    zoom: number,
    columnWidth?: number,
    origin?: { x: number; y: number },
  ): { dx: number; dy: number } {
    const colW = (columnWidth && columnWidth > 0) ? columnWidth : CANVAS_CELL_WIDTH;
    const dx = deltaX / (colW * zoom);
    const dy = deltaY / (CANVAS_CELL_HEIGHT * zoom);

    if (origin) {
      return { dx: origin.x + dx, dy: origin.y + dy };
    }
    return { dx, dy };
  }

  /**
   * 计算对齐辅助线信息
   *
   * 从拖拽偏移量计算当前组件应处的网格位置，
   * 供 SmartGuideOverlay 渲染对齐辅助线。
   */
  private computeAlignInfo(
    event: DragMoveEvent,
    zoom: number,
    components: CanvasComponent[],
    gridCols: number,
    columnWidth: number,
  ): { gridX: number; gridY: number; gridWidth: number; gridHeight: number } | null {
    const materName = this._dragData?.materialName as string | undefined;
    const compId = this._dragData?.componentId as string | undefined;

    const colW = (columnWidth && columnWidth > 0) ? columnWidth : CANVAS_CELL_WIDTH;

    if (materName) {
      // 素材拖拽：默认宽 3 高 2
      const gx = Math.max(1, Math.round(event.delta.x / (colW * zoom)));
      const gy = Math.max(1, Math.round(event.delta.y / (CANVAS_CELL_HEIGHT * zoom)));
      return { gridX: gx, gridY: gy, gridWidth: 3, gridHeight: 2 };
    }

    if (compId) {
      // 已有组件拖拽：在起始网格坐标上叠加偏移
      const comp = components.find(c => c.id === compId);
      if (!comp) return null;
      const gx = Math.round(comp.position.x + event.delta.x / (colW * zoom));
      const gy = Math.round(comp.position.y + event.delta.y / (CANVAS_CELL_HEIGHT * zoom));
      return { gridX: gx, gridY: gy, gridWidth: comp.position.width, gridHeight: comp.position.height };
    }

    return null;
  }

  /**
   * 计算插入位置
   *
   * 将全局鼠标坐标转换为画布内部像素坐标后，
   * 通过 Location 引擎计算鼠标所在容器和插入类型。
   */
  private computeDropTarget(
    event: DragMoveEvent,
    components: CanvasComponent[],
    selectedIds: string[],
    viewport: { width: number; padding: number; gap: number; cellWidth: number; cellHeight: number; columnWidth: number },
    positionMode: "grid" | "free",
    viewportRect?: DOMRect,
    domRects?: Record<string, DomRectEntry>,
    gridRect?: DOMRect,
    zoom?: number,
  ): DropTargetInfo | null {
    const me = event.activatorEvent as MouseEvent;
    const currentMouseX = me.clientX + event.delta.x;
    const currentMouseY = me.clientY + event.delta.y;

    // 将全局鼠标坐标归一化到 canvas-grid 局部未缩放空间
    // 与 collectDomRects 产出的 domRects 坐标系统一致
    let canvasX = currentMouseX;
    let canvasY = currentMouseY;
    if (gridRect) {
      const z = (zoom && zoom > 0) ? zoom : 1;
      canvasX = (currentMouseX - gridRect.left) / z;
      canvasY = (currentMouseY - gridRect.top) / z;
    }

    return this.location.compute({
      mouseX: canvasX,
      mouseY: canvasY,
      components,
      columnWidth: viewport.columnWidth,
      gridGap: viewport.gap,
      pagePadding: viewport.padding,
      gridCols: 12,
      cellHeight: viewport.cellHeight,
      cellWidth: viewport.cellWidth,
      positionMode,
      selectedIds,
      domRects,
    });
  }
}
