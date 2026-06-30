import { NextResponse } from "next/server";
import { updateProjectSchema } from "@envelope/engine";
import { getProject, updateProject, deleteProject, duplicateProject } from "@/lib/services/project.service";
import { apiErrors } from "@/lib/api/errors";
import { jsonError } from "@/lib/api/response";
import { z } from "zod";

const duplicateProjectBodySchema = z.object({
  name: z.string().trim().min(1).max(100),
});

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const project = await getProject(params.id);
    return NextResponse.json(project);
  } catch (error) {
    console.error("[api/projects/[id]] GET failed:", error);
    return jsonError(error);
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return jsonError(apiErrors.validation({}, "Invalid JSON"));
    }
    const parsed = updateProjectSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(apiErrors.validation(parsed.error.flatten()));
    }
    const project = await updateProject(params.id, parsed.data);
    return NextResponse.json(project);
  } catch (error) {
    console.error("[api/projects/[id]] PATCH failed:", error);
    return jsonError(error);
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    await deleteProject(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/projects/[id]] DELETE failed:", error);
    return jsonError(error);
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return jsonError(apiErrors.validation({}, "Invalid JSON"));
    }

    const parsed = duplicateProjectBodySchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(apiErrors.validation(parsed.error.flatten()));
    }

    const duplicated = await duplicateProject(params.id, parsed.data.name);
    return NextResponse.json(duplicated, { status: 201 });
  } catch (error) {
    console.error("[api/projects/[id]] POST(duplicate) failed:", error);
    return jsonError(error);
  }
}
