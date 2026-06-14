/**
 * 画布渲染器
 *
 * 将 CanvasComponent 数组渲染为可视化的 12 列 Grid 布局。
 * 负责：
 * - 渲染网格背景（辅助线）
 * - 渲染所有组件，按网格位置定位
 * - 组件选中状态的视觉反馈（蓝色边框 + 勾选标记）
 * - 缩放变换（CSS transform: scale）
 * - 空画布时的占位提示
 *
 * 本组件是纯展示层，不直接操作 store，
 * 所有交互通过 props 回调（onSelect、onClearSelection）向上传递。
 *
 * @author xiye
 * @date 2026/6/13
 */
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import type { CanvasComponent } from "./types";

/** 单行网格的像素高度（用于计算组件的 minHeight） */
const CELL_HEIGHT = 40;

/**
 * 合并 Tailwind CSS 类名
 *
 * 使用 tailwind-merge 处理冲突的类名（如 p-2 和 p-4），
 * 确保后者覆盖前者。
 */
function cn(...inputs: Parameters<typeof twMerge>) {
  return twMerge(...inputs);
}

/**
 * 画布渲染器 Props
 */
interface CanvasRendererProps {
  /** 要渲染的组件列表 */
  components: CanvasComponent[];
  /** 当前选中的组件 ID 列表 */
  selectedIds: string[];
  /** 组件点击回调（支持多选） */
  onSelect: (id: string, multi?: boolean) => void;
  /** 点击空白区域时清空选中 */
  onClearSelection: () => void;
  /** 缩放比例 */
  zoom: number;
}

/**
 * 画布渲染器组件
 *
 * 使用 forwardRef 暴露底层 DOM 引用，
 * 便于外部获取画布尺寸、截图等操作。
 *
 * 布局结构：
 * ┌─────────────────────────────────┐
 * │  div (ref, zoom transform)      │
 * │  ├─ 网格背景（CSS 伪元素）       │
 * │  └─ div (grid-cols-12)          │
 * │     ├─ 空状态占位               │
 * │     └─ 组件列表（grid 定位）     │
 * └─────────────────────────────────┘
 */
export const CanvasRenderer = forwardRef<HTMLDivElement, CanvasRendererProps>(
  function CanvasRenderer(
    { components, selectedIds, onSelect, onClearSelection, zoom },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className="relative min-h-[600px] w-full rounded-lg border bg-background shadow-sm"
        style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
        onClick={(e) => {
          // 点击空白区域时清空选中（只有点击容器本身才触发，子元素会 stopPropagation）
          if (e.target === e.currentTarget) {
            onClearSelection();
          }
        }}
      >
        {/* 网格背景辅助线（纯视觉，不响应点击） */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(128,128,128,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.05) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* 12 列 Grid 容器 */}
        <div className="relative grid grid-cols-12 gap-1 p-4">
          {/* 空画布占位提示 */}
          {components.length === 0 && (
            <div className="col-span-12 flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <p className="text-sm font-medium">Drop components here</p>
              <p className="mt-1 text-xs">Drag from the component panel on the left</p>
            </div>
          )}

          {/* 渲染所有组件 */}
          {components.map((comp) => {
            // 解构位置信息
            const { x: rawX, y: rawY, width: rawW, height: rawH } = comp.position;
            // 过滤无效位置（坐标或尺寸小于 1 的组件不渲染）
            if (rawX < 1 || rawY < 1 || rawW < 1 || rawH < 1) return null;

            // 限制在网格范围内，防止组件超出边界
            const x = Math.max(1, Math.min(12, rawX));
            const y = Math.max(1, rawY);
            const width = Math.max(1, Math.min(12 - x + 1, rawW));
            const height = Math.max(1, rawH);
            const isSelected = selectedIds.includes(comp.id);

            return (
              <div
                key={comp.id}
                className={cn(
                  "relative cursor-move rounded-md border-2 border-transparent p-2 transition-colors hover:border-blue-300",
                  isSelected && "border-blue-500 ring-2 ring-blue-200",
                )}
                style={{
                  gridColumn: `${x} / span ${width}`,
                  gridRow: `${y} / span ${height}`,
                  minHeight: `${height * CELL_HEIGHT}px`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  // 支持 Ctrl/Shift 多选
                  onSelect(comp.id, e.ctrlKey || e.metaKey || e.shiftKey);
                }}
              >
                {/* 组件内容占位（当前只显示类型名称） */}
                <div className="flex h-full items-center justify-center rounded bg-muted/50">
                  <span className="text-xs font-medium text-muted-foreground">
                    {comp.node.type}
                  </span>
                </div>
                {/* 选中状态标记（右上角蓝色勾选） */}
                {isSelected && (
                  <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
