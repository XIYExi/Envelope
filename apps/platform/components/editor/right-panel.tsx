"use client";

import { useMemo, useCallback } from "react";
import { useCanvasStore, PropertyEditor } from "@envelope/engine";
import { createDefaultRegistry } from "@envelope/materials";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RightPanelProps {
  collapsed: boolean;
}

export function RightPanel({ collapsed }: RightPanelProps) {
  const {
    zoom, setZoom, components, selectedIds,
    setPageBackground, pageBackground, pagePadding, setPagePadding,
    updateComponent,
  } = useCanvasStore();

  const selected = components.filter((c) => selectedIds.includes(c.id));
  const selectedComp = selected.length === 1 ? selected[0] : null;

  const registry = useMemo(() => createDefaultRegistry(), []);

  const material = useMemo(() => {
    if (!selectedComp) return null;
    return registry.get(selectedComp.node.type) ?? null;
  }, [selectedComp, registry]);

  const handlePropChange = useCallback(
    (key: string, value: unknown) => {
      if (!selectedComp) return;
      const currentProps = selectedComp.node.props ?? {};
      updateComponent(selectedComp.id, {
        node: {
          ...selectedComp.node,
          props: {
            ...currentProps,
            [key]: value,
          },
        },
      });
    },
    [selectedComp, updateComponent],
  );

  const handleNameChange = useCallback(
    (name: string) => {
      if (!selectedComp) return;
      updateComponent(selectedComp.id, {
        node: {
          ...selectedComp.node,
          name,
        },
      });
    },
    [selectedComp, updateComponent],
  );

  return (
    <div
      className={cn(
        "flex flex-col border-l bg-background transition-all duration-200",
        collapsed ? "w-0 overflow-hidden border-l-0" : "w-72",
      )}
    >
      <div className="flex h-9 items-center border-b px-3">
        <span className="text-xs font-medium text-muted-foreground">Properties</span>
        {material && (
          <span className="ml-auto text-[10px] text-muted-foreground">{material.name}</span>
        )}
      </div>

      <ScrollArea className="flex-1">
        {selectedComp ? (
          <div className="space-y-4 p-3">
            {/* Identity section */}
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Component ID</label>
                <input
                  type="text"
                  value={selectedComp.id.slice(0, 16)}
                  disabled
                  className="h-7 w-full rounded border bg-muted/30 px-2 font-mono text-[10px] text-muted-foreground"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Component Name</label>
                <input
                  type="text"
                  value={selectedComp.node.name ?? ""}
                  placeholder={`${selectedComp.node.type}-${selectedComp.id.slice(0, 8)}`}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="h-7 w-full rounded border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <Separator />

            {/* Position info */}
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Layout</label>
              <div className="grid grid-cols-2 gap-1">
                {([
                  ["Col", selectedComp.position.x],
                  ["Row", selectedComp.position.y],
                  ["Width", selectedComp.position.width],
                  ["Height", selectedComp.position.height],
                ] as const).map(([label, value]) => (
                  <div key={label} className="rounded border bg-muted/30 px-2 py-0.5">
                    <span className="block text-[9px] text-muted-foreground">{label}</span>
                    <span className="text-[10px] font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Dynamic property editor from material */}
            {material?.editableProps && material.editableProps.length > 0 ? (
              <PropertyEditor
                editableProps={material.editableProps}
                values={(selectedComp.node.props ?? {}) as Record<string, unknown>}
                onChange={handlePropChange}
              />
            ) : (
              <div className="py-2 text-center text-[10px] text-muted-foreground">
                No editable properties for this component
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
