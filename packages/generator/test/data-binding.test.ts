/**
 * L Domain (Data Linkage Runtime) 测试
 *
 * 覆盖 ISC-L1 至 L7 的数据绑定代码生成：
 * - L1: dataBindings 生成可运行的 Supabase 查询代码
 * - L2: dataBindings 生成 TanStack Query useQuery 包装
 * - L3: 数据查询结果回填组件 props 响应式更新
 * - L4: 支持 table.column 单列绑定的运行时求值
 * - L5: 数据查询参数可绑定 URL searchParams
 * - L6: 数据查询参数可绑定其他组件当前值（通过模板解析实现）
 * - L7: UI 自动补全（在编辑器端验证，此处跳过）
 */
import { describe, expect, it } from "vitest";
import { generatePageCode } from "../src/generators/page-generator";
import type { ComponentNode, PageSchema } from "@envelope/engine";

// ======================================================================
// 测试辅助: 构建页面 Schema
// ======================================================================

function makeComponent(overrides: Partial<ComponentNode> & { type: string }): ComponentNode {
  const id = overrides.id || `test-${Math.random().toString(36).slice(2, 8)}`;
  return {
    name: `${overrides.type}-${id}`,
    category: "display",
    props: {},
    ...overrides,
    id,
  };
}

interface PageOptions {
  title?: string;
  components?: ComponentNode[];
}

function makePage(opts: PageOptions): PageSchema {
  return {
    version: "3.0.0",
    title: opts.title || "Test Page",
    path: "/test",
    components: opts.components || [],
  };
}

// ======================================================================
// 测试套件
// ======================================================================

describe("L Domain — 数据绑定代码生成", () => {
  // ─── L1 + L2: useQuery + Supabase 查询 ──────────────────────────
  it("L1+L2: 生成 useQuery import 和 Supabase 查询代码", () => {
    const page = makePage({
      components: [
        makeComponent({
          type: "Badge",
          id: "b1",
          dataBindings: { text: "users.name" },
        }),
      ],
    });
    const code = generatePageCode(page);

    // L1: 生成可运行的 Supabase 查询（多行生成，检测关键片段）
    expect(code).toContain(`.from("users")`);
    expect(code).toContain(`.select("*")`);
    expect(code).toContain(`if (error) throw new Error(error.message)`);
    expect(code).toContain(`process.env.NEXT_PUBLIC_SUPABASE_URL!`);

    // L2: useQuery 包装存在
    expect(code).toContain(`import { useQuery } from "@tanstack/react-query"`);
    expect(code).toContain(`const { data: usersData } = useQuery({`);
    expect(code).toContain(`queryKey: ["users"],`);

    // L1: createClient 导入存在
    expect(code).toContain(`import { createClient } from "@supabase/supabase-js"`);
  });

  // ─── L3: 组件 props 接收数据 ─────────────────────────────────────
  it("L3: 数据查询结果回填组件 props — {usersData} 出现在 JSX 中", () => {
    const page = makePage({
      components: [
        makeComponent({
          type: "Badge",
          id: "b2",
          dataBindings: { text: "users.*" },
        }),
      ],
    });
    const code = generatePageCode(page);

    // L3: dataBindingAttrs 将 usersData 注入到组件 prop
    expect(code).toContain(`text={usersData}`);
  });

  // ─── L4: 单列绑定 ────────────────────────────────────────────────
  it("L4: table.column 单列绑定生成 {tableData?.[0]?.column}", () => {
    const page = makePage({
      components: [
        makeComponent({
          type: "CardTitle",
          id: "ct1",
          dataBindings: { text: "users.name" },
        }),
      ],
    });
    const code = generatePageCode(page);

    // L4: 单列绑定时取结果数组首行的指定字段
    expect(code).toContain(`text={usersData?.[0]?.name}`);
  });

  // ─── L4: table.* 绑定 ────────────────────────────────────────────
  it("L4: table.* 绑定生成 {tableData} 整表传递", () => {
    const page = makePage({
      components: [
        makeComponent({
          type: "Table",
          id: "t1",
          dataBindings: { data: "orders.*" },
        }),
      ],
    });
    const code = generatePageCode(page);

    // L4: * 表示绑定整张表
    expect(code).toContain(`data={ordersData}`);
    // 只生成一张表的 useQuery
    expect(code).toContain(`queryKey: ["orders"]`);
    expect(code).toContain(`.from("orders")`);
  });

  // ─── L5: searchParams 绑定 ──────────────────────────────────────
  it("L5: {{searchParams.xxx}} 生成 useSearchParams 绑定代码", () => {
    const page = makePage({
      components: [
        makeComponent({
          type: "Input",
          id: "in1",
          dataBindings: { defaultValue: "{{searchParams.query}}" },
        }),
      ],
    });
    const code = generatePageCode(page);

    // L5: useSearchParams 导入
    expect(code).toContain(`import { useSearchParams } from "next/navigation"`);
    // L5: searchParams 实例化
    expect(code).toContain(`const searchParams = useSearchParams()`);
    // L5: 组件 prop 绑定到 searchParams?.get()
    expect(code).toContain(`defaultValue={searchParams?.get("query")}`);
  });

  // ─── 多表去重 ────────────────────────────────────────────────────
  it("多组件绑定同一张表只生成一个 useQuery", () => {
    const page = makePage({
      components: [
        makeComponent({
          type: "CardTitle",
          id: "ct2",
          dataBindings: { text: "users.name" },
        }),
        makeComponent({
          type: "Badge",
          id: "b3",
          dataBindings: { text: "users.email" },
        }),
      ],
    });
    const code = generatePageCode(page);

    // 只生成一个 users useQuery
    const matches = code.match(/queryKey:\s*\["users"\]/g);
    expect(matches).toHaveLength(1);
  });

  // ─── 无数据绑定时不生成无用代码 ─────────────────────────────────
  it("无 dataBindings 时不生成数据绑定代码", () => {
    const page = makePage({
      components: [
        makeComponent({ type: "Button", id: "btn1" }),
      ],
    });
    const code = generatePageCode(page);

    expect(code).not.toContain(`@tanstack/react-query`);
    expect(code).not.toContain(`@supabase/supabase-js`);
    expect(code).not.toContain(`useQuery`);
    expect(code).not.toContain(`createClient`);
  });

  // ─── useMemo 导入 ────────────────────────────────────────────────
  it("数据绑定时 React imports 包含 useMemo", () => {
    const page = makePage({
      components: [
        makeComponent({
          type: "Badge",
          id: "b4",
          dataBindings: { text: "products.name" },
        }),
      ],
    });
    const code = generatePageCode(page);

    expect(code).toContain(`import { useEffect, useMemo } from "react"`);
  });

  // ─── L5: 动态路由 params 绑定 ────────────────────────────────────
  it("L5: {{params.id}} 绑定也生成 useSearchParams", () => {
    const page = makePage({
      components: [
        makeComponent({
          type: "Input",
          id: "in2",
          dataBindings: { defaultValue: "{{params.id}}" },
        }),
      ],
    });
    const code = generatePageCode(page);

    // params 绑定同样需要 useSearchParams
    expect(code).toContain(`import { useSearchParams } from "next/navigation"`);
    expect(code).toContain(`const searchParams = useSearchParams()`);
    expect(code).toContain(`defaultValue={searchParams?.get("id")}`);
  });

  // ─── 嵌套组件数据绑定 ────────────────────────────────────────────
  it("嵌套组件的 dataBindings 也被收集", () => {
    const page = makePage({
      components: [
        makeComponent({
          type: "Card",
          id: "card1",
          children: [
            makeComponent({
              type: "CardTitle",
              id: "ct3",
              dataBindings: { text: "users.name" },
            }),
          ],
        }),
      ],
    });
    const code = generatePageCode(page);

    // 嵌套组件的绑定应该被收集
    expect(code).toContain(`queryKey: ["users"]`);
    expect(code).toContain(`.from("users")`);
  });
});
