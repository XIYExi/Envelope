/**
 * 组件悬停检测工具
 *
 * 当鼠标悬浮在某个组件上时，在其上方绘制蓝色虚线边框 + 组件名标签。
 * 已选中的组件不显示悬停框（选中框已提供视觉反馈）。
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-29
 */
"use client";

import type { CanvasComponent } from "../types";
import { computePixelRect } from "./shared";

interface BorderDetectingProps {
  /** 当前鼠标悬停所在的组件 ID */
  hoveredId: string | null;
  /** 画布上所有组件实例 */
  components: CanvasComponent[];
  /** 已选中组件 ID 列表（已选中的不重复显示悬停框） */
  selectedIds: string[];
  /** 每列宽度（px） */
  columnWidth: number;
  /** 网格间距（px） */
  gridGap: number;
  /** 页面内边距（px） */
  pagePadding: number;
  /** 单元格基准宽度（px） */
  cellWidth: number;
  /** 单元格基准高度（px） */
  cellHeight: number;
  /** 布局模式 */
  positionMode: "grid" | "free";
}

export function BorderDetecting({
  hoveredId, components, selectedIds,
  columnWidth, gridGap, pagePadding, cellWidth, cellHeight, positionMode,
}: BorderDetectingProps) {
  // 没有悬停目标 → 不渲染
  if (!hoveredId)
    return null;

  // 如果悬停的组件已经被选中，用选中框代替悬停框
  if (selectedIds.includes(hoveredId))
    return null;

  // 查找被悬停的组件实例
  const comp = components.find(c => c.id === hoveredId);
  // 找不到或已隐藏 → 不渲染
  if (!comp || comp.hidden)
    return null;

  // 计算组件的像素坐标和尺寸
  const rect = computePixelRect(comp.position, columnWidth, gridGap, pagePadding, cellWidth, cellHeight, positionMode);
  if (!rect)
    return null;

  return (
    // 悬停框：蓝色虚线边框，覆盖在组件上方
    <div
      className="bem-border-detecting"
      style={{
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        border: "1.5px dashed #3b82f6",
        borderRadius: "6px",
        pointerEvents: "none",
        zIndex: 10,
        transition: "all 0.08s ease-out",
      }}
    >
      {/* 悬停标签：左上角显示组件名称或类型 */}
      <div
        className="bem-border-detecting-label"
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
