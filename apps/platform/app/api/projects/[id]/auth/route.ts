import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api/response";
import { getProjectAuth } from "@/lib/services/project-auth.service";

/**
 * 只读：项目鉴权配置（可能为空）
 *
 * 说明：
 * - 当前主要用于编辑器侧“配置归档导出（部分选择）”展示“是否包含鉴权配置”
 */
export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await getProjectAuth(params.id);
    return NextResponse.json(auth);
  } catch (error) {
    console.error("[api/projects/[id]/auth] GET failed:", error);
    return jsonError(error);
  }
}
