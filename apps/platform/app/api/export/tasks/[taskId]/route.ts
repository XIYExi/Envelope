import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { jsonError } from "@/lib/api/response";
import { apiErrors } from "@/lib/api/errors";
import { getExportTaskForUser } from "@/lib/export/export-task-manager";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: { taskId: string } }) {
  try {
    const supabase = await createServerSupabase();
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!sessionData.session?.user?.id) throw apiErrors.unauthorized();

    const task = getExportTaskForUser(params.taskId, sessionData.session.user.id);
    if (!task) throw apiErrors.notFound("Export task not found", "EXPORT_TASK.NOT_FOUND");
    return NextResponse.json({ task });
  } catch (error) {
    console.error("[api/export/tasks/[taskId]] GET failed:", error);
    return jsonError(error);
  }
}
