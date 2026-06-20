/**
 * 缩放交互工具函数
 *
 * 将 “指针移动距离 → 网格单位变化” 与 “边界钳制” 逻辑集中在此处，避免 renderer.tsx 内部堆积计算细节。
 *
 * 设计目标：
 * - 网格对齐稳定：只在跨过完整网格后才发生变化，避免在临界值附近来回抖动
 * - 边界安全：缩放/位移后仍然保证组件位于有效网格范围内（x >= 1 且不超过 gridCols）
 *
 * @author xiye
 * @date 2026-06-20
 */

/**
 * 缩放手柄方向
 *
 * 八个方向（四边 + 四角），命名使用小写罗盘缩写：
 * n=上, s=下, e=右, w=左, ne=右上, nw=左上, se=右下, sw=左下
 */
export type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

/**
 * 缩放起始状态（网格单位）
 *
 * @param x - 起始列号（从 1 开始）
 * @param y - 起始行号（从 1 开始）
 * @param width - 起始列跨度（>= 1）
 * @param height - 起始行跨度（>= 1）
 * @param gridCols - 当前网格列数（用于右边界钳制）
 */
export interface ResizeStartState {
  x: number;
  y: number;
  width: number;
  height: number;
  gridCols: number;
}

/**
 * 计算得到的下一帧缩放结果（网格单位）
 *
 * 注意：这里的 x/y 一律返回，调用方可按需决定是否传给 store（例如仅在 w/n 把手时传入）。
 */
export interface ResizeNextState {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * 将“网格单位的小数增量”稳定对齐到整数网格增量
 *
 * 关键点：
 * - 使用 “向 0 取整” 的策略（正数 floor，负数 ceil），让变化发生在跨过完整网格时
 * - 这样不会在 0.5 附近因为采样噪声来回跳动，拖拽手感更稳定
 *
 * @param rawDelta - 指针移动换算成的网格单位增量（可为小数）
 * @returns 对齐后的整数网格增量
 */
export function snapGridDelta(rawDelta: number): number {
  const eps = 1e-6;
  const snapped = rawDelta >= 0 ? Math.floor(rawDelta + eps) : Math.ceil(rawDelta - eps);
  return Object.is(snapped, -0) ? 0 : snapped;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * 根据缩放方向与网格增量计算下一帧的 x/y/width/height，并做边界钳制
 *
 * @param dir - 手柄方向
 * @param start - 起始状态（网格单位）
 * @param deltaCols - 横向网格增量（整数，通常由 snapGridDelta 产生）
 * @param deltaRows - 纵向网格增量（整数，通常由 snapGridDelta 产生）
 * @returns 钳制后的下一帧状态
 */
export function calcResizeNext(
  dir: ResizeDirection,
  start: ResizeStartState,
  deltaCols: number,
  deltaRows: number,
): ResizeNextState {
  const startX = start.x;
  const startY = start.y;
  const startW = start.width;
  const startH = start.height;

  let nextX = startX;
  let nextY = startY;
  let nextW = startW;
  let nextH = startH;

  if (dir.includes("e")) {
    const maxW = start.gridCols - startX + 1;
    const d = clamp(deltaCols, -(startW - 1), maxW - startW);
    nextW = startW + d;
  }

  if (dir.includes("w")) {
    const minD = -(startX - 1);
    const maxD = startW - 1;
    const d = clamp(deltaCols, minD, maxD);
    nextX = startX + d;
    nextW = startW - d;
  }

  if (dir.includes("s")) {
    const d = Math.max(-(startH - 1), deltaRows);
    nextH = startH + d;
  }

  if (dir.includes("n")) {
    const minD = -(startY - 1);
    const maxD = startH - 1;
    const d = clamp(deltaRows, minD, maxD);
    nextY = startY + d;
    nextH = startH - d;
  }

  nextX = clamp(nextX, 1, start.gridCols);
  const maxWidthByX = start.gridCols - nextX + 1;
  nextW = clamp(nextW, 1, maxWidthByX);
  nextY = Math.max(1, nextY);
  nextH = Math.max(1, nextH);

  return { x: nextX, y: nextY, width: nextW, height: nextH };
}
