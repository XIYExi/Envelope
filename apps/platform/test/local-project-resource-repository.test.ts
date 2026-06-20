/**
 * 本地项目资源仓储测试。
 *
 * 目标：
 * - 校验 local 模式下 `pages/routes/models` 的统一仓储门面能力；
 * - 覆盖 SQLite JSON/布尔/数组字段的读写映射；
 * - 验证项目删除时子资源是否随外键级联一并清理。
 *
 * @author xiye
 * @date 2026-06-20
 * @since `createLocalProjectResourceRepository()`
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { closeLocalSQLiteConnections } from "@/lib/backend/local/sqlite";
import { createLocalProjectRepository } from "@/lib/backend/projects/local";
import { createLocalProjectResourceRepository } from "@/lib/backend/project-resources/local";
import type { RuntimeBackendConfig } from "@/lib/backend/config";

/**
 * 构造测试用本地后端配置。
 *
 * @param rootDir 临时测试目录
 * @returns local 模式运行配置
 * @author xiye
 * @date 2026-06-20
 */
function createLocalConfig(rootDir: string): RuntimeBackendConfig {
  return {
    mode: "local",
    storageMode: "local",
    sqlitePath: path.join(rootDir, "data", "envelope.db"),
    mediaRoot: path.join(rootDir, "media"),
    localUserId: "local-user",
  };
}

afterEach(() => {
  closeLocalSQLiteConnections();
});

describe("local project resource repository", () => {
  it("supports pages routes and models via one facade", async () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "envelope-platform-resources-"));
    const config = createLocalConfig(tempRoot);
    const projectRepo = createLocalProjectRepository(config);
    const resourceRepo = createLocalProjectResourceRepository(config);

    const project = await projectRepo.create({
      name: "Local Resource Demo",
      description: "resource test",
      config: { version: 1 },
    });

    const pages = await resourceRepo.upsertPages(project.id, [
      {
        path: "/",
        title: "Home",
        description: "首页",
        schema: { component: "Page" },
        metadata: { title: "首页 SEO" },
        sort_order: 1,
        is_published: true,
      },
      {
        path: "/dashboard",
        title: "Dashboard",
        description: "控制台",
        schema: { component: "Dashboard" },
        metadata: { title: "控制台" },
        sort_order: 2,
        is_published: false,
      },
    ]);

    expect(pages).toHaveLength(2);
    expect(pages[0]?.path).toBe("/");
    expect(pages[0]?.metadata).toEqual({ title: "首页 SEO" });
    expect(pages[0]?.is_published).toBe(true);

    const homePage = pages.find((page) => page.path === "/");
    expect(homePage?.id).toBeTruthy();

    const rootRoutes = await resourceRepo.upsertRoutes(project.id, [
      {
        path: "/",
        page_id: homePage?.id ?? null,
        layout_id: "main-layout",
        auth_required: false,
        roles: ["guest"],
        middleware_config: { cache: false },
        metadata: { title: "首页路由" },
        sort_order: 1,
      },
    ]);

    const rootRoute = rootRoutes[0];
    expect(rootRoute?.roles).toEqual(["guest"]);

    const routes = await resourceRepo.upsertRoutes(project.id, [
      {
        path: "/dashboard",
        page_id: null,
        layout_id: "dashboard-layout",
        auth_required: true,
        roles: ["admin"],
        middleware_config: { guard: "auth" },
        metadata: { title: "控制台路由" },
        parent_route_id: rootRoute?.id ?? null,
        sort_order: 2,
      },
    ]);

    expect(routes).toHaveLength(2);
    const dashboardRoute = routes.find((route) => route.path === "/dashboard");
    expect(dashboardRoute?.auth_required).toBe(true);
    expect(dashboardRoute?.parent_route_id).toBe(rootRoute?.id ?? null);

    const models = await resourceRepo.upsertModels(project.id, [
      {
        table_name: "users",
        schema: {
          tables: [
            {
              name: "users",
              columns: [{ name: "id", type: "uuid", nullable: false, isPrimary: true }],
            },
          ],
        },
        rls_policies: [{ name: "Users can read", operation: "SELECT" }],
      },
    ]);

    expect(models).toHaveLength(1);
    expect(models[0]?.table_name).toBe("users");
    expect(models[0]?.rls_policies).toEqual([{ name: "Users can read", operation: "SELECT" }]);

    await projectRepo.delete(project.id);

    expect(await resourceRepo.listPages(project.id)).toEqual([]);
    expect(await resourceRepo.listRoutes(project.id)).toEqual([]);
    expect(await resourceRepo.listModels(project.id)).toEqual([]);

    fs.rmSync(tempRoot, { recursive: true, force: true });
  });
});
