/**
 * Schema 版本迁移工具
 *
 * 当项目的 Schema 结构发生变化时（如新增字段、修改类型），
 * 需要将旧版本的数据迁移到新版本。这个模块提供了链式迁移机制。
 *
 * 工作原理：
 * 1. 注册迁移函数：registerMigration("3.0.0", "3.1.0", migrateFn)
 * 2. 执行迁移：migrateSchema(data, "3.0.0", "3.2.0")
 * 3. 自动链式执行：3.0.0 → 3.1.0 → 3.2.0
 *
 * 迁移函数是纯函数，不修改原数据（使用 structuredClone 深拷贝），
 * 每个迁移函数接收旧版本数据，返回新版本数据。
 *
 * 当前状态：框架已搭建，但尚未注册任何迁移。
 * 当需要修改 Schema 时（如 page.schema.ts 新增字段），
 * 应在此处注册对应的迁移函数。
 *
 * @author xiye
 * @date 2026/6/13
 *
 * @example
 * // 注册一个迁移：3.0.0 → 3.1.0，给页面添加 "language" 字段
 * registerMigration("3.0.0", "3.1.0", (data) => {
 *   return { ...data, language: data.language ?? "zh-CN" };
 * });
 */

/** Schema 版本号类型（语义化版本字符串） */
type SchemaVersion = string;

/**
 * 迁移定义接口
 * 描述一个版本到另一个版本的数据转换逻辑
 */
interface Migration {
  /** 源版本号 */
  from: SchemaVersion;
  /** 目标版本号 */
  to: SchemaVersion;
  /** 迁移函数：接收旧版本数据，返回新版本数据 */
  migrate: (data: Record<string, unknown>) => Record<string, unknown>;
}

/**
 * 已注册的迁移列表
 * 按注册顺序排列，用于链式执行
 */
const migrations: Migration[] = [];

/**
 * 注册一个版本迁移
 *
 * @param from - 源版本号（如 "3.0.0"）
 * @param to - 目标版本号（如 "3.1.0"）
 * @param migrate - 迁移函数，接收旧数据返回新数据
 *
 * 注意：如果重复注册同一路径的迁移，会覆盖旧的迁移函数
 */
export function registerMigration(
  from: SchemaVersion,
  to: SchemaVersion,
  migrate: Migration["migrate"],
) {
  // 检查是否已注册相同路径的迁移
  const existing = migrations.find((m) => m.from === from && m.to === to);
  if (existing) {
    console.warn(`Migration ${from}→${to} already registered, overwriting.`);
    existing.migrate = migrate;
    return;
  }
  migrations.push({ from, to, migrate });
}

/**
 * 执行版本迁移
 *
 * 从 fromVersion 链式迁移到 toVersion。
 * 例如：migrateSchema(data, "3.0.0", "3.2.0")
 * 会自动查找并执行 3.0.0 → 3.1.0 → 3.2.0 的迁移链。
 *
 * @param data - 原始数据（不会被修改，内部会深拷贝）
 * @param fromVersion - 当前版本号
 * @param toVersion - 目标版本号
 * @returns 迁移后的数据（新版本格式）
 *
 * 特殊情况：
 * - fromVersion === toVersion：直接返回原数据，不执行任何迁移
 * - 找不到迁移路径：打印警告，返回当前数据（部分迁移）
 * - 迁移链过长（超过 migrations.length + 1）：停止迁移，防止死循环
 */
export function migrateSchema(
  data: Record<string, unknown>,
  fromVersion: SchemaVersion,
  toVersion: SchemaVersion,
): Record<string, unknown> {
  // 版本相同，无需迁移
  if (fromVersion === toVersion) return data;

  // 深拷贝数据，避免修改原始对象
  let current = structuredClone(data);
  let currentVersion = fromVersion;

  // 防止无限循环：最多执行 迁移数量 + 1 次
  const maxIterations = migrations.length + 1;
  let iterations = 0;

  // 链式执行迁移，直到达到目标版本
  while (currentVersion !== toVersion && iterations < maxIterations) {
    iterations++;

    // 查找从当前版本出发的下一个迁移
    const next = migrations.find((m) => m.from === currentVersion);
    if (!next) {
      // 找不到下一步迁移，打印警告并返回当前数据
      console.warn(`No migration found from ${currentVersion} to ${toVersion}`);
      return current;
    }

    // 执行迁移函数，更新数据和版本号
    current = next.migrate(current);
    currentVersion = next.to;
  }

  return current;
}

/**
 * 获取已注册的最新版本号
 *
 * 扫描所有已注册迁移的目标版本，返回最大的那个。
 * 如果没有注册任何迁移，返回默认版本 "3.0.0"。
 *
 * @returns 最新版本号字符串
 */
export function getLatestVersion(): SchemaVersion {
  if (migrations.length === 0) return "3.0.0";
  // 收集所有目标版本号，排序后取最大的
  const versions = new Set(migrations.map((m) => m.to));
  return [...versions].sort().pop() ?? "3.0.0";
}
