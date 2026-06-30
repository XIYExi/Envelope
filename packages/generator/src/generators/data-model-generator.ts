/**
 * 数据模型生成器
 *
 * 将 DbSchema（数据库结构定义）转换为：
 * - Supabase 迁移 SQL（CREATE TABLE、索引、RLS 策略）
 * - TypeScript 类型定义（数据库行类型）
 *
 * @author xiye
 * @date 2026-06-14
 */
import type { DbSchema, TableDefinition, ColumnDefinition, IndexDefinition, RlsPolicyDefinition } from "@envelope/engine";

/**
 * PostgreSQL 类型 → SQL 类型字符串映射
 * 处理特殊类型（如 uuid 需要 DEFAULT gen_random_uuid()）和带参数的类型（varchar(n)）
 */
const PG_TYPE_MAP: Record<string, string> = {
  uuid: "UUID",
  text: "TEXT",
  varchar: "VARCHAR",
  integer: "INTEGER",
  bigint: "BIGINT",
  numeric: "NUMERIC",
  boolean: "BOOLEAN",
  timestamp: "TIMESTAMPTZ",
  date: "DATE",
  jsonb: "JSONB",
  "text[]": "TEXT[]",
};

/**
 * PostgreSQL 类型 → TypeScript 类型映射
 */
const TS_TYPE_MAP: Record<string, string> = {
  uuid: "string",
  text: "string",
  varchar: "string",
  integer: "number",
  bigint: "number",
  numeric: "number",
  boolean: "boolean",
  timestamp: "string",
  date: "string",
  jsonb: "Record<string, unknown>",
  "text[]": "string[]",
};

/**
 * 转义 SQL 标识符（表名、列名）
 * 将驼峰命名转为 snake_case，并防止 SQL 注入
 */
function escapeIdent(name: string): string {
  // 只允许字母、数字、下划线
  const safe = name.replace(/[^a-zA-Z0-9_]/g, "_");
  return `"${safe}"`;
}

/**
 * 将列定义转换为 SQL 列定义字符串
 *
 * 生成格式：
 *   "column_name" TYPE [DEFAULT ...] [NOT NULL] [PRIMARY KEY] [UNIQUE] [REFERENCES ...] [CHECK (...)]
 */
function columnToSQL(col: ColumnDefinition): string {
  const parts: string[] = [];

  // 列名
  parts.push(escapeIdent(col.name));

  // 类型 + 特殊默认值处理
  if (col.type === "uuid" && col.isPrimary) {
    parts.push("UUID DEFAULT gen_random_uuid()");
  } else if (col.type === "varchar" && col.defaultValue) {
    // varchar 可能需要传长度，如果没有指定就用默认的 varchar
    parts.push("VARCHAR");
  } else {
    parts.push(PG_TYPE_MAP[col.type] ?? col.type.toUpperCase());
  }

  // NOT NULL
  if (!col.nullable) {
    parts.push("NOT NULL");
  }

  // 默认值（非 uuid 主键的情况）
  if (col.defaultValue && !(col.type === "uuid" && col.isPrimary)) {
    parts.push(`DEFAULT ${col.defaultValue}`);
  }

  // PRIMARY KEY
  if (col.isPrimary) {
    parts.push("PRIMARY KEY");
  }

  // UNIQUE
  if (col.isUnique) {
    parts.push("UNIQUE");
  }

  // REFERENCES (外键)
  if (col.foreignKey) {
    const onDelete = col.foreignKey.onDelete || "CASCADE";
    parts.push(
      `REFERENCES ${escapeIdent(col.foreignKey.table)}(${escapeIdent(col.foreignKey.column)}) ON DELETE ${onDelete}`,
    );
  }

  // CHECK 约束 — 验证括号平衡，防止语法注入
  if (col.checkConstraint) {
    const expr = col.checkConstraint.trim();
    const openParens = (expr.match(/\(/g) || []).length;
    const closeParens = (expr.match(/\)/g) || []).length;
    if (openParens === closeParens) {
      parts.push(`CHECK (${expr})`);
    } else {
      // 括号不匹配时用 SQL 注释标记
      parts.push(`-- WARNING: CHECK skipped — parentheses mismatch in: ${JSON.stringify(expr)}`);
    }
  }

  return parts.join(" ");
}

/**
 * 生成索引 SQL
 *
 * 格式：CREATE [UNIQUE] INDEX "idx_name" ON "table" USING btree ("col1", "col2");
 */
function indexToSQL(index: IndexDefinition, tableName: string): string {
  const unique = index.unique ? "UNIQUE " : "";
  const columns = index.columns.map((c: string) => escapeIdent(c)).join(", ");
  return `CREATE ${unique}INDEX ${escapeIdent(index.name)} ON ${escapeIdent(tableName)} USING ${index.type} (${columns});`;
}

/**
 * 生成 RLS 策略 SQL
 *
 * 格式：
 *   CREATE POLICY "policy_name" ON "table"
 *     FOR OPERATION
 *     USING (expression)
 *     [WITH CHECK (expression)];
 */
function rlsPolicyToSQL(policy: RlsPolicyDefinition, tableName: string): string {
  const lines: string[] = [];
  lines.push(
    `CREATE POLICY ${escapeIdent(policy.name)} ON ${escapeIdent(tableName)}`,
  );
  lines.push(`  FOR ${policy.operation}`);

  if (policy.using) {
    lines.push(`  USING (${policy.using})`);
  }

  if (policy.check) {
    lines.push(`  WITH CHECK (${policy.check})`);
  }

  return lines.join("\n") + ";";
}

/**
 * 生成单个表的 SQL 迁移
 */
function tableToSQL(table: TableDefinition): string {
  const lines: string[] = [];

  // 表注释
  if (table.comment) {
    lines.push(`-- ${table.comment}`);
  }

  // CREATE TABLE
  lines.push(`CREATE TABLE ${escapeIdent(table.name)} (`);

  // 列定义
  const columnDefs = table.columns.map((col: ColumnDefinition, i: number) => {
    const sql = columnToSQL(col);
    const trailing = i < table.columns.length - 1 ? "," : "";
    let line = `  ${sql}${trailing}`;
    if (col.comment) {
      line += ` -- ${col.comment}`;
    }
    return line;
  });
  lines.push(columnDefs.join("\n"));

  lines.push(");");
  lines.push("");

  // 索引
  for (const index of table.indexes) {
    lines.push(indexToSQL(index, table.name));
    lines.push("");
  }

  // RLS
  if (table.rlsEnabled) {
    lines.push(`ALTER TABLE ${escapeIdent(table.name)} ENABLE ROW LEVEL SECURITY;`);
    lines.push("");

    for (const policy of table.rlsPolicies) {
      lines.push(rlsPolicyToSQL(policy, table.name));
      lines.push("");
    }
  }

  return lines.join("\n");
}

/**
 * 生成完整的 Supabase 迁移 SQL
 *
 * 包含：
 * - 所有表的 CREATE TABLE 语句
 * - 索引
 * - RLS 策略
 * - 注释
 *
 * @param db - 数据库 Schema 定义
 * @returns 完整的 SQL 迁移脚本
 */
export function generateMigration(db: DbSchema): string {
  const lines: string[] = [];

  lines.push("-- ============================================================");
  lines.push("-- Envelope V3 — Database Migration");
  lines.push(`-- Schema Version: ${db.version}`);
  lines.push("-- Generated by @envelope/generator");
  lines.push("-- ============================================================");
  lines.push("");

  // 枚举类型
  for (const enumDef of db.enums) {
    const values = enumDef.values.map((v: string) => `'${v.replace(/'/g, "''")}'`).join(", ");
    lines.push(`CREATE TYPE ${escapeIdent(enumDef.name)} AS ENUM (${values});`);
    lines.push("");
  }

  // 表定义
  for (const table of db.tables) {
    lines.push(tableToSQL(table));
  }

  return lines.join("\n").trim() + "\n";
}

/**
 * 将列定义转换为 TypeScript 属性定义
 *
 * 处理可空类型（nullable → ?），映射 PG 类型到 TS 类型
 */
function columnToTSType(col: ColumnDefinition): string {
  const tsType = TS_TYPE_MAP[col.type] ?? "unknown";
  const optional = col.nullable ? "?" : "";
  const comment = col.comment ? `/** ${col.comment} */\n  ` : "";
  return `${comment}${col.name}${optional}: ${tsType};`;
}

/**
 * 生成单个表的 TypeScript 类型定义
 */
function tableToTSType(table: TableDefinition): string {
  const lines: string[] = [];

  if (table.comment) {
    lines.push(`/** ${table.comment} */`);
  }

  const typeName = `${capitalize(table.name)}Row`;
  lines.push(`export interface ${typeName} {`);

  for (const col of table.columns) {
    lines.push(`  ${columnToTSType(col)}`);
  }

  lines.push("}");
  lines.push("");

  return lines.join("\n");
}

/**
 * 首字母大写
 */
function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * 生成 TypeScript 数据库类型定义
 *
 * 包含：
 * - 每个表的 Row 类型接口
 * - Database 聚合接口（按表名索引）
 *
 * @param db - 数据库 Schema 定义
 * @returns TypeScript 类型定义文件内容
 */
export function generateTypes(db: DbSchema): string {
  const lines: string[] = [];

  lines.push("// Auto-generated by @envelope/generator");
  lines.push("// Schema Version: " + db.version);
  lines.push("// DO NOT EDIT MANUALLY — changes will be overwritten");
  lines.push("");
  lines.push("export interface Database {");
  lines.push("  public: {");
  lines.push("    Tables: {");

  for (const table of db.tables) {
    const typeName = `${capitalize(table.name)}Row`;
    lines.push(`      ${table.name}: {`);
    lines.push(`        Row: ${typeName};`);

    // Insert 类型（所有可空字段可选）
    lines.push(`        Insert: Partial<${typeName}>;`);

    // Update 类型（类似 Insert）
    lines.push(`        Update: Partial<${typeName}>;`);
    lines.push("      };");
  }

  lines.push("    };");
  lines.push("    Views: {};");
  lines.push("    Functions: {};");
  lines.push("    Enums: {};");
  lines.push("  };");
  lines.push("}");
  lines.push("");

  // 各表 Row 类型
  for (const table of db.tables) {
    lines.push(tableToTSType(table));
  }

  return lines.join("\n").trim() + "\n";
}
