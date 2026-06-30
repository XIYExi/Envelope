/**
 * Flow 试运行执行引擎
 *
 * 使用工厂模式根据节点类型创建对应的执行器，
 * 在编辑器内模拟执行 flow，不操作真实数据库/API，
 * 用于快速验证 flow 逻辑的正确性。
 *
 * 设计模式：
 * - 工厂模式：createNodeExecutor 根据节点类型返回对应的模拟执行函数
 * - 观察者模式：执行状态通过 NodeExecutionState 推送给 UI
 *
 * @author xiye
 * @date 2026-06-25
 */

import type {
  FlowDefinition,
  FlowNode,
  FlowEdge,
  FlowExecutionResult,
  NodeExecutionState,
} from "../thing-model/types";
import { NODE_DEFINITION_MAP } from "../thing-model/node-definitions";

/** 执行选项 */
export interface ExecuteOptions {
  /** 外部输入数据 */
  input?: Record<string, unknown>;
  /** 模拟执行模式：mock - 不执行真实操作（默认） */
  mode?: "mock";
}

/**
 * 节点执行上下文
 *
 * 包含流程中所有已完成的节点输出，供后续节点引用。
 */
interface ExecutionContext {
  /** 已执行节点的输出，key 为节点 ID */
  nodeOutputs: Record<string, unknown>;
  /** 外部传入的输入数据 */
  input: Record<string, unknown>;
}

/**
 * 对节点配置中的表达式求值
 *
 * 简单求值器，支持 data.xxx 模式的变量引用。
 * 试运行模式下不会执行危险的代码。
 *
 * @param expression - JavaScript 表达式字符串
 * @param context - 求值上下文
 * @returns 求值结果，失败时返回 undefined
 */
function safeEval(expression: string, context: Record<string, unknown>): unknown {
  try {
    const keys = Object.keys(context);
    const vals = Object.values(context);
    const fn = new Function(...keys, `return (${expression});`);
    return fn(...vals);
  } catch {
    return undefined;
  }
}

/**
 * 创建节点执行器（工厂模式）
 *
 * 根据 FlowNodeType 返回对应的模拟执行函数。
 * 每个执行器接收节点的配置和输入，返回模拟输出。
 *
 * @param node - 流程节点实例
 * @returns 模拟执行函数，接收上下文，返回执行状态
 */
function createNodeExecutor(node: FlowNode): (ctx: ExecutionContext) => NodeExecutionState {
  const config = node.config ?? {};
  const nodeDef = NODE_DEFINITION_MAP.get(node.type);

  return (ctx: ExecutionContext): NodeExecutionState => {
    const startTime = Date.now();

    // 构建输入数据：节点配置 + 上游输入
    const input = {
      config,
      inputData: ctx.nodeOutputs,
      flowInput: ctx.input,
    };

    let output: unknown;
    let error: string | undefined;
    let status: NodeExecutionState["status"] = "done";

    try {
      switch (node.type) {
        // ── 数据库操作：返回模拟数据 ──
        case "db.query": {
          output = [
            { id: 1, name: "模拟数据A", created_at: new Date().toISOString() },
            { id: 2, name: "模拟数据B", created_at: new Date().toISOString() },
            { id: 3, name: "模拟数据C", created_at: new Date().toISOString() },
          ];
          break;
        }

        case "db.insert": {
          output = { id: Date.now(), ...(config as Record<string, unknown>), created_at: new Date().toISOString() };
          break;
        }

        case "db.update": {
          output = { count: 1 };
          break;
        }

        case "db.delete": {
          output = { count: 1 };
          break;
        }

        // ── API 请求：返回模拟响应 ──
        case "api.request": {
          output = { status: 200, data: { message: "模拟响应", success: true } };
          break;
        }

        // ── 条件分支 ──
        case "condition.if": {
          // 从 config 或上游输入中获取条件值
          const condValue = config.expression ?? ctx.nodeOutputs[Object.keys(ctx.nodeOutputs)[0] ?? ""];
          if (typeof condValue === "boolean") {
            output = { result: condValue, branch: condValue ? "true" : "false" };
          } else if (typeof condValue === "string") {
            // 尝试表达式求值
            const evaled = safeEval(condValue, { data: ctx.input, ...ctx.nodeOutputs });
            output = { result: !!evaled, branch: evaled ? "true" : "false" };
          } else {
            output = { result: true, branch: "true" };
          }
          break;
        }

        case "condition.switch": {
          const cases = config.cases as Array<{ label: string; value: string }> | undefined;
          const matchValue = ctx.nodeOutputs[Object.keys(ctx.nodeOutputs)[0] ?? ""];
          const matched = cases?.find((c) => c.value === matchValue);
          output = { matched: matched?.label ?? "default", value: matchValue };
          break;
        }

        // ── 循环 ──
        case "loop.forEach": {
          const items = ctx.nodeOutputs[Object.keys(ctx.nodeOutputs)[0] ?? ""];
          const arr = Array.isArray(items) ? items.slice(0, 3) : [];
          output = { items: arr, count: arr.length, simulated: true };
          break;
        }

        case "loop.while": {
          // 防止无限循环，只执行 1 次
          output = { iterations: 1, stopped: true, warning: "试运行模式：仅执行 1 次循环" };
          break;
        }

        // ── 数据转换 ──
        case "transform.data": {
          const expr = (config.expression as string) ?? "";
          if (expr) {
            const upstreamData = ctx.nodeOutputs[Object.keys(ctx.nodeOutputs)[0] ?? ""] ?? ctx.input;
            const result = safeEval(expr, { data: upstreamData });
            output = result !== undefined ? result : { warning: "表达式求值失败", input: upstreamData };
          } else {
            output = ctx.nodeOutputs[Object.keys(ctx.nodeOutputs)[0] ?? ""] ?? ctx.input;
          }
          break;
        }

        // ── 自定义代码 ──
        case "custom.code": {
          output = { warning: "试运行模式不执行自定义代码", codePreview: (config.code as string)?.slice(0, 100) };
          break;
        }

        // ── 发送邮件 ──
        case "action.email": {
          output = { sent: true, to: config.to, subject: config.subject };
          break;
        }

        // ── 通知 ──
        case "notification": {
          output = { shown: true };
          break;
        }

        // ── 延时 ──
        case "flow.delay": {
          output = { done: true };
          break;
        }

        // ── 事件节点：透传 ──
        case "event.start":
        case "event.end":
        case "event.trigger": {
          output = ctx.input;
          break;
        }

        default: {
          output = { warning: `未知节点类型: ${node.type}` };
          break;
        }
      }
    } catch (e) {
      status = "error";
      error = e instanceof Error ? e.message : String(e);
      output = null;
    }

    const durationMs = Date.now() - startTime;

    return {
      status,
      input,
      output,
      error,
      durationMs,
    };
  };
}

/**
 * 执行流程（本地模拟模式）
 *
 * 主要步骤：
 * 1. 拓扑排序 — 按依赖关系确定节点执行顺序
 * 2. 构建索引 — nodeMap、outEdges、inEdges
 * 3. 顺序执行 — 按拓扑序逐个执行节点，跳过条件分支的非选中路径
 * 4. 收集结果 — 返回所有节点的执行状态
 *
 * @param flowDef - 流程定义
 * @param options - 执行选项
 * @returns 执行结果
 */
export async function executeFlowLocally(
  flowDef: FlowDefinition,
  options?: ExecuteOptions,
): Promise<FlowExecutionResult> {
  const { nodes, edges } = flowDef;
  const mode = options?.mode ?? "mock";
  const input = options?.input ?? {};

  // 结果容器
  const nodeStates: Record<string, NodeExecutionState> = {};
  const completedOutputs: Record<string, unknown> = {};

  // 构建索引
  const nodeMap = new Map<string, FlowNode>(nodes.map((n) => [n.id, n]));
  const outEdges = new Map<string, FlowEdge[]>(); // source -> edges
  const inEdges = new Map<string, FlowEdge[]>();  // target -> edges

  for (const edge of edges) {
    if (!outEdges.has(edge.source)) outEdges.set(edge.source, []);
    outEdges.get(edge.source)!.push(edge);
    if (!inEdges.has(edge.target)) inEdges.set(edge.target, []);
    inEdges.get(edge.target)!.push(edge);
  }

  // ── 拓扑排序（Kahn 算法） ──
  const inDegree = new Map<string, number>();
  for (const node of nodes) inDegree.set(node.id, 0);
  for (const edge of edges) {
    inDegree.set(edge.target, (inDegree.get(edge.target) ?? 0) + 1);
  }

  const queue: string[] = [];
  for (const [id, deg] of inDegree.entries()) {
    if (deg === 0) queue.push(id);
  }

  const sortedIds: string[] = [];
  while (queue.length > 0) {
    const id = queue.shift()!;
    sortedIds.push(id);
    const out = outEdges.get(id) ?? [];
    for (const edge of out) {
      const newDeg = (inDegree.get(edge.target) ?? 1) - 1;
      inDegree.set(edge.target, newDeg);
      if (newDeg === 0) queue.push(edge.target);
    }
  }

  // 有环时处理剩余节点
  if (sortedIds.length < nodes.length) {
    for (const node of nodes) {
      if (!sortedIds.includes(node.id)) sortedIds.push(node.id);
    }
  }

  // ── 初始 all idle ──
  for (const node of nodes) {
    nodeStates[node.id] = {
      status: "idle",
      input: null,
      output: null,
    };
  }

  // ── 执行上下文 ──
  const ctx: ExecutionContext = {
    nodeOutputs: completedOutputs,
    input,
  };

  // ── 按拓扑序执行 ──
  for (const nodeId of sortedIds) {
    const node = nodeMap.get(nodeId);
    if (!node) continue;

    // 检查节点是否应被跳过（condition.if 的 false 分支后续）
    const prevState = nodeStates[nodeId];
    if (prevState && prevState.status === "skipped") continue;

    // 更新为 running（保留已有的 input/output 字段以保持类型完整）
    const current = nodeStates[nodeId];
    nodeStates[nodeId] = {
      status: "running",
      input: current?.input ?? null,
      output: current?.output ?? null,
    };

    // 创建并执行节点执行器
    const executor = createNodeExecutor(node);
    const result = executor(ctx);

    // 保存结果
    nodeStates[nodeId] = {
      ...result,
      input: result.input,
      output: result.output,
    };

    // 将输出存入上下文
    completedOutputs[nodeId] = result.output;

    // ── 条件分支处理：跳过未选中的路径 ──
    if (node.type === "condition.if" && result.output) {
      const branch = (result.output as Record<string, unknown>)?.branch as string;
      const outEdgeList = outEdges.get(nodeId) ?? [];
      for (const edge of outEdgeList) {
        const isTrueBranch = edge.sourceHandle === "true";
        const isFalseBranch = edge.sourceHandle === "false";
        // 选了 true 分支，false 分支的后续跳过
        if (branch === "true" && isFalseBranch) {
          skipSubtree(edge.target, nodeMap, outEdges, nodeStates);
        }
        // 选了 false 分支，true 分支的后续跳过
        if (branch === "false" && isTrueBranch) {
          skipSubtree(edge.target, nodeMap, outEdges, nodeStates);
        }
      }
    }
  }

  // 计算总耗时
  const totalDurationMs = Object.values(nodeStates).reduce(
    (sum, s) => sum + (s.durationMs ?? 0),
    0,
  );

  const hasErrors = Object.values(nodeStates).some((s) => s.status === "error");

  return {
    nodeStates,
    success: !hasErrors,
    totalDurationMs,
  };
}

/**
 * 递归跳过子树的节点（条件分支的未选中路径）
 *
 * @param nodeId - 起始节点 ID
 * @param nodeMap - 节点映射
 * @param outEdges - 出边映射
 * @param nodeStates - 节点状态映射（会被修改）
 */
function skipSubtree(
  nodeId: string,
  nodeMap: Map<string, FlowNode>,
  outEdges: Map<string, FlowEdge[]>,
  nodeStates: Record<string, NodeExecutionState>,
): void {
  const node = nodeMap.get(nodeId);
  if (!node) return;
  if (nodeStates[nodeId]?.status !== "idle") return; // 已执行或已跳过

  nodeStates[nodeId] = {
    status: "skipped",
    input: null,
    output: { skipped: true, reason: "条件分支未选中此路径" },
    durationMs: 0,
  };

  const out = outEdges.get(nodeId) ?? [];
  for (const edge of out) {
    skipSubtree(edge.target, nodeMap, outEdges, nodeStates);
  }
}
