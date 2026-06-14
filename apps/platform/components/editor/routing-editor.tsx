/**
 * 路由编辑器 —— 可视化设计应用路由树、API 端点、重定向规则和导航菜单
 *
 * 支持：页面路由 / API 路由 / 布局 / 重定向四种类型，
 * 嵌套路由树（父子关系）、认证守卫、SEO 元数据、导航菜单配置。
 *
 * @author xiye
 * @date 2026-06-14
 */

"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Route, Globe, Shield, Menu, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

/** 路由定义 —— 包含路径、类型、父子关系、认证、SEO、导航等全部配置 */
interface RouteDef {
  id: string;
  path: string;
  type: "page" | "api" | "layout" | "redirect";
  parentId: string | null;
  layout: string;
  authGuard: "public" | "authenticated" | "role";
  requiredRole: string;
  httpMethod: string;
  boundFlow: string;
  title: string;
  description: string;
  ogImage: string;
  inNavigation: boolean;
  navLabel: string;
  navIcon: string;
  navOrder: number;
  redirectSource: string;
  redirectDestination: string;
  redirectStatus: "301" | "302";
}

/** 树递归最大深度，防止循环引用导致栈溢出 */
const MAX_TREE_DEPTH = 100;

/**
 * 创建默认路由对象，使用 Partial<RouteDef> 覆盖默认值
 *
 * @param overrides - 包含 id（必填）和其他可选覆盖字段
 * @returns 完整填充的 RouteDef 对象
 */
function createDefaultRoute(
  overrides: Partial<RouteDef> & { id: string }
): RouteDef {
  return {
    path: "/new-route",
    type: "page",
    parentId: null,
    layout: "",
    authGuard: "public",
    requiredRole: "",
    httpMethod: "GET",
    boundFlow: "",
    title: "",
    description: "",
    ogImage: "",
    inNavigation: false,
    navLabel: "",
    navIcon: "",
    navOrder: 0,
    redirectSource: "",
    redirectDestination: "",
    redirectStatus: "301",
    ...overrides,
  };
}

/** 应用默认路由预设：首页（/）和健康检查 API（/api/health） */
const DEFAULT_ROUTES: RouteDef[] = [
  createDefaultRoute({
    id: crypto.randomUUID(),
    path: "/",
    type: "page",
    authGuard: "public",
    title: "Home",
  }),
  createDefaultRoute({
    id: crypto.randomUUID(),
    path: "/api/health",
    type: "api",
    httpMethod: "GET",
    authGuard: "public",
  }),
];

/** 树节点 —— 路由引用 + 子节点列表 + 嵌套深度 */
interface TreeNode {
  route: RouteDef;
  children: TreeNode[];
  depth: number;
}

/**
 * 从扁平路由数组构建树结构
 *
 * 通过 parentId 建立父子关系，使用递归分配深度。
 * 内建循环检测：深度超过 MAX_TREE_DEPTH 时停止递归。
 *
 * @param routes - 路由定义数组
 * @returns 根节点数组（无 parentId 的路由）
 */
function buildTree(routes: RouteDef[]): TreeNode[] {
  const map = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  for (const route of routes) {
    map.set(route.id, { route, children: [], depth: 0 });
  }

  for (const route of routes) {
    const node = map.get(route.id)!;
    if (route.parentId && map.has(route.parentId)) {
      map.get(route.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  }

  /** 递归分配深度，带深度上限防止循环引用 */
  function assignDepth(nodes: TreeNode[], depth: number) {
    if (depth > MAX_TREE_DEPTH) return;
    for (const node of nodes) {
      node.depth = depth;
      assignDepth(node.children, depth + 1);
    }
  }
  assignDepth(roots, 0);

  return roots;
}

/**
 * 将树结构展平为一维数组（深度优先）
 *
 * 内建循环检测：visited 集合防止重复访问，深度超过上限时停止。
 *
 * @param nodes - 根节点数组
 * @returns 展平后的节点数组
 */
function flattenTree(nodes: TreeNode[]): TreeNode[] {
  const result: TreeNode[] = [];
  const visited = new Set<string>();
  function walk(list: TreeNode[], depth: number) {
    if (depth > MAX_TREE_DEPTH) return;
    for (const node of list) {
      if (visited.has(node.route.id)) continue;
      visited.add(node.route.id);
      result.push(node);
      walk(node.children, depth + 1);
    }
  }
  walk(nodes, 0);
  return result;
}

/**
 * 获取指定路由的所有后代 ID（递归）
 *
 * 内建循环检测：visited 集合防止无限递归。
 *
 * @param routeId - 起始路由 ID
 * @param routes - 路由定义数组
 * @param visited - 已访问 ID 集合（内部递归使用）
 * @returns 所有后代路由 ID 的 Set
 */
function getDescendantIds(
  routeId: string,
  routes: RouteDef[],
  visited: Set<string> = new Set()
): Set<string> {
  if (visited.has(routeId) || visited.size > MAX_TREE_DEPTH) return new Set();
  visited.add(routeId);
  const children = routes.filter((r) => r.parentId === routeId);
  const ids = new Set(children.map((c) => c.id));
  for (const child of children) {
    for (const id of getDescendantIds(child.id, routes, visited)) {
      ids.add(id);
    }
  }
  return ids;
}

/** 路由类型图标组件 —— 根据 type 显示对应 Lucide 图标 */
function RouteTypeIcon({ type }: { type: RouteDef["type"] }) {
  const cls = "h-3 w-3 shrink-0 text-muted-foreground";
  switch (type) {
    case "api":
      return <FileCode className={cls} />;
    case "layout":
      return <Shield className={cls} />;
    case "redirect":
      return <Globe className={cls} />;
    default:
      return <Route className={cls} />;
  }
}

/** HTTP 方法彩色徽章组件 —— 按 GET/POST/PUT/PATCH/DELETE 显示不同颜色 */
function HttpMethodBadge({ method }: { method: string }) {
  if (!method) return null;
  const colors: Record<string, string> = {
    GET: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    PUT: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    PATCH: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    DELETE: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };
  return (
    <span
      className={cn(
        "ml-1 shrink-0 rounded px-1 text-[9px] font-medium",
        colors[method] ?? "bg-muted text-muted-foreground",
      )}
    >
      {method}
    </span>
  );
}

/** 通用下拉选择字段组件 —— 带标签的原生 <select> */
function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-medium text-muted-foreground">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-7 w-full rounded border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/** 紧凑输入框组件 —— 带标签的受控输入，支持 type 切换 */
function CompactInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-medium text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-7 w-full rounded border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

/**
 * 路由编辑器主组件
 *
 * 左侧为路由树（支持嵌套展开、类型图标、HTTP 方法徽章），
 * 右侧为选中路由的详细配置面板（基本信息、布局/认证、API 配置、
 * SEO 元数据、重定向规则、导航菜单）。
 *
 * @returns JSX 元素
 */
export function RoutingEditor() {
  const [routes, setRoutes] = useState<RouteDef[]>(DEFAULT_ROUTES);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(
    DEFAULT_ROUTES[0]?.id ?? null,
  );

  const tree = useMemo(() => buildTree(routes), [routes]);
  const flatTree = useMemo(() => flattenTree(tree), [tree]);

  const selectedRoute = useMemo(
    () => routes.find((r) => r.id === selectedRouteId) ?? null,
    [routes, selectedRouteId],
  );

  const descendantIds = useMemo(
    () => (selectedRouteId ? getDescendantIds(selectedRouteId, routes) : new Set<string>()),
    [routes, selectedRouteId],
  );

  /** 更新路由的部分属性 */
  function updateRoute(id: string, patch: Partial<RouteDef>) {
    setRoutes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    );
  }

  /** 添加新路由，根据类型设置默认路径 */
  function addRoute(type: RouteDef["type"]) {
    const newRoute = createDefaultRoute({
      id: crypto.randomUUID(),
      type,
      path: type === "api" ? "/api/new-route" : "/new-route",
    });
    setRoutes((prev) => [...prev, newRoute]);
    setSelectedRouteId(newRoute.id);
  }

  /** 删除路由及其所有后代，根路由 / 不可删除 */
  function deleteRoute(id: string) {
    const isRoot = routes.find((r) => r.id === id)?.path === "/";
    if (isRoot) return;

    const children = routes.filter((r) => r.parentId === id);
    const childIds = new Set(children.map((c) => c.id));
    for (const child of children) {
      for (const cid of getDescendantIds(child.id, routes)) {
        childIds.add(cid);
      }
    }

    setRoutes((prev) => prev.filter((r) => r.id !== id && !childIds.has(r.id)));
    if (selectedRouteId === id || childIds.has(selectedRouteId!)) {
      const rootRoute = routes.find((r) => r.path === "/");
      setSelectedRouteId(rootRoute?.id ?? null);
    }
  }

  /** 父路由候选列表 —— 排除自身、后代和重定向类型 */
  const parentOptions = useMemo(() => {
    if (!selectedRoute) return [];
    return routes
      .filter(
        (r) =>
          r.id !== selectedRoute.id &&
          !descendantIds.has(r.id) &&
          r.type !== "redirect",
      )
      .map((r) => ({ value: r.id, label: r.path }));
  }, [routes, selectedRoute, descendantIds]);

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Route Tree */}
      <div className="flex w-72 shrink-0 flex-col border-r bg-background">
        <div className="flex h-9 items-center border-b px-3">
          <span className="text-xs font-medium text-muted-foreground">
            Route Tree
          </span>
          <span className="ml-auto text-[10px] text-muted-foreground">
            {routes.length}
          </span>
        </div>

        <div className="flex gap-1 border-b p-1.5">
          <Button
            variant="outline"
            size="sm"
            className="h-7 flex-1 text-[10px]"
            onClick={() => addRoute("page")}
          >
            <Plus className="mr-1 h-3 w-3" />
            Page
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 flex-1 text-[10px]"
            onClick={() => addRoute("api")}
          >
            <Plus className="mr-1 h-3 w-3" />
            API
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-1">
            {flatTree.length === 0 ? (
              <div className="px-2 py-8 text-center text-xs text-muted-foreground">
                No routes defined
              </div>
            ) : (
              flatTree.map(({ route, depth }) => {
                const isSelected = selectedRouteId === route.id;
                const isRoot = route.path === "/";

                return (
                  <div
                    key={route.id}
                    className={cn(
                      "group flex items-center gap-1 rounded px-1 py-0.5 text-xs cursor-pointer transition-colors hover:bg-accent",
                      isSelected &&
                        "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
                    )}
                    style={{ paddingLeft: `${depth * 16 + 4}px` }}
                    onClick={() => setSelectedRouteId(route.id)}
                  >
                    <RouteTypeIcon type={route.type} />
                    <span className="flex-1 truncate">{route.path}</span>
                    {route.type === "api" && (
                      <HttpMethodBadge method={route.httpMethod} />
                    )}
                    {!isRoot && (
                      <button
                        className="shrink-0 rounded p-0.5 opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteRoute(route.id);
                        }}
                        title="Delete route"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Main Area - Route Configuration */}
      <div className="flex flex-1 flex-col min-w-0">
        <div className="flex h-9 items-center border-b px-3">
          <span className="text-xs font-medium text-muted-foreground">
            Route Configuration
          </span>
        </div>

        <ScrollArea className="flex-1">
          {selectedRoute ? (
            <div className="space-y-4 p-3">
              {/* Basic Info */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Basic Info
                </h3>
                <CompactInput
                  label="Path"
                  value={selectedRoute.path}
                  onChange={(v) => updateRoute(selectedRoute.id, { path: v })}
                  placeholder="/dashboard"
                />

                <SelectField
                  label="Route Type"
                  value={selectedRoute.type}
                  onChange={(v) =>
                    updateRoute(selectedRoute.id, {
                      type: v as RouteDef["type"],
                    })
                  }
                  options={[
                    { value: "page", label: "Page Route" },
                    { value: "api", label: "API Route" },
                    { value: "layout", label: "Layout" },
                    { value: "redirect", label: "Redirect" },
                  ]}
                />

                <div>
                  <label className="mb-1 block text-[10px] font-medium text-muted-foreground">
                    Parent Route
                  </label>
                  <select
                    value={selectedRoute.parentId ?? ""}
                    onChange={(e) =>
                      updateRoute(selectedRoute.id, {
                        parentId: e.target.value || null,
                      })
                    }
                    className="h-7 w-full rounded border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">None (root level)</option>
                    {parentOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Separator />

              {/* Layout & Auth */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Layout &amp; Auth
                </h3>
                <CompactInput
                  label="Layout"
                  value={selectedRoute.layout}
                  onChange={(v) =>
                    updateRoute(selectedRoute.id, { layout: v })
                  }
                  placeholder="dashboard-layout"
                />

                <SelectField
                  label="Auth Guard"
                  value={selectedRoute.authGuard}
                  onChange={(v) =>
                    updateRoute(selectedRoute.id, {
                      authGuard: v as RouteDef["authGuard"],
                    })
                  }
                  options={[
                    { value: "public", label: "Public" },
                    { value: "authenticated", label: "Authenticated" },
                    { value: "role", label: "Role Required" },
                  ]}
                />

                {selectedRoute.authGuard === "role" && (
                  <CompactInput
                    label="Required Role"
                    value={selectedRoute.requiredRole}
                    onChange={(v) =>
                      updateRoute(selectedRoute.id, { requiredRole: v })
                    }
                    placeholder="admin"
                  />
                )}
              </div>

              {/* API Route Config */}
              {selectedRoute.type === "api" && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      API Route Config
                    </h3>
                    <SelectField
                      label="HTTP Method"
                      value={selectedRoute.httpMethod}
                      onChange={(v) =>
                        updateRoute(selectedRoute.id, { httpMethod: v })
                      }
                      options={[
                        { value: "GET", label: "GET" },
                        { value: "POST", label: "POST" },
                        { value: "PUT", label: "PUT" },
                        { value: "PATCH", label: "PATCH" },
                        { value: "DELETE", label: "DELETE" },
                      ]}
                    />
                    <CompactInput
                      label="Bound Flow"
                      value={selectedRoute.boundFlow}
                      onChange={(v) =>
                        updateRoute(selectedRoute.id, { boundFlow: v })
                      }
                      placeholder="flow-xxxx"
                    />
                  </div>
                </>
              )}

              {/* SEO Metadata */}
              {selectedRoute.type === "page" && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      SEO Metadata
                    </h3>
                    <CompactInput
                      label="Page Title"
                      value={selectedRoute.title}
                      onChange={(v) =>
                        updateRoute(selectedRoute.id, { title: v })
                      }
                      placeholder="My Page"
                    />
                    <div>
                      <label className="mb-1 block text-[10px] font-medium text-muted-foreground">
                        Description
                      </label>
                      <textarea
                        value={selectedRoute.description}
                        placeholder="Page description for SEO"
                        onChange={(e) =>
                          updateRoute(selectedRoute.id, {
                            description: e.target.value,
                          })
                        }
                        rows={2}
                        className="w-full rounded border bg-background px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                      />
                    </div>
                    <CompactInput
                      label="OG Image URL"
                      value={selectedRoute.ogImage}
                      onChange={(v) =>
                        updateRoute(selectedRoute.id, { ogImage: v })
                      }
                      placeholder="https://..."
                    />
                  </div>
                </>
              )}

              {/* Redirect Rules */}
              {selectedRoute.type === "redirect" && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Redirect Rules
                    </h3>
                    <CompactInput
                      label="Source Path"
                      value={selectedRoute.redirectSource}
                      onChange={(v) =>
                        updateRoute(selectedRoute.id, { redirectSource: v })
                      }
                      placeholder="/old-path"
                    />
                    <CompactInput
                      label="Destination Path"
                      value={selectedRoute.redirectDestination}
                      onChange={(v) =>
                        updateRoute(selectedRoute.id, {
                          redirectDestination: v,
                        })
                      }
                      placeholder="/new-path"
                    />
                    <SelectField
                      label="Status Code"
                      value={selectedRoute.redirectStatus}
                      onChange={(v) =>
                        updateRoute(selectedRoute.id, {
                          redirectStatus: v as "301" | "302",
                        })
                      }
                      options={[
                        { value: "301", label: "301 Permanent" },
                        { value: "302", label: "302 Temporary" },
                      ]}
                    />
                  </div>
                </>
              )}

              {/* Navigation Menu */}
              <Separator />
              <div className="space-y-2">
                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Navigation Menu
                </h3>
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor={`nav-toggle-${selectedRoute.id}`}
                    className="text-xs"
                  >
                    Add to Navigation
                  </Label>
                  <Switch
                    id={`nav-toggle-${selectedRoute.id}`}
                    checked={selectedRoute.inNavigation}
                    onCheckedChange={(checked) =>
                      updateRoute(selectedRoute.id, { inNavigation: checked })
                    }
                  />
                </div>

                {selectedRoute.inNavigation && (
                  <div className="space-y-2 rounded border p-2">
                    <CompactInput
                      label="Menu Label"
                      value={selectedRoute.navLabel}
                      onChange={(v) =>
                        updateRoute(selectedRoute.id, { navLabel: v })
                      }
                      placeholder="Dashboard"
                    />
                    <CompactInput
                      label="Icon Name (Lucide)"
                      value={selectedRoute.navIcon}
                      onChange={(v) =>
                        updateRoute(selectedRoute.id, { navIcon: v })
                      }
                      placeholder="LayoutDashboard"
                    />
                    <CompactInput
                      label="Order"
                      value={String(selectedRoute.navOrder)}
                      onChange={(v) =>
                        updateRoute(selectedRoute.id, {
                          navOrder: Number(v) || 0,
                        })
                      }
                      type="number"
                    />
                  </div>
                )}

                {/* Show all nav items */}
                {routes.filter((r) => r.inNavigation).length > 0 && (
                  <div className="mt-2 space-y-0.5">
                    <span className="text-[10px] font-medium text-muted-foreground">
                      Current Navigation Items
                    </span>
                    {routes
                      .filter((r) => r.inNavigation)
                      .sort((a, b) => a.navOrder - b.navOrder)
                      .map((r) => (
                        <div
                          key={r.id}
                          className={cn(
                            "flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px]",
                            r.id === selectedRoute.id &&
                              "bg-blue-50 dark:bg-blue-900/20",
                          )}
                        >
                          <Menu className="h-3 w-3 shrink-0 text-muted-foreground" />
                          <span className="flex-1 truncate">
                            {r.navLabel || r.path}
                          </span>
                          <span className="shrink-0 text-[9px] text-muted-foreground">
                            #{r.navOrder}
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center p-3 text-center text-xs text-muted-foreground">
              Select a route to configure
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
