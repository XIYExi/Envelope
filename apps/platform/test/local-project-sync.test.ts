/**
 * local 项目同步引擎测试。
 *
 * 验证点：
 * - local 仓储写入后会正确写入脏标记；
 * - 推送到 Supabase 后会清空脏标记、记录远端项目 ID，并持久化同步基线；
 * - 远端独有改动会在比较阶段被识别，并允许执行 pull；
 * - 本地/远端同资源分叉时会阻止覆盖同步。
 *
 * @author xiye
 * @date 2026-06-20
 * @since local 同步引擎 v1
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ApiError } from "@/lib/api/errors";
import { getPlatformBackendConfig, resetPlatformBackendConfigForTests } from "@/lib/backend/config";
import { closeLocalSQLiteConnections, getLocalSQLite } from "@/lib/backend/local/sqlite";
import { getProjectRepository } from "@/lib/backend/projects";
import { getProjectResourceRepository } from "@/lib/backend/project-resources";
import {
  compareLocalProjectWithRemote,
  confirmProjectSyncBaseline,
  getLocalProjectSyncStatus,
  pullRemoteProjectToLocal,
  pushLocalProjectToSupabase,
} from "@/lib/sync/local-project-sync";
import { createMockSupabase } from "./helpers/mock-supabase";

const LOCAL_ENV_KEYS = [
  "ENVELOPE_PLATFORM_BACKEND",
  "ENVELOPE_LOCAL_SQLITE_PATH",
  "ENVELOPE_LOCAL_MEDIA_ROOT",
  "ENVELOPE_LOCAL_USER_ID",
] as const;

let tempRoot = "";

beforeEach(() => {
  tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "envelope-local-sync-"));
  process.env.ENVELOPE_PLATFORM_BACKEND = "local";
  process.env.ENVELOPE_LOCAL_SQLITE_PATH = path.join(tempRoot, "data", "envelope.db");
  process.env.ENVELOPE_LOCAL_MEDIA_ROOT = path.join(tempRoot, "media");
  process.env.ENVELOPE_LOCAL_USER_ID = "local-user";
  resetPlatformBackendConfigForTests();
});

afterEach(() => {
  closeLocalSQLiteConnections();
  for (const key of LOCAL_ENV_KEYS) {
    delete process.env[key];
  }
  resetPlatformBackendConfigForTests();
  if (tempRoot) {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

describe("local project sync", () => {
  it("tracks dirty state and clears it after pushing to supabase", async () => {
    const projectRepository = getProjectRepository();
    const resourceRepository = getProjectResourceRepository();
    const remoteSupabase = createMockSupabase();

    const project = await projectRepository.create({
      name: "Local Sync Demo",
      description: "sync desc",
      config: { theme: "dark" },
    });
    await resourceRepository.upsertPages(project.id, [
      {
        path: "/",
        title: "Home",
        schema: {
          version: "3.0.0",
          path: "/",
          title: "Home",
          components: [],
        },
        metadata: { section: "root" },
        sort_order: 0,
        is_published: true,
      },
    ]);
    await resourceRepository.upsertEndpoints(project.id, [
      {
        method: "GET",
        path: "/hello",
        description: "hello api",
        request_schema: {},
        response_schema: { ok: true },
        middleware: [],
        flow_id: null,
        is_active: true,
      },
    ]);

    const dirtyStatus = await getLocalProjectSyncStatus(project.id);
    expect(dirtyStatus.state).toBe("dirty");
    expect(dirtyStatus.dirty).toBe(true);
    expect(dirtyStatus.dirtyResources).toEqual(expect.arrayContaining(["project", "pages", "endpoints"]));

    const result = await pushLocalProjectToSupabase({
      projectId: project.id,
      supabase: remoteSupabase,
    });

    expect(result.remoteProjectId).toMatch(/^id_/);
    expect(result.status.state).toBe("synced");
    expect(result.status.dirty).toBe(false);
    expect(result.status.remoteProjectId).toBe(result.remoteProjectId);
    expect(result.status.syncBaseSnapshot?.summary.totalResources).toBeGreaterThan(0);
    expect(remoteSupabase.__state.projects).toHaveLength(1);
    expect(remoteSupabase.__state.project_pages).toHaveLength(1);
    expect(remoteSupabase.__state.project_endpoints).toHaveLength(1);

    const syncedStatus = await getLocalProjectSyncStatus(project.id);
    expect(syncedStatus.state).toBe("synced");
    expect(syncedStatus.lastSyncedAt).toBeTruthy();
    expect(syncedStatus.dirtyResources).toHaveLength(0);
    expect(syncedStatus.syncBaseSnapshot?.summary.fingerprint).toBeTruthy();
  });

  it("detects remote-only changes and pulls them back to local", async () => {
    const projectRepository = getProjectRepository();
    const resourceRepository = getProjectResourceRepository();
    const remoteSupabase = createMockSupabase();

    const project = await projectRepository.create({
      name: "Remote Pull Demo",
      description: "sync desc",
      config: { theme: "dark" },
    });
    await resourceRepository.upsertPages(project.id, [
      {
        path: "/",
        title: "Home",
        schema: { version: "3.0.0", path: "/", title: "Home", components: [] },
        metadata: {},
        sort_order: 0,
        is_published: true,
      },
    ]);

    const firstPush = await pushLocalProjectToSupabase({
      projectId: project.id,
      supabase: remoteSupabase,
    });

    remoteSupabase.__state.project_pages[0].title = "Remote Home";
    remoteSupabase.__state.project_pages[0].updated_at = new Date().toISOString();

    const compared = await compareLocalProjectWithRemote({
      projectId: project.id,
      supabase: remoteSupabase,
      remoteProjectId: firstPush.remoteProjectId,
    });
    expect(compared.compare.remoteOnlyCount).toBe(1);
    expect(compared.compare.canPull).toBe(true);
    expect(compared.compare.canPush).toBe(false);

    const pulled = await pullRemoteProjectToLocal({
      projectId: project.id,
      supabase: remoteSupabase,
      remoteProjectId: firstPush.remoteProjectId,
    });

    expect(pulled.status.state).toBe("synced");
    const pages = await resourceRepository.listPages(project.id);
    expect(pages[0]?.title).toBe("Remote Home");
  });

  it("blocks push when the same resource diverges locally and remotely", async () => {
    const projectRepository = getProjectRepository();
    const resourceRepository = getProjectResourceRepository();
    const remoteSupabase = createMockSupabase();

    const project = await projectRepository.create({
      name: "Conflict Demo",
      description: "sync desc",
      config: { theme: "dark" },
    });
    await resourceRepository.upsertPages(project.id, [
      {
        path: "/",
        title: "Home",
        schema: { version: "3.0.0", path: "/", title: "Home", components: [] },
        metadata: {},
        sort_order: 0,
        is_published: true,
      },
    ]);

    const firstPush = await pushLocalProjectToSupabase({
      projectId: project.id,
      supabase: remoteSupabase,
    });

    await resourceRepository.upsertPages(project.id, [
      {
        path: "/",
        title: "Local Home v2",
        schema: { version: "3.0.0", path: "/", title: "Local Home v2", components: [] },
        metadata: {},
        sort_order: 0,
        is_published: true,
      },
    ]);
    remoteSupabase.__state.project_pages[0].title = "Remote Home v2";
    remoteSupabase.__state.project_pages[0].updated_at = new Date().toISOString();

    await expect(
      pushLocalProjectToSupabase({
        projectId: project.id,
        supabase: remoteSupabase,
        remoteProjectId: firstPush.remoteProjectId,
      }),
    ).rejects.toMatchObject<ApiError>({
      status: 409,
      code: "SYNC.CONFLICT_DETECTED",
    });
  });

  it("confirms current snapshots as baseline when local and remote are already aligned", async () => {
    const projectRepository = getProjectRepository();
    const resourceRepository = getProjectResourceRepository();
    const remoteSupabase = createMockSupabase();

    const project = await projectRepository.create({
      name: "Baseline Confirm Demo",
      description: "sync desc",
      config: { theme: "dark" },
    });
    await resourceRepository.upsertPages(project.id, [
      {
        path: "/",
        title: "Home",
        schema: { version: "3.0.0", path: "/", title: "Home", components: [] },
        metadata: {},
        sort_order: 0,
        is_published: true,
      },
    ]);

    const firstPush = await pushLocalProjectToSupabase({
      projectId: project.id,
      supabase: remoteSupabase,
    });

    const config = getPlatformBackendConfig();
    const db = getLocalSQLite(config);
    db.prepare("UPDATE project_sync_state SET sync_base_snapshot_json = NULL WHERE project_id = ?").run(project.id);

    const confirmed = await confirmProjectSyncBaseline({
      projectId: project.id,
      supabase: remoteSupabase,
      remoteProjectId: firstPush.remoteProjectId,
    });

    expect(confirmed.status.state).toBe("synced");
    expect(confirmed.status.syncBaseSnapshot?.summary.fingerprint).toBe(confirmed.localSnapshot.summary.fingerprint);
  });

  it("rejects setting baseline when local and remote still differ", async () => {
    const projectRepository = getProjectRepository();
    const resourceRepository = getProjectResourceRepository();
    const remoteSupabase = createMockSupabase();

    const project = await projectRepository.create({
      name: "Baseline Conflict Demo",
      description: "sync desc",
      config: { theme: "dark" },
    });
    await resourceRepository.upsertPages(project.id, [
      {
        path: "/",
        title: "Home",
        schema: { version: "3.0.0", path: "/", title: "Home", components: [] },
        metadata: {},
        sort_order: 0,
        is_published: true,
      },
    ]);

    const firstPush = await pushLocalProjectToSupabase({
      projectId: project.id,
      supabase: remoteSupabase,
    });

    remoteSupabase.__state.project_pages[0].title = "Remote Home v2";
    remoteSupabase.__state.project_pages[0].updated_at = new Date().toISOString();

    await expect(
      confirmProjectSyncBaseline({
        projectId: project.id,
        supabase: remoteSupabase,
        remoteProjectId: firstPush.remoteProjectId,
      }),
    ).rejects.toMatchObject<ApiError>({
      status: 409,
      code: "SYNC.BASELINE_MISMATCH",
    });
  });
});
