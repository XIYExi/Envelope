/**
 * 归档导入写链路的本地后端适配器。
 *
 * 职责：
 * - 在 `local` 模式下复用既有 `projects` 与 `project-resources` 门面；
 * - 为归档导入提供“创建项目 + 批量写入资源”的统一能力；
 * - 保证 archive task/API 不再直连某一类底层存储实现。
 *
 * @author xiye
 * @date 2026-06-20
 * @since 归档导入写链路门面化
 */
import { getProjectRepository } from "@/lib/backend/projects";
import { getProjectResourceRepository } from "@/lib/backend/project-resources";
import type { ArchiveImportRepository } from "./types";

/**
 * 创建 local 模式下的归档导入门面。
 *
 * @returns local 模式归档导入适配器
 * @author xiye
 * @date 2026-06-20
 */
export function createLocalArchiveImportRepository(): ArchiveImportRepository {
  const projectRepository = getProjectRepository();
  const resourceRepository = getProjectResourceRepository();

  return {
    createProject(input) {
      return projectRepository.create(input);
    },
    listPages(projectId) {
      return resourceRepository.listPages(projectId);
    },
    upsertPages(projectId, pages) {
      return resourceRepository.upsertPages(projectId, pages);
    },
    listRoutes(projectId) {
      return resourceRepository.listRoutes(projectId);
    },
    upsertRoutes(projectId, routes) {
      return resourceRepository.upsertRoutes(projectId, routes);
    },
    listFlows(projectId) {
      return resourceRepository.listFlows(projectId);
    },
    upsertFlows(projectId, flows) {
      return resourceRepository.upsertFlows(projectId, flows);
    },
    listModels(projectId) {
      return resourceRepository.listModels(projectId);
    },
    upsertModels(projectId, models) {
      return resourceRepository.upsertModels(projectId, models);
    },
    listEndpoints(projectId) {
      return resourceRepository.listEndpoints(projectId);
    },
    upsertEndpoints(projectId, endpoints) {
      return resourceRepository.upsertEndpoints(projectId, endpoints);
    },
    getAuth(projectId) {
      return resourceRepository.getAuth(projectId);
    },
    upsertAuth(projectId, auth) {
      return resourceRepository.upsertAuth(projectId, auth);
    },
  };
}
