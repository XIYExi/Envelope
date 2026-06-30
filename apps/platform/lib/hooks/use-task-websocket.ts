/**
 * 通用 WebSocket 任务管理 Hook
 *
 * 提供 WebSocket 连接管理、注册/订阅、ping-pong 保活、断线重连等通用能力。
 * 被 use-export / use-archive-export / use-archive-import 等具体 hook 复用。
 *
 * @author xiye
 * @date 2026-06-25
 */

import { useRef, useCallback, useEffect } from "react";

export interface TaskWebSocketOptions {
  /** 任务 ID，为 null 时不会建立连接 */
  taskId: string | null;
  /** WS 端口 */
  wsPort: number;
  /** WS 路径 */
  wsPath: string;
  /** 本地存储 key，用于持久化 clientId */
  clientIdStorageKey: string;
  /** 收到 snapshot 消息时的回调 */
  onSnapshot: (task: Record<string, unknown>) => void;
  /** 任务完成时的回调 */
  onDone: () => void;
  /** 任务出错时的回调 */
  onError: (message: string) => void;
  /** 是否处于活跃状态（用于判断是否需要重连） */
  active: boolean;
  /** 任务类型标签（用于过滤 snapshot 中的 task kind） */
  taskKind?: string;
}

/**
 * 通用 WebSocket 任务管理 Hook
 *
 * 返回 connect / disconnect 两个方法，
 * 内部处理注册、订阅、ping-pong、断线重连等逻辑。
 */
export function useTaskWebSocket(opts: TaskWebSocketOptions) {
  const {
    taskId, wsPort, wsPath, clientIdStorageKey,
    onSnapshot, onDone, onError, active, taskKind,
  } = opts;

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectRef = useRef(0);
  const pingTimerRef = useRef<number | null>(null);

  const stopPing = useCallback(() => {
    if (pingTimerRef.current != null) {
      window.clearInterval(pingTimerRef.current);
      pingTimerRef.current = null;
    }
  }, []);

  const closeWs = useCallback(() => {
    stopPing();
    if (wsRef.current) {
      try { wsRef.current.close(); } catch { /* 忽略 */ }
      wsRef.current = null;
    }
  }, [stopPing]);

  const connect = useCallback(() => {
    if (!taskId || !active) return;

    closeWs();

    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const host = window.location.hostname;
    const url = `${protocol}://${host}:${wsPort}${wsPath}`;

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      reconnectRef.current = 0;
      const existingClientId = window.localStorage.getItem(clientIdStorageKey);
      ws.send(JSON.stringify({ type: "register", ...(existingClientId ? { clientId: existingClientId } : {}) }));
      ws.send(JSON.stringify({ type: "subscribe", taskId }));
      if (!pingTimerRef.current) {
        pingTimerRef.current = window.setInterval(() => {
          try { ws.send(JSON.stringify({ type: "ping" })); } catch { /* 忽略 */ }
        }, 20_000);
      }
    };

    ws.onmessage = (event) => {
      let msg: unknown;
      try { msg = JSON.parse(String(event.data)); } catch { return; }
      if (!msg || typeof msg !== "object") return;
      const record = msg as Record<string, unknown>;

      // 处理 clientId 注册响应
      if (record.type === "registered" && typeof record.clientId === "string") {
        window.localStorage.setItem(clientIdStorageKey, record.clientId);
        return;
      }
      if (record.type !== "snapshot") return;

      const payload = record.payload as Record<string, unknown> | undefined;
      const task = (payload?.task ?? payload) as Record<string, unknown> | undefined;
      if (!task) return;

      // 可选 task kind 过滤
      if (taskKind && task.kind !== taskKind) return;

      onSnapshot(task);

      if (task.state === "done") {
        onDone();
      }

      if (task.state === "error") {
        const err = task.error;
        const message = typeof err === "string" ? err : "任务失败";
        onError(message);
      }
    };

    ws.onclose = () => {
      if (!taskId || !active) return;
      const attempt = reconnectRef.current + 1;
      reconnectRef.current = attempt;
      const delay = Math.min(2000 * attempt, 10_000);
      setTimeout(() => connect(), delay);
    };

    ws.onerror = () => {
      try { ws.close(); } catch { /* 忽略 */ }
    };
  }, [taskId, active, wsPort, wsPath, clientIdStorageKey, onSnapshot, onDone, onError, taskKind, closeWs]);

  const disconnect = useCallback(() => {
    reconnectRef.current = 0;
    closeWs();
  }, [closeWs]);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return { connect, disconnect };
}
