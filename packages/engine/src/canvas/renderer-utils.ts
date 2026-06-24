/**
 * 画布渲染器工具函数与常量
 *
 * 从 renderer.tsx 提取的公共工具函数和常量，
 * 供 canvas-renderer.tsx、simulated-components-*.tsx 等子模块使用。
 *
 * @author xiye
 * @date 2026-06-25
 */

import { twMerge } from "tailwind-merge";
import type { ComponentNode } from "../schemas/page.schema";
import type { ResizeDirection } from "./resize-utils";

/** 网格单元格高度（px） */
export { CANVAS_CELL_HEIGHT as CELL_HEIGHT } from "../shared/canvas-utils";
export { CANVAS_CELL_WIDTH as CELL_WIDTH } from "../shared/canvas-utils";

/** 缩放手柄的视觉尺寸（px） */
export const RESIZE_HANDLE_SIZE = 12;

/** 标尺的宽/高（px） */
export const RULER_SIZE = 20;

/**
 * 条件类名合并工具函数
 *
 * 过滤掉假值后使用 tailwind-merge 合并类名，解决 Tailwind 类名冲突。
 *
 * @param inputs - 类名字符串或假值
 * @returns 合并后的类名字符串
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(...inputs.filter(Boolean).map(String));
}

/**
 * 安全地从组件属性中提取字符串值
 *
 * @param props - 组件属性对象（可能为 undefined）
 * @param key - 属性键名
 * @param fallback - 属性不存在或类型不匹配时的默认值
 * @returns 提取的字符串值
 */
export function pstr(props: Record<string, unknown> | undefined, key: string, fallback: string): string {
  const v = props?.[key];
  return typeof v === "string" ? v : fallback;
}

/**
 * 解析画布预览用的 Tailwind 类名
 *
 * 约定：
 * - 真实来源为 ComponentNode.tailwindClasses
 * - 为兼容旧数据，若 tailwindClasses 为空则回退读取 props.className
 * - 渲染时仍然会与 CanvasRenderer 自身的交互样式（选中态边框等）做 twMerge 合并
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
export function getPreviewTailwindClasses(node: ComponentNode): string {
  const canonical = typeof node.tailwindClasses === "string" ? node.tailwindClasses : "";
  const legacy = typeof node.props?.["className"] === "string" ? String(node.props["className"]) : "";
  return cn(canonical, legacy);
}

/**
 * 安全地从组件属性中提取数字值
 *
 * @param props - 组件属性对象（可能为 undefined）
 * @param key - 属性键名
 * @param fallback - 属性不存在或类型不匹配时的默认值
 * @returns 提取的数字值
 */
export function pnum(props: Record<string, unknown> | undefined, key: string, fallback: number): number {
  const v = props?.[key];
  return typeof v === "number" ? v : fallback;
}

/**
 * 安全地从组件属性中提取布尔值
 *
 * @param props - 组件属性对象（可能为 undefined）
 * @param key - 属性键名
 * @returns 属性的布尔值（通过 !! 转换）
 */
export function pbool(props: Record<string, unknown> | undefined, key: string): boolean {
  return !!props?.[key];
}

/**
 * 安全地从组件属性中提取数组值
 *
 * @param props - 组件属性对象（可能为 undefined）
 * @param key - 属性键名
 * @param fallback - 属性不存在或类型不匹配时的默认值
 * @returns 提取的数组值
 */
export function parr<T = unknown>(props: Record<string, unknown> | undefined, key: string, fallback: T[]): T[] {
  const v = props?.[key];
  return Array.isArray(v) ? (v as T[]) : fallback;
}

/** 紧凑模式样式覆盖表，将根级样式映射为子组件紧凑版 */
export const COMPACT_STYLES = {
  buttonSize: "px-2 py-0.5 text-[10px]",
  inputHeight: "h-6",
  badgeSize: "px-1.5 py-0 text-[10px]",
  cardPadding: "p-1",
  avatarSize: "h-6 w-6",
  skeletonHeight: "h-3",
  progressHeight: "h-1.5",
} as const;

/**
 * 各方向缩放手柄的定位样式
 *
 * 手柄定位在组件的边缘或角落外侧 50% 处，
 * 使用负 margin 使手柄视觉居中于边缘线上。
 */
export const resizeHandleStyles: Record<ResizeDirection, React.CSSProperties> = {
  n: { top: -RESIZE_HANDLE_SIZE / 2, left: "50%", marginLeft: -RESIZE_HANDLE_SIZE / 2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "n-resize" },
  s: { bottom: -RESIZE_HANDLE_SIZE / 2, left: "50%", marginLeft: -RESIZE_HANDLE_SIZE / 2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "s-resize" },
  e: { right: -RESIZE_HANDLE_SIZE / 2, top: "50%", marginTop: -RESIZE_HANDLE_SIZE / 2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "e-resize" },
  w: { left: -RESIZE_HANDLE_SIZE / 2, top: "50%", marginTop: -RESIZE_HANDLE_SIZE / 2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "w-resize" },
  ne: { top: -RESIZE_HANDLE_SIZE / 2, right: -RESIZE_HANDLE_SIZE / 2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "ne-resize" },
  nw: { top: -RESIZE_HANDLE_SIZE / 2, left: -RESIZE_HANDLE_SIZE / 2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "nw-resize" },
  se: { bottom: -RESIZE_HANDLE_SIZE / 2, right: -RESIZE_HANDLE_SIZE / 2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "se-resize" },
  sw: { bottom: -RESIZE_HANDLE_SIZE / 2, left: -RESIZE_HANDLE_SIZE / 2, width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE, cursor: "sw-resize" },
};

/** 所有缩放手柄方向的数组，用于遍历渲染 */
export const allResizeDirections: ResizeDirection[] = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];
