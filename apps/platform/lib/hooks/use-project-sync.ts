/**
 * 项目同步状态薄封装 Hook
 *
 * 包装 useProjectLocalSync，统一处理 flushAutosave 前的保存检查，
 * 并聚合页面/流程/端点的保存状态为 syncBusy 标识。
 *
 * @author xiye
 * @date 2026-06-25
 */

import { useProjectLocalSync } from "./use-project-local-sync";
import { useProjectPagesStore } from "@/stores/project-pages";
import { useProjectFlowsStore } from "@/stores/project-flows";
import { useProjectEndpointsStore } from "@/stores/project-endpoints";

export function useProjectSync(projectId: string | null) {
  const isSaving = useProjectPagesStore((state) => state.isSaving);
  const flowSaving = useProjectFlowsStore((state) => state.isSaving);
  const endpointSaving = useProjectEndpointsStore((state) => state.isSaving);

  const sync = useProjectLocalSync(projectId, {
    successMessage: "项目已同步到远端",
    onBeforeSync: async () => {
      const pageStore = useProjectPagesStore.getState();
      if (!pageStore.dirty) return;

      await pageStore.flushAutosave();
      const latestPageState = useProjectPagesStore.getState();
      if (latestPageState.error || latestPageState.dirty) {
        throw new Error(latestPageState.error || "页面仍有未保存变更，请先保存后再同步");
      }
    },
  });

  const syncBusy = sync.isSyncing || sync.isResolvingBaseline || flowSaving || endpointSaving || isSaving;

  return { sync, syncBusy };
}
