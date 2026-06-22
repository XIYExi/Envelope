/**
 * 媒体读取 API（按 key 获取原始文件内容）。
 *
 * 请求：
 * - GET /api/media/<key...>
 *
 * 说明：
 * - local 模式下会从 `config.mediaRoot/<key>` 读取文件并返回；
 * - 其余存储模式暂未实现（501）。
 *
 * @author xiye
 * @date 2026-06-22
 * @since ISC-38
 */

import { normalizeMediaKey } from "@/lib/backend/media";
import { apiErrors } from "@/lib/api/errors";
import { jsonError } from "@/lib/api/response";
import { openMediaByKey } from "@/lib/services/media.service";

export async function GET(_request: Request, context: { params: { key?: string[] } }) {
  try {
    const rawKey = context.params.key?.join("/") ?? "";
    const key = normalizeMediaKey(rawKey);
    const media = await openMediaByKey(key);
    return new Response(media.stream, {
      status: 200,
      headers: {
        "Content-Type": media.contentType,
        "Content-Length": `${media.contentLength}`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    if ((error as { status?: number })?.status === 400) {
      return jsonError(error, apiErrors.validation({ key: "媒体 key 非法" }, "Invalid media key"));
    }
    console.error("[api/media/[...key]] GET failed:", error);
    return jsonError(error);
  }
}

