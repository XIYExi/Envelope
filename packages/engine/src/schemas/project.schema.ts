/**
 * 项目 Schema 定义
 *
 * 定义了项目（Project）的核心数据结构，包括：
 * - createProjectSchema: 创建项目时的输入校验
 * - updateProjectSchema: 更新项目时的输入校验
 * - projectConfigSchema: 项目的配置结构（主题、SEO、Supabase连接等）
 *
 * 所有 TypeScript 类型都从 Zod Schema 推导（z.infer），
 * 保证类型定义和运行时校验始终一致。
 *
 * @author xiye
 * @date 2026/6/13
 */
import { z } from "zod";

/**
 * 创建项目的输入 Schema
 * 用于 POST /api/projects 接口的请求体校验
 */
export const createProjectSchema = z.object({
  /** 项目名称，必填，1-100个字符 */
  name: z.string().min(1).max(100),
  /** 项目描述，可选，最多500个字符，默认空字符串 */
  description: z.string().max(500).optional().default(""),
  /** Schema 版本号，用于后续版本迁移，默认 3.0.0 */
  schema_version: z.string().optional().default("3.0.0"),
  /** 项目配置（JSON 对象），存储主题、SEO 等配置 */
  config: z.record(z.unknown()).optional().default({}),
});

/** 创建项目的输入类型，从 createProjectSchema 自动推导 */
export type CreateProjectInput = z.infer<typeof createProjectSchema>;

/**
 * 更新项目的输入 Schema
 * 用于 PATCH /api/projects/[id] 接口的请求体校验
 * 所有字段都是可选的，只更新传入的字段
 */
export const updateProjectSchema = z.object({
  /** 项目名称，可选，1-100个字符 */
  name: z.string().min(1).max(100).optional(),
  /** 项目描述，可选，最多500个字符 */
  description: z.string().max(500).optional(),
  /** 项目配置，可选 */
  config: z.record(z.unknown()).optional(),
});

/** 更新项目的输入类型 */
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

/**
 * 项目配置 Schema
 * 定义了 project.config JSONB 字段的内部结构
 * 包含主题、SEO、Supabase 连接等配置
 */
export const projectConfigSchema = z.object({
  /** 主题配置 */
  theme: z.object({
    /** 主题色（如 "#3b82f6"） */
    primaryColor: z.string().optional(),
    /** 字体族（如 "Inter, sans-serif"） */
    fontFamily: z.string().optional(),
    /** 圆角大小（如 "0.5rem"） */
    borderRadius: z.string().optional(),
  }).optional()
    .default({}),
  /** SEO 配置 */
  seo: z.object({
    /** 标题模板（如 "%s | My App"） */
    titleTemplate: z.string().optional(),
    /** 默认描述，用于 meta description */
    defaultDescription: z.string().optional(),
    /** 网站 URL，用于 canonical 和 OG 标签 */
    siteUrl: z.string().optional(),
  }).optional()
    .default({}),
  /** Supabase 项目连接配置 */
  supabase: z.object({
    /** Supabase 项目 URL */
    projectUrl: z.string().optional(),
    /** Supabase 匿名密钥 */
    anonKey: z.string().optional(),
  }).optional(),
  /** 配置版本号，默认 3.0.0 */
  version: z.string().default("3.0.0"),
});

/** 项目配置类型 */
export type ProjectConfig = z.infer<typeof projectConfigSchema>;
