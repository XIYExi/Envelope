import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { jsonError } from "@/lib/api/response";
import { apiErrors } from "@/lib/api/errors";
import { createArchiveImportTask } from "@/lib/archive/archive-task-manager";
import type { ArchiveImportOptions } from "@/lib/archive/archive-types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabase();
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!sessionData.session) throw apiErrors.unauthorized();
    if (!sessionData.session.user?.id) throw apiErrors.unauthorized();

    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof Blob)) {
      throw apiErrors.validation({ field: "file" }, "Missing file");
    }
    const optionsRaw = form.get("options");
    let options: ArchiveImportOptions;
    try {
      options = optionsRaw ? (JSON.parse(String(optionsRaw)) as ArchiveImportOptions) : ({ mode: "create" } as ArchiveImportOptions);
    } catch {
      options = { mode: "create" };
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    const { taskId, wsPort, wsPath } = await createArchiveImportTask({
      ownerUserId: sessionData.session.user.id,
      accessToken: sessionData.session.access_token,
      uploadBytes: bytes,
      options,
    });

    return NextResponse.json({
      taskId,
      wsPort,
      wsPath,
      statusUrl: `/api/archive/tasks/${taskId}`,
    });
  } catch (error) {
    console.error("[api/archive/import/tasks] POST failed:", error);
    return jsonError(error);
  }
}
