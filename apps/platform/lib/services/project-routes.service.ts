/**
 * 项目路由服务层。
 *
 * 职责：
 * - 为 API 层提供统一的项目路由读取能力；
 * - 将后端选择逻辑下沉到 `project-resources` 门面；
 * - 保持返回值继续兼容现有编辑器与归档链路。
 *
 * @author xiye
 * @date 2026-06-20
 * @since 第二阶段后端门面重构
 */
import { getProjectResourceRepository } from "@/lib/backend/project-resources";
import type { ProjectRoute } from "@/lib/supabase/types";

/**
 * 只读：获取项目路由配置。
 *
 * 核心链路：
 * - API 层调用 service；
 * - service 再调用统一项目资源仓储；
 * - 仓储最终按运行时模式切到 Supabase 或本地 SQLite。
 *
 * @param projectId 项目 ID
 * @returns 路由列表
 * @author xiye
 * @date 2026-06-20
 */
export async function getProjectRoutes(projectId: string): Promise<ProjectRoute[]> {
  return getProjectResourceRepository().listRoutes(projectId);
}

