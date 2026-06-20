import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { jsonError } from "@/lib/api/response";
import { apiErrors } from "@/lib/api/errors";
import { getArchiveExportTaskForUser, getArchiveImportTaskForUser } from "@/lib/archive/archive-task-manager";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: { taskId: string } }) {
  try {
    const supabase = await createServerSupabase();
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!sessionData.session?.user?.id) throw apiErrors.unauthorized();

    const exportTask = getArchiveExportTaskForUser(params.taskId, sessionData.session.user.id);
    if (exportTask) return NextResponse.json({ task: exportTask });

    const importTask = getArchiveImportTaskForUser(params.taskId, sessionData.session.user.id);
    if (importTask) return NextResponse.json({ task: importTask });

    throw apiErrors.notFound("Archive task not found", "ARCHIVE_TASK.NOT_FOUND");
  } catch (error) {
    console.error("[api/archive/tasks/[taskId]] GET failed:", error);
    return jsonError(error);
  }
}
