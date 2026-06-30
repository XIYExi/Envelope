/**
 * 项目仓储门面工厂。
 *
 * 说明：
 * - 这是上层 service 进入“多后端模式”的统一入口；
 * - service 只调用 `getProjectRepository()`，不再直接关心 Supabase / SQLite；
 * - 具体适配器由 env 驱动的运行时配置决定。
 *
 * @author xiye
 * @date 2026-06-20
 * @since 第一阶段后端门面重构
 */
import { ApiError } from "@/lib/api/errors";
import { getPlatformBackendConfig } from "@/lib/backend/config";
import { createLocalProjectRepository } from "./local";
import { createSupabaseProjectRepository } from "./supabase";
import type { ProjectRepository } from "./types";

/**
 * 获取当前环境下的项目仓储实现。
 *
 * 核心链路：
 * - 先读取统一运行时配置；
 * - 再按 mode 选择具体适配器；
 * - 上层 service 永远只接触统一接口。
 *
 * @returns 当前后端模式对应的项目仓储
 * @author xiye
 * @date 2026-06-20
 */
export function getProjectRepository(): ProjectRepository {
  const config = getPlatformBackendConfig();

  if (config.mode === "supabase") {
    return createSupabaseProjectRepository();
  }

  if (config.mode === "local") {
    return createLocalProjectRepository(config);
  }

  throw new ApiError({
    status: 501,
    code: "BACKEND.CUSTOM_NOT_IMPLEMENTED",
    message: "Custom backend adapter is not implemented yet",
  });
}

export type { CreateProjectInput, ProjectRepository, UpdateProjectInput } from "./types";
