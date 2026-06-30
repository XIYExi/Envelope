import { NextResponse } from "next/server";
import { z } from "zod";
import { jsonError } from "@/lib/api/response";
import { apiErrors } from "@/lib/api/errors";
import { requireRuntimeRequestUser } from "@/lib/backend/runtime-user";
import { createProjectSyncPullTask, createProjectSyncPushTask } from "@/lib/sync/sync-task-manager";

export const runtime = "nodejs";

const createProjectSyncTaskBodySchema = z.object({
  action: z.enum(["push", "pull"]).optional(),
  accessToken: z.string().trim().min(1).optional(),
  force: z.boolean().optional(),
  remoteProjectId: z.string().uuid().optional(),
});

/**
 * 创建 local 项目双向同步任务。
 *
 * @author xiye
 * @date 2026-06-20
 */
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const runtimeUser = await requireRuntimeRequestUser();

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const parsed = createProjectSyncTaskBodySchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(apiErrors.validation(parsed.error.flatten()));
    }

    const accessToken = parsed.data.accessToken ?? runtimeUser.accessToken;
    if (!accessToken) {
      return jsonError(apiErrors.validation({ accessToken }, "Missing Supabase access token"));
    }

    const action = parsed.data.action ?? "push";
    const taskFactory = action === "pull" ? createProjectSyncPullTask : createProjectSyncPushTask;
    const { taskId, wsPort, wsPath } = taskFactory({
      projectId: params.id,
      ownerUserId: runtimeUser.userId,
      accessToken,
      force: parsed.data.force,
      remoteProjectId: parsed.data.remoteProjectId,
    });

    return NextResponse.json({
      action,
      taskId,
      wsPort,
      wsPath,
      statusUrl: `/api/sync/tasks/${taskId}`,
    });
  } catch (error) {
    console.error("[api/projects/[id]/sync/tasks] POST failed:", error);
    return jsonError(error);
  }
}
