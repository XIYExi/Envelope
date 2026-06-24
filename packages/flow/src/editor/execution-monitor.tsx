/**
 * 执行监视面板 — 观察者模式展示试运行结果
 *
 * 展示每节点的执行状态、输入和输出值。
 * 支持折叠展开，运行结果保留到下次试运行。
 *
 * 设计模式：
 * - 观察者模式：订阅 FlowExecutionResult 的变化，实时更新 UI
 * - 策略模式：根据执行状态显示不同的颜色和图标
 *
 * @author xiye
 * @date 2026-06-25
 */

import { useState } from "react";
import type { Node } from "@xyflow/react";
import type { FlowExecutionResult, NodeExecutionState } from "../thing-model/types";
import { NODE_DEFINITION_MAP } from "../thing-model/node-definitions";

/** 执行监视面板属性 */
export interface ExecutionMonitorProps {
  /** 试运行结果 */
  executionResult: FlowExecutionResult;
  /** 当前画布上的所有节点 */
  nodes: Node[];
}

/** 状态图标映射 — 策略模式：每种状态对应一种视觉符号 */
function getStatusIcon(status: NodeExecutionState["status"]): string {
  switch (status) {
    case "done": return "✓";
    case "running": return "⟳";
    case "error": return "✗";
    case "skipped": return "—";
    case "idle": return "○";
    default: return "?";
  }
}

/** 状态颜色映射 */
function getStatusColor(status: NodeExecutionState["status"]): string {
  switch (status) {
    case "done": return "#22c55e";
    case "running": return "#3b82f6";
    case "error": return "#ef4444";
    case "skipped": return "#94a3b8";
    case "idle": return "#d1d5db";
    default: return "#d1d5db";
  }
}

/** 状态中文标签 */
function getStatusLabel(status: NodeExecutionState["status"]): string {
  switch (status) {
    case "done": return "完成";
    case "running": return "运行中";
    case "error": return "错误";
    case "skipped": return "已跳过";
    case "idle": return "待执行";
    default: return "未知";
  }
}

/**
 * JSON 值的简要展示
 *
 * 长字符串截断，对象/数组格式化。
 */
function formatValue(value: unknown, maxLength = 80): string {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (typeof value === "string") {
    return value.length > maxLength ? value.slice(0, maxLength) + "..." : value;
  }
  if (typeof value === "object") {
    try {
      const str = JSON.stringify(value, null, 1);
      return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
    } catch {
      return String(value);
    }
  }
  return String(value);
}

/**
 * 单个节点的执行状态条目
 */
function NodeExecutionEntry({
  nodeId,
  state,
  nodeLabel,
}: {
  nodeId: string;
  state: NodeExecutionState;
  nodeLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border rounded bg-background text-xs">
      {/* 头部：节点名 + 状态 */}
      <button
        className="flex w-full items-center gap-1.5 px-2 py-1.5 hover:bg-muted/50 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <span
          className="inline-block h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: getStatusColor(state.status) }}
        />
        <span
          className="font-medium truncate flex-1"
          style={{ color: getStatusColor(state.status) }}
        >
          {nodeLabel}
        </span>
        <span className="text-[9px] text-muted-foreground">
          {getStatusLabel(state.status)}
        </span>
        <span className="text-muted-foreground">{expanded ? "▾" : "▸"}</span>
      </button>

      {/* 展开详情 */}
      {expanded && (
        <div className="border-t px-2 py-1.5 space-y-1">
          {/* 耗时 */}
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <span className="font-medium">耗时:</span>
            <span>{state.durationMs ?? 0}ms</span>
          </div>

          {/* 错误信息 */}
          {state.error && (
            <div className="text-[10px] text-red-500 bg-red-50 rounded px-1 py-0.5">
              {state.error}
            </div>
          )}

          {/* 输入 */}
          {state.input !== null && state.input !== undefined && (
            <div>
              <div className="text-[9px] font-medium text-muted-foreground uppercase mb-0.5">
                输入
              </div>
              <pre className="text-[9px] font-mono bg-muted rounded px-1 py-0.5 overflow-x-auto whitespace-pre-wrap max-h-[80px] overflow-y-auto">
                {formatValue(state.input, 200)}
              </pre>
            </div>
          )}

          {/* 输出 */}
          {state.output !== null && state.output !== undefined && (
            <div>
              <div className="text-[9px] font-medium text-muted-foreground uppercase mb-0.5">
                输出
              </div>
              <pre className="text-[9px] font-mono bg-muted rounded px-1 py-0.5 overflow-x-auto whitespace-pre-wrap max-h-[120px] overflow-y-auto">
                {formatValue(state.output, 400)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * 执行监视面板组件
 *
 * 接收 FlowExecutionResult，展示所有节点的执行状态快照。
 * 每个节点可折叠展开查看输入/输出详情。
 */
export function ExecutionMonitor({ executionResult, nodes }: ExecutionMonitorProps) {
  const { nodeStates, success, totalDurationMs } = executionResult;

  // 计算各状态的数量
  const stateCounts = {
    done: 0,
    running: 0,
    error: 0,
    skipped: 0,
    idle: 0,
  };
  for (const state of Object.values(nodeStates)) {
    stateCounts[state.status]++;
  }

  // 按执行顺序排序（先 done 再 skipped 再 idle）
  const statusOrder: Record<string, number> = { done: 0, running: 1, error: 2, skipped: 3, idle: 4 };
  const sortedEntries = Object.entries(nodeStates).sort(
    ([aId, aState], [bId, bState]) => (statusOrder[aState.status] ?? 99) - (statusOrder[bState.status] ?? 99),
  );

  return (
    <div className="space-y-2">
      {/* 概要统计 */}
      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: success ? "#22c55e" : "#ef4444" }}
          />
          <span>{success ? "执行成功" : "执行失败"}</span>
        </div>
        <span>总耗时: {totalDurationMs}ms</span>
      </div>

      {/* 状态计数条 */}
      <div className="flex gap-2 text-[9px] text-muted-foreground">
        {stateCounts.done > 0 && <span className="text-green-500">✓{stateCounts.done}</span>}
        {stateCounts.error > 0 && <span className="text-red-500">✗{stateCounts.error}</span>}
        {stateCounts.skipped > 0 && <span className="text-slate-400">—{stateCounts.skipped}</span>}
        {stateCounts.idle > 0 && <span className="text-gray-300">○{stateCounts.idle}</span>}
      </div>

      {/* 节点执行列表 */}
      <div className="space-y-1 max-h-[400px] overflow-y-auto">
        {sortedEntries.map(([nodeId, state]) => {
          const node = nodes.find((n) => n.id === nodeId);
          const nodeType = node?.data?.type as string | undefined;
          const def = nodeType ? NODE_DEFINITION_MAP.get(nodeType as any) : undefined;
          const label = (node?.data?.label as string) || def?.label || nodeId.slice(0, 8);
          return (
            <NodeExecutionEntry
              key={nodeId}
              nodeId={nodeId}
              state={state}
              nodeLabel={label}
            />
          );
        })}
      </div>
    </div>
  );
}
