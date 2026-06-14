"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/stores/editor";
import type { EditorMode } from "@/stores/editor.types";
import { FileText, Database, Workflow, Globe, Plug, Puzzle, Palette, Settings } from "lucide-react";

interface LeftPanelProps {
  collapsed: boolean;
}

interface NavItemDef {
  id: EditorMode;
  label: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
}

const NAV_ITEMS: NavItemDef[] = [
  { id: "pages", label: "Pages", icon: <FileText className="h-3.5 w-3.5" /> },
  { id: "data-models", label: "Data Models", icon: <Database className="h-3.5 w-3.5" /> },
  { id: "routing", label: "Routing", icon: <Globe className="h-3.5 w-3.5" /> },
  { id: "flows", label: "Flows", icon: <Workflow className="h-3.5 w-3.5" />, comingSoon: true },
  { id: "api", label: "API Endpoints", icon: <Plug className="h-3.5 w-3.5" />, comingSoon: true },
];

export function LeftPanel({ collapsed }: LeftPanelProps) {
  const { editorMode, setEditorMode } = useEditorStore();

  if (collapsed) return null;

  return (
    <div className="flex w-48 flex-col border-r bg-background">
      <div className="flex h-9 items-center border-b px-3">
        <span className="text-xs font-medium text-muted-foreground">Project</span>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          <div className="space-y-0.5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => !item.comingSoon && setEditorMode(item.id)}
                disabled={item.comingSoon}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors hover:bg-accent",
                  editorMode === item.id && "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
                  item.comingSoon && "cursor-not-allowed opacity-40 hover:bg-transparent",
                )}
              >
                <span className="shrink-0 text-muted-foreground">{item.icon}</span>
                <span className="flex-1 truncate">{item.label}</span>
                {item.comingSoon && (
                  <span className="shrink-0 text-[9px] text-muted-foreground">Soon</span>
                )}
              </button>
            ))}
          </div>

          <Separator className="my-3" />

          <div className="space-y-0.5">
            <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs opacity-40 cursor-not-allowed hover:bg-transparent" disabled>
              <span className="shrink-0 text-muted-foreground"><Puzzle className="h-3.5 w-3.5" /></span>
              <span className="flex-1 truncate">Components</span>
            </button>
            <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs opacity-40 cursor-not-allowed hover:bg-transparent" disabled>
              <span className="shrink-0 text-muted-foreground"><Palette className="h-3.5 w-3.5" /></span>
              <span className="flex-1 truncate">Theme</span>
            </button>
            <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs opacity-40 cursor-not-allowed hover:bg-transparent" disabled>
              <span className="shrink-0 text-muted-foreground"><Settings className="h-3.5 w-3.5" /></span>
              <span className="flex-1 truncate">Settings</span>
            </button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
