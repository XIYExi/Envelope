import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { jsonError } from "@/lib/api/response";
import { apiErrors } from "@/lib/api/errors";
import { createArchiveExportTask } from "@/lib/archive/archive-task-manager";
import type { ArchiveExportOptions } from "@/lib/archive/archive-types";

export const runtime = "nodejs";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createServerSupabase();
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!sessionData.session) throw apiErrors.unauthorized();
    if (!sessionData.session.user?.id) throw apiErrors.unauthorized();

    let options: ArchiveExportOptions | undefined;
    try {
      options = (await request.json()) as ArchiveExportOptions;
    } catch {
      options = undefined;
    }

    const { taskId, wsPort, wsPath } = createArchiveExportTask({
      projectId: params.id,
      ownerUserId: sessionData.session.user.id,
      accessToken: sessionData.session.access_token,
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
