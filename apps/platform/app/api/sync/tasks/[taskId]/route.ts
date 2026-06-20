import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api/response";
import { apiErrors } from "@/lib/api/errors";
import { requireRuntimeUserId } from "@/lib/backend/runtime-user";
import { getProjectSyncTaskForUser } from "@/lib/sync/sync-task-manager";

export const runtime = "nodejs";

/**
 * 查询项目同步任务状态。
 *
 * @author xiye
 * @date 2026-06-20
 */
export async function GET(_request: Request, { params }: { params: { taskId: string } }) {
  try {
    const userId = await requireRuntimeUserId();
    const task = getProjectSyncTaskForUser(params.taskId, userId);
    if (!task) throw apiErrors.notFound("Project sync task not found", "PROJECT_SYNC_TASK.NOT_FOUND");
    return NextResponse.json({ task });
  } catch (error) {
    console.error("[api/sync/tasks/[taskId]] GET failed:", error);
    return jsonError(error);
  }
}
