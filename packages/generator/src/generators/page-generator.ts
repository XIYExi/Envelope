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
function generateImports(componentTypes: Set<string>): string[] {
  // path → components 的聚合映射
  const importMap = new Map<string, Set<string>>();

  for (const type of componentTypes) {
    const entry = SHADCN_IMPORT_MAP[type];
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
 * 生成页面组件的数据绑定代码（占位）
 */
function generateDataBindings(components: ComponentNode[]): string {
  const bindings: string[] = [];
  const walk = (comps: ComponentNode[]) => {
    for (const comp of comps) {
      if (comp.dataBindings && Object.keys(comp.dataBindings).length > 0) {
        for (const [prop, binding] of Object.entries(comp.dataBindings)) {
          bindings.push(`  // TODO: TanStack Query — ${comp.type}(${comp.id}) — ${prop} → ${binding}`);
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
 * 生成页面组件的事件绑定代码（占位）
 */
function generateEventBindings(components: ComponentNode[]): string {
  const bindings: string[] = [];
  const walk = (comps: ComponentNode[]) => {
    for (const comp of comps) {
      if (comp.eventBindings && Object.keys(comp.eventBindings).length > 0) {
        for (const [event, handler] of Object.entries(comp.eventBindings)) {
          if (event === "onPageLoad") {
            bindings.push(
              `  useEffect(() => {`,
              `    void callFlow(${tsStringLiteral(handler)}, {`,
              `      componentId: ${tsStringLiteral(comp.id)},`,
              `      event: ${tsStringLiteral(event)},`,
              `    });`,
              `  }, []);`,
            );
            continue;
          }
          if (event === "onPageUnload") {
            bindings.push(
              `  useEffect(() => {`,
              `    return () => {`,
              `      void callFlow(${tsStringLiteral(handler)}, {`,
              `        componentId: ${tsStringLiteral(comp.id)},`,
              `        event: ${tsStringLiteral(event)},`,
              `      });`,
              `    };`,
              `  }, []);`,
            );
            continue;
          }

          const fn = makeEventHandlerName(comp.id, event);
          bindings.push(
            `  const ${fn} = useCallback(async (...args: unknown[]) => {`,
            `    return callFlow(${tsStringLiteral(handler)}, {`,
            `      componentId: ${tsStringLiteral(comp.id)},`,
            `      event: ${tsStringLiteral(event)},`,
            `      args,`,
            `    });`,
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
): string {
  const components = page.components || [];
  const componentTypes = collectComponentTypes(components);

  const hasEventBindings = hasDeepComponents(
    components,
    (c) => Boolean(c.eventBindings && Object.keys(c.eventBindings).length > 0),
  );

  // 决定是否 use client
  const useClient = options.forceUseClient === true
    ? true
    : needsUseClient(componentTypes) || hasEventBindings;

  // 生成 imports
  const imports = generateImports(componentTypes);

  // 添加自定义 imports
  if (options.imports && options.imports.length > 0) {
    imports.push(...options.imports);
  }

  if (hasEventBindings) {
    imports.push(`import { callFlow } from "@/lib/flows/client";`);
  }

  // 检测是否需要 Link (next/link)
  if (componentTypes.has("Link") && !imports.some((i) => i.includes("next/link"))) {
    imports.push(`import Link from "next/link";`);
  }

  // 收集 React hooks 需求
  const hasDataBindings = hasDeepComponents(
    components,
    (c) => Boolean(c.dataBindings && Object.keys(c.dataBindings).length > 0),
  );

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
  lines.push(`export default function Page() {`);

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
    lines.push(generateComponentJSX(comp, 3));
  }

  lines.push(`    </div>`);
  lines.push(`  );`);
  lines.push(`}`);

  return lines.join("\n");
}
