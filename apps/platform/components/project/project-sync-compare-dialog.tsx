"use client";

import { useMemo } from "react";
import {
  getProjectSyncChangeLabel,
  getProjectSyncResourceLabel,
  type ProjectSyncCompareResponseDTO,
  type ProjectSyncCompareViewModel,
} from "@/lib/sync/project-sync-client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ProjectSyncCompareDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectName?: string | null;
  compareResult?: ProjectSyncCompareResponseDTO | null;
  compareSummary: ProjectSyncCompareViewModel;
  disabled?: boolean;
  isSubmitting?: boolean;
  onKeepLocal?: () => Promise<void> | void;
  onKeepRemote?: () => Promise<void> | void;
  onSetBaseline?: () => Promise<void> | void;
};

function MetricCard({
  label,
  value,
  variant,
}: {
  label: string;
  value: number | string;
  variant: "default" | "secondary" | "destructive" | "outline";
}) {
  return (
    <div className="rounded-md border bg-muted/20 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground">{label}</span>
        <Badge variant={variant}>{value}</Badge>
      </div>
    </div>
  );
}

export function ProjectSyncCompareDialog({
  open,
  onOpenChange,
  projectName,
  compareResult,
  compareSummary,
  disabled,
  isSubmitting,
  onKeepLocal,
  onKeepRemote,
  onSetBaseline,
}: ProjectSyncCompareDialogProps) {
  const compare = compareResult?.compare ?? null;

  const canSetBaseline = useMemo(() => {
    if (!compare) return false;
    return compare.local.fingerprint === compare.remote.fingerprint;
  }, [compare]);

  const baselineTip = !compare
    ? "等待 compare 结果返回后再确认基线。"
    : canSetBaseline
      ? "当前本地与远端内容一致，可直接确认基线。"
      : "仅当本地与远端已一致时才允许设为基线。";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>同步 Compare 详情</DialogTitle>
          <DialogDescription>
            {projectName ? `项目「${projectName}」` : "当前项目"}的本地/远端差异明细与人工处理入口。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-4">
            <MetricCard label="Compare 状态" value={compareSummary.badgeLabel} variant={compareSummary.badgeVariant} />
            <MetricCard label="冲突资源" value={compareSummary.conflictCount} variant="destructive" />
            <MetricCard label="仅本地变更" value={compareSummary.localOnlyCount} variant="default" />
            <MetricCard label="仅远端变更" value={compareSummary.remoteOnlyCount} variant="secondary" />
          </div>

          <div className="rounded-md border bg-muted/20 p-3 text-sm text-muted-foreground">
            {compareSummary.detail ?? "比较结果暂不可用"}
          </div>

          {compare && (
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-md border p-3">
                <div className="text-xs text-muted-foreground">本地快照</div>
                <div className="mt-1 text-sm">资源总数 {compare.local.totalResources}</div>
                <div className="mt-2 text-xs text-muted-foreground break-all">{compare.local.fingerprint}</div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-xs text-muted-foreground">远端快照</div>
                <div className="mt-1 text-sm">资源总数 {compare.remote.totalResources}</div>
                <div className="mt-2 text-xs text-muted-foreground break-all">{compare.remote.fingerprint}</div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-xs text-muted-foreground">同步基线</div>
                <div className="mt-1 text-sm">
                  {compare.baseline ? `资源总数 ${compare.baseline.totalResources}` : "暂无已确认基线"}
                </div>
                <div className="mt-2 text-xs text-muted-foreground break-all">
                  {compare.baseline?.fingerprint ?? "请先人工确认后建立基线"}
                </div>
              </div>
            </div>
          )}

          <Tabs defaultValue="conflicts">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="conflicts">冲突资源</TabsTrigger>
              <TabsTrigger value="local">仅本地</TabsTrigger>
              <TabsTrigger value="remote">仅远端</TabsTrigger>
            </TabsList>

            <TabsContent value="conflicts">
              <ScrollArea className="h-72 rounded-md border">
                <div className="space-y-3 p-3">
                  {compare?.conflicts.length ? compare.conflicts.map((item) => (
                    <div key={`${item.resourceKind}:${item.resourceKey}`} className="rounded-md border p-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="destructive">{getProjectSyncResourceLabel(item.resourceKind)}</Badge>
                        <span className="text-sm font-medium break-all">{item.resourceKey}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>本地：{getProjectSyncChangeLabel(item.localChange)}</span>
                        <span>远端：{getProjectSyncChangeLabel(item.remoteChange)}</span>
                      </div>
                    </div>
                  )) : (
                    <div className="rounded-md border border-dashed p-6 text-sm text-muted-foreground">
                      当前没有同资源双端冲突。
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="local">
              <ScrollArea className="h-72 rounded-md border">
                <div className="space-y-3 p-3">
                  {compare?.localOnlyChanges.length ? compare.localOnlyChanges.map((item) => (
                    <div key={`${item.resourceKind}:${item.resourceKey}`} className="rounded-md border p-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="default">{getProjectSyncResourceLabel(item.resourceKind)}</Badge>
                        <span className="text-sm font-medium break-all">{item.resourceKey}</span>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        变更：{getProjectSyncChangeLabel(item.change)}
                      </div>
                    </div>
                  )) : (
                    <div className="rounded-md border border-dashed p-6 text-sm text-muted-foreground">
                      当前没有仅存在于本地的变更。
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="remote">
              <ScrollArea className="h-72 rounded-md border">
                <div className="space-y-3 p-3">
                  {compare?.remoteOnlyChanges.length ? compare.remoteOnlyChanges.map((item) => (
                    <div key={`${item.resourceKind}:${item.resourceKey}`} className="rounded-md border p-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">{getProjectSyncResourceLabel(item.resourceKind)}</Badge>
                        <span className="text-sm font-medium break-all">{item.resourceKey}</span>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        变更：{getProjectSyncChangeLabel(item.change)}
                      </div>
                    </div>
                  )) : (
                    <div className="rounded-md border border-dashed p-6 text-sm text-muted-foreground">
                      当前没有仅存在于远端的变更。
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>

          <div className="rounded-md border border-dashed p-3 text-xs text-muted-foreground">
            <div>处理建议</div>
            <Separator className="my-2" />
            <div>保留本地：强制 Push，用本地内容覆盖远端，并重新建立同步基线。</div>
            <div className="mt-1">保留远端：强制 Pull，用远端内容覆盖本地，并重新建立同步基线。</div>
            <div className="mt-1">设为基线：仅在本地与远端已一致时可用，用于补齐缺失的同步基线。</div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:justify-between">
          <div className="text-xs text-muted-foreground">{baselineTip}</div>
          <div className="flex flex-wrap justify-end gap-2">
            <Button variant="outline" onClick={() => void onKeepRemote?.()} disabled={disabled || isSubmitting || !compare}>
              保留远端
            </Button>
            <Button variant="outline" onClick={() => void onKeepLocal?.()} disabled={disabled || isSubmitting || !compare}>
              保留本地
            </Button>
            <Button onClick={() => void onSetBaseline?.()} disabled={disabled || isSubmitting || !canSetBaseline}>
              设为基线
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
