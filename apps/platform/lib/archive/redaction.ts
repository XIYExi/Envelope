import type { ProjectConfig } from "@envelope/engine";

export type RedactionResult<T> = {
  value: T;
  rules: string[];
};

/**
 * 归档导出时的脱敏规则（Anti:ISC-97）
 *
 * 注意：这里的“脱敏”只针对平台配置包（ISC-20），不影响“代码导出”（ISC-12）。
 */
export function redactProjectConfig(config: ProjectConfig): RedactionResult<ProjectConfig> {
  const next: ProjectConfig = structuredClone(config ?? ({} as ProjectConfig));
  const rules: string[] = [];

  if (next.supabase?.anonKey) {
    next.supabase.anonKey = undefined;
    rules.push("project.config.supabase.anonKey");
  }

  return { value: next, rules };
}
