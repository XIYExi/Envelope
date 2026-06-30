/**
 * 项目资源仓储门面的类型定义。
 *
 * 说明：
 * - 这里定义的是“平台 service 层”与“后端适配器层”之间的稳定契约；
 * - 上层无需关心是 Supabase、SQLite 还是自定义数据库；
 * - 下层只要实现这些方法，即可接入统一调用链路。
 *
 * @author xiye
 * @date 2026-06-20
 * @since 第一阶段后端门面重构
 */
import type { Project, ProjectInsert } from "@/lib/supabase/types";

/** 新建项目入参：沿用 Supabase Insert 结构，但由适配器负责补齐 user_id。 */
export type CreateProjectInput = Omit<ProjectInsert, "user_id">;

/** 更新项目入参：保持与现有 API schema 一致。 */
export type UpdateProjectInput = {
  /** 项目名称。 */
  name?: string;
  /** 项目描述。 */
  description?: string;
  /** 项目 JSON 配置。 */
  config?: Record<string, unknown>;
};

/**
 * 项目仓储统一接口。
 *
 * @author xiye
 * @date 2026-06-20
 */
export interface ProjectRepository {
  /** 查询项目列表。 */
  list(): Promise<Project[]>;
  /** 按 ID 获取单个项目。 */
  get(id: string): Promise<Project>;
  /** 创建项目。 */
  create(input: CreateProjectInput): Promise<Project>;
  /** 更新项目。 */
  update(id: string, input: UpdateProjectInput): Promise<Project>;
  /** 删除项目。 */
  delete(id: string): Promise<void>;
  /** 复制项目。 */
  duplicate(id: string, newName: string): Promise<Project>;
}
