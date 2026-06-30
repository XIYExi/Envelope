import { create } from "zustand";
import type { ProjectEndpoint } from "@/lib/supabase/types";

interface ProjectEndpointsState {
  projectId: string | null;
  initializedProjectId: string | null;
  endpoints: ProjectEndpoint[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
}

interface ProjectEndpointsActions {
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

export const useProjectEndpointsStore = create<ProjectEndpointsState & ProjectEndpointsActions>((set, get) => ({
  projectId: null,
  initializedProjectId: null,
  endpoints: [],
  isLoading: false,
  isSaving: false,
  error: null,

  setInitializedProjectId: (projectId) => set({ initializedProjectId: projectId }),

  loadByProjectId: async (projectId: string) => {
    set({ isLoading: true, error: null, projectId, endpoints: [] });
    try {
      const res = await fetch(`/api/projects/${projectId}/endpoints`, { method: "GET" });
      if (!res.ok) throw new Error(await getApiErrorMessage(res, "Failed to fetch project endpoints"));
      const rows: ProjectEndpoint[] = await res.json();
      set({ endpoints: rows });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to fetch project endpoints";
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },

  save: async () => {
    const { projectId, endpoints, isSaving } = get();
    if (!projectId || isSaving) return;

    set({ isSaving: true, error: null });
    try {
      const res = await fetch(`/api/projects/${projectId}/endpoints`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoints: endpoints.map((e) => ({
            id: e.id,
            method: e.method,
            path: e.path,
            description: e.description ?? "",
            request_schema: e.request_schema ?? {},
            response_schema: e.response_schema ?? {},
            middleware: e.middleware ?? {},
            flow_id: e.flow_id ?? null,
            is_active: e.is_active ?? true,
          })),
        }),
      });
      if (!res.ok) throw new Error(await getApiErrorMessage(res, "Failed to save project endpoints"));
      const rows: ProjectEndpoint[] = await res.json();
      set({ endpoints: rows });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to save project endpoints";
      set({ error: message });
    } finally {
      set({ isSaving: false });
    }
  },
}));
