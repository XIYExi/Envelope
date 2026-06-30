import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api/response";
import { getProjectModels } from "@/lib/services/project-models.service";

/**
 * 项目数据模型列表接口。
 *
 * 核心链路：
 * - Route Handler 只负责协议转换与异常兜底；
 * - 实际后端选择由 service -> resource repository 门面完成；
 * - 因此本地 SQLite 与 Supabase 模式都能复用同一入口。
 *
 * @author xiye
 * @date 2026-06-20
 * @since 第二阶段后端门面重构
 */
export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const models = await getProjectModels(params.id);
    return NextResponse.json(models);
  } catch (error) {
    console.error("[api/projects/[id]/models] GET failed:", error);
    return jsonError(error);
  }
}
