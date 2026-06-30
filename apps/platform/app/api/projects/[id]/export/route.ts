import { NextResponse } from "next/server";
import { jsonError } from "@/lib/api/response";
import { getPlatformBackendConfig } from "@/lib/backend/config";
import { requireRuntimeRequestUser } from "@/lib/backend/runtime-user";
import { createServerSupabase } from "@/lib/supabase/server";
import { generateProjectZip } from "@/lib/export/generate-export";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const backendConfig = getPlatformBackendConfig();
    if (backendConfig.mode !== "local") {
      await requireRuntimeRequestUser();
    }

    const supabase = backendConfig.mode === "local" ? null : await createServerSupabase();
    const { zipped, fileName } = await generateProjectZip(supabase, params.id);

    return new NextResponse(Buffer.from(zipped), {
      headers: {
        "content-type": "application/zip",
        "content-disposition": `attachment; filename="${fileName}"`,
        "cache-control": "no-store",
      },
    });
  } catch (error) {
    console.error("[api/projects/[id]/export] GET failed:", error);
    return jsonError(error);
  }
}
