import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { jsonError } from "@/lib/api/response";
import { apiErrors } from "@/lib/api/errors";
import { getExportTaskForUser, getExportTaskZipForUser } from "@/lib/export/export-task-manager";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: { taskId: string } }) {
  try {
    const supabase = await createServerSupabase();
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!sessionData.session?.user?.id) throw apiErrors.unauthorized();

    const task = getExportTaskForUser(params.taskId, sessionData.session.user.id);
    if (!task) throw apiErrors.notFound("Export task not found", "EXPORT_TASK.NOT_FOUND");
    if (task.state === "error") throw apiErrors.conflict(task.error || "Export failed", "EXPORT_TASK.FAILED");
    if (task.state !== "done") throw apiErrors.conflict("Export not ready", "EXPORT_TASK.NOT_READY");

    const zip = await getExportTaskZipForUser(params.taskId, sessionData.session.user.id);
    if (!zip) throw apiErrors.conflict("Export not ready", "EXPORT_TASK.NOT_READY");

    return new NextResponse(zip.bytes, {
      headers: {
        "content-type": "application/zip",
        "content-disposition": `attachment; filename="${zip.fileName}"`,
        "cache-control": "no-store",
      },
    });
  } catch (error) {
    console.error("[api/export/tasks/[taskId]/download] GET failed:", error);
    return jsonError(error);
  }
}
