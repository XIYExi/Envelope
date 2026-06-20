/**
 * 项目资源的本地 SQLite 适配器。
 *
 * 职责：
 * - 在 `local` 模式下，用 SQLite 模拟与 Supabase 尽量一致的项目资源读写行为；
 * - 对外返回统一的 `Project` 结构，保证上层 service 和 API 不感知底层差异；
 * - 为后续本地/云端同步引擎预留 `synced_at`、user_id 等兼容字段。
 *
 * @author xiye
 * @date 2026-06-20
 * @since `ProjectRepository`
 */
import crypto from "node:crypto";
import type { RuntimeBackendConfig } from "@/lib/backend/config";
import { getLocalSQLite } from "@/lib/backend/local/sqlite";
import { markProjectDirty } from "@/lib/backend/local/sync-state";
import { ApiError, apiErrors } from "@/lib/api/errors";
import type { Project } from "@/lib/supabase/types";
import type { CreateProjectInput, ProjectRepository, UpdateProjectInput } from "./types";

type LocalProjectRow = {
  /** 项目主键。 */
  id: string;
  /** 归属用户 ID，本地模式下由 localUserId 填充。 */
  user_id: string;
  /** 项目名称。 */
  name: string;
  /** 项目描述。 */
  description: string;
  /** 项目 schema 版本。 */
  schema_version: string;
  /** 序列化后的项目配置 JSON。 */
  config: string;
  /** 创建时间。 */
  created_at: string;
  /** 更新时间。 */
  updated_at: string;
};

/**
 * 将 SQLite 行对象映射为平台统一的 Project 对象。
 *
 * @param row SQLite 查询结果
 * @returns 平台统一 Project
 * @author xiye
 * @date 2026-06-20
 */
function mapRow(row: LocalProjectRow | undefined): Project {
  if (!row) throw apiErrors.notFound("Project not found", "PROJECT.NOT_FOUND");
  return {
    id: row.id,
    user_id: row.user_id,
    name: row.name,
    description: row.description,
    schema_version: row.schema_version,
    config: JSON.parse(row.config || "{}") as Record<string, unknown>,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

/**
 * 获取统一 ISO 时间戳。
 *
 * @author xiye
 * @date 2026-06-20
 */
function getNow() {
  return new Date().toISOString();
}

/**
 * 创建本地 SQLite 项目仓储。
 *
 * 核心链路：
 * - API / service 通过统一门面访问仓储；
 * - 仓储在本地 SQLite 中执行 CRUD；
 * - 查询结果再被映射成与 Supabase 一致的 `Project` 结构。
 *
 * @param config 本地后端运行配置
 * @returns local 模式下的项目仓储实现
 * @author xiye
 * @date 2026-06-20
 */
export function createLocalProjectRepository(config: RuntimeBackendConfig): ProjectRepository {
  if (config.mode !== "local") {
    throw new ApiError({
      status: 500,
      code: "BACKEND.INVALID_REPOSITORY",
      message: "Local project repository requires local backend config",
    });
  }

  return {
    async list() {
      const db = getLocalSQLite(config);
      const rows = db.prepare("SELECT * FROM projects ORDER BY updated_at DESC").all() as LocalProjectRow[];
      return rows.map((row) => mapRow(row));
    },

    async get(id: string) {
      const db = getLocalSQLite(config);
      const row = db.prepare("SELECT * FROM projects WHERE id = ?").get(id) as LocalProjectRow | undefined;
      return mapRow(row);
    },

    async create(input: CreateProjectInput) {
      const db = getLocalSQLite(config);
      const now = getNow();
      const id = input.id || crypto.randomUUID();
      const project: Omit<Project, "config"> & { config: string } = {
        id,
        user_id: config.localUserId,
        name: input.name,
        description: input.description ?? "",
        schema_version: input.schema_version ?? "3.0.0",
        config: JSON.stringify(input.config ?? {}),
        created_at: now,
        updated_at: now,
      };
      db.prepare(
        `INSERT INTO projects (id, user_id, name, description, schema_version, config, created_at, updated_at)
         VALUES (@id, @user_id, @name, @description, @schema_version, @config, @created_at, @updated_at)`,
      ).run(project);
      markProjectDirty(config, id, [{ resourceKind: "project", resourceKey: id }]);
      return mapRow(project);
    },

    async update(id: string, input: UpdateProjectInput) {
      const current = await this.get(id);
      const db = getLocalSQLite(config);
      const next: Omit<Project, "config"> & { config: string } = {
        ...current,
        name: input.name ?? current.name,
        description: input.description ?? current.description,
        config: JSON.stringify(input.config ?? current.config ?? {}),
        updated_at: getNow(),
      };
      db.prepare(
        `UPDATE projects
         SET name = @name, description = @description, config = @config, updated_at = @updated_at
         WHERE id = @id`,
      ).run(next);
      markProjectDirty(config, id, [{ resourceKind: "project", resourceKey: id }]);
      return mapRow(next);
    },

    async delete(id: string) {
      const db = getLocalSQLite(config);
      const result = db.prepare("DELETE FROM projects WHERE id = ?").run(id);
      if (result.changes === 0) throw apiErrors.notFound("Project not found", "PROJECT.NOT_FOUND");
    },

    async duplicate(id: string, newName: string) {
      const current = await this.get(id);
      return this.create({
        name: newName,
        description: current.description,
        config: current.config,
        schema_version: current.schema_version,
      });
    },
  };
}
