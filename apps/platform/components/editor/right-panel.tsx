"use client";

import { useCanvasStore } from "@envelope/engine";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RightPanelProps {
  collapsed: boolean;
}

export function RightPanel({ collapsed }: RightPanelProps) {
  const { zoom, setZoom, components, selectedIds, setPageBackground, pageBackground, pagePadding, setPagePadding } = useCanvasStore();
  const selected = components.filter((c) => selectedIds.includes(c.id));
  const selectedComp = selected.length === 1 ? selected[0] : null;

  return (
    <div
      className={cn(
        "flex flex-col border-l bg-background transition-all duration-200",
        collapsed ? "w-0 overflow-hidden border-l-0" : "w-72",
      )}
    >
      <div className="flex h-9 items-center border-b px-3">
        <span className="text-xs font-medium text-muted-foreground">Properties</span>
      </div>

      <ScrollArea className="flex-1">
        {selectedComp ? (
          <div className="space-y-3 p-3">
            <div>
              <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Component</label>
              <div className="rounded border bg-muted/30 px-2 py-1 text-xs font-medium">{selectedComp.node.type}</div>
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Name</label>
              <div className="rounded border bg-muted/30 px-2 py-1 text-xs">{selectedComp.node.name || selectedComp.node.type}</div>
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Position</label>
              <div className="grid grid-cols-2 gap-1">
                <div className="rounded border bg-muted/30 px-2 py-1 text-[10px]">Col: {selectedComp.position.x}</div>
                <div className="rounded border bg-muted/30 px-2 py-1 text-[10px]">Row: {selectedComp.position.y}</div>
                <div className="rounded border bg-muted/30 px-2 py-1 text-[10px]">W: {selectedComp.position.width}</div>
                <div className="rounded border bg-muted/30 px-2 py-1 text-[10px]">H: {selectedComp.position.height}</div>
              </div>
            </div>
            {selectedComp.node.props && Object.keys(selectedComp.node.props).length > 0 && (
              <div>
                <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Props</label>
                <div className="rounded border bg-muted/30 p-2">
                  {Object.entries(selectedComp.node.props).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-0.5 text-[10px]">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-mono">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : selected.length > 1 ? (
          <div className="flex h-full items-center justify-center p-3 text-center text-xs text-muted-foreground">
            {selected.length} components selected
          </div>
        ) : (
          <div className="flex h-full items-center justify-center p-3 text-center text-xs text-muted-foreground">
            Select a component to view properties
          </div>
        )}
      </ScrollArea>

      <Separator />

      <div className="space-y-3 p-3">
        <div>
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <span>Zoom</span>
            <span>{Math.round(zoom * 100)}%</span>
          </div>
          <input
            type="range"
            min="25"
            max="200"
            value={Math.round(zoom * 100)}
            onChange={(e) => setZoom(Number(e.target.value) / 100)}
            className="mt-1 w-full"
          />
        </div>

        <div>
          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Background</label>
          <input
            type="color"
            value={pageBackground}
            onChange={(e) => setPageBackground(e.target.value)}
            className="h-8 w-full cursor-pointer rounded border"
          />
        </div>

        <div>
          <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Padding</label>
          <select
            value={pagePadding}
            onChange={(e) => setPagePadding(Number(e.target.value))}
            className="h-7 w-full rounded border bg-background px-2 text-xs"
          >
            <option value="0">None</option>
            <option value="8">Small (8px)</option>
            <option value="16">Medium (16px)</option>
            <option value="24">Large (24px)</option>
            <option value="32">X-Large (32px)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
