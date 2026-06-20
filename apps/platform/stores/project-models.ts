import { create } from "zustand";
import type { ProjectModel } from "@/lib/supabase/types";

interface ProjectModelsState {
  projectId: string | null;
  initializedProjectId: string | null;
  models: ProjectModel[];
  isLoading: boolean;
  error: string | null;
}

interface ProjectModelsActions {
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
 * 项目数据模型 store（只读）
 *
 * 说明：
 * - 当前用于“配置归档导出（部分选择）”拉取模型清单
 * - 未来如果数据模型编辑器落地持久化，可在此基础上扩展 save
 */
export const useProjectModelsStore = create<ProjectModelsState & ProjectModelsActions>((set) => ({
  projectId: null,
  initializedProjectId: null,
  models: [],
  isLoading: false,
  error: null,

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
}));

