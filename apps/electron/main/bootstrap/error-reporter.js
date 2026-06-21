const { dialog } = require("electron");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatError(error) {
  if (!error) {
    return "未知错误";
  }

  if (error instanceof Error) {
    return [error.message, error.stack].filter(Boolean).join("\n\n");
  }

  if (typeof error === "string") {
    return error;
  }

  try {
    return JSON.stringify(error, null, 2);
  } catch {
    return String(error);
  }
}

function buildErrorPageDataUrl({ title, message, details = [] }) {
  const detailHtml = details
    .filter(Boolean)
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <style>
      :root {
        color-scheme: dark;
        font-family: "Segoe UI", system-ui, sans-serif;
      }
      body {
        margin: 0;
        min-height: 100vh;
        background: #0b1020;
        color: #e5e7eb;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
      }
      main {
        width: min(860px, 100%);
        background: rgba(15, 23, 42, 0.92);
        border: 1px solid rgba(148, 163, 184, 0.2);
        border-radius: 16px;
        padding: 28px;
        box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
      }
      h1 {
        margin: 0 0 12px;
        font-size: 24px;
      }
      p {
        margin: 0 0 16px;
        line-height: 1.6;
        color: #cbd5e1;
      }
      ul {
        margin: 0;
        padding-left: 20px;
        color: #dbeafe;
        line-height: 1.7;
      }
      pre {
        margin: 20px 0 0;
        padding: 16px;
        overflow: auto;
        border-radius: 12px;
        background: rgba(2, 6, 23, 0.8);
        border: 1px solid rgba(148, 163, 184, 0.16);
        color: #f8fafc;
        white-space: pre-wrap;
        word-break: break-word;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(message)}</p>
      ${detailHtml ? `<ul>${detailHtml}</ul>` : ""}
      <pre>${escapeHtml(details.join("\n"))}</pre>
    </main>
  </body>
</html>`;

  return `data:text/html;charset=UTF-8,${encodeURIComponent(html)}`;
}

function createErrorReporter({ getMainWindow }) {
  // 错误页自身也会触发加载事件，这里加锁避免进入重复渲染和重复报错。
  let isShowingErrorPage = false;

  async function showErrorPage(payload) {
    const window = getMainWindow();
    if (!window || window.isDestroyed()) {
      dialog.showErrorBox(payload.title, [payload.message, ...payload.details].join("\n\n"));
      return;
    }

    if (isShowingErrorPage) {
      return;
    }

    isShowingErrorPage = true;
    try {
      await window.loadURL(buildErrorPageDataUrl(payload));
      if (!window.isVisible()) {
        window.show();
      }
    } catch (pageError) {
      dialog.showErrorBox(
        payload.title,
        [payload.message, ...payload.details, "", formatError(pageError)].join("\n\n")
      );
    }
  }

  return {
    resetErrorPageLock() {
      isShowingErrorPage = false;
    },
    async reportFatal({ title, message, details = [], error }) {
      const formattedError = formatError(error);
      console.error(`[electron] ${title}: ${formattedError}`);

      await showErrorPage({
        title,
        message,
        details: [...details, formattedError].filter(Boolean),
      });
    },
  };
}

function registerProcessErrorHandlers(reporter) {
  process.on("uncaughtException", (error) => {
    reporter.reportFatal({
      title: "主进程发生未捕获异常",
      message: "Envelope 无法继续稳定运行，请根据错误信息修复后重试。",
      error,
    });
  });

  process.on("unhandledRejection", (reason) => {
    reporter.reportFatal({
      title: "主进程出现未处理 Promise 拒绝",
      message: "有异步流程在主进程中失败且未被捕获。",
      error: reason,
    });
  });
}

function attachWindowErrorHandlers(window, reporter) {
  window.webContents.on("did-start-loading", () => {
    reporter.resetErrorPageLock();
  });

  window.webContents.on(
    "did-fail-load",
    (_event, errorCode, errorDescription, validatedURL, isMainFrame) => {
      if (!isMainFrame || errorCode === -3) {
        return;
      }

      reporter.reportFatal({
        title: "渲染进程加载失败",
        message: "Electron 已拦截失败的页面加载，并切换为统一错误页。",
        details: [
          `地址：${validatedURL || "未知"}`,
          `错误码：${errorCode}`,
          `错误信息：${errorDescription || "未知"}`,
        ],
      });
    }
  );

  window.webContents.on("render-process-gone", (_event, details) => {
    reporter.reportFatal({
      title: "渲染进程异常退出",
      message: "渲染进程已终止，当前页面已不可用。",
      details: [
        `原因：${details.reason || "未知"}`,
        `退出码：${details.exitCode ?? "未知"}`,
      ],
    });
  });

  window.on("unresponsive", () => {
    reporter.reportFatal({
      title: "主窗口无响应",
      message: "渲染线程长时间未响应，请检查启动页或前端运行状态。",
    });
  });
}

module.exports = {
  attachWindowErrorHandlers,
  createErrorReporter,
  formatError,
  registerProcessErrorHandlers,
};
