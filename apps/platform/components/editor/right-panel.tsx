"use client";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface RightPanelProps {
  collapsed: boolean;
}

export function RightPanel({ collapsed }: RightPanelProps) {
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

      <div className="flex-1 overflow-auto p-3">
        <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
          <p className="text-xs">Select a component to edit its properties</p>
        </div>
      </div>

      <Separator />

      <div className="p-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Canvas</span>
          <span>100%</span>
        </div>
        <input
          type="range"
          min="25"
          max="200"
          defaultValue="100"
          className="mt-1 w-full"
        />
      </div>
    </div>
  );
}
