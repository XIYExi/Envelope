/**
 * 物料注册表实现
 *
 * 提供物料组件的注册、查询和管理功能。
 * 使用 Map 存储组件定义，支持按名称和分类检索。
 *
 * @author xiye
 * @date 2026/6/13
 */
/**
 * 物料注册表实现
 *
 * 使用 Map 数据结构存储物料定义，提供高效的查询和注册功能。
 * 所有物料在注册时都会通过 Zod schema 校验，确保数据完整性。
 *
 * @author xiye
 * @date 2026/6/14
 */
import type { MaterialRegistry, MaterialDefinition, ComponentCategory } from "./types/material";
import { materialDefinitionSchema } from "./types/material";

/**
 * 创建物料注册表
 *
 * 返回一个实现了 MaterialRegistry 接口的注册表实例。
 * 内部使用 Map 存储物料，key 为物料名称（name）。
 *
 * @returns 物料注册表实例
 *
 * @example
 * const registry = createRegistry();
 * registry.register(buttonMaterial);
 * const button = registry.get("Button");
 */
export function createRegistry(): MaterialRegistry {
  /** 物料存储 Map，key 为物料名称 */
  const components = new Map<string, MaterialDefinition>();

  /**
   * 注册单个物料
   *
   * 通过 Zod schema 校验物料定义，校验通过后存入 Map。
   * 校验失败时输出错误日志，不抛出异常。
   *
   * @param def - 物料定义对象
   */
  const register = (def: MaterialDefinition): void => {
    const parsed = materialDefinitionSchema.safeParse(def);
    if (!parsed.success) {
      console.error(`Invalid material "${def.name}":`, parsed.error.flatten());
      return;
    }
    components.set(def.name, parsed.data);
  };

  return {
    /**
     * 按分类获取物料列表
     *
     * 遍历所有物料，筛选出指定分类的物料，
     * 按 displayName 字母顺序排序后返回。
     *
     * @param category - 组件分类
     * @returns 该分类下的所有物料
     */
    getByCategory(category: ComponentCategory): MaterialDefinition[] {
      const result: MaterialDefinition[] = [];
      components.forEach((def) => {
        if (def.category === category) result.push(def);
      });
      return result.sort((a, b) => a.displayName.localeCompare(b.displayName));
    },

    /**
     * 获取所有物料列表
     *
     * 返回所有已注册的物料，按 displayName 字母顺序排序。
     *
     * @returns 所有物料
     */
    getAll(): MaterialDefinition[] {
      const result: MaterialDefinition[] = [];
      components.forEach((def) => result.push(def));
      return result.sort((a, b) => a.displayName.localeCompare(b.displayName));
    },

    /** 注册单个物料（内部实现） */
    register,

    /**
     * 批量注册物料
     *
     * 遍历物料数组，逐个调用 register 方法注册。
     *
     * @param defs - 物料定义数组
     */
    registerAll: (defs: MaterialDefinition[]): void => {
      defs.forEach((def) => register(def));
    },

    /**
     * 按名称获取物料
     *
     * @param name - 物料名称（如 "Button"、"Card"）
     * @returns 物料定义，不存在则返回 undefined
     */
    get(name: string): MaterialDefinition | undefined {
      return components.get(name);
    },
  };
}
    components.set(def.name, parsed.data);
  };

  return {
    /**
     * 按分类获取组件列表
     * 返回按 displayName 字母排序的组件数组
     */
    getByCategory(category: ComponentCategory): MaterialDefinition[] {
      const result: MaterialDefinition[] = [];
      components.forEach((def) => {
        if (def.category === category) result.push(def);
      });
      return result.sort((a, b) => a.displayName.localeCompare(b.displayName));
    },

    /**
     * 获取所有已注册组件
     * 返回按 displayName 字母排序的组件数组
     */
    getAll(): MaterialDefinition[] {
      const result: MaterialDefinition[] = [];
      components.forEach((def) => result.push(def));
      return result.sort((a, b) => a.displayName.localeCompare(b.displayName));
    },

    /** 注册单个组件 */
    register,

    /** 批量注册组件 */
    registerAll: (defs: MaterialDefinition[]): void => {
      defs.forEach((def) => register(def));
    },

    /**
     * 按名称获取单个组件
     * @param name - 组件唯一标识名
     * @returns 组件定义，不存在返回 undefined
     */
    get(name: string): MaterialDefinition | undefined {
      return components.get(name);
    },
  };
}
