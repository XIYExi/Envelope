/**
 * 画布树操作工具函数
 *
 * 包含组件树的增删改查、节点查找、ID 生成等纯函数操作。
 * 这些函数不依赖 Zustand store，可直接用于任意 ComponentNode 树。
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { CanvasComponent } from "../types";
import type { ComponentNode } from "../../schemas/page.schema";
import { isContainerType } from "../../shared/canvas-utils";
import { syncAggregateSlots, getSlotsForType } from "../../slots";

/** 生成唯一 ID */
export function generateId(): string {
  return crypto.randomUUID();
}

/** 判断节点名是否为自动生成 */
export function isAutoName(node: ComponentNode): boolean {
  const name = typeof node.name === "string" ? node.name.trim() : "";
  if (!name) return true;
  return name === `${node.type}-${node.id}`;
}

/** 深拷贝节点并生成新 ID */
export function cloneNodeWithNewIds(node: ComponentNode): ComponentNode {
  const id = generateId();
  return {
    ...node,
    id,
    name: isAutoName(node) ? `${node.type}-${id}` : node.name,
    props: node.props ? structuredClone(node.props) : undefined,
    tailwindClasses: node.tailwindClasses,
    dataBindings: node.dataBindings ? structuredClone(node.dataBindings) : undefined,
    eventBindings: node.eventBindings ? structuredClone(node.eventBindings) : undefined,
    children: node.children ? node.children.map(cloneNodeWithNewIds) : undefined,
    grid: undefined,
  };
}

/** 判断节点树中是否包含某 ID */
export function nodeContainsId(node: ComponentNode, targetId: string): boolean {
  if (node.id === targetId) return true;
  const children = node.children ?? [];
  for (const c of children) {
    if (nodeContainsId(c, targetId)) return true;
  }
  return false;
}

export type NodeLocation =
  | {
      kind: "root";
      rootIndex: number;
      rootId: string;
      node: ComponentNode;
    }
  | {
      kind: "child";
      rootIndex: number;
      rootId: string;
      parentId: string;
      index: number;
      node: ComponentNode;
    };

/** 在组件列表中查找节点位置 */
export function findNodeLocation(components: CanvasComponent[], nodeId: string): NodeLocation | null {
  for (let i = 0; i < components.length; i += 1) {
    const comp = components[i]!;
    if (comp.id === nodeId) {
      return { kind: "root", rootIndex: i, rootId: comp.id, node: comp.node };
    }

    type FoundChild = { kind: "child"; parentId: string; index: number; node: ComponentNode };
    const walk = (parent: ComponentNode): FoundChild | null => {
      const children = parent.children ?? [];
      for (let j = 0; j < children.length; j += 1) {
        const child = children[j]!;
        if (child.id === nodeId) {
          return { kind: "child", parentId: parent.id, index: j, node: child };
        }
        const nested = walk(child);
        if (nested) return nested;
      }
      return null;
    };

    const found = walk(comp.node);
    if (found) return { ...found, rootIndex: i, rootId: comp.id };
  }
  return null;
}

/** 判断类型是否支持子节点 */
export function canNodeHaveChildren(type: string): boolean {
  return isContainerType(type);
}

/** 在组件列表中查找节点 */
export function findNodeInComponents(components: CanvasComponent[], nodeId: string): ComponentNode | null {
  for (const comp of components) {
    const search = (n: ComponentNode): ComponentNode | null => {
      if (n.id === nodeId) return n;
      for (const child of n.children ?? []) {
        const found = search(child);
        if (found) return found;
      }
      return null;
    };
    const found = search(comp.node);
    if (found) return found;
  }
  return null;
}

/** 重新排序根组件列表的 y 坐标 */
export function reflowRootComponentsByOrder(
  components: CanvasComponent[],
  onlyForIds?: Set<string>,
): CanvasComponent[] {
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

/** 从节点树中移除节点 */
export function removeNodeFromTree(
  node: ComponentNode,
  targetId: string,
): { nextNode: ComponentNode; removed: ComponentNode | null; removedParentId: string | null; removedIndex: number } {
  const children = node.children ?? [];
  if (children.length === 0) return { nextNode: node, removed: null, removedParentId: null, removedIndex: -1 };

  let removed: ComponentNode | null = null;
  let removedParentId: string | null = null;
  let removedIndex = -1;
  let changed = false;

  const nextChildren: ComponentNode[] = [];
  for (let i = 0; i < children.length; i += 1) {
    const child = children[i]!;
    if (child.id === targetId) {
      removed = child;
      removedParentId = node.id;
      removedIndex = i;
      changed = true;
      continue;
    }
    const res = removeNodeFromTree(child, targetId);
    if (res.removed) {
      removed = res.removed;
      removedParentId = res.removedParentId;
      removedIndex = res.removedIndex;
    }
    if (res.nextNode !== child) changed = true;
    nextChildren.push(res.nextNode);
  }

  if (!changed) return { nextNode: node, removed, removedParentId, removedIndex };

  const next: ComponentNode = {
    ...node,
    children: nextChildren.length > 0 ? nextChildren : undefined,
  };
  return { nextNode: syncAggregateSlots(next, "children"), removed, removedParentId, removedIndex };
}

/** 插入节点到树中 */
export function insertNodeIntoTree(
  node: ComponentNode,
  parentId: string,
  index: number,
  child: ComponentNode,
): { nextNode: ComponentNode; inserted: boolean } {
  if (node.id === parentId) {
    if (!canNodeHaveChildren(node.type)) {
      return { nextNode: node, inserted: false };
    }
    const slots = getSlotsForType(node.type);
    if (slots.length > 0) {
      const allowedTypes = new Set(slots.flatMap(s => s.allowedChildTypes));
      if (allowedTypes.size > 0 && !allowedTypes.has(child.type)) {
        return { nextNode: node, inserted: false };
      }
    }
    const children = node.children ?? [];
    const nextChildren = children.slice();
    const safeIndex = Math.max(0, Math.min(nextChildren.length, index));
    nextChildren.splice(safeIndex, 0, child);
    const next: ComponentNode = { ...node, children: nextChildren };
    return { nextNode: syncAggregateSlots(next, "children"), inserted: true };
  }

  const children = node.children ?? [];
  if (children.length === 0) return { nextNode: node, inserted: false };

  let inserted = false;
  let changed = false;
  const nextChildren = children.map((c) => {
    if (inserted) return c;
    const res = insertNodeIntoTree(c, parentId, index, child);
    if (res.inserted) inserted = true;
    if (res.nextNode !== c) changed = true;
    return res.nextNode;
  });

  if (!inserted) return { nextNode: node, inserted: false };
  if (!changed) return { nextNode: node, inserted: true };

  const next: ComponentNode = { ...node, children: nextChildren };
  return { nextNode: syncAggregateSlots(next, "children"), inserted: true };
}

/** 更新树中节点 */
export function updateNodeInTree(
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

    const hasProps = Object.prototype.hasOwnProperty.call(updates, "props");
    const hasChildren = Object.prototype.hasOwnProperty.call(updates, "children");
    const source = hasChildren && !hasProps ? "children" : "props";
    return { nextNode: (hasProps || hasChildren) ? syncAggregateSlots(next, source) : next, updated: true };
  }

  const children = node.children ?? [];
  if (children.length === 0) return { nextNode: node, updated: false };

  let updated = false;
  let changed = false;
  const nextChildren = children.map((c) => {
    if (updated) return c;
    const res = updateNodeInTree(c, targetId, updates);
    if (res.updated) updated = true;
    if (res.nextNode !== c) changed = true;
    return res.nextNode;
  });

  if (!updated) return { nextNode: node, updated: false };
  if (!changed) return { nextNode: node, updated: true };
  return { nextNode: { ...node, children: nextChildren }, updated: true };
}

/**
 * 创建一个新的 ComponentNode（不带画布 Grid 位置信息）
 */
export function createComponentNode(
  type: string,
  category: string,
  props: Record<string, unknown> = {},
): ComponentNode {
  const id = generateId();
  return syncAggregateSlots({
    id,
    type,
    name: `${type}-${id}`,
    category,
    props,
  }, "props");
}

/**
 * Snippet 最小接口（避免循环依赖 @envelope/materials）
 */
interface SnippetLike {
  title?: string;
  props?: Record<string, unknown>;
  children?: Array<Record<string, unknown>>;
}

/**
 * 物料最小接口（避免循环依赖 @envelope/materials）
 */
interface MaterialLike {
  defaultProps?: Record<string, unknown>;
  snippets?: SnippetLike[];
}

/**
 * 从物料定义解析初始 props 和 children
 *
 * V4-F10：拖拽物料时优先使用 snippets[0].props，fallback 到 defaultProps。
 * 对齐 lowcode-engine IPublicTypeSnippet："用户从组件面板拖入组件到设计器时
 * 会向页面 schema 中插入 snippets 中定义的组件低代码 schema"
 *
 * @reference lowcode-engine-main/packages/types/src/shell/type/snippet.ts
 *
 * @param material - 物料定义（含 defaultProps + snippets）
 * @returns { props, children? } — 合并后的初始 props 和可选的子组件
 */
export function resolveInitialProps(
  material: MaterialLike | undefined,
): { props: Record<string, unknown>; children?: ComponentNode[] } {
  if (material?.snippets && material.snippets.length > 0) {
    const snippet = material.snippets[0]!;
    const props = { ...(material.defaultProps ?? {}), ...(snippet.props ?? {}) };
    const children = snippet.children?.length
      ? snippet.children.map((c) => createComponentNode(
          (c.type as string) ?? "Text",
          (c.category as string) ?? "display",
          { ...(c as Record<string, unknown>) },
        ))
      : undefined;
    return { props, children };
  }
  return { props: material?.defaultProps ?? {} };
}
