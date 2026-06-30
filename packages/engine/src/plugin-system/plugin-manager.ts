/**
 * 插件管理器
 *
 * 负责插件的注册、初始化、销毁和依赖排序。
 * 参考 lowcode-engine-main/packages/designer/src/plugin/plugin-manager.ts
 * 的 LowCodePluginManager 类设计，简化适配 Envelope 的 React 技术栈。
 *
 * 核心职责：
 * 1. register(name, creator, options) — 注册插件
 * 2. init() — 按依赖顺序初始化所有插件
 * 3. destroy() — 销毁所有插件
 * 4. getPlugin(name) — 获取已注册的插件信息
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-30
 */

import type { PluginCreator, PluginMeta, PluginConfig, PluginContext, InternalPlugin, SkeletonSlot } from "./types";
import { createSkeleton } from "./skeleton";

/**
 * 插件管理器类
 *
 * 管理插件完整生命周期，支持依赖排序和循环依赖检测。
 */
export class PluginManager {
  /** 插件注册表，name → InternalPlugin 的映射 */
  private plugins = new Map<string, InternalPlugin>();
  /** 初始化顺序缓存，按依赖排序后的插件名称列表 */
  private initOrder: string[] = [];
  /** 骨架 API 实例，所有插件共享 */
  private skeleton = createSkeleton();

  /**
   * 注册一个插件
   *
   * @param name - 插件唯一名称
   * @param creator - 插件创建函数
   * @param meta - 插件元数据（名称、依赖、插槽）
   * @param options - 插件配置选项（可选）
   */
  register(name: string, creator: PluginCreator, meta: PluginMeta, options?: Record<string, unknown>): void {
    if (this.plugins.has(name)) {
      console.warn(`[PluginManager] plugin "${name}" already registered, skipping`);
      return;
    }

    if (meta.name !== name) {
      console.warn(`[PluginManager] plugin name mismatch: "${name}" !== "${meta.name}", using "${name}"`);
    }

    const context: PluginContext = {
      pluginName: name,
      skeleton: this.skeleton,
      logger: {
        info: (msg: string, ...args: unknown[]) => console.log(`[Plugin:${name}] ${msg}`, ...args),
        warn: (msg: string, ...args: unknown[]) => console.warn(`[Plugin:${name}] ${msg}`, ...args),
        error: (msg: string, ...args: unknown[]) => console.error(`[Plugin:${name}] ${msg}`, ...args),
      },
      preference: options ?? {},
    };

    const plugin: InternalPlugin = {
      name,
      meta,
      creator,
      options: options ?? {},
      context,
      config: null,
      inited: false,
    };

    this.plugins.set(name, plugin);
  }

  /**
   * 初始化所有已注册的插件
   *
   * 按依赖顺序依次调用每个插件的 init() 方法。
   * 如果依赖不满足或存在循环依赖，将抛出错误。
   */
  async init(): Promise<void> {
    const allPlugins = Array.from(this.plugins.values());

    const { sorted, error } = this.topoSort(allPlugins);
    if (error) {
      throw new Error(`[PluginManager] ${error}`);
    }

    this.initOrder = sorted.map((p) => p.name);

    for (const plugin of sorted) {
      try {
        const config = plugin.creator(plugin.context, plugin.options);
        plugin.config = config;

        await config.init();
        plugin.inited = true;
        plugin.context.logger.info(`plugin initialized`);
      } catch (err) {
        console.error(`[PluginManager] failed to init plugin "${plugin.name}":`, err);
        throw err;
      }
    }
  }

  /**
   * 获取已注册的插件信息
   *
   * @param name - 插件名称
   * @returns 插件信息对象，或 undefined（未注册时）
   */
  getPlugin(name: string): InternalPlugin | undefined {
    return this.plugins.get(name);
  }

  /**
   * 获取骨架 API 实例
   */
  getSkeleton() {
    return this.skeleton;
  }

  /**
   * 销毁所有插件
   *
   * 按初始化顺序的逆序依次调用每个插件的 destroy() 方法。
   */
  async destroy(): Promise<void> {
    const reversed = [...this.initOrder].reverse();
    for (const name of reversed) {
      const plugin = this.plugins.get(name);
      if (!plugin || !plugin.inited) continue;
      try {
        await plugin.config?.destroy?.();
        plugin.inited = false;
        plugin.context.logger.info(`plugin destroyed`);
      } catch (err) {
        console.error(`[PluginManager] failed to destroy plugin "${name}":`, err);
      }
    }
    this.plugins.clear();
    this.initOrder = [];
  }

  /**
   * 拓扑排序
   *
   * 根据插件声明的 dependencies 进行拓扑排序。
   * 检测缺失依赖和循环依赖。
   *
   * @param plugins - 待排序的插件列表
   * @returns 排序结果，包含排好序的列表或错误信息
   */
  private topoSort(plugins: InternalPlugin[]): { sorted: InternalPlugin[]; error?: string } {
    const nameMap = new Map<string, InternalPlugin>();
    for (const p of plugins) {
      nameMap.set(p.name, p);
    }

    const visited = new Set<string>();
    const visiting = new Set<string>();
    const result: InternalPlugin[] = [];

    const dfs = (name: string): boolean => {
      if (visiting.has(name)) {
        return false;
      }
      if (visited.has(name)) {
        return true;
      }

      const plugin = nameMap.get(name);
      if (!plugin) {
        return true;
      }

      visiting.add(name);

      const deps = plugin.meta.dependencies ?? [];
      for (const dep of deps) {
        if (!nameMap.has(dep)) {
          result.length = 0;
          return false;
        }
        if (!dfs(dep)) {
          result.length = 0;
          return false;
        }
      }

      visiting.delete(name);
      visited.add(name);
      result.push(plugin);
      return true;
    };

    for (const plugin of plugins) {
      if (!visited.has(plugin.name)) {
        if (!dfs(plugin.name)) {
          const missingDeps: string[] = [];
          const cycleDeps: string[] = [];
          for (const p of plugins) {
            for (const dep of p.meta.dependencies ?? []) {
              if (!nameMap.has(dep)) {
                missingDeps.push(`${p.name} → ${dep}`);
              }
              if (visiting.has(dep)) {
                cycleDeps.push(`${p.name} → ${dep}`);
              }
            }
          }
          let error = "plugin dependency error";
          if (missingDeps.length > 0) {
            error = `missing dependencies: ${missingDeps.join(", ")}`;
          } else if (cycleDeps.length > 0) {
            error = `circular dependencies detected: ${cycleDeps.join(", ")}`;
          }
          return { sorted: [], error };
        }
      }
    }

    return { sorted: result };
  }
}
