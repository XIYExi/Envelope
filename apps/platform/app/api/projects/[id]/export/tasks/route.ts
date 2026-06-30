import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api/response";
import { requireRuntimeRequestUser } from "@/lib/backend/runtime-user";
import { createExportTask } from "@/lib/export/export-task-manager";

export const runtime = "nodejs";

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  try {
    const runtimeUser = await requireRuntimeRequestUser();

    const { taskId, wsPort, wsPath } = createExportTask({
      projectId: params.id,
      ownerUserId: runtimeUser.userId,
      accessToken: runtimeUser.accessToken,
    });

    return NextResponse.json({
      taskId,
      wsPort,
      wsPath,
      statusUrl: `/api/export/tasks/${taskId}`,
      downloadUrl: `/api/export/tasks/${taskId}/download`,
    });
  } catch (error) {
    console.error("[api/projects/[id]/export/tasks] POST failed:", error);
    return jsonError(error);
  }
}
