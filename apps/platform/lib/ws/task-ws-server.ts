import { WebSocketServer, type RawData, type WebSocket } from "ws";
import { randomUUID } from "crypto";

/**
 * Task WebSocket Server（ISC-20 配套能力）
 *
 * 目标：
 * - 后台任务（导出/导入）进度可实时推送到前端
 * - 支持“断线 → 重连 → 立即恢复最新进度”（依赖快照缓存）
 * - 支持“连接注册”（服务端分配 clientId；客户端可带 clientId 复用）
 * - 支持“心跳保活”（底层 ping/pong + 应用层 ping/pong）
 *
 * 协议（客户端 → 服务端）：
 * - { type: "register", clientId?: string }
 * - { type: "subscribe", taskId: string }
 * - { type: "unsubscribe", taskId: string }
 * - { type: "ping" }
 *
 * 协议（服务端 → 客户端）：
 * - { type: "registered", clientId: string }
 * - { type: "snapshot", taskId: string, payload: any }  // payload 由任务侧定义，通常 { task: {...} }
 * - { type: "not_found", taskId: string }
 * - { type: "pong", ts: number }
 */

export type TaskWsEnvelope =
  | { type: "registered"; clientId: string }
  | { type: "snapshot"; taskId: string; payload: unknown }
  | { type: "pong"; ts: number }
  | { type: "not_found"; taskId: string };

type ClientMessage =
  | { type: "register"; clientId?: string }
  | { type: "subscribe"; taskId: string }
  | { type: "unsubscribe"; taskId: string }
  | { type: "ping" };

type ConnectionMeta = {
  clientId: string;
  isAlive: boolean;
  subscriptions: Set<string>;
};

type TaskWsServer = {
  wsPort: number;
  wsPath: string;
  wss: WebSocketServer;
  connections: WeakMap<WebSocket, ConnectionMeta>;
  taskSubs: Map<string, Set<WebSocket>>;
  lastSnapshots: Map<string, { payload: unknown; updatedAt: number }>;
  pingInterval: NodeJS.Timeout;
};

declare global {
  var __envelopeTaskWsServer: TaskWsServer | undefined;
}

function parseClientMessage(raw: unknown): ClientMessage | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const type = r.type;
  if (type === "register") {
    const clientId = r.clientId;
    return { type, ...(typeof clientId === "string" ? { clientId } : {}) };
  }
  if (type === "subscribe" || type === "unsubscribe") {
    const taskId = r.taskId;
    if (typeof taskId !== "string" || !taskId) return null;
    return { type, taskId };
  }
  if (type === "ping") return { type };
  return null;
}

function getWsConfig(): { wsPort: number; wsPath: string } {
  const wsPortRaw = process.env.EXPORT_WS_PORT;
  const wsPort = wsPortRaw && /^\d+$/.test(wsPortRaw) ? Number(wsPortRaw) : 3001;
  const wsPath = process.env.EXPORT_WS_PATH && process.env.EXPORT_WS_PATH.startsWith("/")
    ? process.env.EXPORT_WS_PATH
    : "/export";
  return { wsPort, wsPath };
}

function ensureMeta(server: TaskWsServer, ws: WebSocket): ConnectionMeta {
  const existing = server.connections.get(ws);
  if (existing) return existing;
  const meta: ConnectionMeta = {
    clientId: randomUUID(),
    isAlive: true,
    subscriptions: new Set(),
  };
  server.connections.set(ws, meta);
  return meta;
}

function cleanupConnection(server: TaskWsServer, ws: WebSocket) {
  const meta = server.connections.get(ws);
  if (!meta) return;
  for (const taskId of meta.subscriptions) {
    const set = server.taskSubs.get(taskId);
    if (set) {
      set.delete(ws);
      if (set.size === 0) server.taskSubs.delete(taskId);
    }
  }
  meta.subscriptions.clear();
}

export function ensureTaskWSServer(): { wsPort: number; wsPath: string } {
  const existing = globalThis.__envelopeTaskWsServer;
  if (existing) return { wsPort: existing.wsPort, wsPath: existing.wsPath };

  const { wsPort, wsPath } = getWsConfig();
  const wss = new WebSocketServer({ port: wsPort, path: wsPath });

  const server: TaskWsServer = {
    wsPort,
    wsPath,
    wss,
    connections: new WeakMap(),
    taskSubs: new Map(),
    lastSnapshots: new Map(),
    pingInterval: setInterval(() => {
      for (const client of wss.clients) {
        const meta = server.connections.get(client);
        if (!meta) continue;
        if (!meta.isAlive) {
          try {
            client.terminate();
          } catch {
          }
          continue;
        }
        meta.isAlive = false;
        try {
          client.ping();
        } catch {
          try {
            client.terminate();
          } catch {
          }
        }
      }
    }, 25_000),
  };

  try {
    const address = wss.address();
    if (address && typeof address === "object" && "port" in address && typeof (address as { port?: unknown }).port === "number") {
      server.wsPort = (address as { port: number }).port;
    }
  } catch {
  }

  wss.on("connection", (ws: WebSocket) => {
    const meta = ensureMeta(server, ws);
    ws.send(JSON.stringify({ type: "registered", clientId: meta.clientId } satisfies TaskWsEnvelope));
    ws.on("pong", () => {
      meta.isAlive = true;
    });

    ws.on("message", (raw: RawData) => {
      let parsed: unknown;
      try {
        parsed = JSON.parse(String(raw));
      } catch {
        return;
      }
      const msg = parseClientMessage(parsed);
      if (!msg) return;

      if (msg.type === "register") {
        const nextClientId = msg.clientId && msg.clientId.length > 0 ? msg.clientId : randomUUID();
        meta.clientId = nextClientId;
        const payload: TaskWsEnvelope = { type: "registered", clientId: nextClientId };
        ws.send(JSON.stringify(payload));
        return;
      }

      if (msg.type === "ping") {
        const payload: TaskWsEnvelope = { type: "pong", ts: Date.now() };
        ws.send(JSON.stringify(payload));
        return;
      }

      if (msg.type === "subscribe") {
        const set = server.taskSubs.get(msg.taskId) ?? new Set<WebSocket>();
        set.add(ws);
        server.taskSubs.set(msg.taskId, set);
        meta.subscriptions.add(msg.taskId);
        const cached = server.lastSnapshots.get(msg.taskId);
        if (cached) {
          const envelope: TaskWsEnvelope = { type: "snapshot", taskId: msg.taskId, payload: cached.payload };
          ws.send(JSON.stringify(envelope));
        } else {
          ws.send(JSON.stringify({ type: "not_found", taskId: msg.taskId } satisfies TaskWsEnvelope));
        }
        return;
      }

      if (msg.type === "unsubscribe") {
        const set = server.taskSubs.get(msg.taskId);
        if (set) {
          set.delete(ws);
          if (set.size === 0) server.taskSubs.delete(msg.taskId);
        }
        meta.subscriptions.delete(msg.taskId);
      }
    });

    ws.on("close", () => cleanupConnection(server, ws));
    ws.on("error", () => cleanupConnection(server, ws));
  });

  globalThis.__envelopeTaskWsServer = server;
  return { wsPort, wsPath };
}

export function publishTaskSnapshot(taskId: string, payload: unknown) {
  const server = globalThis.__envelopeTaskWsServer;
  if (!server) return;
  server.lastSnapshots.set(taskId, { payload, updatedAt: Date.now() });
  const subs = server.taskSubs.get(taskId);

  const envelope: TaskWsEnvelope = { type: "snapshot", taskId, payload };
  const text = JSON.stringify(envelope);
  if (subs && subs.size > 0) {
    for (const ws of subs) {
      try {
        ws.send(text);
      } catch {
      }
    }
  }
}

export async function stopTaskWSServerForTests(): Promise<void> {
  const server = globalThis.__envelopeTaskWsServer;
  if (!server) return;
  clearInterval(server.pingInterval);
  await new Promise<void>((resolve) => {
    try {
      server.wss.close(() => resolve());
    } catch {
      resolve();
    }
  });
  globalThis.__envelopeTaskWsServer = undefined;
}
