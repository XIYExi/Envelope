import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import type { CanvasComponent } from "./types";

const CELL_HEIGHT = 40;

function cn(...inputs: Parameters<typeof twMerge>) {
  return twMerge(...inputs);
}

interface CanvasRendererProps {
  components: CanvasComponent[];
  selectedIds: string[];
  onSelect: (id: string, multi?: boolean) => void;
  onClearSelection: () => void;
  zoom: number;
}

export const CanvasRenderer = forwardRef<HTMLDivElement, CanvasRendererProps>(
  function CanvasRenderer(
    { components, selectedIds, onSelect, onClearSelection, zoom },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className="relative min-h-[600px] w-full rounded-lg border bg-background shadow-sm"
        style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClearSelection();
          }
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(128,128,128,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.05) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative grid grid-cols-12 gap-1 p-4">
          {components.length === 0 && (
            <div className="col-span-12 flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <p className="text-sm font-medium">Drop components here</p>
              <p className="mt-1 text-xs">Drag from the component panel on the left</p>
            </div>
          )}

          {components.map((comp) => {
            const { x: rawX, y: rawY, width: rawW, height: rawH } = comp.position;
            if (rawX < 1 || rawY < 1 || rawW < 1 || rawH < 1) return null;

            const x = Math.max(1, Math.min(12, rawX));
            const y = Math.max(1, rawY);
            const width = Math.max(1, Math.min(12 - x + 1, rawW));
            const height = Math.max(1, rawH);
            const isSelected = selectedIds.includes(comp.id);

            return (
              <div
                key={comp.id}
                className={cn(
                  "relative cursor-move rounded-md border-2 border-transparent p-2 transition-colors hover:border-blue-300",
                  isSelected && "border-blue-500 ring-2 ring-blue-200",
                )}
                style={{
                  gridColumn: `${x} / span ${width}`,
                  gridRow: `${y} / span ${height}`,
                  minHeight: `${height * CELL_HEIGHT}px`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(comp.id, e.ctrlKey || e.metaKey || e.shiftKey);
                }}
              >
                <div className="flex h-full items-center justify-center rounded bg-muted/50">
                  <span className="text-xs font-medium text-muted-foreground">
                    {comp.node.type}
                  </span>
                </div>
                {isSelected && (
                  <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
