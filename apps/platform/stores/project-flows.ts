import { create } from "zustand";
import type { ProjectFlow } from "@/lib/supabase/types";

interface ProjectFlowsState {
  projectId: string | null;
  initializedProjectId: string | null;
  flows: ProjectFlow[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
}

interface ProjectFlowsActions {
  setInitializedProjectId: (projectId: string | null) => void;
  loadByProjectId: (projectId: string) => Promise<void>;
  save: () => Promise<void>;
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

export const useProjectFlowsStore = create<ProjectFlowsState & ProjectFlowsActions>((set, get) => ({
  projectId: null,
  initializedProjectId: null,
  flows: [],
  isLoading: false,
  isSaving: false,
  error: null,

  setInitializedProjectId: (projectId) => set({ initializedProjectId: projectId }),

  loadByProjectId: async (projectId: string) => {
    set({ isLoading: true, error: null, projectId, flows: [] });
    try {
      const res = await fetch(`/api/projects/${projectId}/flows`, { method: "GET" });
      if (!res.ok) throw new Error(await getApiErrorMessage(res, "Failed to fetch project flows"));
      const rows: ProjectFlow[] = await res.json();
      set({ flows: rows });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to fetch project flows";
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },

  save: async () => {
    const { projectId, flows, isSaving } = get();
    if (!projectId || isSaving) return;

    set({ isSaving: true, error: null });
    try {
      const res = await fetch(`/api/projects/${projectId}/flows`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flows: flows.map((f) => ({
            id: f.id,
            name: f.name,
            description: f.description ?? "",
            flow_type: f.flow_type ?? "action",
            yaml_content: f.yaml_content ?? "",
            trigger_event: f.trigger_event ?? null,
            is_active: f.is_active ?? true,
          })),
        }),
      });
      if (!res.ok) throw new Error(await getApiErrorMessage(res, "Failed to save project flows"));
      const rows: ProjectFlow[] = await res.json();
      set({ flows: rows });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to save project flows";
      set({ error: message });
    } finally {
      set({ isSaving: false });
    }
  },
}));
