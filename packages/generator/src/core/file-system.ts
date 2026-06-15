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

/**
 * 虚拟文件描述
 * 对应生成的单个代码文件
 */
export interface VirtualFile {
  /** 文件相对路径（如 "app/page.tsx"、"lib/utils.ts"） */
  path: string;
  /** 文件内容（字符串） */
  content: string;
}

/**
 * 虚拟文件系统
 *
 * 在内存中收集所有生成的文件，支持批量写入磁盘和 ZIP 打包。
 * 使用 Map 存储，按路径去重（同一路径多次添加会覆盖）。
 */
export class VirtualFS {
  private files: Map<string, string> = new Map();

  /**
   * 添加文件到虚拟文件系统
   * @param filePath - 相对路径
   * @param content - 文件内容
   */
  addFile(filePath: string, content: string): void {
    // 规范化路径分隔符
    const normalized = filePath.replace(/\\/g, "/");
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
    return this.files.get(filePath.replace(/\\/g, "/"));
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
    result.sort((a, b) => a.path.localeCompare(b.path));
    return result;
  }

  /**
   * 检查文件是否存在
   * @param filePath - 相对路径
   */
  hasFile(filePath: string): boolean {
    return this.files.has(filePath.replace(/\\/g, "/"));
  }

  /**
   * 移除文件
   * @param filePath - 相对路径
   */
  removeFile(filePath: string): void {
    this.files.delete(filePath.replace(/\\/g, "/"));
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
    for (const [relativePath, content] of this.files) {
      const fullPath = path.join(basePath, relativePath);
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
