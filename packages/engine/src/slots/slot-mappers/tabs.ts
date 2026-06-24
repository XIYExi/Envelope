/**
 * Tabs 组件 customMapper
 *
 * Tabs → TabsList/TabsTrigger + TabsContent 双向映射。
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { ComponentNode } from "../../schemas/page.schema";
import { cloneNode, ensureProps, ensureChildrenArray, propBool, propStr, propNum, pickTextFromNode, makeTextNode, newId, isRecord } from "../aggregate-slot-engine";

export const tabsMapper = {
  propsToChildren(node: ComponentNode): ComponentNode {
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
  },

  childrenToProps(node: ComponentNode): ComponentNode {
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
  },
};
