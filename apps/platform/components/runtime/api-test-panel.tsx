/**
 * API 端点测试面板（P6/P7）
 *
 * 在编辑器中提供交互式 API 端点测试工具：
 * - P6: 发送真实 HTTP 请求至开发服务器
 * - P7: 执行绑定的 flow 并返回真实结果
 *
 * 使用方法：在编辑器工具栏点击"API 测试"按钮打开此面板。
 *
 * @author xiye
 * @date 2026-06-23
 * @since 3.0.0
 */
"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoaderCircle, Send, Terminal, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

/** 支持的 HTTP 方法 */
const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;

type HttpMethod = (typeof HTTP_METHODS)[number];

/** 请求体需要编辑器的 HTTP 方法 */
const BODY_METHODS: HttpMethod[] = ["POST", "PUT", "PATCH"];

/** API 测试请求配置 */
interface ApiTestRequest {
  method: HttpMethod;
  url: string;
  body: string;
}

/** API 测试响应 */
interface ApiTestResponse {
  status: number;
  statusText: string;
  body: string;
  durationMs: number;
  /** P7: flow 执行日志（当端点绑定 flow 时返回） */
  flowLogs?: Array<{
    nodeId: string;
    nodeType: string;
    durationMs: number;
    error?: string;
  }>;
}

/**
 * P6: 验证 URL 是否合法
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * P6: 自动补齐 URL — 若缺少协议或主机则使用当前页面地址
 */
function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";
  // 已包含完整协议
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  // 以 / 开头 — 相对于当前源
  if (trimmed.startsWith("/")) {
    return `${window.location.origin}${trimmed}`;
  }
  // 其他情况视为相对路径
  return `${window.location.origin}/${trimmed.replace(/^\/+/, "")}`;
}

/**
 * API 端点测试面板（P6/P7）
 *
 * P6: 发送真实 HTTP 请求至目标 API 端点，展示响应状态、体和耗时。
 * P7: 若端点绑定了 flow，从响应日志中解析并展示 flow 执行结果。
 */
export function ApiTestPanel({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  // 请求配置状态
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [url, setUrl] = useState("/api/");
  const [body, setBody] = useState("{\n  \n}");
  const [isSending, setIsSending] = useState(false);

  // 响应状态
  const [response, setResponse] = useState<ApiTestResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"response" | "flow-logs">("response");

  /**
   * P6: 执行 API 测试请求
   */
  const handleSend = useCallback(async () => {
    setError(null);
    setResponse(null);

    const normalizedUrl = normalizeUrl(url);
    if (!normalizedUrl) {
      setError("请输入有效的 URL");
      return;
    }
    if (!isValidUrl(normalizedUrl)) {
      setError("URL 格式无效 — 需要有效的协议和主机名");
      return;
    }

    setIsSending(true);
    const startTime = performance.now();

    try {
      const fetchOptions: RequestInit = { method };
      const headers: Record<string, string> = {};

      // P6: 对 POST/PUT/PATCH 方法附加请求体和 Content-Type
      if (BODY_METHODS.includes(method) && body.trim()) {
        let parsedBody: string;
        try {
          // 尝试验证 JSON 格式
          JSON.parse(body);
          parsedBody = body;
          headers["content-type"] = "application/json";
        } catch {
          parsedBody = body;
        }
        fetchOptions.body = parsedBody;
        fetchOptions.headers = headers;
      }

      const res = await fetch(normalizedUrl, fetchOptions);
      const durationMs = Math.round(performance.now() - startTime);

      // 读取响应体
      let responseBody: string;
      const contentType = res.headers.get("content-type") ?? "";
      if (contentType.includes("application/json")) {
        const json = await res.json();
        responseBody = JSON.stringify(json, null, 2);
      } else {
        responseBody = await res.text();
      }

      // P7: 尝试从响应中提取 flow 执行日志
      let flowLogs: ApiTestResponse["flowLogs"];
      try {
        const parsed = JSON.parse(responseBody) as Record<string, unknown>;
        if (parsed && typeof parsed === "object" && "logs" in parsed && Array.isArray(parsed.logs)) {
          flowLogs = (parsed.logs as Array<Record<string, unknown>>).map((log) => ({
            nodeId: String(log.nodeId ?? ""),
            nodeType: String(log.nodeType ?? ""),
            durationMs: Number(log.durationMs ?? 0),
            error: typeof log.error === "string" ? log.error : undefined,
          }));
        }
      } catch {
        // 非 JSON 响应或无 flow logs
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        body: responseBody,
        durationMs,
        flowLogs,
      });

      // P7: 如有 flow logs 自动切换到 flow-logs 标签
      if (flowLogs && flowLogs.length > 0) {
        setActiveTab("flow-logs");
      }
    } catch (e) {
      const durationMs = Math.round(performance.now() - startTime);
      setError(e instanceof Error ? e.message : "请求失败");
      setResponse({
        status: 0,
        statusText: "Network Error",
        body: e instanceof Error ? e.message : "未知错误",
        durationMs,
      });
    } finally {
      setIsSending(false);
    }
  }, [method, url, body]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="api-test-panel"
        className="h-[85vh] max-w-[90vw] overflow-hidden p-0"
      >
        <div className="flex h-full flex-col">
          <DialogHeader className="border-b px-6 py-4">
            <DialogTitle className="flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              API 端点测试
            </DialogTitle>
            <DialogDescription>
              P6: 发送真实请求至 API 端点 · P7: 执行绑定的 flow 返回真实结果
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-1 flex-col overflow-hidden">
            {/* 请求配置区域 */}
            <div className="flex-shrink-0 space-y-3 border-b p-4">
              <div className="flex items-start gap-2">
                {/* P6: HTTP 方法选择器 */}
                <div className="w-28 flex-shrink-0">
                  <Label className="mb-1 block text-xs text-muted-foreground">方法</Label>
                  <Select
                    value={method}
                    onValueChange={(v) => setMethod(v as HttpMethod)}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {HTTP_METHODS.map((m) => (
                        <SelectItem key={m} value={m}>
                          <span
                            className={cn(
                              "font-mono text-xs",
                              m === "GET" && "text-green-600",
                              m === "POST" && "text-blue-600",
                              m === "PUT" && "text-orange-600",
                              m === "PATCH" && "text-yellow-600",
                              m === "DELETE" && "text-red-600",
                            )}
                          >
                            {m}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* P6: URL 输入 */}
                <div className="flex-1">
                  <Label className="mb-1 block text-xs text-muted-foreground">请求 URL</Label>
                  <Input
                    className="h-9 font-mono text-sm"
                    placeholder="/api/endpoint"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isSending) void handleSend();
                    }}
                  />
                </div>

                {/* P6: 发送按钮 */}
                <div className="w-20 flex-shrink-0 pt-5">
                  <Button
                    className="h-9 w-full gap-1"
                    size="sm"
                    disabled={isSending || !url.trim()}
                    onClick={handleSend}
                  >
                    {isSending ? (
                      <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Send className="h-3.5 w-3.5" />
                    )}
                    {isSending ? "" : "发送"}
                  </Button>
                </div>
              </div>

              {/* P6: 请求体编辑器（POST/PUT/PATCH 时显示） */}
              {BODY_METHODS.includes(method) && (
                <div>
                  <Label className="mb-1 block text-xs text-muted-foreground">请求体 (JSON)</Label>
                  <Textarea
                    className="min-h-[80px] font-mono text-xs"
                    placeholder='{"key": "value"}'
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* 响应区域 */}
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* 状态栏 */}
              <div className="flex items-center gap-2 border-b px-4 py-2">
                {response && (
                  <>
                    {/* P6: 状态码和状态文本 */}
                    <Badge
                      variant={
                        response.status >= 200 && response.status < 300
                          ? "default"
                          : response.status >= 400
                            ? "destructive"
                            : "secondary"
                      }
                      className="font-mono text-xs"
                    >
                      {response.status || "ERR"} {response.statusText}
                    </Badge>
                    {/* P6: 响应耗时 */}
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {response.durationMs}ms
                    </span>
                  </>
                )}
                <div className="flex-1" />
                {/* 有 flow logs 时显示内部标签切换 */}
                {response?.flowLogs && response.flowLogs.length > 0 && (
                  <Tabs
                    value={activeTab}
                    onValueChange={(v) => setActiveTab(v as "response" | "flow-logs")}
                    className="flex items-center"
                  >
                    <TabsList className="h-7">
                      <TabsTrigger value="response" className="h-6 px-2 text-xs">
                        响应体
                      </TabsTrigger>
                      <TabsTrigger value="flow-logs" className="h-6 px-2 text-xs">
                        <Terminal className="mr-1 h-3 w-3" />
                        Flow 日志
                        <span className="ml-1 rounded bg-muted-foreground/20 px-1 text-[10px]">
                          {response.flowLogs.length}
                        </span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                )}
              </div>

              {/* 响应内容 */}
              <ScrollArea className="flex-1 p-4">
                {error && (
                  <div className="mb-2 rounded border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                {!response && !isSending && (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    <div className="text-center">
                      <Terminal className="mx-auto mb-2 h-8 w-8 opacity-30" />
                      <p>输入 URL 并点击"发送"发起 API 测试请求</p>
                      <p className="mt-1 text-xs opacity-60">
                        端点绑定 flow 时将在返回结果中显示执行日志（P7）
                      </p>
                    </div>
                  </div>
                )}

                {isSending && (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <LoaderCircle className="mx-auto mb-2 h-6 w-6 animate-spin text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">发送请求中...</p>
                    </div>
                  </div>
                )}

                {response && activeTab === "response" && response.body && (
                  <pre className="whitespace-pre-wrap break-all rounded border bg-muted/50 p-4 font-mono text-xs leading-relaxed">
                    {response.body}
                  </pre>
                )}

                {/* P7: flow 执行日志 */}
                {response && activeTab === "flow-logs" && response.flowLogs && (
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">
                      端点绑定的 flow 已执行，共 {response.flowLogs.length} 个节点：
                    </div>
                    {response.flowLogs.map((log, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "rounded border p-3 text-xs font-mono",
                          log.error
                            ? "border-destructive/30 bg-destructive/5"
                            : "border-border bg-muted/30",
                        )}
                      >
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-muted-foreground">#{idx + 1}</span>
                          <Badge variant="outline" className="text-[10px]">
                            {log.nodeType}
                          </Badge>
                          <span className="ml-auto text-muted-foreground">
                            <Clock className="mr-0.5 inline h-3 w-3" />
                            {log.durationMs}ms
                          </span>
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          节点 ID: {log.nodeId}
                        </div>
                        {log.error && (
                          <div className="mt-1 text-destructive">错误: {log.error}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
