/**
 * 画布单组件渲染项 - BEM Tools 精简版
 *
 * 仅保留：
 * - useDraggable/useDroppable 绑定（拖拽）
 * - UnifiedSimulatedContent 渲染（内容）
 * - onClick/onMouseEnter/Leave 交互
 *
 * 选中框/缩放手柄/悬停标签/尺寸提示已移至 BEM Tools 覆盖层。
 *
 * @author xiye
 * @date 2026-06-29
 */

"use client";

import React, { useCallback, useState, useRef } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import type { CSSProperties } from "react";
import type { MouseEvent as RMouseEvent } from "react";
import type { CanvasComponent } from "./types";
import { createComponentDragItem } from "./dnd";
import { isContainerType } from "../shared/canvas-utils";
import { useCtrlDown } from "./ctrl-context";
import { cn, CELL_HEIGHT, CELL_WIDTH } from "./renderer-utils";
import { SelectChildContext, UnifiedSimulatedContent } from "./simulated-content";

interface ICanvasComponentItem {
  /**
   * 组件实例
   */
  comp: CanvasComponent;
  /**
   * 组件位置 - 水平方向
   */
  x: number;
  /**
   * 组件位置 - 垂直方向
   */
  y: number;
  /**
   * 组件宽度
   */
  width: number;
  /**
   * 组件高度
   */
  height: number;
  /**
   * 组件预览样式
   */
  previewTailwind: string;
  /**
   * 组件网格列数
   */
  gridCols: number;
  /**
   * 组件选中回调
   */
  onSelect: (id: string, multi?: boolean) => void;
  /**
   * 组件悬停回调
   */
  onHover: (id: string | null) => void;
  /**
   * 组件是否禁用
   */
  isDimmed?: boolean;
  /**
   * 组件子项选中回调
   */
  onSelectChild?: (nodeId: string) => void;
  /**
   * 组件双击回调
   */
  onDoubleClick?: (e: React.MouseEvent) => void;
  /**
   * 组件最小行高
   */
  minRowHeight?: number;
  /**
   * 组件位置模式
   */
  positionMode?: "grid" | "free";
  /**
   * 组件列宽
   */
  columnWidth?: number;
  /**
   * V4-F8: 可内联编辑的 prop 路径列表（来自 material.liveTextEditing.paths）
   */
  liveTextEditingPaths?: string[];
  /**
   * V4-F8: 内联编辑保存回调
   */
  onInlineEdit?: (compId: string, propPath: string, newText: string) => void;
}

export const CanvasComponentItem = React.memo(function CanvasComponentItem({
  comp,
  x,
  y,
  width,
  height,
  previewTailwind,
  gridCols,
  onSelect,
  onHover,
  isDimmed,
  onSelectChild,
  onDoubleClick,
  minRowHeight,
  positionMode = "grid",
  columnWidth,
  liveTextEditingPaths,
  onInlineEdit,
}: ICanvasComponentItem) {
  const isLocked = comp.locked === true;

  // --- 拖拽源绑定 ---
  // 使用 useDraggable 使该组件可被拖拽移动
  // attributes: 拖拽时附加到 DOM 上的属性，用于标识拖拽状态
  // listeners: 拖拽事件监听器（onPointerDown 等），绑定到外层 div
  // setNodeRef: 将 DOM 节点注册到 dnd-kit 的拖拽系统中
  // isDragging: 当前是否正在被拖拽（用于视觉反馈）
  // 若组件被锁定（isLocked），则禁用拖拽
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `canvas-comp:${comp.id}`,
    data: createComponentDragItem(comp.id),
    disabled: isLocked,
  });

  // --- 容器放置目标绑定 ---
  // 使用 useDroppable 使该组件（仅容器类型）可作为其他组件的放置目标
  // setNodeRef(setDropRef): 将同一 DOM 节点注册到放置系统中
  // isOver: 是否有拖拽项正悬停在该组件上方（用于高亮反馈）
  // 非容器类型组件不会注册为放置目标（disabled）
  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `canvas-container:${comp.id}`,
    data: { parentId: comp.id, type: comp.node.type },
    disabled: !isContainerType(comp.node.type),
  });

  // 判断用户是否按下了 Ctrl/Command/Shift 键（用于多选模式）
  const ctrlDown = useCtrlDown();

  // 合并拖拽源和放置目标的 ref，将同一个 DOM 节点同时注册到两个系统中
  const mergedRef = useCallback((node: HTMLDivElement | null) => {
    setNodeRef(node);
    setDropRef(node);
  }, [setNodeRef, setDropRef]);

  // 鼠标进入 → 通知外层当前组件被悬停（用于显示覆盖层/手柄）
  const handleMouseEnter = useCallback(() => { onHover(comp.id); }, [comp.id, onHover]);
  // 鼠标离开 → 通知外层取消悬停
  const handleMouseLeave = useCallback(() => { onHover(null); }, [onHover]);

  // 点击组件 → 选中该组件
  // 阻止事件冒泡，避免触发父级（画布）的取消选中逻辑
  // 若按住 Ctrl/Meta/Shift，则为追加多选模式
  const handleClick = useCallback((e: RMouseEvent) => {
    e.stopPropagation();
    onSelect(comp.id, e.ctrlKey || e.metaKey || e.shiftKey);
  }, [comp.id, onSelect]);

  // V4-F8: 内联文本编辑状态
  const [isInlineEditing, setIsInlineEditing] = useState(false);
  const inlineEditRef = useRef<HTMLDivElement | null>(null);
  const inlineEditPropRef = useRef<string | null>(null);
  const inlineEditOriginalText = useRef<string>("");

  const enterInlineEditing = useCallback(() => {
    if (!liveTextEditingPaths || liveTextEditingPaths.length === 0 || !onInlineEdit) return;
    const propPath = liveTextEditingPaths[0]!;
    const currentProps = (comp.node.props ?? {}) as Record<string, unknown>;
    inlineEditOriginalText.current = String(currentProps[propPath] ?? "");
    inlineEditPropRef.current = propPath;
    setIsInlineEditing(true);
  }, [liveTextEditingPaths, onInlineEdit, comp.node.props]);

  const saveInlineEdit = useCallback(() => {
    if (!isInlineEditing || !inlineEditPropRef.current || !onInlineEdit) {
      setIsInlineEditing(false);
      return;
    }
    const el = inlineEditRef.current;
    const newText = el?.innerText ?? inlineEditOriginalText.current;
    onInlineEdit(comp.id, inlineEditPropRef.current, newText);
    setIsInlineEditing(false);
    inlineEditPropRef.current = null;
  }, [isInlineEditing, onInlineEdit, comp.id]);

  const cancelInlineEdit = useCallback(() => {
    setIsInlineEditing(false);
    inlineEditPropRef.current = null;
  }, []);

  const handleInlineKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      cancelInlineEdit();
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      saveInlineEdit();
    }
  }, [cancelInlineEdit, saveInlineEdit]);

  const handleDoubleClickWithInline = useCallback((e: RMouseEvent) => {
    if (liveTextEditingPaths && liveTextEditingPaths.length > 0 && onInlineEdit) {
      e.stopPropagation();
      // 先选中组件
      onSelect(comp.id, false);
      // 进入内联编辑
      enterInlineEditing();
    } else {
      onDoubleClick?.(e);
    }
  }, [liveTextEditingPaths, onInlineEdit, onSelect, comp.id, enterInlineEditing, onDoubleClick]);

  // 进入内联编辑后自动 focus
  React.useEffect(() => {
    if (isInlineEditing && inlineEditRef.current) {
      const el = inlineEditRef.current;
      el.focus();
      // 选中所有文本
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [isInlineEditing]);

  return (
    // ---- 外层容器 div ----
    // mergedRef: 同时注册到拖拽源和放置目标系统
    // listeners/attributes: 来自 useDraggable 的事件和属性
    // data-* 属性: 供测试和 DOM 选择器识别该组件
    <div
      ref={mergedRef}
      data-canvas-comp="true"
      data-canvas-comp-id={comp.id}
      data-testid={`canvas-comp-${comp.id}`}
      className={cn(
        previewTailwind,
        // 基础样式：相对定位、圆角、边框、过渡动画
        "relative rounded-md border transition-all",
        // 拖拽中 → 半透明，表示正在被拖动
        isDragging && "opacity-50",
        // 有拖拽项悬停时：
        //   容器类型 → 蓝色高亮，提示可放入
        //   非容器类型 → 红色高亮，提示不可放入
        isOver && isContainerType(comp.node.type)
          ? "ring-2 ring-blue-400 bg-blue-50/30"
          : isOver && !isContainerType(comp.node.type)
            ? "ring-2 ring-red-300 bg-red-50/20"
            : "",
        // 禁用态 → 半透明且不可交互
        isDimmed && "opacity-30 pointer-events-none",
        // 默认透明边框，由 BEM Tools 覆盖层提供选中边框
        "border-transparent",
      )}
      // 自由布局模式：用绝对定位 + px 值精确控制位置和尺寸
      // 网格布局模式：用 CSS Grid 的 gridColumn/gridRow 定位（默认）
      style={positionMode === "free" ? {
        position: "absolute" as const,
        left: `${x}px`,
        top: `${y}px`,
        width: `${width * (columnWidth ?? CELL_WIDTH)}px`,
        minHeight: (minRowHeight ?? CELL_HEIGHT) > 0 ? `${height * (minRowHeight ?? CELL_HEIGHT)}px` : `${CELL_HEIGHT * height}px`,
      } : {
        gridColumn: `${x} / span ${width}`,
        gridRow: `${y} / span ${height}`,
        minHeight: (minRowHeight ?? CELL_HEIGHT) > 0 ? `${height * (minRowHeight ?? CELL_HEIGHT)}px` : undefined,
      } as CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onDoubleClick={handleDoubleClickWithInline}
      {...(isInlineEditing ? {} : listeners)}
      {...attributes}
    >
      {/* ---- 内容门控层 ---- */}
      {/* 按住 Ctrl 时允许点击事件穿透到子组件（用于编辑内部元素）      */}
      {/* 否则拦截所有指针事件，保证拖拽和选中行为不受干扰              */}
      {/* V4-F8: 内联编辑时启用 pointerEvents + contentEditable        */}
      <div
        ref={isInlineEditing ? inlineEditRef : undefined}
        className={cn("h-full w-full", isInlineEditing && "outline-none ring-2 ring-blue-400 rounded")}
        style={{ pointerEvents: ctrlDown || isInlineEditing ? "auto" : "none" } as CSSProperties}
        contentEditable={isInlineEditing ? "plaintext-only" : undefined}
        suppressContentEditableWarning={isInlineEditing}
        data-ctrl-gate="true"
        data-live-editing={isInlineEditing ? "true" : undefined}
        onBlur={isInlineEditing ? saveInlineEdit : undefined}
        onKeyDown={isInlineEditing ? handleInlineKeyDown : undefined}
      >
        {/* 提供子节点选中上下文，让内部组件能向画布报告选中事件 */}
        <SelectChildContext.Provider value={onSelectChild ?? null}>
          {/* 渲染组件预览内容（模拟真实组件的 UI 表现） */}
          <UnifiedSimulatedContent comp={comp} variant="root" />
        </SelectChildContext.Provider>
      </div>
    </div>
  );
});
