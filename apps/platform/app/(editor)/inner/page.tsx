"use client";

import { useSearchParams } from "next/navigation";
import { ProjectList } from "@/components/project/project-list";
import { EditorLayout } from "@/components/editor/editor-layout";

export default function InnerPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");

  if (!projectId) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <ProjectList />
      </div>
    );
  }

  return <EditorLayout />;
}
