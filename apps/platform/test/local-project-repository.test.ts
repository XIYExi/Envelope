/**
 * 本地项目仓储测试。
 *
 * 目标：
 * - 校验 local 模式下的项目 CRUD 能力；
 * - 校验复制逻辑是否保持与统一 Project 结构一致；
 * - 防止 SQLite 适配器改动引发基础链路回归。
 *
 * @author xiye
 * @date 2026-06-20
 * @since `createLocalProjectRepository()`
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { closeLocalSQLiteConnections } from "@/lib/backend/local/sqlite";
import { createLocalProjectRepository } from "@/lib/backend/projects/local";
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

describe("local project repository", () => {
  it("supports create/update/list/duplicate/delete", async () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "envelope-platform-"));
    const repo = createLocalProjectRepository(createLocalConfig(tempRoot));

    const created = await repo.create({
      name: "Local Demo",
      description: "desc",
      config: { theme: "dark" },
    });

    expect(created.name).toBe("Local Demo");
    expect(created.user_id).toBe("local-user");
    expect(created.config).toEqual({ theme: "dark" });

    const updated = await repo.update(created.id, {
      name: "Local Demo 2",
      config: { theme: "light" },
    });

    expect(updated.name).toBe("Local Demo 2");
    expect(updated.config).toEqual({ theme: "light" });

    const duplicated = await repo.duplicate(created.id, "Copy");
    expect(duplicated.name).toBe("Copy");
    expect(duplicated.description).toBe("desc");

    const projects = await repo.list();
    expect(projects).toHaveLength(2);

    await repo.delete(created.id);
    await repo.delete(duplicated.id);

    expect(await repo.list()).toHaveLength(0);

    fs.rmSync(tempRoot, { recursive: true, force: true });
  });
});
