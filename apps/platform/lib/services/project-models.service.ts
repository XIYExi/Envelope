/**
 * 项目数据模型服务层。
 *
 * 职责：
 * - 为 API 层提供统一的数据模型读取能力；
 * - 将后端选择逻辑收敛到 `project-resources` 门面；
 * - 保持数据模型列表的返回结构与既有调用方兼容。
 *
 * @author xiye
 * @date 2026-06-20
 * @since 第二阶段后端门面重构
 */
import { getProjectResourceRepository } from "@/lib/backend/project-resources";
import type { ProjectModel } from "@/lib/supabase/types";

/**
 * 只读：获取项目数据模型配置。
 *
 * 核心链路：
 * - API 层调用 service；
 * - service 通过统一资源仓储访问底层后端；
 * - 仓储按运行时模式选择 Supabase 或本地 SQLite。
 *
 * @param projectId 项目 ID
 * @returns 数据模型列表
 * @author xiye
 * @date 2026-06-20
 */
export async function getProjectModels(projectId: string): Promise<ProjectModel[]> {
  return getProjectResourceRepository().listModels(projectId);
}

