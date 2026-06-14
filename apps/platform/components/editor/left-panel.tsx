/**
 * 左侧导航面板 — 编辑器模式切换
 *
 * 提供项目级模式导航：页面编辑、数据模型、路由、流程（开发中）、API（开发中）。
 * 下方保留组件库、主题、设置等占位（Coming Soon）。
 *
 * @author xiye
 * @date 2026-06-14
 */
"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/stores/editor";
import type { EditorMode } from "@/stores/editor.types";
import { FileText, Database, Workflow, Globe, Plug, Puzzle, Palette, Settings } from "lucide-react";

/** 左侧面板 Props */
interface LeftPanelProps {
  /** 面板是否处于折叠态（由父组件控制显隐） */
  collapsed: boolean;
}

/** 导航项定义 */
interface NavItemDef {
  /** 编辑器模式标识 */
  id: EditorMode;
  /** 显示文本 */
  label: string;
  /** 图标（Lucide React 组件） */
  icon: React.ReactNode;
  /** 是否标记为开发中（禁用交互） */
  comingSoon?: boolean;
}

/** 主导航项配置 */
const NAV_ITEMS: NavItemDef[] = [
  { id: "pages", label: "Pages", icon: <FileText className="h-3.5 w-3.5" /> },
  { id: "data-models", label: "Data Models", icon: <Database className="h-3.5 w-3.5" /> },
  { id: "routing", label: "Routing", icon: <Globe className="h-3.5 w-3.5" /> },
  { id: "flows", label: "Flows", icon: <Workflow className="h-3.5 w-3.5" />, comingSoon: true },
  { id: "api", label: "API Endpoints", icon: <Plug className="h-3.5 w-3.5" />, comingSoon: true },
];

/**
 * 左侧导航面板
 *
 * 模式切换时直接调用 setEditorMode，不主动重置其他状态。
 * 各子编辑器自行在挂载时初始化所需状态。
 */
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
