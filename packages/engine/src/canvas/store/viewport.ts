/**
 * 画布视口/页面状态切片
 *
 * 包含缩放、平移、网格、页面外观等状态及操作。
 * 所有 action 使用 withHistory 自动处理历史记录。
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { CanvasState, CanvasActions } from "../types";
import { VIEWPORT_WIDTHS } from "../types";
import { CANVAS_CELL_WIDTH, CANVAS_CELL_HEIGHT } from "../../shared/canvas-utils";
import { withHistory } from "./history";

/** 数值钳制（闭区间） */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** 规范化网格列数 */
function normalizeGridCols(cols: number): number {
  if (!Number.isFinite(cols)) return 1;
  return Math.max(1, Math.floor(cols));
}

/** 根据组件宽度对 x 做右边界钳制 */
function clampXByWidth(x: number, width: number, gridCols: number): number {
  const w = Math.max(1, width);
  const rightMostX = Math.max(1, gridCols - w + 1);
  return clamp(Math.round(x), 1, rightMostX);
}

/** 视口 → gridCols 映射（mobile→4, tablet→8, desktop→12, fluid→12） */
const VIEWPORT_GRID_COLS: Record<CanvasState["viewport"], number> = {
  mobile: 4,
  tablet: 8,
  desktop: 12,
  fluid: 12,
};

/** 视口初始状态 */
export const viewportInitialState = {
  zoom: 1,
  viewport: "desktop" as CanvasState["viewport"],
  gridCols: 12,
  gridGap: 4,
  minRowHeight: 40,
  panX: 0,
  panY: 0,
  pageBackground: "#ffffff",
  pagePadding: 16,
  pageMaxWidth: null as number | null,
  positionMode: "grid" as "grid" | "free",
};

export function createViewportSlice(
  set: (partial: Partial<CanvasState & CanvasActions>) => void,
  get: () => CanvasState & CanvasActions,
) {
  return {
    ...viewportInitialState,

    setZoom: (zoom: number) => {
      set(withHistory((state) => ({
        zoom: Math.max(0.25, Math.min(2, zoom)),
      }), { coalesceKey: "zoom" })(get(), zoom));
    },

    setViewport: (viewport: CanvasState["viewport"]) => {
      set(withHistory((state) => {
        // 根据视口类型计算对应的 gridCols
        const nextCols = VIEWPORT_GRID_COLS[viewport];
        return {
          viewport,
          gridCols: nextCols,
          // 复用 setGridCols 的钳制逻辑：x/width 不能超出新的 gridCols
          components: state.components.map((c) => {
            const nextW = clamp(Math.round(c.position.width), 1, nextCols);
            const nextX = clampXByWidth(c.position.x, nextW, nextCols);
            const nextY = Math.max(1, Math.round(c.position.y));
            const nextH = Math.max(1, Math.round(c.position.height));
            return { ...c, position: { ...c.position, x: nextX, y: nextY, width: nextW, height: nextH } };
          }),
        };
      })(get(), viewport));
    },

    setGridCols: (gridCols: number) => {
      set(withHistory((state) => {
        const nextCols = normalizeGridCols(gridCols);
        return {
          gridCols: nextCols,
          components: state.components.map((c) => {
            const nextW = clamp(Math.round(c.position.width), 1, nextCols);
            const nextX = clampXByWidth(c.position.x, nextW, nextCols);
            const nextY = Math.max(1, Math.round(c.position.y));
            const nextH = Math.max(1, Math.round(c.position.height));
            return { ...c, position: { ...c.position, x: nextX, y: nextY, width: nextW, height: nextH } };
          }),
        };
      })(get(), gridCols));
    },

    setGridGap: (gridGap: number) => {
      set(withHistory((state) => ({
        gridGap,
      }))(get(), gridGap));
    },

    setMinRowHeight: (height: number) => {
      set(withHistory((state) => ({
        minRowHeight: Math.max(0, Math.round(height)),
      }))(get(), height));
    },

    zoomToFit: () => {
      set(withHistory((state) => {
        if (state.components.length === 0) return {};
        const visible = state.components.filter((c) => !c.hidden);
        if (visible.length === 0) return {};
        const minX = Math.min(...visible.map((c) => c.position.x));
        const maxX = Math.max(...visible.map((c) => c.position.x + c.position.width));
        const minY = Math.min(...visible.map((c) => c.position.y));
        const maxY = Math.max(...visible.map((c) => c.position.y + c.position.height));
        const colW = CANVAS_CELL_WIDTH;
        const rowH = CANVAS_CELL_HEIGHT;
        const gap = state.gridGap;
        const contentW = (maxX - minX + 1) * (colW + gap);
        const contentH = (maxY - minY + 1) * (rowH + gap);
        const vpW = VIEWPORT_WIDTHS[state.viewport];
        const vpH = 600;
        const fitZoom = Math.min(vpW / contentW, vpH / contentH, 2) * 0.9;
        const zoomVal = Math.max(0.25, fitZoom);
        const cx = ((minX + maxX) / 2) * (colW + gap);
        const cy = ((minY + maxY) / 2) * (rowH + gap);
        const newPanX = -cx * zoomVal + vpW / 2 - 16;
        const newPanY = -cy * zoomVal + vpH / 2 - 16;
        return { zoom: zoomVal, panX: newPanX, panY: newPanY };
      })(get()));
    },

    zoomToSelection: () => {
      set(withHistory((state) => {
        if (state.selectedIds.length === 0) return {};
        const selected = state.components.filter((c) => state.selectedIds.includes(c.id) && !c.hidden);
        if (selected.length === 0) return {};
        const minX = Math.min(...selected.map((c) => c.position.x));
        const maxX = Math.max(...selected.map((c) => c.position.x + c.position.width));
        const minY = Math.min(...selected.map((c) => c.position.y));
        const maxY = Math.max(...selected.map((c) => c.position.y + c.position.height));
        const colW = CANVAS_CELL_WIDTH;
        const rowH = CANVAS_CELL_HEIGHT;
        const gap = state.gridGap;
        const contentW = (maxX - minX + 1) * (colW + gap);
        const contentH = (maxY - minY + 1) * (rowH + gap);
        const vpW = VIEWPORT_WIDTHS[state.viewport];
        const vpH = 600;
        const fitZoom = Math.min(vpW / contentW, vpH / contentH, 2) * 0.9;
        const zoomVal = Math.max(0.25, fitZoom);
        const cx = ((minX + maxX) / 2) * (colW + gap);
        const cy = ((minY + maxY) / 2) * (rowH + gap);
        const newPanX = -cx * zoomVal + vpW / 2 - 16;
        const newPanY = -cy * zoomVal + vpH / 2 - 16;
        return { zoom: zoomVal, panX: newPanX, panY: newPanY };
      })(get()));
    },

    setPan: (panX: number, panY: number) => {
      set(withHistory((state) => ({
        panX,
        panY,
      }), { coalesceKey: "pan" })(get(), panX, panY));
    },

    setPageBackground: (pageBackground: string) => {
      set(withHistory((state) => ({
        pageBackground,
      }))(get(), pageBackground));
    },

    setPagePadding: (pagePadding: number) => {
      set(withHistory((state) => ({
        pagePadding,
      }))(get(), pagePadding));
    },

    setPageMaxWidth: (pageMaxWidth: number | null) => {
      set(withHistory((state) => ({
        pageMaxWidth:
          typeof pageMaxWidth === "number" && Number.isFinite(pageMaxWidth) && pageMaxWidth > 0
            ? Math.floor(pageMaxWidth)
            : null,
      }))(get(), pageMaxWidth));
    },

    setPositionMode: (mode: "grid" | "free") => {
      set({ positionMode: mode });
    },
  };
}
