import { NextResponse } from "next/server";
import { z } from "zod";
import { jsonError } from "@/lib/api/response";
import { apiErrors } from "@/lib/api/errors";
import { requireRuntimeRequestUser } from "@/lib/backend/runtime-user";
import { compareLocalProjectWithRemote } from "@/lib/sync/local-project-sync";

export const runtime = "nodejs";

const compareProjectSyncBodySchema = z.object({
  accessToken: z.string().trim().min(1).optional(),
  remoteProjectId: z.string().uuid().optional(),
});

/**
 * 比较 local 项目与远端项目的快照差异。
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

    const parsed = compareProjectSyncBodySchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(apiErrors.validation(parsed.error.flatten()));
    }

    const accessToken = parsed.data.accessToken ?? runtimeUser.accessToken;
    if (!accessToken) {
      return jsonError(apiErrors.validation({ accessToken }, "Missing Supabase access token"));
    }

    const result = await compareLocalProjectWithRemote({
      projectId: params.id,
      accessToken,
      remoteProjectId: parsed.data.remoteProjectId,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[api/projects/[id]/sync/compare] POST failed:", error);
    return jsonError(error);
  }
}
