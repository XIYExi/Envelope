/**
 * 项目代码生成编排器 — 将所有生成器组装成完整的 Next.js 项目导出
 *
 * 输入：完整的 Envelope 项目配置（项目设置、路由、页面、数据库、认证、流程）
 * 输出：可直接部署的 Next.js 项目文件集合
 *
 * ISC 覆盖:
 * - ISC-82: 生成完整的 Next.js 项目目录结构
 * - ISC-83: App Router 目录规范
 * - ISC-84: Supabase 客户端配置
 * - ISC-85: shadcn/ui + Tailwind CSS 组件
 * - ISC-86: TanStack Query 集成
 * - ISC-87: Zustand 客户端状态
 * - ISC-88: 属性编辑器注释注入
 * - ISC-89: 默认注释说明各文件用途
 * - ISC-90: 生成代码通过 tsc 类型检查
 * - ISC-91: 生成代码通过 ESLint
 * - ISC-92: 可运行 npm install && npm run dev
 * - ISC-95: 零 @envelope/* 导入
 * - ISC-96: 包含 README.md
 * - ISC-97: 导出进度指示
 * - Anti-ISC-97: 不含硬编码密钥
 *
 * @author xiye
 * @date 2026-06-14
 */

import type { ProjectConfig } from "@envelope/engine";
import type { RoutesConfig } from "@envelope/engine";
import type { PageSchema } from "@envelope/engine";
import type { ComponentNode } from "@envelope/engine";
import type { DbSchema } from "@envelope/engine";
import type { AuthConfig } from "@envelope/engine";
import { VirtualFS } from "./core/file-system";
import type { VirtualFile } from "./core/file-system.types";
import type {
  GenerateProjectInput,
  ProgressCallback,
  ProjectExport,
} from "./generate.types";
import {
  generateProjectFiles,
  generateRouteFiles,
  generateAuthFiles,
  generateMigration,
  generateTypes,
  generatePageCode,
  generateFlowRuntimeFiles,
} from "./generators";

/**
 * 生成完整的 Next.js 项目
 *
 * 按顺序调用所有子生成器，将所有输出文件收集到 VirtualFS 中。
 * 这是代码导出的主入口函数，对应 ISC-82 ~ ISC-97。
 *
 * @param config - 完整的项目配置对象
 * @param onProgress - 进度回调，接收阶段名和百分比
 * @returns 项目导出结果，包含所有生成的文件
 */
export async function generateProject(
  config: GenerateProjectInput,
  onProgress?: ProgressCallback,
): Promise<ProjectExport> {
  const fs = new VirtualFS();

  const report = (stage: string, percent: number) => {
    onProgress?.(stage, percent);
  };

  // ═══════════════════════════════════════════════════════════════
  // 第 1 步：项目基础脚手架 (0-25%)
  // ═══════════════════════════════════════════════════════════════
  report("生成项目基础文件...", 0);

  const projectFiles = generateProjectFiles(config.project);

  for (const file of projectFiles) {
    fs.addFile(file.path, file.content);
  }

  report("项目基础文件生成完成", 25);

  // ═══════════════════════════════════════════════════════════════
  // 第 2 步：认证文件 (25-40%)
  // ═══════════════════════════════════════════════════════════════
  report("生成认证与中间件...", 25);

  if (config.auth) {
    const authFiles = generateAuthFiles(config.auth);

    for (const file of authFiles) {
      fs.addFile(file.path, file.content);
    }
  }

  report("认证文件生成完成", 40);

  // ═══════════════════════════════════════════════════════════════
  // 第 3 步：数据库迁移与类型 (40-55%)
  // ═══════════════════════════════════════════════════════════════
  report("生成数据库迁移与类型...", 40);

  if (config.dbSchema) {
    const sql = generateMigration(config.dbSchema);
    fs.addFile("supabase/migrations/001_initial_schema.sql", sql);

    const types = generateTypes(config.dbSchema);
    fs.addFile("types/database.ts", types);
  }

  report("数据库文件生成完成", 55);

  // ═══════════════════════════════════════════════════════════════
  // 第 4 步：路由结构 (55-70%)
  // ═══════════════════════════════════════════════════════════════
  report("生成路由结构...", 55);

  if (config.routes) {
    const pageRefs = (config.pages ?? []).map((p) => ({
      path: p.path,
      title: p.title ?? "",
    }));

    const routeFiles = generateRouteFiles(config.routes, pageRefs);

    for (const file of routeFiles) {
      fs.addFile(file.path, file.content);
    }
  }

  report("路由结构生成完成", 70);

  // ═══════════════════════════════════════════════════════════════
  // 第 5 步：页面组件 (70-90%)
  // ═══════════════════════════════════════════════════════════════
  report("生成页面组件...", 70);

  if (config.pages) {
    let pageIndex = 0;
    const totalPages = config.pages.length;

    for (const page of config.pages) {
      const pageCode = generatePageCode(page);
      const normalizedPath = page.path
        ? page.path.replace(/^\/+|\/+$/g, "").replace(/\/+/g, "/")
        : "";
      const filePath = normalizedPath
        ? `app/${normalizedPath}/page.tsx`
        : `app/page.tsx`;

      fs.addFile(filePath, pageCode);
      pageIndex += 1;
      report(`生成页面组件 (${pageIndex}/${totalPages})`, 70 + (pageIndex / totalPages) * 20);
    }
  }

  report("页面组件生成完成", 90);

  // ═══════════════════════════════════════════════════════════════
  // 第 6 步：流程运行时与 API 端点 (90-95%)
  // ═══════════════════════════════════════════════════════════════
  report("生成流程运行时与 API 端点...", 90);

  const needsFlowRuntime = Boolean(
    (config.flows && config.flows.length > 0) ||
    (config.endpoints && config.endpoints.some((e) => e.flow_id)) ||
    hasAnyEventBindings(config.pages ?? []),
  );

  if (needsFlowRuntime) {
    const flowFiles = generateFlowRuntimeFiles({
      flows: config.flows,
      endpoints: config.endpoints,
    });
    for (const file of flowFiles) {
      fs.addFile(file.path, file.content);
    }
  }

  report("流程运行时与 API 端点生成完成", 95);

  // ═══════════════════════════════════════════════════════════════
  // 第 7 步：最终检查与封装 (95-100%)
  // ═══════════════════════════════════════════════════════════════
  report("最终检查与封装...", 95);

  // 添加 .eslintrc.json（如果项目中不存在）
  const hasEslint = projectFiles.some((f) => f.path === ".eslintrc.json");
  if (!hasEslint) {
    fs.addFile(
      ".eslintrc.json",
      JSON.stringify(
        {
          extends: "next/core-web-vitals",
        },
        null,
        2,
      ),
    );
  }

  const allFiles = fs.getAllFiles();
  const totalSize = allFiles.reduce((sum, f) => sum + Buffer.byteLength(f.content, "utf-8"), 0);

  const envelopeImportFiles = allFiles
    .filter((f) => /\b(from\s+["']@envelope\/|require\(\s*["']@envelope\/)/.test(f.content))
    .map((f) => f.path);
  if (envelopeImportFiles.length) {
    throw new Error(
      `Generated project contains forbidden @envelope/* imports: ${envelopeImportFiles.join(", ")}`,
    );
  }

  report("导出完成", 100);

  return {
    files: allFiles,
    projectName: config.projectName ?? "envelope-export",
    fileCount: allFiles.length,
    totalSize,
  };
}

function hasAnyEventBindings(pages: PageSchema[]): boolean {
  const walk = (components: ComponentNode[]): boolean => {
    for (const comp of components) {
      if (comp.eventBindings && Object.keys(comp.eventBindings).length > 0) return true;
      if (comp.children && comp.children.length > 0) {
        if (walk(comp.children)) return true;
      }
    }
    return false;
  };

  for (const page of pages) {
    if (walk(page.components ?? [])) return true;
  }
  return false;
}
