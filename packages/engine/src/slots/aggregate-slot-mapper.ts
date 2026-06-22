/**
 * 聚合组件 Slots ↔ ChildrenTree 映射器
 *
 * 目标：
 * - 将“聚合组件”的 slots（目前主要以 props 形式存在）真正映射为 children tree；
 * - 同时支持反向从 children tree 回写到 props（用于兼容旧数据与属性面板展示）；
 * - 支持 CRUD 场景：当 props 的 slots 字段变化时，自动增删改 children tree；
 * - 支持同步场景：当 children tree 发生变化时，自动反向同步 props。
 *
 * 设计约束：
 * - 编辑器 Schema 的 children 只能是 ComponentNode[]，不支持直接存字符串节点；
 *   因此引入内部叶子节点 Text（showInPalette=false）承载纯文本内容。
 * - 尽量复用既有 child id，避免频繁生成新 id 导致撤销栈/选中态抖动。
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
import type { ComponentNode } from "../schemas/page.schema";

export type AggregateSlotSyncSource = "props" | "children";

function newId(): string {
  return crypto.randomUUID();
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function propBool(props: Record<string, unknown> | undefined, key: string, fallback: boolean): boolean {
  const v = props?.[key];
  if (typeof v === "boolean") return v;
  if (v === undefined) return fallback;
  return Boolean(v);
}

function propStr(props: Record<string, unknown> | undefined, key: string, fallback: string): string {
  const v = props?.[key];
  if (typeof v === "string") return v;
  if (v === undefined || v === null) return fallback;
  return String(v);
}

function propNum(props: Record<string, unknown> | undefined, key: string, fallback: number): number {
  const v = props?.[key];
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() && Number.isFinite(Number(v))) return Number(v);
  return fallback;
}

function ensureProps(node: ComponentNode): Record<string, unknown> {
  return (node.props ?? {}) as Record<string, unknown>;
}

function cloneNode(node: ComponentNode): ComponentNode {
  return {
    ...node,
    props: node.props ? { ...(node.props as Record<string, unknown>) } : undefined,
    children: node.children ? node.children.map(cloneNode) : undefined,
  };
}

function pickTextFromNode(node: ComponentNode | undefined): string | null {
  if (!node) return null;
  const p = node.props as Record<string, unknown> | undefined;
  if (node.type === "Text") {
    const t = p?.text;
    if (typeof t === "string") return t;
    if (t === undefined || t === null) return "";
    return String(t);
  }
  if (typeof p?.text === "string") return p.text;
  if (typeof p?.label === "string") return p.label;
  return null;
}

function makeTextNode(text: string, category: string, reuse?: ComponentNode): ComponentNode {
  const id = reuse?.type === "Text" ? reuse.id : newId();
  return {
    id,
    type: "Text",
    name: `Text-${id}`,
    category,
    props: { text },
  };
}

function upsertChildByType(
  children: ComponentNode[],
  type: string,
  category: string,
  factory: (reuse?: ComponentNode) => ComponentNode,
): { nextChildren: ComponentNode[]; node: ComponentNode } {
  const idx = children.findIndex((c) => c.type === type);
  if (idx >= 0) {
    const reuse = children[idx];
    const next = factory(reuse);
    const nextChildren = children.slice();
    nextChildren[idx] = next;
    return { nextChildren, node: next };
  }
  const next = factory(undefined);
  return { nextChildren: [...children, next], node: next };
}

function removeChildByType(children: ComponentNode[], type: string): ComponentNode[] {
  return children.filter((c) => c.type !== type);
}

function ensureChildrenArray(node: ComponentNode): ComponentNode[] {
  return Array.isArray(node.children) ? node.children : [];
}

function syncCardPropsToChildren(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const children = ensureChildrenArray(next);

  const showHeader = propBool(p, "showHeader", true);
  const showContent = propBool(p, "showContent", true);
  const showFooter = propBool(p, "showFooter", false);

  const headerText = propStr(p, "headerText", "Header");
  const contentText = propStr(p, "contentText", "Content");
  const footerText = propStr(p, "footerText", "Footer");

  let cur = children;

  if (showHeader) {
    const { nextChildren } = upsertChildByType(cur, "CardHeader", next.category, (reuse) => {
      const header = reuse && reuse.type === "CardHeader" ? reuse : undefined;
      const headerChildren = ensureChildrenArray(header ?? ({} as ComponentNode));
      const textReuse = headerChildren.find((c) => c.type === "Text");
      const restChildren = headerChildren.filter((c) => c.type !== "Text");
      return {
        id: header?.id ?? newId(),
        type: "CardHeader",
        name: `CardHeader-${header?.id ?? ""}`.replace(/-$/, ""),
        category: next.category,
        props: header?.props,
        children: [makeTextNode(headerText, next.category, textReuse), ...restChildren],
      };
    });
    cur = nextChildren;
  } else {
    cur = removeChildByType(cur, "CardHeader");
  }

  if (showContent) {
    const { nextChildren } = upsertChildByType(cur, "CardContent", next.category, (reuse) => {
      const content = reuse && reuse.type === "CardContent" ? reuse : undefined;
      const contentChildren = ensureChildrenArray(content ?? ({} as ComponentNode));
      const textReuse = contentChildren.find((c) => c.type === "Text");
      const restChildren = contentChildren.filter((c) => c.type !== "Text");
      return {
        id: content?.id ?? newId(),
        type: "CardContent",
        name: `CardContent-${content?.id ?? ""}`.replace(/-$/, ""),
        category: next.category,
        props: content?.props,
        children: [makeTextNode(contentText, next.category, textReuse), ...restChildren],
      };
    });
    cur = nextChildren;
  } else {
    cur = removeChildByType(cur, "CardContent");
  }

  if (showFooter) {
    const { nextChildren } = upsertChildByType(cur, "CardFooter", next.category, (reuse) => {
      const footer = reuse && reuse.type === "CardFooter" ? reuse : undefined;
      const footerChildren = ensureChildrenArray(footer ?? ({} as ComponentNode));
      const textReuse = footerChildren.find((c) => c.type === "Text");
      const restChildren = footerChildren.filter((c) => c.type !== "Text");
      return {
        id: footer?.id ?? newId(),
        type: "CardFooter",
        name: `CardFooter-${footer?.id ?? ""}`.replace(/-$/, ""),
        category: next.category,
        props: footer?.props,
        children: [makeTextNode(footerText, next.category, textReuse), ...restChildren],
      };
    });
    cur = nextChildren;
  } else {
    cur = removeChildByType(cur, "CardFooter");
  }

  next.children = cur.length > 0 ? cur : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

function syncCardChildrenToProps(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const children = ensureChildrenArray(next);

  const header = children.find((c) => c.type === "CardHeader");
  const content = children.find((c) => c.type === "CardContent");
  const footer = children.find((c) => c.type === "CardFooter");

  p.showHeader = Boolean(header);
  p.showContent = Boolean(content);
  p.showFooter = Boolean(footer);
  if (header) p.headerText = pickTextFromNode(header.children?.[0]) ?? propStr(p, "headerText", "Header");
  if (content) p.contentText = pickTextFromNode(content.children?.[0]) ?? propStr(p, "contentText", "Content");
  if (footer) p.footerText = pickTextFromNode(footer.children?.[0]) ?? propStr(p, "footerText", "Footer");

  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

function syncSelectPropsToChildren(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const category = next.category;
  const optionsRaw = p.options;
  const options = Array.isArray(optionsRaw) ? optionsRaw.filter((v) => typeof v === "string") as string[] : [];

  const existing = ensureChildrenArray(next).filter((c) => c.type === "SelectItem");
  const children: ComponentNode[] = options.map((label, i) => {
    const reuse = existing[i];
    const id = reuse?.id ?? newId();
    return {
      id,
      type: "SelectItem",
      name: `SelectItem-${id}`,
      category,
      props: {
        ...(reuse?.props as Record<string, unknown> | undefined),
        value: `option-${i}`,
        label,
      },
      children: reuse?.children,
    };
  });

  next.children = children.length > 0 ? children : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

function syncSelectChildrenToProps(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const items = ensureChildrenArray(next).filter((c) => c.type === "SelectItem");
  p.options = items.map((it) => {
    const ip = it.props as Record<string, unknown> | undefined;
    const label = ip?.label;
    if (typeof label === "string") return label;
    return pickTextFromNode(it.children?.[0]) ?? "Option";
  });
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

function syncRadioGroupPropsToChildren(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const category = next.category;
  const optionsRaw = p.options;
  const options = Array.isArray(optionsRaw) ? optionsRaw.filter((v) => typeof v === "string") as string[] : [];

  const existing = ensureChildrenArray(next).filter((c) => c.type === "RadioGroupItem");
  const children: ComponentNode[] = options.map((label, i) => {
    const reuse = existing[i];
    const id = reuse?.id ?? newId();
    return {
      id,
      type: "RadioGroupItem",
      name: `RadioGroupItem-${id}`,
      category,
      props: {
        ...(reuse?.props as Record<string, unknown> | undefined),
        value: `option-${i}`,
        label,
      },
      children: reuse?.children,
    };
  });

  next.children = children.length > 0 ? children : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

function syncRadioGroupChildrenToProps(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const items = ensureChildrenArray(next).filter((c) => c.type === "RadioGroupItem");
  p.options = items.map((it) => {
    const ip = it.props as Record<string, unknown> | undefined;
    const label = ip?.label;
    if (typeof label === "string") return label;
    return pickTextFromNode(it.children?.[0]) ?? "Option";
  });
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

function syncTabsPropsToChildren(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const category = next.category;

  const showList = propBool(p, "showList", true);
  const showContent = propBool(p, "showContent", true);
  const activeIndex = Math.max(0, Math.floor(propNum(p, "activeIndex", 0)));

  const tabsRaw = p.tabs;
  const tabs = Array.isArray(tabsRaw)
    ? tabsRaw
      .filter(isRecord)
      .map((it) => ({
        label: typeof it.label === "string" ? it.label : "Tab",
        content: typeof it.content === "string" ? it.content : "Tab content...",
      }))
    : [];

  const existingList = ensureChildrenArray(next).find((c) => c.type === "TabsList");
  const existingContents = ensureChildrenArray(next).filter((c) => c.type === "TabsContent");

  const nextChildren: ComponentNode[] = [];

  if (showList) {
    const listId = existingList?.id ?? newId();
    const existingTriggers = ensureChildrenArray(existingList ?? ({} as ComponentNode)).filter((c) => c.type === "TabsTrigger");
    const triggers: ComponentNode[] = tabs.map((t, i) => {
      const reuse = existingTriggers[i];
      const id = reuse?.id ?? newId();
      const existingText = ensureChildrenArray(reuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");
      return {
        id,
        type: "TabsTrigger",
        name: `TabsTrigger-${id}`,
        category,
        props: {
          ...(reuse?.props as Record<string, unknown> | undefined),
          value: `tab-${i}`,
        },
        children: [makeTextNode(t.label, category, existingText)],
      };
    });
    nextChildren.push({
      id: listId,
      type: "TabsList",
      name: `TabsList-${listId}`,
      category,
      props: existingList?.props,
      children: triggers,
    });
  }

  if (showContent) {
    const contents: ComponentNode[] = tabs.map((t, i) => {
      const reuse = existingContents[i];
      const id = reuse?.id ?? newId();
      const existingText = ensureChildrenArray(reuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");
      return {
        id,
        type: "TabsContent",
        name: `TabsContent-${id}`,
        category,
        props: {
          ...(reuse?.props as Record<string, unknown> | undefined),
          value: `tab-${i}`,
        },
        children: [makeTextNode(t.content, category, existingText)],
      };
    });
    nextChildren.push(...contents);
  }

  p.defaultValue = `tab-${Math.min(activeIndex, Math.max(0, tabs.length - 1))}`;

  next.children = nextChildren.length > 0 ? nextChildren : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

function syncTabsChildrenToProps(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const children = ensureChildrenArray(next);

  const list = children.find((c) => c.type === "TabsList");
  const triggers = list ? ensureChildrenArray(list).filter((c) => c.type === "TabsTrigger") : [];
  const contents = children.filter((c) => c.type === "TabsContent");

  p.showList = Boolean(list);
  p.showContent = contents.length > 0;

  const tabs = triggers.map((tr, i) => {
    const label = pickTextFromNode(tr.children?.[0]) ?? `Tab ${i + 1}`;
    const contentNode = contents[i];
    const content = pickTextFromNode(contentNode?.children?.[0]) ?? "Tab content...";
    return { label, content };
  });
  p.tabs = tabs;

  const defaultValue = typeof p.defaultValue === "string" ? p.defaultValue : "";
  const m = defaultValue.match(/^tab-(\d+)$/);
  if (m) p.activeIndex = Number(m[1]) || 0;

  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

function syncAccordionPropsToChildren(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const category = next.category;
  const itemsRaw = p.items;
  const items = Array.isArray(itemsRaw)
    ? itemsRaw
      .filter(isRecord)
      .map((it, i) => ({
        title: typeof it.title === "string" ? it.title : `Section ${i + 1}`,
        content: typeof it.content === "string" ? it.content : "Accordion content...",
      }))
    : [];

  const existingItems = ensureChildrenArray(next).filter((c) => c.type === "AccordionItem");

  const children: ComponentNode[] = items.map((it, i) => {
    const reuse = existingItems[i];
    const id = reuse?.id ?? newId();
    const reuseChildren = ensureChildrenArray(reuse ?? ({} as ComponentNode));
    const reuseTrigger = reuseChildren.find((c) => c.type === "AccordionTrigger");
    const reuseContent = reuseChildren.find((c) => c.type === "AccordionContent");
    const triggerTextReuse = reuseTrigger ? ensureChildrenArray(reuseTrigger).find((c) => c.type === "Text") : undefined;
    const contentTextReuse = reuseContent ? ensureChildrenArray(reuseContent).find((c) => c.type === "Text") : undefined;
    return {
      id,
      type: "AccordionItem",
      name: `AccordionItem-${id}`,
      category,
      props: {
        ...(reuse?.props as Record<string, unknown> | undefined),
        value: `item-${i}`,
      },
      children: [
        {
          id: reuseTrigger?.id ?? newId(),
          type: "AccordionTrigger",
          name: `AccordionTrigger-${reuseTrigger?.id ?? ""}`.replace(/-$/, ""),
          category,
          props: reuseTrigger?.props,
          children: [makeTextNode(it.title, category, triggerTextReuse)],
        },
        {
          id: reuseContent?.id ?? newId(),
          type: "AccordionContent",
          name: `AccordionContent-${reuseContent?.id ?? ""}`.replace(/-$/, ""),
          category,
          props: reuseContent?.props,
          children: [makeTextNode(it.content, category, contentTextReuse)],
        },
      ],
    };
  });

  next.children = children.length > 0 ? children : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

function syncAccordionChildrenToProps(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const items = ensureChildrenArray(next).filter((c) => c.type === "AccordionItem");
  p.items = items.map((it, i) => {
    const cs = ensureChildrenArray(it);
    const trigger = cs.find((c) => c.type === "AccordionTrigger");
    const content = cs.find((c) => c.type === "AccordionContent");
    return {
      title: pickTextFromNode(trigger?.children?.[0]) ?? `Section ${i + 1}`,
      content: pickTextFromNode(content?.children?.[0]) ?? "Accordion content...",
    };
  });
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

function syncTablePropsToChildren(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const category = next.category;

  const showHeader = propBool(p, "showHeader", true);
  const columnsRaw = p.columns;
  const columns = Array.isArray(columnsRaw) ? columnsRaw.filter((v) => typeof v === "string") as string[] : [];
  const safeColumns = columns.length > 0 ? columns : ["Col 1"];
  const rowCount = Math.max(0, Math.floor(propNum(p, "rowCount", 2)));

  const existing = ensureChildrenArray(next);
  const reuseHeader = existing.find((c) => c.type === "TableHeader");
  const reuseBody = existing.find((c) => c.type === "TableBody");

  const nextChildren: ComponentNode[] = [];

  if (showHeader) {
    const headerId = reuseHeader?.id ?? newId();
    const reuseHeaderRow = reuseHeader ? ensureChildrenArray(reuseHeader).find((c) => c.type === "TableRow") : undefined;
    const reuseHeads = reuseHeaderRow ? ensureChildrenArray(reuseHeaderRow).filter((c) => c.type === "TableHead") : [];

    const headCells: ComponentNode[] = safeColumns.map((col, i) => {
      const reuse = reuseHeads[i];
      const id = reuse?.id ?? newId();
      const reuseText = ensureChildrenArray(reuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");
      return {
        id,
        type: "TableHead",
        name: `TableHead-${id}`,
        category,
        props: reuse?.props,
        children: [makeTextNode(col, category, reuseText)],
      };
    });

    const rowId = reuseHeaderRow?.id ?? newId();
    nextChildren.push({
      id: headerId,
      type: "TableHeader",
      name: `TableHeader-${headerId}`,
      category,
      props: reuseHeader?.props,
      children: [
        {
          id: rowId,
          type: "TableRow",
          name: `TableRow-${rowId}`,
          category,
          props: reuseHeaderRow?.props,
          children: headCells,
        },
      ],
    });
  }

  const bodyId = reuseBody?.id ?? newId();
  const reuseRows = reuseBody ? ensureChildrenArray(reuseBody).filter((c) => c.type === "TableRow") : [];

  const bodyRows: ComponentNode[] = Array.from({ length: rowCount }, (_, r) => {
    const reuseRow = reuseRows[r];
    const rowId = reuseRow?.id ?? newId();
    const reuseCells = ensureChildrenArray(reuseRow ?? ({} as ComponentNode)).filter((c) => c.type === "TableCell");
    const cells: ComponentNode[] = safeColumns.map((_, c) => {
      const reuseCell = reuseCells[c];
      const cellId = reuseCell?.id ?? newId();
      const reuseText = ensureChildrenArray(reuseCell ?? ({} as ComponentNode)).find((x) => x.type === "Text");
      return {
        id: cellId,
        type: "TableCell",
        name: `TableCell-${cellId}`,
        category,
        props: reuseCell?.props,
        children: [makeTextNode(`Cell ${r + 1}-${c + 1}`, category, reuseText)],
      };
    });
    return {
      id: rowId,
      type: "TableRow",
      name: `TableRow-${rowId}`,
      category,
      props: reuseRow?.props,
      children: cells,
    };
  });

  nextChildren.push({
    id: bodyId,
    type: "TableBody",
    name: `TableBody-${bodyId}`,
    category,
    props: reuseBody?.props,
    children: bodyRows,
  });

  next.children = nextChildren.length > 0 ? nextChildren : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

function syncTableChildrenToProps(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const children = ensureChildrenArray(next);
  const header = children.find((c) => c.type === "TableHeader");
  const body = children.find((c) => c.type === "TableBody");
  p.showHeader = Boolean(header);

  const headerRow = header ? ensureChildrenArray(header).find((c) => c.type === "TableRow") : undefined;
  const headCells = headerRow ? ensureChildrenArray(headerRow).filter((c) => c.type === "TableHead") : [];
  if (headCells.length > 0) {
    p.columns = headCells.map((hc, i) => pickTextFromNode(hc.children?.[0]) ?? `Col ${i + 1}`);
  }

  const bodyRows = body ? ensureChildrenArray(body).filter((c) => c.type === "TableRow") : [];
  p.rowCount = bodyRows.length;

  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

function syncBreadcrumbPropsToChildren(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const category = next.category;
  const itemsRaw = p.items;
  const items = Array.isArray(itemsRaw) ? itemsRaw.filter((v) => typeof v === "string") as string[] : [];

  const existing = ensureChildrenArray(next).filter((c) => c.type === "BreadcrumbItem");
  const children: ComponentNode[] = items.map((label, i) => {
    const reuse = existing[i];
    const id = reuse?.id ?? newId();
    const reuseText = ensureChildrenArray(reuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");
    return {
      id,
      type: "BreadcrumbItem",
      name: `BreadcrumbItem-${id}`,
      category,
      props: reuse?.props,
      children: [makeTextNode(label, category, reuseText)],
    };
  });

  next.children = children.length > 0 ? children : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

function syncBreadcrumbChildrenToProps(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const items = ensureChildrenArray(next).filter((c) => c.type === "BreadcrumbItem");
  p.items = items.map((it, i) => pickTextFromNode(it.children?.[0]) ?? `Item ${i + 1}`);
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

function syncPaginationPropsToChildren(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const category = next.category;
  const pageCount = Math.max(0, Math.floor(propNum(p, "pageCount", 5)));
  const currentPage = Math.max(1, Math.floor(propNum(p, "currentPage", 1)));
  const showPrevNext = propBool(p, "showPrevNext", true);

  const existing = ensureChildrenArray(next).filter((c) => c.type === "PaginationItem");
  let idx = 0;
  const children: ComponentNode[] = [];

  if (showPrevNext) {
    const reuse = existing[idx++];
    const id = reuse?.id ?? newId();
    const reuseText = ensureChildrenArray(reuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");
    children.push({
      id,
      type: "PaginationItem",
      name: `PaginationItem-${id}`,
      category,
      props: { ...(reuse?.props as Record<string, unknown> | undefined), kind: "prev" },
      children: [makeTextNode("Prev", category, reuseText)],
    });
  }

  for (let pno = 1; pno <= pageCount; pno += 1) {
    const reuse = existing[idx++];
    const id = reuse?.id ?? newId();
    const reuseText = ensureChildrenArray(reuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");
    children.push({
      id,
      type: "PaginationItem",
      name: `PaginationItem-${id}`,
      category,
      props: { ...(reuse?.props as Record<string, unknown> | undefined), page: pno, active: pno === currentPage },
      children: [makeTextNode(String(pno), category, reuseText)],
    });
  }

  if (showPrevNext) {
    const reuse = existing[idx++];
    const id = reuse?.id ?? newId();
    const reuseText = ensureChildrenArray(reuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");
    children.push({
      id,
      type: "PaginationItem",
      name: `PaginationItem-${id}`,
      category,
      props: { ...(reuse?.props as Record<string, unknown> | undefined), kind: "next" },
      children: [makeTextNode("Next", category, reuseText)],
    });
  }

  next.children = children.length > 0 ? children : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

function syncPaginationChildrenToProps(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const items = ensureChildrenArray(next).filter((c) => c.type === "PaginationItem");
  const pages = items.filter((it) => {
    const ip = it.props as Record<string, unknown> | undefined;
    return typeof ip?.page === "number";
  });
  p.pageCount = pages.length;

  const active = pages.find((it) => Boolean((it.props as Record<string, unknown> | undefined)?.active));
  if (active) {
    const page = (active.props as Record<string, unknown> | undefined)?.page;
    if (typeof page === "number") p.currentPage = page;
  }

  p.showPrevNext = items.some((it) => (it.props as Record<string, unknown> | undefined)?.kind === "prev")
    || items.some((it) => (it.props as Record<string, unknown> | undefined)?.kind === "next");

  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

/**
 * Alert slots（props）→ children tree 同步
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
function syncAlertPropsToChildren(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);

  const showTitle = propBool(p, "showTitle", true);
  const showDescription = propBool(p, "showDescription", true);
  const titleText = propStr(p, "titleText", "Alert");
  const descriptionText = propStr(p, "descriptionText", "Alert description...");

  const existing = ensureChildrenArray(next);
  const reuseTitle = existing.find((c) => c.type === "AlertTitle");
  const reuseDesc = existing.find((c) => c.type === "AlertDescription");
  const rest = existing.filter((c) => c.type !== "AlertTitle" && c.type !== "AlertDescription");

  const children: ComponentNode[] = [];

  if (showTitle) {
    const titleId = reuseTitle?.id ?? newId();
    const titleTextReuse = reuseTitle ? ensureChildrenArray(reuseTitle).find((c) => c.type === "Text") : undefined;
    children.push({
      id: titleId,
      type: "AlertTitle",
      name: `AlertTitle-${titleId}`,
      category: next.category,
      props: reuseTitle?.props,
      children: [makeTextNode(titleText, next.category, titleTextReuse)],
    });
  }

  if (showDescription) {
    const descId = reuseDesc?.id ?? newId();
    const descTextReuse = reuseDesc ? ensureChildrenArray(reuseDesc).find((c) => c.type === "Text") : undefined;
    children.push({
      id: descId,
      type: "AlertDescription",
      name: `AlertDescription-${descId}`,
      category: next.category,
      props: reuseDesc?.props,
      children: [makeTextNode(descriptionText, next.category, descTextReuse)],
    });
  }

  next.children = [...children, ...rest];
  next.children = next.children.length > 0 ? next.children : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

/**
 * Alert children tree → slots（props）反向同步
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
function syncAlertChildrenToProps(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const children = ensureChildrenArray(next);

  const title = children.find((c) => c.type === "AlertTitle");
  const desc = children.find((c) => c.type === "AlertDescription");

  p.showTitle = Boolean(title);
  p.showDescription = Boolean(desc);

  if (title) p.titleText = pickTextFromNode(title.children?.[0]) ?? propStr(p, "titleText", "Alert");
  if (desc) p.descriptionText = pickTextFromNode(desc.children?.[0]) ?? propStr(p, "descriptionText", "Alert description...");

  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

/**
 * ResizablePanelGroup slots（props）→ children tree 同步
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
function syncResizablePanelGroupPropsToChildren(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const category = next.category;

  const showPanel1 = propBool(p, "showPanel1", true);
  const showHandle = propBool(p, "showHandle", true);
  const showPanel2 = propBool(p, "showPanel2", true);
  const panel1Text = propStr(p, "panel1Text", "Panel 1");
  const panel2Text = propStr(p, "panel2Text", "Panel 2");

  const existing = ensureChildrenArray(next);
  const reusePanels = existing.filter((c) => c.type === "ResizablePanel");
  const reuseHandles = existing.filter((c) => c.type === "ResizableHandle");

  const children: ComponentNode[] = [];

  if (showPanel1) {
    const reusePanel = reusePanels[0];
    const id = reusePanel?.id ?? newId();
    const panelChildren = ensureChildrenArray(reusePanel ?? ({} as ComponentNode));
    const textReuse = panelChildren.find((c) => c.type === "Text");
    const rest = panelChildren.filter((c) => c.type !== "Text");
    children.push({
      id,
      type: "ResizablePanel",
      name: `ResizablePanel-${id}`,
      category,
      props: reusePanel?.props,
      children: [makeTextNode(panel1Text, category, textReuse), ...rest],
    });
  }

  if (showHandle) {
    const reuseHandle = reuseHandles[0];
    const id = reuseHandle?.id ?? newId();
    children.push({
      id,
      type: "ResizableHandle",
      name: `ResizableHandle-${id}`,
      category,
      props: reuseHandle?.props,
    });
  }

  if (showPanel2) {
    const reusePanel = reusePanels[1] ?? reusePanels[0];
    const id = reusePanel?.id ?? newId();
    const panelChildren = ensureChildrenArray(reusePanel ?? ({} as ComponentNode));
    const textReuse = panelChildren.find((c) => c.type === "Text");
    const rest = panelChildren.filter((c) => c.type !== "Text");
    children.push({
      id,
      type: "ResizablePanel",
      name: `ResizablePanel-${id}`,
      category,
      props: reusePanel?.props,
      children: [makeTextNode(panel2Text, category, textReuse), ...rest],
    });
  }

  next.children = children.length > 0 ? children : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

/**
 * ResizablePanelGroup children tree → slots（props）反向同步
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
function syncResizablePanelGroupChildrenToProps(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const children = ensureChildrenArray(next);

  const panels = children.filter((c) => c.type === "ResizablePanel");
  const handles = children.filter((c) => c.type === "ResizableHandle");

  p.showPanel1 = panels.length >= 1;
  p.showPanel2 = panels.length >= 2;
  p.showHandle = handles.length > 0;

  if (panels[0]) p.panel1Text = pickTextFromNode(panels[0].children?.[0]) ?? propStr(p, "panel1Text", "Panel 1");
  if (panels[1]) p.panel2Text = pickTextFromNode(panels[1].children?.[0]) ?? propStr(p, "panel2Text", "Panel 2");

  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

/**
 * Popover/Tooltip/HoverCard slots（props）→ children tree 同步（通用）
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
function syncPopupPropsToChildren(node: ComponentNode, opts: { triggerType: string; contentType: string }): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const category = next.category;

  const showTrigger = propBool(p, "showTrigger", true);
  const showContent = propBool(p, "showContent", true);
  const triggerText = propStr(p, "triggerText", "Open");
  const contentText = propStr(p, "contentText", "");

  const existing = ensureChildrenArray(next);
  const reuseTrigger = existing.find((c) => c.type === opts.triggerType);
  const reuseContent = existing.find((c) => c.type === opts.contentType);

  const children: ComponentNode[] = [];

  if (showTrigger) {
    const triggerId = reuseTrigger?.id ?? newId();
    const reuseBtn = reuseTrigger ? ensureChildrenArray(reuseTrigger).find((c) => c.type === "Button") : undefined;
    const restTriggerChildren = reuseTrigger ? ensureChildrenArray(reuseTrigger).filter((c) => c.type !== "Button") : [];
    children.push({
      id: triggerId,
      type: opts.triggerType,
      name: `${opts.triggerType}-${triggerId}`,
      category,
      props: reuseTrigger?.props,
      children: [
        {
          id: reuseBtn?.id ?? newId(),
          type: "Button",
          name: `Button-${reuseBtn?.id ?? ""}`.replace(/-$/, ""),
          category,
          props: { ...(reuseBtn?.props as Record<string, unknown> | undefined), text: triggerText },
        },
        ...restTriggerChildren,
      ],
    });
  }

  if (showContent) {
    const contentId = reuseContent?.id ?? newId();
    const reuseText = reuseContent ? ensureChildrenArray(reuseContent).find((c) => c.type === "Text") : undefined;
    const rest = reuseContent ? ensureChildrenArray(reuseContent).filter((c) => c.type !== "Text") : [];
    children.push({
      id: contentId,
      type: opts.contentType,
      name: `${opts.contentType}-${contentId}`,
      category,
      props: reuseContent?.props,
      children: contentText ? [makeTextNode(contentText, category, reuseText), ...rest] : rest,
    });
  }

  next.children = children.length > 0 ? children : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

/**
 * Popover/Tooltip/HoverCard children tree → slots（props）反向同步（通用）
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
function syncPopupChildrenToProps(node: ComponentNode, opts: { triggerType: string; contentType: string }): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const children = ensureChildrenArray(next);

  const trigger = children.find((c) => c.type === opts.triggerType);
  const content = children.find((c) => c.type === opts.contentType);

  p.showTrigger = Boolean(trigger);
  p.showContent = Boolean(content);

  if (trigger) {
    const btn = trigger.children?.find((c) => c.type === "Button");
    p.triggerText = pickTextFromNode(btn) ?? propStr(p, "triggerText", "Open");
  }

  if (content) {
    const text = content.children?.find((c) => c.type === "Text");
    if (text) p.contentText = pickTextFromNode(text) ?? propStr(p, "contentText", "");
  }

  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

/**
 * DropdownMenu/ContextMenu slots（props）→ children tree 同步（通用）
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
function syncMenuPropsToChildren(node: ComponentNode, opts: { triggerType: string; contentType: string; itemType: string }): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const category = next.category;

  const showTrigger = propBool(p, "showTrigger", true);
  const showContent = propBool(p, "showContent", true);
  const triggerText = propStr(p, "triggerText", next.type === "ContextMenu" ? "Right click" : "Open");
  const itemsRaw = p.items;
  const items = Array.isArray(itemsRaw) ? itemsRaw.filter((v) => typeof v === "string") as string[] : [];

  const existing = ensureChildrenArray(next);
  const reuseTrigger = existing.find((c) => c.type === opts.triggerType);
  const reuseContent = existing.find((c) => c.type === opts.contentType);
  const reuseItems = reuseContent ? ensureChildrenArray(reuseContent).filter((c) => c.type === opts.itemType) : [];

  const children: ComponentNode[] = [];

  if (showTrigger) {
    const triggerId = reuseTrigger?.id ?? newId();
    const reuseBtn = reuseTrigger ? ensureChildrenArray(reuseTrigger).find((c) => c.type === "Button") : undefined;
    const restTriggerChildren = reuseTrigger ? ensureChildrenArray(reuseTrigger).filter((c) => c.type !== "Button") : [];
    children.push({
      id: triggerId,
      type: opts.triggerType,
      name: `${opts.triggerType}-${triggerId}`,
      category,
      props: reuseTrigger?.props,
      children: [
        {
          id: reuseBtn?.id ?? newId(),
          type: "Button",
          name: `Button-${reuseBtn?.id ?? ""}`.replace(/-$/, ""),
          category,
          props: { ...(reuseBtn?.props as Record<string, unknown> | undefined), text: triggerText },
        },
        ...restTriggerChildren,
      ],
    });
  }

  if (showContent) {
    const contentId = reuseContent?.id ?? newId();
    const contentChildren: ComponentNode[] = items.map((label, i) => {
      const reuse = reuseItems[i];
      const id = reuse?.id ?? newId();
      const reuseText = ensureChildrenArray(reuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");
      const rest = ensureChildrenArray(reuse ?? ({} as ComponentNode)).filter((c) => c.type !== "Text");
      return {
        id,
        type: opts.itemType,
        name: `${opts.itemType}-${id}`,
        category,
        props: reuse?.props,
        children: [makeTextNode(label, category, reuseText), ...rest],
      };
    });

    children.push({
      id: contentId,
      type: opts.contentType,
      name: `${opts.contentType}-${contentId}`,
      category,
      props: reuseContent?.props,
      children: contentChildren,
    });
  }

  next.children = children.length > 0 ? children : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

/**
 * DropdownMenu/ContextMenu children tree → slots（props）反向同步（通用）
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
function syncMenuChildrenToProps(node: ComponentNode, opts: { triggerType: string; contentType: string; itemType: string }): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const children = ensureChildrenArray(next);

  const trigger = children.find((c) => c.type === opts.triggerType);
  const content = children.find((c) => c.type === opts.contentType);

  p.showTrigger = Boolean(trigger);
  p.showContent = Boolean(content);

  if (trigger) {
    const btn = trigger.children?.find((c) => c.type === "Button");
    p.triggerText = pickTextFromNode(btn) ?? propStr(p, "triggerText", next.type === "ContextMenu" ? "Right click" : "Open");
  }

  if (content) {
    const items = ensureChildrenArray(content).filter((c) => c.type === opts.itemType);
    p.items = items.map((it, i) => pickTextFromNode(it.children?.[0]) ?? `Item ${i + 1}`);
  }

  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

/**
 * Drawer slots（props）→ children tree 同步
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
function syncDrawerPropsToChildren(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const category = next.category;

  const showTrigger = propBool(p, "showTrigger", true);
  const showHeader = propBool(p, "showHeader", true);
  const showContent = propBool(p, "showContent", true);
  const triggerText = propStr(p, "triggerText", "Open");
  const titleText = propStr(p, "titleText", "Drawer");
  const contentText = propStr(p, "contentText", "Drawer content...");

  const existing = ensureChildrenArray(next);
  const reuseTrigger = existing.find((c) => c.type === "DrawerTrigger");
  const reuseContent = existing.find((c) => c.type === "DrawerContent");

  const children: ComponentNode[] = [];

  if (showTrigger) {
    const triggerId = reuseTrigger?.id ?? newId();
    const reuseBtn = reuseTrigger ? ensureChildrenArray(reuseTrigger).find((c) => c.type === "Button") : undefined;
    const restTriggerChildren = reuseTrigger ? ensureChildrenArray(reuseTrigger).filter((c) => c.type !== "Button") : [];
    children.push({
      id: triggerId,
      type: "DrawerTrigger",
      name: `DrawerTrigger-${triggerId}`,
      category,
      props: reuseTrigger?.props,
      children: [
        {
          id: reuseBtn?.id ?? newId(),
          type: "Button",
          name: `Button-${reuseBtn?.id ?? ""}`.replace(/-$/, ""),
          category,
          props: { ...(reuseBtn?.props as Record<string, unknown> | undefined), text: triggerText },
        },
        ...restTriggerChildren,
      ],
    });
  }

  const contentId = reuseContent?.id ?? newId();
  const reuseContentChildren = ensureChildrenArray(reuseContent ?? ({} as ComponentNode));
  const reuseHeader = reuseContentChildren.find((c) => c.type === "DrawerHeader");
  const reuseText = reuseContentChildren.find((c) => c.type === "Text");
  const rest = reuseContentChildren.filter((c) => c.type !== "DrawerHeader" && c.type !== "Text");

  const contentChildren: ComponentNode[] = [];

  if (showHeader) {
    const headerId = reuseHeader?.id ?? newId();
    const headerTextReuse = reuseHeader ? ensureChildrenArray(reuseHeader).find((c) => c.type === "Text") : undefined;
    const restHeaderChildren = reuseHeader ? ensureChildrenArray(reuseHeader).filter((c) => c.type !== "Text") : [];
    contentChildren.push({
      id: headerId,
      type: "DrawerHeader",
      name: `DrawerHeader-${headerId}`,
      category,
      props: reuseHeader?.props,
      children: [makeTextNode(titleText, category, headerTextReuse), ...restHeaderChildren],
    });
  }

  if (showContent) {
    contentChildren.push(makeTextNode(contentText, category, reuseText));
  }

  contentChildren.push(...rest);

  children.push({
    id: contentId,
    type: "DrawerContent",
    name: `DrawerContent-${contentId}`,
    category,
    props: reuseContent?.props,
    children: contentChildren,
  });

  next.children = children.length > 0 ? children : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

/**
 * Drawer children tree → slots（props）反向同步
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
function syncDrawerChildrenToProps(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const children = ensureChildrenArray(next);

  const trigger = children.find((c) => c.type === "DrawerTrigger");
  const content = children.find((c) => c.type === "DrawerContent");

  p.showTrigger = Boolean(trigger);
  if (trigger) {
    const btn = trigger.children?.find((c) => c.type === "Button");
    p.triggerText = pickTextFromNode(btn) ?? propStr(p, "triggerText", "Open");
  }

  const header = content?.children?.find((c) => c.type === "DrawerHeader");
  p.showHeader = Boolean(header);
  if (header) p.titleText = pickTextFromNode(header.children?.[0]) ?? propStr(p, "titleText", "Drawer");

  const body = content?.children?.find((c) => c.type === "Text");
  p.showContent = Boolean(body);
  if (body) p.contentText = pickTextFromNode(body) ?? propStr(p, "contentText", "Drawer content...");

  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

/**
 * Collapsible slots（props）→ children tree 同步
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
function syncCollapsiblePropsToChildren(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const category = next.category;

  const showTrigger = propBool(p, "showTrigger", true);
  const showContent = propBool(p, "showContent", true);
  const triggerText = propStr(p, "triggerText", "Toggle");
  const contentText = propStr(p, "contentText", "Collapsible content...");

  const existing = ensureChildrenArray(next);
  const reuseTrigger = existing.find((c) => c.type === "CollapsibleTrigger");
  const reuseContent = existing.find((c) => c.type === "CollapsibleContent");

  const children: ComponentNode[] = [];

  if (showTrigger) {
    const triggerId = reuseTrigger?.id ?? newId();
    const reuseBtn = reuseTrigger ? ensureChildrenArray(reuseTrigger).find((c) => c.type === "Button") : undefined;
    const restTriggerChildren = reuseTrigger ? ensureChildrenArray(reuseTrigger).filter((c) => c.type !== "Button") : [];
    children.push({
      id: triggerId,
      type: "CollapsibleTrigger",
      name: `CollapsibleTrigger-${triggerId}`,
      category,
      props: reuseTrigger?.props,
      children: [
        {
          id: reuseBtn?.id ?? newId(),
          type: "Button",
          name: `Button-${reuseBtn?.id ?? ""}`.replace(/-$/, ""),
          category,
          props: { ...(reuseBtn?.props as Record<string, unknown> | undefined), text: triggerText },
        },
        ...restTriggerChildren,
      ],
    });
  }

  if (showContent) {
    const contentId = reuseContent?.id ?? newId();
    const reuseText = reuseContent ? ensureChildrenArray(reuseContent).find((c) => c.type === "Text") : undefined;
    const rest = reuseContent ? ensureChildrenArray(reuseContent).filter((c) => c.type !== "Text") : [];
    children.push({
      id: contentId,
      type: "CollapsibleContent",
      name: `CollapsibleContent-${contentId}`,
      category,
      props: reuseContent?.props,
      children: [makeTextNode(contentText, category, reuseText), ...rest],
    });
  }

  next.children = children.length > 0 ? children : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

/**
 * Collapsible children tree → slots（props）反向同步
 *
 * @author xiye
 * @date 2026-06-22
 * @since 3.0.0
 */
function syncCollapsibleChildrenToProps(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const children = ensureChildrenArray(next);

  const trigger = children.find((c) => c.type === "CollapsibleTrigger");
  const content = children.find((c) => c.type === "CollapsibleContent");

  p.showTrigger = Boolean(trigger);
  if (trigger) {
    const btn = trigger.children?.find((c) => c.type === "Button");
    p.triggerText = pickTextFromNode(btn) ?? propStr(p, "triggerText", "Toggle");
  }

  p.showContent = Boolean(content);
  if (content) {
    const text = content.children?.find((c) => c.type === "Text");
    if (text) p.contentText = pickTextFromNode(text) ?? propStr(p, "contentText", "Collapsible content...");
  }

  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

function syncOverlayPropsToChildren(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const category = next.category;

  if (next.type === "Dialog") {
    const showTrigger = propBool(p, "showTrigger", true);
    const showHeader = propBool(p, "showHeader", true);
    const showDescription = propBool(p, "showDescription", true);
    const showFooter = propBool(p, "showFooter", true);
    const triggerText = propStr(p, "triggerText", "Open");
    const titleText = propStr(p, "titleText", "Dialog title");
    const descriptionText = propStr(p, "descriptionText", "Dialog description...");
    const primaryActionText = propStr(p, "primaryActionText", "Confirm");
    const secondaryActionText = propStr(p, "secondaryActionText", "Cancel");

    const existing = ensureChildrenArray(next);
    const reuseTrigger = existing.find((c) => c.type === "DialogTrigger");
    const reuseContent = existing.find((c) => c.type === "DialogContent");

    const children: ComponentNode[] = [];

    if (showTrigger) {
      const triggerId = reuseTrigger?.id ?? newId();
      const reuseBtn = reuseTrigger ? ensureChildrenArray(reuseTrigger).find((c) => c.type === "Button") : undefined;
      children.push({
        id: triggerId,
        type: "DialogTrigger",
        name: `DialogTrigger-${triggerId}`,
        category,
        props: reuseTrigger?.props,
        children: [
          {
            id: reuseBtn?.id ?? newId(),
            type: "Button",
            name: `Button-${reuseBtn?.id ?? ""}`.replace(/-$/, ""),
            category,
            props: { ...(reuseBtn?.props as Record<string, unknown> | undefined), text: triggerText },
          },
        ],
      });
    }

    const contentId = reuseContent?.id ?? newId();
    const reuseContentChildren = ensureChildrenArray(reuseContent ?? ({} as ComponentNode));
    const reuseHeader = reuseContentChildren.find((c) => c.type === "DialogHeader");
    const reuseFooter = reuseContentChildren.find((c) => c.type === "DialogFooter");

    const contentChildren: ComponentNode[] = [];

    if (showHeader) {
      const headerId = reuseHeader?.id ?? newId();
      const reuseHeaderChildren = ensureChildrenArray(reuseHeader ?? ({} as ComponentNode));
      const reuseTitle = reuseHeaderChildren.find((c) => c.type === "DialogTitle");
      const reuseDesc = reuseHeaderChildren.find((c) => c.type === "DialogDescription");
      const titleTextReuse = reuseTitle ? ensureChildrenArray(reuseTitle).find((c) => c.type === "Text") : undefined;
      const descTextReuse = reuseDesc ? ensureChildrenArray(reuseDesc).find((c) => c.type === "Text") : undefined;

      const headerChildren: ComponentNode[] = [
        {
          id: reuseTitle?.id ?? newId(),
          type: "DialogTitle",
          name: `DialogTitle-${reuseTitle?.id ?? ""}`.replace(/-$/, ""),
          category,
          props: reuseTitle?.props,
          children: [makeTextNode(titleText, category, titleTextReuse)],
        },
      ];
      if (showDescription) {
        headerChildren.push({
          id: reuseDesc?.id ?? newId(),
          type: "DialogDescription",
          name: `DialogDescription-${reuseDesc?.id ?? ""}`.replace(/-$/, ""),
          category,
          props: reuseDesc?.props,
          children: [makeTextNode(descriptionText, category, descTextReuse)],
        });
      }
      contentChildren.push({
        id: headerId,
        type: "DialogHeader",
        name: `DialogHeader-${headerId}`,
        category,
        props: reuseHeader?.props,
        children: headerChildren,
      });
    }

    if (showFooter) {
      const footerId = reuseFooter?.id ?? newId();
      const reuseFooterChildren = ensureChildrenArray(reuseFooter ?? ({} as ComponentNode));
      const reuseSecondary = reuseFooterChildren.find((c) => c.type === "Button");
      const reusePrimary = reuseFooterChildren.filter((c) => c.type === "Button")[1];
      contentChildren.push({
        id: footerId,
        type: "DialogFooter",
        name: `DialogFooter-${footerId}`,
        category,
        props: reuseFooter?.props,
        children: [
          {
            id: reuseSecondary?.id ?? newId(),
            type: "Button",
            name: `Button-${reuseSecondary?.id ?? ""}`.replace(/-$/, ""),
            category,
            props: { ...(reuseSecondary?.props as Record<string, unknown> | undefined), text: secondaryActionText, variant: "outline" },
          },
          {
            id: reusePrimary?.id ?? newId(),
            type: "Button",
            name: `Button-${reusePrimary?.id ?? ""}`.replace(/-$/, ""),
            category,
            props: { ...(reusePrimary?.props as Record<string, unknown> | undefined), text: primaryActionText },
          },
        ],
      });
    }

    children.push({
      id: contentId,
      type: "DialogContent",
      name: `DialogContent-${contentId}`,
      category,
      props: reuseContent?.props,
      children: contentChildren,
    });

    next.children = children.length > 0 ? children : undefined;
    next.props = Object.keys(p).length > 0 ? p : undefined;
    return next;
  }

  if (next.type === "Sheet") {
    const showTrigger = propBool(p, "showTrigger", true);
    const showHeader = propBool(p, "showHeader", true);
    const showContent = propBool(p, "showContent", true);
    const triggerText = propStr(p, "triggerText", "Open");
    const titleText = propStr(p, "titleText", "Sheet");
    const descriptionText = propStr(p, "descriptionText", "Sheet description...");
    const bodyText = propStr(p, "bodyText", "Sheet content...");

    const existing = ensureChildrenArray(next);
    const reuseTrigger = existing.find((c) => c.type === "SheetTrigger");
    const reuseContent = existing.find((c) => c.type === "SheetContent");

    const children: ComponentNode[] = [];

    if (showTrigger) {
      const triggerId = reuseTrigger?.id ?? newId();
      const reuseBtn = reuseTrigger ? ensureChildrenArray(reuseTrigger).find((c) => c.type === "Button") : undefined;
      children.push({
        id: triggerId,
        type: "SheetTrigger",
        name: `SheetTrigger-${triggerId}`,
        category,
        props: reuseTrigger?.props,
        children: [
          {
            id: reuseBtn?.id ?? newId(),
            type: "Button",
            name: `Button-${reuseBtn?.id ?? ""}`.replace(/-$/, ""),
            category,
            props: { ...(reuseBtn?.props as Record<string, unknown> | undefined), text: triggerText },
          },
        ],
      });
    }

    const contentId = reuseContent?.id ?? newId();
    const reuseContentChildren = ensureChildrenArray(reuseContent ?? ({} as ComponentNode));
    const reuseHeader = reuseContentChildren.find((c) => c.type === "SheetHeader");
    const reuseBodyText = reuseContentChildren.find((c) => c.type === "Text");

    const contentChildren: ComponentNode[] = [];

    if (showHeader) {
      const headerId = reuseHeader?.id ?? newId();
      const reuseHeaderChildren = ensureChildrenArray(reuseHeader ?? ({} as ComponentNode));
      const reuseTitle = reuseHeaderChildren.find((c) => c.type === "SheetTitle");
      const reuseDesc = reuseHeaderChildren.find((c) => c.type === "SheetDescription");
      const titleTextReuse = reuseTitle ? ensureChildrenArray(reuseTitle).find((c) => c.type === "Text") : undefined;
      const descTextReuse = reuseDesc ? ensureChildrenArray(reuseDesc).find((c) => c.type === "Text") : undefined;
      contentChildren.push({
        id: headerId,
        type: "SheetHeader",
        name: `SheetHeader-${headerId}`,
        category,
        props: reuseHeader?.props,
        children: [
          {
            id: reuseTitle?.id ?? newId(),
            type: "SheetTitle",
            name: `SheetTitle-${reuseTitle?.id ?? ""}`.replace(/-$/, ""),
            category,
            props: reuseTitle?.props,
            children: [makeTextNode(titleText, category, titleTextReuse)],
          },
          {
            id: reuseDesc?.id ?? newId(),
            type: "SheetDescription",
            name: `SheetDescription-${reuseDesc?.id ?? ""}`.replace(/-$/, ""),
            category,
            props: reuseDesc?.props,
            children: [makeTextNode(descriptionText, category, descTextReuse)],
          },
        ],
      });
    }

    if (showContent) {
      contentChildren.push(makeTextNode(bodyText, category, reuseBodyText));
    }

    children.push({
      id: contentId,
      type: "SheetContent",
      name: `SheetContent-${contentId}`,
      category,
      props: reuseContent?.props,
      children: contentChildren,
    });

    next.children = children.length > 0 ? children : undefined;
    next.props = Object.keys(p).length > 0 ? p : undefined;
    return next;
  }

  if (next.type === "AlertDialog") {
    const showTrigger = propBool(p, "showTrigger", true);
    const showHeader = propBool(p, "showHeader", true);
    const showDescription = propBool(p, "showDescription", true);
    const showActions = propBool(p, "showActions", true);
    const showCancel = propBool(p, "showCancel", true);
    const triggerText = propStr(p, "triggerText", "Open");
    const titleText = propStr(p, "titleText", "Are you absolutely sure?");
    const descriptionText = propStr(p, "descriptionText", "This action cannot be undone.");
    const actionText = propStr(p, "actionText", "Continue");
    const cancelText = propStr(p, "cancelText", "Cancel");

    const existing = ensureChildrenArray(next);
    const reuseTrigger = existing.find((c) => c.type === "AlertDialogTrigger");
    const reuseContent = existing.find((c) => c.type === "AlertDialogContent");

    const children: ComponentNode[] = [];

    if (showTrigger) {
      const triggerId = reuseTrigger?.id ?? newId();
      const reuseBtn = reuseTrigger ? ensureChildrenArray(reuseTrigger).find((c) => c.type === "Button") : undefined;
      children.push({
        id: triggerId,
        type: "AlertDialogTrigger",
        name: `AlertDialogTrigger-${triggerId}`,
        category,
        props: reuseTrigger?.props,
        children: [
          {
            id: reuseBtn?.id ?? newId(),
            type: "Button",
            name: `Button-${reuseBtn?.id ?? ""}`.replace(/-$/, ""),
            category,
            props: { ...(reuseBtn?.props as Record<string, unknown> | undefined), text: triggerText },
          },
        ],
      });
    }

    const contentId = reuseContent?.id ?? newId();
    const reuseContentChildren = ensureChildrenArray(reuseContent ?? ({} as ComponentNode));
    const reuseHeader = reuseContentChildren.find((c) => c.type === "AlertDialogHeader");
    const reuseAction = reuseContentChildren.find((c) => c.type === "AlertDialogAction");
    const reuseCancel = reuseContentChildren.find((c) => c.type === "AlertDialogCancel");

    const contentChildren: ComponentNode[] = [];

    if (showHeader) {
      const headerId = reuseHeader?.id ?? newId();
      const reuseHeaderChildren = ensureChildrenArray(reuseHeader ?? ({} as ComponentNode));
      const reuseTitle = reuseHeaderChildren.find((c) => c.type === "AlertDialogTitle");
      const reuseDesc = reuseHeaderChildren.find((c) => c.type === "AlertDialogDescription");
      const titleTextReuse = reuseTitle ? ensureChildrenArray(reuseTitle).find((c) => c.type === "Text") : undefined;
      const descTextReuse = reuseDesc ? ensureChildrenArray(reuseDesc).find((c) => c.type === "Text") : undefined;
      const headerChildren: ComponentNode[] = [
        {
          id: reuseTitle?.id ?? newId(),
          type: "AlertDialogTitle",
          name: `AlertDialogTitle-${reuseTitle?.id ?? ""}`.replace(/-$/, ""),
          category,
          props: reuseTitle?.props,
          children: [makeTextNode(titleText, category, titleTextReuse)],
        },
      ];
      if (showDescription) {
        headerChildren.push({
          id: reuseDesc?.id ?? newId(),
          type: "AlertDialogDescription",
          name: `AlertDialogDescription-${reuseDesc?.id ?? ""}`.replace(/-$/, ""),
          category,
          props: reuseDesc?.props,
          children: [makeTextNode(descriptionText, category, descTextReuse)],
        });
      }
      contentChildren.push({
        id: headerId,
        type: "AlertDialogHeader",
        name: `AlertDialogHeader-${headerId}`,
        category,
        props: reuseHeader?.props,
        children: headerChildren,
      });
    }

    if (showActions) {
      if (showCancel) {
        const cancelId = reuseCancel?.id ?? newId();
        const reuseBtn = reuseCancel ? ensureChildrenArray(reuseCancel).find((c) => c.type === "Button") : undefined;
        contentChildren.push({
          id: cancelId,
          type: "AlertDialogCancel",
          name: `AlertDialogCancel-${cancelId}`,
          category,
          props: reuseCancel?.props,
          children: [
            {
              id: reuseBtn?.id ?? newId(),
              type: "Button",
              name: `Button-${reuseBtn?.id ?? ""}`.replace(/-$/, ""),
              category,
              props: { ...(reuseBtn?.props as Record<string, unknown> | undefined), text: cancelText, variant: "outline" },
            },
          ],
        });
      }
      const actionId = reuseAction?.id ?? newId();
      const reuseBtn = reuseAction ? ensureChildrenArray(reuseAction).find((c) => c.type === "Button") : undefined;
      contentChildren.push({
        id: actionId,
        type: "AlertDialogAction",
        name: `AlertDialogAction-${actionId}`,
        category,
        props: reuseAction?.props,
        children: [
          {
            id: reuseBtn?.id ?? newId(),
            type: "Button",
            name: `Button-${reuseBtn?.id ?? ""}`.replace(/-$/, ""),
            category,
            props: { ...(reuseBtn?.props as Record<string, unknown> | undefined), text: actionText, variant: "destructive" },
          },
        ],
      });
    }

    children.push({
      id: contentId,
      type: "AlertDialogContent",
      name: `AlertDialogContent-${contentId}`,
      category,
      props: reuseContent?.props,
      children: contentChildren,
    });

    next.children = children.length > 0 ? children : undefined;
    next.props = Object.keys(p).length > 0 ? p : undefined;
    return next;
  }

  return next;
}

function syncOverlayChildrenToProps(node: ComponentNode): ComponentNode {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const children = ensureChildrenArray(next);

  if (next.type === "Dialog") {
    const trigger = children.find((c) => c.type === "DialogTrigger");
    const content = children.find((c) => c.type === "DialogContent");
    p.showTrigger = Boolean(trigger);
    if (trigger) {
      const btn = trigger.children?.find((c) => c.type === "Button");
      p.triggerText = pickTextFromNode(btn) ?? propStr(p, "triggerText", "Open");
    }
    p.showHeader = Boolean(content?.children?.find((c) => c.type === "DialogHeader"));
    p.showFooter = Boolean(content?.children?.find((c) => c.type === "DialogFooter"));
    const header = content?.children?.find((c) => c.type === "DialogHeader");
    const title = header?.children?.find((c) => c.type === "DialogTitle");
    const desc = header?.children?.find((c) => c.type === "DialogDescription");
    p.titleText = pickTextFromNode(title?.children?.[0]) ?? propStr(p, "titleText", "Dialog title");
    p.showDescription = Boolean(desc);
    if (desc) p.descriptionText = pickTextFromNode(desc.children?.[0]) ?? propStr(p, "descriptionText", "Dialog description...");
    const footer = content?.children?.find((c) => c.type === "DialogFooter");
    const buttons = footer ? ensureChildrenArray(footer).filter((c) => c.type === "Button") : [];
    if (buttons[0]) p.secondaryActionText = pickTextFromNode(buttons[0]) ?? propStr(p, "secondaryActionText", "Cancel");
    if (buttons[1]) p.primaryActionText = pickTextFromNode(buttons[1]) ?? propStr(p, "primaryActionText", "Confirm");
    next.props = Object.keys(p).length > 0 ? p : undefined;
    return next;
  }

  if (next.type === "Sheet") {
    const trigger = children.find((c) => c.type === "SheetTrigger");
    const content = children.find((c) => c.type === "SheetContent");
    p.showTrigger = Boolean(trigger);
    if (trigger) {
      const btn = trigger.children?.find((c) => c.type === "Button");
      p.triggerText = pickTextFromNode(btn) ?? propStr(p, "triggerText", "Open");
    }
    const header = content?.children?.find((c) => c.type === "SheetHeader");
    p.showHeader = Boolean(header);
    const title = header?.children?.find((c) => c.type === "SheetTitle");
    const desc = header?.children?.find((c) => c.type === "SheetDescription");
    if (title) p.titleText = pickTextFromNode(title.children?.[0]) ?? propStr(p, "titleText", "Sheet");
    if (desc) p.descriptionText = pickTextFromNode(desc.children?.[0]) ?? propStr(p, "descriptionText", "Sheet description...");
    const bodyText = content?.children?.find((c) => c.type === "Text");
    p.showContent = Boolean(bodyText);
    if (bodyText) p.bodyText = pickTextFromNode(bodyText) ?? propStr(p, "bodyText", "Sheet content...");
    next.props = Object.keys(p).length > 0 ? p : undefined;
    return next;
  }

  if (next.type === "AlertDialog") {
    const trigger = children.find((c) => c.type === "AlertDialogTrigger");
    const content = children.find((c) => c.type === "AlertDialogContent");
    p.showTrigger = Boolean(trigger);
    if (trigger) {
      const btn = trigger.children?.find((c) => c.type === "Button");
      p.triggerText = pickTextFromNode(btn) ?? propStr(p, "triggerText", "Open");
    }
    const header = content?.children?.find((c) => c.type === "AlertDialogHeader");
    p.showHeader = Boolean(header);
    const title = header?.children?.find((c) => c.type === "AlertDialogTitle");
    const desc = header?.children?.find((c) => c.type === "AlertDialogDescription");
    if (title) p.titleText = pickTextFromNode(title.children?.[0]) ?? propStr(p, "titleText", "Are you absolutely sure?");
    p.showDescription = Boolean(desc);
    if (desc) p.descriptionText = pickTextFromNode(desc.children?.[0]) ?? propStr(p, "descriptionText", "This action cannot be undone.");
    const action = content?.children?.find((c) => c.type === "AlertDialogAction");
    const cancel = content?.children?.find((c) => c.type === "AlertDialogCancel");
    p.showActions = Boolean(action || cancel);
    p.showCancel = Boolean(cancel);
    if (action) {
      const btn = action.children?.find((c) => c.type === "Button");
      p.actionText = pickTextFromNode(btn) ?? propStr(p, "actionText", "Continue");
    }
    if (cancel) {
      const btn = cancel.children?.find((c) => c.type === "Button");
      p.cancelText = pickTextFromNode(btn) ?? propStr(p, "cancelText", "Cancel");
    }
    next.props = Object.keys(p).length > 0 ? p : undefined;
    return next;
  }

  return next;
}

/**
 * 将“聚合组件 slots（props）”同步为 children tree（递归）
 *
 * @param node - 目标组件节点
 * @returns 同步后的新节点（不修改入参）
 */
export function syncAggregateSlotsPropsToChildren(node: ComponentNode): ComponentNode {
  const base = cloneNode(node);
  const synced = (() => {
    switch (base.type) {
      case "Alert":
        return syncAlertPropsToChildren(base);
      case "Card":
        return syncCardPropsToChildren(base);
      case "Tabs":
        return syncTabsPropsToChildren(base);
      case "Accordion":
        return syncAccordionPropsToChildren(base);
      case "Table":
        return syncTablePropsToChildren(base);
      case "ResizablePanelGroup":
        return syncResizablePanelGroupPropsToChildren(base);
      case "Select":
        return syncSelectPropsToChildren(base);
      case "RadioGroup":
        return syncRadioGroupPropsToChildren(base);
      case "Breadcrumb":
        return syncBreadcrumbPropsToChildren(base);
      case "Pagination":
        return syncPaginationPropsToChildren(base);
      case "Popover":
        return syncPopupPropsToChildren(base, { triggerType: "PopoverTrigger", contentType: "PopoverContent" });
      case "Tooltip":
        return syncPopupPropsToChildren(base, { triggerType: "TooltipTrigger", contentType: "TooltipContent" });
      case "HoverCard":
        return syncPopupPropsToChildren(base, { triggerType: "HoverCardTrigger", contentType: "HoverCardContent" });
      case "DropdownMenu":
        return syncMenuPropsToChildren(base, { triggerType: "DropdownMenuTrigger", contentType: "DropdownMenuContent", itemType: "DropdownMenuItem" });
      case "ContextMenu":
        return syncMenuPropsToChildren(base, { triggerType: "ContextMenuTrigger", contentType: "ContextMenuContent", itemType: "ContextMenuItem" });
      case "Drawer":
        return syncDrawerPropsToChildren(base);
      case "Collapsible":
        return syncCollapsiblePropsToChildren(base);
      case "Dialog":
      case "Sheet":
      case "AlertDialog":
        return syncOverlayPropsToChildren(base);
      default:
        return base;
    }
  })();

  if (synced.children && synced.children.length > 0) {
    synced.children = synced.children.map(syncAggregateSlotsPropsToChildren);
  }
  return synced;
}

/**
 * 将 children tree 反向同步为“聚合组件 slots（props）”（递归）
 *
 * @param node - 目标组件节点
 * @returns 同步后的新节点（不修改入参）
 */
export function syncAggregateSlotsChildrenToProps(node: ComponentNode): ComponentNode {
  const base = cloneNode(node);
  const synced = (() => {
    switch (base.type) {
      case "Alert":
        return syncAlertChildrenToProps(base);
      case "Card":
        return syncCardChildrenToProps(base);
      case "Tabs":
        return syncTabsChildrenToProps(base);
      case "Accordion":
        return syncAccordionChildrenToProps(base);
      case "Table":
        return syncTableChildrenToProps(base);
      case "ResizablePanelGroup":
        return syncResizablePanelGroupChildrenToProps(base);
      case "Select":
        return syncSelectChildrenToProps(base);
      case "RadioGroup":
        return syncRadioGroupChildrenToProps(base);
      case "Breadcrumb":
        return syncBreadcrumbChildrenToProps(base);
      case "Pagination":
        return syncPaginationChildrenToProps(base);
      case "Popover":
        return syncPopupChildrenToProps(base, { triggerType: "PopoverTrigger", contentType: "PopoverContent" });
      case "Tooltip":
        return syncPopupChildrenToProps(base, { triggerType: "TooltipTrigger", contentType: "TooltipContent" });
      case "HoverCard":
        return syncPopupChildrenToProps(base, { triggerType: "HoverCardTrigger", contentType: "HoverCardContent" });
      case "DropdownMenu":
        return syncMenuChildrenToProps(base, { triggerType: "DropdownMenuTrigger", contentType: "DropdownMenuContent", itemType: "DropdownMenuItem" });
      case "ContextMenu":
        return syncMenuChildrenToProps(base, { triggerType: "ContextMenuTrigger", contentType: "ContextMenuContent", itemType: "ContextMenuItem" });
      case "Drawer":
        return syncDrawerChildrenToProps(base);
      case "Collapsible":
        return syncCollapsibleChildrenToProps(base);
      case "Dialog":
      case "Sheet":
      case "AlertDialog":
        return syncOverlayChildrenToProps(base);
      default:
        return base;
    }
  })();

  if (synced.children && synced.children.length > 0) {
    synced.children = synced.children.map(syncAggregateSlotsChildrenToProps);
  }
  return synced;
}

/**
 * 在一次更新中执行 slots 双向同步（根据来源决定方向）
 *
 * 约定：
 * - source="props"：将 props 视为真实来源，覆盖/重建 children tree；
 * - source="children"：将 children 视为真实来源，回写 slots props；
 *
 * @param node - 目标节点
 * @param source - 变更来源
 */
export function syncAggregateSlots(node: ComponentNode, source: AggregateSlotSyncSource): ComponentNode {
  if (source === "props") return syncAggregateSlotsPropsToChildren(node);
  return syncAggregateSlotsChildrenToProps(node);
}
