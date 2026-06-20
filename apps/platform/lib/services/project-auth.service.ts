/**
 * 项目鉴权配置服务层。
 *
 * 职责：
 * - 为 API、导出与归档链路提供统一的鉴权配置读取入口；
 * - 将后端选择逻辑下沉到 `project-resources` 门面；
 * - 保持单条配置资源返回结构与既有调用方兼容。
 *
 * @author xiye
 * @date 2026-06-20
 * @since 第三阶段后端门面重构
 */
import { getProjectResourceRepository } from "@/lib/backend/project-resources";
import type { ProjectAuth } from "@/lib/supabase/types";

/**
 * 只读：获取项目鉴权配置（可能为空）
 *
 * 说明：
 * - 当前用于“配置归档导出（部分选择）”的资源列表展示
 * - 鉴权配置通常是单条记录，因此返回 maybeSingle
 */
export async function getProjectAuth(projectId: string): Promise<ProjectAuth | null> {
  return getProjectResourceRepository().getAuth(projectId);
}

