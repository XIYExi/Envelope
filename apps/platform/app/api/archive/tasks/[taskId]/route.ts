import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api/response";
import { apiErrors } from "@/lib/api/errors";
import { requireRuntimeUserId } from "@/lib/backend/runtime-user";
import { getArchiveExportTaskForUser, getArchiveImportTaskForUser } from "@/lib/archive/archive-task-manager";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: { taskId: string } }) {
  try {
    const userId = await requireRuntimeUserId();
    const exportTask = getArchiveExportTaskForUser(params.taskId, userId);
    if (exportTask) return NextResponse.json({ task: exportTask });

    const importTask = getArchiveImportTaskForUser(params.taskId, userId);
    if (importTask) return NextResponse.json({ task: importTask });

    throw apiErrors.notFound("Archive task not found", "ARCHIVE_TASK.NOT_FOUND");
  } catch (error) {
    console.error("[api/archive/tasks/[taskId]] GET failed:", error);
    return jsonError(error);
  }
}
