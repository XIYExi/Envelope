import { NextResponse } from "next/server";
import { z } from "zod";
import { apiErrors } from "@/lib/api/errors";
import { jsonError } from "@/lib/api/response";
import { getProjectEndpoints, upsertProjectEndpoints } from "@/lib/services/project-endpoints.service";

const endpointInputSchema = z.object({
  id: z.string().uuid().optional(),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  path: z.string().min(1),
  description: z.string().optional(),
  request_schema: z.record(z.unknown()).optional(),
  response_schema: z.record(z.unknown()).optional(),
  middleware: z.unknown().optional(),
  flow_id: z.string().uuid().nullable().optional(),
  is_active: z.boolean().optional(),
});

const saveEndpointsBodySchema = z.object({
  endpoints: z.array(endpointInputSchema).max(500),
});

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const endpoints = await getProjectEndpoints(params.id);
    return NextResponse.json(endpoints);
  } catch (error) {
    console.error("[api/projects/[id]/endpoints] GET failed:", error);
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

    const parsed = saveEndpointsBodySchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(apiErrors.validation(parsed.error.flatten()));
    }

    const saved = await upsertProjectEndpoints(params.id, parsed.data.endpoints.map((e) => ({
      id: e.id,
      method: e.method,
      path: e.path,
      description: e.description ?? "",
      request_schema: e.request_schema ?? {},
      response_schema: e.response_schema ?? {},
      middleware: Array.isArray(e.middleware) ? e.middleware : [],
      flow_id: e.flow_id ?? null,
      is_active: e.is_active ?? true,
    })));

    return NextResponse.json(saved);
  } catch (error) {
    console.error("[api/projects/[id]/endpoints] PUT failed:", error);
    return jsonError(error);
  }
}
