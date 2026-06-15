/**
 * 右侧属性面板 — 组件属性编辑、画布缩放、页面背景/内边距
 *
 * 选中单个组件时显示其可编辑属性（由物料定义的 editableProps 驱动）。
 * 同时提供画布缩放滑块、背景色选择器和内边距设置。
 *
 * @author xiye
 * @date 2026-06-14
 */
"use client";

import { useMemo, useCallback, useRef } from "react";
import { useCanvasStore, PropertyEditor } from "@envelope/engine";
import { createDefaultRegistry } from "@envelope/materials";
import { useFlowBindingStore } from "@envelope/flow";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

/** 右侧面板 Props */
interface RightPanelProps {
  /** 面板是否处于折叠态 */
  collapsed: boolean;
}

/**
 * 右侧属性面板
 *
 * - 选中 1 个组件：显示组件 ID、名称、布局位置、动态属性编辑器
 * - 选中多个组件：显示选中数量
 * - 未选中：提示文本
 * - 底部固定：缩放滑块、背景色、内边距（始终可见）
 */
export function RightPanel({ collapsed }: RightPanelProps) {
  const {
    zoom, setZoom, components, selectedIds,
    setPageBackground, pageBackground, pagePadding, setPagePadding,
    updateComponent,
  } = useCanvasStore();

  const flowList = useFlowBindingStore((s) => s.flowList);

  const selected = components.filter((c) => selectedIds.includes(c.id));
  const selectedComp = selected.length === 1 ? selected[0] : null;

  // 用 ref 持有最新的 selectedComp，避免 handlePropChange/handleNameChange 的依赖变化
  const selectedCompRef = useRef(selectedComp);
  selectedCompRef.current = selectedComp;

  const registry = useMemo(() => createDefaultRegistry(), []);

  const material = useMemo(() => {
    if (!selectedComp) return null;
    return registry.get(selectedComp.node.type) ?? null;
  }, [selectedComp, registry]);

  /**
   * 属性变更处理
   *
   * 更新当前选中组件的指定属性键值对，
   * 其他属性保持不变。
   */
  const handlePropChange = useCallback(
    (key: string, value: unknown) => {
      const comp = selectedCompRef.current;
      if (!comp) return;
      const currentProps = comp.node.props ?? {};
      updateComponent(comp.id, {
        node: {
          ...comp.node,
          props: {
            ...currentProps,
            [key]: value,
          },
        },
      });
    },
    [updateComponent],
  );

  /**
   * 组件名称变更处理
   */
  const handleNameChange = useCallback(
    (name: string) => {
      const comp = selectedCompRef.current;
      if (!comp) return;
      updateComponent(comp.id, {
        node: {
          ...comp.node,
          name,
        },
      });
    },
    [updateComponent],
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
            {/* 组件标识区 */}
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

            {/* 布局位置信息（只读） */}
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

            {/* 动态属性编辑器（由物料定义驱动） */}
            {material?.editableProps && material.editableProps.length > 0 ? (
              <PropertyEditor
                editableProps={material.editableProps}
                values={(selectedComp.node.props ?? {}) as Record<string, unknown>}
                onChange={handlePropChange}
                flowList={flowList}
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

      {/* 画布全局设置（始终可见） */}
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
