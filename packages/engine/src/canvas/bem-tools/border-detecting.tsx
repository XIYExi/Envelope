/**
 * 组件悬停检测工具
 *
 * 当鼠标悬浮在某个组件上时，在其上方绘制蓝色虚线边框 + 组件名标签。
 * 已选中的组件不显示悬停框（选中框已提供视觉反馈）。
 *
 * 参考 lowcode-engine `builtin-simulator/bem-tools/border-detecting.tsx`：
 * - 拖拽/画布滚动时抑制悬停显示（onHoverHook / viewport.scrolling 等效检查）
 * - 被锁定祖先包裹的子组件显示锁定状态标签
 *
 * @author xiye
 * @version 2.0.0
 * @date 2026-06-30
 * @reference lowcode-engine-main/packages/designer/src/builtin-simulator/bem-tools/border-detecting.tsx
 */
"use client";

import React from "react";
import type { CanvasComponent } from "../types";
import type { CanvasHost } from "../canvas-host";

interface BorderDetectingProps {
  hoveredId: string | null;
  components: CanvasComponent[];
  selectedIds: string[];
  /** 画布统一协调层（V6: 通过 host.getComponentRect 获取 rect） */
  host: CanvasHost;
  /** 画布是否正在滚动/平移中（拖拽平移时抑制悬停框，参考 vp.scrolling） */
  isScrolling?: boolean;
  /** 是否正在拖拽组件（拖拽过程中抑制悬停框，参考 dragon.dragging） */
  isDragging?: boolean;
  /** 是否正在缩放组件（缩放过程中抑制悬停框，参考 dragResizeEngine.isResizing） */
  isResizing?: boolean;
}

/**
 * 检查 hover 的组件或其任意祖先是否被锁定。
 * 锁定属性在 CanvasComponent 层（非 ComponentNode），需要沿根组件链查找。
 * 参考 lowcode-engine getClosestNode(current, n => n.isLocked) 的等效逻辑。
 */
function findLockedAncestor(
  compId: string,
  comps: CanvasComponent[],
): string | null {
  // 检查根组件是否被锁定
  const rootComp = comps.find(c => c.id === compId);
  if (rootComp?.locked) {
    return compId;
  }

  // 检查是否为某个容器组件的嵌套子节点，查找其根组件是否被锁定
  function findRootForNode(nodeId: string, rootNode: CanvasComponent["node"]): string | null {
    if (rootNode.id === nodeId) return rootNode.id;
    for (const child of rootNode.children ?? []) {
      const found = findRootForNode(nodeId, child);
      if (found) return rootNode.id;
    }
    return null;
  }

  for (const comp of comps) {
    const rootId = findRootForNode(compId, comp.node);
    if (rootId && rootId !== compId) {
      // 找到了包含该节点的根组件
      if (comp.locked) return comp.id;
    }
  }
  return null;
}

export function BorderDetecting({
  hoveredId, components, selectedIds, host,
  isScrolling, isDragging, isResizing,
}: BorderDetectingProps) {
  // 无悬停目标 → 不渲染
  if (!hoveredId) return null;

  // 画布滚动/平移中 → 抑制悬停框，避免闪烁（参考 vp.scrolling 检查）
  if (isScrolling) return null;

  // 组件拖拽中 → 抑制悬停框，避免闪烁（参考 dragon.dragging 检查）
  if (isDragging) return null;

  // 组件缩放中 → 抑制悬停框，避免闪烁（参考 dragResizeEngine.isResizing）
  if (isResizing) return null;

  // 已选中 → 选中框已提供视觉反馈，不重复显示悬停框
  if (selectedIds.includes(hoveredId)) return null;

  const comp = components.find(c => c.id === hoveredId);
  if (!comp || comp.hidden) return null;

  // V6: 通过 host.getComponentRect() 统一获取 rect（优先 domRects，fallback computePixelRect）
  const rect = host.getComponentRect(hoveredId);
  if (!rect) return null;

  // 查找最近锁定祖先（参考 getClosestNode → n.isLocked）
  const lockedAncestorId = findLockedAncestor(hoveredId, components);
  const isDescendantOfLocked = !!lockedAncestorId;

  return (
    <div
      className="bem-border-detecting"
      style={{
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        border: isDescendantOfLocked ? "1.5px dashed #f59e0b" : "1.5px dashed #3b82f6",
        borderRadius: "6px",
        pointerEvents: "none",
        zIndex: 10,
        transition: "all 0.08s ease-out",
      }}
    >
      <div
        className="bem-border-detecting-label"
        style={{
          position: "absolute",
          left: 4,
          top: 4,
          fontSize: 9,
          fontWeight: 600,
          color: "#fff",
          backgroundColor: isDescendantOfLocked ? "rgba(245,158,11,0.85)" : "rgba(59,130,246,0.85)",
          padding: "1px 6px",
          borderRadius: 3,
          lineHeight: "16px",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        {comp.node.name?.trim() || comp.node.type}
      </div>
      {/* 被锁定祖先包裹时显示锁定状态标签（参考 lc-borders-status） */}
      {isDescendantOfLocked && (
        <div
          className="bem-border-detecting-status"
          style={{
            position: "absolute",
            left: 4,
            top: 20,
            fontSize: 8,
            fontWeight: 500,
            color: "#f59e0b",
            pointerEvents: "none",
          }}
        >
          🔒 已锁定
        </div>
      )}
    </div>
  );
}
