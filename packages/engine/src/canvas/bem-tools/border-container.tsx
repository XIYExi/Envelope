/**
 * BorderContainer — 容器边界指示器
 *
 * 在拖拽过程中，当 dropTarget 指向一个容器组件时，
 * 在容器上方显示蓝色虚线边框和组件类型标签。
 *
 * 参考 lowcode-engine `builtin-simulator/bem-tools/border-container.tsx`
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-30
 * @reference lowcode-engine-main/packages/designer/src/builtin-simulator/bem-tools/border-container.tsx
 */
"use client";

import React from "react";
import type { CanvasComponent, DropTargetInfo } from "../types";
import type { CanvasHost } from "../canvas-host";
import { isContainerType } from "../../shared/canvas-utils";

interface BorderContainerProps {
  dropTarget: DropTargetInfo | null;
  components: CanvasComponent[];
  /** 画布统一协调层（V6: 通过 host.getComponentRect 获取 rect） */
  host: CanvasHost;
}

export function BorderContainer({
  dropTarget, components, host,
}: BorderContainerProps) {
  if (!dropTarget || dropTarget.type !== "cover") return null;

  const containerId = dropTarget.containerId;
  if (!containerId) return null;

  const comp = components.find(c => c.id === containerId && !c.hidden);
  if (!comp) return null;
  if (!isContainerType(comp.node.type)) return null;

  // V6: 通过 host.getComponentRect() 统一获取 rect（优先 domRects，fallback computePixelRect）
  const pixelRect = host.getComponentRect(containerId);

  if (!pixelRect || pixelRect.width <= 0 || pixelRect.height <= 0) return null;

  return (
    <div
      className="bem-border-container"
      style={{
        position: "absolute",
        left: pixelRect.x,
        top: pixelRect.y,
        width: pixelRect.width,
        height: pixelRect.height,
        border: "2px dashed #3b82f6",
        borderRadius: "6px",
        backgroundColor: "rgba(59,130,246,0.06)",
        pointerEvents: "none",
        zIndex: 12,
        transition: "all 0.08s ease-out",
      }}
    >
      <div
        className="bem-border-container-label"
        style={{
          position: "absolute",
          left: 4,
          top: 4,
          fontSize: 9,
          fontWeight: 600,
          color: "#fff",
          backgroundColor: "rgba(59,130,246,0.85)",
          padding: "1px 6px",
          borderRadius: 3,
          lineHeight: "16px",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        {comp.node.name?.trim() || comp.node.type}
      </div>
    </div>
  );
}
