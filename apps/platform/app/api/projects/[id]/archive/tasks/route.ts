import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api/response";
import { requireRuntimeRequestUser } from "@/lib/backend/runtime-user";
import { createArchiveExportTask } from "@/lib/archive/archive-task-manager";
import type { ArchiveExportOptions } from "@/lib/archive/archive-types";

export const runtime = "nodejs";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const runtimeUser = await requireRuntimeRequestUser();

    let options: ArchiveExportOptions | undefined;
    try {
      options = (await request.json()) as ArchiveExportOptions;
    } catch {
      options = undefined;
    }

    const { taskId, wsPort, wsPath } = createArchiveExportTask({
      projectId: params.id,
      ownerUserId: runtimeUser.userId,
      accessToken: runtimeUser.accessToken,
      options,
    });

    return NextResponse.json({
      taskId,
      wsPort,
      wsPath,
      statusUrl: `/api/archive/tasks/${taskId}`,
      downloadUrl: `/api/archive/tasks/${taskId}/download`,
    });
  } catch (error) {
    console.error("[api/projects/[id]/archive/tasks] POST failed:", error);
    return jsonError(error);
  }
}
