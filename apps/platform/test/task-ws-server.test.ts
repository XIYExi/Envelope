import { afterEach, describe, expect, it } from "vitest";
import WebSocket from "ws";
import { ensureTaskWSServer, publishTaskSnapshot, stopTaskWSServerForTests } from "@/lib/ws/task-ws-server";

afterEach(async () => {
  await stopTaskWSServerForTests();
});

describe("task ws server", () => {
  it("subscribe receives cached snapshot", async () => {
    process.env.EXPORT_WS_PORT = "0";
    process.env.EXPORT_WS_PATH = "/export-test";

    const { wsPort, wsPath } = ensureTaskWSServer();
    const url = `ws://127.0.0.1:${wsPort}${wsPath}`;

    publishTaskSnapshot("t1", { task: { kind: "x", state: "running", percent: 1 } });

    const ws = new WebSocket(url);
    const messages: any[] = [];

    const opened = new Promise<void>((resolve, reject) => {
      ws.on("open", () => resolve());
      ws.on("error", (e) => reject(e));
    });

    const gotSnapshot = new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("timeout")), 2000);
      ws.on("message", (raw) => {
        const msg = JSON.parse(String(raw));
        messages.push(msg);
        if (msg.type === "snapshot" && msg.taskId === "t1") {
          clearTimeout(timer);
          resolve();
        }
      });
    });

    await opened;
    ws.send(JSON.stringify({ type: "subscribe", taskId: "t1" }));
    await gotSnapshot;

    const snapshot = messages.find((m) => m.type === "snapshot" && m.taskId === "t1");
    expect(snapshot.payload.task.state).toBe("running");

    ws.close();
  });
});

