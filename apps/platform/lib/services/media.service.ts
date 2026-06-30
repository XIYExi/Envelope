/**
 * 媒体服务层。
 *
 * 说明：
 * - 对 API routes 暴露“上传/读取媒体”的统一入口；
 * - 具体存储实现由 backend/media 门面负责选择；
 * - 当前仅实现 local 模式落盘，其余存储模式暂不支持（返回 501）。
 *
 * @author xiye
 * @date 2026-06-22
 * @since ISC-38
 */

import { getMediaRepository } from "@/lib/backend/media";
import { apiErrors } from "@/lib/api/errors";

function buildMediaUrlFromKey(key: string): string {
  const encoded = key
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `/api/media/${encoded}`;
}

export async function uploadMediaFromFile(file: File): Promise<{ key: string; url: string }> {
  if (!file || typeof file.arrayBuffer !== "function") {
    throw apiErrors.validation({ file: "缺少上传文件" }, "Invalid file");
  }
  const bytes = new Uint8Array(await file.arrayBuffer());
  const result = await getMediaRepository().upload({
    fileName: file.name || "upload",
    contentType: file.type || undefined,
    bytes,
  });
  return { key: result.key, url: buildMediaUrlFromKey(result.key) };
}

export async function openMediaByKey(key: string): Promise<{ stream: ReadableStream<Uint8Array>; contentType: string; contentLength: number }> {
  return getMediaRepository().open(key);
}

