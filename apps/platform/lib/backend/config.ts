/**
 * 平台后端运行时配置门面。
 *
 * 设计目标：
 * - 对上层 service 只暴露“当前后端是什么、应当使用哪些连接参数”；
 * - 对下层适配器统一提供经过校验的配置对象；
 * - 后续可在此继续扩展媒体存储、同步策略、能力声明等统一配置。
 *
 * @author xiye
 * @date 2026-06-20
 * @since 第一阶段后端门面重构
 */
import path from "node:path";
import { z } from "zod";
import { ApiError } from "@/lib/api/errors";

export const backendModeSchema = z.enum(["supabase", "local", "custom"]);
export const storageModeSchema = z.enum(["supabase", "local", "s3"]);

export type BackendMode = z.infer<typeof backendModeSchema>;
export type StorageMode = z.infer<typeof storageModeSchema>;

type EnvLike = Record<string, string | undefined>;

const supabaseConfigSchema = z.object({
  /** 当前后端模式：Supabase 云端模式。 */
  mode: z.literal("supabase"),
  /** 当前媒体存储模式：与 Supabase Storage 对齐。 */
  storageMode: z.literal("supabase"),
  /** Supabase 项目地址。 */
  supabaseUrl: z.string().url(),
  /** Supabase 匿名公钥。 */
  supabaseAnonKey: z.string().min(1),
});

const localConfigSchema = z.object({
  /** 当前后端模式：本地 SQLite 模式。 */
  mode: z.literal("local"),
  /** 当前媒体存储模式：本地文件系统。 */
  storageMode: z.literal("local"),
  /** 本地 SQLite 数据库文件路径。 */
  sqlitePath: z.string().min(1),
  /** 本地图片/媒体文件根目录。 */
  mediaRoot: z.string().min(1),
  /** 本地模式下用于模拟用户归属的固定用户 ID。 */
  localUserId: z.string().trim().min(1),
});

const customConfigSchema = z.object({
  /** 当前后端模式：自定义数据库 + S3 兼容媒体库。 */
  mode: z.literal("custom"),
  /** 当前媒体存储模式：S3 兼容对象存储。 */
  storageMode: z.literal("s3"),
  /** 自定义数据库连接 URL。 */
  databaseUrl: z.string().url(),
  /** 自定义数据库用户名。 */
  databaseUser: z.string().trim().min(1),
  /** 自定义数据库密码。 */
  databasePassword: z.string().min(1),
  /** S3 兼容媒体服务访问地址。 */
  mediaEndpoint: z.string().url(),
  /** 目标媒体桶名称。 */
  mediaBucket: z.string().trim().min(1),
  /** 媒体存储所在区域。 */
  mediaRegion: z.string().trim().min(1),
  /** 媒体存储访问 Key。 */
  mediaAccessKeyId: z.string().trim().min(1),
  /** 媒体存储访问 Secret。 */
  mediaSecretAccessKey: z.string().min(1),
});

const runtimeBackendConfigSchema = z.discriminatedUnion("mode", [
  supabaseConfigSchema,
  localConfigSchema,
  customConfigSchema,
]);

export type RuntimeBackendConfig = z.infer<typeof runtimeBackendConfigSchema>;

function normalizeBackendMode(value: string | undefined): BackendMode {
  const parsed = backendModeSchema.safeParse(value?.trim().toLowerCase() || "supabase");
  if (!parsed.success) {
    throw new ApiError({
      status: 500,
      code: "BACKEND.INVALID_MODE",
      message: `Unsupported backend mode: ${value}`,
      details: parsed.error.flatten(),
    });
  }
  return parsed.data;
}

/**
 * 从环境变量中解析并校验平台运行时后端配置。
 *
 * 核心链路：
 * - 先识别 `ENVELOPE_PLATFORM_BACKEND`；
 * - 再按不同模式装配对应的必填连接信息；
 * - 最终返回一个经过 Zod 校验的强类型配置对象。
 *
 * @param env 运行时环境变量集合
 * @returns 当前平台应使用的后端配置
 * @author xiye
 * @date 2026-06-20
 */
export function resolvePlatformBackendConfig(env: EnvLike = process.env): RuntimeBackendConfig {
  const mode = normalizeBackendMode(env.ENVELOPE_PLATFORM_BACKEND);

  if (mode === "supabase") {
    const parsed = supabaseConfigSchema.safeParse({
      mode,
      storageMode: "supabase",
      supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });
    if (!parsed.success) {
      throw new ApiError({
        status: 500,
        code: "BACKEND.INVALID_CONFIG",
        message: "Supabase backend configuration is invalid",
        details: parsed.error.flatten(),
      });
    }
    return parsed.data;
  }

  if (mode === "local") {
    const sqlitePath = env.ENVELOPE_LOCAL_SQLITE_PATH || path.join(process.cwd(), ".envelope", "local", "envelope.db");
    const mediaRoot = env.ENVELOPE_LOCAL_MEDIA_ROOT || path.join(process.cwd(), ".envelope", "local", "media");
    const parsed = localConfigSchema.safeParse({
      mode,
      storageMode: "local",
      sqlitePath,
      mediaRoot,
      localUserId: env.ENVELOPE_LOCAL_USER_ID || "local-user",
    });
    if (!parsed.success) {
      throw new ApiError({
        status: 500,
        code: "BACKEND.INVALID_CONFIG",
        message: "Local backend configuration is invalid",
        details: parsed.error.flatten(),
      });
    }
    return parsed.data;
  }

  const parsed = customConfigSchema.safeParse({
    mode,
    storageMode: "s3",
    databaseUrl: env.ENVELOPE_CUSTOM_DATABASE_URL,
    databaseUser: env.ENVELOPE_CUSTOM_DATABASE_USER,
    databasePassword: env.ENVELOPE_CUSTOM_DATABASE_PASSWORD,
    mediaEndpoint: env.ENVELOPE_CUSTOM_MEDIA_ENDPOINT,
    mediaBucket: env.ENVELOPE_CUSTOM_MEDIA_BUCKET,
    mediaRegion: env.ENVELOPE_CUSTOM_MEDIA_REGION,
    mediaAccessKeyId: env.ENVELOPE_CUSTOM_MEDIA_ACCESS_KEY_ID,
    mediaSecretAccessKey: env.ENVELOPE_CUSTOM_MEDIA_SECRET_ACCESS_KEY,
  });
  if (!parsed.success) {
    throw new ApiError({
      status: 500,
      code: "BACKEND.INVALID_CONFIG",
      message: "Custom backend configuration is invalid",
      details: parsed.error.flatten(),
    });
  }
  return parsed.data;
}

let cachedConfig: RuntimeBackendConfig | null = null;

/**
 * 获取平台后端配置的缓存实例。
 *
 * 说明：
 * - Next.js 服务端在单次进程内会重复访问配置；
 * - 这里通过简单缓存避免重复做环境解析和 Zod 校验；
 * - 测试场景可配合 `resetPlatformBackendConfigForTests()` 清空缓存。
 *
 * @returns 当前进程缓存的后端配置
 * @author xiye
 * @date 2026-06-20
 */
export function getPlatformBackendConfig(): RuntimeBackendConfig {
  if (!cachedConfig) {
    cachedConfig = resolvePlatformBackendConfig();
  }
  return cachedConfig;
}

/**
 * 仅供测试环境使用：重置运行时配置缓存。
 *
 * @author xiye
 * @date 2026-06-20
 * @since `getPlatformBackendConfig()`
 */
export function resetPlatformBackendConfigForTests() {
  cachedConfig = null;
}
