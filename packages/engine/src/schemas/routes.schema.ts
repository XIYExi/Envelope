import { z } from "zod";

export interface RouteNode {
  id: string;
  path: string;
  pageId?: string;
  layoutId?: string;
  authRequired?: boolean;
  roles?: string[];
  middlewareConfig?: Record<string, unknown>;
  metadata?: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
  children?: RouteNode[];
}

export const routeNodeSchema: z.ZodType<RouteNode> = z.lazy(() =>
  z.object({
    id: z.string(),
    path: z.string(),
    pageId: z.string().optional(),
    layoutId: z.string().optional(),
    authRequired: z.boolean().optional(),
    roles: z.array(z.string()).optional(),
    middlewareConfig: z.record(z.unknown()).optional(),
    metadata: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        ogImage: z.string().optional(),
      })
      .optional(),
    children: z.array(routeNodeSchema).optional(),
  }),
) as z.ZodType<RouteNode>;

export interface RoutesConfig {
  version: string;
  defaultLayout?: string;
  routes?: RouteNode[];
}

export const routesSchema: z.ZodType<RoutesConfig> = z.object({
  version: z.string().optional().default("3.0.0"),
  defaultLayout: z.string().optional(),
  routes: z.array(routeNodeSchema).optional().default([]),
}) as z.ZodType<RoutesConfig>;
