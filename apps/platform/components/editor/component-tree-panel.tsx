/**
 * 组件树面板（ISC-31）
 *
 * 目标：
 * - 展示页面的 Component Tree（root 组件 + children 递归）
 * - 支持选中节点并联动右侧属性面板
 * - 支持“落点 +”插入（ISC-25/26）与拖拽重排（尽量）
 * - 支持嵌套插入（ISC-32）：将组件/物料拖入任意节点作为 children
 *
 * 约定：
 * - DnD 事件由外层 DndContext 统一处理；本组件只负责声明 Draggable/Droppable 区域
 * - Droppable id 编码：
 *   - tree-drop:{parentId|root}:{index}
 *   - tree-container:{nodeId}
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
"use client";

import { memo, useMemo, useState, useCallback, type ReactNode } from "react";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { createDefaultRegistry } from "@envelope/materials";
import { createComponentDragItem, useCanvasStore } from "@envelope/engine";
import type { CanvasComponent, ComponentNode } from "@envelope/engine";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight, GripVertical, Plus } from "lucide-react";

function nodeLabel(node: ComponentNode, displayNameMap: Map<string, string>): string {
  const display = displayNameMap.get(node.type);
  const name = typeof node.name === "string" && node.name.trim() ? node.name.trim() : `${node.type}-${node.id.slice(0, 8)}`;
  return display ? `${display} · ${name}` : name;
}

const TreeDropSlot = memo(function TreeDropSlot({
  parentKey,
  index,
  depth,
}: {
  parentKey: string;
  index: number;
  depth: number;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `tree-drop:${parentKey}:${index}`,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex h-5 items-center gap-2 rounded px-2 text-[10px] text-muted-foreground",
        isOver ? "bg-blue-50 text-blue-700" : "hover:bg-accent/40",
      )}
      style={{ paddingLeft: `${depth * 12 + 12}px` }}
    >
      <Plus className="h-3 w-3" />
      <span>插入</span>
    </div>
  );
});

const TreeNodeRow = memo(function TreeNodeRow({
  node,
  depth,
  expanded,
  onToggle,
  displayNameMap,
}: {
  node: ComponentNode;
  depth: number;
  expanded: boolean;
  onToggle: (id: string) => void;
  displayNameMap: Map<string, string>;
}) {
  const activeNodeId = useCanvasStore((s) => s.activeNodeId);
  const selectNode = useCanvasStore((s) => s.selectNode);

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `tree-container:${node.id}`,
  });

  const { setNodeRef: setDragRef, listeners, attributes, isDragging } = useDraggable({
    id: `tree-node:${node.id}`,
    data: createComponentDragItem(node.id),
  });

  const hasChildren = (node.children?.length ?? 0) > 0;
  const isActive = activeNodeId === node.id;

  return (
    <div
      ref={setDropRef}
      className={cn(
        "flex h-7 items-center gap-1 rounded px-2 text-xs transition-colors",
        isActive ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300" : "hover:bg-accent",
        isOver && "ring-1 ring-blue-400",
        isDragging && "opacity-50",
      )}
      style={{ paddingLeft: `${depth * 12 + 8}px` }}
      onClick={() => selectNode(node.id)}
      data-testid={`component-tree-node-${node.id}`}
    >
      <button
        type="button"
        className={cn("flex h-5 w-5 items-center justify-center rounded hover:bg-accent", !hasChildren && "opacity-30")}
        onClick={(e) => {
          e.stopPropagation();
          if (hasChildren) onToggle(node.id);
        }}
        aria-label="toggle"
      >
        {hasChildren ? (expanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />) : <ChevronRight className="h-3.5 w-3.5" />}
      </button>

      <span
        ref={setDragRef}
        {...listeners}
        {...attributes}
        className="inline-flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:bg-accent"
        onClick={(e) => e.stopPropagation()}
        aria-label="drag"
      >
        <GripVertical className="h-4 w-4" />
      </span>

      <span className="min-w-0 flex-1 truncate text-[11px]">{nodeLabel(node, displayNameMap)}</span>
      <span className="shrink-0 font-mono text-[9px] text-muted-foreground">{node.type}</span>
    </div>
  );
});

function renderNodeGroup(args: {
  nodes: ComponentNode[];
  parentKey: string;
  depth: number;
  expandedSet: Set<string>;
  toggle: (id: string) => void;
  displayNameMap: Map<string, string>;
}): ReactNode[] {
  const { nodes, parentKey, depth, expandedSet, toggle, displayNameMap } = args;
  const out: ReactNode[] = [];
  out.push(<TreeDropSlot key={`${parentKey}:drop:0`} parentKey={parentKey} index={0} depth={depth} />);
  nodes.forEach((n, idx) => {
    const expanded = expandedSet.has(n.id);
    out.push(
      <TreeNodeRow
        key={`${parentKey}:node:${n.id}`}
        node={n}
        depth={depth}
        expanded={expanded}
        onToggle={toggle}
        displayNameMap={displayNameMap}
      />,
    );
    if (expanded && (n.children?.length ?? 0) > 0) {
      out.push(
        ...renderNodeGroup({
          nodes: n.children ?? [],
          parentKey: n.id,
          depth: depth + 1,
          expandedSet,
          toggle,
          displayNameMap,
        }),
      );
    }
    out.push(<TreeDropSlot key={`${parentKey}:drop:${idx + 1}`} parentKey={parentKey} index={idx + 1} depth={depth} />);
  });
  return out;
}

export const ComponentTreePanel = memo(function ComponentTreePanel() {
  const components = useCanvasStore((s) => s.components);

  const registry = useMemo(() => createDefaultRegistry(), []);
  const displayNameMap = useMemo(() => {
    const map = new Map<string, string>();
    registry.getAll().forEach((m) => {
      map.set(m.name, m.displayName);
    });
    return map;
  }, [registry]);

  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    const ids: string[] = [];
    const collect = (node: ComponentNode) => {
      ids.push(node.id);
      node.children?.forEach(collect);
    };
    components.forEach((c) => collect(c.node));
    return new Set(ids);
  });

  const toggle = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const roots: ComponentNode[] = useMemo(() => components.map((c: CanvasComponent) => c.node), [components]);
  const rows = useMemo(() => renderNodeGroup({
    nodes: roots,
    parentKey: "root",
    depth: 0,
    expandedSet: expandedIds,
    toggle,
    displayNameMap,
  }), [roots, expandedIds, toggle, displayNameMap]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex h-8 items-center border-b px-3 text-[11px] text-muted-foreground">
        组件树
        <span className="ml-auto text-[10px]">{roots.length}</span>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-0.5 p-2">
          {rows.length > 0 ? rows : (
            <div className="px-2 py-6 text-center text-xs text-muted-foreground">暂无组件</div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
});
