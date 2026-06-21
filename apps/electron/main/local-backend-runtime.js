/**
 * @file 本地后端运行态切换辅助模块。
 * @description 抽离“持久化本地后端根目录并触发当前会话刷新”的通用流程，
 * 方便 IPC 与后续菜单/设置页复用，也便于单元测试验证立即生效语义。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */

/**
 * 应用本地后端根目录变更，并在必要时触发运行时刷新。
 * @param {{
 *   localBackendStorage: { setRootDir: (rootDir: string) => { rootDir: string, source: string } },
 *   rootDir: string,
 *   onLocalBackendRootChanged?: (snapshot: { rootDir: string, source: string }) => Promise<void> | void
 * }} options 变更依赖。
 * @returns {Promise<{ rootDir: string, source: string }>} 变更后的快照。
 * @author xiye
 * @date 2026-06-21
 * @since 3.0.0
 */
async function applyLocalBackendRootDirChange({
  localBackendStorage,
  rootDir,
  onLocalBackendRootChanged,
}) {
  const snapshot = localBackendStorage.setRootDir(rootDir);
  if (typeof onLocalBackendRootChanged === "function") {
    await onLocalBackendRootChanged(snapshot);
  }
  return snapshot;
}

module.exports = {
  applyLocalBackendRootDirChange,
};
