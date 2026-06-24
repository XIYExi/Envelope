import { create } from "zustand";
import type { ProjectRoute } from "@/lib/supabase/types";

// ─── Editor Route Types ──────────────────────────────────────────────────────

/** 路由定义 —— 包含路径、类型、父子关系、认证、SEO、导航等全部配置 */
export interface EditorRouteDef {
  id: string;
  path: string;
  type: "page" | "api" | "layout" | "redirect";
  parentId: string | null;
  layout: string;
  authGuard: "public" | "authenticated" | "role";
  requiredRole: string;
  httpMethod: string;
  boundFlow: string;
  title: string;
  description: string;
  ogImage: string;
  inNavigation: boolean;
  navLabel: string;
  navIcon: string;
  navOrder: number;
  redirectSource: string;
  redirectDestination: string;
  redirectStatus: "301" | "302";
  /** 关联页面的 ID（type="page" 时有效） */
  pageId: string;
}

/** 创建默认路由对象 */
export function createDefaultRoute(
  overrides: Partial<EditorRouteDef> & { id: string },
): EditorRouteDef {
  return {
    path: "/new-route",
    type: "page",
    parentId: null,
    layout: "",
    authGuard: "public",
    requiredRole: "",
    httpMethod: "GET",
    boundFlow: "",
    title: "",
    description: "",
    ogImage: "",
    inNavigation: false,
    navLabel: "",
    navIcon: "",
    navOrder: 0,
    redirectSource: "",
    redirectDestination: "",
    redirectStatus: "301",
    pageId: "",
    ...overrides,
  };
}

// ─── Store Types ─────────────────────────────────────────────────────────────

interface ProjectRoutesState {
  projectId: string | null;
  initializedProjectId: string | null;
  routes: ProjectRoute[];
  /** 编辑器本地路由列表 */
  editorRoutes: EditorRouteDef[];
  isLoading: boolean;
  isSaving: boolean;
  dirty: boolean;
  changeSeq: number;
  lastSavedAt: number | null;
  error: string | null;
}

interface ProjectRoutesActions {
  setInitializedProjectId: (projectId: string | null) => void;
  loadByProjectId: (projectId: string) => Promise<void>;
  /** 设置编辑器路由列表 */
  setEditorRoutes: (routes: EditorRouteDef[]) => void;
  /** 添加路由 */
  addEditorRoute: (type: EditorRouteDef["type"]) => void;
  /** 更新路由 */
  updateEditorRoute: (id: string, patch: Partial<EditorRouteDef>) => void;
  /** 删除路由 */
  removeEditorRoute: (id: string) => void;
  /** 保存到服务器 */
  save: () => Promise<void>;
  /** 调度自动保存（防抖 + 最大间隔守卫） */
  scheduleAutosave: (delayMs?: number) => void;
  /** 刷新自动保存 */
  flushAutosave: () => Promise<void>;
  /** 取消自动保存 */
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
 * 项目路由 store
 *
 * 扩展为支持路由编辑器持久化，包含本地编辑器状态、CRUD 操作和自动保存。
 * 原有 `routes: ProjectRoute[]` 保持向后兼容（供配置归档导出使用）。
 */
export const useProjectRoutesStore = create<ProjectRoutesState & ProjectRoutesActions>((set, get) => ({
  projectId: null,
  initializedProjectId: null,
  routes: [],
  editorRoutes: [],
  isLoading: false,
  isSaving: false,
  dirty: false,
  changeSeq: 0,
  lastSavedAt: null,
  error: null,

  setInitializedProjectId: (projectId) => set({ initializedProjectId: projectId }),

  loadByProjectId: async (projectId: string) => {
    set({ isLoading: true, error: null, projectId, routes: [], editorRoutes: [] });
    try {
      const res = await fetch(`/api/projects/${projectId}/routes`, { method: "GET" });
      if (!res.ok) throw new Error(await getApiErrorMessage(res, "Failed to fetch project routes"));
      const rows: ProjectRoute[] = await res.json();
      set({ routes: rows });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to fetch project routes";
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },

  setEditorRoutes: (routes) => set({ editorRoutes: routes }),

  addEditorRoute: (type) => {
    const newRoute = createDefaultRoute({
      id: crypto.randomUUID(),
      type,
      path: type === "api" ? "/api/new-route" : "/new-route",
    });
    set((state) => ({
      editorRoutes: [...state.editorRoutes, newRoute],
      dirty: true,
      changeSeq: state.changeSeq + 1,
    }));
  },

  updateEditorRoute: (id, patch) => {
    set((state) => ({
      editorRoutes: state.editorRoutes.map((r) =>
        r.id === id ? { ...r, ...patch } : r,
      ),
      dirty: true,
      changeSeq: state.changeSeq + 1,
    }));
  },

  removeEditorRoute: (id) => {
    set((state) => {
      const isRoot = state.editorRoutes.find((r) => r.id === id)?.path === "/";
      if (isRoot) return {};
      const childIds = new Set<string>();
      const collectChildren = (parentId: string) => {
        for (const r of state.editorRoutes) {
          if (r.parentId === parentId && !childIds.has(r.id)) {
            childIds.add(r.id);
            collectChildren(r.id);
          }
        }
      };
      collectChildren(id);
      return {
        editorRoutes: state.editorRoutes.filter(
          (r) => r.id !== id && !childIds.has(r.id),
        ),
        dirty: true,
        changeSeq: state.changeSeq + 1,
      };
    });
  },

  scheduleAutosave: (delayMs = 5_000) => {
    if (autosaveTimer) clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(() => {
      if (maxDelayTimer) clearTimeout(maxDelayTimer);
      maxDelayTimer = null;
      autosaveTimer = null;
      useProjectRoutesStore.getState().save();
    }, delayMs);
    if (!maxDelayTimer) {
      maxDelayTimer = setTimeout(() => {
        if (autosaveTimer) clearTimeout(autosaveTimer);
        autosaveTimer = null;
        maxDelayTimer = null;
        useProjectRoutesStore.getState().save();
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
    await useProjectRoutesStore.getState().save();
  },

  save: async () => {
    const { projectId, editorRoutes, isSaving, changeSeq } = get();
    if (!projectId || isSaving) return;

    set({ isSaving: true, error: null });
    const startSeq = changeSeq;
    try {
      const res = await fetch(`/api/projects/${projectId}/routes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          routes: editorRoutes.map((r) => ({
            id: r.id,
            path: r.path,
            type: r.type,
            parent_id: r.parentId,
            layout: r.layout,
            auth_guard: r.authGuard,
            required_role: r.requiredRole,
            http_method: r.httpMethod,
            bound_flow: r.boundFlow,
            title: r.title,
            description: r.description,
            og_image: r.ogImage,
            in_navigation: r.inNavigation,
            nav_label: r.navLabel,
            nav_icon: r.navIcon,
            nav_order: r.navOrder,
            redirect_source: r.redirectSource,
            redirect_destination: r.redirectDestination,
            redirect_status: r.redirectStatus,
            page_id: r.pageId || null,
          })),
        }),
      });
      if (!res.ok) throw new Error(await getApiErrorMessage(res, "Failed to save project routes"));
      const rows: ProjectRoute[] = await res.json();
      const latest = get();
      const stillDirty = latest.changeSeq !== startSeq;
      set({
        routes: stillDirty ? latest.routes : rows,
        dirty: stillDirty,
        lastSavedAt: stillDirty ? null : Date.now(),
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to save project routes";
      set({ error: message });
    } finally {
      set({ isSaving: false });
    }
  },
}));

