/**
 * 流程可视化编辑器 — 基于 React Flow 的节点编排界面
 *
 * 构建在 @xyflow/react 之上，提供：
 * - 17 种内置节点的拖放式编排
 * - 节点间类型化端口连接
 * - 选中节点配置面板
 * - YAML 导出/导入
 * - 缩放/平移/小地图
 *
 * 作为独立的编辑器组件，通过 @envelope/flow 包导出，
 * 被 platform app 的 EditorLayout 集成。
 *
 * @author xiye
 * @date 2026-06-14
 */
"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
  type Node,
  type Edge,
  type Connection,
  type NodeProps,
  type NodeRemoveChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import {
  BUILT_IN_NODE_DEFINITIONS,
  NODE_DEFINITION_MAP,
  getNodeDefinitionsByCategory,
  type FlowNodeType,
  type FlowNodeCategory,
  type FlowNode as FlowNodeData,
  type FlowDefinition,
  type FlowPort,
  type FlowEdge as FlowEdgeData,
  type ValidationError,
} from "../thing-model";
import { validateFlow } from "../validation";
import { jsonToYamlFile, yamlToJson } from "../yaml";
import { getAllTemplates, type FlowTemplate } from "../templates/registry";

// ═══════════════════════════════════════════════════════════════════
// 类型定义
// ═══════════════════════════════════════════════════════════════════

/** 流程编辑器本地状态 */
interface FlowEditorState {
  /** 流程标识 */
  thing: string;
  /** 版本号 */
  version: string;
  /** 流程描述 */
  description: string;
}

/** React Flow 节点 position 类型 */
type XYPosition = { x: number; y: number };

// ═══════════════════════════════════════════════════════════════════
// 工具函数
// ═══════════════════════════════════════════════════════════════════

/** 生成唯一 ID（兼容非浏览器环境回退） */
function uid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/** 获取分类的中文名称 */
function getCategoryLabel(category: FlowNodeCategory): string {
  const labels: Record<FlowNodeCategory, string> = {
    trigger: "触发器",
    database: "数据库",
    api: "API 请求",
    condition: "条件分支",
    loop: "循环",
    action: "动作",
    transform: "数据转换",
    custom: "自定义代码",
    flow: "流程控制",
  };
  return labels[category];
}

/** 节点分类在面板中的显示顺序 */
const CATEGORY_ORDER: FlowNodeCategory[] = [
  "trigger", "database", "api", "condition",
  "loop", "action", "transform", "custom", "flow",
];

// ═══════════════════════════════════════════════════════════════════
// 自定义 React Flow 节点组件
// ═══════════════════════════════════════════════════════════════════

/** 端口 Handle 显示项 */
interface PortHandleProps {
  port: FlowPort;
  side: "left" | "right";
  index: number;
  total: number;
}

/**
 * 单个端口 Handle（带标签的输入/输出端口）
 *
 * 使用 React Flow `<Handle>` 组件以确保连接信息被正确记录。
 * 每个 Handle 必须有唯一的 id（对应 FlowPort.id），
 * 这样 edge.sourceHandle 和 edge.targetHandle 才能正确关联。
 */
function PortHandle({ port, side, index, total }: PortHandleProps) {
  const isInput = side === "left";
  const position = isInput ? Position.Left : Position.Right;
  const percent = ((index + 1) / (total + 1)) * 100;

  return (
    <div
      className="absolute flex items-center gap-1 text-[10px] text-muted-foreground"
      style={{
        [side]: -4,
        top: `${percent}%`,
        transform: "translateY(-50%)",
        flexDirection: isInput ? "row" : "row-reverse",
        textAlign: isInput ? "left" : "right",
      }}
    >
      {isInput && <span className="max-w-[60px] truncate">{port.label}</span>}
      <Handle
        id={port.id}
        type={isInput ? "target" : "source"}
        position={position}
        style={{
          position: "relative",
          transform: "none",
          width: 8,
          height: 8,
          border: "1px solid #94a3b8",
          backgroundColor: "#3b82f6",
        }}
      />
      {!isInput && <span className="max-w-[60px] truncate">{port.label}</span>}
    </div>
  );
}

/**
 * 自定义流程节点组件
 *
 * 渲染一个带有彩色头部、节点名称、输入/输出端口的卡片式节点。
 * 头部颜色和图标来自节点类型定义。
 * 选中时边框高亮。
 */
function FlowNodeComponent({ data, selected }: NodeProps) {
  const nodeType = data?.type as FlowNodeType | undefined;
  const label = (data?.label as string) || nodeType || "";
  const def = nodeType ? NODE_DEFINITION_MAP.get(nodeType) : undefined;

  if (!def) {
    return (
      <div className="rounded border border-red-300 bg-red-50 px-3 py-2 text-xs text-red-600">
        未知节点: {nodeType ?? "(无类型)"}
      </div>
    );
  }

  return (
    <div
      className={`min-w-[160px] rounded-lg border-2 bg-card shadow-sm transition-shadow ${
        selected ? "border-primary shadow-md" : "border-transparent"
      }`}
    >
      {/* 彩色头部 */}
      <div
        className="flex items-center gap-1.5 rounded-t-md px-3 py-1.5 text-xs font-medium text-white"
        style={{ backgroundColor: def.color }}
      >
        <span className="text-xs">{def.label}</span>
      </div>

      {/* 端口区域 */}
      <div className="relative px-3 py-2" style={{ minHeight: Math.max(def.inputs.length, def.outputs.length) * 22 + 8 }}>
        {/* 输入端口（左侧） */}
        {def.inputs.map((port, i) => (
          <PortHandle key={`in-${port.id}`} port={port} side="left" index={i} total={def.inputs.length} />
        ))}
        {/* 输出端口（右侧） */}
        {def.outputs.map((port, i) => (
          <PortHandle key={`out-${port.id}`} port={port} side="right" index={i} total={def.outputs.length} />
        ))}
      </div>

      {/* 底部标签 */}
      {label && (
        <div className="border-t px-3 py-1 text-[10px] text-muted-foreground truncate">
          {label}
        </div>
      )}
    </div>
  );
}

/** React Flow 自定义节点类型映射 */
const nodeTypes = {
  flowNode: FlowNodeComponent,
};

// ═══════════════════════════════════════════════════════════════════
// FlowEditor 组件
// ═══════════════════════════════════════════════════════════════════

/**
 * 流程编辑器主组件
 *
 * 三栏布局：节点面板（左）| ReactFlow 画布（中）| 节点配置（右）
 * 初始化时自动创建 event.start 和 event.end 节点。
 */
export interface FlowEditorProps {
  initialFlow?: FlowDefinition;
  onChange?: (flow: FlowDefinition) => void;
}

export function FlowEditor({ initialFlow, onChange }: FlowEditorProps = {}) {
  // 流程元信息
  const [flowMeta, setFlowMeta] = useState<FlowEditorState>({
    thing: "untitled-flow",
    version: "1.0.0",
    description: "",
  });

  /** 初始化两个默认节点（开始 + 结束），仅在首次挂载时计算 */
  const initialNodes = useMemo(() => getInitialNodes(), []);

  // React Flow 节点和边状态
  const [nodes, setNodes, onNodesChangeBase] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const appliedInitialFlowKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (!initialFlow) return;
    const key = `${initialFlow.thing}:${initialFlow.version}:${initialFlow.nodes.length}:${initialFlow.edges.length}`;
    if (appliedInitialFlowKeyRef.current === key) return;

    setFlowMeta({
      thing: initialFlow.thing,
      version: initialFlow.version,
      description: initialFlow.description ?? "",
    });

    const newNodes: Node[] = initialFlow.nodes.map((fn: FlowNodeData) => ({
      id: fn.id,
      type: "flowNode",
      position: { x: fn.position.x, y: fn.position.y },
      data: {
        type: fn.type,
        label: fn.label ?? NODE_DEFINITION_MAP.get(fn.type)?.label ?? fn.type,
        config: fn.config,
      },
    }));

    const newEdges: Edge[] = initialFlow.edges.map((fe: FlowEdgeData) => ({
      id: fe.id,
      source: fe.source,
      sourceHandle: fe.sourceHandle,
      target: fe.target,
      targetHandle: fe.targetHandle,
      type: "smoothstep",
      style: { stroke: "#64748b", strokeWidth: 1.5 },
      markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b", width: 12, height: 12 },
      label: fe.label as string | undefined,
    }));

    setNodes(newNodes);
    setEdges(newEdges);
    setSelectedNodeId(null);
    setRightPanelOpen(false);
    nodeCounter.current = newNodes.length;
    appliedInitialFlowKeyRef.current = key;
  }, [initialFlow, setNodes, setEdges]);

  // 选中的节点 ID
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // 右侧面板展开
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  // 倒数器 — 用于生成新节点 ID
  const nodeCounter = useRef(nodes.length);

  // 包装 onNodesChange 以追踪删除操作
  const onNodesChange = useCallback(
    (changes: Parameters<typeof onNodesChangeBase>[0]) => {
      for (const change of changes) {
        if (change.type === "remove") {
          nodeCounter.current -= 1;
          if (change.id === selectedNodeId) {
            setSelectedNodeId(null);
            setRightPanelOpen(false);
          }
        }
      }
      onNodesChangeBase(changes);
    },
    [onNodesChangeBase, selectedNodeId],
  );

  // 模板选择弹窗状态
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const templates = useMemo(() => getAllTemplates(), []);

  /** 初始化两个默认节点（开始 + 结束） */
  function getInitialNodes(): Node[] {
    return [
      {
        id: uid(),
        type: "flowNode",
        position: { x: 250, y: 150 },
        data: { type: "event.start" as FlowNodeType, label: "开始" },
      },
      {
        id: uid(),
        type: "flowNode",
        position: { x: 250, y: 400 },
        data: { type: "event.end" as FlowNodeType, label: "结束" },
      },
    ];
  }

  // ═══════════════════════════════════════════════════════════════
  // 画布操作
  // ═══════════════════════════════════════════════════════════════

  /**
   * 从类型面板添加节点到画布中心位置
   *
   * @param nodeType - 节点类型
   */
  const addNodeOfType = useCallback(
    (nodeType: FlowNodeType) => {
      const def = NODE_DEFINITION_MAP.get(nodeType);
      if (!def) return;

      const id = uid();
      nodeCounter.current += 1;

      // 计算放置位置（错开避免重叠）
      const x = 300 + (nodeCounter.current % 5) * 180;
      const y = 200 + Math.floor(nodeCounter.current / 5) * 140;

      const newNode: Node = {
        id,
        type: "flowNode",
        position: { x, y },
        data: {
          type: nodeType,
          label: def.label,
          config: {},
        },
      };

      setNodes((nds) => [...nds, newNode]);
      setSelectedNodeId(id);
      setRightPanelOpen(true);
    },
    [setNodes],
  );

  /**
   * 连接处理 — 当用户从一个端口拖线到另一个端口时触发
   *
   * 自动为边生成 ID 并使用默认样式。
   */
  const onConnect = useCallback(
    (connection: Connection) => {
      const newEdge: Edge = {
        ...connection,
        id: uid(),
        type: "smoothstep",
        animated: false,
        style: { stroke: "#64748b", strokeWidth: 1.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b", width: 12, height: 12 },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges],
  );

  /**
   * 节点点击 — 选中节点并打开右侧配置面板
   */
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
    setRightPanelOpen(true);
  }, []);

  /**
   * 画布空白处点击 — 取消选中
   */
  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  // ═══════════════════════════════════════════════════════════════
  // 节点配置面板
  // ═══════════════════════════════════════════════════════════════

  /** 当前选中的节点 */
  const selectedNode = useMemo(
    () => nodes.find((n) => n.id === selectedNodeId) ?? null,
    [nodes, selectedNodeId],
  );

  /** 当前选中节点的类型定义 */
  const selectedNodeDef = useMemo(() => {
    if (!selectedNode) return null;
    const t = selectedNode.data?.type as FlowNodeType | undefined;
    return t ? NODE_DEFINITION_MAP.get(t) ?? null : null;
  }, [selectedNode]);

  /**
   * 更新节点标签
   */
  const updateNodeLabel = useCallback(
    (id: string, label: string) => {
      setNodes((nds) =>
        nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, label } } : n)),
      );
    },
    [setNodes],
  );

  /**
   * 删除节点（以及关联的边）
   */
  const deleteNode = useCallback(
    (id: string) => {
      setNodes((nds) => nds.filter((n) => n.id !== id));
      setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
      nodeCounter.current -= 1;
      setSelectedNodeId((prev) => (prev === id ? null : prev));
      if (selectedNodeId === id) {
        setRightPanelOpen(false);
      }
    },
    [setNodes, setEdges, selectedNodeId],
  );

  // ═══════════════════════════════════════════════════════════════
  // 流程级操作
  // ═══════════════════════════════════════════════════════════════

  const buildFlowDefinition = useCallback((): FlowDefinition => {
    const flowNodes: FlowNodeData[] = nodes.map((n) => {
      const nodeType = n.data?.type as FlowNodeType | undefined;
      if (!nodeType) {
        throw new Error(`节点 ${n.id} 缺少 type 字段，无法导出。请删除该节点后重试。`);
      }
      return {
        id: n.id,
        type: nodeType,
        position: { x: n.position.x, y: n.position.y },
        label: n.data?.label as string | undefined,
        config: (n.data?.config as Record<string, unknown>) ?? {},
      };
    });

    const flowEdges = edges.map((e) => {
      const sourceNodeDef = NODE_DEFINITION_MAP.get(
        nodes.find((n) => n.id === e.source)?.data?.type as FlowNodeType,
      );
      const targetNodeDef = NODE_DEFINITION_MAP.get(
        nodes.find((n) => n.id === e.target)?.data?.type as FlowNodeType,
      );
      return {
        id: e.id,
        source: e.source,
        sourceHandle: e.sourceHandle ?? sourceNodeDef?.outputs[0]?.id ?? "out",
        target: e.target,
        targetHandle: e.targetHandle ?? targetNodeDef?.inputs[0]?.id ?? "in",
        label: e.label as string | undefined,
      };
    });

    return {
      thing: flowMeta.thing,
      version: flowMeta.version,
      description: flowMeta.description || undefined,
      nodes: flowNodes,
      edges: flowEdges,
    };
  }, [nodes, edges, flowMeta]);

  useEffect(() => {
    if (!onChange) return;
    try {
      onChange(buildFlowDefinition());
    } catch {
    }
  }, [buildFlowDefinition, onChange]);

  /**
   * 将当前画布状态转换为 FlowDefinition 并导出 YAML
   */
  const exportYaml = useCallback(() => {
    const flowDef = buildFlowDefinition();

    const result = validateFlow(flowDef);
    if (!result.valid) {
      const errorMessages = result.errors
        .filter((e: ValidationError) => e.level === "error")
        .map((e: ValidationError) => e.message)
        .join("\n");
      if (errorMessages) {
        alert(`流程验证失败:\n${errorMessages}`);
        return;
      }
    }

    const yaml = jsonToYamlFile(flowDef);
    const blob = new Blob([yaml], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${flowMeta.thing}.flow.yaml`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }, [buildFlowDefinition, flowMeta.thing]);

  /**
   * 从 YAML 文件导入流程
   */
  const importYaml = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".yaml,.yml";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) { input.remove(); return; }
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        const result = yamlToJson(text);
        if (!result.success || !result.data || typeof result.data === "string") {
          alert(`YAML 导入失败: ${result.error}`);
          input.remove();
          return;
        }
        const flowDef = result.data;

        // 更新流程元信息
        setFlowMeta({
          thing: flowDef.thing,
          version: flowDef.version,
          description: flowDef.description ?? "",
        });

        // 转换节点
        const newNodes: Node[] = flowDef.nodes.map((fn: FlowNodeData) => ({
          id: fn.id,
          type: "flowNode",
          position: { x: fn.position.x, y: fn.position.y },
          data: {
            type: fn.type,
            label: fn.label ?? NODE_DEFINITION_MAP.get(fn.type)?.label ?? fn.type,
            config: fn.config,
          },
        }));

        // 转换边
        const newEdges: Edge[] = flowDef.edges.map((fe: FlowEdgeData) => ({
          id: fe.id,
          source: fe.source,
          sourceHandle: fe.sourceHandle,
          target: fe.target,
          targetHandle: fe.targetHandle,
          type: "smoothstep",
          style: { stroke: "#64748b", strokeWidth: 1.5 },
          markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b", width: 12, height: 12 },
        }));

        setNodes(newNodes);
        setEdges(newEdges);
        setSelectedNodeId(null);
        setRightPanelOpen(false);
        nodeCounter.current = newNodes.length;
        input.remove();
      };
      reader.readAsText(file);
    };
    // 挂载到 DOM 以确保功能正常，完成后自动清理
    input.style.display = "none";
    document.body.appendChild(input);
    input.click();
  }, [setNodes, setEdges]);

  /** 清空画布并重置为初始状态 */
  const clearCanvas = useCallback(() => {
    if (!confirm("清空画布将删除所有节点和连线，是否继续？")) return;
    const initial = getInitialNodes();
    setNodes(initial);
    setEdges([]);
    setSelectedNodeId(null);
    setRightPanelOpen(false);
    nodeCounter.current = initial.length;
    setFlowMeta({ thing: "untitled-flow", version: "1.0.0", description: "" });
  }, [setNodes, setEdges]);

  /**
   * 加载模板到画布 — 替换当前所有节点和连线
   *
   * @param template - 要加载的流程模板
   */
  const loadTemplate = useCallback(
    (template: FlowTemplate) => {
      if (!confirm(`加载模板"${template.name}"将替换当前画布内容，是否继续？`)) return;

      const flowDef = template.definition;

      // 更新流程元信息
      setFlowMeta({
        thing: flowDef.thing,
        version: flowDef.version,
        description: flowDef.description ?? "",
      });

      // 转换节点
      const newNodes: Node[] = flowDef.nodes.map((fn: FlowNodeData) => ({
        id: fn.id,
        type: "flowNode",
        position: { x: fn.position.x, y: fn.position.y },
        data: {
          type: fn.type,
          label: fn.label ?? NODE_DEFINITION_MAP.get(fn.type)?.label ?? fn.type,
          config: fn.config,
        },
      }));

      // 转换边
      const newEdges: Edge[] = flowDef.edges.map((fe: FlowEdgeData) => ({
        id: fe.id,
        source: fe.source,
        sourceHandle: fe.sourceHandle,
        target: fe.target,
        targetHandle: fe.targetHandle,
        type: "smoothstep",
        style: { stroke: "#64748b", strokeWidth: 1.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b", width: 12, height: 12 },
        label: fe.label as string | undefined,
      }));

      setNodes(newNodes);
      setEdges(newEdges);
      setSelectedNodeId(null);
      setRightPanelOpen(false);
      nodeCounter.current = newNodes.length;
      setTemplateModalOpen(false);
    },
    [setNodes, setEdges],
  );

  /** MiniMap 节点颜色回调（memoized） */
  const getNodeColor = useCallback((node: Node) => {
    const t = node.data?.type as FlowNodeType | undefined;
    return t ? NODE_DEFINITION_MAP.get(t)?.color ?? "#94a3b8" : "#94a3b8";
  }, []);

  /** 展开/折叠的分类 */
  const [expandedCategories, setExpandedCategories] = useState<Set<FlowNodeCategory>>(
    () => new Set(CATEGORY_ORDER.slice(0, 4)),
  );

  /**
   * 切换分类折叠状态
   */
  const toggleCategory = useCallback((cat: FlowNodeCategory) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  }, []);

  // ═══════════════════════════════════════════════════════════════
  // 渲染
  // ═══════════════════════════════════════════════════════════════

  return (
    <div className="flex h-full">
      {/* 左侧：节点面板 */}
      <div className="flex w-52 shrink-0 flex-col border-r bg-muted/30">
        {/* 面板标题 */}
        <div className="border-b px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
          节点面板
        </div>

        {/* 流程元信息编辑区 */}
        <div className="space-y-1.5 border-b px-3 py-2">
          <input
            className="w-full rounded border bg-background px-2 py-1 text-xs"
            placeholder="流程标识 (thing id)"
            value={flowMeta.thing}
            onChange={(e) => setFlowMeta((m) => ({ ...m, thing: e.target.value }))}
          />
          <textarea
            className="w-full rounded border bg-background px-2 py-1 text-xs resize-none"
            placeholder="流程描述（可选）"
            rows={2}
            value={flowMeta.description}
            onChange={(e) => setFlowMeta((m) => ({ ...m, description: e.target.value }))}
          />
        </div>

        {/* 节点分类列表 */}
        <div className="flex-1 overflow-y-auto">
          {CATEGORY_ORDER.map((cat) => {
            const defs = getNodeDefinitionsByCategory(cat);
            if (defs.length === 0) return null;
            const isExpanded = expandedCategories.has(cat);

            return (
              <div key={cat}>
                {/* 分类头部 */}
                <button
                  className="flex w-full items-center justify-between px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted/50"
                  onClick={() => toggleCategory(cat)}
                >
                  <span>{getCategoryLabel(cat)}</span>
                  <span className="text-[10px]">
                    {isExpanded ? "▾" : "▸"} {defs.length}
                  </span>
                </button>

                {/* 分类下的节点列表 */}
                {isExpanded && (
                  <div className="space-y-0.5 px-2 pb-1">
                    {defs.map((def) => (
                      <button
                        key={def.type}
                        className="flex w-full items-center gap-1.5 rounded px-2 py-1 text-left text-xs hover:bg-muted"
                        onClick={() => addNodeOfType(def.type)}
                      >
                        <span
                          className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: def.color }}
                        />
                        <span className="truncate">{def.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 操作按钮区 */}
        <div className="border-t p-2 space-y-1">
          <button
            className="w-full rounded border bg-background px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50"
            onClick={() => setTemplateModalOpen(true)}
          >
            模板库
          </button>
          <button
            className="w-full rounded bg-primary px-2 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90"
            onClick={exportYaml}
          >
            导出 YAML
          </button>
          <button
            className="w-full rounded border bg-background px-2 py-1 text-xs hover:bg-muted"
            onClick={importYaml}
          >
            导入 YAML
          </button>
          <button
            className="w-full rounded border bg-background px-2 py-1 text-xs text-red-500 hover:bg-red-50"
            onClick={clearCanvas}
          >
            清空画布
          </button>
        </div>
      </div>

      {/* 中间：React Flow 画布 */}
      <div className="flex flex-1 flex-col">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView
          deleteKeyCode={["Delete", "Backspace"]}
          multiSelectionKeyCode="Shift"
        >
          <Background gap={16} color="#e2e8f0" />
          <Controls position="bottom-right" />
          <MiniMap
            position="bottom-left"
            nodeColor={getNodeColor}
            style={{ height: 120 }}
          />
        </ReactFlow>
      </div>

      {/* 右侧：节点配置面板 */}
      {rightPanelOpen && selectedNode && (
        <div className="flex w-60 shrink-0 flex-col border-l bg-muted/30">
          <div className="flex items-center justify-between border-b px-3 py-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase">
              节点配置
            </span>
            <button
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setRightPanelOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {/* 节点类型信息 */}
            <div>
              <label className="mb-0.5 block text-[10px] font-medium text-muted-foreground uppercase">
                节点类型
              </label>
              <div className="flex items-center gap-1.5 text-xs">
                {selectedNodeDef && (
                  <span
                    className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: selectedNodeDef.color }}
                  />
                )}
                <span>{selectedNodeDef?.label ?? "未知"}</span>
              </div>
            </div>

            {/* 节点 ID */}
            <div>
              <label className="mb-0.5 block text-[10px] font-medium text-muted-foreground uppercase">
                节点 ID
              </label>
              <code className="block select-all text-[10px] text-muted-foreground">
                {selectedNode.id.slice(0, 8)}
              </code>
            </div>

            {/* 节点标签 */}
            <div>
              <label className="mb-0.5 block text-[10px] font-medium text-muted-foreground uppercase">
                节点名称
              </label>
              <input
                className="w-full rounded border bg-background px-2 py-1 text-xs"
                value={(selectedNode.data?.label as string) ?? ""}
                onChange={(e) => updateNodeLabel(selectedNode.id, e.target.value)}
              />
            </div>

            {/* 输入端口列表（只读展示） */}
            {selectedNodeDef && selectedNodeDef.inputs.length > 0 && (
              <div>
                <label className="mb-0.5 block text-[10px] font-medium text-muted-foreground uppercase">
                  输入端口 ({selectedNodeDef.inputs.length})
                </label>
                <div className="space-y-0.5">
                  {selectedNodeDef.inputs.map((p) => (
                    <div key={p.id} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <span className="text-primary">●</span>
                      <span>{p.label}</span>
                      <span className="text-[9px] opacity-50">({p.type})</span>
                      {p.required && (
                        <span className="text-[9px] text-red-400">*</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 输出端口列表（只读展示） */}
            {selectedNodeDef && selectedNodeDef.outputs.length > 0 && (
              <div>
                <label className="mb-0.5 block text-[10px] font-medium text-muted-foreground uppercase">
                  输出端口 ({selectedNodeDef.outputs.length})
                </label>
                <div className="space-y-0.5">
                  {selectedNodeDef.outputs.map((p) => (
                    <div key={p.id} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <span className="text-green-500">●</span>
                      <span>{p.label}</span>
                      <span className="text-[9px] opacity-50">({p.type})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 节点描述 */}
            {selectedNodeDef?.description && (
              <div>
                <label className="mb-0.5 block text-[10px] font-medium text-muted-foreground uppercase">
                  说明
                </label>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  {selectedNodeDef.description}
                </p>
              </div>
            )}

            {/* 删除按钮 */}
            <div className="pt-2 border-t">
              <button
                className="w-full rounded border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-600 hover:bg-red-100"
                onClick={() => deleteNode(selectedNode.id)}
              >
                删除节点
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 模板选择弹窗 */}
      {templateModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setTemplateModalOpen(false)}
        >
          <div
            className="max-h-[80vh] w-[420px] overflow-y-auto rounded-lg border bg-card shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 弹窗头部 */}
            <div className="flex items-center justify-between border-b px-4 py-3">
              <span className="text-sm font-semibold">流程模板库</span>
              <button
                className="text-xs text-muted-foreground hover:text-foreground"
                onClick={() => setTemplateModalOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* 模板卡片列表 */}
            <div className="p-3 space-y-2">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  className="w-full rounded border p-3 text-left text-xs hover:border-primary hover:bg-muted/50 transition-colors"
                  onClick={() => loadTemplate(tpl)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {tpl.thumbnail && (
                      <span className="text-base">{tpl.thumbnail}</span>
                    )}
                    <span className="font-medium text-sm">{tpl.name}</span>
                    <span className="ml-auto rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      {tpl.definition.nodes.length} 节点
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {tpl.description}
                  </p>
                </button>
              ))}
            </div>

            {/* 底部提示 */}
            <div className="border-t px-4 py-2 text-[10px] text-muted-foreground">
              点击模板将替换当前画布内容，请确认后再操作
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
