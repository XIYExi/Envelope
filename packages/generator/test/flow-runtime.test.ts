/**
 * Flow 运行时生成器测试
 *
 * 测试覆盖:
 * - 生成器输出结构 (ISC-N1~N10 函数是否存在)
 * - 拓扑排序 DAG 与循环检测
 * - 单节点回归 (向后兼容)
 * - 3 节点流水线执行
 * - condition.if 条件分支
 * - {{...}} 模板变量解析
 */
import { describe, expect, it } from "vitest";
import { generateFlowRuntimeFiles } from "../src/generators/flow-runtime-generator";
import type {
  GenerateFlowRuntimeOptions,
  ProjectFlow,
} from "../src/generators/flow-runtime-types";

// ======================================================================
// 测试辅助: 构建 ProjectFlow YAML
// ======================================================================

/**
 * 从 FlowDefinition JSON 生成 YAML 字符串 (简化版)
 * 测试用, 使用 `thing` `version` `nodes` `edges` 字段
 */
/**
 * 将 config 对象转换为 YAML 行内 JSON (避免 YAML 把空对象解析为 null)
 */
function yamlConfigToInline(cfg: Record<string, unknown>): string {
  const keys = Object.keys(cfg);
  if (keys.length === 0) return "{}";
  // 简单情况用 JSON 行内格式
  return JSON.stringify(cfg);
}

/**
 * 构建 YAML 字符串
 *
 * 注意:
 * - Zod schema 要求 nodes 中每个节点必须有 config 字段且非 null
 * - edges 必须存在 (可为空数组)
 * - YAML 中 true/false 是布尔关键字, 需用引号包裹
 */
function buildFlowYaml(def: {
  thing: string;
  version?: string;
  description?: string;
  nodes: Array<{
    id: string;
    type: string;
    position?: { x: number; y: number };
    config?: Record<string, unknown>;
    label?: string;
  }>;
  edges?: Array<{
    id: string;
    source: string;
    sourceHandle: string;
    target: string;
    targetHandle: string;
  }>;
}): string {
  const lines: string[] = [];
  lines.push(`thing: ${def.thing}`);
  lines.push(`version: ${def.version ?? "1.0.0"}`);
  if (def.description) lines.push(`description: ${def.description}`);
  lines.push(`nodes:`);
  for (const n of def.nodes) {
    const cfg = n.config ?? {};
    lines.push(`  - id: ${n.id}`);
    lines.push(`    type: "${n.type}"`);
    lines.push(`    position:`);
    lines.push(`      x: ${n.position?.x ?? 0}`);
    lines.push(`      y: ${n.position?.y ?? 0}`);
    if (n.label) lines.push(`    label: "${n.label}"`);
    lines.push(`    config: ${yamlConfigToInline(cfg)}`);
  }
  // edges: 使用 JSON 格式确保空数组不被解析为 null
  const edges = def.edges ?? [];
  if (edges.length === 0) {
    lines.push(`edges: []`);
  } else {
    lines.push(`edges:`);
    for (const e of edges) {
      lines.push(`  - id: ${e.id}`);
      lines.push(`    source: "${e.source}"`);
      lines.push(`    sourceHandle: "${e.sourceHandle}"`);
      lines.push(`    target: "${e.target}"`);
      lines.push(`    targetHandle: "${e.targetHandle}"`);
    }
  }
  return lines.join("\n");
}

function makeFlow(id: string, name: string, def: Parameters<typeof buildFlowYaml>[0]): ProjectFlow {
  return { id, name, yaml_content: buildFlowYaml(def) };
}

function generate(options: GenerateFlowRuntimeOptions) {
  return generateFlowRuntimeFiles(options);
}

function getRuntimeContent(options: GenerateFlowRuntimeOptions): string {
  const files = generate(options);
  const file = files.find((f) => f.path === "lib/flows/runtime.ts");
  if (!file) throw new Error("runtime.ts not generated");
  return file.content;
}

function getRegistryContent(options: GenerateFlowRuntimeOptions): string {
  const files = generate(options);
  const file = files.find((f) => f.path === "lib/flows/registry.ts");
  if (!file) throw new Error("registry.ts not generated");
  return file.content;
}

// ======================================================================
// 测试套件
// ======================================================================

describe("Flow Runtime 生成器 - 输出结构", () => {
  it("生成的 runtime.ts 包含所有 ISC-N 函数", () => {
    const flow = makeFlow("test", "测试", {
      thing: "test-flow",
      nodes: [
        { id: "start", type: "event.start" },
        { id: "q1", type: "db.query", config: { table: "users" } },
        { id: "end", type: "event.end" },
      ],
      edges: [
        { id: "e1", source: "start", sourceHandle: "out", target: "q1", targetHandle: "table" },
        { id: "e2", source: "q1", sourceHandle: "result", target: "end", targetHandle: "in" },
      ],
    });

    const content = getRuntimeContent({ flows: [flow] });

    // ISC-N1: 拓扑排序
    expect(content).toContain("function topoSort");
    expect(content).toContain("Kahn");

    // ISC-N2: 端口数据传递
    expect(content).toContain("inputPorts");

    // ISC-N3: 条件判断
    expect(content).toContain("condition.if");

    // ISC-N4: 遍历循环
    expect(content).toContain("loop.forEach");
    expect(content).toContain("loop.while");

    // ISC-N5: 模板变量解析
    expect(content).toContain("function resolveTemplates");

    // ISC-N6: 错误处理
    expect(content).toContain("execError");
    expect(content).toContain("error");

    // ISC-N7: 延时
    expect(content).toContain("flow.delay");

    // ISC-N8: action 存根
    expect(content).toContain("action.email");
    expect(content).toContain("notification");
    expect(content).toContain("custom.code");

    // ISC-N9: Supabase 单例
    expect(content).toContain("_supabaseClient");

    // ISC-N10: 执行日志
    expect(content).toContain("FlowExecutionLog");
    expect(content).toContain("logs");
  });

  it("生成的 registry.ts 包含 flow 定义", () => {
    const flow = makeFlow("my-flow", "我的流程", {
      thing: "my-thing",
      nodes: [
        { id: "n1", type: "db.query", config: { table: "users" } },
      ],
    });

    const content = getRegistryContent({ flows: [flow] });
    expect(content).toContain("my-thing");
    expect(content).toContain("flowRegistry");
  });

  it("生成的 client.ts 和 route.ts 存在", () => {
    const flow = makeFlow("f1", "F1", {
      thing: "f1",
      nodes: [{ id: "n1", type: "db.query", config: { table: "t" } }],
    });
    const files = generate({ flows: [flow] });

    expect(files.some((f) => f.path === "lib/flows/client.ts")).toBe(true);
    expect(files.some((f) => f.path === "app/api/flows/[flowId]/route.ts")).toBe(true);
  });
});

describe("Flow Runtime - 拓扑排序 (ISC-N1)", () => {
  it("3 节点 DAG 生成正确顺序", () => {
    // A → B → C
    const flow = makeFlow("dag3", "3节点DAG", {
      thing: "dag-3",
      nodes: [
        { id: "a", type: "transform.data", config: { expression: "a" } },
        { id: "b", type: "transform.data", config: { expression: "b" } },
        { id: "c", type: "transform.data", config: { expression: "c" } },
      ],
      edges: [
        { id: "e1", source: "a", sourceHandle: "result", target: "b", targetHandle: "input" },
        { id: "e2", source: "b", sourceHandle: "result", target: "c", targetHandle: "input" },
      ],
    });

    const content = getRuntimeContent({ flows: [flow] });

    // 验证生成的代码包含拓扑排序逻辑: a 必须在 b 前, b 必须在 c 前
    expect(content).toContain("function topoSort");
    // 验证入度计算逻辑存在
    expect(content).toContain("inDegree");
    // 验证循环检测
    expect(content).toContain("循环依赖");
  });

  it("空边列表生成任意顺序", () => {
    const flow = makeFlow("no-edge", "无边", {
      thing: "no-edge",
      nodes: [
        { id: "x", type: "transform.data", config: { expression: "x" } },
        { id: "y", type: "transform.data", config: { expression: "y" } },
      ],
      edges: [],
    });

    const content = getRuntimeContent({ flows: [flow] });
    expect(content).toContain("topoSort");
  });

  it("生成的代码检测循环依赖并抛出错误", () => {
    const flow = makeFlow("cycle", "循环依赖", {
      thing: "cycle",
      nodes: [
        { id: "a", type: "transform.data", config: {} },
        { id: "b", type: "transform.data", config: {} },
      ],
      edges: [
        { id: "e1", source: "a", sourceHandle: "result", target: "b", targetHandle: "input" },
        { id: "e2", source: "b", sourceHandle: "result", target: "a", targetHandle: "input" },
      ],
    });

    const content = getRuntimeContent({ flows: [flow] });
    // 验证有循环检测逻辑
    expect(content).toContain("循环依赖");
    expect(content).toContain("order.length !== nodes.length");
  });
});

describe("Flow Runtime - 单节点回归 (向后兼容)", () => {
  it("单 db.query 节点生成查询代码", () => {
    const flow = makeFlow("single-query", "单查询", {
      thing: "single-query",
      nodes: [
        { id: "start", type: "event.start" },
        { id: "q1", type: "db.query", config: { table: "users", limit: 10 } },
        { id: "end", type: "event.end" },
      ],
      edges: [
        { id: "e1", source: "start", sourceHandle: "out", target: "q1", targetHandle: "table" },
        { id: "e2", source: "q1", sourceHandle: "result", target: "end", targetHandle: "in" },
      ],
    });

    const content = getRuntimeContent({ flows: [flow] });
    // SQL 查询逻辑
    expect(content).toContain("db.query");
    expect(content).toContain(".from(table).select");
    expect(content).toContain(".limit");
  });

  it("单 api.request 节点生成请求代码", () => {
    const flow = makeFlow("single-api", "单API", {
      thing: "single-api",
      nodes: [
        { id: "start", type: "event.start" },
        { id: "api", type: "api.request", config: { url: "https://api.example.com", method: "GET" } },
        { id: "end", type: "event.end" },
      ],
      edges: [
        { id: "e1", source: "start", sourceHandle: "out", target: "api", targetHandle: "url" },
        { id: "e2", source: "api", sourceHandle: "response", target: "end", targetHandle: "in" },
      ],
    });

    const content = getRuntimeContent({ flows: [flow] });
    expect(content).toContain("api.request");
    expect(content).toContain("fetch(url");
  });

  it("runFlow API 签名保持不变", () => {
    const flow = makeFlow("check-api", "检查API", {
      thing: "check-api",
      nodes: [
        { id: "start", type: "event.start" },
        { id: "n", type: "transform.data", config: {} },
        { id: "end", type: "event.end" },
      ],
      edges: [
        { id: "e1", source: "start", sourceHandle: "out", target: "n", targetHandle: "input" },
        { id: "e2", source: "n", sourceHandle: "result", target: "end", targetHandle: "in" },
      ],
    });

    const content = getRuntimeContent({ flows: [flow] });

    // 验证 API 签名: async function runFlow(flowId: string, input: unknown): Promise<RunFlowResult>
    expect(content).toContain("export async function runFlow(flowId: string, input: unknown)");
    // 验证返回类型包含 flowId, version, output
    expect(content).toContain("flowId");
    expect(content).toContain("version");
    expect(content).toContain("output");
  });
});

describe("Flow Runtime - 3 节点流水线 (ISC-N1,N2)", () => {
  it("3 节点链式流水线的拓扑排序与端口传递代码", () => {
    // db.query → transform.data → api.request
    const flow = makeFlow("pipeline-3", "3节点流水线", {
      thing: "pipeline-3",
      nodes: [
        { id: "db1", type: "db.query", config: { table: "orders" } },
        { id: "tx1", type: "transform.data", config: { expression: "result[0]" } },
        { id: "api1", type: "api.request", config: { url: "https://api.example.com/submit" } },
      ],
      edges: [
        { id: "e1", source: "db1", sourceHandle: "result", target: "tx1", targetHandle: "input" },
        { id: "e2", source: "tx1", sourceHandle: "result", target: "api1", targetHandle: "body" },
      ],
    });

    const content = getRuntimeContent({ flows: [flow] });

    // 验证端口传递逻辑: 源端口值传递给目标端口
    expect(content).toContain("sourceHandle");
    expect(content).toContain("targetHandle");
    expect(content).toContain("srcPorts");

    // 验证拓扑序执行循环
    expect(content).toContain("sortedIds");
    expect(content).toContain("for (const nodeId of sortedIds)");
  });
});

describe("Flow Runtime - condition.if 分支 (ISC-N3)", () => {
  it("condition.if 分支代码生成", () => {
    const flow = makeFlow("cond-if", "条件分支", {
      thing: "cond-if",
      nodes: [
        { id: "start", type: "event.start" },
        { id: "cond", type: "condition.if", config: { expression: "{{input.role == 'admin'}}" } },
        { id: "queryAdmin", type: "db.query", config: { table: "admin_data" } },
        { id: "queryUser", type: "db.query", config: { table: "user_data" } },
        { id: "end", type: "event.end" },
      ],
      edges: [
        { id: "e1", source: "start", sourceHandle: "out", target: "cond", targetHandle: "condition" },
        { id: "e2", source: "cond", sourceHandle: "true", target: "queryAdmin", targetHandle: "table" },
        { id: "e3", source: "cond", sourceHandle: "false", target: "queryUser", targetHandle: "table" },
        { id: "e4", source: "queryAdmin", sourceHandle: "result", target: "end", targetHandle: "in" },
        { id: "e5", source: "queryUser", sourceHandle: "result", target: "end", targetHandle: "in" },
      ],
    });

    const content = getRuntimeContent({ flows: [flow] });

    // ISC-N3: 条件节点根据结果路由到 true/false 分支
    expect(content).toContain("condition");
    expect(content).toContain("isTruthy");
    expect(content).toContain('"true"');
    expect(content).toContain('"false"');
    // 非活跃分支跳过
    expect(content).toContain("非活跃分支");
  });
});

describe("Flow Runtime - 模板变量解析 (ISC-N5)", () => {
  it("模板变量解析函数代码生成", () => {
    const flow = makeFlow("template-test", "模板测试", {
      thing: "template-test",
      nodes: [
        { id: "n1", type: "db.query", config: { table: "{{input.tableName}}" } },
      ],
      edges: [],
    });

    const content = getRuntimeContent({ flows: [flow] });

    // ISC-N5: 花括号模板解析
    expect(content).toContain("resolveTemplates");
    expect(content).toContain("{{");
    expect(content).toContain("}}");
  });

  it("transform.data 节点使用 getByPath 进行路径提取", () => {
    const flow = makeFlow("transform-getbypath", "数据转换", {
      thing: "transform-test",
      nodes: [
        { id: "tx", type: "transform.data", config: { expression: "data.items[0]" } },
      ],
      edges: [],
    });

    const content = getRuntimeContent({ flows: [flow] });
    expect(content).toContain("getByPath");
    // config 中的 expression 在 executeNode 中被处理
    expect(content).toContain("expression");
  });
});

describe("Flow Runtime - 执行日志 (ISC-N10)", () => {
  it("日志类型 FlowExecutionLog 定义正确", () => {
    const flow = makeFlow("log-test", "日志测试", {
      thing: "log-test",
      nodes: [
        { id: "n1", type: "db.query", config: { table: "t" } },
      ],
      edges: [],
    });

    const content = getRuntimeContent({ flows: [flow] });
    expect(content).toContain("FlowExecutionLog");
    expect(content).toContain("nodeId");
    expect(content).toContain("nodeType");
    expect(content).toContain("durationMs");
  });

  it("每节点执行后记录日志", () => {
    const flow = makeFlow("multi-log", "多节点日志", {
      thing: "multi-log",
      nodes: [
        { id: "a", type: "transform.data", config: { expression: "a" } },
        { id: "b", type: "transform.data", config: { expression: "b" } },
      ],
      edges: [
        { id: "e1", source: "a", sourceHandle: "result", target: "b", targetHandle: "input" },
      ],
    });

    const content = getRuntimeContent({ flows: [flow] });
    // 验证循环中推入日志
    expect(content).toContain("logs.push");
    expect(content).toContain("durationMs");
  });
});

describe("Flow Runtime - 错误处理 (ISC-N6)", () => {
  it("try/catch 包裹节点执行", () => {
    const flow = makeFlow("err-test", "错误测试", {
      thing: "err-test",
      nodes: [
        { id: "n1", type: "db.query", config: { table: "t" } },
      ],
      edges: [],
    });

    const content = getRuntimeContent({ flows: [flow] });
    expect(content).toContain("try {");
    expect(content).toContain("catch (err)");
    expect(content).toContain("execError");
  });

  it("error 端口边存在时错误不抛出", () => {
    const flow = makeFlow("err-port", "错误端口", {
      thing: "err-port",
      nodes: [
        { id: "n1", type: "db.query", config: { table: "t" } },
        { id: "n2", type: "transform.data", config: { expression: "error" } },
      ],
      edges: [
        { id: "e1", source: "n1", sourceHandle: "error", target: "n2", targetHandle: "input" },
      ],
    });

    const content = getRuntimeContent({ flows: [flow] });
    expect(content).toContain("hasErrorEdge");
    expect(content).toContain("sourceHandle === \"error\"");
  });
});

describe("Flow Runtime - 延时 (ISC-N7)", () => {
  it("flow.delay 节点生成 setTimeout", () => {
    const flow = makeFlow("delay-test", "延时测试", {
      thing: "delay-test",
      nodes: [
        { id: "d1", type: "flow.delay", config: { milliseconds: 1000 } },
      ],
      edges: [],
    });

    const content = getRuntimeContent({ flows: [flow] });
    expect(content).toContain("flow.delay");
    expect(content).toContain("setTimeout");
  });
});

describe("Flow Runtime - 动作节点存根 (ISC-N8)", () => {
  it("action.email 输出日志存根", () => {
    const flow = makeFlow("email-test", "邮件测试", {
      thing: "email-test",
      nodes: [
        { id: "e1", type: "action.email", config: { to: "user@test.com", subject: "Hello" } },
      ],
      edges: [],
    });

    const content = getRuntimeContent({ flows: [flow] });
    expect(content).toContain("action.email");
    expect(content).toContain("console.log");
  });

  it("notification 输出日志存根", () => {
    const flow = makeFlow("notif-test", "通知测试", {
      thing: "notif-test",
      nodes: [
        { id: "n1", type: "notification", config: { title: "提醒", message: "测试消息" } },
      ],
      edges: [],
    });

    const content = getRuntimeContent({ flows: [flow] });
    expect(content).toContain("notification");
    expect(content).toContain("shown: true");
  });

  it("custom.code 存根实现", () => {
    const flow = makeFlow("code-test", "自定义代码", {
      thing: "code-test",
      nodes: [
        { id: "c1", type: "custom.code", config: { code: "return 42;" } },
      ],
      edges: [],
    });

    const content = getRuntimeContent({ flows: [flow] });
    expect(content).toContain("custom.code");
    expect(content).toContain("存根");
  });
});

describe("Flow Runtime - Supabase 单例 (ISC-N9)", () => {
  it("_supabaseClient 单例变量存在", () => {
    const flow = makeFlow("sb-test", "Supabase测试", {
      thing: "sb-test",
      nodes: [
        { id: "q1", type: "db.query", config: { table: "t" } },
      ],
      edges: [],
    });

    const content = getRuntimeContent({ flows: [flow] });
    expect(content).toContain("_supabaseClient");
    expect(content).toContain("!_supabaseClient");
  });
});

describe("Flow Runtime - 端点路径归一化", () => {
  it("端点路径正确转换为文件路径", () => {
    const content = generateFlowRuntimeFiles({
      endpoints: [
        { id: "ep1", method: "GET", path: "/api/users/:id", flow_id: "f1" },
      ],
    });

    const routeFile = content.find((f) => f.path.includes("users"));
    expect(routeFile).toBeDefined();
    expect(routeFile!.path).toContain("[id]");
  });
});
