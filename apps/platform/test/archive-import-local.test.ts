/**
 * 本地模式归档导入测试。
 *
 * 目标：
 * - 校验 `importProjectArchive()` 已切到 archive-import 门面，而不是直连 Supabase；
 * - 覆盖 local 模式下“创建项目 + 写入资源 + 修复引用”的核心闭环；
 * - 验证 archive task/API 接入后的实际导入写路径具备本地后端兼容性。
 *
 * @author xiye
 * @date 2026-06-20
 * @since 归档导入写链路门面化
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { getProjectRepository } from "@/lib/backend/projects";
import { closeLocalSQLiteConnections } from "@/lib/backend/local/sqlite";
import { getProjectResourceRepository } from "@/lib/backend/project-resources";
import { resetPlatformBackendConfigForTests } from "@/lib/backend/config";
import { importProjectArchive } from "@/lib/archive/import-archive";
import type { ProjectArchive } from "@/lib/archive/archive-types";

const LOCAL_ENV_KEYS = [
  "ENVELOPE_PLATFORM_BACKEND",
  "ENVELOPE_LOCAL_SQLITE_PATH",
  "ENVELOPE_LOCAL_MEDIA_ROOT",
  "ENVELOPE_LOCAL_USER_ID",
] as const;

function applyLocalEnv(rootDir: string) {
  process.env.ENVELOPE_PLATFORM_BACKEND = "local";
  process.env.ENVELOPE_LOCAL_SQLITE_PATH = path.join(rootDir, "data", "envelope.db");
  process.env.ENVELOPE_LOCAL_MEDIA_ROOT = path.join(rootDir, "media");
  process.env.ENVELOPE_LOCAL_USER_ID = "local-user";
  resetPlatformBackendConfigForTests();
}

afterEach(() => {
  closeLocalSQLiteConnections();
  resetPlatformBackendConfigForTests();
  for (const key of LOCAL_ENV_KEYS) {
    delete process.env[key];
  }
});

describe("archive import local", () => {
  it("imports resources through local facade in create mode", async () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "envelope-platform-archive-local-"));
    applyLocalEnv(tempRoot);

    try {
      const archive: ProjectArchive = {
        manifest: {
          format: "envelope.platform.archive",
          formatVersion: 1,
          schemaVersion: "3.0.0",
          exportedAt: new Date().toISOString(),
          source: { app: "@envelope/platform", appVersion: "3.0.0" },
          selection: {
            project: true,
            pages: "all",
            routes: "all",
            models: "all",
            flows: "all",
            endpoints: "all",
            auth: "all",
          },
          redaction: { enabled: true, rules: [] },
        },
        project: {
          name: "Local Imported Project",
          description: "for local archive import",
          config: { version: "3.0.0" },
        },
        pages: [
          { key: "/", path: "/", title: "Home", schema: { version: "3.0.0", path: "/", title: "Home", components: [] } },
          { key: "/settings", path: "/settings", title: "Settings", schema: { version: "3.0.0", path: "/settings", title: "Settings", components: [] } },
        ],
        routes: [
          { key: "/", path: "/", parentKey: null, pageKey: "/" },
          { key: "/settings", path: "/settings", parentKey: "/", pageKey: "/settings", auth_required: true },
        ],
        flows: [{ key: "sync__flow", name: "SyncFlow", yaml_content: "id: sync\n" }],
        models: [{ key: "users", table_name: "users", schema: { columns: [{ name: "id", type: "uuid" }] }, rls_policies: [] }],
        endpoints: [{ key: "GET /sync", method: "GET", path: "/sync", flowKey: "sync__flow" }],
        auth: { providers: [{ name: "email", enabled: true, config: {} }], redirect_urls: { afterLogin: "/" }, session_config: { ttl: 3600 } },
      };

      const result = await importProjectArchive(
        archive,
        {
          mode: "create",
          conflictStrategy: "overwrite",
          danglingRefPolicy: "error",
        },
        {
          ownerUserId: "local-user",
        },
      );

      const projectRepository = getProjectRepository();
      const resourceRepository = getProjectResourceRepository();

      const project = await projectRepository.get(result.projectId);
      const pages = await resourceRepository.listPages(result.projectId);
      const routes = await resourceRepository.listRoutes(result.projectId);
      const flows = await resourceRepository.listFlows(result.projectId);
      const models = await resourceRepository.listModels(result.projectId);
      const endpoints = await resourceRepository.listEndpoints(result.projectId);
      const auth = await resourceRepository.getAuth(result.projectId);

      expect(project.name).toBe("Local Imported Project");
      expect(project.user_id).toBe("local-user");
      expect(pages).toHaveLength(2);
      expect(models).toHaveLength(1);
      expect(flows).toHaveLength(1);
      expect(endpoints).toHaveLength(1);
      expect(auth?.providers).toEqual([{ name: "email", enabled: true, config: {} }]);

      const pageByPath = new Map(pages.map((page) => [page.path, page.id]));
      const routeByPath = new Map(routes.map((route) => [route.path, route]));

      expect(routeByPath.get("/")?.page_id).toBe(pageByPath.get("/"));
      expect(routeByPath.get("/settings")?.page_id).toBe(pageByPath.get("/settings"));
      expect(routeByPath.get("/settings")?.parent_route_id).toBe(routeByPath.get("/")?.id);
      expect(endpoints[0]?.flow_id).toBe(flows[0]?.id);
    } finally {
      fs.rmSync(tempRoot, { recursive: true, force: true });
    }
  });
});
