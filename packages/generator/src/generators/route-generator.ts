/**
 * 路由生成器
 *
 * 将 RoutesConfig（路由树）转换为 Next.js App Router 文件结构：
 * - app/{path}/page.tsx — 页面组件
 * - app/{path}/layout.tsx — 布局组件
 * - app/{path}/loading.tsx — 加载状态
 * - app/{path}/error.tsx — 错误边界
 * - app/api/{path}/route.ts — API 路由
 *
 * @author xiye
 * @date 2026-06-14
 */
import type { RoutesConfig, RouteNode } from "@envelope/engine";
import type { VirtualFile } from "../core/file-system.types";
import { jsxText, tsStringLiteral } from "../core/tsx-escape";

/** 页面元数据（用于匹配路由到页面） */
interface PageInfo {
  id?: string;
  path: string;
  title: string;
}

/**
 * 将路由路径中的动态段格式化为 Next.js 目录名
 *
 * 例如："/posts/[id]" → "posts/[id]"
 *       "/docs/[...slug]" → "docs/[...slug]"
 */
function normalizeRoutePath(routePath: string): string {
  return routePath.replace(/^\//, "").replace(/\/$/, "") || "";
}

/**
 * 构建路由的完整路径（从根到当前节点）
 */
function buildFullPath(ancestors: RouteNode[], current: RouteNode): string {
  const segments = [...ancestors, current]
    .map(n => normalizeRoutePath(n.path))
    .filter(Boolean);
  return segments.join("/");
}

/**
 * 判断路由是否为 API 路由
 * API 路由路径以 /api/ 开头
 */
function isApiRoute(fullPath: string): boolean {
  return fullPath.startsWith("api/");
}

/**
 * 生成页面组件内容
 */
function generatePageContent(
  route: RouteNode,
  _fullPath: string,
  pageInfo?: PageInfo,
): string {
  const meta = route.metadata;
  const title = pageInfo?.title ?? meta?.title ?? route.id;
  const description = meta?.description ?? "";
  const ogImage = meta?.ogImage;

  const metadataLines: string[] = [];
  if (title || description || ogImage) {
    metadataLines.push("");
    metadataLines.push("export const metadata: Metadata = {");
    if (title) {
      metadataLines.push(`  title: ${tsStringLiteral(title)},`);
    }
    if (description) {
      metadataLines.push(`  description: ${tsStringLiteral(description)},`);
    }
    if (ogImage) {
      metadataLines.push(`  openGraph: {`);
      metadataLines.push(`    images: [${tsStringLiteral(ogImage)}],`);
      metadataLines.push(`  },`);
    }
    metadataLines.push("};");
  }

  return [
    `import type { Metadata } from "next";`,
    metadataLines.join("\n"),
    "",
    `export default function Page() {`,
    `  return (`,
    `    <main className="container mx-auto p-4">`,
    `      <h1 className="text-2xl font-bold">${jsxText(title)}</h1>`,
    description ? `      <p className="text-muted-foreground mt-2">${jsxText(description)}</p>` : "",
    `    </main>`,
    `  );`,
    `}`,
    ""
  ].filter(Boolean).join("\n");
}

/**
 * 生成布局组件内容
 */
function generateLayoutContent(route: RouteNode): string {
  const meta = route.metadata;
  const metaTitle = meta?.title;
  const metaDesc = meta?.description;

  const metadataLines: string[] = [];
  if (metaTitle) {
    metadataLines.push(`export const metadata: Metadata = {`);
    metadataLines.push(`  title: ${tsStringLiteral(metaTitle)},`);
    if (metaDesc) {
      metadataLines.push(`  description: ${tsStringLiteral(metaDesc)},`);
    }
    metadataLines.push(`};`);
    metadataLines.push(``);
  }

  return [
    `import type { Metadata } from "next";`,
    `import type { ReactNode } from "react";`,
    ``,
    ...metadataLines,
    `export default function Layout({ children }: { children: ReactNode }) {`,
    `  return (`,
    `    <div className="min-h-screen">`,
    `      {children}`,
    `    </div>`,
    `  );`,
    `}`,
    ""
  ].filter(Boolean).join("\n");
}

/**
 * 生成 loading.tsx 内容
 */
function generateLoadingContent(): string {
  return [
    `export default function Loading() {`,
    `  return (`,
    `    <div className="flex items-center justify-center min-h-screen">`,
    `      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />`,
    `    </div>`,
    `  );`,
    `}`,
    ""
  ].join("\n");
}

/**
 * 生成 error.tsx 内容
 */
function generateErrorContent(): string {
  return [
    `"use client";`,
    ``,
    `export default function Error({`,
    `  error,`,
    `  reset,`,
    `}: {`,
    `  error: Error & { digest?: string };`,
    `  reset: () => void;`,
    `}) {`,
    `  return (`,
    `    <div className="flex flex-col items-center justify-center min-h-screen gap-4">`,
    `      <h2 className="text-2xl font-bold">Something went wrong!</h2>`,
    `      <p className="text-muted-foreground">{error.message}</p>`,
    `      <button`,
    `        onClick={reset}`,
    `        className="px-4 py-2 bg-primary text-primary-foreground rounded-md"`,
    `      >`,
    `        Try again`,
    `      </button>`,
    `    </div>`,
    `  );`,
    `}`,
    ""
  ].join("\n");
}

/**
 * 生成 API 路由内容
 */
function generateApiRouteContent(route: RouteNode): string {
  return [
    `import { NextResponse } from "next/server";`,
    ``,
    `export async function GET() {`,
    `  return NextResponse.json({ message: "OK" });`,
    `}`,
    ``,
    `export async function POST(request: Request) {`,
    `  try {`,
    `    const body = await request.json();`,
    `    return NextResponse.json({ data: body });`,
    `  } catch {`,
    `    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });`,
    `  }`,
    `}`,
    ""
  ].join("\n");
}

/**
 * 递归遍历路由树，生成所有页面文件
 *
 * @param nodes - 当前层级的路由节点
 * @param ancestors - 祖先节点链（用于构建完整路径）
 * @param pages - 页面信息映射（按路径索引）
 * @param defaultLayout - 默认布局 ID
 * @returns 生成的虚拟文件数组
 */
function walkRouteTree(
  nodes: RouteNode[],
  ancestors: RouteNode[],
  pages: Map<string, PageInfo>,
  _defaultLayout?: string,
): VirtualFile[] {
  const files: VirtualFile[] = [];

  for (const node of nodes) {
    const fullPath = buildFullPath(ancestors, node);
    const dirPath = `app/${fullPath}`;

    // 如果关联了页面 ID，生成 page.tsx
    if (node.pageId) {
      const pageInfo = node.pageId ? (pages.get(node.pageId) ?? findPageByPath(fullPath, pages)) : undefined;
      files.push({
        path: `${dirPath}/page.tsx`,
        content: generatePageContent(node, fullPath, pageInfo),
      });
    }
    // 如果路径没有关联页面但也没有子路由，且是叶节点
    // 根据页面列表匹配路径
    else if (!node.children || node.children.length === 0) {
      // 尝试按路径匹配页面
      const matchedPage = findPageByPath(fullPath, pages);
      if (matchedPage) {
        files.push({
          path: `${dirPath}/page.tsx`,
          content: generatePageContent(node, fullPath, matchedPage),
        });
      }
    }

    // API 路由
    if (isApiRoute(fullPath)) {
      files.push({
        path: `${dirPath}/route.ts`,
        content: generateApiRouteContent(node),
      });
    }
    // 非 API 路由的其他文件（仅当不是 API 路由时）
    else {
      // layout.tsx
      if (node.layoutId) {
        files.push({
          path: `${dirPath}/layout.tsx`,
          content: generateLayoutContent(node),
        });
      }

      // loading.tsx — 所有非 API 页面路由都有
      if (node.pageId || (node.children && node.children.length > 0)) {
        files.push({
          path: `${dirPath}/loading.tsx`,
          content: generateLoadingContent(),
        });
      }

      // error.tsx — 所有非 API 页面路由都有
      if (node.pageId) {
        files.push({
          path: `${dirPath}/error.tsx`,
          content: generateErrorContent(),
        });
      }
    }

    // 递归处理子路由
    if (node.children && node.children.length > 0) {
      const childFiles = walkRouteTree(
        node.children,
        [...ancestors, node],
        pages,
        _defaultLayout,
      );
      files.push(...childFiles);
    }
  }

  return files;
}

/**
 * 按路径在页面列表中查找匹配的页面
 */
function findPageByPath(fullPath: string, pages: Map<string, PageInfo>): PageInfo | undefined {
  // 直接匹配
  const direct = pages.get(fullPath);
  if (direct) return direct;

  // 带前导斜杠匹配
  const withSlash = pages.get("/" + fullPath);
  if (withSlash) return withSlash;

  return undefined;
}

/**
 * 生成路由文件
 *
 * 将 RoutesConfig 和页面列表转换为 Next.js App Router 文件结构。
 * 递归遍历路由树，为每个路由节点生成对应的文件。
 *
 * 支持：
 * - 静态路径：/dashboard → app/dashboard/page.tsx
 * - 动态参数：/posts/[id] → app/posts/[id]/page.tsx
 * - 通配路由：/docs/[...slug] → app/docs/[...slug]/page.tsx
 * - 布局组件
 * - API 路由
 * - Loading / Error 边界
 *
 * @param routes - 路由配置
 * @param pages - 页面信息列表（标题、路径）
 * @returns 生成的文件数组
 */
export function generateRouteFiles(
  routes: RoutesConfig,
  pages: { id?: string; path: string; title: string }[],
): VirtualFile[] {
  // 构建页面映射（按路径 + pageId 索引）
  const pageMap = new Map<string, PageInfo>();
  for (const page of pages) {
    const normalized = page.path.replace(/^\//, "").replace(/\/$/, "") || "";
    const pageInfo: PageInfo = { id: page.id, path: page.path, title: page.title };
    pageMap.set(normalized, pageInfo);
    // 也按带斜杠的路径索引
    pageMap.set("/" + normalized, pageInfo);
    // 如果有 id，也按 id 索引（供 pageId 查找）
    if (page.id) {
      pageMap.set(page.id, pageInfo);
    }
  }

  const routeNodes = routes.routes ?? [];

  // 如果路由树为空，生成一个首页
  if (routeNodes.length === 0) {
    const rootPage = pages.find(p => p.path === "/" || p.path === "");
    return [
      {
        path: "app/page.tsx",
        content: generatePageContent(
          {
            id: "root",
            path: "/",
          },
          "",
          rootPage,
        ),
      },
      {
        path: "app/loading.tsx",
        content: generateLoadingContent(),
      },
      {
        path: "app/error.tsx",
        content: generateErrorContent(),
      },
    ];
  }

  // 生成根布局（如果有默认布局）
  const files: VirtualFile[] = [];

  if (routes.defaultLayout) {
    files.push({
      path: "app/layout.tsx",
      content: [
        `import type { Metadata } from "next";`,
        `import type { ReactNode } from "react";`,
        `import "./globals.css";`,
        ``,
        `export const metadata: Metadata = {`,
        `  title: {`,
        `    template: "%s | App",`,
        `    default: "App",`,
        `  },`,
        `};`,
        ``,
        `export default function RootLayout({ children }: { children: ReactNode }) {`,
        `  return (`,
        `    <html lang="en">`,
        `      <body>{children}</body>`,
        `    </html>`,
        `  );`,
        `}`,
        ``
      ].join("\n"),
    });
  }

  const routeFiles = walkRouteTree(routeNodes, [], pageMap, routes.defaultLayout);
  files.push(...routeFiles);

  return files;
}
