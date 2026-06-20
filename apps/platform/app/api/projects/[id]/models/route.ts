import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { jsonError } from "@/lib/api/response";
import { apiErrors } from "@/lib/api/errors";
import { getProjectModels } from "@/lib/services/project-models.service";

/**
 * 只读：项目数据模型列表
 *
 * 说明：
 * - 当前主要用于编辑器侧“配置归档导出（部分选择）”拉取资源清单
 */
export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createServerSupabase();
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!sessionData.session) throw apiErrors.unauthorized();
    const models = await getProjectModels(params.id);
    return NextResponse.json(models);
  } catch (error) {
    console.error("[api/projects/[id]/models] GET failed:", error);
    return jsonError(error);
  }
}
