/**
 * 页面 Preview 对话框（ISC-35）
 *
 * 用于在编辑器内直接查看“真实组件渲染”效果（非 Canvas simulated）。
 * 渲染数据来源于 CanvasStore（与编辑器画布一致），不依赖导出/生成流程。
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
"use client";

import { VIEWPORT_WIDTHS, useCanvasStore } from "@envelope/engine";
import { RuntimePageRenderer } from "@/components/runtime/runtime-renderer";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function PagePreviewDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const {
    components,
    gridCols,
    gridGap,
    pageBackground,
    pagePadding,
    pageMaxWidth,
    viewport,
  } = useCanvasStore();

  const viewportWidth = VIEWPORT_WIDTHS[viewport];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="preview-dialog"
        className="h-[90vh] max-w-[96vw] overflow-hidden p-0"
      >
        <div className="flex h-full flex-col">
          <DialogHeader className="border-b px-6 py-4">
            <DialogTitle>Preview</DialogTitle>
            <DialogDescription>真实组件渲染（非 Canvas simulated）</DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-auto bg-muted/30 p-6">
            <RuntimePageRenderer
              components={components}
              gridCols={gridCols}
              gridGap={gridGap}
              pageBackground={pageBackground}
              pagePadding={pagePadding}
              pageMaxWidth={pageMaxWidth}
              viewportWidth={viewportWidth}
              viewport={viewport}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

