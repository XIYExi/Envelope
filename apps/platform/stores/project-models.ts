import { create } from "zustand";
import type { ProjectModel } from "@/lib/supabase/types";

/**
 * 数据模型表列信息
 */
export interface TableColumn {
  name: string;
  type: string;
}

/**
 * 数据模型表信息
 */
export interface TableInfo {
  name: string;
  columns: TableColumn[];
}

// ─── Editor Table Types ──────────────────────────────────────────────────────

/** 编辑器数据库列定义 */
export interface EditorColumnDef {
  id: string;
  name: string;
  type: string;
  isPrimary: boolean;
  isRequired: boolean;
  isUnique: boolean;
  defaultValue: string;
}

/** 编辑器外键约束定义 */
export interface EditorForeignKeyDef {
  id: string;
  columnName: string;
  referencedTable: string;
  referencedColumn: string;
}

/** 编辑器数据库表定义 */
export interface EditorTableDef {
  id: string;
  name: string;
  columns: EditorColumnDef[];
  foreignKeys: EditorForeignKeyDef[];
  rlsEnabled: boolean;
  rlsPolicies: string[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function uid(): string {
  return crypto.randomUUID();
}

function newColumn(type: string = "text"): EditorColumnDef {
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

export function newTable(): EditorTableDef {
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

/** 将 EditorTableDef 转换为 TableInfo（供 dataBinding 使用） */
export function editorTableToTableInfo(table: EditorTableDef): TableInfo {
  return {
    name: table.name,
    columns: table.columns.map((c) => ({ name: c.name, type: c.type })),
  };
}

// ─── Store Types ─────────────────────────────────────────────────────────────

interface ProjectModelsState {
  projectId: string | null;
  initializedProjectId: string | null;
  models: ProjectModel[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  /** 数据表列表，供 dataBinding 字段级联选择 */
  tables: TableInfo[];
  /** 编辑器本地表定义列表 */
  editorTables: EditorTableDef[];
  dirty: boolean;
  changeSeq: number;
  lastSavedAt: number | null;
}

interface ProjectModelsActions {
  setInitializedProjectId: (projectId: string | null) => void;
  loadByProjectId: (projectId: string) => Promise<void>;
  /** 设置数据表列表（供 dataBinding 字段级联选择使用） */
  setTables: (tables: TableInfo[]) => void;
  /** 设置编辑器表列表 */
  setEditorTables: (tables: EditorTableDef[]) => void;
  // ── 表 CRUD ──
  addEditorTable: () => string;
  updateEditorTable: (id: string, patch: Partial<EditorTableDef>) => void;
  removeEditorTable: (id: string) => void;
  // ── 列 CRUD ──
  addColumn: (tableId: string) => void;
  updateColumn: (tableId: string, colId: string, patch: Partial<EditorColumnDef>) => void;
  deleteColumn: (tableId: string, colId: string) => void;
  // ── 外键 CRUD ──
  addFK: (tableId: string) => void;
  updateFK: (tableId: string, fkId: string, patch: Partial<EditorForeignKeyDef>) => void;
  deleteFK: (tableId: string, fkId: string) => void;
  // ── RLS ──
  toggleRLS: (tableId: string) => void;
  togglePolicy: (tableId: string, policy: string) => void;
  updateCustomPolicy: (tableId: string, index: number, value: string) => void;
  addCustomPolicy: (tableId: string) => void;
  removePolicy: (tableId: string, index: number) => void;
  // ── 持久化 ──
  save: () => Promise<void>;
  scheduleAutosave: (delayMs?: number) => void;
  flushAutosave: () => Promise<void>;
  cancelAutosave: () => void;
}

async function getApiErrorMessage(res: Response, fallback: string): Promise<string> {
  try {
    const data: unknown = await res.json();
    if (typeof data === "object" && data !== null && "error" in data) {
      const err = (data as { error?: unknown }).error;
      if (typeof err === "string") return err;
      if (typeof err === "object" && err !== null && "message" in err) {
        const message = (err as { message?: unknown }).message;
        if (typeof message === "string") return message;
      }
    }
  } catch {
  }
  return fallback;
}

let autosaveTimer: ReturnType<typeof setTimeout> | null = null;
let maxDelayTimer: ReturnType<typeof setTimeout> | null = null;
const MAX_DELAY_MS = 30_000;

/**
 * 项目数据模型 store
 *
 * 扩展为支持数据模型编辑器持久化，包含编辑器本地状态、CRUD 操作和自动保存。
 * 原有 `tables: TableInfo[]` 保持向后兼容（供 dataBinding 级联选择使用）。
 */
export const useProjectModelsStore = create<ProjectModelsState & ProjectModelsActions>((set, get) => ({
  projectId: null,
  initializedProjectId: null,
  models: [],
  isLoading: false,
  isSaving: false,
  error: null,
  tables: [],
  editorTables: [],
  dirty: false,
  changeSeq: 0,
  lastSavedAt: null,

  setInitializedProjectId: (projectId) => set({ initializedProjectId: projectId }),

  loadByProjectId: async (projectId: string) => {
    set({ isLoading: true, error: null, projectId, models: [] });
    try {
      const res = await fetch(`/api/projects/${projectId}/models`, { method: "GET" });
      if (!res.ok) throw new Error(await getApiErrorMessage(res, "Failed to fetch project models"));
      const rows: ProjectModel[] = await res.json();
      set({ models: rows });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to fetch project models";
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },

  /** 设置数据表列表（供 dataBinding 字段级联选择使用） */
  setTables: (tables) => set({ tables }),

  setEditorTables: (tables) => set({ editorTables: tables }),

  // ── 表 CRUD ──

  addEditorTable: () => {
    const t = newTable();
    set((state) => ({
      editorTables: [...state.editorTables, t],
      dirty: true,
      changeSeq: state.changeSeq + 1,
    }));
    return t.id;
  },

  updateEditorTable: (id, patch) => {
    set((state) => ({
      editorTables: state.editorTables.map((t) => {
        if (t.id !== id) return t;
        const merged = { ...t, ...patch };
        if (patch.name !== undefined && patch.name.trim() === "") {
          return t;
        }
        return merged;
      }),
      dirty: true,
      changeSeq: state.changeSeq + 1,
    }));
  },

  removeEditorTable: (id) => {
    set((state) => ({
      editorTables: state.editorTables.filter((t) => t.id !== id),
      dirty: true,
      changeSeq: state.changeSeq + 1,
    }));
  },

  // ── 列 CRUD ──

  addColumn: (tableId) => {
    set((state) => ({
      editorTables: state.editorTables.map((t) =>
        t.id === tableId ? { ...t, columns: [...t.columns, newColumn()] } : t,
      ),
      dirty: true,
      changeSeq: state.changeSeq + 1,
    }));
  },

  updateColumn: (tableId, colId, patch) => {
    set((state) => ({
      editorTables: state.editorTables.map((t) => {
        if (t.id !== tableId) return t;
        return {
          ...t,
          columns: t.columns.map((c) =>
            c.id === colId ? { ...c, ...patch } : c,
          ),
        };
      }),
      dirty: true,
      changeSeq: state.changeSeq + 1,
    }));
  },

  deleteColumn: (tableId, colId) => {
    set((state) => ({
      editorTables: state.editorTables.map((t) => {
        if (t.id !== tableId) return t;
        return { ...t, columns: t.columns.filter((c) => c.id !== colId) };
      }),
      dirty: true,
      changeSeq: state.changeSeq + 1,
    }));
  },

  // ── 外键 CRUD ──

  addFK: (tableId) => {
    set((state) => ({
      editorTables: state.editorTables.map((t) => {
        if (t.id !== tableId) return t;
        const fk: EditorForeignKeyDef = {
          id: uid(),
          columnName: "",
          referencedTable: "",
          referencedColumn: "id",
        };
        return { ...t, foreignKeys: [...t.foreignKeys, fk] };
      }),
      dirty: true,
      changeSeq: state.changeSeq + 1,
    }));
  },

  updateFK: (tableId, fkId, patch) => {
    set((state) => ({
      editorTables: state.editorTables.map((t) => {
        if (t.id !== tableId) return t;
        return {
          ...t,
          foreignKeys: t.foreignKeys.map((fk) =>
            fk.id === fkId ? { ...fk, ...patch } : fk,
          ),
        };
      }),
      dirty: true,
      changeSeq: state.changeSeq + 1,
    }));
  },

  deleteFK: (tableId, fkId) => {
    set((state) => ({
      editorTables: state.editorTables.map((t) => {
        if (t.id !== tableId) return t;
        return {
          ...t,
          foreignKeys: t.foreignKeys.filter((fk) => fk.id !== fkId),
        };
      }),
      dirty: true,
      changeSeq: state.changeSeq + 1,
    }));
  },

  // ── RLS ──

  toggleRLS: (tableId) => {
    set((state) => ({
      editorTables: state.editorTables.map((t) =>
        t.id === tableId ? { ...t, rlsEnabled: !t.rlsEnabled } : t,
      ),
      dirty: true,
      changeSeq: state.changeSeq + 1,
    }));
  },

  togglePolicy: (tableId, policy) => {
    set((state) => ({
      editorTables: state.editorTables.map((t) => {
        if (t.id !== tableId) return t;
        const exists = t.rlsPolicies.includes(policy);
        return {
          ...t,
          rlsPolicies: exists
            ? t.rlsPolicies.filter((p) => p !== policy)
            : [...t.rlsPolicies, policy],
        };
      }),
      dirty: true,
      changeSeq: state.changeSeq + 1,
    }));
  },

  updateCustomPolicy: (tableId, index, value) => {
    set((state) => ({
      editorTables: state.editorTables.map((t) => {
        if (t.id !== tableId) return t;
        const policies = [...t.rlsPolicies];
        policies[index] = value;
        return { ...t, rlsPolicies: policies };
      }),
      dirty: true,
      changeSeq: state.changeSeq + 1,
    }));
  },

  addCustomPolicy: (tableId) => {
    set((state) => ({
      editorTables: state.editorTables.map((t) => {
        if (t.id !== tableId) return t;
        return { ...t, rlsPolicies: [...t.rlsPolicies, ""] };
      }),
      dirty: true,
      changeSeq: state.changeSeq + 1,
    }));
  },

  removePolicy: (tableId, index) => {
    set((state) => ({
      editorTables: state.editorTables.map((t) => {
        if (t.id !== tableId) return t;
        return {
          ...t,
          rlsPolicies: t.rlsPolicies.filter((_, i) => i !== index),
        };
      }),
      dirty: true,
      changeSeq: state.changeSeq + 1,
    }));
  },

  // ── 持久化 ──

  scheduleAutosave: (delayMs = 5_000) => {
    if (autosaveTimer) clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(() => {
      if (maxDelayTimer) clearTimeout(maxDelayTimer);
      maxDelayTimer = null;
      autosaveTimer = null;
      useProjectModelsStore.getState().save();
    }, delayMs);
    if (!maxDelayTimer) {
      maxDelayTimer = setTimeout(() => {
        if (autosaveTimer) clearTimeout(autosaveTimer);
        autosaveTimer = null;
        maxDelayTimer = null;
        useProjectModelsStore.getState().save();
      }, MAX_DELAY_MS);
    }
  },

  cancelAutosave: () => {
    if (autosaveTimer) clearTimeout(autosaveTimer);
    autosaveTimer = null;
    if (maxDelayTimer) clearTimeout(maxDelayTimer);
    maxDelayTimer = null;
  },

  flushAutosave: async () => {
    if (autosaveTimer) clearTimeout(autosaveTimer);
    autosaveTimer = null;
    if (maxDelayTimer) clearTimeout(maxDelayTimer);
    maxDelayTimer = null;
    await useProjectModelsStore.getState().save();
  },

  save: async () => {
    const { projectId, editorTables, isSaving, changeSeq } = get();
    if (!projectId || isSaving) return;

    set({ isSaving: true, error: null });
    const startSeq = changeSeq;
    try {
      const body = JSON.stringify({
        tables: editorTables.map((t) => ({
          id: t.id,
          name: t.name,
          columns: t.columns.map((c) => ({
            id: c.id,
            name: c.name,
            type: c.type,
            is_primary: c.isPrimary,
            is_required: c.isRequired,
            is_unique: c.isUnique,
            default_value: c.defaultValue,
          })),
          foreign_keys: t.foreignKeys.map((fk) => ({
            id: fk.id,
            column_name: fk.columnName,
            referenced_table: fk.referencedTable,
            referenced_column: fk.referencedColumn,
          })),
          rls_enabled: t.rlsEnabled,
          rls_policies: t.rlsPolicies,
        })),
      });
      const res = await fetch(`/api/projects/${projectId}/models`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body,
      });
      if (!res.ok) throw new Error(await getApiErrorMessage(res, "Failed to save project models"));
      const rows: ProjectModel[] = await res.json();
      const latest = get();
      const stillDirty = latest.changeSeq !== startSeq;

      // 同步 tables（供 dataBinding 字段级联选择使用） — Q6
      const syncedTables = latest.editorTables.map(editorTableToTableInfo);

      set({
        models: stillDirty ? latest.models : rows,
        tables: syncedTables,
        dirty: stillDirty,
        lastSavedAt: stillDirty ? null : Date.now(),
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to save project models";
      set({ error: message });
    } finally {
      set({ isSaving: false });
    }
  },
}));

