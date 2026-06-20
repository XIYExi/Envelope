import type {
  ProjectFlow,
  ProjectRoute,
} from "@/lib/supabase/types";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import type { ArchiveImportRepository } from "@/lib/backend/archive-import";
import type { SaveProjectEndpointInput } from "@/lib/backend/project-resources";
import type { ArchiveImportOptions, ProjectArchive } from "./archive-types";
import { apiErrors } from "@/lib/api/errors";
import { getArchiveImportRepository } from "@/lib/backend/archive-import";

export type ArchiveImportProgressCallback = (stage: string, percent: number) => void;
export type ArchiveImportContext = {
  /** 当前导入任务归属用户。 */
  ownerUserId: string;
  /** Supabase 模式下用于执行写入的客户端；local 模式可省略。 */
  supabase?: SupabaseClient<Database> | null;
  /** 可选的导入仓储覆盖项，用于跨后端同步等高级场景。 */
  repository?: ArchiveImportRepository;
};

/**
 * 配置归档导入（ISC-20/99）
 *
 * 特性：
 * - 支持导入为新项目（mode=create）
 * - 支持合并导入到已有项目（mode=merge）
 * - 支持冲突策略（overwrite/skip）与悬空引用策略（error/nullify/skip）
 *
 * 重要说明：
 * - 归档内跨表引用使用 *Key（pageKey/parentKey/flowKey），导入时会重写为运行时目标资源 ID
 * - 实际写入动作由 archive-import 门面分发到 Supabase 或本地 SQLite
 */
function dedupeByKey<T>(items: T[], keyFn: (i: T) => string): T[] {
  const map = new Map<string, T>();
  for (const i of items) map.set(keyFn(i), i);
  return Array.from(map.values());
}

function normalizeMiddleware(input: unknown): Record<string, unknown>[] {
  if (Array.isArray(input)) {
    return input.filter((x) => typeof x === "object" && x !== null && !Array.isArray(x)) as Record<string, unknown>[];
  }
  if (typeof input === "object" && input !== null) {
    return [input as Record<string, unknown>];
  }
  return [];
}

function resolveDangling(policy: NonNullable<ArchiveImportOptions["danglingRefPolicy"]> | undefined): "error" | "nullify" | "skip" {
  return policy ?? "error";
}

function mapRouteForParentUpdate(route: ProjectRoute, parentRouteId: string | null) {
  return {
    id: route.id,
    path: route.path,
    page_id: route.page_id,
    layout_id: route.layout_id,
    auth_required: route.auth_required,
    roles: Array.isArray(route.roles) ? route.roles : [],
    middleware_config: (route.middleware_config ?? {}) as Record<string, unknown>,
    metadata: (route.metadata ?? {}) as Record<string, unknown>,
    parent_route_id: parentRouteId,
    sort_order: route.sort_order ?? 0,
  };
}

export async function importProjectArchive(
  archive: ProjectArchive,
  options: ArchiveImportOptions,
  context: ArchiveImportContext,
  onProgress?: ArchiveImportProgressCallback,
): Promise<{ projectId: string }> {
  const conflict = options.conflictStrategy ?? "overwrite";
  const dangling = resolveDangling(options.danglingRefPolicy);
  const repository = context.repository ?? getArchiveImportRepository({
    ownerUserId: context.ownerUserId,
    ...(context.supabase ? { supabase: context.supabase } : {}),
  });

  onProgress?.("校验归档...", 0);
  if (archive.manifest.format !== "envelope.platform.archive") {
    throw apiErrors.validation({ format: archive.manifest.format }, "Unsupported archive format");
  }

  let projectId = options.targetProjectId;

  if (options.mode === "create") {
    onProgress?.("创建项目...", 5);
    const created = await repository.createProject({
      name: archive.project.name || "Imported Project",
      description: archive.project.description ?? "",
      schema_version: archive.project.schema_version ?? archive.manifest.schemaVersion ?? "3.0.0",
      config: (archive.project.config ?? {}) as Record<string, unknown>,
    });
    projectId = created.id;
  } else {
    if (!projectId) throw apiErrors.validation({ targetProjectId: projectId }, "Missing targetProjectId for merge import");
  }

  onProgress?.("导入页面...", 15);
  const pages = dedupeByKey(archive.pages ?? [], (p) => p.key);
  if (pages.length > 0) {
    const inserts = pages.map((p) => ({
      path: p.path,
      title: p.title,
      description: p.description ?? "",
      schema: (p.schema ?? {}) as Record<string, unknown>,
      metadata: (p.metadata ?? {}) as Record<string, unknown>,
      sort_order: p.sort_order ?? 0,
      is_published: p.is_published ?? false,
    }));
    let pageWrites = inserts;
    if (options.mode === "merge" && conflict === "skip") {
      const existing = await repository.listPages(projectId!);
      const existSet = new Set(existing.map((x) => x.path));
      pageWrites = inserts.filter((x) => !existSet.has(x.path));
    }
    if (pageWrites.length > 0) {
      await repository.upsertPages(projectId!, pageWrites);
    }
  }

  const pagesAfter = await repository.listPages(projectId!);
  const pageKeyToId = new Map(pagesAfter.map((p) => [p.path, p.id]));

  onProgress?.("导入流程...", 35);
  const flows = dedupeByKey(archive.flows ?? [], (f) => f.key);
  const flowKeyToId = new Map<string, string>();
  if (flows.length > 0) {
    const flowWrites: Array<{ key: string; name: string; yaml_content: string }> = [];
    if (options.mode === "create") {
      const created = await repository.upsertFlows(
        projectId!,
        flows.map((f) => ({
          name: f.name,
          description: f.description ?? "",
          flow_type: f.flow_type ?? "default",
          yaml_content: f.yaml_content ?? "",
          trigger_event: f.trigger_event ?? null,
          is_active: f.is_active ?? true,
        })),
      );
      for (const row of created) {
        const found = flows.find((f) => f.name === row.name && f.yaml_content === row.yaml_content);
        if (found && !flowKeyToId.has(found.key)) {
          flowKeyToId.set(found.key, row.id);
        }
      }
    } else {
      const existing = await repository.listFlows(projectId!);
      const byName = new Map<string, ProjectFlow[]>();
      for (const f of existing) byName.set(f.name, [...(byName.get(f.name) ?? []), f]);

      for (const f of flows) {
        const candidates = byName.get(f.name) ?? [];
        if (candidates.length === 1 && conflict === "overwrite") {
          const target = candidates[0]!;
          flowWrites.push({
            key: f.key,
            name: f.name,
            yaml_content: f.yaml_content ?? "",
          });
          await repository.upsertFlows(projectId!, [
            {
              id: target.id,
              name: f.name,
              description: f.description ?? "",
              flow_type: f.flow_type ?? "default",
              yaml_content: f.yaml_content ?? "",
              trigger_event: f.trigger_event ?? null,
              is_active: f.is_active ?? true,
            },
          ]);
          flowKeyToId.set(f.key, target.id);
        } else if (conflict === "skip" && candidates.length > 0) {
          flowKeyToId.set(f.key, candidates[0]!.id);
        } else {
          flowWrites.push({
            key: f.key,
            name: f.name,
            yaml_content: f.yaml_content ?? "",
          });
          await repository.upsertFlows(projectId!, [
            {
              name: f.name,
              description: f.description ?? "",
              flow_type: f.flow_type ?? "default",
              yaml_content: f.yaml_content ?? "",
              trigger_event: f.trigger_event ?? null,
              is_active: f.is_active ?? true,
            },
          ]);
        }
      }
    }

    if (flowWrites.length > 0) {
      const flowsAfter = await repository.listFlows(projectId!);
      for (const write of flowWrites) {
        if (flowKeyToId.has(write.key)) continue;
        const matched = flowsAfter.find((row) => row.name === write.name && row.yaml_content === write.yaml_content);
        if (matched) {
          flowKeyToId.set(write.key, matched.id);
        }
      }
    }
  }

  onProgress?.("导入数据模型...", 55);
  const models = dedupeByKey(archive.models ?? [], (m) => m.key);
  if (models.length > 0) {
    const inserts = models.map((m) => ({
      table_name: m.table_name,
      schema: (m.schema ?? {}) as Record<string, unknown>,
      rls_policies: (m.rls_policies ?? []) as Record<string, unknown>[],
    }));
    let modelWrites = inserts;
    if (options.mode === "merge" && conflict === "skip") {
      const existing = await repository.listModels(projectId!);
      const set = new Set(existing.map((x) => x.table_name));
      modelWrites = inserts.filter((x) => !set.has(x.table_name));
    }
    if (modelWrites.length > 0) {
      await repository.upsertModels(projectId!, modelWrites);
    }
  }

  onProgress?.("导入路由...", 70);
  const routes = dedupeByKey(archive.routes ?? [], (r) => r.key);
  if (routes.length > 0) {
    const baseInserts = routes
      .map((r) => {
        const pageId = r.pageKey ? pageKeyToId.get(r.pageKey) : null;
        if (r.pageKey && !pageId) {
          if (dangling === "error") throw apiErrors.validation({ pageKey: r.pageKey }, "Missing page for route");
          if (dangling === "skip") return null;
        }
        return {
          path: r.path,
          page_id: pageId ?? null,
          layout_id: r.layout_id ?? null,
          auth_required: r.auth_required ?? false,
          roles: Array.isArray(r.roles) ? r.roles : [],
          middleware_config: (r.middleware_config ?? {}) as Record<string, unknown>,
          metadata: (r.metadata ?? {}) as Record<string, unknown>,
          parent_route_id: null,
          sort_order: r.sort_order ?? 0,
        };
      })
      .filter((value): value is NonNullable<typeof value> => Boolean(value));

    let routeWrites = baseInserts;
    if (options.mode === "merge" && conflict === "skip") {
      const existing = await repository.listRoutes(projectId!);
      const existSet = new Set(existing.map((x) => x.path));
      routeWrites = baseInserts.filter((x) => x && !existSet.has(x.path));
    }
    if (routeWrites.length > 0) {
      await repository.upsertRoutes(projectId!, routeWrites);
    }

    const routesAfter = await repository.listRoutes(projectId!);
    const routeKeyToId = new Map(routesAfter.map((r) => [r.path, r.id]));
    const routesByPath = new Map(routesAfter.map((r) => [r.path, r]));

    const parentUpdates: ReturnType<typeof mapRouteForParentUpdate>[] = [];
    for (const r of routes) {
      if (!r.parentKey) continue;
      const target = routesByPath.get(r.path);
      if (!target) continue;
      const parentId = routeKeyToId.get(r.parentKey);
      if (!parentId) {
        if (dangling === "error") throw apiErrors.validation({ parentKey: r.parentKey }, "Missing parent route");
        if (dangling === "skip" || dangling === "nullify") continue;
      }
      parentUpdates.push(mapRouteForParentUpdate(target, parentId ?? null));
    }

    if (parentUpdates.length > 0) {
      await repository.upsertRoutes(projectId!, parentUpdates);
    }
  }

  onProgress?.("导入 API...", 85);
  const endpoints = dedupeByKey(archive.endpoints ?? [], (e) => e.key);
  const endpointWrites: SaveProjectEndpointInput[] = [];
  if (endpoints.length > 0) {
    const existingEndpoints = options.mode === "merge" ? await repository.listEndpoints(projectId!) : [];
    const endpointByKey = new Map(existingEndpoints.map((endpoint) => [`${endpoint.method} ${endpoint.path}`, endpoint]));

    for (const e of endpoints) {
      let flowId: string | null = null;
      if (e.flowKey) {
        flowId = flowKeyToId.get(e.flowKey) ?? null;
        if (!flowId) {
          if (dangling === "error") throw apiErrors.validation({ flowKey: e.flowKey }, "Missing flow for endpoint");
          if (dangling === "skip") continue;
        }
      }

      const naturalKey = `${e.method} ${e.path}`;
      const existing = endpointByKey.get(naturalKey);
      if (options.mode === "merge" && conflict === "skip" && existing) {
        continue;
      }

      endpointWrites.push({
        id: options.mode === "merge" && conflict === "overwrite" ? existing?.id : undefined,
        method: e.method,
        path: e.path,
        description: e.description ?? "",
        request_schema: (e.request_schema ?? {}) as Record<string, unknown>,
        response_schema: (e.response_schema ?? {}) as Record<string, unknown>,
        middleware: normalizeMiddleware(e.middleware),
        flow_id: flowId,
        is_active: e.is_active ?? true,
      });
    }
  }

  if (endpointWrites.length > 0) {
    await repository.upsertEndpoints(projectId!, endpointWrites);
  }

  if (archive.auth) {
    onProgress?.("导入认证配置...", 95);
    await repository.upsertAuth(projectId!, {
      providers: Array.isArray(archive.auth.providers) ? (archive.auth.providers as Record<string, unknown>[]) : [],
      redirect_urls: (archive.auth.redirect_urls ?? {}) as Record<string, unknown>,
      session_config: (archive.auth.session_config ?? {}) as Record<string, unknown>,
    });
  }

  onProgress?.("完成", 100);
  return { projectId: projectId! };
}
