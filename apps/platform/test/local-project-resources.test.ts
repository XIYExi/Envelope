/**
 * 本地项目编辑器资源仓储测试。
 *
 * 验证点：
 * - `flows/endpoints/auth` 可以通过统一门面在 local SQLite 中读写；
 * - service 层能够在 local 模式下无感读取上述资源；
 * - 归档读取链路可以复用统一仓储而不再强依赖 Supabase session。
 *
 * @author xiye
 * @date 2026-06-20
 * @since 第三阶段后端门面重构
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { resetPlatformBackendConfigForTests } from "@/lib/backend/config";
import { closeLocalSQLiteConnections } from "@/lib/backend/local/sqlite";
import { getProjectRepository } from "@/lib/backend/projects";
import { getProjectResourceRepository } from "@/lib/backend/project-resources";
import { readProjectSnapshot, generateProjectArchiveZip } from "@/lib/archive/export-archive";
import { getProjectAuth } from "@/lib/services/project-auth.service";
import { getProjectEndpoints } from "@/lib/services/project-endpoints.service";
import { getProjectFlows } from "@/lib/services/project-flows.service";
import { duplicateProject } from "@/lib/services/project.service";

const originalEnv = {
  ENVELOPE_PLATFORM_BACKEND: process.env.ENVELOPE_PLATFORM_BACKEND,
  ENVELOPE_LOCAL_SQLITE_PATH: process.env.ENVELOPE_LOCAL_SQLITE_PATH,
  ENVELOPE_LOCAL_MEDIA_ROOT: process.env.ENVELOPE_LOCAL_MEDIA_ROOT,
  ENVELOPE_LOCAL_USER_ID: process.env.ENVELOPE_LOCAL_USER_ID,
};

let tempRoot: string | null = null;

function useLocalBackend() {
  tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "envelope-platform-resources-"));
  process.env.ENVELOPE_PLATFORM_BACKEND = "local";
  process.env.ENVELOPE_LOCAL_SQLITE_PATH = path.join(tempRoot, "data", "envelope.db");
  process.env.ENVELOPE_LOCAL_MEDIA_ROOT = path.join(tempRoot, "media");
  process.env.ENVELOPE_LOCAL_USER_ID = "local-user";
  resetPlatformBackendConfigForTests();
}

afterEach(() => {
  process.env.ENVELOPE_PLATFORM_BACKEND = originalEnv.ENVELOPE_PLATFORM_BACKEND;
  process.env.ENVELOPE_LOCAL_SQLITE_PATH = originalEnv.ENVELOPE_LOCAL_SQLITE_PATH;
  process.env.ENVELOPE_LOCAL_MEDIA_ROOT = originalEnv.ENVELOPE_LOCAL_MEDIA_ROOT;
  process.env.ENVELOPE_LOCAL_USER_ID = originalEnv.ENVELOPE_LOCAL_USER_ID;
  resetPlatformBackendConfigForTests();
  closeLocalSQLiteConnections();
  if (tempRoot) {
    fs.rmSync(tempRoot, { recursive: true, force: true });
    tempRoot = null;
  }
});

describe("local project resources", () => {
  it("reads flows/endpoints/auth via facade, services and archive chain", async () => {
    useLocalBackend();
    const projectRepository = getProjectRepository();
    const resourceRepository = getProjectResourceRepository();

    const project = await projectRepository.create({
      name: "Local Resource Demo",
      description: "for local resource facade",
      config: { version: "3.0.0", theme: "dark" },
    });

    await resourceRepository.upsertPages(project.id, [{
      id: "page-home",
      path: "/",
      title: "Home",
      description: "首页",
      schema: { version: "3.0.0", path: "/", title: "Home", components: [] },
      metadata: { nav: true },
      sort_order: 1,
      is_published: true,
    }]);

    await resourceRepository.upsertRoutes(project.id, [{
      id: "route-home",
      path: "/",
      page_id: "page-home",
      layout_id: null,
      auth_required: false,
      roles: [],
      middleware_config: {},
      metadata: { title: "Home" },
      parent_route_id: null,
      sort_order: 1,
    }]);

    await resourceRepository.upsertModels(project.id, [{
      id: "model-users",
      table_name: "users",
      schema: {
        name: "users",
        columns: [{ name: "id", type: "uuid", primaryKey: true }],
        indexes: [],
        rlsEnabled: true,
        rlsPolicies: [],
      },
      rls_policies: [],
    }]);

    const savedFlows = await resourceRepository.upsertFlows(project.id, [{
      id: "flow-hello",
      name: "HelloFlow",
      description: "hello flow",
      flow_type: "action",
      yaml_content: "id: flow-hello\nname: HelloFlow\n",
      trigger_event: "manual",
      is_active: true,
    }]);

    const savedEndpoints = await resourceRepository.upsertEndpoints(project.id, [{
      id: "endpoint-hello",
      method: "GET",
      path: "/hello",
      description: "hello api",
      request_schema: { type: "object" },
      response_schema: { type: "object" },
      middleware: [{ name: "auth" }],
      flow_id: savedFlows[0]!.id,
      is_active: true,
    }]);

    const savedAuth = await resourceRepository.upsertAuth(project.id, {
      id: "auth-config",
      providers: [{ name: "email", enabled: true, config: {} }],
      redirect_urls: { afterLogin: "/" },
      session_config: { duration: 7200, refreshTokenRotation: true },
    });

    expect(savedEndpoints[0]!.flow_id).toBe(savedFlows[0]!.id);
    expect(savedAuth.redirect_urls).toEqual({ afterLogin: "/" });

    await expect(getProjectFlows(project.id)).resolves.toHaveLength(1);
    await expect(getProjectEndpoints(project.id)).resolves.toHaveLength(1);
    await expect(getProjectAuth(project.id)).resolves.toMatchObject({
      project_id: project.id,
      providers: [{ name: "email", enabled: true, config: {} }],
    });

    const snapshot = await readProjectSnapshot(null, project.id);
    expect(snapshot.flows).toHaveLength(1);
    expect(snapshot.endpoints[0]!.flow_id).toBe(savedFlows[0]!.id);
    expect(snapshot.auth?.project_id).toBe(project.id);

    const archiveResult = await generateProjectArchiveZip(null, project.id, {
      selection: {
        pages: "all",
        routes: "all",
        models: "all",
        flows: "all",
        endpoints: "all",
        auth: "all",
      },
    });
    expect(archiveResult.archive.flows).toHaveLength(1);
    expect(archiveResult.archive.endpoints[0]!.flowKey).toBe("helloflow__flow-hel");
    expect(archiveResult.archive.auth?.providers).toHaveLength(1);

    const duplicated = await duplicateProject(project.id, "Local Resource Demo Copy");
    const duplicatedSnapshot = await readProjectSnapshot(null, duplicated.id);
    expect(duplicatedSnapshot.project.name).toBe("Local Resource Demo Copy");
    expect(duplicatedSnapshot.pages).toHaveLength(1);
    expect(duplicatedSnapshot.routes).toHaveLength(1);
    expect(duplicatedSnapshot.models).toHaveLength(1);
    expect(duplicatedSnapshot.flows).toHaveLength(1);
    expect(duplicatedSnapshot.endpoints).toHaveLength(1);
    expect(duplicatedSnapshot.auth?.providers).toHaveLength(1);
    expect(duplicatedSnapshot.endpoints[0]!.flow_id).toBe(duplicatedSnapshot.flows[0]!.id);
  });
});
