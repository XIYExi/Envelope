/**
 * Schema 模块统一导出
 *
 * 导出所有 Schema 定义和类型，供其他模块使用：
 * - project: 项目元数据和配置
 * - routes: 路由树配置
 * - page: 页面结构和组件树
 * - db-schema: 数据库表、列、索引、RLS 策略
 * - auth: 认证提供商和会话配置
 *
 * @author xiye
 * @date 2026/6/13
 */

// 项目 Schema
export {
  createProjectSchema,
  updateProjectSchema,
  projectConfigSchema,
  type CreateProjectInput,
  type UpdateProjectInput,
  type ProjectConfig,
} from "./project.schema";

// 路由 Schema
export {
  routesSchema,
  type RoutesConfig,
  type RouteNode,
} from "./routes.schema";

// 页面 Schema
export {
  pageSchema,
  type PageSchema,
  type ComponentNode,
} from "./page.schema";

// 数据库 Schema
export {
  dbSchemaSchema,
  tableSchema,
  columnSchema,
  indexSchema,
  rlsPolicySchema,
  type DbSchema,
  type TableDefinition,
  type ColumnDefinition,
  type IndexDefinition,
  type RlsPolicyDefinition,
} from "./db-schema.schema";

// 认证 Schema
export {
  authSchema,
  type AuthConfig,
} from "./auth.schema";
