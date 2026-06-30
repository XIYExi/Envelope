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
  /** 是否为高级属性（默认折叠） */
  advanced: z.boolean().optional(),
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
 * Slot 插槽定义
 *
 * 描述了一个聚合组件可接受子组件的插槽配置：
 * - name: 插槽名称（如 "header"、"content"、"trigger"）
 * - label: 显示名称
 * - allowedChildTypes: 允许的子组件类型列表
 * - max: 最大子组件数量
 * - defaultText: 默认文本内容
 * - toggleKey: 控制显示/隐藏的 prop key
 * - textKey: 文本内容的 prop key
 * - propKey: 数组数据的 prop key（ArraySlot 模式）
 * - mode: 插槽模式（simple / array / count）
 */
export interface SlotDefinition {
  name: string;
  label?: string;
  allowedChildTypes: string[];
  max?: number;
  defaultText?: string;
  toggleKey?: string;
  textKey?: string;
  propKey?: string;
  mode?: "simple" | "array" | "count";
}

export const slotDefinitionSchema: z.ZodType<SlotDefinition> = z.object({
  name: z.string(),
  label: z.string().optional(),
  allowedChildTypes: z.array(z.string()),
  max: z.number().optional(),
  defaultText: z.string().optional(),
  toggleKey: z.string().optional(),
  textKey: z.string().optional(),
  propKey: z.string().optional(),
  mode: z.enum(["simple", "array", "count"]).optional(),
});

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
 * - slots: 插槽配置
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
  /** 展开子组件模板（复合物料使用时自动展开的子组件列表） */
  expandTo: z.array(z.object({ type: z.string(), props: z.record(z.unknown()).optional() })).optional(),
  /** 插槽配置（聚合组件通过 slots 声明子组件结构） */
  slots: z.array(slotDefinitionSchema).optional(),
  /** 物料导入路径与组件名（生成器使用） */
  shadcnImport: z.object({ path: z.string(), components: z.array(z.string()) }).optional(),
  /** 缩略图预设配置（物料面板显示） */
  thumbnail: z.object({ preset: z.string() }).optional(),
  /** 文档链接或说明（可选） */
  documentation: z.string().optional(),
  /** 此组件可绑定的事件类型白名单，不设置则允许所有 */
  bindableEvents: z.array(z.string()).optional(),
  /** 自定义画布预览渲染函数，覆盖默认 simulated 占位渲染 */
  previewRender: z.any().optional(),

  /**
   * 嵌套规则配置
   *
   * 定义组件可以放在哪些父组件内、可以包含哪些子组件。
   * 用于拖拽时校验插入位置的合法性。
   * 不设置表示不做额外限制（但仍受 isContainer/supportsChildren 约束）。
   *
   * @reference lowcode-engine: types/src/shell/type/metadata.ts IPublicTypeNestingRule
   */
  nestingRules: z.object({
    /** 允许的父组件类型白名单。例如 ['Card', 'Tabs'] 表示此组件只能放在 Card 或 Tabs 内。空数组或不设置表示不限制 */
    parentWhitelist: z.array(z.string()).optional(),
    /** 允许的子组件类型白名单。例如 ['CardHeader', 'CardContent'] 表示此容器只能包含这些子组件。空数组表示不接受任何子组件 */
    childWhitelist: z.array(z.string()).optional(),
  }).optional(),

  /**
   * 禁用行为列表
   *
   * 声明此组件在编辑器中禁用的交互行为。
   * 例如 ['delete'] 表示此组件不可删除，['copy', 'move', 'lock', 'delete'] 表示全部禁用。
   * 设置 ['*'] 表示禁用所有交互行为。
   * 不设置表示不限制。
   *
   * @reference lowcode-engine: types/src/shell/type/metadata.ts disableBehaviors
   */
  disableBehaviors: z.array(z.enum(['copy', 'move', 'lock', 'delete', 'hide'])).optional(),

  /**
   * 物料拖拽预设列表
   *
   * 定义组件从物料面板拖入画布时的预设配置。
   * 可以为同一个组件定义多个预设（如 Button 的 "主要按钮"、"危险按钮"、"链接按钮"），
   * 拖拽时默认使用第一个预设。
   * 不设置表示使用 defaultProps 初始化。
   *
   * @reference lowcode-engine: types/src/shell/type/snippet.ts IPublicTypeSnippet
   */
  snippets: z.array(z.object({
    /** 预设名称，用于在物料面板中展示（如 "主要按钮"、"危险按钮"） */
    title: z.string().optional(),
    /** 预设的 props 配置，拖入画布时作为组件初始属性 */
    props: z.record(z.unknown()).optional(),
    /** 预设的子组件模板，拖入画布时自动展开 */
    children: z.array(z.record(z.unknown())).optional(),
  })).optional(),
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
 * 嵌套规则类型
 *
 * 从 materialDefinitionSchema 中的 nestingRules 字段推导。
 */
export type NestingRule = z.infer<typeof materialDefinitionSchema.shape.nestingRules>;

/**
 * 禁用行为类型
 *
 * 编辑器中可禁用的组件交互行为枚举：
 * - copy: 禁用复制
 * - move: 禁用移动
 * - lock: 禁用锁定
 * - delete: 禁用删除
 * - hide: 禁用隐藏
 */
export type BehaviorKind = 'copy' | 'move' | 'lock' | 'delete' | 'hide';

/**
 * 拖拽预设
 *
 * 定义组件从物料面板拖入画布时的初始化配置。
 * 可以为同一个组件定义多个预设方案。
 */
export interface Snippet {
  /** 预设名称（如 "主要按钮"、"危险按钮"） */
  title?: string;
  /** 预设属性配置，作为组件的初始 props */
  props?: Record<string, unknown>;
  /** 预设子组件模板，拖入时自动展开 */
  children?: Record<string, unknown>[];
}

/**
 * 组件操作定义
 *
 * 描述组件在编辑器中可执行的交互操作。
 * 用于操作工具栏（border-selecting.tsx）和右键菜单的动态渲染。
 */
export interface ComponentAction {
  /** 操作名称，与 BehaviorKind 对应 */
  name: string;
  /** 操作显示标签（如 "复制"、"删除"） */
  label: string;
  /** 操作图标名称（Lucide 图标名） */
  icon: string;
  /** 操作快捷提示文本 */
  shortcut?: string;
  /** 条件函数：仅当满足条件时显示此操作（可选）；'always' 表示始终显示 */
  condition?: 'always' | ((component: Record<string, unknown>) => boolean);
}

/**
 * 物料元数据转换器
 *
 * 接收原始物料定义，返回转换后的物料定义。
 * 多个 transducer 通过管道（pipeline）模式链式执行。
 * level 决定执行顺序（数字越小越先执行）。
 *
 * @reference lowcode-engine: types/src/shell/type/metadata-transducer.ts IPublicTypeMetadataTransducer
 */
export interface MetadataTransducer {
  /** 转换函数：接收上一阶段的物料定义，返回转换后的物料定义 */
  (prev: MaterialDefinition): MaterialDefinition;
  /** 执行优先级（0-9: 系统级, 10-99: 内置插件级, 100+: 应用级）；默认 100 */
  level?: number;
  /** 转换器唯一标识 */
  id?: string;
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
  /**
   * 异步注册物料（懒加载）
   *
   * 适用于按需加载的物料，loader 返回 Promise<MaterialDefinition>。
   * 注册完成后可通过 get/has 查询，适合分包场景。
   *
   * @param name - 物料名称（用于去重和缓存）
   * @param loader - 异步加载器，返回物料定义
   */
  registerAsync: (name: string, loader: () => Promise<MaterialDefinition>) => Promise<void>;
  /**
   * 检查物料是否已注册
   *
   * @param name - 物料名称
   * @returns 是否已注册
   */
  has: (name: string) => boolean;

  /**
   * 注册物料元数据转换器
   *
   * 注册后的 transducer 会在每次 register() 时自动执行。
   * 多个 transducer 按 level 升序排列后链式执行。
   * 可用于全局修改物料定义（如自动推断嵌套规则、修正字段格式等）。
   *
   * @param fn - 转换器函数，接收并返回 MaterialDefinition
   */
  registerTransducer: (fn: MetadataTransducer) => void;
}
