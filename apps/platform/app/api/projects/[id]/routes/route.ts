import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api/response";
import { getProjectRoutes } from "@/lib/services/project-routes.service";

/**
 * 项目路由列表接口。
 *
 * 核心链路：
 * - Route Handler 只做 HTTP 协议层包装；
 * - service 通过统一资源仓储门面选择 Supabase 或 SQLite；
 * - 从而让本地模式下的路由查询也走相同 API。
 *
 * @author xiye
 * @date 2026-06-20
 * @since 第二阶段后端门面重构
 */
export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const routes = await getProjectRoutes(params.id);
    return NextResponse.json(routes);
  } catch (error) {
    console.error("[api/projects/[id]/routes] GET failed:", error);
    return jsonError(error);
  }
}
