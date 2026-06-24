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

import { useState, useMemo, memo, useCallback, useRef, useEffect } from "react";
import type { ComponentType } from "react";
import { useDraggable } from "@dnd-kit/core";
import { createDefaultRegistry } from "@envelope/materials";
import { createMaterialDragItem } from "@envelope/engine";
import type { ComponentCategory, MaterialDefinition } from "@envelope/materials";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ComponentTreePanel } from "./component-tree-panel";
import { MaterialThumbnail } from "./material-thumbnail";
import { useRecentMaterialsStore } from "@/stores/recent-materials-store";
import { useFavoriteMaterialsStore } from "@/stores/favorite-materials-store";

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

function MaterialIcon({ icon }: { icon?: string }) {
  const Icon = (icon ? (LucideIcons as unknown as Record<string, ComponentType<{ className?: string }>>)[icon] : undefined)
    ?? LucideIcons.Square;
  return <Icon className="h-4 w-4 text-muted-foreground" />;
}

/**
 * 单个可拖拽物料项
 *
 * 使用 @dnd-kit/core 的 useDraggable hook 注册为可拖拽源。
 * data 负载包含 createMaterialDragItem 返回的 { type, materialName }。
 * 支持缩略图预览、复合物料标记、拖拽/点击记录使用。
 */
const MaterialItem = memo(function MaterialItem({
  material,
  onAdd,
  onDragStart,
}: {
  material: MaterialDefinition;
  onAdd?: (name: string) => void;
  onDragStart?: (name: string) => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `material-${material.name}`,
    data: createMaterialDragItem(material.name),
  });

  // 拖拽开始时记录使用
  const prevDragging = useRef(false);
  useEffect(() => {
    if (isDragging && !prevDragging.current) {
      onDragStart?.(material.name);
    }
    prevDragging.current = isDragging;
  }, [isDragging, onDragStart, material.name]);

  // 判断是否为复合物料（有 expandTo 或 slots 配置）
  const isComposite = (material.expandTo && material.expandTo.length > 0)
    || (material.slots && material.slots.length > 0);

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() => {
        onAdd?.(material.name);
        onDragStart?.(material.name);
      }}
      data-testid={`material-item-${material.name}`}
      className={cn(
        "relative flex cursor-grab items-start gap-2 rounded-md border px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground touch-none",
        isDragging && "opacity-50",
      )}
    >
      {/* 缩略图预览：有 thumbnail 配置时渲染，否则回退到 Lucide icon */}
      {material.thumbnail ? (
        <MaterialThumbnail material={material} />
      ) : (
        <MaterialIcon icon={material.icon} />
      )}
      <div className="min-w-0 flex-1">
        <div className="truncate leading-5">{material.displayName}</div>
        {material.description && (
          <div className="line-clamp-2 text-xs leading-4 text-muted-foreground">
            {material.description}
          </div>
        )}
      </div>

      {/* 复合物料标记：右下角蓝色 C 徽标 */}
      {isComposite && (
        <span className="absolute -bottom-0.5 -right-0.5 rounded-sm bg-blue-500 px-0.5 text-[7px] leading-3 text-white">
          C
        </span>
      )}
    </div>
  );
});

/** 素材面板 Props */
interface MaterialPanelProps {
  /** 左面板是否折叠（用于联动显隐） */
  collapsed: boolean;
  /** 点击添加（非拖拽） */
  onAddMaterial?: (name: string) => void;
}

/**
 * 素材面板
 *
 * 使用 Tabs 组件按分类展示物料。
 * 默认激活 "layout" 分类标签。
 * 每个分类标签右侧显示该分类下的组件数量。
 * 空分类显示 "Coming soon" 占位文字。
 */
export function MaterialPanel({ collapsed, onAddMaterial }: MaterialPanelProps) {
  const [panelTab, setPanelTab] = useState<string>("palette");
  const [activeTab, setActiveTab] = useState<string>("layout");

  const registry = useMemo(() => createDefaultRegistry(), []);

  const [searchQuery, setSearchQuery] = useState("");

  // 最近使用和收藏数据
  const recentNames = useRecentMaterialsStore((s) => s.recentNames);
  const favoriteNames = useFavoriteMaterialsStore((s) => s.favoriteNames);
  // 反转最近使用列表，最新在前
  const recentList = useMemo(() => [...recentNames].reverse(), [recentNames]);

  // 拖拽开始时记录使用
  const handleDragStart = useCallback((name: string) => {
    useRecentMaterialsStore.getState().recordUse(name);
  }, []);

  const allMaterials = useMemo(() => registry.getAll(), [registry]);
  const filteredMaterials = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.trim().toLowerCase();
    return allMaterials.filter(
      (m) =>
        m.showInPalette !== false &&
        (m.displayName.toLowerCase().includes(q) ||
          m.name.toLowerCase().includes(q) ||
          (m.description && m.description.toLowerCase().includes(q))),
    );
  }, [searchQuery, allMaterials]);

  const getVisibleByCategory = useCallback(
    (cat: ComponentCategory) => registry.getByCategory(cat).filter((m) => m.showInPalette !== false),
    [registry],
  );

  return (
    <div
      data-testid="material-panel"
      className={cn(
        "flex flex-col border-r bg-background transition-all duration-200",
        collapsed ? "w-0 overflow-hidden border-r-0" : "w-64",
      )}
    >
      <div className="flex h-9 items-center border-b px-3">
        <span className="text-xs font-medium text-muted-foreground">Components</span>
      </div>

      <Tabs value={panelTab} onValueChange={setPanelTab} className="flex flex-1 min-h-0 flex-col">
        <TabsList className="grid grid-cols-2 rounded-none border-b bg-transparent p-1">
          <TabsTrigger value="palette" className="h-7 text-xs data-[state=active]:bg-muted">组件库</TabsTrigger>
          <TabsTrigger value="tree" className="h-7 text-xs data-[state=active]:bg-muted">组件树</TabsTrigger>
        </TabsList>

        <TabsContent value="palette" className="flex min-h-0 flex-1 flex-col p-0">
          {/* 搜索输入框 — 按名称、显示名、描述过滤所有分类的物料 */}
          <div className="flex-shrink-0 border-b px-2 py-1.5">
            <Input
              placeholder="搜索物料..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 text-xs"
            />
            {searchQuery && (
              <div className="mt-1 text-[10px] text-muted-foreground">
                匹配 {filteredMaterials?.length ?? 0} 个物料
                <button
                  className="ml-2 underline hover:text-foreground"
                  onClick={() => setSearchQuery("")}
                >
                  清除
                </button>
              </div>
            )}
          </div>

          {filteredMaterials !== null ? (
            /* 搜索结果模式：平铺列表，不显示分类 */
            <ScrollArea className="flex-1">
              <div className="space-y-1 p-2">
                {filteredMaterials.length === 0 ? (
                  <p className="px-2 py-8 text-center text-xs text-muted-foreground">
                    未找到匹配的物料
                  </p>
                ) : (
                  filteredMaterials.map((mat) => (
                    <MaterialItem
                      key={mat.name}
                      material={mat}
                      onAdd={onAddMaterial}
                      onDragStart={handleDragStart}
                    />
                  ))
                )}
              </div>
            </ScrollArea>
          ) : (
            /* 分类浏览模式：收藏 + 最近使用 + 分类 Tab */
            <>
              {/* 收藏物料分区：仅在有收藏且非搜索时显示 */}
              {favoriteNames.length > 0 && (
                <div className="flex-shrink-0 border-b px-3 py-2">
                  <div className="mb-1 text-[10px] font-medium text-muted-foreground">⭐ 收藏</div>
                  <div className="grid grid-cols-5 gap-1">
                    {favoriteNames.slice(0, 10).map((name) => {
                      const m = registry.get(name);
                      if (!m) return null;
                      return (
                        <MaterialItem key={name} material={m} onDragStart={handleDragStart} />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 最近使用分区：仅在有使用时且非搜索时显示 */}
              {recentList.length > 0 && (
                <div className="flex-shrink-0 border-b px-3 py-2">
                  <div className="mb-1 text-[10px] font-medium text-muted-foreground">🕐 最近使用</div>
                  <div className="grid grid-cols-5 gap-1">
                    {recentList.slice(0, 5).map((name) => {
                      const m = registry.get(name);
                      if (!m) return null;
                      return (
                        <MaterialItem key={name} material={m} onDragStart={handleDragStart} />
                      );
                    })}
                  </div>
                </div>
              )}

              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col min-h-0">
              {/* 分类 Tab 列表 — 固定在搜索框下方，不随内容滚动 */}
              <div className="flex-shrink-0 border-b px-1">
                <TabsList className="flex h-auto w-full flex-wrap justify-start gap-0.5 rounded-none bg-transparent p-1">
                  {CATEGORIES.map((cat) => {
                    const count = getVisibleByCategory(cat.key).length;
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
              </div>

              {/* 内容区 — 仅内容可在 ScrollArea 内滚动 */}
              <ScrollArea className="flex-1">
                {CATEGORIES.map((cat) => {
                  const materials = getVisibleByCategory(cat.key);
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
                            material={mat}
                            onAdd={onAddMaterial}
                            onDragStart={handleDragStart}
                          />
                        ))
                      )}
                    </TabsContent>
                  );
                })}
              </ScrollArea>
            </Tabs>
            </>
          )}
        </TabsContent>

        <TabsContent value="tree" className="flex min-h-0 flex-1 flex-col p-0">
          <ComponentTreePanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export { type MaterialPanelProps };
