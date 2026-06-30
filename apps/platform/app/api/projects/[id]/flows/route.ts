import { NextResponse } from "next/server";
import { z } from "zod";
import { apiErrors } from "@/lib/api/errors";
import { jsonError } from "@/lib/api/response";
import { getProjectFlows, upsertProjectFlows } from "@/lib/services/project-flows.service";

const flowInputSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1).max(200),
  description: z.string().optional(),
  flow_type: z.string().optional(),
  yaml_content: z.string().optional(),
  trigger_event: z.string().nullable().optional(),
  is_active: z.boolean().optional(),
});

const saveFlowsBodySchema = z.object({
  flows: z.array(flowInputSchema).max(500),
});

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const flows = await getProjectFlows(params.id);
    return NextResponse.json(flows);
  } catch (error) {
    console.error("[api/projects/[id]/flows] GET failed:", error);
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

    const parsed = saveFlowsBodySchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(apiErrors.validation(parsed.error.flatten()));
    }

    const saved = await upsertProjectFlows(params.id, parsed.data.flows.map((f) => ({
      id: f.id,
      name: f.name,
      description: f.description ?? "",
      flow_type: f.flow_type ?? "action",
      yaml_content: f.yaml_content ?? "",
      trigger_event: f.trigger_event ?? null,
      is_active: f.is_active ?? true,
    })));

    return NextResponse.json(saved);
  } catch (error) {
    console.error("[api/projects/[id]/flows] PUT failed:", error);
    return jsonError(error);
  }
}

