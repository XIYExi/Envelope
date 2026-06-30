/**
 * local 同步任务管理测试。
 *
 * 验证点：
 * - push / pull 同步任务都能从 queued/running 走到 done；
 * - 任务结果会携带远端项目 ID；
 * - 任务查询遵守 ownerUserId 权限隔离。
 *
 * @author xiye
 * @date 2026-06-20
 * @since local 同步引擎 v1
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { resetPlatformBackendConfigForTests } from "@/lib/backend/config";
import { closeLocalSQLiteConnections } from "@/lib/backend/local/sqlite";
import { getProjectRepository } from "@/lib/backend/projects";
import { getProjectResourceRepository } from "@/lib/backend/project-resources";
import {
  createProjectSyncPullTask,
  createProjectSyncPushTask,
  getActiveProjectSyncTaskForUser,
  getProjectSyncTaskForUser,
  resetProjectSyncTaskManagerForTests,
} from "@/lib/sync/sync-task-manager";
import { createMockSupabase } from "./helpers/mock-supabase";

const LOCAL_ENV_KEYS = [
  "ENVELOPE_PLATFORM_BACKEND",
  "ENVELOPE_LOCAL_SQLITE_PATH",
  "ENVELOPE_LOCAL_MEDIA_ROOT",
  "ENVELOPE_LOCAL_USER_ID",
] as const;

let tempRoot = "";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

beforeEach(() => {
  tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "envelope-local-sync-task-"));
  process.env.ENVELOPE_PLATFORM_BACKEND = "local";
  process.env.ENVELOPE_LOCAL_SQLITE_PATH = path.join(tempRoot, "data", "envelope.db");
  process.env.ENVELOPE_LOCAL_MEDIA_ROOT = path.join(tempRoot, "media");
  process.env.ENVELOPE_LOCAL_USER_ID = "local-user";
  resetPlatformBackendConfigForTests();
});

afterEach(() => {
  resetProjectSyncTaskManagerForTests();
  closeLocalSQLiteConnections();
  for (const key of LOCAL_ENV_KEYS) {
    delete process.env[key];
  }
  resetPlatformBackendConfigForTests();
  if (tempRoot) {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

describe("local sync task manager", () => {
  it("runs a project sync task to completion", async () => {
    const projectRepository = getProjectRepository();
    const remoteSupabase = createMockSupabase();
    const project = await projectRepository.create({
      name: "Task Sync Demo",
      description: "task desc",
      config: {},
    });

    const { taskId } = createProjectSyncPushTask({
      projectId: project.id,
      ownerUserId: "local-user",
      supabase: remoteSupabase,
    });

    let task = getProjectSyncTaskForUser(taskId, "local-user");
    for (let i = 0; i < 50 && task?.state !== "done" && task?.state !== "error"; i += 1) {
      await sleep(20);
      task = getProjectSyncTaskForUser(taskId, "local-user");
    }

    expect(task).not.toBeNull();
    expect(task?.state).toBe("done");
    expect(task?.remoteProjectId).toMatch(/^id_/);
    expect(getProjectSyncTaskForUser(taskId, "other-user")).toBeNull();
    expect(getActiveProjectSyncTaskForUser(project.id, "local-user")).toBeNull();
  });

  it("returns active sync task for the matching project owner", async () => {
    const projectRepository = getProjectRepository();
    const project = await projectRepository.create({
      name: "Active Task Demo",
      description: "active task",
      config: {},
    });

    const { taskId } = createProjectSyncPushTask({
      projectId: project.id,
      ownerUserId: "local-user",
      accessToken: "fake-token",
    });

    const activeTask = getActiveProjectSyncTaskForUser(project.id, "local-user");
    expect(activeTask?.taskId).toBe(taskId);
    expect(activeTask?.projectId).toBe(project.id);
    expect(getActiveProjectSyncTaskForUser(project.id, "other-user")).toBeNull();
  });

  it("runs a remote pull task to completion", async () => {
    const projectRepository = getProjectRepository();
    const resourceRepository = getProjectResourceRepository();
    const remoteSupabase = createMockSupabase();
    const project = await projectRepository.create({
      name: "Pull Task Demo",
      description: "pull desc",
      config: {},
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

    const pushed = createProjectSyncPushTask({
      projectId: project.id,
      ownerUserId: "local-user",
      supabase: remoteSupabase,
    });

    let pushTask = getProjectSyncTaskForUser(pushed.taskId, "local-user");
    for (let i = 0; i < 50 && pushTask?.state !== "done" && pushTask?.state !== "error"; i += 1) {
      await sleep(20);
      pushTask = getProjectSyncTaskForUser(pushed.taskId, "local-user");
    }

    remoteSupabase.__state.project_pages[0].title = "Remote Pulled";
    remoteSupabase.__state.project_pages[0].updated_at = new Date().toISOString();

    const { taskId } = createProjectSyncPullTask({
      projectId: project.id,
      ownerUserId: "local-user",
      supabase: remoteSupabase,
      remoteProjectId: pushTask?.remoteProjectId,
    });

    let pullTask = getProjectSyncTaskForUser(taskId, "local-user");
    for (let i = 0; i < 50 && pullTask?.state !== "done" && pullTask?.state !== "error"; i += 1) {
      await sleep(20);
      pullTask = getProjectSyncTaskForUser(taskId, "local-user");
    }

    expect(pullTask?.state).toBe("done");
    expect(pullTask?.kind).toBe("project_sync_pull");
    const pages = await resourceRepository.listPages(project.id);
    expect(pages[0]?.title).toBe("Remote Pulled");
  });
});
