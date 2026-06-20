/**
 * 项目页面服务层。
 *
 * 职责：
 * - 对 API 层暴露统一的页面读取与保存能力；
 * - 将后端选择逻辑下沉到 `project-resources` 门面；
 * - 保持页面领域的输入输出结构与既有 API 契约一致。
 *
 * @author xiye
 * @date 2026-06-20
 * @since 第二阶段后端门面重构
 */
import { getProjectResourceRepository } from "@/lib/backend/project-resources";
import type { ProjectPage, ProjectPageInsert } from "@/lib/supabase/types";

/**
 * 获取项目页面列表。
 *
 * 核心链路：
 * - service 只面向统一资源仓储；
 * - 仓储再根据运行时配置切换 Supabase 或 SQLite；
 * - 返回值保持为平台统一的 `ProjectPage[]`。
 *
 * @param projectId 项目 ID
 * @returns 页面列表
 * @author xiye
 * @date 2026-06-20
 */
export async function getProjectPages(projectId: string): Promise<ProjectPage[]> {
  return getProjectResourceRepository().listPages(projectId);
}

/**
 * 批量保存项目页面。
 *
 * @param projectId 项目 ID
 * @param pages 页面列表
 * @returns 保存后的页面列表
 * @author xiye
 * @date 2026-06-20
 * @since `getProjectResourceRepository()`
 */
export async function upsertProjectPages(projectId: string, pages: Omit<ProjectPageInsert, "project_id">[]): Promise<ProjectPage[]> {
  return getProjectResourceRepository().upsertPages(projectId, pages);
}

