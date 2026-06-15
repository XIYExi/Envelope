/**
 * @envelope/generator — 代码生成器
 *
 * 负责：
 *   - JSON 项目 Schema → Next.js 源代码
 *   - 模板化文件生成（页面、组件、API 路由、配置）
 *   - 导出打包（ZIP 下载、目录输出）
 *   - 生成代码格式化（Prettier）
 *   - 属性编辑器注释注入
 *
 * @author xiye
 * @date 2026-06-14
 */
export const PACKAGE_NAME = "@envelope/generator";
export const VERSION = "3.0.0";

// ═══════════════════════════════════════════════════════════════
// 核心
// ═══════════════════════════════════════════════════════════════

export { VirtualFS, type VirtualFile } from "./core/file-system";

// ═══════════════════════════════════════════════════════════════
// 编排器
// ═══════════════════════════════════════════════════════════════

export {
  generateProject,
  type ProjectExport,
  type ProgressCallback,
  type GenerateProjectInput,
} from "./generate";

// ═══════════════════════════════════════════════════════════════
// 子生成器
// ═══════════════════════════════════════════════════════════════

export {
  generateMigration,
  generateTypes,
  generateRouteFiles,
  generateAuthFiles,
  generateProjectFiles,
  COMPONENT_MAP,
  generateComponentJSX,
  generatePageCode,
} from "./generators";
