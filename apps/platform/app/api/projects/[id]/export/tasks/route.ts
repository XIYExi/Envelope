import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { jsonError } from "@/lib/api/response";
import { apiErrors } from "@/lib/api/errors";
import { createExportTask } from "@/lib/export/export-task-manager";

export const runtime = "nodejs";

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createServerSupabase();
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!sessionData.session) throw apiErrors.unauthorized();
    if (!sessionData.session.user?.id) throw apiErrors.unauthorized();

    const { taskId, wsPort, wsPath } = createExportTask({
      projectId: params.id,
      ownerUserId: sessionData.session.user.id,
      accessToken: sessionData.session.access_token,
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
