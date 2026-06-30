import { create } from "zustand";
import type { ProjectAuth } from "@/lib/supabase/types";

interface ProjectAuthState {
  projectId: string | null;
  initializedProjectId: string | null;
  auth: ProjectAuth | null;
  isLoading: boolean;
  error: string | null;
}

interface ProjectAuthActions {
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
 * 项目鉴权 store（只读）
 *
 * 说明：
 * - 当前用于“配置归档导出（部分选择）”判断/展示鉴权配置是否存在
 * - 未来如果鉴权配置编辑器落地持久化，可在此基础上扩展 save
 */
export const useProjectAuthStore = create<ProjectAuthState & ProjectAuthActions>((set) => ({
  projectId: null,
  initializedProjectId: null,
  auth: null,
  isLoading: false,
  error: null,

  setInitializedProjectId: (projectId) => set({ initializedProjectId: projectId }),

  loadByProjectId: async (projectId: string) => {
    set({ isLoading: true, error: null, projectId, auth: null });
    try {
      const res = await fetch(`/api/projects/${projectId}/auth`, { method: "GET" });
      if (!res.ok) throw new Error(await getApiErrorMessage(res, "Failed to fetch project auth"));
      const row: ProjectAuth | null = await res.json();
      set({ auth: row });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to fetch project auth";
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

