/**
 * V5 Canvas Fidelity — previewRender 类型定义和工具函数
 *
 * 对齐 lowcode-engine 的 customCreateElement(Component, props, children) 签名。
 * @reference lowcode-engine-main/packages/react-simulator-renderer/src/renderer-view.tsx:179-267
 */

import type { ComponentNode } from "@envelope/engine";

/**
 * 预览渲染函数签名
 *
 * @param props - 物料 props（从 ComponentNode.props 读取）
 * @param children - 子组件 ReactNode（容器组件时由 ChildrenSlot 提供）
 * @returns ReactNode — 真实 shadcn 组件渲染结果
 */
export type PreviewRenderFn = (
  props: Record<string, unknown>,
  children?: React.ReactNode,
) => React.ReactNode;

/**
 * 设计态专用 prop 白名单
 *
 * 这些 prop 用于模拟渲染或内联编辑，不是真实 shadcn 组件的合法 prop。
 * filterDesignProps 将它们剥离，避免传入真实组件导致 React warning。
 */
const DESIGN_PROPS = new Set([
  "label",
  "text",
  "titleText",
  "descriptionText",
  "showTitle",
  "showDescription",
  "triggerText",
  "placeholder",
  "defaultChecked",
  "defaultValue",
  "cascadeField",
  "selected",
]);

/**
 * 过滤设计态专用 prop，只保留真实组件接受的 prop
 *
 * @param props - 原始 props
 * @param extraStrip - 额外要剥离的 prop 名
 * @returns 过滤后的 props
 */
export function filterDesignProps(
  props: Record<string, unknown>,
  extraStrip?: string[],
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const extraSet = extraStrip ? new Set(extraStrip) : null;
  for (const [key, value] of Object.entries(props)) {
    if (DESIGN_PROPS.has(key)) continue;
    if (extraSet?.has(key)) continue;
    result[key] = value;
  }
  return result;
}

/**
 * 从 props 中安全读取字符串值
 */
export function pstr(props: Record<string, unknown>, key: string, fallback = ""): string {
  const v = props[key];
  return typeof v === "string" ? v : fallback;
}

/**
 * 从 props 中安全读取布尔值
 */
export function pbool(props: Record<string, unknown>, key: string): boolean {
  return props[key] === true;
}

/**
 * 从 props 中安全读取数字值
 */
export function pnum(props: Record<string, unknown>, key: string, fallback = 0): number {
  const v = props[key];
  return typeof v === "number" ? v : fallback;
}
