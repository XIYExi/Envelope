import { z } from "zod";

export interface ComponentNode {
  id: string;
  type: string;
  category: string;
  props?: Record<string, unknown>;
  tailwindClasses?: string;
  dataBindings?: Record<string, string>;
  eventBindings?: Record<string, string>;
  children?: ComponentNode[];
  grid?: {
    col: number;
    row: number;
    colSpan?: number;
    rowSpan?: number;
  };
  comment?: string;
}

export const componentSchema: z.ZodType<ComponentNode> = z.lazy(() =>
  z.object({
    id: z.string(),
    type: z.string(),
    category: z.string(),
    props: z.record(z.unknown()).optional(),
    tailwindClasses: z.string().optional(),
    dataBindings: z.record(z.string()).optional(),
    eventBindings: z.record(z.string()).optional(),
    children: z.array(componentSchema).optional(),
    grid: z
      .object({
        col: z.number().min(1).max(12),
        row: z.number(),
        colSpan: z.number().min(1).optional(),
        rowSpan: z.number().min(1).optional(),
      })
      .optional(),
    comment: z.string().optional(),
  }),
) as z.ZodType<ComponentNode>;

export interface PageSchema {
  version: string;
  title: string;
  description?: string;
  path: string;
  layout?: string;
  metadata?: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
  background?: {
    color?: string;
    image?: string;
  };
  components?: ComponentNode[];
}

export const pageSchema: z.ZodType<PageSchema> = z.object({
  version: z.string().optional().default("3.0.0"),
  title: z.string().min(1),
  description: z.string().optional(),
  path: z.string(),
  layout: z.string().optional(),
  metadata: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      ogImage: z.string().optional(),
    })
    .optional()
    .default({}),
  background: z
    .object({
      color: z.string().optional(),
      image: z.string().optional(),
    })
    .optional()
    .default({}),
  components: z.array(componentSchema).optional().default([]),
}) as z.ZodType<PageSchema>;
