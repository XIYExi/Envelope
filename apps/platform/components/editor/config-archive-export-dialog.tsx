"use client";

import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useProjectPagesStore } from "@/stores/project-pages";
import { useProjectFlowsStore } from "@/stores/project-flows";
import { useProjectEndpointsStore } from "@/stores/project-endpoints";
import { useProjectRoutesStore } from "@/stores/project-routes";
import { useProjectModelsStore } from "@/stores/project-models";
import { useProjectAuthStore } from "@/stores/project-auth";
import type { ArchiveExportOptions, ArchiveSelection } from "@/lib/archive/archive-types";
import { archiveEndpointKey, archiveFlowKey } from "@/lib/archive/archive-keys";
import { cn } from "@/lib/utils";

type SelectableItem = {
  key: string;
  label: string;
  hint?: string;
};

type CategoryValue = "all" | string[];

function toCategoryValue(allEnabled: boolean, selected: Set<string>, allKeys: string[]): CategoryValue {
  if (allEnabled) return "all";
  if (selected.size === 0) return [];
  if (selected.size === allKeys.length) return "all";
  return Array.from(selected.values());
}

function SelectionPanel({
  title,
  items,
  isLoading,
  error,
  allEnabled,
  onToggleAll,
  selected,
  onToggleOne,
  onSelectAll,
  onClearAll,
  search,
  onSearchChange,
}: {
  title: string;
  items: SelectableItem[];
  isLoading: boolean;
  error: string | null;
  allEnabled: boolean;
  onToggleAll: (next: boolean) => void;
  selected: Set<string>;
  onToggleOne: (key: string, checked: boolean) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  search: string;
  onSearchChange: (value: string) => void;
}) {
  const visibleItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => (it.label + " " + (it.hint ?? "")).toLowerCase().includes(q));
  }, [items, search]);

  const selectedCount = allEnabled ? items.length : selected.size;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{title}</span>
          <Badge variant="secondary" className="text-[10px]">
            {selectedCount}/{items.length}
          </Badge>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">导出全部</span>
          <Switch checked={allEnabled} onCheckedChange={onToggleAll} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="搜索..."
          className="h-8"
        />
        {!allEnabled && (
          <>
            <Button variant="outline" size="sm" className="h-8" onClick={onSelectAll}>
              全选
            </Button>
            <Button variant="outline" size="sm" className="h-8" onClick={onClearAll}>
              全不选
            </Button>
          </>
        )}
      </div>

      <div className="rounded-md border">
        <ScrollArea className="h-72">
          <div className="p-2">
            {isLoading && (
              <div className="flex items-center gap-2 px-2 py-6 text-xs text-muted-foreground">
                <Spinner className="h-4 w-4" />
                加载中...
              </div>
            )}
            {!isLoading && error && (
              <div className="px-2 py-6 text-xs text-destructive">
                {error}
              </div>
            )}
            {!isLoading && !error && visibleItems.length === 0 && (
              <div className="px-2 py-6 text-xs text-muted-foreground">
                无匹配结果
              </div>
            )}
            {!isLoading && !error && visibleItems.map((it) => {
              const checked = allEnabled ? true : selected.has(it.key);
              return (
                <label
                  key={it.key}
                  className={cn(
                    "flex cursor-pointer items-start gap-2 rounded px-2 py-1.5 hover:bg-accent",
                    allEnabled && "cursor-not-allowed opacity-70",
                  )}
                >
                  <Checkbox
                    className="mt-0.5"
                    checked={checked}
                    disabled={allEnabled}
                    onCheckedChange={(v) => onToggleOne(it.key, v === true)}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs font-medium">{it.label}</div>
                    {it.hint && <div className="truncate text-[10px] text-muted-foreground">{it.hint}</div>}
                  </div>
                </label>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export function ConfigArchiveExportDialog({
  open,
  onOpenChange,
  projectId,
  disabled,
  isExporting,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string | null;
  disabled?: boolean;
  isExporting?: boolean;
  onConfirm: (options: ArchiveExportOptions) => void;
}) {
  const pages = useProjectPagesStore((s) => s.pages);
  const flows = useProjectFlowsStore((s) => s.flows);

  const endpoints = useProjectEndpointsStore((s) => s.endpoints);
  const endpointsLoading = useProjectEndpointsStore((s) => s.isLoading);
  const endpointsError = useProjectEndpointsStore((s) => s.error);
  const endpointsInit = useProjectEndpointsStore((s) => s.initializedProjectId);
  const loadEndpoints = useProjectEndpointsStore((s) => s.loadByProjectId);
  const setEndpointsInit = useProjectEndpointsStore((s) => s.setInitializedProjectId);

  const routes = useProjectRoutesStore((s) => s.routes);
  const routesLoading = useProjectRoutesStore((s) => s.isLoading);
  const routesError = useProjectRoutesStore((s) => s.error);
  const routesInit = useProjectRoutesStore((s) => s.initializedProjectId);
  const loadRoutes = useProjectRoutesStore((s) => s.loadByProjectId);
  const setRoutesInit = useProjectRoutesStore((s) => s.setInitializedProjectId);

  const models = useProjectModelsStore((s) => s.models);
  const modelsLoading = useProjectModelsStore((s) => s.isLoading);
  const modelsError = useProjectModelsStore((s) => s.error);
  const modelsInit = useProjectModelsStore((s) => s.initializedProjectId);
  const loadModels = useProjectModelsStore((s) => s.loadByProjectId);
  const setModelsInit = useProjectModelsStore((s) => s.setInitializedProjectId);

  const auth = useProjectAuthStore((s) => s.auth);
  const authLoading = useProjectAuthStore((s) => s.isLoading);
  const authError = useProjectAuthStore((s) => s.error);
  const authInit = useProjectAuthStore((s) => s.initializedProjectId);
  const loadAuth = useProjectAuthStore((s) => s.loadByProjectId);
  const setAuthInit = useProjectAuthStore((s) => s.setInitializedProjectId);

  const [activeTab, setActiveTab] = useState("pages");

  const [redactSecrets, setRedactSecrets] = useState(true);
  const [includeAuth, setIncludeAuth] = useState(true);

  const [pagesAll, setPagesAll] = useState(true);
  const [routesAll, setRoutesAll] = useState(true);
  const [modelsAll, setModelsAll] = useState(true);
  const [flowsAll, setFlowsAll] = useState(true);
  const [endpointsAll, setEndpointsAll] = useState(true);

  const [pagesSelected, setPagesSelected] = useState<Set<string>>(new Set());
  const [routesSelected, setRoutesSelected] = useState<Set<string>>(new Set());
  const [modelsSelected, setModelsSelected] = useState<Set<string>>(new Set());
  const [flowsSelected, setFlowsSelected] = useState<Set<string>>(new Set());
  const [endpointsSelected, setEndpointsSelected] = useState<Set<string>>(new Set());

  const [pagesSearch, setPagesSearch] = useState("");
  const [routesSearch, setRoutesSearch] = useState("");
  const [modelsSearch, setModelsSearch] = useState("");
  const [flowsSearch, setFlowsSearch] = useState("");
  const [endpointsSearch, setEndpointsSearch] = useState("");

  const pageItems: SelectableItem[] = useMemo(() => {
    return (pages ?? []).map((p) => ({
      key: p.path,
      label: p.path,
      hint: p.title ? `标题：${p.title}` : undefined,
    }));
  }, [pages]);

  const routeItems: SelectableItem[] = useMemo(() => {
    return (routes ?? []).map((r) => ({
      key: r.path,
      label: r.path,
      hint: r.auth_required ? "需要认证" : undefined,
    }));
  }, [routes]);

  const modelItems: SelectableItem[] = useMemo(() => {
    return (models ?? []).map((m) => ({
      key: m.table_name,
      label: m.table_name,
    }));
  }, [models]);

  const flowItems: SelectableItem[] = useMemo(() => {
    return (flows ?? []).map((f) => ({
      key: archiveFlowKey(f),
      label: f.name,
      hint: archiveFlowKey(f),
    }));
  }, [flows]);

  const endpointItems: SelectableItem[] = useMemo(() => {
    return (endpoints ?? []).map((e) => ({
      key: archiveEndpointKey(e),
      label: archiveEndpointKey(e),
      hint: e.description ? `描述：${e.description}` : undefined,
    }));
  }, [endpoints]);

  useEffect(() => {
    if (!open) return;
    setActiveTab("pages");
    setRedactSecrets(true);
    setIncludeAuth(true);
    setPagesAll(true);
    setRoutesAll(true);
    setModelsAll(true);
    setFlowsAll(true);
    setEndpointsAll(true);
    setPagesSelected(new Set());
    setRoutesSelected(new Set());
    setModelsSelected(new Set());
    setFlowsSelected(new Set());
    setEndpointsSelected(new Set());
    setPagesSearch("");
    setRoutesSearch("");
    setModelsSearch("");
    setFlowsSearch("");
    setEndpointsSearch("");
  }, [open, projectId]);

  useEffect(() => {
    if (!open || !projectId) return;

    if (routesInit !== projectId && !routesLoading) {
      setRoutesInit(projectId);
      loadRoutes(projectId);
    }
    if (modelsInit !== projectId && !modelsLoading) {
      setModelsInit(projectId);
      loadModels(projectId);
    }
    if (authInit !== projectId && !authLoading) {
      setAuthInit(projectId);
      loadAuth(projectId);
    }
    if (endpointsInit !== projectId && !endpointsLoading) {
      setEndpointsInit(projectId);
      loadEndpoints(projectId);
    }
  }, [
    open,
    projectId,
    routesInit,
    routesLoading,
    setRoutesInit,
    loadRoutes,
    modelsInit,
    modelsLoading,
    setModelsInit,
    loadModels,
    authInit,
    authLoading,
    setAuthInit,
    loadAuth,
    endpointsInit,
    endpointsLoading,
    setEndpointsInit,
    loadEndpoints,
  ]);

  const pagesKeys = useMemo(() => pageItems.map((i) => i.key), [pageItems]);
  const routesKeys = useMemo(() => routeItems.map((i) => i.key), [routeItems]);
  const modelsKeys = useMemo(() => modelItems.map((i) => i.key), [modelItems]);
  const flowsKeys = useMemo(() => flowItems.map((i) => i.key), [flowItems]);
  const endpointsKeys = useMemo(() => endpointItems.map((i) => i.key), [endpointItems]);

  const selection: ArchiveSelection = useMemo(() => {
    return {
      project: true,
      pages: toCategoryValue(pagesAll, pagesSelected, pagesKeys),
      routes: toCategoryValue(routesAll, routesSelected, routesKeys),
      models: toCategoryValue(modelsAll, modelsSelected, modelsKeys),
      flows: toCategoryValue(flowsAll, flowsSelected, flowsKeys),
      endpoints: toCategoryValue(endpointsAll, endpointsSelected, endpointsKeys),
      auth: includeAuth ? "all" : "none",
    };
  }, [
    pagesAll,
    pagesSelected,
    pagesKeys,
    routesAll,
    routesSelected,
    routesKeys,
    modelsAll,
    modelsSelected,
    modelsKeys,
    flowsAll,
    flowsSelected,
    flowsKeys,
    endpointsAll,
    endpointsSelected,
    endpointsKeys,
    includeAuth,
  ]);

  const canSubmit = !!projectId && !disabled && !isExporting;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>配置归档导出</DialogTitle>
          <DialogDescription>
            支持按需选择要导出的配置资源。注意：导出时会自动补齐必要依赖（例如 Endpoint 引用的 Flow）。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 rounded-md border p-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">脱敏敏感信息</span>
              <Switch checked={redactSecrets} onCheckedChange={setRedactSecrets} />
            </div>
            <Separator orientation="vertical" className="h-5" />
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">包含鉴权配置</span>
              <Switch checked={includeAuth} onCheckedChange={setIncludeAuth} />
              {!authLoading && !authError && !auth && (
                <span className="text-[10px] text-muted-foreground">（当前项目未配置鉴权）</span>
              )}
            </div>
            {authError && (
              <span className="text-[10px] text-destructive">鉴权配置读取失败：{authError}</span>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="pages" className="text-xs">页面</TabsTrigger>
              <TabsTrigger value="routes" className="text-xs">路由</TabsTrigger>
              <TabsTrigger value="models" className="text-xs">模型</TabsTrigger>
              <TabsTrigger value="flows" className="text-xs">流程</TabsTrigger>
              <TabsTrigger value="endpoints" className="text-xs">端点</TabsTrigger>
            </TabsList>

            <TabsContent value="pages">
              <SelectionPanel
                title="页面（Pages）"
                items={pageItems}
                isLoading={false}
                error={null}
                allEnabled={pagesAll}
                onToggleAll={(next) => {
                  setPagesAll(next);
                  if (!next) setPagesSelected(new Set(pagesKeys));
                  else setPagesSelected(new Set());
                }}
                selected={pagesSelected}
                onToggleOne={(key, checked) => {
                  setPagesSelected((prev) => {
                    const next = new Set(prev);
                    if (checked) next.add(key);
                    else next.delete(key);
                    return next;
                  });
                }}
                onSelectAll={() => setPagesSelected(new Set(pagesKeys))}
                onClearAll={() => setPagesSelected(new Set())}
                search={pagesSearch}
                onSearchChange={setPagesSearch}
              />
            </TabsContent>

            <TabsContent value="routes">
              <SelectionPanel
                title="路由（Routes）"
                items={routeItems}
                isLoading={routesLoading}
                error={routesError}
                allEnabled={routesAll}
                onToggleAll={(next) => {
                  setRoutesAll(next);
                  if (!next) setRoutesSelected(new Set(routesKeys));
                  else setRoutesSelected(new Set());
                }}
                selected={routesSelected}
                onToggleOne={(key, checked) => {
                  setRoutesSelected((prev) => {
                    const next = new Set(prev);
                    if (checked) next.add(key);
                    else next.delete(key);
                    return next;
                  });
                }}
                onSelectAll={() => setRoutesSelected(new Set(routesKeys))}
                onClearAll={() => setRoutesSelected(new Set())}
                search={routesSearch}
                onSearchChange={setRoutesSearch}
              />
            </TabsContent>

            <TabsContent value="models">
              <SelectionPanel
                title="数据模型（Models）"
                items={modelItems}
                isLoading={modelsLoading}
                error={modelsError}
                allEnabled={modelsAll}
                onToggleAll={(next) => {
                  setModelsAll(next);
                  if (!next) setModelsSelected(new Set(modelsKeys));
                  else setModelsSelected(new Set());
                }}
                selected={modelsSelected}
                onToggleOne={(key, checked) => {
                  setModelsSelected((prev) => {
                    const next = new Set(prev);
                    if (checked) next.add(key);
                    else next.delete(key);
                    return next;
                  });
                }}
                onSelectAll={() => setModelsSelected(new Set(modelsKeys))}
                onClearAll={() => setModelsSelected(new Set())}
                search={modelsSearch}
                onSearchChange={setModelsSearch}
              />
            </TabsContent>

            <TabsContent value="flows">
              <SelectionPanel
                title="流程（Flows）"
                items={flowItems}
                isLoading={false}
                error={null}
                allEnabled={flowsAll}
                onToggleAll={(next) => {
                  setFlowsAll(next);
                  if (!next) setFlowsSelected(new Set(flowsKeys));
                  else setFlowsSelected(new Set());
                }}
                selected={flowsSelected}
                onToggleOne={(key, checked) => {
                  setFlowsSelected((prev) => {
                    const next = new Set(prev);
                    if (checked) next.add(key);
                    else next.delete(key);
                    return next;
                  });
                }}
                onSelectAll={() => setFlowsSelected(new Set(flowsKeys))}
                onClearAll={() => setFlowsSelected(new Set())}
                search={flowsSearch}
                onSearchChange={setFlowsSearch}
              />
            </TabsContent>

            <TabsContent value="endpoints">
              <SelectionPanel
                title="API 端点（Endpoints）"
                items={endpointItems}
                isLoading={endpointsLoading}
                error={endpointsError}
                allEnabled={endpointsAll}
                onToggleAll={(next) => {
                  setEndpointsAll(next);
                  if (!next) setEndpointsSelected(new Set(endpointsKeys));
                  else setEndpointsSelected(new Set());
                }}
                selected={endpointsSelected}
                onToggleOne={(key, checked) => {
                  setEndpointsSelected((prev) => {
                    const next = new Set(prev);
                    if (checked) next.add(key);
                    else next.delete(key);
                    return next;
                  });
                }}
                onSelectAll={() => setEndpointsSelected(new Set(endpointsKeys))}
                onClearAll={() => setEndpointsSelected(new Set())}
                search={endpointsSearch}
                onSearchChange={setEndpointsSearch}
              />
            </TabsContent>
          </Tabs>

          <div className="rounded-md border bg-muted/30 p-3 text-xs text-muted-foreground">
            <div className="font-medium text-foreground">导出摘要</div>
            <div className="mt-1 grid grid-cols-2 gap-x-6 gap-y-1">
              <div>页面：{selection?.pages === "all" ? "全部" : `${selection?.pages?.length ?? 0} 个`}</div>
              <div>路由：{selection?.routes === "all" ? "全部" : `${selection?.routes?.length ?? 0} 个`}</div>
              <div>模型：{selection?.models === "all" ? "全部" : `${selection?.models?.length ?? 0} 个`}</div>
              <div>流程：{selection?.flows === "all" ? "全部" : `${selection?.flows?.length ?? 0} 个`}</div>
              <div>端点：{selection?.endpoints === "all" ? "全部" : `${selection?.endpoints?.length ?? 0} 个`}</div>
              <div>鉴权：{selection?.auth === "all" ? "包含" : "不包含"}</div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isExporting}
          >
            取消
          </Button>
          <Button
            onClick={() => {
              if (!projectId) return;
              const options: ArchiveExportOptions = { selection, redactSecrets };
              onConfirm(options);
              onOpenChange(false);
            }}
            disabled={!canSubmit}
          >
            {isExporting ? "导出中..." : "开始导出"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

