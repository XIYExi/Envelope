/**
 * 页面 Preview 对话框（ISC-35）
 *
 * 用于在编辑器内直接查看"真实组件渲染"效果（非 Canvas simulated）。
 * 渲染数据来源于 CanvasStore（与编辑器画布一致），不依赖导出/生成流程。
 *
 * P4: 预览提供移动端设备框架外壳模拟
 * P5: 预览支持新窗口打开走真实路由预览
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
"use client";

import { useState } from "react";
import { VIEWPORT_WIDTHS, useCanvasStore } from "@envelope/engine";
import { RuntimePageRenderer } from "@/components/runtime/runtime-renderer";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Smartphone, Tablet, Monitor } from "lucide-react";

/**
 * P4: 设备框架 — 根据视口类型渲染不同的外壳
 */
function DeviceFrame({
  viewport,
  children,
}: {
  viewport: "mobile" | "tablet" | "desktop" | "fluid";
  children: React.ReactNode;
}) {
  // P4: Desktop/fluid 不加框架，全宽显示
  if (viewport === "desktop" || viewport === "fluid") {
    return <>{children}</>;
  }

  // P4: Mobile 设备框架 — 圆角 + 虚拟 notch
  if (viewport === "mobile") {
    return (
      <div className="mx-auto flex justify-center">
        <div
          className="relative overflow-hidden rounded-[40px] border-[3px] border-gray-400 bg-gray-100 shadow-xl dark:border-gray-600 dark:bg-gray-900"
          style={{ width: 375 }}
        >
          {/* P4: 顶部 notch 模拟 */}
          <div className="absolute left-1/2 top-0 z-10 h-5 w-36 -translate-x-1/2 rounded-b-2xl bg-gray-400 dark:bg-gray-600">
            <div className="mx-auto h-2.5 w-8 translate-y-1.5 rounded-full bg-gray-700 dark:bg-gray-300" />
          </div>
          <div className="overflow-auto" style={{ height: "calc(100vh - 180px)", paddingTop: 20 }}>
            {children}
          </div>
          {/* P4: 底部 home indicator */}
          <div className="flex justify-center pb-1">
            <div className="h-1 w-24 rounded-full bg-gray-400 dark:bg-gray-600" />
          </div>
        </div>
      </div>
    );
  }

  // P4: Tablet 设备框架 — 较窄圆角
  return (
    <div className="mx-auto flex justify-center">
      <div
        className="relative overflow-hidden rounded-[24px] border-[3px] border-gray-400 bg-gray-100 shadow-xl dark:border-gray-600 dark:bg-gray-900"
        style={{ width: 768 }}
      >
        <div className="overflow-auto" style={{ height: "calc(100vh - 180px)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

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

  /**
   * P5: 构建预览 URL 并打开新窗口
   * 使用当前 project ID 和页面路径构建真实路由 URL
   */
  const handleOpenNewWindow = () => {
    // 从 URL search params 获取 projectId
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("project");
    // 构造预览路径：/preview/[projectId]
    const baseUrl = window.location.origin;
    const previewUrl = projectId
      ? `${baseUrl}/preview/${encodeURIComponent(projectId)}`
      : `${baseUrl}/preview`;
    window.open(previewUrl, "_blank", "noopener,noreferrer");
  };

  // P4: 当前视口对应的设备图标
  const viewportIcons: Record<string, React.ReactNode> = {
    mobile: <Smartphone className="h-4 w-4" />,
    tablet: <Tablet className="h-4 w-4" />,
    desktop: <Monitor className="h-4 w-4" />,
    fluid: <Monitor className="h-4 w-4" />,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="preview-dialog"
        className="h-[90vh] max-w-[96vw] overflow-hidden p-0"
      >
        <div className="flex h-full flex-col">
          <DialogHeader className="flex flex-row items-center justify-between border-b px-6 py-3">
            <div>
              <DialogTitle className="flex items-center gap-2">
                {viewportIcons[viewport] ?? null}
                Preview
                {viewport !== "desktop" && viewport !== "fluid" ? (
                  <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                    {viewport === "mobile" ? "375px" : "768px"}
                    {" 设备框架"}
                  </span>
                ) : null}
              </DialogTitle>
              <DialogDescription>
                真实组件渲染（非 Canvas simulated）
                {components.length > 0 && ` · ${components.length} 个组件`}
              </DialogDescription>
            </div>
            {/* P5: 新窗口预览按钮 */}
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 text-xs"
              onClick={handleOpenNewWindow}
              title="在新窗口中打开真实路由预览"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              新窗口预览
            </Button>
          </DialogHeader>
          <div className="flex-1 overflow-auto bg-muted/30 p-6">
            {/* P4: 使用 DeviceFrame 包裹渲染内容 */}
            <DeviceFrame viewport={viewport}>
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
            </DeviceFrame>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
