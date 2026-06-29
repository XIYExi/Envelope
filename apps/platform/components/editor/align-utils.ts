/**
 * 多选对齐/分布工具函数
 *
 * 计算对齐和分布操作的目标坐标，不操作 store，纯函数。
 */
import type { CanvasComponent } from "@envelope/engine";

/** 对齐类型 */
export type AlignType = "left" | "right" | "top" | "bottom" | "center-h" | "center-v";
/** 分布类型 */
export type DistributeType = "horizontal" | "vertical";

/**
 * 计算对齐后每个组件的新坐标
 *
 * @param components - 选中的组件列表
 * @param type - 对齐方式
 * @returns 组件 id 到新坐标的映射（只含变化的轴）
 */
export function calcAlignPositions(
  components: CanvasComponent[],
  type: AlignType,
): Map<string, { x?: number; y?: number }> {
  const result = new Map<string, { x?: number; y?: number }>();
  if (components.length < 2) return result;

  // 计算所有组件的边界
  const minX = Math.min(...components.map((c) => c.position.x));
  const maxRight = Math.max(...components.map((c) => c.position.x + c.position.width - 1));
  const minY = Math.min(...components.map((c) => c.position.y));
  const maxBottom = Math.max(...components.map((c) => c.position.y + c.position.height - 1));

  for (const c of components) {
    const pos: { x?: number; y?: number } = {};
    switch (type) {
      case "left":
        pos.x = minX;
        break;
      case "right":
        pos.x = maxRight - c.position.width + 1;
        break;
      case "top":
        pos.y = minY;
        break;
      case "bottom":
        pos.y = maxBottom - c.position.height + 1;
        break;
      case "center-h": {
        const centerX = (minX + maxRight) / 2;
        pos.x = Math.round(centerX - c.position.width / 2);
        break;
      }
      case "center-v": {
        const centerY = (minY + maxBottom) / 2;
        pos.y = Math.round(centerY - c.position.height / 2);
        break;
      }
    }
    result.set(c.id, pos);
  }
  return result;
}

/**
 * 计算等距分布后每个组件的新坐标
 *
 * @param components - 选中的组件列表（至少 3 个）
 * @param axis - 分布轴
 * @returns 组件 id 到新坐标的映射
 */
export function calcDistributePositions(
  components: CanvasComponent[],
  axis: DistributeType,
): Map<string, { x?: number; y?: number }> {
  const result = new Map<string, { x?: number; y?: number }>();
  if (components.length < 3) return result;

  // 按轴方向排序
  const sorted = [...components].sort((a, b) =>
    axis === "horizontal" ? a.position.x - b.position.x : a.position.y - b.position.y,
  );

  if (axis === "horizontal") {
    const first = sorted[0]!;
    const last = sorted[sorted.length - 1]!;
    const start = first.position.x;
    const end = last.position.x + last.position.width - 1;
    const totalWidth = sorted.reduce((sum, c) => sum + c.position.width, 0);
    const gap = (end - start + 1 - totalWidth) / (sorted.length - 1);

    let cursor = start;
    for (const c of sorted) {
      const newX = Math.round(cursor);
      if (c.id !== first.id && c.id !== last.id) {
        result.set(c.id, { x: newX });
      }
      cursor += c.position.width + gap;
    }
  } else {
    const first = sorted[0]!;
    const last = sorted[sorted.length - 1]!;
    const start = first.position.y;
    const end = last.position.y + last.position.height - 1;
    const totalHeight = sorted.reduce((sum, c) => sum + c.position.height, 0);
    const gap = (end - start + 1 - totalHeight) / (sorted.length - 1);

    let cursor = start;
    for (const c of sorted) {
      const newY = Math.round(cursor);
      if (c.id !== first.id && c.id !== last.id) {
        result.set(c.id, { y: newY });
      }
      cursor += c.position.height + gap;
    }
  }
  return result;
}
