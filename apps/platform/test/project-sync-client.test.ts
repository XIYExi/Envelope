import { describe, expect, it } from "vitest";
import {
  buildProjectSyncCompareViewModel,
  buildProjectSyncViewModel,
  getProjectSyncChangeLabel,
  getProjectSyncResourceLabel,
  isProjectSyncUnsupportedError,
  type ProjectLocalSyncStatusDTO,
  type ProjectSyncCompareResultDTO,
  type ProjectSyncTaskSnapshotDTO,
} from "@/lib/sync/project-sync-client";

function createBaseStatus(overrides: Partial<ProjectLocalSyncStatusDTO> = {}): ProjectLocalSyncStatusDTO {
  return {
    projectId: "project-1",
    backendMode: "local",
    state: "idle",
    dirty: false,
    dirtyResources: [],
    dirtyCounts: {},
    dirtySince: null,
    lastSyncedAt: null,
    lastSyncStartedAt: null,
    lastSyncFinishedAt: null,
    lastSyncError: null,
    remoteProjectId: null,
    createdAt: null,
    updatedAt: null,
    ...overrides,
  };
}

function createBaseTask(overrides: Partial<ProjectSyncTaskSnapshotDTO> = {}): ProjectSyncTaskSnapshotDTO {
  return {
    taskId: "task-1",
    kind: "project_sync_push",
    projectId: "project-1",
    state: "running",
    stage: "推送中",
    percent: 45,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    ...overrides,
  };
}

function createBaseCompare(overrides: Partial<ProjectSyncCompareResultDTO> = {}): ProjectSyncCompareResultDTO {
  return {
    baselineAvailable: true,
    baselineRequired: false,
    local: {
      fingerprint: "local",
      totalResources: 3,
      resourceCounts: { pages: 2, routes: 1 },
    },
    remote: {
      fingerprint: "remote",
      totalResources: 3,
      resourceCounts: { pages: 2, routes: 1 },
    },
    baseline: {
      fingerprint: "base",
      totalResources: 3,
      resourceCounts: { pages: 2, routes: 1 },
    },
    localOnlyCount: 0,
    remoteOnlyCount: 0,
    conflictCount: 0,
    hasConflicts: false,
    canPush: true,
    canPull: true,
    localOnlyChanges: [],
    remoteOnlyChanges: [],
    conflicts: [],
    ...overrides,
  };
}

describe("project sync client view model", () => {
  it("renders dirty status summary from dirty counts", () => {
    const view = buildProjectSyncViewModel({
      status: createBaseStatus({
        state: "dirty",
        dirty: true,
        dirtyResources: ["pages", "endpoints", "flows"],
        dirtyCounts: {
          pages: 2,
          endpoints: 1,
          flows: 1,
        },
      }),
    });

    expect(view.badgeLabel).toBe("待同步");
    expect(view.badgeVariant).toBe("default");
    expect(view.detail).toContain("页面 2 项");
    expect(view.detail).toContain("接口 1 项");
  });

  it("prefers active task progress over persisted status", () => {
    const view = buildProjectSyncViewModel({
      status: createBaseStatus({
        state: "dirty",
        dirty: true,
        dirtyResources: ["pages"],
        dirtyCounts: { pages: 3 },
      }),
      task: createBaseTask({
        state: "running",
        stage: "推送到 Supabase",
        percent: 66,
      }),
    });

    expect(view.badgeLabel).toBe("同步中");
    expect(view.badgeVariant).toBe("secondary");
    expect(view.detail).toBe("推送到 Supabase (66%)");
    expect(view.progress).toBe(66);
    expect(view.isRunning).toBe(true);
  });

  it("renders task error as destructive state", () => {
    const view = buildProjectSyncViewModel({
      task: createBaseTask({
        state: "error",
        stage: "失败",
        percent: 100,
        error: "远端鉴权失败",
      }),
    });

    expect(view.badgeLabel).toBe("同步失败");
    expect(view.badgeVariant).toBe("destructive");
    expect(view.detail).toBe("远端鉴权失败");
    expect(view.isRunning).toBe(false);
  });

  it("detects unsupported backend errors", () => {
    expect(isProjectSyncUnsupportedError({ status: 409, code: "SYNC.UNSUPPORTED_BACKEND" })).toBe(true);
    expect(isProjectSyncUnsupportedError({ status: 500, code: "INTERNAL.ERROR" })).toBe(false);
  });
});

describe("project sync compare view model", () => {
  it("allows first push when remote project is not created yet", () => {
    const view = buildProjectSyncCompareViewModel({
      status: createBaseStatus({
        remoteProjectId: null,
      }),
    });

    expect(view.badgeLabel).toBe("未建远端");
    expect(view.canPush).toBe(true);
    expect(view.canPull).toBe(false);
    expect(view.detail).toContain("首次 Push");
  });

  it("renders local-ahead compare summary", () => {
    const view = buildProjectSyncCompareViewModel({
      status: createBaseStatus({
        remoteProjectId: "1f530b26-4ac2-41dd-b101-7d2341af4f57",
      }),
      compare: createBaseCompare({
        localOnlyCount: 2,
        canPull: false,
      }),
    });

    expect(view.badgeLabel).toBe("本地领先");
    expect(view.canPush).toBe(true);
    expect(view.canPull).toBe(false);
    expect(view.detail).toContain("本地差异 2");
  });

  it("renders conflicts as destructive compare summary", () => {
    const view = buildProjectSyncCompareViewModel({
      status: createBaseStatus({
        remoteProjectId: "1f530b26-4ac2-41dd-b101-7d2341af4f57",
      }),
      compare: createBaseCompare({
        conflictCount: 1,
        hasConflicts: true,
        canPush: false,
        canPull: false,
      }),
    });

    expect(view.badgeLabel).toBe("存在冲突");
    expect(view.badgeVariant).toBe("destructive");
    expect(view.canPush).toBe(false);
    expect(view.detail).toContain("人工处理冲突");
  });

  it("renders diverged local and remote changes without auto-merge", () => {
    const view = buildProjectSyncCompareViewModel({
      status: createBaseStatus({
        remoteProjectId: "1f530b26-4ac2-41dd-b101-7d2341af4f57",
      }),
      compare: createBaseCompare({
        localOnlyCount: 2,
        remoteOnlyCount: 1,
        canPush: false,
        canPull: false,
      }),
    });

    expect(view.badgeLabel).toBe("双端分叉");
    expect(view.canPush).toBe(false);
    expect(view.canPull).toBe(false);
    expect(view.detail).toContain("v1 暂不自动合并");
  });

  it("provides readable labels for compare resource kinds and change types", () => {
    expect(getProjectSyncResourceLabel("pages")).toBe("页面");
    expect(getProjectSyncResourceLabel("auth")).toBe("鉴权");
    expect(getProjectSyncChangeLabel("added")).toBe("新增");
    expect(getProjectSyncChangeLabel("modified")).toBe("修改");
    expect(getProjectSyncChangeLabel("deleted")).toBe("删除");
  });
});
