import { createHash } from "node:crypto";
import type { ProjectArchive } from "@/lib/archive/archive-types";

export type ProjectSyncResourceKind =
  | "project"
  | "pages"
  | "routes"
  | "models"
  | "flows"
  | "endpoints"
  | "auth";

export type ProjectSyncSnapshotDelta = "unchanged" | "added" | "modified" | "deleted";

export type ProjectSyncSnapshotChange = {
  resourceKind: ProjectSyncResourceKind;
  resourceKey: string;
  change: Exclude<ProjectSyncSnapshotDelta, "unchanged">;
};

export type ProjectSyncConflictItem = {
  resourceKind: ProjectSyncResourceKind;
  resourceKey: string;
  localChange: Exclude<ProjectSyncSnapshotDelta, "unchanged">;
  remoteChange: Exclude<ProjectSyncSnapshotDelta, "unchanged">;
};

export type ProjectSyncSnapshotSummary = {
  fingerprint: string;
  totalResources: number;
  resourceCounts: Partial<Record<ProjectSyncResourceKind, number>>;
};

export type ProjectSyncComparableSnapshot = {
  version: 1;
  createdAt: string;
  summary: ProjectSyncSnapshotSummary;
  resources: Record<ProjectSyncResourceKind, Record<string, string>>;
};

export type ProjectSyncCompareResult = {
  baselineAvailable: boolean;
  baselineRequired: boolean;
  local: ProjectSyncSnapshotSummary;
  remote: ProjectSyncSnapshotSummary;
  baseline: ProjectSyncSnapshotSummary | null;
  localOnlyCount: number;
  remoteOnlyCount: number;
  conflictCount: number;
  hasConflicts: boolean;
  canPush: boolean;
  canPull: boolean;
  localOnlyChanges: ProjectSyncSnapshotChange[];
  remoteOnlyChanges: ProjectSyncSnapshotChange[];
  conflicts: ProjectSyncConflictItem[];
};

function stableValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => stableValue(item));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, nestedValue]) => [key, stableValue(nestedValue)]),
    );
  }
  return value;
}

function hashValue(value: unknown): string {
  return createHash("sha256")
    .update(JSON.stringify(stableValue(value)))
    .digest("hex");
}

function buildSummary(resources: Record<ProjectSyncResourceKind, Record<string, string>>): ProjectSyncSnapshotSummary {
  const resourceCounts = Object.fromEntries(
    Object.entries(resources)
      .map(([kind, entries]) => [kind, Object.keys(entries).length])
      .filter(([, count]) => count > 0),
  ) as Partial<Record<ProjectSyncResourceKind, number>>;
  const totalResources = Object.values(resourceCounts).reduce((sum, count) => sum + count, 0);
  const fingerprint = hashValue(resources);

  return {
    fingerprint,
    totalResources,
    resourceCounts,
  };
}

function normalizeProjectArchive(archive: ProjectArchive): Record<ProjectSyncResourceKind, Record<string, string>> {
  const resources: Record<ProjectSyncResourceKind, Record<string, string>> = {
    project: {
      project: hashValue({
        name: archive.project.name,
        description: archive.project.description ?? "",
        config: archive.project.config ?? {},
        schema_version: archive.project.schema_version ?? "3.0.0",
      }),
    },
    pages: Object.fromEntries(
      (archive.pages ?? []).map((page) => [
        page.key,
        hashValue({
          key: page.key,
          path: page.path,
          title: page.title,
          description: page.description ?? "",
          schema: page.schema ?? {},
          metadata: page.metadata ?? {},
          sort_order: page.sort_order ?? 0,
          is_published: page.is_published ?? false,
        }),
      ]),
    ),
    routes: Object.fromEntries(
      (archive.routes ?? []).map((route) => [
        route.key,
        hashValue({
          key: route.key,
          path: route.path,
          parentKey: route.parentKey ?? null,
          pageKey: route.pageKey ?? null,
          layout_id: route.layout_id ?? null,
          auth_required: route.auth_required ?? false,
          roles: Array.isArray(route.roles) ? route.roles : [],
          middleware_config: route.middleware_config ?? {},
          metadata: route.metadata ?? {},
          sort_order: route.sort_order ?? 0,
        }),
      ]),
    ),
    models: Object.fromEntries(
      (archive.models ?? []).map((model) => [
        model.key,
        hashValue({
          key: model.key,
          table_name: model.table_name,
          schema: model.schema ?? {},
          rls_policies: model.rls_policies ?? [],
        }),
      ]),
    ),
    flows: Object.fromEntries(
      (archive.flows ?? []).map((flow) => [
        flow.key,
        hashValue({
          key: flow.key,
          name: flow.name,
          description: flow.description ?? "",
          flow_type: flow.flow_type ?? "default",
          yaml_content: flow.yaml_content ?? "",
          trigger_event: flow.trigger_event ?? null,
          is_active: flow.is_active ?? true,
        }),
      ]),
    ),
    endpoints: Object.fromEntries(
      (archive.endpoints ?? []).map((endpoint) => [
        endpoint.key,
        hashValue({
          key: endpoint.key,
          method: endpoint.method,
          path: endpoint.path,
          description: endpoint.description ?? "",
          request_schema: endpoint.request_schema ?? {},
          response_schema: endpoint.response_schema ?? {},
          middleware: endpoint.middleware ?? [],
          flowKey: endpoint.flowKey ?? null,
          is_active: endpoint.is_active ?? true,
        }),
      ]),
    ),
    auth: archive.auth
      ? {
          singleton: hashValue({
            providers: Array.isArray(archive.auth.providers) ? archive.auth.providers : [],
            redirect_urls: archive.auth.redirect_urls ?? {},
            session_config: archive.auth.session_config ?? {},
          }),
        }
      : {},
  };

  return resources;
}

export function buildComparableSnapshotFromArchive(archive: ProjectArchive): ProjectSyncComparableSnapshot {
  const resources = normalizeProjectArchive(archive);
  return {
    version: 1,
    createdAt: new Date().toISOString(),
    summary: buildSummary(resources),
    resources,
  };
}

export function parseComparableSnapshot(raw: string | null | undefined): ProjectSyncComparableSnapshot | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ProjectSyncComparableSnapshot;
    if (parsed?.version !== 1 || !parsed.resources || !parsed.summary) return null;
    return parsed;
  } catch {
    return null;
  }
}

function diffHash(baseHash: string | null, targetHash: string | null): ProjectSyncSnapshotDelta {
  if (baseHash === targetHash) return "unchanged";
  if (!baseHash && targetHash) return "added";
  if (baseHash && !targetHash) return "deleted";
  return "modified";
}

function isChanged(change: ProjectSyncSnapshotDelta): change is Exclude<ProjectSyncSnapshotDelta, "unchanged"> {
  return change !== "unchanged";
}

export function compareComparableSnapshots(input: {
  baseline: ProjectSyncComparableSnapshot | null;
  local: ProjectSyncComparableSnapshot;
  remote: ProjectSyncComparableSnapshot;
}): ProjectSyncCompareResult {
  const { baseline, local, remote } = input;

  if (!baseline) {
    const snapshotsMatch = local.summary.fingerprint === remote.summary.fingerprint;
    return {
      baselineAvailable: false,
      baselineRequired: !snapshotsMatch,
      local: local.summary,
      remote: remote.summary,
      baseline: null,
      localOnlyCount: 0,
      remoteOnlyCount: 0,
      conflictCount: 0,
      hasConflicts: false,
      canPush: snapshotsMatch,
      canPull: snapshotsMatch,
      localOnlyChanges: [],
      remoteOnlyChanges: [],
      conflicts: [],
    };
  }

  const localOnlyChanges: ProjectSyncSnapshotChange[] = [];
  const remoteOnlyChanges: ProjectSyncSnapshotChange[] = [];
  const conflicts: ProjectSyncConflictItem[] = [];

  const resourceKinds = Object.keys(local.resources) as ProjectSyncResourceKind[];

  for (const resourceKind of resourceKinds) {
    const baseEntries = baseline?.resources[resourceKind] ?? {};
    const localEntries = local.resources[resourceKind] ?? {};
    const remoteEntries = remote.resources[resourceKind] ?? {};
    const keys = new Set([...Object.keys(baseEntries), ...Object.keys(localEntries), ...Object.keys(remoteEntries)]);

    for (const resourceKey of keys) {
      const baseHash = baseEntries[resourceKey] ?? null;
      const localHash = localEntries[resourceKey] ?? null;
      const remoteHash = remoteEntries[resourceKey] ?? null;

      const localChange = diffHash(baseHash, localHash);
      const remoteChange = diffHash(baseHash, remoteHash);

      if (baseline) {
        if (isChanged(localChange) && isChanged(remoteChange)) {
          if (localHash !== remoteHash) {
            conflicts.push({
              resourceKind,
              resourceKey,
              localChange,
              remoteChange,
            });
          }
          continue;
        }
      }

      if (isChanged(localChange) && !isChanged(remoteChange)) {
        localOnlyChanges.push({
          resourceKind,
          resourceKey,
          change: localChange,
        });
        continue;
      }

      if (!isChanged(localChange) && isChanged(remoteChange)) {
        remoteOnlyChanges.push({
          resourceKind,
          resourceKey,
          change: remoteChange,
        });
      }
    }
  }

  const hasConflicts = conflicts.length > 0;
  return {
    baselineAvailable: true,
    baselineRequired: false,
    local: local.summary,
    remote: remote.summary,
    baseline: baseline?.summary ?? null,
    localOnlyCount: localOnlyChanges.length,
    remoteOnlyCount: remoteOnlyChanges.length,
    conflictCount: conflicts.length,
    hasConflicts,
    canPush: !hasConflicts && remoteOnlyChanges.length === 0,
    canPull: !hasConflicts && localOnlyChanges.length === 0,
    localOnlyChanges,
    remoteOnlyChanges,
    conflicts,
  };
}
