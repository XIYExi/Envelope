/**
 * local 模式的媒体存储实现：直接将上传文件落盘到 `config.mediaRoot`。
 *
 * 约定：
 * - 以 key（类对象存储的 object key）作为对外标识，内部映射为 `mediaRoot/<key>`；
 * - key 采用 `uploads/YYYY/MM/<uuid>.<ext>`，避免重名并便于后续做清理策略。
 *
 * 安全：
 * - 读取时对 key 做目录穿越校验，确保只能访问 mediaRoot 下的文件。
 *
 * @author xiye
 * @date 2026-06-22
 * @since ISC-38
 */

import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import type { RuntimeBackendConfig } from "@/lib/backend/config";
import { apiErrors } from "@/lib/api/errors";
import type { MediaRepository, OpenMediaResult, UploadMediaInput, UploadMediaResult } from "./types";

const EXT_CONTENT_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

function normalizeExtension(ext: string): string {
  const normalized = ext.trim().toLowerCase();
  if (!normalized) return "";
  if (!normalized.startsWith(".")) return "";
  if (!/^\.[a-z0-9]+$/.test(normalized)) return "";
  return normalized;
}

function inferContentTypeByFileName(fileName: string, fallback?: string): string {
  const ext = normalizeExtension(path.extname(fileName));
  return EXT_CONTENT_TYPES[ext] ?? fallback ?? "application/octet-stream";
}

/**
 * 规范化并校验媒体 key。
 *
 * 规则：
 * - 统一将 `\` 转换为 `/`，并去掉前导 `/`；
 * - 拒绝 `.` / `..` 等相对路径段，避免目录穿越；
 * - 返回以 `/` 连接的稳定 key。
 *
 * @author xiye
 * @date 2026-06-22
 * @since ISC-38
 */
export function normalizeMediaKey(rawKey: string): string {
  const key = rawKey.replaceAll("\\", "/").replace(/^\/+/, "").trim();
  const parts = key.split("/").filter(Boolean);
  if (parts.length === 0) {
    throw apiErrors.validation({ key: "媒体 key 不能为空" }, "Invalid media key");
  }
  for (const part of parts) {
    if (part === "." || part === "..") {
      throw apiErrors.validation({ key: "媒体 key 不允许包含相对路径段" }, "Invalid media key");
    }
    if (part.includes("\0")) {
      throw apiErrors.validation({ key: "媒体 key 非法" }, "Invalid media key");
    }
  }
  return parts.join("/");
}

function resolveLocalMediaFilePath(mediaRoot: string, key: string): string {
  const normalizedKey = normalizeMediaKey(key);
  const root = path.resolve(mediaRoot);
  const target = path.resolve(root, ...normalizedKey.split("/"));
  const rootNormalized = root.toLowerCase();
  const targetNormalized = target.toLowerCase();
  if (targetNormalized === rootNormalized || !targetNormalized.startsWith(`${rootNormalized}${path.sep}`)) {
    throw apiErrors.validation({ key: "媒体 key 越界" }, "Invalid media key");
  }
  return target;
}

function generateLocalMediaKey(fileName: string, now: Date = new Date()): string {
  const year = `${now.getFullYear()}`;
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const ext = normalizeExtension(path.extname(fileName));
  const suffix = ext || "";
  return `uploads/${year}/${month}/${randomUUID()}${suffix}`;
}

export function createLocalMediaRepository(config: RuntimeBackendConfig): MediaRepository {
  if (config.mode !== "local") {
    throw apiErrors.internal("Local media repository is only available for local backend mode", "MEDIA.INVALID_MODE");
  }

  const mediaRoot = config.mediaRoot;

  async function upload(input: UploadMediaInput): Promise<UploadMediaResult> {
    const key = generateLocalMediaKey(input.fileName);
    const filePath = resolveLocalMediaFilePath(mediaRoot, key);
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await fs.promises.writeFile(filePath, input.bytes);
    return {
      key,
      contentType: input.contentType || inferContentTypeByFileName(input.fileName),
      contentLength: input.bytes.byteLength,
    };
  }

  async function open(key: string): Promise<OpenMediaResult> {
    const filePath = resolveLocalMediaFilePath(mediaRoot, key);
    let stat: fs.Stats;
    try {
      stat = await fs.promises.stat(filePath);
    } catch (error) {
      if ((error as NodeJS.ErrnoException)?.code === "ENOENT") {
        throw apiErrors.notFound("Media not found", "MEDIA.NOT_FOUND");
      }
      throw error;
    }
    if (!stat.isFile()) {
      throw apiErrors.notFound("Media not found", "MEDIA.NOT_FOUND");
    }
    const contentType = inferContentTypeByFileName(filePath);
    const nodeStream = fs.createReadStream(filePath);
    const stream = Readable.toWeb(nodeStream) as unknown as ReadableStream<Uint8Array>;
    return { stream, contentType, contentLength: stat.size };
  }

  return { upload, open };
}
