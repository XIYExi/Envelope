/**
 * local 模式项目双向同步引擎 v1。
 *
 * 设计目标：
 * - 仅在 `local` 后端模式下启用；
 * - 复用 archive 导出/导入能力构造本地与远端快照；
 * - 基于“上次成功同步的基线快照”做三方比较，先比较再决定 push / pull；
 * - 对同资源双端变更做冲突检测，对单侧变更做方向阻断，避免 v1 阶段发生静默覆盖；
 * - 将成功同步后的基线快照持久化到 SQLite，供后续比较与恢复使用。
 *
 * @author xiye
 * @date 2026-06-20
 * @since local 同步引擎 v2
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import type { ArchiveExportOptions, ProjectArchive } from "@/lib/archive/archive-types";
import { ApiError, apiErrors } from "@/lib/api/errors";
import { buildProjectArchiveFromSnapshot, readProjectSnapshot, readSupabaseProjectSnapshot } from "@/lib/archive/export-archive";
import { importProjectArchive } from "@/lib/archive/import-archive";
import { createLocalArchiveImportRepository } from "@/lib/backend/archive-import/local";
import { createSupabaseArchiveImportRepository } from "@/lib/backend/archive-import/supabase";
import { getPlatformBackendConfig } from "@/lib/backend/config";
import {
  getProjectSyncStatus,
  markProjectSyncFailed,
  markProjectSyncRunning,
  markProjectSyncSucceeded,
  type ProjectLocalSyncStatus,
} from "@/lib/backend/local/sync-state";
import {
  buildComparableSnapshotFromArchive,
  compareComparableSnapshots,
  type ProjectSyncComparableSnapshot,
  type ProjectSyncCompareResult,
} from "@/lib/sync/project-sync-snapshot";
import { createAccessTokenSupabase } from "@/lib/supabase/access-token";

export type LocalProjectSyncProgressCallback = (stage: string, percent: number) => void;

type LocalProjectRemoteSyncInput = {
  /** 本地项目 ID。 */
  projectId: string;
  /** Supabase access token。 */
  accessToken?: string;
  /** 测试或高级场景可直接注入客户端。 */
  supabase?: SupabaseClient<Database>;
  /** 是否强制执行，即使当前没有方向上的变化。 */
  force?: boolean;
  /** 可选的归档导出配置。 */
  archiveOptions?: ArchiveExportOptions;
  /** 可选的远端项目 ID 覆盖值。 */
  remoteProjectId?: string;
};

export type PushLocalProjectToSupabaseInput = LocalProjectRemoteSyncInput;
export type PullRemoteProjectToLocalInput = LocalProjectRemoteSyncInput;
export type CompareLocalProjectWithRemoteInput = Omit<LocalProjectRemoteSyncInput, "force">;

export type LocalProjectSyncResult = {
  /** 本地项目 ID。 */
  projectId: string;
  /** Supabase 远端项目 ID。 */
  remoteProjectId: string;
  /** 完成后的最新状态。 */
  status: ProjectLocalSyncStatus;
};

export type CompareLocalProjectWithRemoteResult = {
  projectId: string;
  remoteProjectId: string;
  status: ProjectLocalSyncStatus;
  localSnapshot: ProjectSyncComparableSnapshot;
  remoteSnapshot: ProjectSyncComparableSnapshot;
  baselineSnapshot: ProjectSyncComparableSnapshot | null;
  compare: ProjectSyncCompareResult;
};

export type ConfirmProjectSyncBaselineInput = Omit<CompareLocalProjectWithRemoteInput, "force">;

function getLocalConfig() {
  const config = getPlatformBackendConfig();
  if (config.mode !== "local") {
    throw apiErrors.conflict("Project sync is only supported in local backend mode", "SYNC.UNSUPPORTED_BACKEND");
  }
  return config;
}

async function resolveSupabaseClient(input: LocalProjectRemoteSyncInput): Promise<SupabaseClient<Database>> {
  if (input.supabase) return input.supabase;
  if (!input.accessToken) {
    throw apiErrors.validation({ accessToken: input.accessToken }, "Missing Supabase access token");
  }
  return createAccessTokenSupabase(input.accessToken);
}

async function resolveRemoteOwnerUserId(supabase: SupabaseClient<Database>): Promise<string> {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  const userId = data.user?.id;
  if (!userId) {
    throw apiErrors.unauthorized("Missing Supabase user for sync");
  }
  return userId;
}

function resolveArchiveOptions(options?: ArchiveExportOptions): ArchiveExportOptions {
  return {
    ...(options ?? {}),
    // 同步链路必须保留完整配置，不能沿用“文件导出”默认的脱敏行为。
    redactSecrets: false,
  };
}

function resolveRemoteProjectId(status: ProjectLocalSyncStatus, overrideRemoteProjectId?: string): string {
  const remoteProjectId = overrideRemoteProjectId ?? status.remoteProjectId ?? null;
  if (!remoteProjectId) {
    throw apiErrors.validation({ remoteProjectId }, "Missing remote project id");
  }
  return remoteProjectId;
}

async function buildLocalProjectArchive(
  projectId: string,
  archiveOptions?: ArchiveExportOptions,
  onProgress?: LocalProjectSyncProgressCallback,
): Promise<ProjectArchive> {
  const snapshot = await readProjectSnapshot(null, projectId, (stage, percent) => {
    onProgress?.(`导出本地项目快照: ${stage}`, Math.min(45, Math.round(percent * 0.45)));
  });
  return buildProjectArchiveFromSnapshot(snapshot, resolveArchiveOptions(archiveOptions));
}

async function buildRemoteProjectArchive(
  supabase: SupabaseClient<Database>,
  remoteProjectId: string,
  archiveOptions?: ArchiveExportOptions,
  onProgress?: LocalProjectSyncProgressCallback,
): Promise<ProjectArchive> {
  const snapshot = await readSupabaseProjectSnapshot(supabase, remoteProjectId, (stage, percent) => {
    onProgress?.(`读取远端项目快照: ${stage}`, 45 + Math.round(percent * 0.15));
  });
  return buildProjectArchiveFromSnapshot(snapshot, resolveArchiveOptions(archiveOptions));
}

function buildCompareResult(status: ProjectLocalSyncStatus, localArchive: ProjectArchive, remoteArchive: ProjectArchive) {
  const localSnapshot = buildComparableSnapshotFromArchive(localArchive);
  const remoteSnapshot = buildComparableSnapshotFromArchive(remoteArchive);
  const baselineSnapshot = status.syncBaseSnapshot ?? (!status.dirty ? localSnapshot : null);
  const compare = compareComparableSnapshots({
    baseline: baselineSnapshot,
    local: localSnapshot,
    remote: remoteSnapshot,
  });

  return {
    localSnapshot,
    remoteSnapshot,
    baselineSnapshot,
    compare,
  };
}

function buildComparisonBlocker(compare: ProjectSyncCompareResult, direction: "push" | "pull") {
  if (compare.baselineRequired) {
    return new ApiError({
      status: 409,
      code: "SYNC.BASELINE_REQUIRED",
      message: "缺少可用的同步基线，无法安全判断双向差异，请先人工确认后再执行同步。",
      details: compare,
    });
  }

  if (compare.hasConflicts) {
    return new ApiError({
      status: 409,
      code: "SYNC.CONFLICT_DETECTED",
      message: direction === "push" ? "检测到本地与远端存在同资源冲突，请先处理冲突后再推送。" : "检测到本地与远端存在同资源冲突，请先处理冲突后再拉取。",
      details: compare,
    });
  }

  if (direction === "push" && compare.remoteOnlyCount > 0) {
    return new ApiError({
      status: 409,
      code: "SYNC.PUSH_BLOCKED_BY_REMOTE_CHANGES",
      message: "远端存在未拉取的改动，v1 不会自动合并，请先拉取远端快照。",
      details: compare,
    });
  }

  if (direction === "pull" && compare.localOnlyCount > 0) {
    return new ApiError({
      status: 409,
      code: "SYNC.PULL_BLOCKED_BY_LOCAL_CHANGES",
      message: "本地存在未推送的改动，v1 不会自动合并，请先推送本地快照。",
      details: compare,
    });
  }

  return null;
}

/**
 * 查询 local 项目的同步状态。
 *
 * @param projectId 本地项目 ID
 * @returns 当前同步状态
 * @author xiye
 * @date 2026-06-20
 */
export async function getLocalProjectSyncStatus(projectId: string): Promise<ProjectLocalSyncStatus> {
  const config = getLocalConfig();
  return getProjectSyncStatus(config, projectId);
}

/**
 * 读取本地/远端快照并执行三方比较。
 *
 * @param input 比较参数
 * @param onProgress 进度回调
 * @returns 本地快照、远端快照、基线快照与比较结果
 * @author xiye
 * @date 2026-06-20
 */
export async function compareLocalProjectWithRemote(
  input: CompareLocalProjectWithRemoteInput,
  onProgress?: LocalProjectSyncProgressCallback,
): Promise<CompareLocalProjectWithRemoteResult> {
  const config = getLocalConfig();
  const status = getProjectSyncStatus(config, input.projectId);
  const remoteProjectId = resolveRemoteProjectId(status, input.remoteProjectId);
  const supabase = await resolveSupabaseClient(input);

  onProgress?.("读取本地快照", 5);
  const localArchive = await buildLocalProjectArchive(input.projectId, input.archiveOptions, onProgress);
  onProgress?.("读取远端快照", 45);
  const remoteArchive = await buildRemoteProjectArchive(supabase, remoteProjectId, input.archiveOptions, onProgress);
  onProgress?.("比较本地/远端快照", 80);

  const { localSnapshot, remoteSnapshot, baselineSnapshot, compare } = buildCompareResult(status, localArchive, remoteArchive);
  onProgress?.("比较完成", 100);

  return {
    projectId: input.projectId,
    remoteProjectId,
    status,
    localSnapshot,
    remoteSnapshot,
    baselineSnapshot,
    compare,
  };
}

/**
 * 在本地与远端内容已一致时，人工确认当前快照为同步基线。
 *
 * 说明：
 * - 该操作不会覆盖本地或远端数据；
 * - 仅当 compare 结果确认两端已无差异时才允许写入基线；
 * - 用于补齐“已经人工核对一致，但缺少历史基线”的恢复链路。
 *
 * @param input 基线确认参数
 * @param onProgress 进度回调
 * @returns 最新 compare 结果与同步状态
 * @author xiye
 * @date 2026-06-20
 */
export async function confirmProjectSyncBaseline(
  input: ConfirmProjectSyncBaselineInput,
  onProgress?: LocalProjectSyncProgressCallback,
): Promise<CompareLocalProjectWithRemoteResult> {
  const config = getLocalConfig();
  const result = await compareLocalProjectWithRemote(input, onProgress);

  if (result.compare.local.fingerprint !== result.compare.remote.fingerprint) {
    throw new ApiError({
      status: 409,
      code: "SYNC.BASELINE_MISMATCH",
      message: "当前本地与远端仍存在差异，无法直接设为基线，请先选择保留本地或保留远端。",
      details: result.compare,
    });
  }

  // 两端内容已一致时，任选其一写入基线都等价，这里沿用本地快照作为已确认基线。
  markProjectSyncSucceeded(config, input.projectId, result.remoteProjectId, result.localSnapshot);
  const status = getProjectSyncStatus(config, input.projectId);
  onProgress?.("基线已确认", 100);

  return {
    ...result,
    status,
    baselineSnapshot: result.localSnapshot,
    compare: {
      ...result.compare,
      baselineAvailable: true,
      baselineRequired: false,
      baseline: result.localSnapshot.summary,
      canPush: true,
      canPull: true,
    },
  };
}

/**
 * 将本地项目以 archive 快照形式推送到 Supabase。
 *
 * v1 规则：
 * - 首次推送允许直接 create；
 * - 存在远端项目时，必须先做快照比较；
 * - 只要检测到远端独有改动或同资源冲突，就拒绝覆盖写入。
 *
 * @param input 推送参数
 * @param onProgress 进度回调
 * @returns 推送结果与最新同步状态
 * @author xiye
 * @date 2026-06-20
 */
export async function pushLocalProjectToSupabase(
  input: PushLocalProjectToSupabaseInput,
  onProgress?: LocalProjectSyncProgressCallback,
): Promise<LocalProjectSyncResult> {
  const config = getLocalConfig();
  const currentStatus = getProjectSyncStatus(config, input.projectId);

  if (!input.force && !currentStatus.dirty && currentStatus.remoteProjectId) {
    onProgress?.("无需同步", 100);
    return {
      projectId: input.projectId,
      remoteProjectId: currentStatus.remoteProjectId,
      status: currentStatus,
    };
  }

  markProjectSyncRunning(config, input.projectId);

  try {
    const supabase = await resolveSupabaseClient(input);
    const remoteOwnerUserId = await resolveRemoteOwnerUserId(supabase);

    onProgress?.("读取本地快照", 5);
    const localArchive = await buildLocalProjectArchive(input.projectId, input.archiveOptions, onProgress);

    const remoteProjectId = input.remoteProjectId ?? currentStatus.remoteProjectId ?? undefined;
    if (remoteProjectId) {
      onProgress?.("比较远端差异", 45);
      const remoteArchive = await buildRemoteProjectArchive(supabase, remoteProjectId, input.archiveOptions, onProgress);
      const { compare } = buildCompareResult(currentStatus, localArchive, remoteArchive);
      const blocker = buildComparisonBlocker(compare, "push");
      if (blocker && !input.force) {
        throw blocker;
      }
    }

    const repository = createSupabaseArchiveImportRepository({
      ownerUserId: remoteOwnerUserId,
      supabase,
    });

    onProgress?.("推送到 Supabase", 60);
    const result = await importProjectArchive(
      localArchive,
      {
        mode: remoteProjectId ? "merge" : "create",
        targetProjectId: remoteProjectId,
        conflictStrategy: "overwrite",
        danglingRefPolicy: "error",
      },
      {
        ownerUserId: remoteOwnerUserId,
        supabase,
        repository,
      },
      (stage, percent) => onProgress?.(`推送到 Supabase: ${stage}`, 60 + Math.round(percent * 0.4)),
    );

    const syncBaseSnapshot = buildComparableSnapshotFromArchive(localArchive);
    markProjectSyncSucceeded(config, input.projectId, result.projectId, syncBaseSnapshot);
    const status = getProjectSyncStatus(config, input.projectId);
    onProgress?.("同步完成", 100);

    return {
      projectId: input.projectId,
      remoteProjectId: result.projectId,
      status,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to push local project";
    markProjectSyncFailed(config, input.projectId, message);
    throw error;
  }
}

/**
 * 将远端项目快照拉取到本地。
 *
 * v1 规则：
 * - 拉取前必须先完成快照比较；
 * - 只要检测到本地独有改动或同资源冲突，就拒绝覆盖写入；
 * - 当前版本不会自动删除本地多余资源，仅覆盖/补写归档内已有资源。
 *
 * @param input 拉取参数
 * @param onProgress 进度回调
 * @returns 拉取结果与最新同步状态
 * @author xiye
 * @date 2026-06-20
 */
export async function pullRemoteProjectToLocal(
  input: PullRemoteProjectToLocalInput,
  onProgress?: LocalProjectSyncProgressCallback,
): Promise<LocalProjectSyncResult> {
  const config = getLocalConfig();
  const currentStatus = getProjectSyncStatus(config, input.projectId);
  const remoteProjectId = resolveRemoteProjectId(currentStatus, input.remoteProjectId);

  markProjectSyncRunning(config, input.projectId);

  try {
    const supabase = await resolveSupabaseClient(input);
    const remoteOwnerUserId = await resolveRemoteOwnerUserId(supabase);

    onProgress?.("读取本地快照", 5);
    const localArchive = await buildLocalProjectArchive(input.projectId, input.archiveOptions, onProgress);
    onProgress?.("读取远端快照", 45);
    const remoteArchive = await buildRemoteProjectArchive(supabase, remoteProjectId, input.archiveOptions, onProgress);
    onProgress?.("比较远端差异", 65);

    const { compare } = buildCompareResult(currentStatus, localArchive, remoteArchive);
    const blocker = buildComparisonBlocker(compare, "pull");
    if (blocker && !input.force) {
      throw blocker;
    }

    if (!input.force && compare.remoteOnlyCount === 0 && !compare.hasConflicts && !compare.baselineRequired) {
      markProjectSyncSucceeded(config, input.projectId, remoteProjectId, buildComparableSnapshotFromArchive(remoteArchive));
      const status = getProjectSyncStatus(config, input.projectId);
      onProgress?.("无需拉取", 100);
      return {
        projectId: input.projectId,
        remoteProjectId,
        status,
      };
    }

    const repository = createLocalArchiveImportRepository();
    onProgress?.("写入本地项目", 75);
    await importProjectArchive(
      remoteArchive,
      {
        mode: "merge",
        targetProjectId: input.projectId,
        conflictStrategy: "overwrite",
        danglingRefPolicy: "error",
      },
      {
        ownerUserId: remoteOwnerUserId,
        repository,
      },
      (stage, percent) => onProgress?.(`写入本地项目: ${stage}`, 75 + Math.round(percent * 0.2)),
    );

    markProjectSyncSucceeded(config, input.projectId, remoteProjectId, buildComparableSnapshotFromArchive(remoteArchive));
    const status = getProjectSyncStatus(config, input.projectId);
    onProgress?.("同步完成", 100);

    return {
      projectId: input.projectId,
      remoteProjectId,
      status,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to pull remote project";
    markProjectSyncFailed(config, input.projectId, message);
    throw error;
  }
}
