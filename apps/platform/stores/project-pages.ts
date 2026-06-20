import { create } from "zustand";
import type { ProjectPage } from "@/lib/supabase/types";
import { pageSchema, type PageSchema, type ComponentNode } from "@envelope/engine";
import type { CanvasComponent, CanvasState } from "@envelope/engine";

export interface EditorProjectPage {
  path: string;
  title: string;
  description: string;
  schema: PageSchema;
  metadata: Record<string, unknown>;
  sort_order: number;
  is_published: boolean;
}

interface ProjectPagesState {
  projectId: string | null;
  pages: EditorProjectPage[];
  currentPath: string | null;
  initializedProjectId: string | null;
  isLoading: boolean;
  isSaving: boolean;
  dirty: boolean;
  changeSeq: number;
  lastSavedAt: number | null;
  error: string | null;
}

interface ProjectPagesActions {
  loadByProjectId: (projectId: string) => Promise<void>;
  save: () => Promise<void>;
  scheduleAutosave: (delayMs?: number) => void;
  flushAutosave: () => Promise<void>;
  cancelAutosave: () => void;
  setCurrentPath: (path: string) => void;
  syncCurrentPageFromCanvas: (canvas: Pick<CanvasState, "components" | "pageBackground" | "pagePadding">) => void;
  setInitializedProjectId: (projectId: string | null) => void;
  markClean: () => void;
  markDirty: () => void;
  getCurrentPage: () => EditorProjectPage | null;
}

function createDefaultPage(path: string): EditorProjectPage {
  const title = path === "/" ? "Home" : path.replace(/^\//, "") || "Page";
  return {
    path,
    title,
    description: "",
    schema: {
      version: "3.0.0",
      title,
      path,
      padding: 16,
      components: [],
    },
    metadata: {},
    sort_order: 0,
    is_published: false,
  };
}

function toEditorPage(row: ProjectPage): EditorProjectPage {
  const parsed = pageSchema.safeParse(row.schema ?? {});
  const fallback = createDefaultPage(row.path);
  const schema: PageSchema = parsed.success
    ? {
        ...parsed.data,
        title: parsed.data.title || row.title,
        path: parsed.data.path || row.path,
      }
    : {
        ...fallback.schema,
        title: row.title,
        path: row.path,
      };

  return {
    path: row.path,
    title: row.title,
    description: row.description ?? "",
    schema,
    metadata: (row.metadata ?? {}) as Record<string, unknown>,
    sort_order: row.sort_order ?? 0,
    is_published: row.is_published ?? false,
  };
}

export function componentNodesToCanvasComponents(nodes: ComponentNode[]): CanvasComponent[] {
  return nodes.map((n, idx) => {
    const x = n.grid?.col ?? 1;
    const y = n.grid?.row ?? idx + 1;
    const width = n.grid?.colSpan ?? 3;
    const height = n.grid?.rowSpan ?? 2;
    return {
      id: n.id,
      node: n,
      position: { x, y, width, height },
    };
  });
}

export function canvasComponentsToComponentNodes(components: CanvasComponent[]): ComponentNode[] {
  return components.map((c) => ({
    ...c.node,
    id: c.id,
    grid: {
      col: c.position.x,
      row: c.position.y,
      colSpan: c.position.width,
      rowSpan: c.position.height,
    },
  }));
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

export const useProjectPagesStore = create<ProjectPagesState & ProjectPagesActions>((set, get) => ({
  projectId: null,
  pages: [],
  currentPath: null,
  initializedProjectId: null,
  isLoading: false,
  isSaving: false,
  dirty: false,
  changeSeq: 0,
  lastSavedAt: null,
  error: null,

  setInitializedProjectId: (projectId) => set({ initializedProjectId: projectId }),

  setCurrentPath: (path) => set({ currentPath: path }),

  markClean: () => set({ dirty: false }),

  markDirty: () => set({ dirty: true }),

  scheduleAutosave: (delayMs = 30_000) => {
    if (autosaveTimer) clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(() => {
      useProjectPagesStore.getState().save();
    }, delayMs);
  },

  cancelAutosave: () => {
    if (autosaveTimer) clearTimeout(autosaveTimer);
    autosaveTimer = null;
  },

  flushAutosave: async () => {
    if (autosaveTimer) clearTimeout(autosaveTimer);
    autosaveTimer = null;
    await useProjectPagesStore.getState().save();
  },

  getCurrentPage: () => {
    const { pages, currentPath } = get();
    if (!currentPath) return null;
    return pages.find((p) => p.path === currentPath) ?? null;
  },

  loadByProjectId: async (projectId: string) => {
    set({ isLoading: true, error: null, projectId });
    try {
      const res = await fetch(`/api/projects/${projectId}/pages`, { method: "GET" });
      if (!res.ok) throw new Error(await getApiErrorMessage(res, "Failed to fetch project pages"));
      const rows: ProjectPage[] = await res.json();
      const pages = rows.map(toEditorPage);
      if (pages.length === 0) {
        const defaultPage = createDefaultPage("/");
        set({
          pages: [defaultPage],
          currentPath: "/",
          dirty: true,
        });
        return;
      }
      set({
        pages,
        currentPath: pages[0]?.path ?? "/",
        dirty: false,
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to fetch project pages";
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },

  syncCurrentPageFromCanvas: (canvas) => {
    const state = get();
    if (!state.currentPath) return;
    const components = canvasComponentsToComponentNodes(canvas.components);
    set({
      pages: state.pages.map((p) =>
        p.path === state.currentPath
          ? {
              ...p,
              schema: {
                ...p.schema,
                components,
                padding: canvas.pagePadding,
                background: {
                  ...(p.schema.background ?? {}),
                  color: canvas.pageBackground,
                },
              },
            }
          : p,
      ),
      dirty: true,
      changeSeq: state.changeSeq + 1,
    });
  },

  save: async () => {
    const { projectId, pages, isSaving, changeSeq } = get();
    if (!projectId || isSaving) return;

    set({ isSaving: true, error: null });
    const startSeq = changeSeq;
    try {
      const res = await fetch(`/api/projects/${projectId}/pages`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pages: pages.map((p) => ({
            path: p.path,
            title: p.title,
            description: p.description,
            schema: p.schema,
            metadata: p.metadata,
            sort_order: p.sort_order,
            is_published: p.is_published,
          })),
        }),
      });
      if (!res.ok) throw new Error(await getApiErrorMessage(res, "Failed to save project pages"));
      const rows: ProjectPage[] = await res.json();
      const savedPages = rows.map(toEditorPage);
      const latest = get();
      const stillDirty = latest.changeSeq !== startSeq;
      set({
        pages: stillDirty ? latest.pages : savedPages.length > 0 ? savedPages : latest.pages,
        dirty: stillDirty,
        lastSavedAt: stillDirty ? null : Date.now(),
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to save project pages";
      set({ error: message });
    } finally {
      set({ isSaving: false });
    }
  },
}));
