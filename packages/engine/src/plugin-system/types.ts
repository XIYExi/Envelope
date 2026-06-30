/**
 * 插件系统类型定义
 *
 * 定义插件创建器、插件配置、插件元数据和插件上下文的类型。
 * 参考 lowcode-engine-main/packages/types/src/shell/type/plugin-context.ts
 * 的 IPublicModelPluginContext 接口设计，简化适配 Envelope 的 React + Zustand 技术栈。
 */

import type { ComponentType } from "react";

/**
 * 骨架插槽名称
 * 编辑器布局中允许插件注册的区域
 */
export type SkeletonSlot =
  /** 左侧导航栏（模式切换项） */
  | "left-nav"
  /** 主内容区（编辑器面板，如数据模型、路由等） */
  | "main-area"
  /** 顶部工具栏 */
  | "toolbar";

/**
 * 插件配置对象
 * 由插件创建函数返回，定义插件的生命周期行为
 */
export interface PluginConfig {
  /** 插件初始化函数，在插件启动时调用 */
  init(): void | Promise<void>;
  /** 插件销毁函数，在插件卸载时调用（可选） */
  destroy?(): void | Promise<void>;
  /** 插件导出对象，暴露给其他插件使用的 API（可选） */
  exports?(): Record<string, unknown>;
}

/**
 * 插件元数据
 * 声明插件名称、依赖关系和插槽分配
 */
export interface PluginMeta {
  /** 插件唯一名称，用于依赖引用和标识 */
  name: string;
  /** 插件依赖列表，声明此插件依赖的其他插件名称 */
  dependencies?: string[];
  /** 插件渲染的骨架插槽列表 */
  slots?: SkeletonSlot[];
}

/**
 * 插件创建函数
 * 接收 PluginContext 和可选的配置选项，返回 PluginConfig
 */
export type PluginCreator = (
  /** 插件上下文，包含骨架/事件/日志等 API */
  ctx: PluginContext,
  /** 插件配置选项，由注册时传入 */
  options?: Record<string, unknown>,
) => PluginConfig;

/**
 * 骨架项定义
 * 注册到骨架插槽的 UI 项
 */
export interface SkeletonItem {
  /** 唯一名称 */
  name: string;
  /** 显示标签 */
  label: string;
  /** 图标名称（可选，对应 Lucide 图标名） */
  icon?: string;
  /** 渲染的 React 组件 */
  component: ComponentType<Record<string, unknown>>;
  /** 此骨架项所属的插件名称（可选） */
  pluginName?: string;
  /** 排序优先级（可选，数字越小越靠前） */
  priority?: number;
}

/**
 * 插件上下文
 * 传递给插件创建函数的上下文对象，提供骨架/事件/日志等 API
 */
export interface PluginContext {
  /** 当前插件名称 */
  pluginName: string;
  /** 骨架 API，用于注册面板和 UI 组件 */
  skeleton: SkeletonAPI;
  /** 日志工具，提供带插件前缀的日志输出 */
  logger: {
    /** 信息日志 */
    info: (msg: string, ...args: unknown[]) => void;
    /** 警告日志 */
    warn: (msg: string, ...args: unknown[]) => void;
    /** 错误日志 */
    error: (msg: string, ...args: unknown[]) => void;
  };
  /** 插件偏好配置，注册时传入的配置选项 */
  preference: Record<string, unknown>;
}

/**
 * 骨架 API
 * 插件用于注册面板和 UI 项的接口
 */
export interface SkeletonAPI {
  /** 注册一个骨架项到指定插槽 */
  register(slot: SkeletonSlot, item: SkeletonItem): void;
  /** 从指定插槽移除一个骨架项 */
  unregister(slot: SkeletonSlot, name: string): void;
  /** 获取指定插槽的所有骨架项（已排序） */
  getItems(slot: SkeletonSlot): SkeletonItem[];
  /** 订阅骨架变更，返回取消订阅函数（供 useSyncExternalStore 使用） */
  subscribe(listener: () => void): () => void;
  /** 获取当前版本号（每次 register/unregister 递增，供 useSyncExternalStore 做 snapshot 对比） */
  getVersion(): number;
}

/**
 * 内部插件运行时定义
 * PluginManager 内部使用的插件封装对象
 */
export interface InternalPlugin {
  /** 插件名称 */
  name: string;
  /** 插件元数据 */
  meta: PluginMeta;
  /** 插件创建函数 */
  creator: PluginCreator;
  /** 插件配置选项 */
  options: Record<string, unknown>;
  /** 插件上下文实例 */
  context: PluginContext;
  /** 插件配置（init/destroy/exports） */
  config: PluginConfig | null;
  /** 是否已初始化 */
  inited: boolean;
}
