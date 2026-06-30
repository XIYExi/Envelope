/**
 * 页面树面板 — 在左面板中展示项目所有页面，支持切换、新增、删除、重排（G10）
 *
 * 功能：
 * - 按顺序展示页面列表
 * - 拖拽重排页面顺序（使用 dnd-kit）
 * - 右键菜单：重命名/复制/删除
 * - 双击内联重命名标题
 * - 新建/删除页面按钮
 * - 当前选中页面高亮
 */
"use client";

import { memo, useCallback, useRef, useState, useEffect } from "react";
import { useDroppable, useDraggable, useDndMonitor } from "@dnd-kit/core";
import { useProjectPagesStore } from "@/stores/project-pages";
import { cn } from "@/lib/utils";
import { Plus, X, GripVertical, FileText } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";

/**
 * 单个页面行 — 可拖拽、右键菜单、内联重命名
 */
const PageRow = memo(function PageRow({
  path,
  title,
  isActive,
  index,
  totalCount,
  editingPath,
  onStartRename,
  onRenameSubmit,
  onRenameCancel,
  onSelect,
  onRemove,
}: {
  path: string;
  title: string;
  isActive: boolean;
  index: number;
  totalCount: number;
  editingPath: string | null;
  onStartRename: (path: string) => void;
  onRenameSubmit: (path: string, title: string) => void;
  onRenameCancel: () => void;
  onSelect: (path: string) => void;
  onRemove: (e: React.MouseEvent, path: string) => void;
}) {
  const duplicatePage = useProjectPagesStore((s) => s.duplicatePage);
  const removePage = useProjectPagesStore((s) => s.removePage);

  const isEditing = editingPath === path;
  const [editValue, setEditValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
    if (isEditing) {
      setEditValue(title);
    }
  }, [isEditing, title]);

  /** G10: 拖拽重排 */
  const { setNodeRef: setDragRef, listeners, attributes, isDragging } = useDraggable({
    id: `page-node:${path}`,
    data: { type: "page", path },
  });

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          ref={setDragRef}
          {...listeners}
          {...attributes}
          role="button"
          tabIndex={0}
          onClick={() => onSelect(path)}
          onContextMenu={() => onSelect(path)}
          onDoubleClick={() => onStartRename(path)}
          className={cn(
            "group flex w-full cursor-grab items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-xs transition-colors active:cursor-grabbing",
            isActive
              ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
              : "text-foreground hover:bg-accent",
            isDragging && "opacity-50",
          )}
          data-testid={`page-tree-node-${path}`}
        >
          {/* 拖拽把手 */}
          <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground/50">
            <GripVertical className="h-3 w-3" />
          </span>

          {/* 页面图标 */}
          <FileText className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />

          {/* 页面标题或内联重命名输入框 */}
          {isEditing ? (
            <Input
              ref={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onRenameSubmit(path, editValue);
                } else if (e.key === "Escape") {
                  onRenameCancel();
                }
                e.stopPropagation();
              }}
              onBlur={() => onRenameSubmit(path, editValue)}
              className="min-w-0 h-5 flex-1 rounded border bg-background px-1 text-[11px] outline-none focus:ring-1 focus:ring-blue-500"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="min-w-0 flex-1 truncate">{title}</span>
          )}

          {/* 页面路径（次要信息） */}
          <span className="shrink-0 text-[9px] text-muted-foreground/50">{path}</span>

          {/* 删除按钮 */}
          {path !== "/" && totalCount > 1 && (
            <span
              role="button"
              onClick={(e) => onRemove(e, path)}
              className="shrink-0 rounded p-0.5 text-muted-foreground/40 opacity-0 hover:bg-accent hover:text-foreground group-hover:opacity-100"
              title="删除页面"
            >
              <X className="h-3 w-3" />
            </span>
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-36">
        <ContextMenuItem onClick={() => onStartRename(path)}>重命名</ContextMenuItem>
        <ContextMenuItem onClick={() => duplicatePage(path)}>复制</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={() => removePage(path)}
          disabled={totalCount <= 1}
          className="text-destructive"
        >
          删除
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
});

/**
 * 页面之间拖拽放置槽位
 */
const PageDropSlot = memo(function PageDropSlot({
  index,
  isDragging,
}: {
  index: number;
  isDragging?: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `page-drop:${index}`,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ display: isDragging ? undefined : "none" }}
      className={cn(
        "h-1.5 rounded transition-all",
        isOver ? "h-2 bg-blue-400" : "hover:bg-accent/40",
      )}
    />
  );
});

export const PageTreePanel = memo(function PageTreePanel() {
  const pages = useProjectPagesStore((s) => s.pages);
  const currentPath = useProjectPagesStore((s) => s.currentPath);
  const setCurrentPath = useProjectPagesStore((s) => s.setCurrentPath);
  const flushAutosave = useProjectPagesStore((s) => s.flushAutosave);
  const addPage = useProjectPagesStore((s) => s.addPage);
  const removePage = useProjectPagesStore((s) => s.removePage);
  const renamePage = useProjectPagesStore((s) => s.renamePage);

  /** G8: 通过 useDndMonitor 感知页面节点的拖拽活跃状态，控制 PageDropSlot 显隐 */
  const [dragActive, setDragActive] = useState(false);

  useDndMonitor({
    onDragStart(event) {
      if (event.active.id.toString().startsWith("page-node:")) {
        setDragActive(true);
      }
    },
    onDragEnd() {
      setDragActive(false);
    },
    onDragCancel() {
      setDragActive(false);
    },
  });

  // 内联重命名状态
  const [editingPath, setEditingPath] = useState<string | null>(null);

  const handleSelect = useCallback((path: string) => {
    if (path === currentPath) return;
    flushAutosave().finally(() => setCurrentPath(path));
  }, [currentPath, flushAutosave, setCurrentPath]);

  const handleAdd = useCallback(() => {
    addPage();
  }, [addPage]);

  const handleRemove = useCallback((e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    if (pages.length <= 1) return;
    removePage(path);
  }, [pages.length, removePage]);

  const handleStartRename = useCallback((path: string) => {
    setEditingPath(path);
  }, []);

  const handleRenameSubmit = useCallback((path: string, title: string) => {
    const finalTitle = title.trim() || "未命名";
    renamePage(path, finalTitle);
    setEditingPath(null);
  }, [renamePage]);

  const handleRenameCancel = useCallback(() => {
    setEditingPath(null);
  }, []);

  if (pages.length === 0) return null;

  return (
    <div className="space-y-0.5 px-1 py-2">
      {/* 页面列表头部：标题 + 新增按钮 */}
      <div className="flex items-center justify-between px-2">
        <span className="text-[10px] font-medium text-muted-foreground">页面</span>
        <button
          type="button"
          onClick={handleAdd}
          className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground"
          title="新建页面"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* 第一个 DropSlot 始终可见（拖拽时），放在列表顶部 */}
      {pages.length > 0 && <PageDropSlot index={0} isDragging={dragActive} />}

      {/* 页面列表 */}
      {pages.map((page, idx) => (
        <div key={page.path}>
          <PageRow
            path={page.path}
            title={page.title || page.path}
            isActive={page.path === currentPath}
            index={idx}
            totalCount={pages.length}
            editingPath={editingPath}
            onStartRename={handleStartRename}
            onRenameSubmit={handleRenameSubmit}
            onRenameCancel={handleRenameCancel}
            onSelect={handleSelect}
            onRemove={handleRemove}
          />
          {/* 页面之间放置槽位（拖拽活跃时显示） */}
          <PageDropSlot index={idx + 1} isDragging={dragActive} />
        </div>
      ))}
    </div>
  );
});
