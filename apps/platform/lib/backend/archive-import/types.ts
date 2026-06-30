/**
 * 归档导入写链路门面的类型定义。
 *
 * 设计目标：
 * - 将“创建项目 + 写入 pages/routes/models/flows/endpoints/auth”收敛为统一接口；
 * - 让 `archive/import` 业务只依赖门面，不再直接感知 Supabase / local SQLite；
 * - 为 archive task、API 与未来批量导入场景复用同一套后端写入契约。
 *
 * @author xiye
 * @date 2026-06-20
 * @since 归档导入写链路门面化
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import type {
  Project,
  ProjectAuth,
  ProjectEndpoint,
  ProjectFlow,
  ProjectModel,
  ProjectPage,
  ProjectRoute,
} from "@/lib/supabase/types";
import type { CreateProjectInput } from "@/lib/backend/projects";
import type {
  SaveProjectAuthInput,
  SaveProjectEndpointInput,
  SaveProjectFlowInput,
  SaveProjectModelInput,
  SaveProjectPageInput,
  SaveProjectRouteInput,
} from "@/lib/backend/project-resources";

/**
 * 归档导入运行上下文。
 *
 * @author xiye
 * @date 2026-06-20
 */
export type ArchiveImportRepositoryContext = {
  /** 当前导入任务的归属用户 ID。 */
  ownerUserId: string;
  /** Supabase 模式下可选注入的访问客户端。 */
  supabase?: SupabaseClient<Database>;
};

/**
 * 归档导入写门面。
 *
 * @author xiye
 * @date 2026-06-20
 */
export interface ArchiveImportRepository {
  /** 创建导入目标项目。 */
  createProject(input: CreateProjectInput): Promise<Project>;
  /** 查询项目页面。 */
  listPages(projectId: string): Promise<ProjectPage[]>;
  /** 批量保存页面。 */
  upsertPages(projectId: string, pages: SaveProjectPageInput[]): Promise<ProjectPage[]>;
  /** 查询项目路由。 */
  listRoutes(projectId: string): Promise<ProjectRoute[]>;
  /** 批量保存路由。 */
  upsertRoutes(projectId: string, routes: SaveProjectRouteInput[]): Promise<ProjectRoute[]>;
  /** 查询项目流程。 */
  listFlows(projectId: string): Promise<ProjectFlow[]>;
  /** 批量保存流程。 */
  upsertFlows(projectId: string, flows: SaveProjectFlowInput[]): Promise<ProjectFlow[]>;
  /** 查询项目数据模型。 */
  listModels(projectId: string): Promise<ProjectModel[]>;
  /** 批量保存数据模型。 */
  upsertModels(projectId: string, models: SaveProjectModelInput[]): Promise<ProjectModel[]>;
  /** 查询项目 API。 */
  listEndpoints(projectId: string): Promise<ProjectEndpoint[]>;
  /** 批量保存项目 API。 */
  upsertEndpoints(projectId: string, endpoints: SaveProjectEndpointInput[]): Promise<ProjectEndpoint[]>;
  /** 查询项目鉴权配置。 */
  getAuth(projectId: string): Promise<ProjectAuth | null>;
  /** 保存项目鉴权配置。 */
  upsertAuth(projectId: string, auth: SaveProjectAuthInput): Promise<ProjectAuth>;
}
