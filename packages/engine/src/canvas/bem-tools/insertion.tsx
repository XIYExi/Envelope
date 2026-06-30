/**
 * 拖拽插入位置指示器
 *
 * 在拖拽过程中实时显示组件将被插入的位置。
 * 参考 lowcode-engine `builtin-simulator/bem-tools/insertion.tsx`
 *
 * 支持三种插入样式：
 * - cover：在目标容器上方显示半透明覆盖层
 * - before：在相邻元素之前显示垂直线段或水平线段
 * - after：在相邻元素之后显示垂直线段或水平线段
 *
 * 当 valid 为 false 时显示红色样式（禁止插入）。
 *
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-29
 * @reference lowcode-engine-main/packages/designer/src/builtin-simulator/bem-tools/insertion.tsx
 */

"use client";

import React from "react";
import type { DropTargetInfo } from "../types";

/**
 * InsertionView 组件属性
 */
interface InsertionViewProps {
  /** 当前拖拽插入位置信息（由 Dragon 或 dnd-kit 回调计算产生） */
  dropTarget: DropTargetInfo | null;
}

/**
 * 拖拽插入位置指示器组件
 *
 * 读取 dropTarget 信息，在画布上渲染插入指示线或覆盖层。
 * 三种模式：
 * - cover：在容器上方显示蓝色虚线边框 + 浅蓝半透明背景
 * - before/after：在相邻元素边缘显示 3px 宽的蓝色线段
 *
 * 当 valid = false 时，所有样式切换为红色，提示用户当前位置不可插入。
 */
export function InsertionView({ dropTarget }: InsertionViewProps) {
  if (!dropTarget) return null;

  const { type, rect, isVertical, valid } = dropTarget;
  const validClass = valid === false ? "invalid" : "";

  // cover 模式：在目标容器上方显示虚线边框 + 半透明背景
  if (type === "cover") {
    return (
      <div
        className={`bem-insertion-cover ${validClass}`}
        style={{
          position: "absolute",
          left: rect.x,
          top: rect.y,
          width: rect.width,
          height: rect.height,
          border: valid === false ? "2px dashed #ef4444" : "2px dashed #3b82f6",
          backgroundColor: valid === false ? "rgba(239,68,68,0.06)" : "rgba(59,130,246,0.08)",
          borderRadius: 6,
          pointerEvents: "none",
          zIndex: 15,
          transition: "all 0.05s linear",
        }}
      />
    );
  }

  // before/after 模式：在相邻元素的边缘显示细线段
  // isVertical 为 true 时显示垂直线段（高 = 相邻元素高度），否则显示水平线段（宽 = 相邻元素宽度）
  if (type === "before" || type === "after") {
    const isV = isVertical ?? true;
    return (
      <div
        className={`bem-insertion-line ${type} ${validClass}`}
        style={{
          position: "absolute",
          pointerEvents: "none",
          zIndex: 15,
          backgroundColor: valid === false ? "#ef4444" : "#3b82f6",
          borderRadius: 1,
          transition: "all 0.05s linear",
          ...(isV
            ? {
              left: rect.x - 1,
              top: rect.y,
              width: 3,
              height: rect.height,
            }
            : {
              left: rect.x,
              top: rect.y - 1,
              width: rect.width,
              height: 3,
            }),
        }}
      />
    );
  }

  return null;
}
