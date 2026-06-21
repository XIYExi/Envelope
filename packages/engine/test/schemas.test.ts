/**
 * schemas 单测
 *
 * 覆盖目标：
 * - pageSchema/componentSchema：递归结构、grid 边界、以及 name 的 transform 规则
 * - routesSchema：递归 children 结构与默认值
 * - dbSchemaSchema/tableSchema/columnSchema：关键默认值与最小约束
 * - authSchema/projectConfigSchema：默认配置的稳定性
 *
 * 说明：
 * - 这些 Schema 是“导入/保存/生成代码”的输入边界，单测重点放在默认值与约束规则是否符合预期
 */
import { describe, expect, it } from "vitest";
import { z, ZodError } from "zod";
import { authSchema, dbSchemaSchema, pageSchema, projectConfigSchema, routesSchema } from "../src/schemas";

describe("schemas", () => {
  describe("pageSchema/componentSchema", () => {
    it("组件 name：缺省或仅空白时，会自动生成并且进行 trim", () => {
      const parsed = pageSchema.parse({
        title: "首页",
        path: "/",
        components: [
          { id: "c1", type: "Button", category: "form" },
          { id: "c2", type: "Card", category: "layout", name: "  自定义名称  " },
          {
            id: "c3",
            type: "Card",
            category: "layout",
            name: "   ",
            children: [{ id: "c3-1", type: "Text", category: "display" }],
          },
        ],
      });

      expect(parsed.components[0]?.name).toBe("Button-c1");
      expect(parsed.components[1]?.name).toBe("自定义名称");
      expect(parsed.components[2]?.name).toBe("Card-c3");
      expect(parsed.components[2]?.children?.[0]?.name).toBe("Text-c3-1");
    });

    it("grid：col 必须在 1~12，越界会抛出错误", () => {
      expect(() =>
        pageSchema.parse({
          title: "t",
          path: "/",
          components: [{ id: "c1", type: "Button", category: "form", grid: { col: 13, row: 1 } }],
        }),
      ).toThrow(ZodError);
    });

    it("pageSchema：padding / metadata / background / components 都有稳定默认值", () => {
      const parsed = pageSchema.parse({ title: "t", path: "/" });
      expect(parsed.version).toBe("3.0.0");
      expect(parsed.padding).toBe(16);
      expect(parsed.metadata).toEqual({});
      expect(parsed.background).toEqual({});
      expect(parsed.components).toEqual([]);
    });
  });

  describe("routesSchema", () => {
    it("routesSchema：默认 version=3.0.0 且 routes 为空数组", () => {
      const parsed = routesSchema.parse({});
      expect(parsed.version).toBe("3.0.0");
      expect(parsed.routes).toEqual([]);
    });

    it("routesSchema：支持递归 children 的路由树", () => {
      const parsed = routesSchema.parse({
        routes: [
          {
            id: "root",
            path: "/",
            children: [
              { id: "dashboard", path: "dashboard", pageId: "page-1", authRequired: true },
              { id: "settings", path: "settings", children: [{ id: "profile", path: "profile" }] },
            ],
          },
        ],
      });

      expect(parsed.routes?.[0]?.children?.[0]?.path).toBe("dashboard");
      expect(parsed.routes?.[0]?.children?.[1]?.children?.[0]?.path).toBe("profile");
    });
  });

  describe("dbSchemaSchema/tableSchema/columnSchema", () => {
    it("dbSchemaSchema：tables/enums 默认空数组，table 默认字段值生效", () => {
      const parsed = dbSchemaSchema.parse({
        tables: [
          {
            name: "users",
            columns: [{ name: "id", type: "uuid", isPrimary: true }],
          },
        ],
      });

      expect(parsed.version).toBe("3.0.0");
      expect(parsed.enums).toEqual([]);
      expect(parsed.tables[0]?.indexes).toEqual([]);
      expect(parsed.tables[0]?.rlsEnabled).toBe(true);
      expect(parsed.tables[0]?.rlsPolicies).toEqual([]);
      expect(parsed.tables[0]?.columns[0]?.nullable).toBe(true);
      expect(parsed.tables[0]?.columns[0]?.isUnique).toBe(false);
    });

    it("tableSchema：columns 至少包含 1 列，否则校验失败", () => {
      expect(() => dbSchemaSchema.parse({ tables: [{ name: "t", columns: [] }] })).toThrow(ZodError);
    });
  });

  describe("authSchema/projectConfigSchema", () => {
    it("authSchema：默认启用 email provider，并提供默认 redirectUrls/session", () => {
      const parsed = authSchema.parse({});
      expect(parsed.providers[0]?.name).toBe("email");
      expect(parsed.redirectUrls.afterLogin).toBe("/");
      expect(parsed.redirectUrls.afterLogout).toBe("/login");
      expect(parsed.session.duration).toBe(3600);
      expect(parsed.session.refreshTokenRotation).toBe(true);
    });

    it("projectConfigSchema：theme/seo 默认空对象，version 默认 3.0.0", () => {
      const parsed = projectConfigSchema.parse({});
      expect(parsed.version).toBe("3.0.0");
      expect(parsed.theme).toEqual({});
      expect(parsed.seo).toEqual({});
    });
  });
});
