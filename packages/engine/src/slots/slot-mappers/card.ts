/**
 * Card 组件 customMapper
 *
 * Card → CardHeader / CardContent / CardFooter 双向映射。
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { ComponentNode } from "../../schemas/page.schema";
import { cloneNode, ensureProps, ensureChildrenArray, propBool, propStr, pickTextFromNode, makeTextNode, newId } from "../aggregate-slot-engine";

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

export const cardMapper = {
  propsToChildren(node: ComponentNode): ComponentNode {
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
  },

  childrenToProps(node: ComponentNode): ComponentNode {
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
  },
};
