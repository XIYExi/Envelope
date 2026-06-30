/**
 * 路由 Schema 定义
 *
 * 定义了项目路由树（Routes）的数据结构：
 * - RouteNode: 单个路由节点，支持递归嵌套（父路由包含子路由）
 * - RoutesConfig: 完整路由配置，包含默认布局和路由树
 *
 * 路由树对应 Next.js App Router 的文件系统路由，
 * 每个路由节点可以关联一个页面、布局、认证守卫和中间件。
 *
 * 示例路由树：
 * routes: [
 *   { id: "root", path: "/", children: [
 *     { id: "dashboard", path: "dashboard", pageId: "page-1", authRequired: true },
 *     { id: "settings", path: "settings", pageId: "page-2" }
 *   ]}
 * ]
 *
 * @author xiye
 * @date 2026/6/13
 */
import { z } from "zod";

/**
 * 路由节点接口
 * 描述路由树中的一个节点，支持无限嵌套
 */
export interface RouteNode {
  /** 路由唯一 ID */
  id: string;
  /** 路径（如 "/"、"dashboard"、"[id]"、"[...slug]"） */
  path: string;
  /** 关联的页面 ID（指向 project_pages 表） */
  pageId?: string;
  /** 关联的布局组件 ID（如 "dashboard-layout"） */
  layoutId?: string;
  /** 是否需要登录才能访问 */
  authRequired?: boolean;
  /** 需要的角色列表（如 ["admin", "editor"]） */
  roles?: string[];
  /** 中间件配置（如速率限制、CORS 等） */
  middlewareConfig?: Record<string, unknown>;
  /** 页面元数据（用于 SEO） */
  metadata?: {
    /** 自定义标题 */
    title?: string;
    /** 自定义描述 */
    description?: string;
    /** Open Graph 图片 */
    ogImage?: string;
  };
  /** 子路由列表（递归嵌套） */
  children?: RouteNode[];
}

/**
 * 路由节点的 Zod Schema（递归定义）
 *
 * 使用 z.lazy() 实现递归：children 字段引用自身。
 * 支持 Next.js App Router 的所有路由模式：
 * - 静态路径："/dashboard"
 * - 动态参数："/posts/[id]"
 * - 可选参数："/posts/[...slug]"
 */
export const routeNodeSchema: z.ZodType<RouteNode> = z.lazy(() =>
  z.object({
    /** 路由唯一 ID */
    id: z.string(),
    /** 路径 */
    path: z.string(),
    /** 关联的页面 ID */
    pageId: z.string().optional(),
    /** 关联的布局 ID */
    layoutId: z.string().optional(),
    /** 是否需要认证 */
    authRequired: z.boolean().optional(),
    /** 需要的角色列表 */
    roles: z.array(z.string()).optional(),
    /** 中间件配置 */
    middlewareConfig: z.record(z.unknown()).optional(),
    /** 页面元数据 */
    metadata: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      ogImage: z.string().optional(),
    }).optional(),
    /** 子路由（递归引用 routeNodeSchema） */
    children: z.array(routeNodeSchema).optional(),
  }),
) as z.ZodType<RouteNode>;

/**
 * 路由配置接口
 * 项目路由的顶层结构
 */
export interface RoutesConfig {
  /** Schema 版本号 */
  version: string;
  /** 默认布局组件 ID（所有路由默认使用的布局） */
  defaultLayout?: string;
  /** 路由树（根路由数组） */
  routes?: RouteNode[];
}

/**
 * 路由配置的 Zod Schema
 * 校验 routes.json 数据的合法性
 */
export const routesSchema: z.ZodType<RoutesConfig> = z.object({
  /** Schema 版本号，默认 3.0.0 */
  version: z.string().optional().default("3.0.0"),
  /** 默认布局 ID */
  defaultLayout: z.string().optional(),
  /** 路由树，默认空数组 */
  routes: z.array(routeNodeSchema).optional().default([]),
}) as z.ZodType<RoutesConfig>;
