/**
 * NodeIndex — 节点扁平索引
 *
 * 维护 id → NodeEntry 的扁平映射，实现 O(1) 节点查找。
 * 在每次树操作后调用 rebuild() 重建索引。
 *
 * 参考 lowcode-engine `document/node/` 的 flat Map 设计，
 * 但 Envelope 保持不可变数据结构（CanvasComponent[]），
 * 索引在树操作后重建，而非同步维护。
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-29
 * @reference lowcode-engine-main/packages/designer/src/document/node/
 */

import type { CanvasComponent } from "../types";
import type { ComponentNode } from "../../schemas/page.schema";
import type { NodeEntry, NodeLocation } from "./types";

/**
 * 节点扁平索引
 *
 * 使用示例：
 * ```
 * const index = new NodeIndex();
 * index.rebuild(components);
 * const entry = index.get("node-abc");  // O(1)
 * ```
 */
export class NodeIndex {
  /** id → NodeEntry 的扁平映射 */
  private index = new Map<string, NodeEntry>();

  /** 获取某个 ID 的索引条目，O(1) */
  get(id: string): NodeEntry | undefined {
    return this.index.get(id);
  }

  /** 判断某个 ID 是否在索引中，O(1) */
  has(id: string): boolean {
    return this.index.has(id);
  }

  /** 当前索引条目数量 */
  get size(): number {
    return this.index.size;
  }

  /** 清空索引 */
  clear(): void {
    this.index.clear();
  }

  /**
   * 重建索引
   *
   * 遍历 CanvasComponent[] 及其嵌套的 ComponentNode.children，
   * 为每个节点建立 id → NodeEntry 的映射。
   * O(n) 时间复杂度。
   */
  rebuild(components: CanvasComponent[]): void {
    this.index.clear();
    for (let i = 0; i < components.length; i++) {
      const comp = components[i]!;
      this.indexRoot(comp.node, null, [comp.node.id], i);
    }
  }

  /**
   * 从 CanvasComponent[] 中定位某个节点
   *
   * 先通过索引 O(1) 获取 NodeEntry，
   * 再沿 path 走 O(depth) 步拿到 ComponentNode 本身。
   *
   * 如果索引为空但 components 不为空，自动重建。
   *
   * @returns NodeLocation（与 tree-ops.ts 的 findNodeLocation 返回值结构一致）
   */
  locate(components: CanvasComponent[], nodeId: string): NodeLocation | null {
    // 索引为空时自动重建
    if (this.index.size === 0 && components.length > 0) {
      this.rebuild(components);
    }
    const entry = this.index.get(nodeId);
    if (!entry) return null;

    const rootComp = components[entry.rootIndex];
    if (!rootComp) return null;

    if (entry.depth === 0) {
      // 根级节点
      return {
        kind: "root",
        rootIndex: entry.rootIndex,
        rootId: rootComp.id,
        node: rootComp.node,
      };
    }

    // 沿 path 走到子节点
    const path = entry.path;
    let current: ComponentNode = rootComp.node;
    // path[0] 是根节点自身，从 path[1] 开始遍历
    for (let i = 1; i < path.length; i++) {
      const children = current.children ?? [];
      const child = children.find(c => c.id === path[i]);
      if (!child) return null;
      current = child;
    }

    // 计算在父级 children 中的 index
    const parentEntry = this.index.get(entry.parentId!);
    const parentNode = parentEntry
      ? this.walkToNode(rootComp.node, parentEntry.path)
      : null;
    const siblings = parentNode?.children ?? [];
    const idx = siblings.findIndex(c => c.id === nodeId);

    return {
      kind: "child",
      rootIndex: entry.rootIndex,
      rootId: rootComp.id,
      parentId: entry.parentId!,
      index: idx,
      node: current,
    };
  }

  /**
   * 判断 ancestorId 是否是 descendantId 的祖先
   *
   * 通过比较 descendantId 的 NodeEntry.path 是否包含 ancestorId，
   * O(1) 检查路径前缀。
   */
  contains(ancestorId: string, descendantId: string): boolean {
    if (ancestorId === descendantId) return true;
    const entry = this.index.get(descendantId);
    if (!entry) return false;
    // 检查 path 中是否能找到 ancestorId
    return entry.path.includes(ancestorId);
  }

  /**
   * 沿 path 走到目标节点
   * path[0] 是根节点，从 path[1] 开始遍历 children
   */
  private walkToNode(root: ComponentNode, path: string[]): ComponentNode | null {
    let current: ComponentNode = root;
    for (let i = 1; i < path.length; i++) {
      const children = current.children ?? [];
      const next = children.find(c => c.id === path[i]);
      if (!next) return null;
      current = next;
    }
    return current;
  }

  /** 递归索引一个节点及其所有子节点 */
  private indexRoot(
    node: ComponentNode,
    parentId: string | null,
    path: string[],
    rootIndex: number,
  ): void {
    this.index.set(node.id, {
      id: node.id,
      parentId,
      depth: path.length - 1,
      path: [...path],
      rootIndex,
    });
    for (const child of node.children ?? []) {
      this.indexRoot(child, node.id, [...path, child.id], rootIndex);
    }
  }
}
