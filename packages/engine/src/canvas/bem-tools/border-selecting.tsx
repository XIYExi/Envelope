/**
 * 组件选中框容器属性
 * 
 * 用于绘制选中框（蓝色边框/虚线框）和操作工具栏（删除/复制/锁定）。
 * 并在主选中组件上显示尺寸提示。
 * 
 * @author xiye
 * @version 1.0.0
 * @date 2026-06-29
 */
"use client";

import React, { useCallback, useMemo } from "react";
import type { CanvasComponent } from "../types";
import { computePixelRect } from "./shared";
import { createDefaultRegistry, buildAvailableActions } from "@envelope/materials";
import { Copy, Trash2, Lock, Unlock, Move, EyeOff } from "lucide-react";

/** Lucide 图标映射表：操作名称 → React 图标组件 */
const ACTION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Copy, Trash2, Lock, Unlock, Move, EyeOff,
};

/**
 * 组件选中框容器属性
 */
interface BorderSelectingProps {
  /** 画布上所有组件实例 */
  components: CanvasComponent[];
  /** 已选中组件 ID 列表 */
  selectedIds: string[];
  /** 当前选中的组件 ID */
  activeNodeId: string | null;
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
  /** 删除组件点击事件处理函数 */
  onDeleteComponent: (id: string) => void;
  /** 复制组件点击事件处理函数 */
  onCopyComponent: (id: string) => void;
  /** 锁定组件点击事件处理函数 */
  onLockToggle: (id: string) => void;
}

/**
 * 选中框组件
 *
 * 为所有被选中的组件绘制蓝色边框/虚线框，
 * 并在主选中组件上显示操作工具栏（删除/复制/锁定）和尺寸提示。
 */
export function BorderSelecting({
  components, selectedIds, activeNodeId,
  columnWidth, gridGap, pagePadding, cellWidth, cellHeight, positionMode,
  onDeleteComponent, onCopyComponent, onLockToggle,
}: BorderSelectingProps) {
  // 没有选中项时直接返回
  if (selectedIds.length === 0) return null;

  // 过滤出可见的选中组件
  const selected = components.filter(c => selectedIds.includes(c.id) && !c.hidden);
  if (selected.length === 0) return null;

  /** 通用操作回调：根据 actionName dispatch 到对应的存储操作 */
  const handleAction = useCallback((actionName: string, id: string) => {
    switch (actionName) {
      case 'delete': onDeleteComponent(id); break;
      case 'copy':   onCopyComponent(id); break;
      case 'lock':   onLockToggle(id); break;
      case 'unlock': onLockToggle(id); break;
    }
  }, [onDeleteComponent, onCopyComponent, onLockToggle]);

  return (
    <>
      {selected.map(comp => {
        // 判断是否为"主选中"组件（显示工具栏和尺寸提示的那个）
        // 优先使用 activeNodeId，若无则取选中列表的第一个
        const isPrimary = activeNodeId
          ? activeNodeId === comp.id
          : selectedIds.length > 0 && selectedIds[0] === comp.id;

        return (
          <BorderBox
            key={comp.id}
            comp={comp}
            isPrimary={isPrimary}
            columnWidth={columnWidth}
            gridGap={gridGap}
            pagePadding={pagePadding}
            cellWidth={cellWidth}
            cellHeight={cellHeight}
            positionMode={positionMode}
            onAction={handleAction}
          />
        );
      })}
    </>
  );
}

/**
 * 单个选中框属性
 */
interface BorderBoxProps {
  /** 组件实例 */
  comp: CanvasComponent;
  /** 是否为"主选中"组件（显示工具栏和尺寸提示的那个） */
  isPrimary: boolean;
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
  /** 操作按钮点击回调，actionName 对应 ComponentAction.name */
  onAction: (actionName: string, id: string) => void;
}

/**
 * 单个选中框渲染
 *
 * 根据组件位置计算出像素矩形，在其上覆盖边框，
 * 主选中组件额外显示顶部操作栏和底部尺寸提示。
 */
const BorderBox = React.memo(function BorderBox({
  comp, isPrimary,
  columnWidth, gridGap, pagePadding, cellWidth, cellHeight, positionMode,
  onAction,
}: BorderBoxProps) {
  // 将组件网格坐标转换为像素坐标
  const rect = computePixelRect(comp.position, columnWidth, gridGap, pagePadding, cellWidth, cellHeight, positionMode);
  if (!rect) return null;

  // 根据物料定义动态计算可用操作列表
  const registry = useMemo(() => createDefaultRegistry(), []);
  const actions = useMemo(() => {
    const def = registry.get(comp.node.type);
    return def ? buildAvailableActions(def, comp as unknown as Record<string, unknown>) : [];
  }, [comp.node.type, comp.locked, comp.hidden]);

  // —— 工具栏按钮点击 —— 阻止冒泡以免触发画布取消选中
  const handleAction = useCallback((actionName: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onAction(actionName, comp.id);
  }, [comp.id, onAction]);

  return (
    // 选中框外层容器：绝对定位覆盖在组件上方
    <div
      className="bem-border-selecting"
      style={{
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        // 主选中 → 蓝色实线边框；次选中 → 浅蓝色虚线边框
        border: isPrimary ? "2px solid #3b82f6" : "1.5px dashed #93c5fd",
        borderRadius: "6px",
        boxShadow: isPrimary ? "0 0 0 2px rgba(59,130,246,0.15)" : undefined,
        pointerEvents: "none",
        zIndex: 20,
        transition: "all 0.08s ease-out",
      }}
    >
      {/* 主选中组件的顶部操作工具栏 — 由 buildAvailableActions 动态渲染 */}
      {isPrimary && actions.length > 0 && (
        <div
          className="bem-border-toolbar"
          style={{
            position: "absolute",
            top: -26,
            right: 0,
            display: "flex",
            gap: 2,
            // 工具栏可点击（突破父级 pointerEvents: none）
            pointerEvents: "auto",
          }}
        >
          {actions.map((action) => {
            const IconComp = ACTION_ICONS[action.icon];
            return (
              <ToolbarBtn
                key={action.name}
                label={action.label}
                icon={IconComp ? <IconComp className="h-3 w-3" /> : null}
                onClick={handleAction(action.name)}
                danger={action.name === 'delete'}
              />
            );
          })}
        </div>
      )}

      {/* 次选中组件在右上角显示蓝色勾选标记 */}
      {!isPrimary && (
        <div
          className="bem-checkmark"
          style={{
            position: "absolute",
            top: -8,
            right: -8,
            width: 16,
            height: 16,
            borderRadius: "50%",
            backgroundColor: "#3b82f6",
            color: "#fff",
            fontSize: 9,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          ✓
        </div>
      )}

      {/* 主选中组件底部显示尺寸提示，格式：网格格数 | 像素尺寸 */}
      {isPrimary && (
        <div
          className="bem-size-tooltip"
          style={{
            position: "absolute",
            bottom: -20,
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            fontSize: 9,
            fontWeight: 500,
            color: "#fff",
            backgroundColor: "rgba(0,0,0,0.75)",
            padding: "1px 6px",
            borderRadius: 3,
            lineHeight: "16px",
            pointerEvents: "none",
          }}
        >
          {comp.position.width}×{comp.position.height}
          {" | "}
          {Math.round(rect.width)}×{Math.round(rect.height)}px
        </div>
      )}
    </div>
  );
});

/**
 * 工具栏按钮组件
 *
 * 小型圆形按钮，显示在选中框顶部工具栏中。
 * danger 模式使用红色背景（用于删除按钮）。
 */
function ToolbarBtn({ label, icon, onClick, danger }: {
  label: string;
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  danger?: boolean;
}) {
  return (
    <div
      className="bem-toolbar-btn"
      onClick={onClick}
      title={label}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onClick(e as any); }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 22,
        height: 22,
        borderRadius: 4,
        fontSize: 11,
        cursor: "pointer",
        backgroundColor: danger ? "rgba(239,68,68,0.9)" : "rgba(59,130,246,0.9)",
        color: "#fff",
        userSelect: "none",
        transition: "background-color 0.15s",
      }}
    >
      {icon}
    </div>
  );
}
