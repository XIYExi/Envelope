/**
 * 虚拟文件系统
 *
 * 内存中管理生成的代码文件，支持：
 * - 添加/删除文件
 * - 遍历所有文件
 * - 写入物理磁盘
 * - 打包为 ZIP 数据结构
 *
 * @author xiye
 * @date 2026-06-14
 */
import * as fs from "node:fs";
import * as path from "node:path";
import type { VirtualFile } from "./file-system.types";

/**
 * 虚拟文件系统
 *
 * 在内存中收集所有生成的文件，支持批量写入磁盘和 ZIP 打包。
 * 使用 Map 存储，按路径去重（同一路径多次添加会覆盖）。
 */
export class VirtualFS {
  private files: Map<string, string> = new Map();

  private normalizeAndValidatePath(filePath: string): string {
    const normalized = filePath.replace(/\\/g, "/").replace(/^\.\/+/, "").trim();
    if (!normalized) {
      throw new Error(`VirtualFS: filePath is empty`);
    }
    if (normalized.includes("\0")) {
      throw new Error(`VirtualFS: filePath contains null byte: ${normalized}`);
    }
    if (path.posix.isAbsolute(normalized) || path.win32.isAbsolute(normalized)) {
      throw new Error(`VirtualFS: absolute path is not allowed: ${normalized}`);
    }
    const segments = normalized.split("/");
    if (segments.some((seg) => seg === "..")) {
      throw new Error(`VirtualFS: path traversal is not allowed: ${normalized}`);
    }
    const collapsed = path.posix.normalize(normalized);
    if (!collapsed || collapsed === "." || collapsed.startsWith("../")) {
      throw new Error(`VirtualFS: invalid relative path: ${normalized}`);
    }
    return collapsed;
  }

  /**
   * 添加文件到虚拟文件系统
   * @param filePath - 相对路径
   * @param content - 文件内容
   */
  addFile(filePath: string, content: string): void {
    const normalized = this.normalizeAndValidatePath(filePath);
    this.files.set(normalized, content);
  }

  /**
   * 批量添加文件
   * @param files - 虚拟文件数组
   */
  addFiles(files: VirtualFile[]): void {
    for (const file of files) {
      this.addFile(file.path, file.content);
    }
  }

  /**
   * 获取指定路径的文件内容
   * @param filePath - 相对路径
   * @returns 文件内容，如果不存在则返回 undefined
   */
  getFile(filePath: string): string | undefined {
    return this.files.get(this.normalizeAndValidatePath(filePath));
  }

  /**
   * 获取所有虚拟文件
   * @returns VirtualFile 数组，按路径排序
   */
  getAllFiles(): VirtualFile[] {
    const result: VirtualFile[] = [];
    for (const [filePath, content] of this.files) {
      result.push({ path: filePath, content });
    }
    // 注意：不要使用 localeCompare。
    // localeCompare 会依赖运行时的 locale/ICU 数据，在某些环境下可能导致排序差异，
    // 从而让快照测试出现“同内容不同序”的噪音。
    result.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
    return result;
  }

  /**
   * 检查文件是否存在
   * @param filePath - 相对路径
   */
  hasFile(filePath: string): boolean {
    return this.files.has(this.normalizeAndValidatePath(filePath));
  }

  /**
   * 移除文件
   * @param filePath - 相对路径
   */
  removeFile(filePath: string): void {
    this.files.delete(this.normalizeAndValidatePath(filePath));
  }

  /**
   * 获取文件总数
   */
  get fileCount(): number {
    return this.files.size;
  }

  /**
   * 将所有文件写入物理磁盘
   * @param basePath - 输出根目录
   */
  toDirectory(basePath: string): void {
    const baseResolved = path.resolve(basePath);
    for (const [relativePath, content] of this.files) {
      const safeRelativePath = this.normalizeAndValidatePath(relativePath);
      const fullPath = path.join(basePath, safeRelativePath);
      const fullResolved = path.resolve(fullPath);
      if (!fullResolved.toLowerCase().startsWith((baseResolved + path.sep).toLowerCase())) {
        throw new Error(`VirtualFS: resolved path escapes basePath: ${safeRelativePath}`);
      }
      const dir = path.dirname(fullPath);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(fullPath, content, "utf-8");
    }
  }

  /**
   * 导出为 ZIP 数据结构
   *
   * 返回文件路径和内容的列表，供上层平台打包为 ZIP。
   * 不在此处引入具体 ZIP 库，保持核心模块零依赖。
   *
   * @returns 文件列表，可用于 ZIP 打包
   */
  toZipPayload(): VirtualFile[] {
    return this.getAllFiles();
  }

  /**
   * 清空所有文件
   */
  clear(): void {
    this.files.clear();
  }
}
