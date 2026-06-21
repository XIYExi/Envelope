/**
 * 生成器模块统一导出
 *
 * 导出所有代码生成器：项目脚手架、路由文件、认证、数据模型、页面代码。
 *
 * @author xiye
 * @date 2026-06-14
 */

export { generateMigration, generateTypes } from "./data-model-generator";
export { generateRouteFiles } from "./route-generator";
export { generateAuthFiles } from "./auth-generator";
export { generateProjectFiles } from "./project-generator";
export { COMPONENT_MAP, SHADCN_IMPORT_MAP, generateComponentJSX } from "./component-map";
export { generatePageCode } from "./page-generator";
export { generateFlowRuntimeFiles } from "./flow-runtime-generator";
export type { ProjectEndpoint, ProjectFlow, GenerateFlowRuntimeOptions } from "./flow-runtime-types";
