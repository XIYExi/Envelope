/**
 * 归档导入写链路门面工厂。
 *
 * 说明：
 * - 这是 archive import 业务进入多后端模式的统一入口；
 * - task / API / service 只依赖 `getArchiveImportRepository()`；
 * - 具体是 Supabase 还是 local SQLite，由统一后端配置决定。
 *
 * @author xiye
 * @date 2026-06-20
 * @since 归档导入写链路门面化
 */
import { ApiError } from "@/lib/api/errors";
import { getPlatformBackendConfig } from "@/lib/backend/config";
import { createLocalArchiveImportRepository } from "./local";
import { createSupabaseArchiveImportRepository } from "./supabase";
import type { ArchiveImportRepository, ArchiveImportRepositoryContext } from "./types";

/**
 * 获取当前环境下的归档导入写门面。
 *
 * @param context 归档导入上下文
 * @returns 当前后端模式对应的归档导入适配器
 * @author xiye
 * @date 2026-06-20
 */
export function getArchiveImportRepository(context: ArchiveImportRepositoryContext): ArchiveImportRepository {
  const config = getPlatformBackendConfig();

  if (config.mode === "supabase") {
    return createSupabaseArchiveImportRepository(context);
  }

  if (config.mode === "local") {
    return createLocalArchiveImportRepository();
  }

  throw new ApiError({
    status: 501,
    code: "BACKEND.CUSTOM_NOT_IMPLEMENTED",
    message: "Custom archive import adapter is not implemented yet",
  });
}

export type { ArchiveImportRepository, ArchiveImportRepositoryContext } from "./types";
