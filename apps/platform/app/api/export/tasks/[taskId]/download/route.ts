import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api/response";
import { apiErrors } from "@/lib/api/errors";
import { requireRuntimeUserId } from "@/lib/backend/runtime-user";
import { getExportTaskForUser, getExportTaskZipForUser } from "@/lib/export/export-task-manager";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: { taskId: string } }) {
  try {
    const userId = await requireRuntimeUserId();
    const task = getExportTaskForUser(params.taskId, userId);
    if (!task) throw apiErrors.notFound("Export task not found", "EXPORT_TASK.NOT_FOUND");
    if (task.state === "error") throw apiErrors.conflict(task.error || "Export failed", "EXPORT_TASK.FAILED");
    if (task.state !== "done") throw apiErrors.conflict("Export not ready", "EXPORT_TASK.NOT_READY");

    const zip = await getExportTaskZipForUser(params.taskId, userId);
    if (!zip) throw apiErrors.conflict("Export not ready", "EXPORT_TASK.NOT_READY");

    return new NextResponse(Buffer.from(zip.bytes), {
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
