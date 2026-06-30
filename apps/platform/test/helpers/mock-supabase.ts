import type { Database } from "@/lib/supabase/database.types";

type AnyRow = Record<string, any>;

/**
 * 轻量级 Supabase Mock。
 *
 * 目标：
 * - 覆盖 archive import / sync push 所需的最小接口集合；
 * - 允许测试直接检查各张表的落库结果；
 * - 保持行为尽量接近现有仓储对 `insert/upsert/select/update` 的调用方式。
 *
 * @author xiye
 * @date 2026-06-20
 */
export function createMockSupabase() {
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
      return { data: { user: { id: "remote_user_1" } }, error: null };
    },
  };

  const from = (table: keyof Database["public"]["Tables"]) => {
    const t = table as string;
    const builder: any = {};
    let filters: Record<string, any> = {};
    let orderBy: { key: string; ascending: boolean } | null = null;
    let pendingUpdate: AnyRow | null = null;

    const applyFilters = (rows: AnyRow[]) => {
      let out = rows.filter((row) => Object.entries(filters).every(([key, value]) => row[key] === value));
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
      const inserted = rows.map((row) => ({ id: row.id ?? genId(), ...row }));
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
      const keys = opts.onConflict.split(",").map((item) => item.trim());
      for (const row of rows) {
        const existing = (state as any)[t].find((candidate: AnyRow) => keys.every((key) => candidate[key] === row[key]));
        if (existing) {
          Object.assign(existing, row);
          affected.push(existing);
        } else {
          const inserted = { ...(row?.id ? { id: row.id } : { id: genId() }), ...row };
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
      for (const row of rows) Object.assign(row, pendingUpdate);
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
    builder.catch = undefined;
    builder[Symbol.toStringTag] = "Promise";

    return builder;
  };

  return { auth, from, __state: state } as any;
}
