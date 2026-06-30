/**
 * 聚合组件声明式 Slot 引擎
 *
 * 替代 aggregate-slot-mapper.ts 中手写的 switch-case 分发逻辑，
 * 基于 SlotFieldDef 配置声明式驱动 props ↔ children 双向同步。
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { ComponentNode } from "../schemas/page.schema";
import type { AggregateSlotConfig, SlotFieldDef } from "./slot-engine-types";
import {
  newId,
  ensureProps,
  ensureChildren,
  cloneNode,
  propBool,
  propStr,
  propNum,
  pickTextFromNode,
  makeTextNode,
  isRecord,
} from "../shared/canvas-utils";

/** 类型安全的 children 数组提取 */
function ensureChildrenArray(node: ComponentNode): ComponentNode[] {
  return ensureChildren(node) as ComponentNode[];
}

/** 查找或创建特定 type 的子组件 */
function upsertOrCreate(
  children: ComponentNode[],
  childType: string,
  category: string,
  text: string,
): { nextChildren: ComponentNode[]; node: ComponentNode } {
  const idx = children.findIndex((c) => c.type === childType);
  if (idx >= 0) {
    const reuse = children[idx]!;
    const existing = ensureChildrenArray(reuse);
    const textReuse = existing.find((c) => c.type === "Text");
    const next: ComponentNode = {
      ...reuse,
      children: [makeTextNode(text, category, textReuse)],
    };
    const nextChildren = children.slice();
    nextChildren[idx] = next;
    return { nextChildren, node: next };
  }
  const id = newId();
  const next: ComponentNode = {
    id,
    type: childType,
    name: `${childType}-${id}`,
    category,
    children: [makeTextNode(text, category)],
  };
  return { nextChildren: [...children, next], node: next };
}

/** 移除特定 type 的子组件 */
function removeChildByType(children: ComponentNode[], childType: string): ComponentNode[] {
  return children.filter((c) => c.type !== childType);
}

/**
 * 声明式 props → children 同步引擎
 *
 * 遍历 config.slots 中每个字段：
 * - boolean 类型：控制对应 text slot 子组件的显隐
 * - text 类型（受 boolean 控制）：创建/复用对应子组件并设置文本
 */
export function applyPropsToChildren(node: ComponentNode, config: AggregateSlotConfig): ComponentNode {
  if (config.customMapper) return config.customMapper.propsToChildren(node);

  const next = cloneNode(node);
  const p = ensureProps(next);
  const existing = ensureChildrenArray(next);

  let cur = existing;
  for (const slot of config.slots!) {
    if (slot.kind === "boolean") {
      const visible = propBool(p, slot.propKey, slot.default as boolean);
      const controlled = slot.controlsVisibility;
      if (controlled) {
        const textSlot = config.slots!.find(s => s.propKey === controlled && s.kind === "text");
        if (textSlot?.childType) {
          if (visible) {
            const text = propStr(p, controlled, textSlot.default as string);
            const { nextChildren } = upsertOrCreate(cur, textSlot.childType, next.category, text);
            cur = nextChildren;
          } else {
            cur = removeChildByType(cur, textSlot.childType);
          }
        }
      }
    }
  }
  next.children = cur.length > 0 ? cur : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

/**
 * 声明式 children → props 同步引擎
 *
 * 从 children tree 中提取文本回写到 props：
 * - 查找对应 childType 的子组件，提取文本内容回写到对应 propKey
 * - 根据子组件是否存在设置 boolean 字段
 */
export function applyChildrenToProps(node: ComponentNode, config: AggregateSlotConfig): ComponentNode {
  if (config.customMapper) return config.customMapper.childrenToProps(node);

  const next = cloneNode(node);
  const p = ensureProps(next);
  const children = ensureChildrenArray(next);

  for (const slot of config.slots!) {
    if (slot.kind === "text" && slot.childType) {
      const child = children.find(c => c.type === slot.childType);
      (p as any)[slot.propKey] = child
        ? (pickTextFromNode(child.children?.[0]) ?? slot.default)
        : slot.default;
    }
    if (slot.kind === "boolean" && slot.controlsVisibility) {
      const textSlot = config.slots!.find(s => s.propKey === slot.controlsVisibility);
      if (textSlot?.childType) {
        (p as any)[slot.propKey] = children.some(c => c.type === textSlot.childType);
      }
    }
  }
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

// 重新导出工具函数供 customMapper 使用
export { cloneNode, ensureProps, ensureChildrenArray, propBool, propStr, propNum, pickTextFromNode, makeTextNode, newId, isRecord };
