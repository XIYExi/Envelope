/**
 * NodeManager — 节点管理器
 *
 * 封装组件树的所有增删改查操作（add/insert/remove/move/update/find），
 * 内部维护 NodeIndex 实现 O(1) 节点查找。
 *
 * 所有操作保持不可变性（返回新的 CanvasComponent[]），
 * 与 Zustand store 的 immer patches 历史系统兼容。
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-29
 * @reference lowcode-engine-main/packages/designer/src/document/document-model.ts
 */

import type { CanvasComponent } from "../types";
import type { ComponentNode } from "../../schemas/page.schema";
import { NodeIndex } from "./node-index";
import type { NodeLocation } from "./types";
import { isContainerType } from "../../shared/canvas-utils";
import { getSlotsForType } from "../../slots";

/**
 * 节点管理器
 *
 * 使用方式：
 * ```
 * const manager = new NodeManager();
 * let comps = manager.insertNode(components, parentId, idx, newNode);
 * comps = manager.moveNode(comps, nodeId, { parentId: null });
 * const loc = manager.locate(comps, nodeId);
 * ```
 */
export class NodeManager {
  /** 节点索引（每次树操作后自动 rebuild） */
  readonly index = new NodeIndex();

  // ========== 查找 ==========

  /**
   * 定位节点位置
   *
   * 通过 NodeIndex.locate() O(1) + O(depth) 定位，
   * 替代 tree-ops.ts 的递归 findNodeLocation。
   */
  locate(components: CanvasComponent[], nodeId: string): NodeLocation | null {
    return this.index.locate(components, nodeId);
  }

  /**
   * 按 ID 查找节点
   *
   * O(1) 索引定位 + O(depth) 沿路径遍历。
   */
  findNode(components: CanvasComponent[], nodeId: string): ComponentNode | null {
    const loc = this.locate(components, nodeId);
    return loc?.node ?? null;
  }

  // ========== 插入 ==========

  /**
   * 向树中插入一个组件节点
   *
   * @param components - 当前组件列表
   * @param comp - 要插入的 CanvasComponent
   * @param parentId - 父节点 ID（null 表示插入到根列表）
   * @param index - 插入位置索引
   * @returns 新的组件列表
   */
  addComponent(
    components: CanvasComponent[],
    comp: CanvasComponent,
    parentId: string | null,
    index?: number,
  ): CanvasComponent[] {
    if (parentId === null) {
      const next = components.slice();
      const safeIndex = index !== undefined
        ? Math.max(0, Math.min(next.length, index))
        : next.length;
      next.splice(safeIndex, 0, comp);
      this.index.rebuild(next);
      return next;
    }
    return this.insertNode(components, parentId, index ?? 0, comp.node, comp);
  }

  /**
   * 插入节点到容器
   *
   * 将 node 插入到 parentId 容器的 children 的 index 位置。
   * 返回新的 CanvasComponent[]。
   */
  insertNode(
    components: CanvasComponent[],
    parentId: string,
    index: number,
    node: ComponentNode,
    injectedComp?: CanvasComponent,
  ): CanvasComponent[] {
    let inserted = false;
    const next = components.map((c) => {
      if (inserted) return c;
      const res = this.insertIntoNode(c.node, parentId, index, node);
      if (!res.inserted) return c;
      inserted = true;
      return { ...c, node: res.nextNode };
    });

    if (!inserted) return components;
    this.index.rebuild(next);
    return next;
  }

  // ========== 移除 ==========

  /**
   * 从树中移除节点
   *
   * @returns 新的组件列表 + 被移除的节点
   */
  removeNode(
    components: CanvasComponent[],
    nodeId: string,
  ): { components: CanvasComponent[]; removed: ComponentNode | null } {
    const loc = this.locate(components, nodeId);
    if (!loc) return { components, removed: null };

    if (loc.kind === "root") {
      const next = components.slice();
      const [removed] = next.splice(loc.rootIndex, 1);
      this.index.rebuild(next);
      return { components: next, removed: removed?.node ?? null };
    }

    let removedNode: ComponentNode | null = null;
    let found = false;
    const next = components.map((c) => {
      if (found) return c;
      if (c.id !== loc.rootId) return c;
      const res = this.removeFromNode(c.node, nodeId);
      if (!res.removed) return c;
      found = true;
      removedNode = res.removed;
      return { ...c, node: res.nextNode };
    });

    if (!removedNode) return { components, removed: null };
    this.index.rebuild(next);
    return { components: next, removed: removedNode };
  }

  // ========== 移动 ==========

  /**
   * 在树中移动节点
   *
   * 从原位置移除，插入到目标位置。
   * 处理同一父级内移动时的索引偏移。
   */
  moveNode(
    components: CanvasComponent[],
    nodeId: string,
    target: { parentId: string | null; index?: number },
  ): CanvasComponent[] {
    // 防循环：禁止将节点移入其自身或其后代
    if (target.parentId && this.index.contains(nodeId, target.parentId)) {
      return components;
    }

    // Step 1: 移除
    const { components: afterRemove, removed } = this.removeNode(components, nodeId);
    if (!removed) return components;

    // Step 2: 计算目标位置索引偏移
    const originLoc = this.locate(components, nodeId);
    const adjustedIndex = (() => {
      const raw = target.index ?? (target.parentId === null ? afterRemove.length : 0);
      if (!originLoc) return raw;
      const sameParent = target.parentId === null
        ? originLoc.kind === "root"
        : originLoc.kind === "child" && originLoc.parentId === target.parentId;
      if (!sameParent) return raw;
      if (originLoc.kind === "root" && originLoc.rootIndex < raw) {
        return Math.max(0, raw - 1);
      }
      if (originLoc.kind === "child" && originLoc.index < raw) {
        return Math.max(0, raw - 1);
      }
      return raw;
    })();

    // Step 3: 插入
    if (target.parentId === null) {
      const safeIndex = Math.max(0, Math.min(afterRemove.length, adjustedIndex));
      const next = afterRemove.slice();
      const insertedComp: CanvasComponent = {
        id: removed.id,
        node: removed,
        position: { x: 1, y: 1, width: 3, height: 2 },
      };
      next.splice(safeIndex, 0, insertedComp);
      this.index.rebuild(next);
      return next;
    }

    return this.insertNode(afterRemove, target.parentId, adjustedIndex, removed);
  }

  // ========== 更新 ==========

  /**
   * 更新树中节点的属性
   */
  updateNode(
    components: CanvasComponent[],
    nodeId: string,
    updates: Partial<Omit<ComponentNode, "id">>,
  ): CanvasComponent[] {
    const loc = this.locate(components, nodeId);
    if (!loc) return components;

    if (loc.kind === "root") {
      const next = components.map((c) => {
        if (c.id !== nodeId) return c;
        const nextNode: ComponentNode = { ...c.node, ...updates } as ComponentNode;
        return { ...c, node: nextNode };
      });
      this.index.rebuild(next);
      return next;
    }

    let updated = false;
    const next = components.map((c) => {
      if (updated) return c;
      if (c.id !== loc.rootId) return c;
      const res = this.updateInNode(c.node, nodeId, updates);
      if (!res.updated) return c;
      updated = true;
      return { ...c, node: res.nextNode };
    });

    if (!updated) return components;
    this.index.rebuild(next);
    return next;
  }

  // ========== 内部树操作（递归，与 tree-ops.ts 算法兼容） ==========

  /**
   * 向指定父节点插入子节点
   */
  private insertIntoNode(
    node: ComponentNode,
    parentId: string,
    index: number,
    child: ComponentNode,
  ): { nextNode: ComponentNode; inserted: boolean } {
    if (node.id === parentId) {
      if (!isContainerType(node.type)) {
        return { nextNode: node, inserted: false };
      }
      // 校验 slot 类型
      const slots = getSlotsForType(node.type);
      if (slots.length > 0) {
        const allowedTypes = new Set(slots.flatMap(s => s.allowedChildTypes));
        if (allowedTypes.size > 0 && !allowedTypes.has(child.type)) {
          return { nextNode: node, inserted: false };
        }
      }
      const children = node.children ?? [];
      const nextChildren = children.slice();
      nextChildren.splice(Math.max(0, Math.min(nextChildren.length, index)), 0, child);
      return { nextNode: { ...node, children: nextChildren }, inserted: true };
    }

    const children = node.children ?? [];
    if (children.length === 0) return { nextNode: node, inserted: false };

    let inserted = false;
    let changed = false;
    const nextChildren = children.map((c) => {
      if (inserted) return c;
      const res = this.insertIntoNode(c, parentId, index, child);
      if (res.inserted) inserted = true;
      if (res.nextNode !== c) changed = true;
      return res.nextNode;
    });

    if (!inserted) return { nextNode: node, inserted: false };
    if (!changed) return { nextNode: node, inserted: true };
    return { nextNode: { ...node, children: nextChildren }, inserted: true };
  }

  /**
   * 从节点树中移除目标节点
   */
  private removeFromNode(
    node: ComponentNode,
    targetId: string,
  ): { nextNode: ComponentNode; removed: ComponentNode | null } {
    const children = node.children ?? [];
    if (children.length === 0) return { nextNode: node, removed: null };

    let removed: ComponentNode | null = null;
    let changed = false;

    const nextChildren: ComponentNode[] = [];
    for (const child of children) {
      if (child.id === targetId) {
        removed = child;
        changed = true;
        continue;
      }
      const res = this.removeFromNode(child, targetId);
      if (res.removed) {
        removed = res.removed;
      }
      if (res.nextNode !== child) changed = true;
      nextChildren.push(res.nextNode);
    }

    if (!changed) return { nextNode: node, removed };
    return {
      nextNode: { ...node, children: nextChildren.length > 0 ? nextChildren : undefined },
      removed,
    };
  }

  /**
   * 更新树中目标节点的属性
   */
  private updateInNode(
    node: ComponentNode,
    targetId: string,
    updates: Partial<Omit<ComponentNode, "id">>,
  ): { nextNode: ComponentNode; updated: boolean } {
    if (node.id === targetId) {
      const next: ComponentNode = {
        ...node,
        ...updates,
        props: Object.prototype.hasOwnProperty.call(updates, "props") ? updates.props : node.props,
        dataBindings: Object.prototype.hasOwnProperty.call(updates, "dataBindings") ? updates.dataBindings : node.dataBindings,
        eventBindings: Object.prototype.hasOwnProperty.call(updates, "eventBindings") ? updates.eventBindings : node.eventBindings,
        children: Object.prototype.hasOwnProperty.call(updates, "children") ? updates.children : node.children,
      };
      return { nextNode: next, updated: true };
    }

    const children = node.children ?? [];
    if (children.length === 0) return { nextNode: node, updated: false };

    let updated = false;
    let changed = false;
    const nextChildren = children.map((c) => {
      if (updated) return c;
      const res = this.updateInNode(c, targetId, updates);
      if (res.updated) updated = true;
      if (res.nextNode !== c) changed = true;
      return res.nextNode;
    });

    if (!updated) return { nextNode: node, updated: false };
    if (!changed) return { nextNode: node, updated: true };
    return { nextNode: { ...node, children: nextChildren }, updated: true };
  }

  /**
   * 重新排序根组件列表的 y 坐标
   *
   * 保持与 tree-ops.ts reflowRootComponentsByOrder 一致的行为。
   */
  reflowY(components: CanvasComponent[], onlyForIds?: Set<string>): CanvasComponent[] {
    if (onlyForIds) {
      const maxY = components
        .filter((c) => !onlyForIds.has(c.id))
        .reduce((max, c) => Math.max(max, c.position.y + c.position.height), 0);
      let y = Math.max(1, maxY + 1);
      return components.map((c) => {
        if (!onlyForIds.has(c.id)) return c;
        const nextY = y;
        y += Math.max(1, Math.round(c.position.height));
        return { ...c, position: { ...c.position, y: nextY } };
      });
    }
    let y = 1;
    return components.map((c) => {
      const nextY = y;
      y += Math.max(1, Math.round(c.position.height));
      return { ...c, position: { ...c.position, y: nextY } };
    });
  }
}
