/**
 * 媒体上传 API（multipart/form-data）。
 *
 * 请求：
 * - POST /api/media/upload
 * - formData: file=<File>
 *
 * 响应：
 * - 201 { key, url }
 *
 * @author xiye
 * @date 2026-06-22
 * @since ISC-38
 */

import { NextResponse } from "next/server";
import { apiErrors } from "@/lib/api/errors";
import { jsonError } from "@/lib/api/response";
import { uploadMediaFromFile } from "@/lib/services/media.service";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return jsonError(apiErrors.validation({ file: "请使用 multipart/form-data 上传 file 字段" }, "Invalid multipart upload"));
    }

    const result = await uploadMediaFromFile(file);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("[api/media/upload] POST failed:", error);
    return jsonError(error);
  }
}

