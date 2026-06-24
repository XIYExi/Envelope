/**
 * 声明式 Slot 引擎
 *
 * 读取 MaterialDefinition.slots 配置，驱动 props↔children 双向同步。
 *
 * 支持模式：
 * - SimpleSlot: toggle + text → 子组件（Card header、Alert title、Collapsible）
 * - ArraySlot: 数组 prop → 子组件列表（Select options、Breadcrumb items）
 * - CountSlot: 数量 prop → N 个子组件（Pagination pageCount）
 * - 复杂组件通过 registerCustomSlotSync 注册
 */
import type { ComponentNode } from "../schemas/page.schema";
import type { SlotDefinition } from "@envelope/materials";
import {
  newId,
  ensureProps,
  ensureChildren,
  cloneNode,
  propBool,
  propStr,
  propNum,
  isRecord,
  makeTextNode,
  pickTextFromNode,
} from "../shared/canvas-utils";

function upsertChild(
  children: ComponentNode[],
  childType: string,
  category: string,
  factory: (reuse?: ComponentNode) => ComponentNode,
): { children: ComponentNode[]; node: ComponentNode } {
  const idx = children.findIndex((c) => c.type === childType);
  if (idx >= 0) {
    const n = factory(children[idx]);
    const next = children.slice();
    next[idx] = n;
    return { children: next, node: n };
  }
  const n = factory(undefined);
  return { children: [...children, n], node: n };
}

function removeByType(children: ComponentNode[], childType: string): ComponentNode[] {
  return children.filter((c) => c.type !== childType);
}

/* ───────── Slot 查找 ───────── */

let _slotLookup: ((type: string) => SlotDefinition[] | undefined) | null = null;

/**
 * 设置全局 Slot 查找函数（通常在应用初始化时设置一次）
 */
export function setSlotLookup(fn: (type: string) => SlotDefinition[] | undefined): void {
  _slotLookup = fn;
}

export function getSlotsForType(type: string): SlotDefinition[] {
  const slots = _slotLookup?.(type);
  return slots ?? [];
}

/* ───────── 模式: SimpleSlot ───────── */

function syncSimpleSlotForward(
  children: ComponentNode[],
  slot: SlotDefinition,
  props: Record<string, unknown>,
  category: string,
): ComponentNode[] {
  const toggleKey = slot.toggleKey ?? `show${capitalize(slot.name)}`;
  const textKey = slot.textKey ?? `${slot.name}Text`;
  const show = propBool(props, toggleKey, true);
  const childType = slot.allowedChildTypes[0];
  if (!childType) return children;

  if (!show) return removeByType(children, childType);

  const text = propStr(props, textKey, slot.defaultText ?? "");
  return upsertChild(children, childType, category, (reuse) => {
    const existing = ensureChildren(reuse ?? ({} as ComponentNode));
    const textReuse = existing.find((c) => c.type === "Text");
    return {
      id: reuse?.id ?? newId(),
      type: childType,
      name: `${childType}-${reuse?.id ?? newId()}`,
      category,
      props: reuse?.props,
      children: [makeTextNode(text, category, textReuse)],
    };
  }).children;
}

function syncSimpleSlotReverse(
  children: ComponentNode[],
  slot: SlotDefinition,
): Record<string, unknown> {
  const toggleKey = slot.toggleKey ?? `show${capitalize(slot.name)}`;
  const textKey = slot.textKey ?? `${slot.name}Text`;
  const childType = slot.allowedChildTypes[0];
  if (!childType) return {};

  const child = children.find((c) => c.type === childType);
  const extracted: Record<string, unknown> = {};
  extracted[toggleKey] = Boolean(child);
  if (child) {
    const text = pickTextFromNode(child.children?.[0]);
    if (text !== null) extracted[textKey] = text;
  }
  return extracted;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ───────── 模式: ArraySlot ───────── */

function syncArraySlotForward(
  children: ComponentNode[],
  slot: SlotDefinition,
  props: Record<string, unknown>,
  category: string,
): ComponentNode[] {
  const sourceProp = slot.propKey ?? slot.name;
  const rawVal = props[sourceProp];
  const items = Array.isArray(rawVal) ? rawVal.filter((v): v is string => typeof v === "string") : [];
  const childType = slot.allowedChildTypes[0];
  if (!childType) return children;

  const nonSlot = children.filter((c) => c.type !== childType);
  const existing = children.filter((c) => c.type === childType);

  const synced: ComponentNode[] = items.map((label, i) => {
    const reuse = existing[i];
    const id = reuse?.id ?? newId();
    const textReuse = ensureChildren(reuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");
    return {
      id,
      type: childType,
      name: `${childType}-${id}`,
      category,
      props: reuse?.props,
      children: [makeTextNode(label, category, textReuse)],
    };
  });

  return [...nonSlot, ...synced];
}

function syncArraySlotReverse(
  children: ComponentNode[],
  slot: SlotDefinition,
): Record<string, unknown> {
  const childType = slot.allowedChildTypes[0];
  if (!childType) return {};
  const items = children
    .filter((c) => c.type === childType)
    .map((c, i) => pickTextFromNode(c.children?.[0]) ?? `Item ${i + 1}`);
  const sourceProp = slot.propKey ?? slot.name;
  return { [sourceProp]: items };
}

/* ───────── 复杂组件 customSync 注册表 ───────── */

export type SlotSyncFn = (node: ComponentNode, slots: SlotDefinition[]) => ComponentNode;

interface CustomSyncEntry {
  forward: SlotSyncFn;
  reverse: SlotSyncFn;
}

const customSyncRegistry = new Map<string, CustomSyncEntry>();

/**
 * 注册复杂组件的自定义同步函数
 */
export function registerCustomSlotSync(
  type: string,
  forward: SlotSyncFn,
  reverse: SlotSyncFn,
): void {
  customSyncRegistry.set(type, { forward, reverse });
}

/**
 * 检查某组件类型是否注册了自定义同步
 */
export function hasCustomSync(type: string): boolean {
  return customSyncRegistry.has(type);
}

/* ───────── 引擎入口 ───────── */

/**
 * Props → Children 同步（前向）
 */
export function syncPropsToChildren(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);

  const customEntry = customSyncRegistry.get(next.type);
  if (customEntry) {
    const slots = getSlotsForType(next.type);
    return customEntry.forward(node, slots);
  }

  const slots = getSlotsForType(next.type);
  if (slots.length === 0) return next;

  const p = ensureProps(next);
  let children = ensureChildren(next);

  for (const slot of slots) {
    if (slot.propKey) {
      children = syncArraySlotForward(children, slot, p, next.category);
    } else {
      children = syncSimpleSlotForward(children, slot, p, next.category);
    }
  }

  next.children = children.length > 0 ? children : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

/**
 * Children → Props 反向同步
 */
export function syncChildrenToProps(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);

  const customEntry = customSyncRegistry.get(next.type);
  if (customEntry) {
    const slots = getSlotsForType(next.type);
    return customEntry.reverse(node, slots);
  }

  const slots = getSlotsForType(next.type);
  if (slots.length === 0) return next;

  const p = ensureProps(next);
  const children = ensureChildren(next);

  for (const slot of slots) {
    if (slot.propKey) {
      Object.assign(p, syncArraySlotReverse(children, slot));
    } else {
      Object.assign(p, syncSimpleSlotReverse(children, slot));
    }
  }

  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

/**
 * 根据来源方向执行双向同步
 */
export function syncSlots(node: ComponentNode, source: "props" | "children"): ComponentNode {
  if (source === "props") return syncPropsToChildren(node);
  return syncChildrenToProps(node);
}
