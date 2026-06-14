/**
 * 素材面板 — 可拖拽的组件物料列表
 *
 * 按分类（Layout、Form、Display 等）展示所有可用组件，
 * 用户拖拽物料到画布放置区以添加新组件。
 *
 * @author xiye
 * @date 2026-06-14
 */
"use client";

import { useState, useMemo, memo } from "react";
import { useDraggable } from "@dnd-kit/core";
import { createDefaultRegistry } from "@envelope/materials";
import { createMaterialDragItem } from "@envelope/engine";
import type { ComponentCategory } from "@envelope/materials";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/** 分类配置 */
const CATEGORIES: { key: ComponentCategory; label: string }[] = [
  { key: "layout", label: "Layout" },
  { key: "form", label: "Form" },
  { key: "display", label: "Display" },
  { key: "feedback", label: "Feedback" },
  { key: "navigation", label: "Navigation" },
  { key: "data", label: "Data" },
  { key: "overlay", label: "Overlay" },
];

/**
 * 单个可拖拽物料项
 *
 * 使用 @dnd-kit/core 的 useDraggable hook 注册为可拖拽源。
 * data 负载包含 createMaterialDragItem 返回的 { type, materialName }。
 */
const MaterialItem = memo(function MaterialItem({ name, displayName }: { name: string; displayName: string }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `material-${name}`,
    data: createMaterialDragItem(name),
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "flex cursor-grab items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
        isDragging && "opacity-50",
      )}
    >
      <span className="truncate">{displayName}</span>
    </div>
  );
});

/** 素材面板 Props */
interface MaterialPanelProps {
  /** 左面板是否折叠（用于联动显隐） */
  collapsed: boolean;
}

/**
 * 素材面板
 *
 * 使用 Tabs 组件按分类展示物料。
 * 默认激活 "layout" 分类标签。
 * 每个分类标签右侧显示该分类下的组件数量。
 * 空分类显示 "Coming soon" 占位文字。
 */
export function MaterialPanel({ collapsed }: MaterialPanelProps) {
  const [activeTab, setActiveTab] = useState<string>("layout");

  const registry = useMemo(() => createDefaultRegistry(), []);

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-background transition-all duration-200",
        collapsed ? "w-0 overflow-hidden border-r-0" : "w-64",
      )}
    >
      <div className="flex h-9 items-center border-b px-3">
        <span className="text-xs font-medium text-muted-foreground">Components</span>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col">
        <ScrollArea className="flex-1">
          {/* 分类标签栏 */}
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-0.5 rounded-none border-b bg-transparent p-1">
            {CATEGORIES.map((cat) => {
              const count = registry.getByCategory(cat.key).length;
              return (
                <TabsTrigger
                  key={cat.key}
                  value={cat.key}
                  className={cn(
                    "h-7 rounded-sm px-2 text-xs data-[state=active]:bg-muted",
                    count === 0 && "opacity-40",
                  )}
                >
                  {cat.label}
                  {count > 0 && (
                    <span className="ml-1 text-[10px] text-muted-foreground">{count}</span>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* 分类内容 */}
          {CATEGORIES.map((cat) => {
            const materials = registry.getByCategory(cat.key);
            return (
              <TabsContent key={cat.key} value={cat.key} className="space-y-1 p-2">
                {materials.length === 0 ? (
                  <p className="px-2 py-4 text-center text-xs text-muted-foreground">
                    Coming soon
                  </p>
                ) : (
                  materials.map((mat) => (
                    <MaterialItem
                      key={mat.name}
                      name={mat.name}
                      displayName={mat.displayName}
                    />
                  ))
                )}
              </TabsContent>
            );
          })}
        </ScrollArea>
      </Tabs>
    </div>
  );
}

export { type MaterialPanelProps };
