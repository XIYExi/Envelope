/**
 * 插件系统类型定义
 *
 * 定义插件创建器、插件配置、插件元数据和插件上下文的类型。
 * 参考 lowcode-engine-main/packages/types/src/shell/type/plugin-context.ts
 * 的 IPublicModelPluginContext 接口设计，简化适配 Envelope 的 React + Zustand 技术栈。
 */

import type { ComponentType } from "react";
import type { EventBus, EditorEventMap } from "../event-bus";

/**
 * 骨架插槽名称
 * 编辑器布局中允许插件注册的区域
 *
 * 对齐 lowcode-engine 10 area 子集（D18 决策）：
 * @reference lowcode-engine-main/packages/editor-skeleton/src/skeleton.ts:65-137
 * @reference lowcode-engine-main/packages/types/src/shell/type/widget-config-area.ts
 */
export type SkeletonSlot =
  /** 左侧导航栏（模式切换项，如 pages/datamodel/routing） */
  | "left-nav"
  /** 左侧面板区（物料面板/组件树面板，导航栏右侧的面板内容） */
  | "left-panel"
  /** 主内容区（编辑器面板，如画布、数据模型编辑器、流程编辑器等） */
  | "main-area"
  /** 右侧面板区（属性面板/配置面板） */
  | "right-panel"
  /** 顶部工具栏 */
  | "toolbar"
  /** 底部面板区（预留，如终端/日志/输出面板） */
  | "bottom-area";

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
 * 快捷键 API
 *
 * 对齐 lowcode-engine IPublicApiHotkey 的最小子集。
 * @reference lowcode-engine-main/packages/types/src/shell/api/hotkey.ts
 */
export interface HotkeyAPI {
  /**
   * 绑定快捷键组合
   * @param combos - 键组合字符串，如 "ctrl+s"、"shift+tab"
   * @param callback - 触发回调
   * @returns 取消绑定函数（Disposable 模式）
   */
  bind(combos: string, callback: (e: KeyboardEvent) => void): () => void;
}

/**
 * 命令 API
 *
 * 对齐 lowcode-engine IPublicApiCommand 的最小子集。
 * 命令名自动加 pluginName 前缀以防冲突（对齐 commandScope 模式）。
 * @reference lowcode-engine-main/packages/types/src/shell/api/command.ts
 * @reference lowcode-engine-main/packages/editor-core/src/command.ts:19-31
 */
export interface CommandAPI {
  /** 注册命令（名称自动加 pluginName 前缀） */
  registerCommand(command: { name: string; description?: string; parameters?: { name: string; propType: string }[]; handler: (args: Record<string, unknown>) => void }): () => void;
  /** 执行命令 */
  executeCommand(name: string, args?: Record<string, unknown>): void;
  /** 列出所有已注册命令 */
  listCommands(): { name: string; description?: string }[];
}

/**
 * 插件上下文
 * 传递给插件创建函数的上下文对象，提供骨架/事件/快捷键/日志/命令 API
 *
 * 对齐 lowcode-engine IPublicModelPluginContext（19 属性子集）。
 * @reference lowcode-engine-main/packages/types/src/shell/model/plugin-context.ts:20-124
 * @reference lowcode-engine-main/packages/engine/src/engine-core.ts:140-165 pluginContextApiAssembler
 */
export interface PluginContext {
  /** 当前插件名称 */
  pluginName: string;
  /** 骨架 API，用于注册面板和 UI 组件 */
  skeleton: SkeletonAPI;
  /** 事件总线 API，用于插件间通信（对齐 lowcode context.event） */
  event: EventBus<EditorEventMap>;
  /** 快捷键 API，bind 返回 Disposable（对齐 lowcode context.hotkey） */
  hotkey: HotkeyAPI;
  /** 命令 API，命令名自动加 pluginName 前缀（对齐 lowcode context.command） */
  command: CommandAPI;
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
