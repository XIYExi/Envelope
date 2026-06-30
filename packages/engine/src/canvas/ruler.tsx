/**
 * 画布标尺组件
 *
 * 在画布顶部和左侧显示双单位刻度：
 * - 像素刻度（主刻度），随 pan 和 zoom 同步偏移
 *
 * @author xiye
 * @date 2026-06-24
 */

"use client";

import { useMemo } from "react";

/** 标尺像素间距 */
const TICK_STEP_PX = 50;

/** 标尺高度/宽度（px） */
const RULER_SIZE = 20;

interface RulerProps {
  /** 画布视口宽度（px） */
  width: number;
  /** 画布视口高度（px） */
  height: number;
  /** 当前缩放比例 */
  zoom: number;
  /** 水平平移偏移量（px） */
  panX?: number;
  /** 垂直平移偏移量（px） */
  panY?: number;
  /** 每列像素宽度 */
  columnWidth?: number;
  /** 每行像素高度 */
  cellHeight?: number;
  /** 网格列数 */
  gridCols?: number;
}

/**
 * 水平标尺
 *
 * 渲染在画布顶部，显示像素刻度。
 * 刻度位置随 panX 和 zoom 同步偏移。
 */
export function HorizontalRuler({ width, height, zoom, panX = 0 }: RulerProps) {
  const ticks = useMemo(() => {
    const result: { pos: number; label: string }[] = [];
    const maxPx = width * zoom + Math.abs(panX) + 200;
    const step = TICK_STEP_PX * zoom;
    if (step < 1) return result;
    const start = Math.floor((-panX - 16) / step) * step;
    for (let px = start; px < maxPx; px += step) {
      const x = px + (panX + 16);
      if (x < -10 || x > width + 10) continue;
      result.push({ pos: x, label: `${Math.round(px / zoom)}` });
    }
    return result;
  }, [width, zoom, panX]);

  return (
    <div className="relative h-5 overflow-hidden border-b bg-muted/20 select-none" style={{ width }}>
      <svg width={width} height={RULER_SIZE} className="absolute left-0 top-0">
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={t.pos} y1={14} x2={t.pos} y2={RULER_SIZE} stroke="oklch(0.5 0 0)" strokeWidth={0.5} />
            <text x={t.pos + 2} y={11} fontSize={8} fill="oklch(0.4 0 0)">
              {t.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/**
 * 垂直标尺
 *
 * 渲染在画布左侧，显示像素刻度。
 * 刻度位置随 panY 和 zoom 同步偏移。
 */
export function VerticalRuler({ width, height, zoom, panY = 0 }: RulerProps) {
  const ticks = useMemo(() => {
    const result: { pos: number; label: string }[] = [];
    const maxPy = height * zoom + Math.abs(panY) + 200;
    const step = TICK_STEP_PX * zoom;
    if (step < 1) return result;
    const start = Math.floor((-panY - 16) / step) * step;
    for (let py = start; py < maxPy; py += step) {
      const y = py + (panY + 16);
      if (y < -10 || y > height + 10) continue;
      result.push({ pos: y, label: `${Math.round(py / zoom)}` });
    }
    return result;
  }, [height, zoom, panY]);

  return (
    <div className="relative w-5 overflow-hidden border-r bg-muted/20 select-none" style={{ height }}>
      <svg width={RULER_SIZE} height={height} className="absolute left-0 top-0">
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={14} y1={t.pos} x2={RULER_SIZE} y2={t.pos} stroke="oklch(0.5 0 0)" strokeWidth={0.5} />
            <text x={2} y={t.pos + 10} fontSize={8} fill="oklch(0.4 0 0)">
              {t.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
