import type { ProjectEndpoint, ProjectFlow } from "@/lib/supabase/types";

/**
 * 归档导出用的“稳定 Key”生成器
 *
 * 设计原则：
 * - 归档 selection 不直接使用 UUID，避免在跨环境导入时难以复用
 * - Key 必须可读、可预测，并且在同一项目内尽量稳定
 *
 * 注意：
 * - flowKey 的实现需要与后端导出逻辑保持一致，否则“部分导出”会选不中目标资源
 */

function slugify(input: string): string {
  const s = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
  return s || "flow";
}

export function archiveFlowKey(flow: Pick<ProjectFlow, "id" | "name">): string {
  return `${slugify(flow.name)}__${flow.id.slice(0, 8)}`;
}

export function archiveEndpointKey(endpoint: Pick<ProjectEndpoint, "method" | "path">): string {
  return `${endpoint.method} ${endpoint.path}`;
}

