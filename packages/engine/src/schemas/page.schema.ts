/**
 * 页面 Schema 定义
 *
 * 定义了页面（Page）和组件树（Component Tree）的数据结构：
 * - ComponentNode: 单个组件节点，支持递归嵌套（组件可以包含子组件）
 * - PageSchema: 完整页面结构，包含元数据、布局、组件树
 *
 * 组件树使用 12 列 CSS Grid 布局系统，
 * 每个组件通过 grid 属性指定在网格中的位置。
 *
 * @author xiye
 * @date 2026/6/13
 */
import { z } from "zod";

/**
 * 组件节点接口
 * 描述画布上一个组件的所有信息
 * 支持递归嵌套：children 字段可以包含更多 ComponentNode
 */
export interface ComponentNode {
  /** 组件唯一 ID（UUID 格式） */
  id: string;
  /** 组件名称，用于在画布上显示, 默认是组件类型+id，如：Button-{{uuid}} */
  name?: string;
  /** 组件类型名称，如 "Button"、"Card"、"Input" */
  type: string;
  /** 组件分类，如 "form"、"layout"、"display" */
  category: string;
  /** 组件属性（key-value 形式，具体属性由组件类型决定） */
  props?: Record<string, unknown>;
  /** Tailwind CSS 类名，用于自定义样式 */
  tailwindClasses?: string;
  /** 数据绑定配置，将组件属性绑定到 Supabase 查询结果 */
  dataBindings?: Record<string, string>;
  /** 事件绑定配置，将组件事件（onClick、onSubmit 等）绑定到业务流程 */
  eventBindings?: Record<string, string>;
  /** 子组件列表，实现组件嵌套（如 Card > CardHeader > Button） */
  children?: ComponentNode[];
  /** 网格布局位置（12 列 CSS Grid） */
  grid?: {
    /** 列位置（1-12） */
    col: number;
    /** 行位置（从 1 开始） */
    row: number;
    /** 列跨度（占几列），默认 1 */
    colSpan?: number;
    /** 行跨度（占几行），默认 1 */
    rowSpan?: number;
  };
  /** 注释说明，会导出到生成的代码中作为注释 */
  comment?: string;
}

/**
 * 组件节点的 Zod Schema（递归定义）
 *
 * 使用 z.lazy() 实现递归：children 字段引用自身。
 * 这样可以验证任意深度的组件嵌套结构。
 *
 * 示例：一个卡片组件可能长这样
 * {
 *   id: "abc", type: "Card", category: "layout",
 *   children: [
 *     { id: "def", type: "CardHeader", ... },
 *     { id: "ghi", type: "Button", props: { label: "Click" } }
 *   ]
 * }
 */
export const componentSchema: z.ZodType<ComponentNode> = z.lazy(() =>
  z.object({
    /** 组件唯一 ID */
    id: z.string(),
    /** 组件名称，用于在画布上显示, 默认是组件类型+id，如：Button-{{uuid}} */
    name: z.string().optional(),
    /** 组件类型名称 */
    type: z.string(),
    /** 组件分类 */
    category: z.string(),
    /** 组件属性（任意 key-value） */
    props: z.record(z.unknown()).optional(),
    /** Tailwind CSS 类名 */
    tailwindClasses: z.string().optional(),
    /** 数据绑定配置 */
    dataBindings: z.record(z.string()).optional(),
    /** 事件绑定配置 */
    eventBindings: z.record(z.string()).optional(),
    /** 子组件列表（递归引用 componentSchema） */
    children: z.array(componentSchema).optional(),
    /** 网格布局位置 */
    grid: z.object({
      /** 列位置，范围 1-12 */
      col: z.number().min(1).max(12),
      /** 行位置，最小为 1 */
      row: z.number().min(1),
      /** 列跨度，最小为 1 */
      colSpan: z.number().min(1).optional(),
      /** 行跨度，最小为 1 */
      rowSpan: z.number().min(1).optional(),
    }).optional(),
    /** 注释说明 */
    comment: z.string().optional(),
  }).transform(data => ({
    ...data,
    name: data.name?.trim() || `${data.type}-${data.id}`,
  })),
) as z.ZodType<ComponentNode>;

/**
 * 页面 Schema 接口
 * 描述一个完整页面的所有信息
 */
export interface PageSchema {
  /** Schema 版本号 */
  version: string;
  /** 页面标题（必填，用于显示和 SEO） */
  title: string;
  /** 页面描述（可选，用于 SEO meta 标签） */
  description?: string;
  /** 页面路径（如 "/dashboard"、"/settings/profile"） */
  path: string;
  /** 关联的布局组件 ID（可选，如 "dashboard-layout"） */
  layout?: string;
  /** 页面内边距（px），对应画布 padding */
  padding?: number;
  /** SEO 元数据 */
  metadata?: {
    /** 自定义标题 */
    title?: string;
    /** 自定义描述 */
    description?: string;
    /** Open Graph 图片 URL（社交分享时显示） */
    ogImage?: string;
  };
  /** 页面背景配置 */
  background?: {
    /** 背景色 */
    color?: string;
    /** 背景图片 URL */
    image?: string;
  };
  /** 页面组件树（从根组件开始的嵌套结构） */
  components?: ComponentNode[];
}

/**
 * 页面的 Zod Schema
 * 校验页面 JSON 数据的合法性
 */
export const pageSchema: z.ZodType<PageSchema> = z.object({
  /** Schema 版本号，默认 3.0.0 */
  version: z.string().optional().default("3.0.0"),
  /** 页面标题，必填，至少 1 个字符 */
  title: z.string().min(1),
  /** 页面描述 */
  description: z.string().optional(),
  /** 页面路径 */
  path: z.string(),
  /** 关联的布局组件 ID */
  layout: z.string().optional(),
  /** 页面内边距 */
  padding: z.number().int().min(0).optional().default(16),
  /** SEO 元数据，默认空对象 */
  metadata: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      ogImage: z.string().optional(),
    })
    .optional()
    .default({}),
  /** 页面背景配置，默认空对象 */
  background: z
    .object({
      color: z.string().optional(),
      image: z.string().optional(),
    })
    .optional()
    .default({}),
  /** 组件树，默认空数组 */
  components: z.array(componentSchema).optional().default([]),
}) as z.ZodType<PageSchema>;
