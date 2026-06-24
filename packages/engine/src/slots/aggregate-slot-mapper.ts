/**
 * 聚合组件 Slots ↔ ChildrenTree 映射器入口
 *
 * 最终实现已拆分至独立模块：
 * - aggregate-slot-engine.ts   声明式 Slot 引擎
 * - slot-configs.ts            组件配置注册表
 * - slot-mappers/              各组件自定义 mapper
 *
 * 本文件仅保留转发逻辑，将 syncAggregateSlotsPropsToChildren /
 * syncAggregateSlotsChildrenToProps 分发至引擎层。
 *
 * @author xiye
 * @date 2026-06-25
 * @since 3.0.0
 */

import type { ComponentNode } from "../schemas/page.schema";
import { SLOT_CONFIGS } from "./slot-configs";
import { applyPropsToChildren, applyChildrenToProps } from "./aggregate-slot-engine";
import { cloneNode } from "../shared/canvas-utils";

export type AggregateSlotSyncSource = "props" | "children";

/**
 * 将"聚合组件 slots（props）"同步为 children tree（递归）
 */
export function syncAggregateSlotsPropsToChildren(node: ComponentNode): ComponentNode {
  const config = SLOT_CONFIGS[node.type];
  const synced = config ? applyPropsToChildren(node, config) : cloneNode(node);
  if (synced.children && synced.children.length > 0) {
    synced.children = synced.children.map(syncAggregateSlotsPropsToChildren);
  }
  return synced;
}

/**
 * 将 children tree 反向同步为"聚合组件 slots（props）"（递归）
 */
export function syncAggregateSlotsChildrenToProps(node: ComponentNode): ComponentNode {
  const config = SLOT_CONFIGS[node.type];
  const synced = config ? applyChildrenToProps(node, config) : cloneNode(node);
  if (synced.children && synced.children.length > 0) {
    synced.children = synced.children.map(syncAggregateSlotsChildrenToProps);
  }
  return synced;
}

/**
 * 在一次更新中执行 slots 双向同步（根据来源决定方向）
 */
export function syncAggregateSlots(node: ComponentNode, source: AggregateSlotSyncSource): ComponentNode {
  if (source === "props") return syncAggregateSlotsPropsToChildren(node);
  return syncAggregateSlotsChildrenToProps(node);
}
