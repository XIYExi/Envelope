import { z } from "zod";

const columnSchema = z.object({
  name: z.string().min(1),
  type: z.enum([
    "uuid",
    "text",
    "varchar",
    "integer",
    "bigint",
    "numeric",
    "boolean",
    "timestamp",
    "date",
    "jsonb",
    "text[]",
  ]),
  nullable: z.boolean().default(true),
  defaultValue: z.string().optional(),
  isPrimary: z.boolean().default(false),
  isUnique: z.boolean().default(false),
  foreignKey: z
    .object({
      table: z.string(),
      column: z.string(),
      onDelete: z.enum(["CASCADE", "SET NULL", "RESTRICT"]).default("CASCADE"),
    })
    .optional(),
  checkConstraint: z.string().optional(),
  comment: z.string().optional(),
});

const indexSchema = z.object({
  name: z.string(),
  columns: z.array(z.string()),
  unique: z.boolean().default(false),
  type: z.enum(["btree", "gin", "gist"]).default("btree"),
});

const rlsPolicySchema = z.object({
  name: z.string(),
  operation: z.enum(["SELECT", "INSERT", "UPDATE", "DELETE", "ALL"]),
  using: z.string(),
  check: z.string().optional(),
});

export const tableSchema = z.object({
  name: z.string().min(1),
  columns: z.array(columnSchema).min(1),
  indexes: z.array(indexSchema).default([]),
  rlsEnabled: z.boolean().default(true),
  rlsPolicies: z.array(rlsPolicySchema).default([]),
  comment: z.string().optional(),
});

export type TableDefinition = z.infer<typeof tableSchema>;
export type ColumnDefinition = z.infer<typeof columnSchema>;

export const dbSchemaSchema = z.object({
  version: z.string().default("3.0.0"),
  tables: z.array(tableSchema).default([]),
  enums: z
    .array(
      z.object({
        name: z.string(),
        values: z.array(z.string()),
      }),
    )
    .default([]),
});

export type DbSchema = z.infer<typeof dbSchemaSchema>;
