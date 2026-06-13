"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProjectList } from "@/components/project/project-list";
import { EditorLayout } from "@/components/editor/editor-layout";
import { Spinner } from "@/components/ui/spinner";

function InnerPageContent() {
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

export default function InnerPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Spinner /></div>}>
      <InnerPageContent />
    </Suspense>
  );
}
