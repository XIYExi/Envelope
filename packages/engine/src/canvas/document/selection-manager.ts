/**
 * SelectionManager — 选中管理器
 *
 * 管理组件选中状态，支持单选/多选/主次选中。
 * 提供 getNodes()（全部选中）和 getTopNodes()（顶层选中）的区分，
 * 用于拖拽操作中过滤掉嵌套子组件。
 *
 * 参考 lowcode-engine `designer/src/document/selection.ts`
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-29
 * @reference lowcode-engine-main/packages/designer/src/document/selection.ts
 */

import type { CanvasComponent } from "../types";
import { NodeIndex } from "./node-index";

/**
 * 选中管理器
 *
 * 不持有状态，只提供查询方法。
 * 实际选中状态由 Zustand store 的 `selectedIds` 和 `activeNodeId` 持有。
 */
export class SelectionManager {
  /**
   * 获取所有选中的画布组件（含根级和嵌套子组件对应的根组件）
   *
   * 从 selectedIds 中筛选出存在于 components 中的根组件。
   */
  getSelectedComponents(components: CanvasComponent[], selectedIds: string[]): CanvasComponent[] {
    const idSet = new Set(selectedIds);
    return components.filter((c) => idSet.has(c.id));
  }

  /**
   * 获取顶层选中的组件列表
   *
   * 过滤掉那些父级也在选中列表中的子组件。
   * 例如：选中了 Card 和 Card 内部的 Button，getTopNodes 只返回 Card。
   * 用于拖拽操作中防止嵌套组件被重复处理。
   */
  getTopComponents(components: CanvasComponent[], selectedIds: string[], index?: NodeIndex): CanvasComponent[] {
    if (selectedIds.length <= 1) {
      return this.getSelectedComponents(components, selectedIds);
    }

    const idSet = new Set(selectedIds);

    // 使用 NodeIndex 加速祖先检测
    const hasAncestorInSelection = (id: string): boolean => {
      if (!index) return false;
      const entry = index.get(id);
      if (!entry || !entry.parentId) return false;
      // 沿 path 检查是否有祖先在选中列表
      for (let i = entry.path.length - 2; i >= 0; i--) {
        if (idSet.has(entry.path[i]!)) return true;
      }
      return false;
    };

    const topIds = selectedIds.filter((id) => !hasAncestorInSelection(id));
    return components.filter((c) => topIds.includes(c.id));
  }

  /**
   * 获取主选中的节点 ID
   *
   * 优先使用 activeNodeId，其次使用 selectedIds[0]。
   */
  getPrimaryId(selectedIds: string[], activeNodeId: string | null): string | null {
    return activeNodeId ?? selectedIds[0] ?? null;
  }

  /**
   * 判断某个 ID 是否在选中列表中
   */
  isSelected(selectedIds: string[], id: string): boolean {
    return selectedIds.includes(id);
  }

  /**
   * 切换选中状态（多选模式）
   *
   * 已选中的移除，未选中的添加。
   */
  toggle(selectedIds: string[], id: string): string[] {
    const already = selectedIds.includes(id);
    return already
      ? selectedIds.filter((s) => s !== id)
      : [...selectedIds, id];
  }

  /**
   * 选择单个（替换当前选中）
   */
  select(selectedIds: string[], id: string, activeNodeId: string | null): { selectedIds: string[]; activeNodeId: string | null } {
    return { selectedIds: [id], activeNodeId: id };
  }

  /**
   * 添加选中（追加到选中列表）
   */
  add(selectedIds: string[], id: string): string[] {
    if (selectedIds.includes(id)) return selectedIds;
    return [...selectedIds, id];
  }

  /**
   * 取消选中某个 ID
   */
  remove(selectedIds: string[], id: string): string[] {
    return selectedIds.filter((s) => s !== id);
  }

  /**
   * 全选
   */
  selectAll(components: CanvasComponent[]): string[] {
    return components.filter((c) => !c.hidden).map((c) => c.id);
  }
}
