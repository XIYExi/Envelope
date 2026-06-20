import { NextResponse } from "next/server";
import {
  getProjects,
  createProject,
} from "@/lib/services/project.service";
import { createProjectSchema } from "@envelope/engine";
import { apiErrors } from "@/lib/api/errors";
import { jsonError } from "@/lib/api/response";

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("[api/projects] GET failed:", error);
    return jsonError(error);
  }
}

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return jsonError(apiErrors.validation({}, "Invalid JSON"));
    }
    const parsed = createProjectSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(apiErrors.validation(parsed.error.flatten()));
    }

    const project = await createProject(parsed.data);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("[api/projects] POST failed:", error);
    return jsonError(error);
  }
}
