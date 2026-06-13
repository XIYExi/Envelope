"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface LeftPanelProps {
  collapsed: boolean;
}

export function LeftPanel({ collapsed }: LeftPanelProps) {
  return (
    <div
      className={cn(
        "flex flex-col border-r bg-background transition-all duration-200",
        collapsed ? "w-0 overflow-hidden border-r-0" : "w-64",
      )}
    >
      <div className="flex h-9 items-center border-b px-3">
        <span className="text-xs font-medium text-muted-foreground">Project Explorer</span>
      </div>

      <div className="flex-1 overflow-auto p-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent">
            <span className="text-muted-foreground">📄</span>
            <span>Pages</span>
          </div>
          <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent">
            <span className="text-muted-foreground">🗄️</span>
            <span>Data Models</span>
          </div>
          <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent">
            <span className="text-muted-foreground">⚡</span>
            <span>Flows</span>
          </div>
          <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent">
            <span className="text-muted-foreground">🔌</span>
            <span>API Endpoints</span>
          </div>
        </div>

        <Separator className="my-3" />

        <div className="space-y-1">
          <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent">
            <span className="text-muted-foreground">🧩</span>
            <span>Components</span>
          </div>
          <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent">
            <span className="text-muted-foreground">🎨</span>
            <span>Themes</span>
          </div>
          <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent">
            <span className="text-muted-foreground">⚙️</span>
            <span>Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
}
