import { NextResponse } from "next/server";
import { z } from "zod";
import { pageSchema } from "@envelope/engine";
import { apiErrors } from "@/lib/api/errors";
import { jsonError } from "@/lib/api/response";
import { getProjectPages, upsertProjectPages } from "@/lib/services/project-pages.service";

const pageInputSchema = z.object({
  path: z.string().min(1),
  title: z.string().trim().min(1).max(200),
  description: z.string().optional(),
  schema: pageSchema,
  metadata: z.record(z.unknown()).optional(),
  sort_order: z.number().int().optional(),
  is_published: z.boolean().optional(),
});

const savePagesBodySchema = z.object({
  pages: z.array(pageInputSchema).max(200),
});

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const pages = await getProjectPages(params.id);
    return NextResponse.json(pages);
  } catch (error) {
    console.error("[api/projects/[id]/pages] GET failed:", error);
    return jsonError(error);
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return jsonError(apiErrors.validation({}, "Invalid JSON"));
    }

    const parsed = savePagesBodySchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(apiErrors.validation(parsed.error.flatten()));
    }

    const saved = await upsertProjectPages(params.id, parsed.data.pages.map((p) => ({
      path: p.path,
      title: p.title,
      description: p.description ?? "",
      schema: p.schema,
      metadata: p.metadata ?? {},
      sort_order: p.sort_order ?? 0,
      is_published: p.is_published ?? false,
    })));
    return NextResponse.json(saved);
  } catch (error) {
    console.error("[api/projects/[id]/pages] PUT failed:", error);
    return jsonError(error);
  }
}

