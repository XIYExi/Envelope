/**
 * CanvasHost — 画布统一协调层
 *
 * 集中管理画布所有坐标系统和子系统引用，作为编辑器与画布之间的唯一桥梁。
 *
 * 参考 lowcode-engine BuiltinSimulatorHost 的集中式协调架构，
 * 但适配 Envelope 的单窗口渲染 + dnd-kit 技术栈。
 *
 * 核心职责：
 * 1. 坐标变换（唯一入口）：toCanvasCoords / toOverlayCoords
 * 2. 组件 rect 获取（优先 domRects，fallback computePixelRect）：getComponentRect
 * 3. 子系统持有：Dragon / Scroller / Detecting / Location / OffsetObserver
 * 4. gridRect 引用注入（从 CanvasRenderer，避免 querySelector）
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-07-01
 * @reference lowcode-engine-main/packages/designer/src/builtin-simulator/host.ts
 */

import type { CanvasComponent, DomRectEntry, DropTargetInfo, DragObject, LocateEvent, DropLocation, DropLocationSource } from "../types";
import { computePixelRect } from "../bem-tools/shared";
import { OffsetObserver } from "../dragon/offset-observer";
import type { CanvasViewportState, OffsetResult } from "../dragon/offset-observer";

/**
 * 画布宿主配置
 */
export interface CanvasHostConfig {
  /** 画布视口状态（pan + zoom） */
  viewport: CanvasViewportState;
  /** 网格布局参数 */
  grid: {
    columnWidth: number;
    gap: number;
    padding: number;
    cellWidth: number;
    cellHeight: number;
    gridCols: number;
    positionMode: "grid" | "free";
  };
}

/**
 * 画布统一协调层
 *
 * 使用示例：
 * ```
 * const host = new CanvasHost(config);
 *
 * // 坐标变换
 * const { canvasX, canvasY } = host.toCanvasCoords(globalX, globalY);
 *
 * // 获取组件 rect（优先 domRects）
 * const rect = host.getComponentRect(compId);
 *
 * // BEM Tools 覆盖层定位
 * const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = host.getOverlayCoords(compId);
 * ```
 */
export class CanvasHost {
  /** 配置 */
  private _config: CanvasHostConfig;

  /** 画布网格 DOM 元素（由 CanvasRenderer 注入） */
  private _gridEl: HTMLElement | null = null;

  /** 画布视口 DOM 元素（用于 scroller 边界检测） */
  private _viewportEl: HTMLElement | null = null;

  /** domRects 引用（由 CanvasRenderer 或 store 注入，每帧更新） */
  private _domRects: Record<string, DomRectEntry> = {};

  /** 组件列表引用 */
  private _components: CanvasComponent[] = [];

  /** 选中 ID 列表引用 */
  private _selectedIds: string[] = [];

  constructor(config: CanvasHostConfig) {
    this._config = config;
  }

  // ========== 配置更新 ==========

  /** 更新配置（由 editor-layout / CanvasRenderer 在重渲染时调用） */
  updateConfig(config: Partial<CanvasHostConfig>): void {
    if (config.viewport) Object.assign(this._config.viewport, config.viewport);
    if (config.grid) Object.assign(this._config.grid, config.grid);
  }

  /** 获取当前视口状态 */
  get viewport(): CanvasViewportState {
    return { ...this._config.viewport };
  }

  /** 获取当前网格配置 */
  get grid(): CanvasHostConfig["grid"] {
    return { ...this._config.grid };
  }

  // ========== DOM 引用注入 ==========

  /** 注入画布网格 DOM 元素（由 CanvasRenderer 在挂载时调用） */
  setGridElement(el: HTMLElement | null): void {
    this._gridEl = el;
  }

  /** 注入视口 DOM 元素（由 editor-layout 在挂载时调用） */
  setViewportElement(el: HTMLElement | null): void {
    this._viewportEl = el;
  }

  // ========== 运行时数据注入 ==========

  /** 更新 domRects（由 CanvasRenderer ResizeObserver 或 store 订阅同步） */
  setDomRects(domRects: Record<string, DomRectEntry>): void {
    this._domRects = domRects;
  }

  /** 更新组件列表引用 */
  setComponents(components: CanvasComponent[]): void {
    this._components = components;
  }

  /** 更新选中 ID 列表 */
  setSelectedIds(ids: string[]): void {
    this._selectedIds = ids;
  }

  // ========== 坐标变换（唯一入口） ==========

  /**
   * 全局 Client 坐标 → Canvas-Local 坐标
   *
   * 这是坐标归一化的唯一入口。所有子系统（Dragon、Location、BEM Tools）
   * 必须通过此方法获取 Canvas-Local 坐标，不得自行计算。
   *
   * 公式（对齐 lowcode viewport.toLocalPoint）：
   *   canvasX = (globalX - gridRect.left) / zoom
   *   canvasY = (globalY - gridRect.top) / zoom
   */
  toCanvasCoords(globalX: number, globalY: number): { canvasX: number; canvasY: number } {
    const gridEl = this._gridEl;
    if (!gridEl) {
      return { canvasX: globalX, canvasY: globalY };
    }
    const gridRect = gridEl.getBoundingClientRect();
    const z = this._config.viewport.zoom > 0 ? this._config.viewport.zoom : 1;
    return {
      canvasX: (globalX - gridRect.left) / z,
      canvasY: (globalY - gridRect.top) / z,
    };
  }

  /**
   * Canvas-Local 坐标 → BEM Tools 覆盖层可视坐标
   *
   * 将 Canvas-Local 空间的 rect 转换为 BEM Tools 覆盖层可用的
   * absolute-positioned pixel 坐标（用于 translate3d）。
   *
   * 公式（对齐 lowcode OffsetObserver.offsetLeft/offsetTop）：
   *   offsetLeft = canvasLeft + panX * zoom
   *   offsetTop  = canvasTop  + panY * zoom
   */
  toOverlayCoords(canvasX: number, canvasY: number): { x: number; y: number } {
    const { panX, panY, zoom } = this._config.viewport;
    return {
      x: canvasX + panX * zoom,
      y: canvasY + panY * zoom,
    };
  }

  // ========== 组件 rect 获取（优先 domRects） ==========

  /**
   * 获取组件在 Canvas-Local 空间的像素矩形
   *
   * 优先级：
   *   1. domRects[id] — 实时 DOM 测量（ResizeObserver，最准确）
   *   2. computePixelRect — 数学估计（grid 单位 → 像素，首帧 fallback）
   *   3. null — 组件不存在或未渲染
   *
   * 这是所有 BEM Tools 和 Location 获取组件 rect 的唯一入口。
   */
  getComponentRect(compId: string): { x: number; y: number; width: number; height: number } | null {
    // 优先使用实时 DOM 测量
    const dr = this._domRects[compId];
    if (dr) {
      return { x: dr.left, y: dr.top, width: dr.width, height: dr.height };
    }

    // fallback 到数学估计
    const comp = this._components.find(c => c.id === compId);
    if (!comp) return null;

    const g = this._config.grid;
    const pixelRect = computePixelRect(
      comp.position,
      g.columnWidth,
      g.gap,
      g.padding,
      g.cellWidth,
      g.cellHeight,
      g.positionMode,
    );
    if (!pixelRect) return null;
    return pixelRect;
  }

  /**
   * 获取组件在覆盖层可视空间的定位信息
   *
   * 对齐 lowcode OffsetObserver.getOffset()，但改为从 CanvasHost 统一获取。
   * 用于 BEM Tools 的 absolute positioning。
   */
  getOverlayCoords(compId: string): OffsetResult | null {
    const rect = this._domRects[compId];
    if (!rect) return null;

    return OffsetObserver.getOffset(compId, this._domRects, this._config.viewport);
  }

  // ========== 便捷方法 ==========

  /**
   * 获取视口边界（用于 scroller 边界检测）
   */
  getViewportRect(): DOMRect | null {
    if (!this._viewportEl) return null;
    return this._viewportEl.getBoundingClientRect();
  }

  /**
   * 获取网格边界（用于坐标归一化）
   */
  getGridRect(): DOMRect | null {
    if (!this._gridEl) return null;
    return this._gridEl.getBoundingClientRect();
  }
}
