export {
  createProjectSchema,
  projectConfigSchema,
  type CreateProjectInput,
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
  type DbSchema,
  type TableDefinition,
  type ColumnDefinition,
} from "./db-schema.schema";

export {
  authSchema,
  type AuthConfig,
} from "./auth.schema";
