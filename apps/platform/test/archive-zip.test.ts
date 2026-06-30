import { describe, expect, it } from "vitest";
import { createArchiveZip, parseArchiveZip } from "@/lib/archive/archive-zip";
import type { ProjectArchive } from "@/lib/archive/archive-types";

describe("archive zip", () => {
  it("roundtrip", () => {
    const archive: ProjectArchive = {
      manifest: {
        format: "envelope.platform.archive",
        formatVersion: 1,
        schemaVersion: "3.0.0",
        exportedAt: new Date("2026-06-20T00:00:00.000Z").toISOString(),
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
        redaction: { enabled: true, rules: ["project.config.supabase.anonKey"] },
      },
      project: {
        originId: "p1",
        name: "Demo",
        description: "desc",
        config: { version: "3.0.0", supabase: { projectUrl: "https://example.supabase.co" } },
        schema_version: "3.0.0",
      },
      pages: [
        {
          originId: "page1",
          key: "/",
          path: "/",
          title: "Home",
          description: "",
          schema: { version: "3.0.0", path: "/", title: "Home", components: [] },
          metadata: {},
          sort_order: 0,
          is_published: false,
        },
      ],
      routes: [
        {
          originId: "route1",
          key: "/",
          path: "/",
          parentKey: null,
          pageKey: "/",
          layout_id: null,
          auth_required: false,
          roles: [],
          middleware_config: {},
          metadata: {},
          sort_order: 0,
        },
      ],
      flows: [
        {
          originId: "flow1",
          key: "hello__abcd1234",
          name: "Hello",
          description: "",
          flow_type: "default",
          yaml_content: "id: flow1\nname: Hello\n",
          trigger_event: null,
          is_active: true,
        },
      ],
      models: [
        {
          originId: "model1",
          key: "users",
          table_name: "users",
          schema: { name: "users", columns: [{ name: "id", type: "uuid", primaryKey: true }], indexes: [] },
          rls_policies: [],
        },
      ],
      endpoints: [
        {
          originId: "ep1",
          key: "GET /hello",
          method: "GET",
          path: "/hello",
          description: "",
          request_schema: {},
          response_schema: {},
          middleware: [],
          flowKey: "hello__abcd1234",
          is_active: true,
        },
      ],
      auth: {
        providers: [{ name: "email", enabled: true, config: {} }],
        redirect_urls: { afterLogin: "/" },
        session_config: { duration: 3600, refreshTokenRotation: true },
      },
    };

    const bytes = createArchiveZip(archive);
    const parsed = parseArchiveZip(bytes);

    expect(parsed.manifest.format).toBe("envelope.platform.archive");
    expect(parsed.project.name).toBe("Demo");
    expect(parsed.pages[0]?.path).toBe("/");
    expect(parsed.routes[0]?.pageKey).toBe("/");
    expect(parsed.flows[0]?.key).toBe("hello__abcd1234");
    expect(parsed.flows[0]?.yaml_content).toContain("name: Hello");
    expect(parsed.endpoints[0]?.flowKey).toBe("hello__abcd1234");
    expect(parsed.auth?.redirect_urls?.afterLogin).toBe("/");
  });
});

