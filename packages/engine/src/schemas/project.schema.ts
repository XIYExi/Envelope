import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional().default(""),
  schema_version: z.string().optional().default("3.0.0"),
  config: z.record(z.unknown()).optional().default({}),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export const projectConfigSchema = z.object({
  theme: z
    .object({
      primaryColor: z.string().optional(),
      fontFamily: z.string().optional(),
      borderRadius: z.string().optional(),
    })
    .optional()
    .default({}),
  seo: z
    .object({
      titleTemplate: z.string().optional(),
      defaultDescription: z.string().optional(),
      siteUrl: z.string().optional(),
    })
    .optional()
    .default({}),
  supabase: z
    .object({
      projectUrl: z.string().optional(),
      anonKey: z.string().optional(),
    })
    .optional(),
  version: z.string().default("3.0.0"),
});

export type ProjectConfig = z.infer<typeof projectConfigSchema>;
