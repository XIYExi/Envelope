"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { RuntimePageRenderer } from "@/components/runtime/runtime-renderer";
import type { CanvasComponent } from "@envelope/engine";

interface PreviewData {
  components: CanvasComponent[];
  gridCols: number;
  gridGap: number;
  pageBackground: string;
  pagePadding: number;
  pageMaxWidth: number | null;
  viewportWidth: number;
  viewport: "mobile" | "tablet" | "desktop" | "fluid";
}

export default function PreviewPage() {
  const params = useParams();
  const pageId = params.pageId as string;
  const [data, setData] = useState<PreviewData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(`preview-${pageId}`);
    if (stored) {
      try {
        setData(JSON.parse(stored) as PreviewData);
      } catch {
        // ignore parse error
      }
    }
  }, [pageId]);

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center text-muted-foreground">
        加载中...
      </div>
    );
  }

  return (
    <RuntimePageRenderer
      components={data.components}
      gridCols={data.gridCols}
      gridGap={data.gridGap}
      pageBackground={data.pageBackground}
      pagePadding={data.pagePadding}
      pageMaxWidth={data.pageMaxWidth}
      viewportWidth={data.viewportWidth}
      viewport={data.viewport}
    />
  );
}
