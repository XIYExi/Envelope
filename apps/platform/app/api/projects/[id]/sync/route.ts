import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api/response";
import { requireRuntimeUserId } from "@/lib/backend/runtime-user";
import { getLocalProjectSyncStatus } from "@/lib/sync/local-project-sync";
import { getActiveProjectSyncTaskForUser } from "@/lib/sync/sync-task-manager";

export const runtime = "nodejs";

/**
 * 查询项目在 local 模式下的同步状态。
 *
 * @author xiye
 * @date 2026-06-20
 */
export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const userId = await requireRuntimeUserId();
    const status = await getLocalProjectSyncStatus(params.id);
    const activeTask = getActiveProjectSyncTaskForUser(params.id, userId);
    return NextResponse.json({
      status: {
        ...status,
        activeTask,
      },
    });
  } catch (error) {
    console.error("[api/projects/[id]/sync] GET failed:", error);
    return jsonError(error);
  }
}
