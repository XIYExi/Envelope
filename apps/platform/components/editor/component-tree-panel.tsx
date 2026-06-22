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

import { memo, useMemo, useState, useCallback, useRef, useEffect, type ReactNode } from "react";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { createDefaultRegistry } from "@envelope/materials";
import { createComponentDragItem, useCanvasStore } from "@envelope/engine";
import type { CanvasComponent, ComponentNode } from "@envelope/engine";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
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
  parentId,
  index,
  siblingCount,
  editingId,
  onStartRename,
  onRenameSubmit,
  onRenameCancel,
}: {
  node: ComponentNode;
  depth: number;
  expanded: boolean;
  onToggle: (id: string) => void;
  displayNameMap: Map<string, string>;
  parentId: string | null;
  index: number;
  siblingCount: number;
  editingId: string | null;
  onStartRename: (id: string) => void;
  onRenameSubmit: (id: string, name: string) => void;
  onRenameCancel: () => void;
}) {
  const activeNodeId = useCanvasStore((s) => s.activeNodeId);
  const selectNode = useCanvasStore((s) => s.selectNode);
  const selectedIds = useCanvasStore((s) => s.selectedIds);
  const copySelected = useCanvasStore((s) => s.copySelected);
  const cutSelected = useCanvasStore((s) => s.cutSelected);
  const pasteClipboard = useCanvasStore((s) => s.pasteClipboard);
  const deleteSelected = useCanvasStore((s) => s.deleteSelected);
  const moveNode = useCanvasStore((s) => s.moveNode);
  const clipboard = useCanvasStore((s) => s.clipboard);
  const isEditing = editingId === node.id;
  const hasSelection = selectedIds.length > 0;
  const canPaste = clipboard !== null;
  const canMoveUp = index > 0;
  const canMoveDown = index < siblingCount - 1;

  // 内联重命名状态
  const [editValue, setEditValue] = useState(node.name || "");
  const inputRef = useRef<HTMLInputElement>(null);

  // 进入编辑态时聚焦输入框并全选文字
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
    // 重新编辑时重置输入框内容
    if (isEditing) {
      setEditValue(node.name || "");
    }
  }, [isEditing, node.name]);

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
    <ContextMenu>
      <ContextMenuTrigger asChild>
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
          onContextMenu={() => selectNode(node.id)}
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

          {isEditing ? (
            <input
              ref={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onRenameSubmit(node.id, editValue);
                } else if (e.key === "Escape") {
                  onRenameCancel();
                }
                e.stopPropagation();
              }}
              onBlur={() => onRenameSubmit(node.id, editValue)}
              className="min-w-0 flex-1 rounded border bg-background px-1 text-[11px] outline-none focus:ring-1 focus:ring-blue-500"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span
              className="min-w-0 flex-1 truncate text-[11px]"
              onDoubleClick={(e) => {
                e.stopPropagation();
                onStartRename(node.id);
              }}
            >
              {nodeLabel(node, displayNameMap)}
            </span>
          )}
          <span className="shrink-0 font-mono text-[9px] text-muted-foreground">{node.type}</span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-40">
        <ContextMenuItem onClick={() => copySelected()} disabled={!hasSelection}>复制</ContextMenuItem>
        <ContextMenuItem onClick={() => cutSelected()} disabled={!hasSelection}>剪切</ContextMenuItem>
        <ContextMenuItem onClick={() => pasteClipboard()} disabled={!canPaste}>粘贴</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => deleteSelected()} disabled={!hasSelection}>删除</ContextMenuItem>
        <ContextMenuItem onClick={() => onStartRename(node.id)}>重命名</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => moveNode(node.id, { parentId, index: index - 1 })} disabled={!canMoveUp}>上移一层</ContextMenuItem>
        <ContextMenuItem onClick={() => moveNode(node.id, { parentId, index: index + 1 })} disabled={!canMoveDown}>下移一层</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
});

function renderNodeGroup(args: {
  nodes: ComponentNode[];
  parentKey: string;
  depth: number;
  expandedSet: Set<string>;
  toggle: (id: string) => void;
  displayNameMap: Map<string, string>;
  visibleSet?: Set<string>;
  editingId: string | null;
  onStartRename: (id: string) => void;
  onRenameSubmit: (id: string, name: string) => void;
  onRenameCancel: () => void;
}): ReactNode[] {
  const { nodes, parentKey, depth, expandedSet, toggle, displayNameMap, visibleSet, editingId, onStartRename, onRenameSubmit, onRenameCancel } = args;
  const isSearchMode = visibleSet !== undefined;
  const out: ReactNode[] = [];
  // 搜索模式下不渲染 TreeDropSlot，减少视觉噪音
  if (!isSearchMode) {
    out.push(<TreeDropSlot key={`${parentKey}:drop:0`} parentKey={parentKey} index={0} depth={depth} />);
  }
  nodes.forEach((n, idx) => {
    // 搜索模式下只显示匹配节点及其祖先
    if (isSearchMode && !visibleSet.has(n.id)) return;

    const expanded = expandedSet.has(n.id);
    out.push(
      <TreeNodeRow
        key={`${parentKey}:node:${n.id}`}
        node={n}
        depth={depth}
        expanded={expanded}
        onToggle={toggle}
        displayNameMap={displayNameMap}
        parentId={parentKey === "root" ? null : parentKey}
        index={idx}
        siblingCount={nodes.length}
        editingId={editingId}
        onStartRename={onStartRename}
        onRenameSubmit={onRenameSubmit}
        onRenameCancel={onRenameCancel}
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
          visibleSet,
          editingId,
          onStartRename,
          onRenameSubmit,
          onRenameCancel,
        }),
      );
    }
    // 搜索模式下不渲染 TreeDropSlot
    if (!isSearchMode) {
      out.push(<TreeDropSlot key={`${parentKey}:drop:${idx + 1}`} parentKey={parentKey} index={idx + 1} depth={depth} />);
    }
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

  // 记录已识别的节点 ID 集合，用于检测新增容器节点并自动展开
  const knownIdsRef = useRef<Set<string>>(new Set());

  // 当组件树发生变化时，将新出现的节点 ID 自动加入展开集
  useEffect(() => {
    const currentIds = new Set<string>();
    const collect = (node: ComponentNode) => {
      currentIds.add(node.id);
      node.children?.forEach(collect);
    };
    components.forEach((c) => collect(c.node));

    const newIds: string[] = [];
    for (const id of currentIds) {
      if (!knownIdsRef.current.has(id)) {
        newIds.push(id);
      }
    }
    if (newIds.length > 0) {
      setExpandedIds((prev) => {
        const next = new Set(prev);
        newIds.forEach((id) => next.add(id));
        return next;
      });
    }
    knownIdsRef.current = currentIds;
  }, [components]);

  const toggle = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const roots: ComponentNode[] = useMemo(() => components.map((c: CanvasComponent) => c.node), [components]);

  // 组件树搜索关键词
  const [searchQuery, setSearchQuery] = useState("");
  // 当前正在执行内联重命名的节点 ID，null 表示不在编辑状态
  const [editingId, setEditingId] = useState<string | null>(null);

  // 双击节点文本进入内联重命名模式
  const handleStartRename = useCallback((id: string) => {
    setEditingId(id);
  }, []);

  // 提交重命名：保存 name 到 store，退出编辑态
  const handleRenameSubmit = useCallback((id: string, name: string) => {
    const finalName = name.trim() || "";
    if (finalName) {
      useCanvasStore.getState().updateNode(id, { name: finalName });
    }
    setEditingId(null);
  }, []);

  // 取消重命名：不保存，直接退出编辑态
  const handleRenameCancel = useCallback(() => {
    setEditingId(null);
  }, []);

  // 搜索过滤结果：匹配节点 ID 及其所有祖先 ID
  const searchMatchIds = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.trim().toLowerCase();

    // 收集所有匹配节点
    const matched = new Set<string>();
    const parentMap = new Map<string, string | null>();

    const walk = (nodes: ComponentNode[], parentId: string | null) => {
      for (const node of nodes) {
        parentMap.set(node.id, parentId);
        const label = nodeLabel(node, displayNameMap).toLowerCase();
        if (label.includes(q) || node.type.toLowerCase().includes(q)) {
          matched.add(node.id);
        }
        if (node.children) walk(node.children, node.id);
      }
    };
    walk(roots, null);

    // 为每个匹配节点补充其所有祖先 ID
    const result = new Set(matched);
    for (const id of matched) {
      let current = parentMap.get(id);
      while (current) {
        result.add(current);
        current = parentMap.get(current);
      }
    }
    return result;
  }, [searchQuery, roots, displayNameMap]);

  // 搜索模式下，实际生效的展开集 = 用户手动展开 + 搜索祖先展开
  const effectiveExpandedIds = useMemo(() => {
    if (!searchMatchIds) return expandedIds;
    return new Set([...expandedIds, ...searchMatchIds]);
  }, [searchMatchIds, expandedIds]);

  const rows = useMemo(() => renderNodeGroup({
    nodes: roots,
    parentKey: "root",
    depth: 0,
    expandedSet: effectiveExpandedIds,
    toggle,
    displayNameMap,
    visibleSet: searchMatchIds ?? undefined,
    editingId,
    onStartRename: handleStartRename,
    onRenameSubmit: handleRenameSubmit,
    onRenameCancel: handleRenameCancel,
  }), [roots, effectiveExpandedIds, toggle, displayNameMap, searchMatchIds, editingId, handleStartRename, handleRenameSubmit, handleRenameCancel]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex h-8 items-center border-b px-3 text-[11px] text-muted-foreground">
        组件树
        <span className="ml-auto text-[10px]">{roots.length}</span>
      </div>

      {/* 组件树搜索输入框 */}
      <div className="flex-shrink-0 border-b px-2 py-1.5">
        <Input
          placeholder="搜索组件..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-7 text-xs"
        />
        {searchQuery && (
          <div className="mt-1 text-[10px] text-muted-foreground">
            {(() => {
              const total = roots.reduce((count, r) => {
                const w = (n: ComponentNode) => { if (searchMatchIds?.has(n.id)) count++; n.children?.forEach(w); };
                w(r);
                return count;
              }, 0);
              return `匹配 ${total} 个组件`;
            })()}
            <button className="ml-2 underline hover:text-foreground" onClick={() => setSearchQuery("")}>清除</button>
          </div>
        )}
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
