/**
 * 左侧导航面板 — 编辑器模式切换
 *
 * 提供项目级模式导航：页面编辑由内置项驱动，
 * 数据模型、路由、流程、API 端点由插件骨架系统驱动。
 * 新增编辑器模式只需注册插件，无需修改此组件。
 *
 * @author xiye
 * @date 2026-06-14
 */
"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/stores/editor";
import type { EditorMode } from "@/stores/editor.types";
import { FileText, Database, Globe, Workflow, Plug, Puzzle, Palette, Settings } from "lucide-react";
import { PageTreePanel } from "./page-tree-panel";
import type { SkeletonItem } from "@envelope/engine";

/** 左侧面板 Props */
interface LeftPanelProps {
  /** 面板是否处于折叠态（由父组件控制显隐） */
  collapsed: boolean;
  /** 插件注册的 left-nav 骨架项列表 */
  pluginNavItems?: SkeletonItem[];
}

/** 导航项定义 */
interface NavItemDef {
  /** 编辑器模式标识 */
  id: string;
  /** 显示文本 */
  label: string;
  /** 图标（Lucide React 组件） */
  icon: React.ReactNode;
}

/** Lucide 图标名到组件的映射表 */
const ICON_MAP: Record<string, React.ReactNode> = {
  Database: <Database className="h-3.5 w-3.5" />,
  Globe:    <Globe className="h-3.5 w-3.5" />,
  Workflow: <Workflow className="h-3.5 w-3.5" />,
  Plug:     <Plug className="h-3.5 w-3.5" />,
};

/**
 * 左侧导航面板
 *
 * 导航项由两部分组成：
 * 1. 内置项（pages）— 始终显示在顶部
 * 2. 插件项（由 PluginManager skeleton 动态注册）— 显示在内置项下方
 *
 * 新增编辑器模式只需注册插件，left-panel.tsx 零改动。
 */
export function LeftPanel({ collapsed, pluginNavItems }: LeftPanelProps) {
  const { editorMode, setEditorMode } = useEditorStore();

  // 合并内置项 + 插件项
  const navItems = useMemo(() => {
    const builtin: NavItemDef[] = [
      { id: "pages", label: "Pages", icon: <FileText className="h-3.5 w-3.5" /> },
    ];
    const pluginItems: NavItemDef[] = (pluginNavItems ?? []).map((item) => ({
      id: item.name,
      label: item.label,
      icon: ICON_MAP[item.icon ?? ''] ?? <Puzzle className="h-3.5 w-3.5" />,
    }));
    return [...builtin, ...pluginItems];
  }, [pluginNavItems]);

  if (collapsed) return null;

  return (
    <div className="flex w-48 flex-col border-r bg-background">
      <div className="flex h-9 items-center border-b px-3">
        <span className="text-xs font-medium text-muted-foreground">Project</span>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          <div className="space-y-0.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setEditorMode(item.id as EditorMode)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors hover:bg-accent",
                  editorMode === item.id && "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
                )}
              >
                <span className="shrink-0 text-muted-foreground">{item.icon}</span>
                <span className="flex-1 truncate">{item.label}</span>
              </button>
            ))}
          </div>

          {/* G10: Pages 模式下渲染页面树面板 */}
          {editorMode === "pages" && (
            <>
              <Separator className="my-3" />
              <PageTreePanel />
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
