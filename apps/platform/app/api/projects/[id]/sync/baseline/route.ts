import { NextResponse } from "next/server";
import { z } from "zod";
import { jsonError } from "@/lib/api/response";
import { apiErrors } from "@/lib/api/errors";
import { requireRuntimeRequestUser } from "@/lib/backend/runtime-user";
import { confirmProjectSyncBaseline } from "@/lib/sync/local-project-sync";

export const runtime = "nodejs";

const confirmProjectSyncBaselineBodySchema = z.object({
  accessToken: z.string().trim().min(1).optional(),
  remoteProjectId: z.string().uuid().optional(),
});

/**
 * 在本地与远端已一致时，将当前快照确认成同步基线。
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

    const parsed = confirmProjectSyncBaselineBodySchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(apiErrors.validation(parsed.error.flatten()));
    }

    const accessToken = parsed.data.accessToken ?? runtimeUser.accessToken;
    if (!accessToken) {
      return jsonError(apiErrors.validation({ accessToken }, "Missing Supabase access token"));
    }

    const result = await confirmProjectSyncBaseline({
      projectId: params.id,
      accessToken,
      remoteProjectId: parsed.data.remoteProjectId,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[api/projects/[id]/sync/baseline] POST failed:", error);
    return jsonError(error);
  }
}
