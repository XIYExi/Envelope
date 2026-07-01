/**
 * CommandManager — 轻量级命令管理器
 *
 * 对齐 lowcode-engine IPublicApiCommand 的最小子集。
 * 每个 PluginContext 持有一个独立实例，命令名自动加 pluginName 前缀。
 *
 * 简化策略（相对 lowcode-engine）：
 * - 不实现 batchExecuteCommand 事务（lowcode 用 utils.executeTransaction 包裹）
 * - 不实现 commandScope 全局唯一性校验（用 pluginName 前缀替代）
 * - 不实现 onCommandError 回调链
 * - registerCommand 返回 Disposable 函数（对齐 shell 约定）
 *
 * @reference lowcode-engine-main/packages/editor-core/src/command.ts
 * @reference lowcode-engine-main/packages/shell/src/api/command.ts
 */

import type { CommandAPI } from "./types";

/** 命令定义 */
interface CommandDef {
  name: string;
  description?: string;
  parameters?: { name: string; propType: string }[];
  handler: (args: Record<string, unknown>) => void;
}

/**
 * 命令管理器
 *
 * 命令名以 `${pluginName}:${command.name}` 格式存储，防止跨插件冲突。
 * 对齐 lowcode-engine `command.ts:23` 的 `${commandScope}:${command.name}` 命名空间模式。
 */
export class CommandManager implements CommandAPI {
  /** 命令注册表，全限定名 → CommandDef */
  private commands = new Map<string, CommandDef>();
  /** 插件名前缀 */
  private pluginName: string;

  constructor(pluginName: string) {
    this.pluginName = pluginName;
  }

  /**
   * 注册命令
   * 名称自动加 pluginName 前缀：`registerCommand({name:'foo'})` → 存储 `${pluginName}:foo`
   * @returns 取消注册函数
   */
  registerCommand(command: CommandDef): () => void {
    const fullName = `${this.pluginName}:${command.name}`;
    if (this.commands.has(fullName)) {
      console.warn(`[Command] command "${fullName}" already registered, overwriting`);
    }
    this.commands.set(fullName, command);

    return () => {
      this.commands.delete(fullName);
    };
  }

  /**
   * 执行命令
   * @param name - 命令名。若不含 `:` 前缀，自动加当前 pluginName 前缀；
   *               若含 `:` 则视为全限定名直接查找。
   */
  executeCommand(name: string, args: Record<string, unknown> = {}): void {
    const fullName = name.includes(":") ? name : `${this.pluginName}:${name}`;
    const cmd = this.commands.get(fullName);
    if (!cmd) {
      console.warn(`[Command] command "${fullName}" not found`);
      return;
    }
    cmd.handler(args);
  }

  /**
   * 列出所有已注册命令
   */
  listCommands(): { name: string; description?: string }[] {
    return Array.from(this.commands.entries()).map(([name, def]) => ({
      name,
      description: def.description,
    }));
  }

  /**
   * 销毁管理器，清空所有命令
   */
  destroy(): void {
    this.commands.clear();
  }
}
