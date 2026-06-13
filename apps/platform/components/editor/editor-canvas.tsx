"use client";

import { useEditorStore } from "@/stores/editor";
import { cn } from "@/lib/utils";

const viewportWidths = {
  mobile: "max-w-[375px]",
  tablet: "max-w-[768px]",
  desktop: "max-w-[1440px]",
  fluid: "max-w-full",
};

export function EditorCanvas() {
  const { canvasViewport, canvasScale, selectedComponentId } = useEditorStore();

  return (
    <div className="flex flex-1 items-start justify-center overflow-auto bg-muted/30 p-4">
      <div
        className={cn(
          "min-h-[600px] w-full rounded-lg border bg-background shadow-sm transition-all",
          viewportWidths[canvasViewport],
        )}
        style={{ transform: `scale(${canvasScale})`, transformOrigin: "top center" }}
      >
        <div className="flex h-full flex-col items-center justify-center p-8 text-center text-muted-foreground">
          <div className="mb-4 rounded-full bg-muted p-4">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <p className="text-sm font-medium">Drop components here to start building</p>
          <p className="mt-1 text-xs">
            Drag components from the palette or use AI to generate pages
          </p>
          {selectedComponentId && (
            <p className="mt-2 text-xs text-primary">
              Selected: {selectedComponentId}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
