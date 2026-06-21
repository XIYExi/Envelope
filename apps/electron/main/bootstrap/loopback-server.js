const http = require("http");
const net = require("net");
const { spawn } = require("child_process");

const LOOPBACK_HOST = "127.0.0.1";
const SERVER_READY_TIMEOUT_MS = 20000;
const SERVER_STOP_TIMEOUT_MS = 5000;
const SERVER_RETRY_INTERVAL_MS = 250;
const MAX_LOG_LINES = 80;

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function appendLogChunk(lines, chunk) {
  const text = String(chunk || "").trim();
  if (!text) {
    return;
  }

  for (const line of text.split(/\r?\n/)) {
    if (!line) {
      continue;
    }
    lines.push(line);
  }

  if (lines.length > MAX_LOG_LINES) {
    lines.splice(0, lines.length - MAX_LOG_LINES);
  }
}

function requestServer(origin) {
  return new Promise((resolve, reject) => {
    const request = http.get(
      `${origin}/`,
      {
        timeout: 1500,
      },
      (response) => {
        response.resume();
        resolve(response.statusCode ?? 200);
      }
    );

    request.on("timeout", () => {
      request.destroy(new Error("连接超时"));
    });

    request.on("error", reject);
  });
}

function reserveLoopbackPort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, LOOPBACK_HOST, () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        server.close();
        reject(new Error("无法为本地 loopback server 分配端口"));
        return;
      }

      server.close((closeError) => {
        if (closeError) {
          reject(closeError);
          return;
        }
        resolve(address.port);
      });
    });
  });
}

async function waitForServerReady(origin, childProcess, logs) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < SERVER_READY_TIMEOUT_MS) {
    if (childProcess.exitCode !== null) {
      throw new Error(
        `Next traced runtime 服务在完成启动前退出（code=${childProcess.exitCode ?? "null"}）\n${logs.join("\n")}`
      );
    }

    try {
      await requestServer(origin);
      return;
    } catch {
      await delay(SERVER_RETRY_INTERVAL_MS);
    }
  }

  throw new Error(`等待 Next traced runtime 服务就绪超时：${origin}\n${logs.join("\n")}`);
}

async function stopChildProcess(childProcess) {
  if (!childProcess || childProcess.exitCode !== null) {
    return;
  }

  await new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve();
    }, SERVER_STOP_TIMEOUT_MS);

    childProcess.once("exit", () => {
      clearTimeout(timeout);
      resolve();
    });

    childProcess.kill();
  });
}

function createLoopbackServerManager() {
  let activeServer = null;
  let pendingStart = null;

  return {
    async ensureStarted({ serverEntryPath, cwd }) {
      if (activeServer && activeServer.childProcess.exitCode === null) {
        return {
          origin: activeServer.origin,
          port: activeServer.port,
        };
      }

      if (pendingStart) {
        return pendingStart;
      }

      pendingStart = (async () => {
        const port = await reserveLoopbackPort();
        const origin = `http://${LOOPBACK_HOST}:${port}`;
        const logs = [];
        const childProcess = spawn(process.execPath, [serverEntryPath], {
          cwd,
          env: {
            ...process.env,
            ELECTRON_RUN_AS_NODE: "1",
            HOSTNAME: LOOPBACK_HOST,
            PORT: String(port),
            NODE_ENV: "production",
          },
          stdio: ["ignore", "pipe", "pipe"],
          windowsHide: true,
        });

        childProcess.stdout.on("data", (chunk) => {
          appendLogChunk(logs, chunk);
        });
        childProcess.stderr.on("data", (chunk) => {
          appendLogChunk(logs, chunk);
        });

        try {
          await waitForServerReady(origin, childProcess, logs);
        } catch (error) {
          await stopChildProcess(childProcess);
          throw error;
        }

        childProcess.once("exit", () => {
          if (activeServer && activeServer.childProcess === childProcess) {
            activeServer = null;
          }
        });

        activeServer = {
          childProcess,
          origin,
          port,
        };

        return {
          origin,
          port,
        };
      })();

      try {
        return await pendingStart;
      } finally {
        pendingStart = null;
      }
    },

    async stop() {
      const runningServer = activeServer;
      activeServer = null;
      if (pendingStart) {
        try {
          await pendingStart;
        } catch {
          return;
        }
      }
      await stopChildProcess(runningServer?.childProcess);
    },
  };
}

module.exports = {
  LOOPBACK_HOST,
  createLoopbackServerManager,
};
