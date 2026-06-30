/**
 * 项目 API 端点服务层。
 *
 * 职责：
 * - 为 API 层提供统一的端点读取与保存能力；
 * - 将后端选择逻辑下沉到 `project-resources` 门面；
 * - 保持返回结构继续兼容编辑器与归档链路。
 *
 * @author xiye
 * @date 2026-06-20
 * @since 第三阶段后端门面重构
 */
import { getProjectResourceRepository } from "@/lib/backend/project-resources";
import type { ProjectEndpoint, ProjectEndpointInsert } from "@/lib/supabase/types";

/**
 * 获取项目 API 端点列表。
 *
 * @param projectId 项目 ID
 * @returns API 端点列表
 * @author xiye
 * @date 2026-06-20
 */
export async function getProjectEndpoints(projectId: string): Promise<ProjectEndpoint[]> {
  return getProjectResourceRepository().listEndpoints(projectId);
}

/**
 * 批量保存项目 API 端点。
 *
 * @param projectId 项目 ID
 * @param endpoints 端点列表
 * @returns 保存后的端点列表
 * @author xiye
 * @date 2026-06-20
 */
export async function upsertProjectEndpoints(projectId: string, endpoints: Omit<ProjectEndpointInsert, "project_id">[]): Promise<ProjectEndpoint[]> {
  return getProjectResourceRepository().upsertEndpoints(projectId, endpoints);
}
