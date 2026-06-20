import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { Database } from "@/lib/supabase/database.types";
import { resetPlatformBackendConfigForTests } from "@/lib/backend/config";
import { importProjectArchive } from "@/lib/archive/import-archive";
import type { ProjectArchive } from "@/lib/archive/archive-types";

type AnyRow = Record<string, any>;

function createMockSupabase() {
  const state = {
    projects: [] as AnyRow[],
    project_pages: [] as AnyRow[],
    project_routes: [] as AnyRow[],
    project_flows: [] as AnyRow[],
    project_models: [] as AnyRow[],
    project_endpoints: [] as AnyRow[],
    project_auth: [] as AnyRow[],
  };

  let seq = 1;
  const genId = () => `id_${seq++}`;

  const auth = {
    async getUser() {
      return { data: { user: { id: "user_1" } }, error: null };
    },
  };

  const from = (table: keyof Database["public"]["Tables"]) => {
    const t = table as string;
    const builder: any = {};
    let filters: Record<string, any> = {};
    let orderBy: { key: string; ascending: boolean } | null = null;
    let pendingUpdate: AnyRow | null = null;

    const applyFilters = (rows: AnyRow[]) => {
      let out = rows.filter((r) => Object.entries(filters).every(([k, v]) => r[k] === v));
      if (orderBy) {
        const { key, ascending } = orderBy;
        out = out.slice().sort((a, b) => {
          const av = a[key] ?? 0;
          const bv = b[key] ?? 0;
          return ascending ? av - bv : bv - av;
        });
      }
      return out;
    };

    builder.select = () => builder;
    builder.eq = (key: string, value: any) => {
      filters[key] = value;
      return builder;
    };
    builder.order = (key: string, { ascending }: { ascending: boolean }) => {
      orderBy = { key, ascending };
      return builder;
    };
    builder.returns = async <T>() => {
      const rows = applyFilters((state as any)[t] ?? []);
      return { data: rows as T, error: null };
    };
    builder.single = async <T>() => {
      const rows = applyFilters((state as any)[t] ?? []);
      if (rows.length === 0) return { data: null as any, error: { code: "PGRST116" } };
      return { data: rows[0] as T, error: null };
    };
    builder.maybeSingle = async <T>() => {
      const rows = applyFilters((state as any)[t] ?? []);
      return { data: (rows[0] ?? null) as T | null, error: null };
    };

    builder.insert = (input: any) => {
      const rows = Array.isArray(input) ? input : [input];
      const inserted = rows.map((r) => ({ id: genId(), ...r }));
      (state as any)[t].push(...inserted);
      const chain: any = {};
      chain.select = () => chain;
      chain.single = async <T>() => ({ data: inserted[0] as T, error: null });
      chain.returns = async <T>() => ({ data: inserted as T, error: null });
      return chain;
    };

    builder.upsert = (input: any, opts: { onConflict: string }) => {
      const rows = Array.isArray(input) ? input : [input];
      const affected: AnyRow[] = [];
      const keys = opts.onConflict.split(",").map((s) => s.trim());
      for (const r of rows) {
        const existing = (state as any)[t].find((x: AnyRow) => keys.every((k) => x[k] === r[k]));
        if (existing) {
          Object.assign(existing, r);
          affected.push(existing);
        } else {
          const inserted = { ...(r?.id ? { id: r.id } : { id: genId() }), ...r };
          (state as any)[t].push(inserted);
          affected.push(inserted);
        }
      }
      const chain: any = {};
      chain.select = () => chain;
      chain.single = async <T>() => ({ data: affected[0] as T, error: null });
      chain.returns = async <T>() => ({ data: affected as T, error: null });
      chain.then = (resolve: (value: { error: null; data: AnyRow[] }) => unknown) => resolve({ error: null, data: affected });
      return chain;
    };

    builder.update = (patch: AnyRow) => {
      pendingUpdate = patch;
      return builder;
    };

    const applyUpdate = async () => {
      const rows = applyFilters((state as any)[t] ?? []);
      for (const r of rows) Object.assign(r, pendingUpdate);
      pendingUpdate = null;
      return { error: null };
    };

    const oldEq = builder.eq;
    builder.eq = (key: string, value: any) => {
      oldEq(key, value);
      if (pendingUpdate) {
        const pendingBuilder = { ...builder } as typeof builder & { then?: () => Promise<{ error: null }> };
        pendingBuilder.then = async () => applyUpdate();
        return pendingBuilder;
      }
      return builder;
    };

    builder.then = undefined;
    builder[Symbol.toStringTag] = "Promise";
    builder.catch = undefined;

    return builder;
  };

  return { auth, from, __state: state } as any;
}

beforeEach(() => {
  process.env.ENVELOPE_PLATFORM_BACKEND = "supabase";
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
  resetPlatformBackendConfigForTests();
});

afterEach(() => {
  delete process.env.ENVELOPE_PLATFORM_BACKEND;
  delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  resetPlatformBackendConfigForTests();
});

describe("archive import", () => {
  it("imports create mode and resolves references", async () => {
    const supabase = createMockSupabase();

    const archive: ProjectArchive = {
      manifest: {
        format: "envelope.platform.archive",
        formatVersion: 1,
        schemaVersion: "3.0.0",
        exportedAt: new Date().toISOString(),
        source: { app: "@envelope/platform", appVersion: "3.0.0" },
        selection: {
          project: true,
          pages: "all",
          routes: "all",
          models: "all",
          flows: "all",
          endpoints: "all",
          auth: "all",
        },
        redaction: { enabled: true, rules: [] },
      },
      project: { name: "Imported", description: "", config: { version: "3.0.0" } },
      pages: [
        { key: "/", path: "/", title: "Home", schema: { version: "3.0.0", path: "/", title: "Home", components: [] } },
        { key: "/about", path: "/about", title: "About", schema: { version: "3.0.0", path: "/about", title: "About", components: [] } },
      ],
      routes: [
        { key: "/", path: "/", parentKey: null, pageKey: "/" },
        { key: "/about", path: "/about", parentKey: "/", pageKey: "/about" },
      ],
      flows: [{ key: "hello__abcd1234", name: "Hello", yaml_content: "id: flow\n" }],
      models: [],
      endpoints: [{ key: "GET /hello", method: "GET", path: "/hello", flowKey: "hello__abcd1234" }],
      auth: { providers: [{ name: "email", enabled: true, config: {} }], redirect_urls: { afterLogin: "/" }, session_config: {} },
    };

    const result = await importProjectArchive(
      archive,
      {
        mode: "create",
        conflictStrategy: "overwrite",
        danglingRefPolicy: "error",
      },
      {
        ownerUserId: "user_1",
        supabase,
      },
    );

    expect(result.projectId).toMatch(/^id_/);
    expect(supabase.__state.projects).toHaveLength(1);
    expect(supabase.__state.project_pages).toHaveLength(2);
    expect(supabase.__state.project_routes).toHaveLength(2);
    expect(supabase.__state.project_flows).toHaveLength(1);
    expect(supabase.__state.project_endpoints).toHaveLength(1);

    const pageByPath = new Map(supabase.__state.project_pages.map((p: AnyRow) => [p.path, p.id]));
    const routeByPath = new Map(supabase.__state.project_routes.map((r: AnyRow) => [r.path, r]));

    expect(routeByPath.get("/")!.page_id).toBe(pageByPath.get("/"));
    expect(routeByPath.get("/about")!.page_id).toBe(pageByPath.get("/about"));
    expect(routeByPath.get("/about")!.parent_route_id).toBe(routeByPath.get("/")!.id);

    const flowId = supabase.__state.project_flows[0]!.id;
    expect(supabase.__state.project_endpoints[0]!.flow_id).toBe(flowId);
  });
});

