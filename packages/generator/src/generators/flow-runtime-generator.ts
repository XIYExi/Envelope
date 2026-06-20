import type { VirtualFile } from "../core/file-system";
import { yamlToJson, type FlowDefinition } from "@envelope/flow";
import { tsStringLiteral } from "../core/tsx-escape";

export interface ProjectEndpoint {
  id: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  flow_id: string | null;
}

export interface ProjectFlow {
  id: string;
  name: string;
  yaml_content: string;
  description?: string;
}

export interface GenerateFlowRuntimeOptions {
  flows?: ProjectFlow[];
  endpoints?: ProjectEndpoint[];
}

export function generateFlowRuntimeFiles(options: GenerateFlowRuntimeOptions): VirtualFile[] {
  const files: VirtualFile[] = [];

  const flows = (options.flows ?? []).map((f) => ({
    id: f.id,
    name: f.name,
    definition: parseSingleFlowYaml(f.yaml_content),
  }));

  const registryJson = JSON.stringify(
    Object.fromEntries(flows.map((f) => [f.id, f.definition])),
    null,
    2,
  );

  files.push({
    path: "lib/flows/registry.ts",
    content: [
      `export type FlowNodeType = string;`,
      ``,
      `export type FlowPortDataType = "string" | "number" | "boolean" | "object" | "array" | "any";`,
      ``,
      `export interface FlowPosition {`,
      `  x: number;`,
      `  y: number;`,
      `}`,
      ``,
      `export interface FlowNode {`,
      `  id: string;`,
      `  type: FlowNodeType;`,
      `  position: FlowPosition;`,
      `  label?: string;`,
      `  config: Record<string, unknown>;`,
      `}`,
      ``,
      `export interface FlowEdge {`,
      `  id: string;`,
      `  source: string;`,
      `  sourceHandle: string;`,
      `  target: string;`,
      `  targetHandle: string;`,
      `  label?: string;`,
      `}`,
      ``,
      `export interface FlowDefinition {`,
      `  thing: string;`,
      `  version: string;`,
      `  description?: string;`,
      `  nodes: FlowNode[];`,
      `  edges: FlowEdge[];`,
      `}`,
      ``,
      `export const flowRegistry: Record<string, FlowDefinition> = ${registryJson} as Record<string, FlowDefinition>;`,
      ``,
      `export function getFlow(flowId: string): FlowDefinition | undefined {`,
      `  return flowRegistry[flowId];`,
      `}`,
      ``,
    ].join("\n"),
  });

  files.push({
    path: "lib/flows/runtime.ts",
    content: [
      `import { getFlow, type FlowDefinition } from "./registry";`,
      ``,
      `export interface RunFlowResult {`,
      `  flowId: string;`,
      `  version: string;`,
      `  output: unknown;`,
      `}`,
      ``,
      `import { createClient } from "@supabase/supabase-js";`,
      ``,
      `type SupabaseClient = ReturnType<typeof createClient>;`,
      ``,
      `function getSupabaseClient(): SupabaseClient {`,
      `  return createClient(`,
      `    process.env.NEXT_PUBLIC_SUPABASE_URL!,`,
      `    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,`,
      `  );`,
      `}`,
      ``,
      `function getByPath(obj: unknown, path: string): unknown {`,
      `  const p = path.replace(/^\\$\\./, "").replace(/^\\./, "");`,
      `  if (!p) return obj;`,
      `  const parts = p.split(".").filter(Boolean);`,
      `  let cur: any = obj;`,
      `  for (const part of parts) {`,
      `    if (cur == null) return undefined;`,
      `    cur = cur[part];`,
      `  }`,
      `  return cur;`,
      `}`,
      ``,
      `export async function runFlow(flowId: string, input: unknown): Promise<RunFlowResult> {`,
      `  const def = getFlow(flowId);`,
      `  if (!def) {`,
      `    throw new Error(\`Flow not found: \${flowId}\`);`,
      `  }`,
      `  const actionable = def.nodes.filter((n) => !n.type.startsWith("event."));`,
      `  if (actionable.length !== 1) {`,
      `    return { flowId, version: def.version, output: { input } };`,
      `  }`,
      `  const node = actionable[0];`,
      `  const cfg = (node.config ?? {}) as Record<string, unknown>;`,
      `  const supabase = getSupabaseClient();`,
      ``,
      `  if (node.type === "db.query") {`,
      `    const table = String(cfg.table || "");`,
      `    if (!table) return { flowId, version: def.version, output: { input } };`,
      `    let q: any = supabase.from(table).select((cfg.columns as any)?.length ? (cfg.columns as any).join(",") : "*");`,
      `    if (cfg.where && typeof cfg.where === "object") {`,
      `      for (const [k, v] of Object.entries(cfg.where as Record<string, unknown>)) {`,
      `        q = q.eq(k, v as any);`,
      `      }`,
      `    }`,
      `    if (typeof cfg.limit === "number") q = q.limit(cfg.limit);`,
      `    const { data, error } = await q;`,
      `    if (error) throw new Error(error.message);`,
      `    return { flowId, version: def.version, output: data };`,
      `  }`,
      ``,
      `  if (node.type === "api.request") {`,
      `    const url = String(cfg.url || "");`,
      `    const method = String(cfg.method || "GET");`,
      `    const headers = (cfg.headers && typeof cfg.headers === "object") ? (cfg.headers as Record<string, string>) : undefined;`,
      `    const body = cfg.body === undefined ? undefined : cfg.body;`,
      `    const res = await fetch(url, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });`,
      `    const text = await res.text();`,
      `    let json: unknown = text;`,
      `    try { json = JSON.parse(text); } catch {}`,
      `    return { flowId, version: def.version, output: { status: res.status, data: json } };`,
      `  }`,
      ``,
      `  if (node.type === "transform.data") {`,
      `    const expr = typeof cfg.expression === "string" ? cfg.expression : "";`,
      `    const source = cfg.input !== undefined ? cfg.input : input;`,
      `    if (!expr) return { flowId, version: def.version, output: source };`,
      `    return { flowId, version: def.version, output: getByPath(source, expr) };`,
      `  }`,
      ``,
      `  return { flowId, version: def.version, output: { input } };`,
      `}`,
      ``,
      `export function getFlowDefinition(flowId: string): FlowDefinition {`,
      `  const def = getFlow(flowId);`,
      `  if (!def) {`,
      `    throw new Error(\`Flow not found: \${flowId}\`);`,
      `  }`,
      `  return def;`,
      `}`,
      ``,
    ].join("\n"),
  });

  files.push({
    path: "lib/flows/client.ts",
    content: [
      `export async function callFlow(flowId: string, input?: unknown): Promise<unknown> {`,
      `  const res = await fetch(\`/api/flows/\${encodeURIComponent(flowId)}\`, {`,
      `    method: "POST",`,
      `    headers: { "content-type": "application/json" },`,
      `    body: JSON.stringify({ input }),`,
      `  });`,
      `  if (!res.ok) {`,
      `    const text = await res.text().catch(() => "");`,
      `    throw new Error(text || \`Flow request failed: \${res.status}\`);`,
      `  }`,
      `  return res.json();`,
      `}`,
      ``,
    ].join("\n"),
  });

  files.push({
    path: "app/api/flows/[flowId]/route.ts",
    content: [
      `import { NextResponse } from "next/server";`,
      `import { runFlow } from "@/lib/flows/runtime";`,
      ``,
      `export async function POST(`,
      `  request: Request,`,
      `  { params }: { params: { flowId: string } },`,
      `) {`,
      `  const body = await request.json().catch(() => ({}));`,
      `  const result = await runFlow(params.flowId, (body as { input?: unknown }).input ?? body);`,
      `  return NextResponse.json(result);`,
      `}`,
      ``,
      `export async function GET(`,
      `  request: Request,`,
      `  { params }: { params: { flowId: string } },`,
      `) {`,
      `  const url = new URL(request.url);`,
      `  const query = Object.fromEntries(url.searchParams.entries());`,
      `  const result = await runFlow(params.flowId, { query });`,
      `  return NextResponse.json(result);`,
      `}`,
      ``,
    ].join("\n"),
  });

  if (options.endpoints && options.endpoints.length > 0) {
    const groups = new Map<string, ProjectEndpoint[]>();
    for (const endpoint of options.endpoints) {
      const key = normalizeEndpointPath(endpoint.path);
      const list = groups.get(key) ?? [];
      list.push(endpoint);
      groups.set(key, list);
    }
    for (const [key, endpoints] of groups) {
      files.push({
        path: endpointToRouteFilePath(key),
        content: generateEndpointRouteContent(endpoints),
      });
    }
  }

  return files;
}

function parseSingleFlowYaml(yaml: string): FlowDefinition {
  const normalized = yaml.replace(/\r\n/g, "\n").trim();
  if (!normalized) {
    return {
      thing: "empty-flow",
      version: "1.0.0",
      nodes: [
        { id: "start", type: "event.start", position: { x: 0, y: 0 }, config: {} },
        { id: "end", type: "event.end", position: { x: 200, y: 0 }, config: {} },
      ],
      edges: [
        { id: "e1", source: "start", sourceHandle: "out", target: "end", targetHandle: "in" },
      ],
    };
  }
  const parsed = yamlToJson(normalized);
  if (!parsed.success || !parsed.data || typeof parsed.data === "string") {
    throw new Error(parsed.error || `Failed to parse flow yaml`);
  }
  return parsed.data;
}

function endpointToRouteFilePath(normalized: string): string {
  if (!normalized) return "app/api/route.ts";
  return `app/api/${normalized}/route.ts`;
}

function normalizeEndpointPath(endpointPath: string): string {
  let p = endpointPath.trim();
  if (!p) return "";
  if (!p.startsWith("/")) p = `/${p}`;
  p = p.replace(/\/+/g, "/");
  if (p === "/api") return "";
  if (p.startsWith("/api/")) p = p.slice("/api/".length);
  p = p.replace(/:([a-zA-Z0-9_]+)/g, "[$1]");
  p = p.replace(/\{([a-zA-Z0-9_]+)\}/g, "[$1]");
  return p.replace(/^\/+|\/+$/g, "");
}

function generateEndpointRouteContent(endpoints: ProjectEndpoint[]): string {
  const lines: string[] = [];
  lines.push(`import { NextResponse } from "next/server";`);
  lines.push(`import { runFlow } from "@/lib/flows/runtime";`);
  lines.push(``);

  for (const endpoint of endpoints) {
    const method = endpoint.method.toUpperCase() as ProjectEndpoint["method"];
    const flowId = endpoint.flow_id;
    const flowIdLiteral = flowId ? tsStringLiteral(flowId) : null;

    if (!flowIdLiteral) {
      lines.push(`export async function ${method}(request: Request) {`);
      lines.push(`  const url = new URL(request.url);`);
      lines.push(`  return NextResponse.json({ method: ${tsStringLiteral(method)}, path: url.pathname });`);
      lines.push(`}`);
      lines.push(``);
      continue;
    }

    if (method === "GET" || method === "DELETE") {
      lines.push(`export async function ${method}(request: Request, ctx?: { params?: Record<string, string> }) {`);
      lines.push(`  const url = new URL(request.url);`);
      lines.push(`  const query = Object.fromEntries(url.searchParams.entries());`);
      lines.push(`  const result = await runFlow(${flowIdLiteral}, { query, params: ctx?.params ?? {} });`);
      lines.push(`  return NextResponse.json(result);`);
      lines.push(`}`);
      lines.push(``);
      continue;
    }

    lines.push(`export async function ${method}(request: Request, ctx?: { params?: Record<string, string> }) {`);
    lines.push(`  const body = await request.json().catch(() => ({}));`);
    lines.push(`  const result = await runFlow(${flowIdLiteral}, { body, params: ctx?.params ?? {} });`);
    lines.push(`  return NextResponse.json(result);`);
    lines.push(`}`);
    lines.push(``);
  }

  return lines.join("\n");
}
