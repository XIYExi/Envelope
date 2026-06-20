/**
 * 项目编辑器资源统一仓储门面工厂。
 *
 * 说明：
 * - 这是 `pages/routes/models/flows/endpoints/auth` 六类资源进入多后端模式的统一入口；
 * - service 层只调用 `getProjectResourceRepository()`，不再直接感知底层实现；
 * - 具体适配器由统一运行时后端配置驱动选择。
 *
 * @author xiye
 * @date 2026-06-20
 * @since 第二阶段后端门面重构
 */
import { ApiError } from "@/lib/api/errors";
import { getPlatformBackendConfig } from "@/lib/backend/config";
import { createLocalProjectResourceRepository } from "./local";
import { createSupabaseProjectResourceRepository } from "./supabase";
import type { ProjectResourceRepository } from "./types";

/**
 * 获取当前环境下的项目资源仓储实现。
 *
 * 核心链路：
 * - 先读取统一运行时配置；
 * - 再按 `mode` 选择 Supabase 或本地 SQLite 适配器；
 * - 上层始终只依赖统一的项目编辑器资源接口。
 *
 * @returns 当前后端模式对应的项目资源仓储
 * @author xiye
 * @date 2026-06-20
 */
export function getProjectResourceRepository(): ProjectResourceRepository {
  const config = getPlatformBackendConfig();

  if (config.mode === "supabase") {
    return createSupabaseProjectResourceRepository();
  }

  if (config.mode === "local") {
    return createLocalProjectResourceRepository(config);
  }

  throw new ApiError({
    status: 501,
    code: "BACKEND.CUSTOM_NOT_IMPLEMENTED",
    message: "Custom backend adapter is not implemented yet",
  });
}

export type {
  SaveProjectAuthInput,
  SaveProjectEndpointInput,
  SaveProjectFlowInput,
  ProjectResourceRepository,
  SaveProjectModelInput,
  SaveProjectPageInput,
  SaveProjectRouteInput,
} from "./types";
