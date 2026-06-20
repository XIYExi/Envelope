import { create } from "zustand";
import type { ProjectRoute } from "@/lib/supabase/types";

interface ProjectRoutesState {
  projectId: string | null;
  initializedProjectId: string | null;
  routes: ProjectRoute[];
  isLoading: boolean;
  error: string | null;
}

interface ProjectRoutesActions {
  setInitializedProjectId: (projectId: string | null) => void;
  loadByProjectId: (projectId: string) => Promise<void>;
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

/**
 * 项目路由 store（只读）
 *
 * 说明：
 * - 当前用于“配置归档导出（部分选择）”拉取路由清单
 * - 未来如果路由编辑器落地持久化，可在此基础上扩展 save
 */
export const useProjectRoutesStore = create<ProjectRoutesState & ProjectRoutesActions>((set) => ({
  projectId: null,
  initializedProjectId: null,
  routes: [],
  isLoading: false,
  error: null,

  setInitializedProjectId: (projectId) => set({ initializedProjectId: projectId }),

  loadByProjectId: async (projectId: string) => {
    set({ isLoading: true, error: null, projectId, routes: [] });
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
}));

