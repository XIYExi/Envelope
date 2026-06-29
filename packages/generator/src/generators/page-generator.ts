/**
 * 页面代码生成器
 *
 * 将 PageSchema（Envelope V3 Canvas JSON）转换为完整的 Next.js App Router
 * page.tsx 文件。自动检测使用的 shadcn/ui 组件类型并生成对应的 import 语句。
 *
 * 生成流程：
 * 1. 扫描组件树，收集所有使用的组件类型
 * 2. 根据 SHADCN_IMPORT_MAP 生成 import 语句
 * 3. 生成页面元数据（metadata export 或 useEffect title）
 * 4. 递归渲染所有组件为 JSX
 * 5. 注入数据绑定和事件绑定的占位代码
 *
 * @author xiye
 * @date 2026-06-14
 */

import type { PageSchema, ComponentNode } from "@envelope/engine";
import type { MaterialRegistry } from "@envelope/materials";
import { COMPONENT_MAP, SHADCN_IMPORT_MAP, generateComponentJSX } from "./component-map";
import { tsStringLiteral } from "../core/tsx-escape";
import { makeEventHandlerName } from "./event-handler-names";

/**
 * 页面生成选项
 */
interface PageGeneratorOptions {
  /** 额外的自定义 import 语句（加在 shadcn/ui imports 之后） */
  imports?: string[];
  /** 是否生成 "use client" 指令（默认为自动检测） */
  forceUseClient?: boolean;
}

/**
 * 收集组件树中所有使用的组件类型（去重）
 */
function collectComponentTypes(components: ComponentNode[]): Set<string> {
  const types = new Set<string>();
  const walk = (comps: ComponentNode[]) => {
    for (const comp of comps) {
      types.add(comp.type);
      if (comp.children && comp.children.length > 0) {
        walk(comp.children);
      }
    }
  };
  walk(components);
  return types;
}

function hasDeepComponents(components: ComponentNode[], predicate: (c: ComponentNode) => boolean): boolean {
  const walk = (comps: ComponentNode[]): boolean => {
    for (const comp of comps) {
      if (predicate(comp)) return true;
      if (comp.children && comp.children.length > 0) {
        if (walk(comp.children)) return true;
      }
    }
    return false;
  };
  return walk(components);
}

/**
 * 根据使用的组件类型生成 shadcn/ui 导入语句
 *
 * 相同路径的组件会合并到一条 import 语句中，
 * 自动去重，按路径字母序排列。
 */
function generateImports(componentTypes: Set<string>, registry?: MaterialRegistry): string[] {
  // path → components 的聚合映射
  const importMap = new Map<string, Set<string>>();

  for (const type of componentTypes) {
    // 优先从注册表获取 shadcnImport（物料定义的单一真相源）
    let entry = SHADCN_IMPORT_MAP[type];
    if (registry) {
      const material = registry.get(type);
      if (material?.shadcnImport) {
        entry = material.shadcnImport;
      }
    }
    if (!entry) continue;
    // 跳过不生成主导入的类型（子类型如 CardHeader 已通过 Card 路径覆盖）
    if (entry.components.length === 0) continue;
    if (!importMap.has(entry.path)) {
      importMap.set(entry.path, new Set());
    }
    for (const comp of entry.components) {
      importMap.get(entry.path)!.add(comp);
    }
  }

  const imports: string[] = [];
  for (const [path, components] of importMap) {
    if (components.size === 0) continue;
    const names = Array.from(components).sort().join(", ");
    if (path === "next/link") {
      imports.push(`import Link from "${path}";`);
    } else {
      imports.push(`import { ${names} } from "${path}";`);
    }
  }
  return imports;
}

/**
 * 检测是否需要 "use client" 指令
 *
 * 判断依据：组件树中是否包含需要客户端交互的类型
 * （如 Button、Dialog、DropdownMenu 等）
 */
function needsUseClient(componentTypes: Set<string>): boolean {
  const clientTypes = new Set([
    "Button", "Input", "Textarea", "Select", "Checkbox", "Switch",
    "RadioGroup", "DatePicker", "Dialog", "AlertDialog", "Sheet",
    "DropdownMenu", "Popover", "ContextMenu", "Tooltip", "HoverCard",
    "Tabs", "NavigationMenu", "Toast", "Progress",
  ]);
  for (const type of componentTypes) {
    if (clientTypes.has(type)) return true;
  }
  return false;
}

/**
 * Domain M: 从组件树中收集所有数据绑定的表名（去重）
 */
function collectDataBindingTableNames(components: ComponentNode[]): string[] {
  const tables = new Set<string>();
  const walk = (comps: ComponentNode[]) => {
    for (const comp of comps) {
      if (comp.dataBindings && Object.keys(comp.dataBindings).length > 0) {
        for (const binding of Object.values(comp.dataBindings)) {
          if (binding.startsWith("{{") && binding.endsWith("}}")) continue;
          const dot = binding.indexOf(".");
          if (dot !== -1) {
            tables.add(binding.slice(0, dot));
          }
        }
      }
      if (comp.children && comp.children.length > 0) {
        walk(comp.children);
      }
    }
  };
  walk(components);
  return Array.from(tables);
}

/**
 * L1~L2, L4~L5: 生成可运行的 Supabase + TanStack Query 数据绑定代码
 *
 * 遍历组件树收集 dataBinding 配置，按表名去重，
 * 为每张表生成 useMemo Supabase 客户端和 useQuery 查询。
 *
 * L4: 支持 table.column / table.* 绑定——查询使用 select("*")，
 *      单列过滤在 dataBindingAttrs 层处理（组件级）。
 * L5: 支持 {{searchParams.xxx}} 绑定到 URL 查询参数。
 */
function generateDataBindings(components: ComponentNode[]): string {
  // 收集唯一的表名
  const tables = new Set<string>();
  let needsSearchParams = false;
  let needsParams = false;

  const walk = (comps: ComponentNode[]) => {
    for (const comp of comps) {
      if (comp.dataBindings && Object.keys(comp.dataBindings).length > 0) {
        for (const binding of Object.values(comp.dataBindings)) {
          // 搜索参数绑定: {{searchParams.xxx}} / {{params.xxx}}
          if (binding.startsWith("{{") && binding.endsWith("}}")) {
            const inner = binding.slice(2, -2).trim();
            if (inner.startsWith("searchParams")) {
              needsSearchParams = true;
            }
            if (inner.startsWith("params")) {
              needsParams = true;
            }
            continue;
          }
          // 表.列 绑定: users.name 或 users.*
          const dot = binding.indexOf(".");
          if (dot !== -1) {
            tables.add(binding.slice(0, dot));
          }
        }
      }
      if (comp.children && comp.children.length > 0) {
        walk(comp.children);
      }
    }
  };
  walk(components);

  if (tables.size === 0 && !needsSearchParams && !needsParams) {
    return "";
  }

  const lines: string[] = [];

  // L1: Supabase 客户端 — 通过 useMemo 缓存单例
  lines.push(`  // L1: Supabase 客户端 — useMemo 缓存单例`);
  lines.push(`  const supabase = useMemo(() => createClient(`);
  lines.push(`    process.env.NEXT_PUBLIC_SUPABASE_URL!,`);
  lines.push(`    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,`);
  lines.push(`  ), []);`);
  lines.push(``);

  // L5: URL 搜索参数绑定
  if (needsSearchParams) {
    lines.push(`  // L5: URL 查询参数绑定`);
    lines.push(`  const searchParams = useSearchParams();`);
    lines.push(``);
  }

  // U9: 动态路由参数绑定 — 从 props.params 中提取
  if (needsParams) {
    lines.push(`  // U9: 动态路由参数绑定`);
    lines.push(`  const params = await paramsPromise;`);
    lines.push(``);
  }

  // L1~L2: 每张表生成 useQuery
  for (const table of tables) {
    const dataVar = `${table}Data`;
    lines.push(`  // L1: 从 ${table} 表查询数据 — L2: useQuery 包装`);
    lines.push(`  const { data: ${dataVar} } = useQuery({`);
    lines.push(`    queryKey: [${tsStringLiteral(table)}],`);
    lines.push(`    queryFn: async () => {`);
    lines.push(`      const { data, error } = await supabase`);
    lines.push(`        .from(${tsStringLiteral(table)})`);
    lines.push(`        .select("*");`);
    lines.push(`      if (error) throw new Error(error.message);`);
    lines.push(`      return data as unknown[];`);
    lines.push(`    },`);
    lines.push(`  });`);
    lines.push(``);
  }

  return lines.join("\n");
}

/**
 * K4+K1: 生成页面组件的事件绑定代码
 *
 * - K1: 一个事件可绑定多个 flow 依次执行（eventBindings 值为 string[]）
 * - K4: 保留 callFlow 返回值到 flowResult 变量
 * - K7: onPageLoad 生成 useEffect 正确注入依赖（已在上游实现）
 */
function generateEventBindings(components: ComponentNode[]): string {
  const bindings: string[] = [];
  const walk = (comps: ComponentNode[]) => {
    for (const comp of comps) {
      if (comp.eventBindings && Object.keys(comp.eventBindings).length > 0) {
        for (const [event, rawFlowIds] of Object.entries(comp.eventBindings)) {
          // K1: handler 现在是 string[]，兼容旧数据（单个 string）也做转换
          const ids: string[] = Array.isArray(rawFlowIds) ? rawFlowIds : [String(rawFlowIds)];
          if (ids.length === 0) continue;

          // 为每个 fid 生成 callFlow 调用片段
          const callFlowLines: string[] = [];
          for (const fid of ids) {
            const safeFid = tsStringLiteral(fid);
            const safeCompId = tsStringLiteral(comp.id);
            const safeEvent = tsStringLiteral(event);
            callFlowLines.push(
              `      const flowResult = await callFlow(${safeFid}, {`,
              `        componentId: ${safeCompId},`,
              `        event: ${safeEvent},`,
              `      });`,
            );
          }
          const callFlowStr = callFlowLines.join("\n");

          if (event === "onPageLoad") {
            bindings.push(
              `  useEffect(() => {`,
              `    (async () => {`,
              callFlowStr,
              `    })();`,
              `  }, []);`,
            );
            continue;
          }
          if (event === "onPageUnload") {
            bindings.push(
              `  useEffect(() => {`,
              `    return () => {`,
              `      (async () => {`,
              callFlowStr,
              `      })();`,
              `    };`,
              `  }, []);`,
            );
            continue;
          }

          const fn = makeEventHandlerName(comp.id, event);
          // 带 args 的 callFlow 调用（含 flowResults 收集）
          const callFlowArgsLines: string[] = [];
          for (const fid of ids) {
            const safeFid = tsStringLiteral(fid);
            const safeCompId = tsStringLiteral(comp.id);
            const safeEvent = tsStringLiteral(event);
            callFlowArgsLines.push(
              `    const flowResult = await callFlow(${safeFid}, {`,
              `      componentId: ${safeCompId},`,
              `      event: ${safeEvent},`,
              `      args: eventArgs,`,
              `    });`,
              `    flowResults.push(flowResult);`,
            );
          }
          const callFlowArgsStr = callFlowArgsLines.join("\n");

          bindings.push(
            `  const ${fn} = useCallback(async (...args: unknown[]) => {`,
            `    const eventArgs = args;`,
            `    const flowResults: unknown[] = [];`,
            callFlowArgsStr,
            `    return flowResults;`,
            `  }, []);`,
          );
        }
      }
      if (comp.children && comp.children.length > 0) {
        walk(comp.children);
      }
    }
  };
  walk(components);
  return bindings.length > 0 ? bindings.join("\n") : "";
}

/**
 * 渲染页面背景样式（返回对象字面量字符串，不含 `style=` 前缀）
 */
function renderBackgroundStyle(background: PageSchema["background"]): string {
  if (!background) return "";
  const styles: string[] = [];
  if (background.color) styles.push(`backgroundColor: ${tsStringLiteral(background.color)}`);
  if (background.image) styles.push(`backgroundImage: ${tsStringLiteral(`url(${background.image})`)}`);
  if (styles.length === 0) return "";
  return `{ ${styles.join(", ")} }`;
}

/**
 * 将 PageSchema 转换为完整的 Next.js App Router page.tsx 代码
 *
 * @param page - 页面 Schema 数据
 * @param options - 生成选项（自定义 imports、强制 use client 等）
 * @returns 完整的 page.tsx 文件内容字符串
 *
 * @example
 * ```ts
 * const code = generatePageCode(pageSchema);
 * // code 可作为 page.tsx 文件内容写入
 * ```
 */
export function generatePageCode(
  page: PageSchema,
  options: PageGeneratorOptions = {},
  registry?: MaterialRegistry,
): string {
  const components = page.components || [];
  const componentTypes = collectComponentTypes(components);

  const hasEventBindings = hasDeepComponents(
    components,
    (c) => Boolean(c.eventBindings && Object.keys(c.eventBindings).length > 0),
  );

  const hasDataBindings = hasDeepComponents(
    components,
    (c) => Boolean(c.dataBindings && Object.keys(c.dataBindings).length > 0),
  );

  // Domain M: 检测是否有表达式绑定
  const hasExpressions = hasDeepComponents(
    components,
    (c) => Boolean(
      (c.expressionBindings && Object.keys(c.expressionBindings).length > 0) ||
      c.visibleIf ||
      c.repeat
    ),
  );

  // 收集数据绑定表名（用于表达式上下文）
  const collectedTableNames = collectDataBindingTableNames(components);

  // 检查是否有搜索参数/路由参数绑定（在 import 阶段之前需要知道）
  const needsSearchParams = hasDeepComponents(
    components,
    (c) => {
      if (!c.dataBindings) return false;
      return Object.values(c.dataBindings).some(
        (v) => v.startsWith("{{searchParams") && v.endsWith("}}"),
      );
    },
  );

  const needsParams = hasDeepComponents(
    components,
    (c) => {
      if (!c.dataBindings) return false;
      return Object.values(c.dataBindings).some(
        (v) => v.startsWith("{{params") && v.endsWith("}}"),
      );
    },
  );

  // 决定是否 use client
  const useClient = options.forceUseClient === true
    ? true
    : needsUseClient(componentTypes) || hasEventBindings || hasDataBindings || hasExpressions;

  // 生成 imports（优先从注册表读取 shadcnImport）
  const imports = generateImports(componentTypes, registry);

  // 添加自定义 imports
  if (options.imports && options.imports.length > 0) {
    imports.push(...options.imports);
  }

  if (hasEventBindings) {
    imports.push(`import { callFlow } from "@/lib/flows/client";`);
    imports.push(`import { useAppStore } from "@/lib/store/app-store";`);
  }

  if (hasDataBindings) {
    imports.push(`import { useQuery } from "@tanstack/react-query";`);
    imports.push(`import { createClient } from "@supabase/supabase-js";`);
  }

  if (hasExpressions) {
    imports.push(`import { evaluateExpression, evaluateExpressionAsArray } from "@/lib/expression/evaluator";`);
  }

  if (needsSearchParams) {
    imports.push(`import { useSearchParams } from "next/navigation";`);
  }

  // 检测是否需要 Link (next/link)
  if (componentTypes.has("Link") && !imports.some((i) => i.includes("next/link"))) {
    imports.push(`import Link from "next/link";`);
  }

  const lines: string[] = [];

  // ── "use client" ──
  if (useClient) {
    lines.push(`"use client";`);
    lines.push("");
  }

  // ── React imports ──
  const reactImports: string[] = [];
  if (useClient) {
    reactImports.push("useEffect");
  }
  if (useClient && hasEventBindings) {
    reactImports.push("useCallback");
  }
  if (useClient && hasDataBindings) {
    reactImports.push("useMemo");
  }
  if (reactImports.length > 0) {
    lines.push(`import { ${reactImports.join(", ")} } from "react";`);
  }

  // ── shadcn/ui imports ──
  if (imports.length > 0) {
    lines.push(imports.sort().join("\n"));
    lines.push("");
  }

  // ── Metadata ──
  const pageTitle = page.metadata?.title || page.title || "Untitled";
  const pageDescription = page.metadata?.description || page.description || "";

  if (!useClient) {
    lines.push(`export const metadata = {`);
    lines.push(`  title: ${tsStringLiteral(pageTitle)},`);
    if (pageDescription) lines.push(`  description: ${tsStringLiteral(pageDescription)},`);
    lines.push(`};`);
    lines.push("");
  }

  // ── Page component ──
  if (needsParams) {
    lines.push(`export default async function Page({ params: paramsPromise }: { params: Promise<Record<string, string>> }) {`);
  } else {
    lines.push(`export default function Page() {`);
  }

  // useEffect for title (client mode)
  if (useClient) {
    lines.push(`  // SEO — dynamic title for client component`);
    lines.push(`  useEffect(() => {`);
    lines.push(`    document.title = ${tsStringLiteral(pageTitle)};`);
    if (pageDescription) {
      lines.push(`    const meta = document.querySelector('meta[name="description"]');`);
      lines.push(`    if (meta) meta.setAttribute("content", ${tsStringLiteral(pageDescription)});`);
    }
    lines.push(`  }, []);`);
    lines.push("");
  }

  // 数据绑定占位
  const dataBindingsCode = generateDataBindings(components);
  if (dataBindingsCode) {
    lines.push(`  // ── 数据绑定 (TanStack Query) ──`);
    lines.push(dataBindingsCode);
    lines.push("");
  }

  // 事件绑定占位
  const eventBindingsCode = generateEventBindings(components);
  if (eventBindingsCode) {
    lines.push(eventBindingsCode);
    lines.push("");
  }

  // Domain M: 生成表达式上下文
  if (hasExpressions) {
    lines.push(`  // ── 表达式上下文 (Domain M) ──`);
    lines.push(`  const expressionContext: Record<string, unknown> = {`);
    for (const tableName of collectedTableNames) {
      lines.push(`    ${tableName}: ${tableName}Data,`);
    }
    lines.push(`  };`);
    lines.push("");
  }

  // ── 页面容器 ──
  const bgStyle = renderBackgroundStyle(page.background);
  const containerClasses: string[] = [];
  if (!page.background?.color) containerClasses.push("min-h-screen");
  containerClasses.push("mx-auto");

  const containerClassStr = containerClasses.join(" ");
  const styleAttr = bgStyle ? ` style={${bgStyle}}` : "";

  lines.push(`  return (`);
  lines.push(`    <div className={${tsStringLiteral(containerClassStr)}}${styleAttr}>`);

  // 渲染所有顶层组件
  for (const comp of components) {
    lines.push(generateComponentJSX(comp, 3, registry));
  }

  lines.push(`    </div>`);
  lines.push(`  );`);
  lines.push(`}`);

  return lines.join("\n");
}
