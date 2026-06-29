/**
 * Location 插入位置计算引擎
 *
 * 根据鼠标位置和组件布局，计算拖拽操作的插入位置。
 * 返回 DropTargetInfo 供 InsertionView 消费渲染。
 *
 * 参考 lowcode-engine `designer/src/designer/location.ts`
 * 和 `builtin-simulator/bem-tools/insertion.tsx` 的 `processChildrenDetail`。
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-29
 * @reference lowcode-engine-main/packages/designer/src/designer/location.ts
 */

import type { CanvasComponent, DropTargetInfo } from "../types";
import { computePixelRect } from "../bem-tools/shared";
import { isContainerType } from "../../shared/canvas-utils";

/**
 * Location 引擎的输入参数
 */
export interface LocationConfig {
  /** 鼠标在画布内的 X 坐标（已减去 pan 和缩放补偿后的像素坐标） */
  mouseX: number;
  /** 鼠标在画布内的 Y 坐标（已减去 pan 和缩放补偿后的像素坐标） */
  mouseY: number;
  /** 当前所有组件 */
  components: CanvasComponent[];
  /** 列宽（px） */
  columnWidth: number;
  /** 网格间距（px） */
  gridGap: number;
  /** 页面内边距（px） */
  pagePadding: number;
  /** 网格列数 */
  gridCols: number;
  /** 单元格高度（px） */
  cellHeight: number;
  /** 单元格宽度（px） */
  cellWidth: number;
  /** 定位模式 */
  positionMode: "grid" | "free";
  /** 当前选中的组件 ID 列表（用于排除自身） */
  selectedIds: string[];
}

/**
 * 插入位置计算引擎
 *
 * 每次拖拽移动时调用 compute()，计算鼠标下方最近的容器/组件，
 * 返回 DropTargetInfo 用于渲染插入指示器和 store 执行放置。
 */
export class Location {
  /**
   * 计算当前鼠标位置的插入目标
   *
   * 算法流程：
   * 1. 遍历所有容器组件，计算像素区域
   * 2. 判断鼠标是否进入某个容器
   * 3. 如果在容器内，遍历子组件确定 before/after/cover
   * 4. 如果不在任何容器内，返回 null
   */
  compute(config: LocationConfig): DropTargetInfo | null {
    const { mouseX, mouseY, components, columnWidth, gridGap, pagePadding,
            cellHeight, cellWidth, positionMode, selectedIds } = config;

    // 遍历所有容器组件，找鼠标所在的容器
    for (const comp of components) {
      if (comp.hidden) continue;
      if (!isContainerType(comp.node.type)) continue;
      // 排除正在拖拽的组件自身
      if (selectedIds.includes(comp.id)) continue;

      const rect = computePixelRect(
        comp.position, columnWidth, gridGap, pagePadding,
        cellWidth, cellHeight, positionMode,
      );
      if (!rect) continue;

      // 判断鼠标是否在当前容器区域内
      if (mouseX >= rect.x && mouseX <= rect.x + rect.width &&
          mouseY >= rect.y && mouseY <= rect.y + rect.height) {

        // 如果容器有子组件，进一步计算 before/after 位置
        const children = comp.node.children ?? [];
        if (children.length > 0) {
          return this.computeAmongChildren(config, comp, children, rect);
        }

        // 容器无子组件：返回 cover 模式
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
   * 在容器有子组件的情况下，计算鼠标在哪个子组件之前/之后插入
   *
   * 遍历子组件的像素坐标，找到鼠标位置最近的相邻间隙。
   */
  private computeAmongChildren(
    config: LocationConfig,
    container: CanvasComponent,
    children: CanvasComponent["node"]["children"],
    containerRect: { x: number; y: number; width: number; height: number },
  ): DropTargetInfo | null {
    const { mouseX, mouseY, columnWidth, gridGap, pagePadding,
            cellHeight, cellWidth, positionMode } = config;

    const safeChildren = children ?? [];
    const childComponents = safeChildren
      .map((n, idx) => ({ node: n, idx }))
      .filter(c => {
        // 只计算有位置信息的子组件（普通组件节点可能有位置信息）
        return true;
      });

    // 没有可计算的子组件位置信息，直接 cover
    if (childComponents.length === 0) {
      return {
        type: "cover",
        rect: { x: containerRect.x, y: containerRect.y, width: containerRect.width, height: containerRect.height },
        containerId: container.id,
        index: 0,
        valid: true,
      };
    }

    // 由于嵌套子组件在 CanvasComponent 中没有直接的位置信息，
    // 无法精确计算每个子组件的像素位置。
    // 这里简化为根据子组件数量等分容器区域，判断鼠标落在哪个区间
    const gap = containerRect.height / (childComponents.length + 1);
    for (let i = 0; i < childComponents.length; i++) {
      const itemTop = containerRect.y + gap * (i + 1);
      if (mouseY < itemTop) {
        return {
          type: "before",
          rect: { x: containerRect.x, y: containerRect.y + gap * i, width: containerRect.width, height: gap },
          containerId: container.id,
          index: i,
          valid: true,
        };
      }
    }

    // 鼠标在最后一个子组件之后
    return {
      type: "after",
      rect: { x: containerRect.x, y: containerRect.y + containerRect.height - gap, width: containerRect.width, height: gap },
      containerId: container.id,
      index: childComponents.length,
      valid: true,
    };
  }
}
