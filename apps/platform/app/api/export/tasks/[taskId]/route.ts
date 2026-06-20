import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api/response";
import { apiErrors } from "@/lib/api/errors";
import { requireRuntimeUserId } from "@/lib/backend/runtime-user";
import { getExportTaskForUser } from "@/lib/export/export-task-manager";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: { taskId: string } }) {
  try {
    const userId = await requireRuntimeUserId();
    const task = getExportTaskForUser(params.taskId, userId);
    if (!task) throw apiErrors.notFound("Export task not found", "EXPORT_TASK.NOT_FOUND");
    return NextResponse.json({ task });
  } catch (error) {
    console.error("[api/export/tasks/[taskId]] GET failed:", error);
    return jsonError(error);
  }
}
