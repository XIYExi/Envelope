import { NextResponse } from "next/server";
import { updateProjectSchema } from "@envelope/engine";
import { getProject, updateProject, deleteProject, duplicateProject } from "@/lib/services/project.service";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const project = await getProject(params.id);
    return NextResponse.json(project);
  } catch (error) {
    console.error("[api/projects/[id]] GET failed:", error);
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const parsed = updateProjectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }
    const project = await updateProject(params.id, parsed.data);
    return NextResponse.json(project);
  } catch (error) {
    console.error("[api/projects/[id]] PATCH failed:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    await deleteProject(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/projects/[id]] DELETE failed:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const duplicated = await duplicateProject(params.id, body.name);
    return NextResponse.json(duplicated, { status: 201 });
  } catch (error) {
    console.error("[api/projects/[id]] POST(duplicate) failed:", error);
    return NextResponse.json({ error: "Duplicate failed" }, { status: 500 });
  }
}
