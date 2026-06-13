import { forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

interface CanvasRendererProps {
  components: Array<{
    id: string;
    node: {
      id: string;
      type: string;
      category: string;
      props?: Record<string, unknown>;
      tailwindClasses?: string;
      children?: unknown[];
    };
    position: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }>;
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
            const isSelected = selectedIds.includes(comp.id);

            return (
              <div
                key={comp.id}
                className={cn(
                  "relative cursor-move rounded-md border-2 border-transparent p-2 transition-colors hover:border-blue-300",
                  isSelected && "border-blue-500 ring-2 ring-blue-200",
                )}
                style={{
                  gridColumn: `${comp.position.x} / span ${comp.position.width}`,
                  gridRow: `${comp.position.y} / span ${comp.position.height}`,
                  minHeight: `${comp.position.height * 40}px`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(comp.id, e.shiftKey);
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
