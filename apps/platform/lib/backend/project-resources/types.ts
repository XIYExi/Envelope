/**
 * 项目页面、路由、数据模型资源门面的类型定义。
 *
 * 设计目标：
 * - 统一约束 `pages/routes/models` 在 service 层看到的能力集合；
 * - 让上层只面向“资源仓储接口”编程，不直接依赖 Supabase/SQLite；
 * - 为后续扩展 flows/endpoints/auth 等资源提供一致的门面模式参考。
 *
 * @author xiye
 * @date 2026-06-20
 * @since 第二阶段后端门面重构
 */
import type {
  ProjectAuth,
  ProjectAuthInsert,
  ProjectEndpoint,
  ProjectEndpointInsert,
  ProjectFlow,
  ProjectFlowInsert,
  ProjectModel,
  ProjectModelInsert,
  ProjectPage,
  ProjectPageInsert,
  ProjectRoute,
  ProjectRouteInsert,
} from "@/lib/supabase/types";

/** 页面保存入参：沿用既有表结构，但由适配器负责补齐 `project_id`。 */
export type SaveProjectPageInput = Omit<ProjectPageInsert, "project_id">;

/** 路由保存入参：沿用既有表结构，但由适配器负责补齐 `project_id`。 */
export type SaveProjectRouteInput = Omit<ProjectRouteInsert, "project_id">;

/** 数据模型保存入参：沿用既有表结构，但由适配器负责补齐 `project_id`。 */
export type SaveProjectModelInput = Omit<ProjectModelInsert, "project_id">;

/** 流程保存入参：沿用既有表结构，但由适配器负责补齐 `project_id`。 */
export type SaveProjectFlowInput = Omit<ProjectFlowInsert, "project_id">;

/** API 端点保存入参：沿用既有表结构，但由适配器负责补齐 `project_id`。 */
export type SaveProjectEndpointInput = Omit<ProjectEndpointInsert, "project_id">;

/** 鉴权配置保存入参：沿用既有表结构，但由适配器负责补齐 `project_id`。 */
export type SaveProjectAuthInput = Omit<ProjectAuthInsert, "project_id">;

/**
 * 项目页面、路由、数据模型统一仓储接口。
 *
 * @author xiye
 * @date 2026-06-20
 */
export interface ProjectResourceRepository {
  /** 查询项目页面列表。 */
  listPages(projectId: string): Promise<ProjectPage[]>;
  /** 批量保存项目页面。 */
  upsertPages(projectId: string, pages: SaveProjectPageInput[]): Promise<ProjectPage[]>;
  /** 查询项目路由列表。 */
  listRoutes(projectId: string): Promise<ProjectRoute[]>;
  /** 批量保存项目路由。 */
  upsertRoutes(projectId: string, routes: SaveProjectRouteInput[]): Promise<ProjectRoute[]>;
  /** 查询项目数据模型列表。 */
  listModels(projectId: string): Promise<ProjectModel[]>;
  /** 批量保存项目数据模型。 */
  upsertModels(projectId: string, models: SaveProjectModelInput[]): Promise<ProjectModel[]>;
  /** 查询项目流程列表。 */
  listFlows(projectId: string): Promise<ProjectFlow[]>;
  /** 批量保存项目流程。 */
  upsertFlows(projectId: string, flows: SaveProjectFlowInput[]): Promise<ProjectFlow[]>;
  /** 查询项目 API 端点列表。 */
  listEndpoints(projectId: string): Promise<ProjectEndpoint[]>;
  /** 批量保存项目 API 端点。 */
  upsertEndpoints(projectId: string, endpoints: SaveProjectEndpointInput[]): Promise<ProjectEndpoint[]>;
  /** 查询项目鉴权配置。 */
  getAuth(projectId: string): Promise<ProjectAuth | null>;
  /** 保存项目鉴权配置。 */
  upsertAuth(projectId: string, auth: SaveProjectAuthInput): Promise<ProjectAuth>;
}
