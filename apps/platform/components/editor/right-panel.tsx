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
import { useCanvasStore, PropertyEditor, buildNodeIndex } from "@envelope/engine";
import { createDefaultRegistry } from "@envelope/materials";
import type { EditableProp, MaterialDefinition } from "@envelope/materials";
import { useFlowBindingStore } from "@envelope/flow";
import { useEditorStore } from "@/stores/editor";
import { useProjectModelsStore } from "@/stores/project-models";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import type { ComponentNode, CanvasComponent } from "@envelope/engine";

/**
 * 批量编辑多选组件的共有属性
 *
 * 收集所有选中组件的类型，取其 editableProps 的交集，显示共有属性编辑器。
 * 值混合时显示 "Mixed" 占位符；修改时调用 batchUpdateSelectedProps 批量更新。
 * 支持根据属性类型分发对应控件：text/number/select/switch/color/textarea 等。
 */
function BatchPropertyEditor({ components, registry, onBatchChange }: {
  components: CanvasComponent[];
  registry: ReturnType<typeof createDefaultRegistry>;
  onBatchChange: (key: string, value: unknown) => void;
}) {
  const types = [...new Set(components.map((c) => c.node.type))];

  const sharedProps = useMemo(() => {
    if (types.length === 0) return [];
    const allPropsList = types.map((t) => registry.get(t)?.editableProps ?? []);
    let intersection: EditableProp[] = allPropsList[0]!;
    for (let i = 1; i < allPropsList.length; i++) {
      const keys = new Set(allPropsList[i]!.map((p) => p.key));
      intersection = intersection.filter((p) => keys.has(p.key));
    }
    return intersection;
  }, [types, registry]);

  /**
   * 获取多选组件的混合值
   * 所有组件值相同时返回该值，不同时返回 "Mixed" 标记
   */
  const getMixedValue = useCallback((key: string): unknown => {
    const vals = components.map((c) => {
      const p = c.node.props as Record<string, unknown> | undefined;
      return p?.[key];
    });
    const first = vals[0];
    if (first === undefined) return undefined;
    return vals.every((v) => v === first) ? first : "Mixed";
  }, [components]);

  const handleChange = useCallback((key: string, value: unknown) => {
    onBatchChange(key, value);
  }, [onBatchChange]);

  if (sharedProps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-3 text-center text-xs text-muted-foreground">
        <p className="font-medium">{components.length} components selected</p>
        <p className="mt-1 text-[10px]">
          Types: {types.join(", ")}
        </p>
        <p className="mt-1 text-[10px]">No shared editable properties</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-3">
      <div className="mb-1 text-[10px] font-medium text-muted-foreground">
        Batch Edit — {components.length} components ({types.join(", ")})
      </div>
      {sharedProps.map((prop) => {
        const mixedValue = getMixedValue(prop.key);
        const isMixed = mixedValue === "Mixed";

        switch (prop.type) {
          case "select": {
            const options = prop.options ?? [];
            return (
              <div key={prop.key}>
                <label className="mb-1 block text-[10px] font-medium text-muted-foreground">{prop.label}</label>
                <select
                  value={isMixed ? "" : (typeof mixedValue === "string" ? mixedValue : "")}
                  onChange={(e) => handleChange(prop.key, e.target.value)}
                  className="h-7 w-full rounded border bg-background px-2 text-xs"
                >
                  {isMixed && <option value="">Mixed</option>}
                  {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            );
          }
          case "switch": {
            const checked = !isMixed && typeof mixedValue === "boolean" ? mixedValue : false;
            return (
              <div key={prop.key} className="flex items-center justify-between">
                <label className="text-[10px] font-medium text-muted-foreground">{prop.label}</label>
                <div className="flex items-center gap-2">
                  {isMixed && <span className="text-[9px] text-muted-foreground">Mixed</span>}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={checked}
                    disabled={isMixed}
                    onClick={() => handleChange(prop.key, !checked)}
                    className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
                      checked ? "bg-blue-500" : "bg-muted"
                    } disabled:opacity-50`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      checked ? "translate-x-[18px]" : "translate-x-[2px]"
                    }`} />
                  </button>
                </div>
              </div>
            );
          }
          case "color": {
            const hexValue = !isMixed && typeof mixedValue === "string" ? mixedValue : "#000000";
            return (
              <div key={prop.key}>
                <label className="mb-1 block text-[10px] font-medium text-muted-foreground">{prop.label}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={hexValue}
                    onChange={(e) => handleChange(prop.key, e.target.value)}
                    className="h-7 w-10 cursor-pointer rounded border p-0"
                  />
                  <input
                    type="text"
                    value={isMixed ? "" : hexValue}
                    placeholder={isMixed ? "Mixed" : "#000000"}
                    onChange={(e) => handleChange(prop.key, e.target.value)}
                    className="h-7 flex-1 rounded border bg-background px-2 font-mono text-[10px]"
                  />
                </div>
              </div>
            );
          }
          case "number": {
            const numValue = !isMixed && typeof mixedValue === "number" ? mixedValue : 0;
            return (
              <div key={prop.key}>
                <label className="mb-1 block text-[10px] font-medium text-muted-foreground">{prop.label}</label>
                <input
                  type="number"
                  value={isMixed ? "" : numValue}
                  placeholder={isMixed ? "Mixed" : String(prop.placeholder ?? "")}
                  min={prop.min}
                  max={prop.max}
                  onChange={(e) => handleChange(prop.key, e.target.value === "" ? undefined : Number(e.target.value))}
                  className="h-7 w-full rounded border bg-background px-2 text-xs"
                />
              </div>
            );
          }
          case "textarea": {
            return (
              <div key={prop.key}>
                <label className="mb-1 block text-[10px] font-medium text-muted-foreground">{prop.label}</label>
                <textarea
                  value={isMixed ? "" : (typeof mixedValue === "string" ? mixedValue : "")}
                  placeholder={isMixed ? "Mixed" : (prop.placeholder ?? "")}
                  rows={3}
                  onChange={(e) => handleChange(prop.key, e.target.value)}
                  className="w-full resize-y rounded border bg-background px-2 py-1 text-xs"
                />
              </div>
            );
          }
          default: {
            return (
              <div key={prop.key}>
                <label className="mb-1 block text-[10px] font-medium text-muted-foreground">{prop.label}</label>
                <input
                  type="text"
                  value={isMixed ? "" : (typeof mixedValue === "string" ? mixedValue : "")}
                  placeholder={isMixed ? "Mixed" : (prop.placeholder ?? `Enter ${prop.label}...`)}
                  onChange={(e) => handleChange(prop.key, e.target.value)}
                  className="h-7 w-full rounded border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            );
          }
        }
      })}
    </div>
  );
}

/**
 * 右侧属性面板
 *
 * - 选中 1 个组件：显示组件 ID、名称、布局位置、动态属性编辑器
 * - 选中多个组件：显示选中数量
 * - 未选中：提示文本
 * - 底部固定：缩放滑块、背景色、内边距（始终可见）
 *
 * U2: 面板折叠由父组件通过条件渲染控制，不再通过 CSS 隐藏
 */
/** 右侧面板 Props */
interface RightPanelProps {
  /** 面板宽度（px），由父组件从 store 传入 */
  width?: number;
}

export function RightPanel({ width }: RightPanelProps = {}) {
  const {
    zoom, setZoom, components, selectedIds, activeNodeId,
    setPageBackground, pageBackground, pagePadding, setPagePadding, pageMaxWidth, setPageMaxWidth,
    setMinRowHeight, minRowHeight,
    updateNode, batchUpdateSelectedProps,
  } = useCanvasStore();

  const flowList = useFlowBindingStore((s) => s.flowList);
  const tableOptions = useProjectModelsStore((s) => s.tables);

  const selected = components.filter((c) => selectedIds.includes(c.id));
  const selectedRoot = selected.length >= 1 ? selected[0] : null;

  const active = useMemo(() => {
    if (!activeNodeId || !selectedRoot) return null;
    const idx = buildNodeIndex([selectedRoot.node]);
    return idx.get(activeNodeId) ?? null;
  }, [activeNodeId, selectedRoot]);

  const activeRootComp: CanvasComponent | null = useMemo(() => {
    if (!selectedRoot) return null;
    return selectedRoot;
  }, [selectedRoot]);

  const activeNodeRef = useRef(active);
  activeNodeRef.current = active;

  const registry = useMemo(() => createDefaultRegistry(), []);

  const material = useMemo(() => {
    if (!active) return null;
    return registry.get(active.type) ?? null;
  }, [active, registry]);

  const editableKeyTypeMapRef = useRef<Map<string, string>>(new Map());
  editableKeyTypeMapRef.current = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of material?.editableProps ?? []) {
      map.set(p.key, p.type);
    }
    return map;
  }, [material]);

  const editorValues = useMemo(() => {
    if (!active) return {};
    const merged: Record<string, unknown> = {
      ...(active.props ?? {}),
      ...(active.dataBindings ?? {}),
      ...(active.eventBindings ?? {}),
    };

    const legacyClassName = typeof active.props?.["className"] === "string" ? String(active.props["className"]) : "";
    const canonical = typeof active.tailwindClasses === "string" ? active.tailwindClasses : "";
    const effective = (canonical || legacyClassName).trim();

    for (const p of material?.editableProps ?? []) {
      if (p.type !== "tailwind") continue;
      merged[p.key] = effective;
    }

    return merged;
  }, [active, material]);

  /**
   * 属性变更处理
   *
   * 更新当前选中组件的指定属性键值对，
   * 其他属性保持不变。
   */
  const handlePropChange = useCallback(
    (key: string, value: unknown) => {
      const node = activeNodeRef.current;
      if (!node) return;
      const type = editableKeyTypeMapRef.current.get(key);

      /**
       * Tailwind 字段写入策略
       *
       * - 真实存储位置：ComponentNode.tailwindClasses
       * - 兼容旧物料：materials 仍可能使用 key=className
       * - 迁移策略：一旦用户编辑 Tailwind 字段，会同步清理 props.className，避免双源漂移
       *
       * @author xiye
       * @date 2026-06-22
       * @since 3.0.0
       */
      if (type === "tailwind") {
        const nextRaw = typeof value === "string" ? value : "";
        const nextTrim = nextRaw.trim();
        const nextTailwindClasses = nextTrim.length > 0 ? nextTrim : undefined;

        const currentProps = node.props ?? {};
        if (Object.prototype.hasOwnProperty.call(currentProps, "className")) {
          const nextProps = { ...currentProps };
          delete nextProps["className"];
          updateNode(node.id, { tailwindClasses: nextTailwindClasses, props: Object.keys(nextProps).length > 0 ? nextProps : undefined });
          return;
        }

        updateNode(node.id, { tailwindClasses: nextTailwindClasses });
        return;
      }

      if (type === "dataBinding") {
        const current = node.dataBindings ?? {};
        const next = { ...current };
        if (typeof value === "string" && value.trim().length > 0) {
          next[key] = value;
        } else {
          delete next[key];
        }
        updateNode(node.id, { dataBindings: Object.keys(next).length > 0 ? next : undefined });
        return;
      }

      // K1+K3: eventBindings 值改为 string[]，支持多 flow 绑定
      if (type === "eventBinding") {
        // U14: 事件白名单校验
        const material = registry.get(node.type);
        if (material?.bindableEvents && !material.bindableEvents.includes(key)) {
          return;
        }
        const current = node.eventBindings ?? {};
        const next = { ...current };
        if (typeof value === "string" && value.trim().length > 0) {
          // K3: 将单值包装为数组，多个 flowId 用逗号分隔
          next[key] = value.split(",").map((s: string) => s.trim()).filter(Boolean);
        } else if (Array.isArray(value) && value.length > 0) {
          next[key] = value;
        } else {
          delete next[key];
        }
        updateNode(node.id, { eventBindings: Object.keys(next).length > 0 ? next : undefined });
        return;
      }

      const currentProps = node.props ?? {};
      const nextProps = { ...currentProps };
      if (value === undefined) {
        delete nextProps[key];
      } else {
        nextProps[key] = value;
      }
      updateNode(node.id, { props: Object.keys(nextProps).length > 0 ? nextProps : undefined });
    },
    [updateNode, registry],
  );

  /**
   * 组件名称变更处理
   */
  const handleNameChange = useCallback(
    (name: string) => {
      const node = activeNodeRef.current;
      if (!node) return;
      updateNode(node.id, { name });
    },
    [updateNode],
  );

  return (
    <div
      data-testid="right-panel"
      className={cn(
        "flex flex-col border-l bg-background transition-all duration-200",
      )}
      style={width !== undefined ? { width } : undefined}
    >
      <div className="flex h-9 items-center border-b px-3">
        <span className="text-xs font-medium text-muted-foreground">Properties</span>
        {material && (
          <span className="ml-auto text-[10px] text-muted-foreground">{material.name}</span>
        )}
      </div>

      <ScrollArea className="flex-1">
        {/* 画布全局设置折叠区 */}
        <Collapsible defaultOpen className="border-b px-3 py-2">
          <CollapsibleTrigger className="flex w-full items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Page Settings
            <ChevronDown className="h-3 w-3" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pt-2">
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
            <div>
              <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Max Width</label>
              <select
                value={pageMaxWidth === null ? "" : String(pageMaxWidth)}
                onChange={(e) => {
                  const raw = e.target.value;
                  setPageMaxWidth(raw === "" ? null : Number(raw));
                }}
                className="h-7 w-full rounded border bg-background px-2 text-xs"
              >
                <option value="">Auto</option>
                <option value="640">640px</option>
                <option value="768">768px</option>
                <option value="1024">1024px</option>
                <option value="1280">1280px</option>
                <option value="1440">1440px</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Min Row Height</label>
              <select
                value={minRowHeight}
                onChange={(e) => setMinRowHeight(Number(e.target.value))}
                className="h-7 w-full rounded border bg-background px-2 text-xs"
              >
                <option value={0}>Auto (content)</option>
                <option value={20}>20px</option>
                <option value={40}>40px</option>
                <option value={60}>60px</option>
                <option value={80}>80px</option>
              </select>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {active && activeRootComp ? (
          <div className="space-y-4 p-3">
            {/* 组件标识区 */}
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Component ID</label>
                <input
                  type="text"
                  value={active.id.slice(0, 16)}
                  disabled
                  className="h-7 w-full rounded border bg-muted/30 px-2 font-mono text-[10px] text-muted-foreground"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Component Name</label>
                <input
                  type="text"
                  value={active.name ?? ""}
                  placeholder={`${active.type}-${active.id.slice(0, 8)}`}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="h-7 w-full rounded border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <Separator />

            {/* 布局位置信息（只读） */}
            {activeRootComp.id === active.id ? (
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Layout</label>
                <div className="grid grid-cols-2 gap-1">
                  {([
                    ["Col", activeRootComp.position.x],
                    ["Row", activeRootComp.position.y],
                    ["Width", activeRootComp.position.width],
                    ["Height", activeRootComp.position.height],
                  ] as const).map(([label, value]) => (
                    <div key={label} className="rounded border bg-muted/30 px-2 py-0.5">
                      <span className="block text-[9px] text-muted-foreground">{label}</span>
                      <span className="text-[10px] font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded border bg-muted/20 px-2 py-2 text-[10px] text-muted-foreground">
                当前为嵌套节点（children），不参与 Grid 布局。
              </div>
            )}

            <Separator />

            {/* 动态属性编辑器（由物料定义驱动） */}
            {material?.editableProps && material.editableProps.length > 0 ? (
              <PropertyEditor
                editableProps={material.editableProps}
                values={editorValues}
                onChange={handlePropChange}
                flowList={flowList}
                tableOptions={tableOptions}
                onNavigateToFlows={() => useEditorStore.getState().setEditorMode("flows")}
              />
            ) : (
              <div className="py-2 text-center text-[10px] text-muted-foreground">
                No editable properties for this component
              </div>
            )}
          </div>
        ) : selected.length > 1 ? (
          <BatchPropertyEditor
            components={selected}
            registry={registry}
            onBatchChange={batchUpdateSelectedProps}
          />
        ) : (
          <div className="flex h-full items-center justify-center p-3 text-center text-xs text-muted-foreground">
            Select a component to view properties
          </div>
        )}
      </ScrollArea>


    </div>
  );
}
