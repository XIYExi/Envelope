"use client";

import { useCallback } from "react";
import { useCanvasStore } from "@envelope/engine";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Copy, Component } from "lucide-react";
import { useEditorStore } from "@/stores/editor";

interface LeftPanelProps {
  collapsed: boolean;
}

function TreeNode({ id, type, name, depth, selectedIds, onSelect, onDelete, onCopy }: {
  id: string;
  type: string;
  name?: string;
  depth: number;
  selectedIds: string[];
  onSelect: (id: string, multi: boolean) => void;
  onDelete: (id: string) => void;
  onCopy: (id: string) => void;
}) {
  const isSelected = selectedIds.includes(id);
  const displayName = name || `${type}-${id.slice(0, 8)}`;

  return (
    <div
      className={cn(
        "group flex items-center gap-1 rounded px-1 py-0.5 text-xs cursor-pointer transition-colors hover:bg-accent",
        isSelected && "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
      )}
      style={{ paddingLeft: `${depth * 12 + 4}px` }}
      onClick={(e) => onSelect(id, e.ctrlKey || e.metaKey || e.shiftKey)}
    >
      <Component className="h-3 w-3 shrink-0 text-muted-foreground" />
      <span className="flex-1 truncate">{displayName}</span>
      <span className="shrink-0 text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100">{type}</span>
      <button
        className="shrink-0 rounded p-0.5 opacity-0 group-hover:opacity-100 hover:bg-muted"
        onClick={(e) => { e.stopPropagation(); onCopy(id); }}
        title="Copy"
      >
        <Copy className="h-3 w-3" />
      </button>
      <button
        className="shrink-0 rounded p-0.5 opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
        onClick={(e) => { e.stopPropagation(); onDelete(id); }}
        title="Delete"
      >
        <Trash2 className="h-3 w-3" />
      </button>
    </div>
  );
}

export function LeftPanel({ collapsed }: LeftPanelProps) {
  const { components, selectedIds, selectComponent, removeComponent, copySelected } = useCanvasStore();
  const { pushSnapshot } = useEditorStore();

  const handleSelect = useCallback((id: string, multi: boolean) => {
    selectComponent(id, multi);
  }, [selectComponent]);

  const handleDelete = useCallback((id: string) => {
    pushSnapshot();
    removeComponent(id);
  }, [removeComponent, pushSnapshot]);

  const handleCopy = useCallback((id: string) => {
    pushSnapshot();
    selectComponent(id);
    copySelected();
  }, [copySelected, pushSnapshot, selectComponent]);

  if (collapsed) return null;

  return (
    <div className="flex w-56 flex-col border-r bg-background">
      <div className="flex h-9 items-center border-b px-3">
        <span className="text-xs font-medium text-muted-foreground">Component Tree</span>
        {components.length > 0 && (
          <span className="ml-auto text-[10px] text-muted-foreground">{components.length}</span>
        )}
      </div>
      <ScrollArea className="flex-1">
        <div className="p-1">
          {components.length === 0 ? (
            <div className="px-2 py-8 text-center text-xs text-muted-foreground">
              Drag components onto the canvas to build your page
            </div>
          ) : (
            components.map((comp) => (
              <TreeNode
                key={comp.id}
                id={comp.id}
                type={comp.node.type}
                name={comp.node.name}
                depth={0}
                selectedIds={selectedIds}
                onSelect={handleSelect}
                onDelete={handleDelete}
                onCopy={handleCopy}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
