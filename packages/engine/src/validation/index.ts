/**
 * Validation 模块统一导出
 *
 * 导出校验和迁移工具：
 * - validate / validateOrThrow: 数据校验（Zod Schema 验证）
 * - migrateSchema / registerMigration / getLatestVersion: 版本迁移
 *
 * @author xiye
 * @date 2026/6/13
 */

// 校验工具
export { validate, validateOrThrow, type ValidationResult } from "./validate";

// 版本迁移工具
export { migrateSchema, registerMigration, getLatestVersion } from "./migration";
