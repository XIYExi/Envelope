/**
 * 认证 Schema 定义
 *
 * 定义了项目的认证配置结构（auth.json）：
 * - providers: 支持的登录方式（邮箱、OAuth 等）
 * - redirectUrls: 登录/登出后的跳转地址
 * - session: 会话配置（时长、刷新策略）
 *
 * 这些配置用于生成 Supabase Auth 的初始化代码。
 * 用户可以在认证编辑器中可视化配置这些选项。
 *
 * @author xiye
 * @date 2026/6/13
 */
import { z } from "zod";

/**
 * 认证配置 Schema
 * 校验项目认证配置的合法性
 */
export const authSchema = z.object({
  /** Schema 版本号，默认 3.0.0 */
  version: z.string().default("3.0.0"),

  /** 登录提供商列表 */
  providers: z.array(
    z.object({
      /** 提供商名称（支持的 OAuth 平台） */
      name: z.enum([
        "email",    // 邮箱+密码登录
        "google",   // Google OAuth
        "github",   // GitHub OAuth
        "gitlab",   // GitLab OAuth
        "azure",    // Azure AD / Microsoft
        "discord",  // Discord OAuth
      ]),
      /** 是否启用该提供商 */
      enabled: z.boolean().default(true),
      /** 提供商特定配置（如 OAuth client_id） */
      config: z.record(z.string()).default({}),
    }),
  ).default([{ name: "email" as const, enabled: true, config: {} }]),/** 默认只启用邮箱登录 */

  /** 重定向 URL 配置（登录/登出后的跳转地址） */
  redirectUrls: z.object({
    /** 登录成功后跳转地址，默认首页 */
    afterLogin: z.string().default("/"),
    /** 登出后跳转地址，默认登录页 */
    afterLogout: z.string().default("/login"),
    /** 注册成功后跳转地址，默认首页 */
    afterSignup: z.string().default("/"),
    /** 邮箱确认链接的跳转地址（可选） */
    emailConfirmation: z.string().optional(),
  }).default({}),

  /** 会话配置 */
  session: z.object({
    /** 会话时长（秒），默认 3600（1小时） */
    duration: z.number().default(3600),
    /** 是否启用 Refresh Token 轮换（提高安全性），默认 true */
    refreshTokenRotation: z.boolean().default(true),
  }).default({}),
});

/** 认证配置类型 */
export type AuthConfig = z.infer<typeof authSchema>;
