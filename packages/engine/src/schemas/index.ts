export {
  createProjectSchema,
  updateProjectSchema,
  projectConfigSchema,
  type CreateProjectInput,
  type UpdateProjectInput,
  type ProjectConfig,
} from "./project.schema";

export {
  routesSchema,
  type RoutesConfig,
  type RouteNode,
} from "./routes.schema";

export {
  pageSchema,
  type PageSchema,
  type ComponentNode,
} from "./page.schema";

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

export {
  authSchema,
  type AuthConfig,
} from "./auth.schema";
