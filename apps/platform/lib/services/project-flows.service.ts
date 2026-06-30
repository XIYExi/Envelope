/**
 * 项目流程服务层。
 *
 * 职责：
 * - 为 API 层提供统一的流程读取与保存能力；
 * - 将后端选择逻辑下沉到 `project-resources` 门面；
 * - 保持流程列表返回值与既有调用方兼容。
 *
 * @author xiye
 * @date 2026-06-20
 * @since 第三阶段后端门面重构
 */
import { getProjectResourceRepository } from "@/lib/backend/project-resources";
import type { ProjectFlow, ProjectFlowInsert } from "@/lib/supabase/types";

/**
 * 获取项目流程列表。
 *
 * @param projectId 项目 ID
 * @returns 流程列表
 * @author xiye
 * @date 2026-06-20
 */
export async function getProjectFlows(projectId: string): Promise<ProjectFlow[]> {
  return getProjectResourceRepository().listFlows(projectId);
}

/**
 * 批量保存项目流程。
 *
 * @param projectId 项目 ID
 * @param flows 流程列表
 * @returns 保存后的流程列表
 * @author xiye
 * @date 2026-06-20
 */
export async function upsertProjectFlows(projectId: string, flows: Omit<ProjectFlowInsert, "project_id">[]): Promise<ProjectFlow[]> {
  return getProjectResourceRepository().upsertFlows(projectId, flows);
}

