/**
 * 物料类型定义
 *
 * 定义了物料系统的核心数据结构，包括：
 * - editablePropSchema: 组件可编辑属性的 Schema 定义
 * - componentCategorySchema: 组件分类枚举
 * - materialDefinitionSchema: 物料定义的完整 Schema
 * - MaterialRegistry: 物料注册表接口
 *
 * 所有 TypeScript 类型都从 Zod Schema 推导（z.infer），
 * 保证类型定义和运行时校验始终一致。
 *
 * @author xiye
 * @date 2026/6/13
 */
/**
 * 物料类型定义
 *
 * 定义了组件物料系统的核心数据结构：
 * - EditableProp: 组件可编辑属性的描述（类型、默认值、选项等）
 * - ComponentCategory: 组件分类（布局、表单、展示、反馈等）
 * - MaterialDefinition: 组件物料的完整定义（名称、属性、默认值等）
 * - MaterialRegistry: 物料注册表接口（查询、注册等操作）
 *
 * 物料系统是连接组件库和可视化编辑器的桥梁，
 * 每个 shadcn/ui 组件都通过物料定义来支持属性编辑。
 *
 * @author xiye
 * @date 2026/6/14
 */
import { z } from "zod";

/**
 * 可编辑属性 Schema
 *
 * 定义了组件属性编辑器支持的所有字段类型：
 * - text/number/textarea: 基础输入类型
 * - select/radio: 选项选择类型
 * - color/switch: 颜色选择和开关类型
 * - image/richText/json/code: 媒体和富内容类型
 * - icon: 图标选择类型
 * - tailwind: Tailwind CSS 类名编辑
 * - dataBinding: 数据绑定配置
 * - eventBinding: 事件绑定配置
 */
export const editablePropSchema = z.object({
  /** 属性键名（对应组件 props 中的字段名） */
  key: z.string(),
  /** 属性显示名称（在编辑器中展示） */
  label: z.string(),
  /** 属性类型，决定编辑器使用哪种输入控件 */
  type: z.enum([
    "text",
    "number",
    "textarea",
    "select",
    "color",
    "switch",
    "radio",
    "image",
    "richText",
    "json",
    "code",
    "icon",
    "tailwind",
    "dataBinding",
    "eventBinding",
  ]),
  /** 属性默认值 */
  defaultValue: z.unknown().optional(),
  /** 选项列表（仅 select/radio 类型使用） */
  options: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  /** 输入占位符文本 */
  placeholder: z.string().optional(),
  /** 是否必填 */
  required: z.boolean().optional(),
  /** 最小值（仅 number 类型使用） */
  min: z.number().optional(),
  /** 最大值（仅 number 类型使用） */
  max: z.number().optional(),
  /** 属性说明注释（会显示在编辑器中） */
  comment: z.string().optional(),
  /** 属性分组名称（用于编辑器中的分组显示） */
  group: z.string().optional(),
  /** 属性排序权重（数字越小越靠前） */
  order: z.number().optional(),
});

/**
 * 可编辑属性类型
 *
 * 从 editablePropSchema 推导出的 TypeScript 类型，
 * 用于类型安全的属性定义。
 */
export type EditableProp = z.infer<typeof editablePropSchema>;

/**
 * 组件分类 Schema
 *
 * 定义了组件的所有可能分类：
 * - layout: 布局组件（Card、Separator 等）
 * - form: 表单组件（Button、Input、Label 等）
 * - display: 展示组件（Avatar、Badge 等）
 * - feedback: 反馈组件（Skeleton 等）
 * - navigation: 导航组件（Menu、Tabs 等）
 * - data: 数据组件（Table、List 等）
 * - overlay: 覆盖层组件（Dialog、Drawer 等）
 * - custom: 自定义组件
 */
export const componentCategorySchema = z.enum([
  "layout",
  "form",
  "display",
  "feedback",
  "navigation",
  "data",
  "overlay",
  "custom",
]);

/**
 * 组件分类类型
 *
 * 从 componentCategorySchema 推导出的 TypeScript 类型。
 */
export type ComponentCategory = z.infer<typeof componentCategorySchema>;

/**
 * 物料定义 Schema
 *
 * 描述了一个组件物料的完整信息：
 * - name: 组件类型名称（如 "Button"、"Card"）
 * - displayName: 显示名称（如 "Button"、"Card"）
 * - description: 组件描述
 * - category: 组件分类
 * - icon: 图标名称（Lucide 图标）
 * - editableProps: 可编辑属性列表
 * - defaultProps: 默认属性值
 * - supportsChildren: 是否支持子组件
 * - maxChildren: 最大子组件数量
 * - isContainer: 是否是容器组件
 * - documentation: 文档链接或说明
 */
export const materialDefinitionSchema = z.object({
  /** 组件类型名称（唯一标识，如 "Button"） */
  name: z.string(),
  /** 显示名称（在编辑器中展示） */
  displayName: z.string(),
  /** 组件描述（可选） */
  description: z.string().optional(),
  /** 组件分类 */
  category: componentCategorySchema,
  /** 图标名称（Lucide 图标名，可选） */
  icon: z.string().optional(),
  /** 是否在组件菜单（palette）中展示（可选；默认展示） */
  showInPalette: z.boolean().optional(),
  /** 可编辑属性列表（决定编辑器中显示哪些属性） */
  editableProps: z.array(editablePropSchema).optional(),
  /** 默认属性值（组件初始化时使用的属性） */
  defaultProps: z.record(z.unknown()).optional(),
  /** 是否支持子组件（如 Card 支持子组件，Button 不支持） */
  supportsChildren: z.boolean().optional(),
  /** 最大子组件数量（不限制则不设置） */
  maxChildren: z.number().optional(),
  /** 是否是容器组件（容器组件可以包裹其他组件） */
  isContainer: z.boolean().optional(),
  /** 文档链接或说明（可选） */
  documentation: z.string().optional(),
});

/**
 * 物料定义类型
 *
 * 从 materialDefinitionSchema 推导出的 TypeScript 类型。
 */
export type MaterialDefinition = z.infer<typeof materialDefinitionSchema>;

/**
 * 获取属性默认值
 *
 * 从 EditableProp 中提取默认值，支持泛型类型推断。
 *
 * @param prop - 可编辑属性定义
 * @returns 属性的默认值
 */
export function getDefaultValue<T = unknown>(prop: EditableProp): T {
  return prop.defaultValue as T;
}

/**
 * 物料注册表接口
 *
 * 定义了物料注册表的所有操作方法：
 * - getByCategory: 按分类查询物料
 * - getAll: 获取所有物料
 * - get: 按名称获取物料
 * - register: 注册单个物料
 * - registerAll: 批量注册物料
 */
export interface MaterialRegistry {
  /**
   * 按分类获取物料列表
   * @param category - 组件分类
   * @returns 该分类下的所有物料（按 displayName 排序）
   */
  getByCategory: (category: ComponentCategory) => MaterialDefinition[];
  /**
   * 获取所有物料列表
   * @returns 所有物料（按 displayName 排序）
   */
  getAll: () => MaterialDefinition[];
  /**
   * 按名称获取物料
   * @param name - 组件类型名称（如 "Button"）
   * @returns 物料定义（不存在则返回 undefined）
   */
  get: (name: string) => MaterialDefinition | undefined;
  /**
   * 注册单个物料
   * @param def - 物料定义
   */
  register: (def: MaterialDefinition) => void;
  /**
   * 批量注册物料
   * @param defs - 物料定义数组
   */
  registerAll: (defs: MaterialDefinition[]) => void;
}

/**
 * 物料注册表接口
 *
 * 定义了物料管理的核心 API，支持：
 * - 按分类获取组件列表
 * - 获取所有已注册组件
 * - 按名称获取单个组件
 * - 注册新组件
 * - 批量注册组件
 */
export interface MaterialRegistry {
  /** 按分类获取组件列表，按 displayName 排序 */
  getByCategory: (category: ComponentCategory) => MaterialDefinition[];
  /** 获取所有已注册组件，按 displayName 排序 */
  getAll: () => MaterialDefinition[];
  /** 按名称获取单个组件，不存在返回 undefined */
  get: (name: string) => MaterialDefinition | undefined;
  /** 注册单个组件 */
  register: (def: MaterialDefinition) => void;
  /** 批量注册组件 */
  registerAll: (defs: MaterialDefinition[]) => void;
}
