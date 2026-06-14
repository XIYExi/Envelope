/**
 * 数据库 Schema 定义
 *
 * 定义了 Supabase 数据库的完整结构，包括：
 * - columnSchema: 列定义（类型、约束、外键）
 * - indexSchema: 索引定义（btree、gin、gist）
 * - rlsPolicySchema: 行级安全策略（RLS）
 * - tableSchema: 表定义（列、索引、RLS）
 * - dbSchemaSchema: 完整数据库结构（表、枚举）
 *
 * 这些 Schema 对应 ISA 中的 ISC-45 到 ISC-55 标准，
 * 用于数据模型编辑器的校验和 Supabase 迁移 SQL 生成。
 *
 * @author xiye
 * @date 2026/6/13
 */
import { z } from "zod";

/**
 * 列定义 Schema
 * 描述数据库表中的一列
 */
export const columnSchema = z.object({
  /** 列名（如 "email"、"created_at"） */
  name: z.string().min(1),
  /** 列数据类型（PostgreSQL 类型） */
  type: z.enum([
    "uuid",       // 通用唯一标识符，常用于主键
    "text",       // 可变长度文本
    "varchar",    // 有长度限制的文本
    "integer",    // 整数（4字节）
    "bigint",     // 大整数（8字节）
    "numeric",    // 精确数值（用于金额等）
    "boolean",    // 布尔值
    "timestamp",  // 时间戳（含时区）
    "date",       // 日期（不含时间）
    "jsonb",      // 二进制 JSON（可索引）
    "text[]",     // 文本数组
  ]),
  /** 是否允许 NULL，默认 true */
  nullable: z.boolean().default(true),
  /** 默认值（SQL 表达式，如 "now()"、"''::text"） */
  defaultValue: z.string().optional(),
  /** 是否为主键 */
  isPrimary: z.boolean().default(false),
  /** 是否唯一约束 */
  isUnique: z.boolean().default(false),
  /** 外键定义（可选） */
  foreignKey: z.object({
    /** 关联的表名 */
    table: z.string(),
    /** 关联的列名 */
    column: z.string(),
    /** 删除时的行为 */
    onDelete: z.enum([
      "CASCADE",     // 级联删除关联数据
      "SET NULL",    // 将外键设为 NULL
      "RESTRICT",    // 阻止删除（有关联数据时）
      "NO ACTION",   // 不执行任何操作（PostgreSQL 默认）
      "SET DEFAULT", // 将外键设为默认值
    ]).default("CASCADE"),
  }).optional(),
  /** CHECK 约束（SQL 表达式，如 "length(email) > 0"） */
  checkConstraint: z.string().optional(),
  /** 列注释（会导出到生成的代码中） */
  comment: z.string().optional(),
});

/**
 * 索引定义 Schema
 * 描述数据库表的索引
 */
export const indexSchema = z.object({
  /** 索引名称（如 "idx_users_email"） */
  name: z.string(),
  /** 索引包含的列名列表 */
  columns: z.array(z.string()),
  /** 是否为唯一索引 */
  unique: z.boolean().default(false),
  /** 索引类型 */
  type: z.enum([
    "btree", // B-Tree 索引（默认，适合等值和范围查询）
    "gin",   // GIN 索引（适合 jsonb、数组、全文搜索）
    "gist",  // GiST 索引（适合地理空间、范围类型）
  ]).default("btree"),
});

/**
 * RLS 策略 Schema
 * 描述 Supabase 的行级安全策略（Row Level Security）
 *
 * RLS 控制哪些用户可以访问哪些行数据。
 * 例如：用户只能查看自己的数据，管理员可以查看所有数据。
 */
export const rlsPolicySchema = z.object({
  /** 策略名称（如 "Users can view own posts"） */
  name: z.string(),
  /** 适用的操作类型 */
  operation: z.enum([
    "SELECT", // 查询
    "INSERT", // 插入
    "UPDATE", // 更新
    "DELETE", // 删除
    "ALL",    // 所有操作
  ]),
  /** USING 表达式（决定哪些行可以被操作） */
  using: z.string(),
  /** CHECK 表达式（可选，决定插入/更新时数据必须满足的条件） */
  check: z.string().optional(),
});

/**
 * 表定义 Schema
 * 描述数据库表的完整结构
 */
export const tableSchema = z.object({
  /** 表名（如 "users"、"posts"、"comments"） */
  name: z.string().min(1),
  /** 列定义列表，至少包含一列 */
  columns: z.array(columnSchema).min(1),
  /** 索引定义列表，默认空数组 */
  indexes: z.array(indexSchema).default([]),
  /** 是否启用行级安全（RLS），默认 true */
  rlsEnabled: z.boolean().default(true),
  /** RLS 策略列表，默认空数组 */
  rlsPolicies: z.array(rlsPolicySchema).default([]),
  /** 表注释（会导出到 SQL 迁移中） */
  comment: z.string().optional(),
});

/** 表定义类型 */
export type TableDefinition = z.infer<typeof tableSchema>;
/** 列定义类型 */
export type ColumnDefinition = z.infer<typeof columnSchema>;
/** 索引定义类型 */
export type IndexDefinition = z.infer<typeof indexSchema>;
/** RLS 策略定义类型 */
export type RlsPolicyDefinition = z.infer<typeof rlsPolicySchema>;

/**
 * 完整数据库 Schema
 * 描述项目数据库的所有表和枚举类型
 */
export const dbSchemaSchema = z.object({
  /** Schema 版本号，默认 3.0.0 */
  version: z.string().default("3.0.0"),
  /** 所有表定义，默认空数组 */
  tables: z.array(tableSchema).default([]),
  /** 枚举类型定义（PostgreSQL ENUM） */
  enums: z.array(
    z.object({
      /** 枚举类型名（如 "user_role"） */
      name: z.string(),
      /** 枚举值列表（如 ["admin", "user", "guest"]） */
      values: z.array(z.string()),
    }),
  ).default([]),
});

/** 完整数据库 Schema 类型 */
export type DbSchema = z.infer<typeof dbSchemaSchema>;
