/**
 * Location 插入位置计算引擎
 *
 * 根据鼠标位置和组件布局，计算拖拽操作的插入位置。
 * 返回 DropTargetInfo 供 InsertionView 消费渲染。
 *
 * 参考 lowcode-engine `designer/src/designer/location.ts`
 * 和 `builtin-simulator/bem-tools/insertion.tsx` 的 `processChildrenDetail`。
 *
 * V2 (2026-06-30): computeAmongChildren 重写为基于 DOM rect
 * 的精确像素计算，替代均分容器高度的近似算法。
 *
 * @author xiye
 * @version 2.0.0
 * @date 2026-06-30
 * @reference lowcode-engine-main/packages/designer/src/designer/location.ts
 * @reference lowcode-engine-main/packages/designer/src/builtin-simulator/bem-tools/insertion.tsx
 */

import type { CanvasComponent, DropTargetInfo, DomRectEntry } from "../types";
import { computePixelRect } from "../bem-tools/shared";
import { isContainerType } from "../../shared/canvas-utils";

export interface LocationConfig {
  mouseX: number;
  mouseY: number;
  components: CanvasComponent[];
  columnWidth: number;
  gridGap: number;
  pagePadding: number;
  gridCols: number;
  cellHeight: number;
  cellWidth: number;
  positionMode: "grid" | "free";
  selectedIds: string[];
  /** 画布组件 DOM 矩形注册表（id → 实际像素矩形），用于精确插入位置计算 */
  domRects?: Record<string, DomRectEntry>;
}

export class Location {
  compute(config: LocationConfig): DropTargetInfo | null {
    const { mouseX, mouseY, components, columnWidth, gridGap, pagePadding,
            cellHeight, cellWidth, positionMode, selectedIds } = config;

    for (const comp of components) {
      if (comp.hidden) continue;
      if (!isContainerType(comp.node.type)) continue;
      if (selectedIds.includes(comp.id)) continue;

      const rect = computePixelRect(
        comp.position, columnWidth, gridGap, pagePadding,
        cellWidth, cellHeight, positionMode,
      );
      if (!rect) continue;

      if (mouseX >= rect.x && mouseX <= rect.x + rect.width &&
          mouseY >= rect.y && mouseY <= rect.y + rect.height) {

        const children = comp.node.children ?? [];
        if (children.length > 0) {
          return this.computeAmongChildren(config, comp, children, rect);
        }

        return {
          type: "cover",
          rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
          containerId: comp.id,
          index: 0,
          valid: true,
        };
      }
    }

    return null;
  }

  /**
   * 在容器有子组件的情况下，计算鼠标在哪个子组件之前/之后插入。
   *
   * V2: 基于 domRects 中的实际像素矩形做精确判定，
   * 不再使用均分容器高度的近似算法。
   *
   * 算法：
   *   1. 对每个子组件从 domRects 获取实际像素矩形
   *   2. 将有效子组件按 top 坐标排序
   *   3. 遍历排序后的子组件，找到鼠标 Y 坐标首个跨越的子组件
   *   4. 鼠标在该子组件上方 → before；下方 → 继续；最后 → after
   */
  private computeAmongChildren(
    config: LocationConfig,
    container: CanvasComponent,
    children: CanvasComponent["node"]["children"],
    containerRect: { x: number; y: number; width: number; height: number },
  ): DropTargetInfo | null {
    const { mouseX, mouseY, domRects } = config;
    const safeChildren = children ?? [];

    interface ChildEntry {
      node: (typeof safeChildren)[number];
      rect: { top: number; bottom: number; left: number; right: number; width: number; height: number };
    }

    const entries: ChildEntry[] = [];

    for (const child of safeChildren) {
      if (domRects && child.id in domRects) {
        const r = domRects[child.id]!;
        // 过滤零尺寸 rect（子组件未渲染或 display:none），参考 processChildrenDetail 的 width===0 && height===0 检查
        if (r.width === 0 && r.height === 0) continue;
        entries.push({
          node: child,
          rect: { top: r.top, bottom: r.bottom, left: r.left, right: r.right, width: r.width, height: r.height },
        });
      }
    }

    if (entries.length === 0) {
      return {
        type: "cover",
        rect: { x: containerRect.x, y: containerRect.y, width: containerRect.width, height: containerRect.height },
        containerId: container.id,
        index: 0,
        valid: true,
      };
    }

    entries.sort((a, b) => a.rect.top - b.rect.top);

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]!;
      const centerY = entry.rect.top + entry.rect.height / 2;
      if (mouseY < centerY) {
        const yPos = i === 0 ? containerRect.y : entries[i - 1]!.rect.bottom;
        const h = entry.rect.top - yPos;
        const isV = isContainerVertical(container);
        return {
          type: "before",
          rect: { x: containerRect.x, y: yPos, width: containerRect.width, height: Math.max(1, h) },
          containerId: container.id,
          nearNodeId: entry.node.id,
          index: i,
          isVertical: isV,
          valid: true,
        };
      }

      const nextCenterY = i + 1 < entries.length
        ? entries[i + 1]!.rect.top + entries[i + 1]!.rect.height / 2
        : Infinity;
      if (mouseY < nextCenterY) {
        return {
          type: "cover",
          rect: {
            x: entry.rect.left,
            y: entry.rect.top,
            width: entry.rect.width,
            height: entry.rect.height,
          },
          containerId: container.id,
          nearNodeId: entry.node.id,
          index: i,
          valid: true,
        };
      }
    }

    const last = entries[entries.length - 1]!;
    const isV = isContainerVertical(container);
    return {
      type: "after",
      rect: {
        x: containerRect.x,
        y: last.rect.bottom,
        width: containerRect.width,
        height: Math.max(1, containerRect.height + containerRect.y - last.rect.bottom),
      },
      containerId: container.id,
      index: entries.length,
      isVertical: isV,
      valid: true,
    };
  }
}

/** 判断容器是否为行方向（flex-row / inline），决定插入指示线方向 */
function isContainerVertical(container: CanvasComponent): boolean {
  const props = container.node.props as Record<string, unknown> | undefined;
  if (props?.direction === 'row' || props?.direction === 'row-reverse') return false;
  return true;
}
