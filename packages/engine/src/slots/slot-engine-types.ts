/**
 * 聚合组件 Slot 字段定义类型
 *
 * 用于声明式描述聚合组件的 slots ↔ children 映射关系。
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { ComponentNode } from "../schemas/page.schema";

/** 单个 Slot 字段定义 */
export interface SlotFieldDef {
  /** props 中的字段名 */
  propKey: string;
  /** 字段类型 */
  kind: "boolean" | "text" | "array";
  /** 对应的子组件 type（仅 text/array 需要） */
  childType?: string;
  /** 默认值 */
  default: unknown;
  /** 控制子组件的显示/隐藏（仅 boolean 类型），指向另一个 SlotFieldDef.propKey（text 类型） */
  controlsVisibility?: string;
}

/** 聚合组件配置 */
export interface AggregateSlotConfig {
  /** 聚合组件 type 名 */
  type: string;
  /** 声明式字段定义（简单组件使用） */
  slots?: SlotFieldDef[];
  /** 自定义 mapper 函数（复杂组件使用） */
  customMapper?: {
    propsToChildren: (node: ComponentNode) => ComponentNode;
    childrenToProps: (node: ComponentNode) => ComponentNode;
  };
}
