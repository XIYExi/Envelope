/**
 * API 端点编辑器 —— 可视化设计 REST API 路由、请求/响应 Schema、中间件和流绑定
 *
 * 提供完整的 API 路由设计能力：
 * - 端点 CRUD（GET/POST/PUT/PATCH/DELETE）
 * - 请求校验 Schema（Query 参数、Header、Body）
 * - 响应定义（成功 + 错误响应）
 * - 中间件配置（认证、限流、CORS、日志）
 * - 流程绑定（关联到 @envelope/flow）
 * - 内建测试界面（Mock UI）
 * - OpenAPI 3.0 JSON 导出
 *
 * @author xiye
 * @date 2026-06-14
 */

"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useFlowBindingStore } from "@envelope/flow";
import { useProjectEndpointsStore } from "@/stores/project-endpoints";
import type { ProjectEndpoint } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";
import {
  Plus, Trash2, Search, Download, Play,
  Shield, Gauge, Globe, Braces, FileText,
  Network, X,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

/** Query 参数定义 */
interface QueryParam {
  /** 参数名 */
  name: string;
  /** 参数类型 */
  type: "string" | "number" | "boolean";
  /** 是否必填 */
  required: boolean;
  /** 参数说明 */
  description: string;
}

/** 请求 Header 定义 */
interface RequestHeader {
  /** Header 名称 */
  name: string;
  /** 是否必填 */
  required: boolean;
  /** Header 说明 */
  description: string;
}

/** 错误响应定义 */
interface ErrorResponse {
  /** HTTP 状态码 */
  statusCode: number;
  /** 错误描述 */
  description: string;
  /** 示例响应体 */
  exampleBody: string;
}

/** API 端点完整定义 */
interface APIEndpointDef {
  /** 唯一标识 */
  id: string;
  /** HTTP 方法 */
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /** 路由路径 */
  path: string;
  /** 端点描述 */
  description: string;
  /** 标签列表 */
  tags: string[];
  /** Query 参数列表 */
  queryParams: QueryParam[];
  /** 请求体类型 */
  requestBodyType: "none" | "json" | "form-data";
  /** 请求体 Schema（JSON Schema 或示例 JSON） */
  requestBodySchema: string;
  /** 请求 Header 列表 */
  headers: RequestHeader[];
  /** 是否需要认证 */
  authRequired: boolean;
  /** 必需角色 */
  requiredRole: string;
  /** 是否启用限流 */
  rateLimitEnabled: boolean;
  /** 每分钟请求数上限 */
  rateLimitRPM: number;
  /** 是否启用 CORS */
  corsEnabled: boolean;
  /** 是否启用请求日志 */
  loggingEnabled: boolean;
  /** 绑定的流程 ID */
  boundFlow: string;
  /** 自定义处理器代码 */
  customHandler: string;
  /** 成功状态码 */
  successStatus: number;
  /** 成功响应示例 */
  successExample: string;
  /** 错误响应列表 */
  errorResponses: ErrorResponse[];
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

/** 创建默认端点对象 */
function createDefaultEndpoint(
  overrides: Partial<APIEndpointDef> & { id: string },
): APIEndpointDef {
  return {
    method: "GET",
    path: "/api/new-endpoint",
    description: "",
    tags: [],
    queryParams: [],
    requestBodyType: "none",
    requestBodySchema: "",
    headers: [],
    authRequired: false,
    requiredRole: "",
    rateLimitEnabled: false,
    rateLimitRPM: 60,
    corsEnabled: true,
    loggingEnabled: true,
    boundFlow: "",
    customHandler: "",
    successStatus: 200,
    successExample: "",
    errorResponses: [],
    ...overrides,
  };
}

/** 预设端点 */
const DEFAULT_ENDPOINTS: APIEndpointDef[] = [
  createDefaultEndpoint({
    id: crypto.randomUUID(),
    method: "GET",
    path: "/api/health",
    description: "Health check endpoint",
    tags: ["system"],
  }),
  createDefaultEndpoint({
    id: crypto.randomUUID(),
    method: "POST",
    path: "/api/users",
    description: "Create a new user",
    tags: ["users"],
    requestBodyType: "json",
    requestBodySchema: JSON.stringify(
      { name: "string", email: "string", role: "string" },
      null,
      2,
    ),
    successStatus: 201,
    successExample: JSON.stringify(
      { id: "uuid", name: "John", email: "john@example.com" },
      null,
      2,
    ),
    errorResponses: [
      {
        statusCode: 400,
        description: "Invalid request body",
        exampleBody: JSON.stringify({ error: "Missing required field: email" }, null, 2),
      },
      {
        statusCode: 409,
        description: "User already exists",
        exampleBody: JSON.stringify({ error: "User with this email already exists" }, null, 2),
      },
    ],
  }),
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** HTTP 方法颜色映射 */
const METHOD_COLORS: Record<string, string> = {
  GET: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  PUT: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  PATCH: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  DELETE: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

/** HTTP 方法徽章组件 */
function MethodBadge({ method }: { method: APIEndpointDef["method"] }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded px-1.5 py-0 text-[9px] font-semibold uppercase leading-[18px]",
        METHOD_COLORS[method] ?? "bg-muted text-muted-foreground",
      )}
    >
      {method}
    </span>
  );
}

/** 紧凑文本输入组件 */
function CompactInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
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

/** 紧凑下拉选择组件 */
function CompactSelect({
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

/** 紧凑文本域组件 */
function CompactTextarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  monospace,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  monospace?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-medium text-muted-foreground">
        {label}
      </label>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={cn(
          "w-full rounded border bg-background px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none",
          monospace && "font-mono bg-zinc-950 text-zinc-200 dark:bg-zinc-900",
        )}
      />
    </div>
  );
}

/** 开关行组件 */
function ToggleRow({
  label,
  checked,
  onCheckedChange,
  children,
  icon: Icon,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  children?: React.ReactNode;
  icon?: React.ElementType;
}) {
  return (
    <div className="space-y-1.5 rounded border p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {Icon && <Icon className="h-3 w-3 text-muted-foreground" />}
          <Label className="text-[10px] cursor-pointer">{label}</Label>
        </div>
        <Switch
          checked={checked}
          onCheckedChange={onCheckedChange}
          className="scale-75"
        />
      </div>
      {checked && children}
    </div>
  );
}

// ─── OpenAPI Export ───────────────────────────────────────────────────────────

/**
 * 将端点定义数组导出为 OpenAPI 3.0 JSON 字符串
 *
 * 生成符合 OpenAPI 3.0 Specification 的完整文档，
 * 包含路径、方法、参数、请求体、响应和标签。
 *
 * @param endpoints - API 端点定义数组
 * @returns 格式化的 OpenAPI 3.0 JSON 字符串
 */
export function exportToOpenAPI(endpoints: APIEndpointDef[]): string {
  const paths: Record<string, Record<string, unknown>> = {};
  const tagSet = new Set<string>();

  for (const ep of endpoints) {
    for (const tag of ep.tags) tagSet.add(tag);

    if (!paths[ep.path]) paths[ep.path] = {};

    const method = ep.method.toLowerCase();
    const parameters: unknown[] = [];

    // Header 参数
    for (const h of ep.headers) {
      parameters.push({
        name: h.name,
        in: "header",
        required: h.required,
        description: h.description,
        schema: { type: "string" },
      });
    }

    // Query 参数
    for (const q of ep.queryParams) {
      parameters.push({
        name: q.name,
        in: "query",
        required: q.required,
        description: q.description,
        schema: { type: q.type },
      });
    }

    const operation: Record<string, unknown> = {
      summary: ep.description || ep.path,
      tags: ep.tags.length > 0 ? ep.tags : ["default"],
      parameters: parameters.length > 0 ? parameters : undefined,
      responses: {},
    };

    // 安全
    if (ep.authRequired) {
      operation.security = [{ bearerAuth: [] }];
    }

    // 请求体
    if (ep.requestBodyType !== "none" && (method === "post" || method === "put" || method === "patch")) {
      operation.requestBody = {
        required: true,
        content: {
          [ep.requestBodyType === "json" ? "application/json" : "multipart/form-data"]: {
            schema: ep.requestBodySchema ? tryParseJSON(ep.requestBodySchema) : { type: "object" },
          },
        },
      };
    }

    // 成功响应
    const successDesc = ep.successStatus === 200
      ? "Successful response"
      : ep.successStatus === 201
        ? "Created"
        : "No Content";

    (operation.responses as Record<string, unknown>)[String(ep.successStatus)] = {
      description: successDesc,
      ...(ep.successExample
        ? {
            content: {
              "application/json": {
                schema: tryParseJSON(ep.successExample),
              },
            },
          }
        : {}),
    };

    // 错误响应
    for (const err of ep.errorResponses) {
      (operation.responses as Record<string, unknown>)[String(err.statusCode)] = {
        description: err.description,
        ...(err.exampleBody
          ? {
              content: {
                "application/json": {
                  schema: tryParseJSON(err.exampleBody),
                },
              },
            }
          : {}),
      };
    }

    paths[ep.path]![method] = operation;
  }

  const openapi = {
    openapi: "3.0.3",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Generated by Envelope V3 API Endpoint Editor",
    },
    servers: [{ url: "http://localhost:3000", description: "Development server" }],
    tags: [...tagSet].sort().map((name) => ({ name })),
    paths,
    ...(endsHaveAuth(endpoints)
      ? {
          components: {
            securitySchemes: {
              bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
              },
            },
          },
        }
      : {}),
  };

  return JSON.stringify(openapi, null, 2);
}

/** 安全地将 JSON 字符串解析为对象，失败返回原始字符串 */
function tryParseJSON(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return { type: "object" };
  }
}

/** 检查端点数组中是否有任一启用了认证 */
function endsHaveAuth(endpoints: APIEndpointDef[]): boolean {
  return endpoints.some((ep) => ep.authRequired);
}

function endpointDefToRow(ep: APIEndpointDef): Omit<ProjectEndpoint, "project_id" | "created_at" | "updated_at"> {
  return {
    id: ep.id,
    method: ep.method,
    path: ep.path,
    description: ep.description ?? "",
    request_schema: {
      tags: ep.tags,
      queryParams: ep.queryParams,
      requestBodyType: ep.requestBodyType,
      requestBodySchema: ep.requestBodySchema,
      headers: ep.headers,
    } as unknown,
    response_schema: {
      successStatus: ep.successStatus,
      successExample: ep.successExample,
      errorResponses: ep.errorResponses,
    } as unknown,
    middleware: {
      authRequired: ep.authRequired,
      requiredRole: ep.requiredRole,
      rateLimitEnabled: ep.rateLimitEnabled,
      rateLimitRPM: ep.rateLimitRPM,
      corsEnabled: ep.corsEnabled,
      loggingEnabled: ep.loggingEnabled,
    } as unknown,
    flow_id: ep.boundFlow ? ep.boundFlow : null,
    is_active: true,
  };
}

function rowToEndpointDef(row: ProjectEndpoint): APIEndpointDef {
  const req = (row.request_schema ?? {}) as any;
  const res = (row.response_schema ?? {}) as any;
  const mid = (row.middleware ?? {}) as any;
  return createDefaultEndpoint({
    id: row.id,
    method: row.method,
    path: row.path,
    description: row.description ?? "",
    tags: Array.isArray(req.tags) ? req.tags : [],
    queryParams: Array.isArray(req.queryParams) ? req.queryParams : [],
    requestBodyType: (req.requestBodyType as APIEndpointDef["requestBodyType"]) ?? "none",
    requestBodySchema: typeof req.requestBodySchema === "string" ? req.requestBodySchema : "",
    headers: Array.isArray(req.headers) ? req.headers : [],
    authRequired: Boolean(mid.authRequired),
    requiredRole: typeof mid.requiredRole === "string" ? mid.requiredRole : "",
    rateLimitEnabled: Boolean(mid.rateLimitEnabled),
    rateLimitRPM: typeof mid.rateLimitRPM === "number" ? mid.rateLimitRPM : 60,
    corsEnabled: mid.corsEnabled !== false,
    loggingEnabled: mid.loggingEnabled !== false,
    boundFlow: row.flow_id ?? "",
    customHandler: "",
    successStatus: typeof res.successStatus === "number" ? res.successStatus : 200,
    successExample: typeof res.successExample === "string" ? res.successExample : "",
    errorResponses: Array.isArray(res.errorResponses) ? res.errorResponses : [],
  });
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * API 端点编辑器主组件
 *
 * 左侧为端点列表（支持搜索、增删），
 * 右侧为选中端点的完整配置面板（6 个配置分区 + 导出按钮）。
 */
export function ApiEndpointEditor() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");

  const {
    endpoints: endpointRows,
    loadByProjectId,
    save,
    initializedProjectId,
    setInitializedProjectId,
  } = useProjectEndpointsStore();

  const [endpoints, setEndpoints] = useState<APIEndpointDef[]>(DEFAULT_ENDPOINTS);
  const [selectedId, setSelectedId] = useState<string | null>(
    DEFAULT_ENDPOINTS[0]?.id ?? null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // 测试界面状态
  const [testRequestBody, setTestRequestBody] = useState("");
  const [testResponse, setTestResponse] = useState("");
  const [testStatus, setTestStatus] = useState<number | null>(null);
  const [testRunning, setTestRunning] = useState(false);

  const flowList = useFlowBindingStore((s) => s.flowList);

  const appliedProjectRef = useRef<string | null>(null);
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!projectId) return;
    if (initializedProjectId === projectId) return;
    setInitializedProjectId(projectId);
    void loadByProjectId(projectId);
  }, [projectId, initializedProjectId, setInitializedProjectId, loadByProjectId]);

  useEffect(() => {
    if (!projectId) return;
    if (appliedProjectRef.current === projectId) return;
    const mapped = endpointRows.length > 0 ? endpointRows.map(rowToEndpointDef) : DEFAULT_ENDPOINTS;
    setEndpoints(mapped);
    setSelectedId(mapped[0]?.id ?? null);
    appliedProjectRef.current = projectId;
  }, [endpointRows, projectId]);

  useEffect(() => {
    if (!projectId) return;
    useProjectEndpointsStore.setState((s) => ({
      ...s,
      projectId,
      endpoints: endpoints.map((e) => ({
        ...endpointDefToRow(e),
        project_id: projectId,
      })) as ProjectEndpoint[],
    }));
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(() => {
      void save();
    }, 30_000);
  }, [endpoints, projectId, save]);

  const selected = useMemo(
    () => endpoints.find((e) => e.id === selectedId) ?? null,
    [endpoints, selectedId],
  );

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return endpoints;
    const q = searchQuery.toLowerCase();
    return endpoints.filter(
      (e) =>
        e.path.toLowerCase().includes(q) ||
        e.method.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [endpoints, searchQuery]);

  /** 更新端点部分属性 */
  const update = useCallback(
    (id: string, patch: Partial<APIEndpointDef>) => {
      setEndpoints((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
    },
    [],
  );

  /** 添加新端点 */
  function addEndpoint() {
    const newEp = createDefaultEndpoint({ id: crypto.randomUUID() });
    setEndpoints((prev) => [...prev, newEp]);
    setSelectedId(newEp.id);
  }

  /** 删除端点 */
  function deleteEndpoint(id: string) {
    setEndpoints((prev) => prev.filter((e) => e.id !== id));
    if (selectedId === id) {
      const remaining = endpoints.filter((e) => e.id !== id);
      setSelectedId(remaining[0]?.id ?? null);
    }
    setDeleteConfirm(null);
  }

  /** 模拟发送测试请求 — 使用 ref 防止闭包过期和组件卸载后的 setState */
  const selectedRef = useRef(selected);
  selectedRef.current = selected;
  const testBodyRef = useRef(testRequestBody);
  testBodyRef.current = testRequestBody;
  const mountedRef = useRef(true);
  useEffect(() => () => { mountedRef.current = false; }, []);

  function handleTestRequest() {
    if (!selectedRef.current) return;
    setTestRunning(true);
    setTestResponse("");
    setTestStatus(null);

    const currentSelected = selectedRef.current;
    const currentBody = testBodyRef.current;

    setTimeout(() => {
      if (!mountedRef.current) return;
      try {
        const body = currentBody.trim() ? JSON.parse(currentBody) : {};
        const errors = currentSelected.errorResponses;
        if (Math.random() < 0.3 && errors.length > 0) {
          const err = errors[Math.floor(Math.random() * errors.length)]!;
          setTestStatus(err.statusCode);
          setTestResponse(err.exampleBody);
        } else {
          setTestStatus(currentSelected.successStatus);
          setTestResponse(
            currentSelected.successExample ||
              JSON.stringify({ ok: true, method: currentSelected.method, path: currentSelected.path, received: body }, null, 2),
          );
        }
      } catch {
        setTestStatus(400);
        setTestResponse(JSON.stringify({ error: "Invalid JSON in request body" }, null, 2));
      }
      setTestRunning(false);
    }, 800);
  }

  // ─── Sub-component helpers ───────────────────────────────────────────────

  /** 添加 Query 参数 */
  function addQueryParam() {
    if (!selected) return;
    update(selected.id, {
      queryParams: [
        ...selected.queryParams,
        { name: "", type: "string", required: false, description: "" },
      ],
    });
  }

  /** 更新 Query 参数 */
  function updateQueryParam(index: number, patch: Partial<QueryParam>) {
    if (!selected) return;
    const qp = [...selected.queryParams];
    if (index < 0 || index >= qp.length) return;
    qp[index] = { ...qp[index], ...patch } as QueryParam;
    update(selected.id, { queryParams: qp });
  }

  /** 删除 Query 参数 */
  function removeQueryParam(index: number) {
    if (!selected) return;
    update(selected.id, { queryParams: selected.queryParams.filter((_, i) => i !== index) });
  }

  /** 添加 Header */
  function addHeader() {
    if (!selected) return;
    update(selected.id, {
      headers: [...selected.headers, { name: "", required: false, description: "" }],
    });
  }

  /** 更新 Header */
  function updateHeader(index: number, patch: Partial<RequestHeader>) {
    if (!selected) return;
    const h = [...selected.headers];
    if (index < 0 || index >= h.length) return;
    h[index] = { ...h[index], ...patch } as RequestHeader;
    update(selected.id, { headers: h });
  }

  /** 删除 Header */
  function removeHeader(index: number) {
    if (!selected) return;
    update(selected.id, { headers: selected.headers.filter((_, i) => i !== index) });
  }

  /** 添加错误响应 */
  function addErrorResponse() {
    if (!selected) return;
    update(selected.id, {
      errorResponses: [
        ...selected.errorResponses,
        { statusCode: 400, description: "", exampleBody: "" },
      ],
    });
  }

  /** 更新错误响应 */
  function updateErrorResponse(index: number, patch: Partial<ErrorResponse>) {
    if (!selected) return;
    const er = [...selected.errorResponses];
    if (index < 0 || index >= er.length) return;
    er[index] = { ...er[index], ...patch } as ErrorResponse;
    update(selected.id, { errorResponses: er });
  }

  /** 删除错误响应 */
  function removeErrorResponse(index: number) {
    if (!selected) return;
    update(selected.id, { errorResponses: selected.errorResponses.filter((_, i) => i !== index) });
  }

  /** 导出 OpenAPI JSON 并触发下载 */
  function handleExport() {
    const json = exportToOpenAPI(endpoints);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "openapi.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="flex h-full">
      {/* Left Sidebar — Endpoint List */}
      <div className="flex w-72 shrink-0 flex-col border-r bg-background">
        {/* Header */}
        <div className="flex h-9 items-center border-b px-3">
          <Network className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">
            API Endpoints
          </span>
          <span className="ml-auto text-[10px] text-muted-foreground">
            {endpoints.length}
          </span>
        </div>

        {/* Search */}
        <div className="border-b p-1.5">
          <div className="relative">
            <Search className="absolute left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              placeholder="Search endpoints..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-7 w-full rounded border bg-background pl-6 pr-2 text-[11px] focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Add + Export buttons */}
        <div className="flex gap-1 border-b p-1.5">
          <Button
            variant="outline"
            size="sm"
            className="h-7 flex-1 text-[10px]"
            onClick={addEndpoint}
          >
            <Plus className="mr-1 h-3 w-3" />
            Add
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 flex-1 text-[10px]"
            onClick={handleExport}
          >
            <Download className="mr-1 h-3 w-3" />
            OpenAPI
          </Button>
        </div>

        {/* Endpoints list */}
        <ScrollArea className="flex-1">
          <div className="p-1">
            {filtered.length === 0 ? (
              <div className="px-2 py-8 text-center text-xs text-muted-foreground">
                {searchQuery ? "No matching endpoints" : "No endpoints defined"}
              </div>
            ) : (
              filtered.map((ep) => {
                const isSelected = selectedId === ep.id;
                return (
                  <div
                    key={ep.id}
                    className={cn(
                      "group flex items-center gap-1.5 rounded px-1.5 py-1 text-xs cursor-pointer transition-colors hover:bg-accent",
                      isSelected &&
                        "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
                    )}
                    onClick={() => setSelectedId(ep.id)}
                  >
                    <MethodBadge method={ep.method} />
                    <span className="flex-1 truncate">{ep.path}</span>
                    {deleteConfirm === ep.id ? (
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          className="rounded p-0.5 text-[9px] text-red-600 hover:bg-red-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteEndpoint(ep.id);
                          }}
                        >
                          Sure?
                        </button>
                        <button
                          className="rounded p-0.5 text-[9px] text-muted-foreground hover:bg-muted"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirm(null);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="shrink-0 rounded p-0.5 opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirm(ep.id);
                        }}
                        title="Delete endpoint"
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

      {/* Right Main Area — Endpoint Configuration */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Config header */}
        <div className="flex h-9 items-center border-b px-3">
          <span className="text-xs font-medium text-muted-foreground">
            Endpoint Configuration
          </span>
          {selected && (
            <span className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground">
              <MethodBadge method={selected.method} />
              <span className="truncate">{selected.path}</span>
            </span>
          )}
        </div>

        <ScrollArea className="flex-1">
          {!selected ? (
            <div className="flex h-full items-center justify-center p-3 text-center text-xs text-muted-foreground">
              Select an endpoint to configure
            </div>
          ) : (
            <div className="space-y-4 p-3 pb-8">
              {/* ── 1. Basic Config ──────────────────────────────────── */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Basic Config
                </h3>
                <CompactSelect
                  label="HTTP Method"
                  value={selected.method}
                  onChange={(v) => update(selected.id, { method: v as APIEndpointDef["method"] })}
                  options={[
                    { value: "GET", label: "GET" },
                    { value: "POST", label: "POST" },
                    { value: "PUT", label: "PUT" },
                    { value: "PATCH", label: "PATCH" },
                    { value: "DELETE", label: "DELETE" },
                  ]}
                />
                <CompactInput
                  label="Path"
                  value={selected.path}
                  onChange={(v) => update(selected.id, { path: v })}
                  placeholder="/api/resource"
                />
                <CompactTextarea
                  label="Description"
                  value={selected.description}
                  onChange={(v) => update(selected.id, { description: v })}
                  placeholder="What does this endpoint do?"
                  rows={2}
                />
                <CompactInput
                  label="Tags (comma-separated)"
                  value={selected.tags.join(", ")}
                  onChange={(v) =>
                    update(selected.id, {
                      tags: v
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="users, auth"
                />
              </div>

              <Separator />

              {/* ── 2. Request Schema ────────────────────────────────── */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Request Schema
                </h3>

                {/* Query Parameters */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-muted-foreground">
                      Query Parameters
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 text-[9px]"
                      onClick={addQueryParam}
                    >
                      <Plus className="mr-0.5 h-2.5 w-2.5" />
                      Add
                    </Button>
                  </div>
                  {selected.queryParams.map((qp, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1 rounded border p-1"
                    >
                      <input
                        type="text"
                        value={qp.name}
                        placeholder="name"
                        onChange={(e) => updateQueryParam(i, { name: e.target.value })}
                        className="h-6 w-20 rounded border bg-background px-1.5 text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <select
                        value={qp.type}
                        onChange={(e) =>
                          updateQueryParam(i, { type: e.target.value as QueryParam["type"] })
                        }
                        className="h-6 w-20 rounded border bg-background px-1 text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="string">string</option>
                        <option value="number">number</option>
                        <option value="boolean">boolean</option>
                      </select>
                      <label className="flex shrink-0 items-center gap-0.5 text-[9px] text-muted-foreground">
                        <input
                          type="checkbox"
                          checked={qp.required}
                          onChange={(e) => updateQueryParam(i, { required: e.target.checked })}
                          className="h-3 w-3"
                        />
                        req
                      </label>
                      <input
                        type="text"
                        value={qp.description}
                        placeholder="desc"
                        onChange={(e) => updateQueryParam(i, { description: e.target.value })}
                        className="h-6 flex-1 rounded border bg-background px-1.5 text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        className="shrink-0 rounded p-0.5 text-muted-foreground hover:text-destructive"
                        onClick={() => removeQueryParam(i)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Request Body */}
                <div className="space-y-1.5 rounded border p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-muted-foreground">
                      Request Body
                    </span>
                    <select
                      value={selected.requestBodyType}
                      onChange={(e) =>
                        update(selected.id, {
                          requestBodyType: e.target.value as APIEndpointDef["requestBodyType"],
                        })
                      }
                      className="h-6 w-24 rounded border bg-background px-1 text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="none">None</option>
                      <option value="json">JSON</option>
                      <option value="form-data">Form Data</option>
                    </select>
                  </div>
                  {selected.requestBodyType !== "none" && (
                    <CompactTextarea
                      label="Body Schema / Example JSON"
                      value={selected.requestBodySchema}
                      onChange={(v) => update(selected.id, { requestBodySchema: v })}
                      placeholder='{ "name": "string" }'
                      rows={4}
                      monospace
                    />
                  )}
                </div>

                {/* Headers */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-muted-foreground">
                      Headers
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 text-[9px]"
                      onClick={addHeader}
                    >
                      <Plus className="mr-0.5 h-2.5 w-2.5" />
                      Add
                    </Button>
                  </div>
                  {selected.headers.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1 rounded border p-1"
                    >
                      <input
                        type="text"
                        value={h.name}
                        placeholder="Header"
                        onChange={(e) => updateHeader(i, { name: e.target.value })}
                        className="h-6 w-28 rounded border bg-background px-1.5 text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <label className="flex shrink-0 items-center gap-0.5 text-[9px] text-muted-foreground">
                        <input
                          type="checkbox"
                          checked={h.required}
                          onChange={(e) => updateHeader(i, { required: e.target.checked })}
                          className="h-3 w-3"
                        />
                        req
                      </label>
                      <input
                        type="text"
                        value={h.description}
                        placeholder="desc"
                        onChange={(e) => updateHeader(i, { description: e.target.value })}
                        className="h-6 flex-1 rounded border bg-background px-1.5 text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        className="shrink-0 rounded p-0.5 text-muted-foreground hover:text-destructive"
                        onClick={() => removeHeader(i)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* ── 3. Middleware ─────────────────────────────────────── */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Middleware
                </h3>

                <ToggleRow
                  label="Auth Required"
                  icon={Shield}
                  checked={selected.authRequired}
                  onCheckedChange={(v) => update(selected.id, { authRequired: v })}
                >
                  <CompactInput
                    label="Required Role"
                    value={selected.requiredRole}
                    onChange={(v) => update(selected.id, { requiredRole: v })}
                    placeholder="admin"
                  />
                </ToggleRow>

                <ToggleRow
                  label="Rate Limiting"
                  icon={Gauge}
                  checked={selected.rateLimitEnabled}
                  onCheckedChange={(v) => update(selected.id, { rateLimitEnabled: v })}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={selected.rateLimitRPM}
                      min={1}
                      onChange={(e) => {
                        const raw = e.target.value;
                        update(selected.id, { rateLimitRPM: raw === "" ? 0 : Math.max(1, Number(raw)) });
                      }}
                      className="h-6 w-20 rounded border bg-background px-1.5 text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-[10px] text-muted-foreground">requests / minute</span>
                  </div>
                </ToggleRow>

                <ToggleRow
                  label="CORS"
                  icon={Globe}
                  checked={selected.corsEnabled}
                  onCheckedChange={(v) => update(selected.id, { corsEnabled: v })}
                />

                <ToggleRow
                  label="Request Logging"
                  icon={FileText}
                  checked={selected.loggingEnabled}
                  onCheckedChange={(v) => update(selected.id, { loggingEnabled: v })}
                />
              </div>

              <Separator />

              {/* ── 4. Handler ────────────────────────────────────────── */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Handler
                </h3>

                {/* Bind to Flow */}
                <div>
                  <label className="mb-1 block text-[10px] font-medium text-muted-foreground">
                    Bound Flow
                  </label>
                  {flowList.length > 0 ? (
                    <select
                      value={selected.boundFlow}
                      onChange={(e) => update(selected.id, { boundFlow: e.target.value })}
                      className="h-7 w-full rounded border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">-- None --</option>
                      {flowList.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.name} ({f.id})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={selected.boundFlow}
                      placeholder="flow-id"
                      onChange={(e) => update(selected.id, { boundFlow: e.target.value })}
                      className="h-7 w-full rounded border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  )}
                </div>

                <Separator className="my-2" />

                {/* Custom Handler */}
                <ToggleRow
                  label="Custom Handler"
                  icon={Braces}
                  checked={!!selected.customHandler}
                  onCheckedChange={(v) =>
                    update(selected.id, { customHandler: v ? "// Custom handler code" : "" })
                  }
                >
                  <CompactTextarea
                    label="Handler Code"
                    value={selected.customHandler}
                    onChange={(v) => update(selected.id, { customHandler: v })}
                    placeholder="export async function handler(req, res) { ... }"
                    rows={6}
                    monospace
                  />
                </ToggleRow>
              </div>

              <Separator />

              {/* ── 5. Response ───────────────────────────────────────── */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Response
                </h3>

                <CompactSelect
                  label="Success Status Code"
                  value={String(selected.successStatus)}
                  onChange={(v) => update(selected.id, { successStatus: Number(v) })}
                  options={[
                    { value: "200", label: "200 OK" },
                    { value: "201", label: "201 Created" },
                    { value: "204", label: "204 No Content" },
                  ]}
                />

                <CompactTextarea
                  label="Success Response Body (example JSON)"
                  value={selected.successExample}
                  onChange={(v) => update(selected.id, { successExample: v })}
                  placeholder='{ "id": "uuid", "name": "example" }'
                  rows={4}
                  monospace
                />

                {/* Error Responses */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-muted-foreground">
                      Error Responses
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 text-[9px]"
                      onClick={addErrorResponse}
                    >
                      <Plus className="mr-0.5 h-2.5 w-2.5" />
                      Add Error
                    </Button>
                  </div>
                  {selected.errorResponses.map((er, i) => (
                    <div key={i} className="space-y-1 rounded border p-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <select
                            value={er.statusCode}
                            onChange={(e) =>
                              updateErrorResponse(i, { statusCode: Number(e.target.value) })
                            }
                            className="h-6 w-20 rounded border bg-background px-1 text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="400">400 Bad Req</option>
                            <option value="401">401 Unauthorized</option>
                            <option value="403">403 Forbidden</option>
                            <option value="404">404 Not Found</option>
                            <option value="409">409 Conflict</option>
                            <option value="422">422 Unprocessable</option>
                            <option value="429">429 Rate Limit</option>
                            <option value="500">500 Server Err</option>
                          </select>
                        </div>
                        <button
                          className="rounded p-0.5 text-muted-foreground hover:text-destructive"
                          onClick={() => removeErrorResponse(i)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={er.description}
                        placeholder="Error description"
                        onChange={(e) => updateErrorResponse(i, { description: e.target.value })}
                        className="h-6 w-full rounded border bg-background px-1.5 text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <CompactTextarea
                        label="Example Body"
                        value={er.exampleBody}
                        onChange={(v) => updateErrorResponse(i, { exampleBody: v })}
                        placeholder='{ "error": "message" }'
                        rows={3}
                        monospace
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* ── 6. Testing ─────────────────────────────────────────── */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Testing
                </h3>

                <div className="space-y-2 rounded border p-2">
                  {/* Request body input */}
                  <CompactTextarea
                    label="Request Body (JSON)"
                    value={testRequestBody}
                    onChange={setTestRequestBody}
                    placeholder='{ "key": "value" }'
                    rows={3}
                    monospace
                  />

                  <Button
                    size="sm"
                    className="h-7 w-full text-[10px]"
                    onClick={handleTestRequest}
                    disabled={testRunning}
                  >
                    {testRunning ? (
                      <>
                        <span className="mr-1 inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Play className="mr-1 h-3 w-3" />
                        Send Test Request
                      </>
                    )}
                  </Button>
                </div>

                {/* Response display */}
                <div className="space-y-1.5 rounded border p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-muted-foreground">
                      Response
                    </span>
                    {testStatus !== null && (
                      <span
                        className={cn(
                          "rounded px-1.5 py-0 text-[10px] font-semibold",
                          testStatus >= 200 && testStatus < 300
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                        )}
                      >
                        {testStatus}
                      </span>
                    )}
                  </div>
                  <textarea
                    value={testResponse}
                    readOnly
                    rows={6}
                    className="w-full rounded border bg-zinc-950 px-2 py-1 font-mono text-xs text-zinc-200 dark:bg-zinc-900 resize-none focus:outline-none"
                    placeholder="Response will appear here..."
                  />
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
