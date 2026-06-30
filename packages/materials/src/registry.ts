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
import type { MaterialRegistry, MaterialDefinition, ComponentCategory, MetadataTransducer } from "./types/material";
import { materialDefinitionSchema } from "./types/material";

/**
 * 注册表创建选项
 *
 * 工厂模式选项参数，提供注册表的行为配置：
 * - strictMode: 严格模式下注册失败会抛异常（默认 false 仅警告）
 * - onDuplicate: 重复注册时的处理策略（默认 'warn'）
 */
export interface RegistryOptions {
  /** 严格模式：校验失败时抛出异常而非仅 log（默认 false） */
  strictMode?: boolean;
  /** 重复注册策略：'error' 抛异常 / 'warn' 警告 / 'silent' 静默忽略（默认 'warn'） */
  onDuplicate?: "error" | "warn" | "silent";
}

/**
 * 创建物料注册表
 *
 * 返回一个实现了 MaterialRegistry 接口的注册表实例。
 * 内部使用 Map 存储物料，key 为物料名称（name）。
 *
 * @param options - 可选配置（strictMode、onDuplicate）
 * @returns 物料注册表实例
 *
 * @example
 * const registry = createRegistry({ strictMode: true, onDuplicate: "error" });
 * registry.register(buttonMaterial);
 * const button = registry.get("Button");
 */
export function createRegistry(options?: RegistryOptions): MaterialRegistry {
  /** 物料存储 Map，key 为物料名称 */
  const components = new Map<string, MaterialDefinition>();

  /** 物料元数据转换器列表 */
  const transducers: MetadataTransducer[] = [];

  /**
   * 处理重复注册
   *
   * 根据配置的 onDuplicate 策略决定行为：
   * - 'error': 抛出异常，阻止注册
   * - 'warn': 打印警告
   * - 'silent': 静默忽略
   *
   * @param name - 重复的物料名称
   */
  const handleDuplicate = (name: string): void => {
    const strategy = options?.onDuplicate ?? "warn";
    const msg = `物料 "${name}" 重复注册`;
    switch (strategy) {
      case "error":
        throw new Error(msg);
      case "warn":
        console.warn(msg);
        break;
      case "silent":
        break;
    }
  };

  /**
   * 注册单个物料
   *
   * 通过 Zod schema 校验物料定义，校验通过后存入 Map。
   * strictMode 下校验失败会抛出异常，否则仅输出错误日志。
   *
   * @param def - 物料定义对象
   */
  const register = (def: MaterialDefinition): void => {
    // 先执行 transducer 管道，再校验
    const pipeline = pipe(...transducers);
    const transformed = pipeline(def);
    const parsed = materialDefinitionSchema.safeParse(transformed);
    if (!parsed.success) {
      const msg = `物料 "${def.name}" 校验失败: ${JSON.stringify(parsed.error.flatten())}`;
      if (options?.strictMode) {
        throw new Error(msg);
      }
      console.error(msg);
      return;
    }

    // 检查重复注册
    if (components.has(def.name)) {
      handleDuplicate(def.name);
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

    /**
     * 异步注册物料（懒加载）
     *
     * 适用于分包加载或按需注册的场景。
     * loader 函数在首次调用时执行，注册完成后可通过 get/has 查询。
     *
     * 注意：如果物料已存在注册表中且 onDuplicate 不为 'silent'，
     * 会触发重复注册处理逻辑。
     *
     * @param name - 物料名称（用作缓存键）
     * @param loader - 异步加载器，返回物料定义
     */
    async registerAsync(name: string, loader: () => Promise<MaterialDefinition>): Promise<void> {
      // 如果已存在且策略不是静默忽略，触发重复处理
      if (components.has(name) && options?.onDuplicate !== "silent") {
        handleDuplicate(name);
      }

      try {
        const def = await loader();
        const parsed = materialDefinitionSchema.safeParse(def);
        if (!parsed.success) {
          const msg = `异步注册物料 "${name}" 校验失败: ${JSON.stringify(parsed.error.flatten())}`;
          if (options?.strictMode) {
            throw new Error(msg);
          }
          console.error(msg);
          return;
        }
        components.set(name, parsed.data);
      } catch (err) {
        const msg = `异步注册物料 "${name}" 加载失败: ${err instanceof Error ? err.message : String(err)}`;
        if (options?.strictMode) {
          throw new Error(msg);
        }
        console.error(msg);
      }
    },

    /**
     * 检查物料是否已注册
     *
     * @param name - 物料名称
     * @returns true 表示该物料已在注册表中
     */
    has(name: string): boolean {
      return components.has(name);
    },

    /**
     * 注册物料元数据转换器
     *
     * 注册后的 transducer 会在每次 register() 时自动执行。
     * 多个 transducer 按 level 升序排列后链式执行。
     *
     * @param fn - 转换器函数
     */
    registerTransducer: (fn: MetadataTransducer): void => {
      transducers.push(fn);
    },
  };
}

/**
 * 管道执行函数
 *
 * 按 level 升序排列多个 transducer，依次链式执行。
 * 函数式编程的管道模式（Pipeline Pattern）：
 * pipe(f1, f2, f3)(input) → f3(f2(f1(input)))
 *
 * @param transducers - 按优先级排列的转换器列表
 * @returns 组合后的转换函数
 */
function pipe(...transducers: MetadataTransducer[]): (meta: MaterialDefinition) => MaterialDefinition {
  return (meta: MaterialDefinition) => {
    const sorted = [...transducers].sort(
      (a, b) => (a.level ?? 100) - (b.level ?? 100),
    );
    return sorted.reduce((acc, fn) => fn(acc), meta);
  };
}
