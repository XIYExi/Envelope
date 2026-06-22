/**
 * Playwright/E2E 专用画布演示页
 *
 * 路由：/e2e/canvas
 *
 * 设计目标：
 * - 在不依赖平台其它编辑器 UI 的情况下，提供一个“最小但完整”的 CanvasRenderer 渲染环境
 * - 提供固定示例组件与完全受控的 React state，便于 Playwright 编写稳定断言
 * - 覆盖核心交互：选中/清选、缩放、平移、resize（组件缩放手柄）
 *
 * 注意：
 * - 本页面仅用于 E2E 自动化测试与人工调试，不建议暴露给最终用户
 */

"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type WheelEvent as RWheelEvent } from "react";
import { CanvasRenderer, type CanvasComponent } from "@envelope/engine";
import { Button } from "@/components/ui/button";

/**
 * 缩放值钳制（与画布 Store 的默认约束保持一致）
 *
 * @param value - 原始缩放值
 * @param min - 最小缩放值
 * @param max - 最大缩放值
 * @returns 钳制后的缩放值
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * 创建固定的示例组件列表
 *
 * 关键点：
 * - id 固定：便于 Playwright 使用稳定选择器与断言
 * - node.children 用于覆盖容器组件的嵌套渲染逻辑
 *
 * @returns 画布组件数组
 */
function createExampleComponents(): CanvasComponent[] {
  return [
    {
      id: "e2e-card-1",
      node: {
        id: "e2e-card-1",
        type: "Card",
        category: "layout",
        props: { label: "E2E Card" },
        children: [
          { id: "e2e-card-1-header", type: "CardHeader", category: "layout", props: { label: "Header" } },
          { id: "e2e-card-1-content", type: "CardContent", category: "layout", props: {}, children: [{ id: "e2e-card-1-label", type: "Label", category: "form", props: { label: "Hello Canvas" } }] },
          { id: "e2e-card-1-footer", type: "CardFooter", category: "layout", props: {}, children: [{ id: "e2e-card-1-btn", type: "Button", category: "form", props: { label: "Confirm", variant: "default", size: "sm" } }] },
        ],
      },
      position: { x: 1, y: 1, width: 6, height: 5 },
    },
    {
      id: "e2e-input-1",
      node: {
        id: "e2e-input-1",
        type: "Input",
        category: "form",
        props: { placeholder: "Type here..." },
      },
      // 关键：预留右侧空间，便于 E2E 用例验证 “se 手柄可扩大 width/height”
      position: { x: 7, y: 1, width: 4, height: 2 },
    },
    {
      id: "e2e-badge-1",
      node: {
        id: "e2e-badge-1",
        type: "Badge",
        category: "display",
        props: { label: "Badge", variant: "secondary" },
      },
      // 避免与 e2e-input-1 resize 后发生网格重叠
      position: { x: 7, y: 4, width: 3, height: 1 },
    },
    {
      id: "e2e-textarea-1",
      node: {
        id: "e2e-textarea-1",
        type: "Textarea",
        category: "form",
        props: { placeholder: "Textarea..." },
      },
      position: { x: 1, y: 6, width: 8, height: 4 },
    },
    {
      id: "e2e-skeleton-1",
      node: {
        id: "e2e-skeleton-1",
        type: "Skeleton",
        category: "feedback",
        props: { className: "h-8 w-full" },
      },
      position: { x: 9, y: 6, width: 4, height: 2 },
    },
  ];
}

/**
 * /e2e/canvas 页面组件
 *
 * @returns ReactElement
 */
export default function E2ECanvasPage() {
  const initialComponents = useMemo(() => createExampleComponents(), []);

  const [components, setComponents] = useState<CanvasComponent[]>(initialComponents);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [zoom, setZoom] = useState<number>(1);
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  const [viewportWidth, setViewportWidth] = useState<number>(1440);
  const [pageMaxWidth, setPageMaxWidth] = useState<number>(960);

  const rendererRef = useRef<HTMLDivElement>(null);

  const gridCols = 12;
  const gridGap = 4;

  /**
   * 提取关键组件的位置数据（用于 E2E 断言）
   *
   * @returns 组件 position，若不存在则返回 null（理论上不会发生）
   */
  const input1Position = useMemo(() => {
    const found = components.find((c) => c.id === "e2e-input-1");
    return found ? found.position : null;
  }, [components]);

  /**
   * 选中组件
   *
   * @param id - 组件 ID
   * @param multi - 是否多选模式（Ctrl/Meta/Shift）
   */
  const handleSelect = useCallback((id: string, multi?: boolean) => {
    setSelectedIds((prev) => {
      if (multi) {
        return prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      }
      return [id];
    });
  }, []);

  /** 清空选中状态 */
  const handleClearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  /**
   * 组件缩放（resize）回调
   *
   * @param id - 组件 ID
   * @param width - 新的列跨度
   * @param height - 新的行跨度
   * @param x - 可选：新的起始列（来自 w/n 方向把手）
   * @param y - 可选：新的起始行（来自 w/n 方向把手）
   */
  const handleResize = useCallback((id: string, width: number, height: number, x?: number, y?: number) => {
    setComponents((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        return {
          ...c,
          position: {
            ...c.position,
            x: typeof x === "number" ? x : c.position.x,
            y: typeof y === "number" ? y : c.position.y,
            width,
            height,
          },
        };
      }),
    );
  }, []);

  /**
   * 画布平移回调（绝对值）
   *
   * @param x - 新的平移 x（px）
   * @param y - 新的平移 y（px）
   */
  const handlePan = useCallback((x: number, y: number) => {
    setPanX(x);
    setPanY(y);
  }, []);

  /**
   * Ctrl + 滚轮缩放
   *
   * @param e - React WheelEvent
   */
  const handleWheel = useCallback((e: RWheelEvent) => {
    if (!e.ctrlKey) return;
    e.preventDefault();

    const direction = e.deltaY < 0 ? 1 : -1;
    const factor = direction > 0 ? 1.1 : 1 / 1.1;
    setZoom((z) => clamp(z * factor, 0.25, 2));
  }, []);

  useEffect(() => {
    const el = rendererRef.current;
    if (!el) return;

    /**
     * 关键逻辑：
     * - 需要 passive: false 才能在 Ctrl+滚轮时调用 preventDefault，避免浏览器页面缩放
     */
    const listener = (ev: WheelEvent) => {
      if (!ev.ctrlKey) return;
      ev.preventDefault();

      const direction = ev.deltaY < 0 ? 1 : -1;
      const factor = direction > 0 ? 1.1 : 1 / 1.1;
      setZoom((z) => clamp(z * factor, 0.25, 2));
    };

    el.addEventListener("wheel", listener, { passive: false });
    return () => {
      el.removeEventListener("wheel", listener as EventListener);
    };
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-0px)] flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b bg-background px-4 py-3">
        <div className="text-sm font-medium">E2E Canvas</div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            data-testid="e2e-clear-selection"
            onClick={handleClearSelection}
          >
            清选
          </Button>

          <Button
            size="sm"
            variant="outline"
            data-testid="e2e-zoom-out"
            onClick={() => setZoom((z) => clamp(z / 1.1, 0.25, 2))}
          >
            缩小
          </Button>
          <Button
            size="sm"
            variant="outline"
            data-testid="e2e-zoom-in"
            onClick={() => setZoom((z) => clamp(z * 1.1, 0.25, 2))}
          >
            放大
          </Button>
          <Button
            size="sm"
            variant="outline"
            data-testid="e2e-reset-view"
            onClick={() => {
              setZoom(1);
              setPanX(0);
              setPanY(0);
            }}
          >
            重置视图
          </Button>
          <Button
            size="sm"
            variant="outline"
            data-testid="e2e-reset-components"
            onClick={() => {
              setComponents(initialComponents);
              setSelectedIds([]);
              setZoom(1);
              setPanX(0);
              setPanY(0);
              setViewportWidth(1440);
              setPageMaxWidth(960);
            }}
          >
            重置数据
          </Button>

          <label className="ml-2 inline-flex items-center gap-2 text-xs text-muted-foreground">
            视口宽度
            <input
              data-testid="e2e-viewport-width"
              className="h-8 w-24 rounded-md border bg-background px-2 text-xs text-foreground"
              type="number"
              min={320}
              max={1920}
              value={viewportWidth}
              onChange={(e) => setViewportWidth(Number(e.target.value))}
            />
          </label>

          <label className="ml-2 inline-flex items-center gap-2 text-xs text-muted-foreground">
            页面最大宽度
            <input
              data-testid="e2e-page-max-width"
              className="h-8 w-24 rounded-md border bg-background px-2 text-xs text-foreground"
              type="number"
              min={0}
              max={1920}
              value={pageMaxWidth}
              onChange={(e) => setPageMaxWidth(Number(e.target.value))}
            />
          </label>
        </div>
      </div>

      <div className="flex flex-1">
        <div className="w-[320px] border-r bg-background p-4">
          <div className="text-sm font-medium">受控 State</div>
          <div className="mt-3 space-y-2 text-xs text-muted-foreground">
            <div data-testid="e2e-state-selected">selectedIds: {selectedIds.length === 0 ? "[]" : JSON.stringify(selectedIds)}</div>
            <div data-testid="e2e-state-zoom">zoom: {zoom.toFixed(3)}</div>
            <div data-testid="e2e-state-pan">pan: ({Math.round(panX)}, {Math.round(panY)})</div>
            <div data-testid="e2e-state-page-max-width">pageMaxWidth: {pageMaxWidth}</div>
            <div data-testid="e2e-state-input-1">
              e2e-input-1: {input1Position ? `x=${input1Position.x}, y=${input1Position.y}, w=${input1Position.width}, h=${input1Position.height}` : "null"}
            </div>
          </div>
          <div className="mt-6 text-xs text-muted-foreground">
            操作提示：
            <div className="mt-1">- 点击组件：选中；Ctrl/Shift/Meta + 点击：多选</div>
            <div>- 点击空白：清选</div>
            <div>- 拖拽空白：平移</div>
            <div>- 选中后拖拽八向手柄：resize</div>
            <div>- Ctrl + 滚轮：缩放（浏览器缩放已拦截）</div>
          </div>
        </div>

        <div className="flex flex-1 flex-col" onWheel={handleWheel}>
          <CanvasRenderer
            ref={rendererRef}
            components={components}
            selectedIds={selectedIds}
            onSelect={handleSelect}
            onClearSelection={handleClearSelection}
            onResize={handleResize}
            zoom={zoom}
            viewportWidth={viewportWidth}
            panX={panX}
            panY={panY}
            onPan={handlePan}
            gridCols={gridCols}
            gridGap={gridGap}
            pageBackground="#ffffff"
            pagePadding={16}
            pageMaxWidth={pageMaxWidth}
          />
        </div>
      </div>
    </div>
  );
}
