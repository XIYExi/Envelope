/**
 * 键盘快捷键帮助面板
 *
 * 展示编辑器中所有可用的键盘快捷键。
 * 通过 ? 键触发，Escape 关闭。
 *
 * @author xiye
 * @date 2026-06-23
 */

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ShortcutEntry {
  keys: string;
  description: string;
}

const SHORTCUTS: ShortcutEntry[] = [
  { keys: "Ctrl+S", description: "保存当前页面" },
  { keys: "Ctrl+Z", description: "撤销" },
  { keys: "Ctrl+Shift+Z / Ctrl+Y", description: "重做" },
  { keys: "Ctrl+C", description: "复制" },
  { keys: "Ctrl+X", description: "剪切" },
  { keys: "Ctrl+V", description: "粘贴" },
  { keys: "Ctrl+D", description: "快速复制" },
  { keys: "Ctrl+A", description: "全选所有非锁定组件" },
  { keys: "Delete / Backspace", description: "删除选中组件" },
  { keys: "Ctrl+0", description: "重置缩放为 100%" },
  { keys: "Ctrl+= / Ctrl++", description: "放大" },
  { keys: "Ctrl+-", description: "缩小" },
  { keys: "Ctrl+滚轮", description: "缩放画布" },
  { keys: "方向键", description: "微调组件位置（1px 步进）" },
  { keys: "Shift+方向键", description: "微调组件位置（10px 步进）" },
  { keys: "Ctrl+]", description: "上移一层" },
  { keys: "Ctrl+[", description: "下移一层" },
  { keys: "Escape", description: "清除选中 / 关闭快捷键面板" },
  { keys: "F2", description: "内联重命名选中组件" },
  { keys: "Tab", description: "按顺序切换到下一个组件" },
  { keys: "Shift+Tab", description: "按顺序切换到上一个组件" },
  { keys: "?", description: "显示此快捷键帮助面板" },
];

export function KeyboardShortcutsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>键盘快捷键</DialogTitle>
          <DialogDescription>
            编辑器全局快捷键一览
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-80 overflow-y-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="pb-2 pr-4 font-medium">快捷键</th>
                <th className="pb-2 font-medium">功能</th>
              </tr>
            </thead>
            <tbody>
              {SHORTCUTS.map((shortcut) => (
                <tr key={shortcut.keys} className="border-b last:border-0">
                  <td className="py-2 pr-4">
                    <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground">
                      {shortcut.keys}
                    </kbd>
                  </td>
                  <td className="py-2 text-muted-foreground">
                    {shortcut.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
