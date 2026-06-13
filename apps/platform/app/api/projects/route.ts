import { NextResponse } from "next/server";
import {
  getProjects,
  createProject,
} from "@/lib/services/project.service";
import { createProjectSchema } from "@envelope/engine";

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("[api/projects] GET failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createProjectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const project = await createProject(parsed.data);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("[api/projects] POST failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
