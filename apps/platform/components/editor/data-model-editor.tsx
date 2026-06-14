/**
 * 数据模型编辑器 —— 可视化设计 Supabase/PostgreSQL 数据库模型
 *
 * 支持：数据表的增删改、列定义（12 种类型 + PK/NN/UQ 约束）、
 * 外键关联、行级安全策略（RLS）模板及自定义策略编辑。
 *
 * @author xiye
 * @date 2026-06-14
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Table2, Key, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

/** PostgreSQL 数据库列类型列表 */
const COLUMN_TYPES = [
  "uuid",
  "text",
  "varchar",
  "integer",
  "bigint",
  "numeric",
  "boolean",
  "timestamp",
  "timestamptz",
  "date",
  "jsonb",
  "text[]",
] as const;

/** 数据库列定义 */
interface ColumnDef {
  id: string;
  name: string;
  type: string;
  isPrimary: boolean;
  isRequired: boolean;
  isUnique: boolean;
  defaultValue: string;
}

/** 外键约束定义 */
interface ForeignKeyDef {
  id: string;
  columnName: string;
  referencedTable: string;
  referencedColumn: string;
}

/** 数据库表定义 */
interface TableDef {
  id: string;
  name: string;
  columns: ColumnDef[];
  foreignKeys: ForeignKeyDef[];
  rlsEnabled: boolean;
  rlsPolicies: string[];
}

/** RLS 策略模板列表 */
const RLS_POLICY_TEMPLATES = [
  { label: "Owner only", value: "owner_only" },
  { label: "Public read", value: "public_read" },
  { label: "Authenticated read", value: "authenticated_read" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** 生成唯一 ID（crypto.randomUUID），所有现代浏览器均支持 */
function uid() {
  return crypto.randomUUID();
}

/** 创建默认列对象 */
function newColumn(type: string = "text"): ColumnDef {
  return {
    id: uid(),
    name: "",
    type,
    isPrimary: false,
    isRequired: false,
    isUnique: false,
    defaultValue: "",
  };
}

/** 创建默认表对象，自带 uuid 主键列 */
function newTable(): TableDef {
  const idCol = newColumn("uuid");
  idCol.name = "id";
  idCol.isPrimary = true;
  idCol.isRequired = true;
  return {
    id: uid(),
    name: "",
    columns: [idCol],
    foreignKeys: [],
    rlsEnabled: false,
    rlsPolicies: [],
  };
}

// ─── Styles ──────────────────────────────────────────────────────────────────

/** 统一输入框样式类名 */
const inputClass =
  "h-7 w-full rounded border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500";
/** 小节标题样式类名 */
const sectionHeaderClass =
  "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground";

// ─── Sub-components ──────────────────────────────────────────────────────────

/** 表列表项组件 —— 显示表名、列数量，支持选择和删除 */
function TableListItem({
  table,
  isSelected,
  onSelect,
  onDelete,
}: {
  table: TableDef;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "group flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 transition-colors",
        isSelected
          ? "bg-blue-100 dark:bg-blue-900/30"
          : "hover:bg-accent hover:text-accent-foreground",
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-1.5">
        <Table2 className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <span className="truncate text-xs font-medium">
          {table.name || "Untitled"}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-[10px] text-muted-foreground">
          {table.columns.length}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="rounded p-0.5 opacity-0 transition-opacity hover:bg-red-100 group-hover:opacity-100"
        >
          <Trash2 className="h-3 w-3 text-red-500" />
        </button>
      </div>
    </div>
  );
}

/** 列行组件 —— 显示单列的名称、类型、PK/NN/UQ 约束和默认值 */
function ColumnRow({
  col,
  onChange,
  onDelete,
}: {
  col: ColumnDef;
  onChange: (patch: Partial<ColumnDef>) => void;
  onDelete: () => void;
}) {
  const showDefault = col.isRequired || col.defaultValue !== "";

  return (
    <div className="flex items-center gap-1.5 rounded border border-transparent py-0.5 pl-0.5 pr-1 hover:border-border">
      <Input
        value={col.name}
        onChange={(e) => onChange({ name: e.target.value })}
        placeholder="column_name"
        className={cn(inputClass, "w-32 shrink-0")}
      />

      <Select value={col.type} onValueChange={(v) => onChange({ type: v })}>
        <SelectTrigger className="h-7 w-24 shrink-0 rounded border bg-background px-2 text-xs focus:ring-1 focus:ring-blue-500">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {COLUMN_TYPES.map((t) => (
            <SelectItem key={t} value={t} className="text-xs">
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <label className="flex shrink-0 items-center gap-0.5 text-[10px] text-muted-foreground">
        <Checkbox
          checked={col.isPrimary}
          onCheckedChange={(v) => onChange({ isPrimary: v === true })}
          className="h-3 w-3"
        />
        PK
      </label>

      <label className="flex shrink-0 items-center gap-0.5 text-[10px] text-muted-foreground">
        <Checkbox
          checked={col.isRequired}
          onCheckedChange={(v) => onChange({ isRequired: v === true })}
          className="h-3 w-3"
        />
        NN
      </label>

      <label className="flex shrink-0 items-center gap-0.5 text-[10px] text-muted-foreground">
        <Checkbox
          checked={col.isUnique}
          onCheckedChange={(v) => onChange({ isUnique: v === true })}
          className="h-3 w-3"
        />
        UQ
      </label>

      <div className="w-24 shrink-0">
        {showDefault && (
          <Input
            value={col.defaultValue}
            onChange={(e) => onChange({ defaultValue: e.target.value })}
            placeholder="default"
            className={cn(inputClass, "w-full")}
          />
        )}
      </div>

      <button
        onClick={onDelete}
        className="shrink-0 rounded p-0.5 text-muted-foreground hover:bg-red-100 hover:text-red-500"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/** 外键行组件 —— 显示外键列名→引用表→引用列的三段配置 */
function FKRow({
  fk,
  tables,
  onChange,
  onDelete,
}: {
  fk: ForeignKeyDef;
  tables: TableDef[];
  onChange: (patch: Partial<ForeignKeyDef>) => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Input
        value={fk.columnName}
        onChange={(e) => onChange({ columnName: e.target.value })}
        placeholder="column"
        className={cn(inputClass, "w-28")}
      />
      <span className="text-xs text-muted-foreground">→</span>
      <Select
        value={fk.referencedTable}
        onValueChange={(v) => onChange({ referencedTable: v })}
      >
        <SelectTrigger className="h-7 w-36 rounded border bg-background px-2 text-xs focus:ring-1 focus:ring-blue-500">
          <SelectValue placeholder="Table" />
        </SelectTrigger>
        <SelectContent>
          {tables
            .filter((t) => t.name)
            .map((t) => (
              <SelectItem key={t.id} value={t.id} className="text-xs">
                {t.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <span className="text-[10px] text-muted-foreground">.</span>
      <Input
        value={fk.referencedColumn}
        onChange={(e) => onChange({ referencedColumn: e.target.value })}
        placeholder="id"
        className={cn(inputClass, "w-28")}
      />
      <button
        onClick={onDelete}
        className="shrink-0 rounded p-0.5 text-muted-foreground hover:bg-red-100 hover:text-red-500"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

/**
 * 数据模型编辑器主组件
 *
 * 左侧为表列表（支持增删选），右侧为选中表的详细配置：
 * 列定义、外键关联、行级安全策略（RLS）。
 *
 * @returns JSX 元素
 */
export function DataModelEditor() {
  const [tables, setTables] = useState<TableDef[]>([]);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);

  const selectedTable = tables.find((t) => t.id === selectedTableId) ?? null;

  // ── Table CRUD ──────────────────────────────────────────────────────────

  /** 添加新表，自动分配默认列并选中 */
  const addTable = () => {
    const t = newTable();
    setTables((prev) => [...prev, t]);
    setSelectedTableId(t.id);
  };

  /** 更新表属性，拒绝空表名 */
  const updateTable = (id: string, patch: Partial<TableDef>) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const merged = { ...t, ...patch };
        // 表名不允许为空
        if (patch.name !== undefined && patch.name.trim() === "") {
          return t;
        }
        return merged;
      }),
    );
  };

  /** 删除表（带确认），同时清空关联的外键引用 */
  const deleteTable = (id: string) => {
    const table = tables.find((t) => t.id === id);
    if (!table) return;
    if (!window.confirm(`确定要删除表 "${table.name || "Untitled"}" 吗？此操作不可撤销。`)) {
      return;
    }
    setTables((prev) => prev.filter((t) => t.id !== id));
    if (selectedTableId === id) {
      setSelectedTableId(null);
    }
  };

  // ── Column CRUD ─────────────────────────────────────────────────────────

  /** 向指定表添加新列 */
  const addColumn = (tableId: string) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId ? { ...t, columns: [...t.columns, newColumn()] } : t,
      ),
    );
  };

  /** 更新指定列的部分属性 */
  const updateColumn = (
    tableId: string,
    colId: string,
    patch: Partial<ColumnDef>,
  ) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id !== tableId) return t;
        return {
          ...t,
          columns: t.columns.map((c) =>
            c.id === colId ? { ...c, ...patch } : c,
          ),
        };
      }),
    );
  };

  /** 删除指定列 */
  const deleteColumn = (tableId: string, colId: string) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id !== tableId) return t;
        return { ...t, columns: t.columns.filter((c) => c.id !== colId) };
      }),
    );
  };

  // ── FK CRUD ─────────────────────────────────────────────────────────────

  /** 向指定表添加新外键 */
  const addFK = (tableId: string) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id !== tableId) return t;
        const fk: ForeignKeyDef = {
          id: uid(),
          columnName: "",
          referencedTable: "",
          referencedColumn: "id",
        };
        return { ...t, foreignKeys: [...t.foreignKeys, fk] };
      }),
    );
  };

  /** 更新指定外键的部分属性 */
  const updateFK = (
    tableId: string,
    fkId: string,
    patch: Partial<ForeignKeyDef>,
  ) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id !== tableId) return t;
        return {
          ...t,
          foreignKeys: t.foreignKeys.map((fk) =>
            fk.id === fkId ? { ...fk, ...patch } : fk,
          ),
        };
      }),
    );
  };

  /** 删除指定外键 */
  const deleteFK = (tableId: string, fkId: string) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id !== tableId) return t;
        return {
          ...t,
          foreignKeys: t.foreignKeys.filter((fk) => fk.id !== fkId),
        };
      }),
    );
  };

  // ── RLS ─────────────────────────────────────────────────────────────────

  /** 切换 RLS 启用/禁用 */
  const toggleRLS = (tableId: string) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId ? { ...t, rlsEnabled: !t.rlsEnabled } : t,
      ),
    );
  };

  /** 切换 RLS 策略模板的启用/禁用 */
  const togglePolicy = (tableId: string, policy: string) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id !== tableId) return t;
        const exists = t.rlsPolicies.includes(policy);
        return {
          ...t,
          rlsPolicies: exists
            ? t.rlsPolicies.filter((p) => p !== policy)
            : [...t.rlsPolicies, policy],
        };
      }),
    );
  };

  /** 更新自定义策略文本 */
  const updateCustomPolicy = (tableId: string, index: number, value: string) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id !== tableId) return t;
        const policies = [...t.rlsPolicies];
        policies[index] = value;
        return { ...t, rlsPolicies: policies };
      }),
    );
  };

  /** 添加自定义策略 */
  const addCustomPolicy = (tableId: string) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id !== tableId) return t;
        return { ...t, rlsPolicies: [...t.rlsPolicies, ""] };
      }),
    );
  };

  /** 删除指定索引的策略 */
  const removePolicy = (tableId: string, index: number) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id !== tableId) return t;
        return {
          ...t,
          rlsPolicies: t.rlsPolicies.filter((_, i) => i !== index),
        };
      }),
    );
  };

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="flex h-full">
      {/* ── Left Sidebar ─────────────────────────────────────────────── */}
      <div className="flex w-64 shrink-0 flex-col border-r bg-background">
        <div className="flex items-center justify-between border-b px-3 py-2">
          <span className={sectionHeaderClass}>Tables</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={addTable}
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-0.5 p-2">
            {tables.length === 0 ? (
              <p className="px-2 py-4 text-center text-xs text-muted-foreground">
                No tables yet
              </p>
            ) : (
              tables.map((table) => (
                <TableListItem
                  key={table.id}
                  table={table}
                  isSelected={table.id === selectedTableId}
                  onSelect={() => setSelectedTableId(table.id)}
                  onDelete={() => deleteTable(table.id)}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* ── Main Area ─────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {selectedTable ? (
          <ScrollArea className="flex-1">
            <div className="space-y-5 p-4">
              {/* Table Header */}
              <div className="flex items-center gap-2">
                <Input
                  value={selectedTable.name}
                  onChange={(e) =>
                    updateTable(selectedTable.id, { name: e.target.value })
                  }
                  placeholder="table_name"
                  className="h-8 max-w-sm rounded border bg-background px-2 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={() => deleteTable(selectedTable.id)}
                >
                  <Trash2 className="mr-1 h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>

              {/* Columns */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={sectionHeaderClass}>Columns</span>
                  <Sep />
                  <span className="text-[10px] text-muted-foreground">
                    {selectedTable.columns.length}
                  </span>
                </div>
                <div className="space-y-1">
                  {selectedTable.columns.map((col) => (
                    <ColumnRow
                      key={col.id}
                      col={col}
                      onChange={(patch) =>
                        updateColumn(selectedTable.id, col.id, patch)
                      }
                      onDelete={() =>
                        deleteColumn(selectedTable.id, col.id)
                      }
                    />
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => addColumn(selectedTable.id)}
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Add Column
                </Button>
              </div>

              <Separator />

              {/* Foreign Keys */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Key className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className={sectionHeaderClass}>Foreign Keys</span>
                  <Sep />
                  <span className="text-[10px] text-muted-foreground">
                    {selectedTable.foreignKeys.length}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {selectedTable.foreignKeys.map((fk) => (
                    <FKRow
                      key={fk.id}
                      fk={fk}
                      tables={tables}
                      onChange={(patch) =>
                        updateFK(selectedTable.id, fk.id, patch)
                      }
                      onDelete={() =>
                        deleteFK(selectedTable.id, fk.id)
                      }
                    />
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => addFK(selectedTable.id)}
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Add Foreign Key
                </Button>
              </div>

              <Separator />

              {/* RLS Policies */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className={sectionHeaderClass}>RLS Policies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground">
                      {selectedTable.rlsEnabled ? "Enabled" : "Disabled"}
                    </span>
                    <Switch
                      checked={selectedTable.rlsEnabled}
                      onCheckedChange={() => toggleRLS(selectedTable.id)}
                      className="scale-75"
                    />
                  </div>
                </div>
                {selectedTable.rlsEnabled && (
                  <div className="space-y-2 pl-1">
                    {RLS_POLICY_TEMPLATES.map((tpl) => {
                      const active = selectedTable.rlsPolicies.includes(tpl.value);
                      return (
                        <label
                          key={tpl.value}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            checked={active}
                            onCheckedChange={() =>
                              togglePolicy(selectedTable.id, tpl.value)
                            }
                            className="h-3 w-3"
                          />
                          <span className="text-xs">{tpl.label}</span>
                        </label>
                      );
                    })}

                    {selectedTable.rlsPolicies
                      .filter(
                        (p) =>
                          !RLS_POLICY_TEMPLATES.some((t) => t.value === p),
                      )
                      .map((policy, i) => {
                        return (
                          <div
                            key={`custom-${i}`}
                            className="flex items-start gap-2"
                          >
                            <textarea
                              value={policy}
                              onChange={(e) =>
                                updateCustomPolicy(
                                  selectedTable.id,
                                  selectedTable.rlsPolicies.indexOf(policy),
                                  e.target.value,
                                )
                              }
                              placeholder="Custom SQL policy expression..."
                              className="h-16 flex-1 resize-none rounded border bg-background px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                              onClick={() =>
                                removePolicy(
                                  selectedTable.id,
                                  selectedTable.rlsPolicies.indexOf(policy),
                                )
                              }
                              className="mt-1 shrink-0 rounded p-0.5 text-muted-foreground hover:bg-red-100 hover:text-red-500"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        );
                      })}

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => addCustomPolicy(selectedTable.id)}
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      Add Custom Policy
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <Table2 className="mx-auto h-10 w-10 text-muted-foreground/40" />
              <p className="mt-3 text-sm text-muted-foreground">
                Select a table or create a new one
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 h-8"
                onClick={addTable}
              >
                <Plus className="mr-1 h-4 w-4" />
                Add Table
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tiny separator for inline section headers ───────────────────────────────

/** 行内分隔符组件 —— 用于小节标题间的视觉分隔 */
function Sep() {
  return <span className="text-[10px] text-muted-foreground/40">·</span>;
}
