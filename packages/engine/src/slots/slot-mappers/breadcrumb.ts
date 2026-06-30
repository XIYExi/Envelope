/**
 * Breadcrumb 组件 customMapper
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { ComponentNode } from "../../schemas/page.schema";
import { cloneNode, ensureProps, ensureChildrenArray, pickTextFromNode, makeTextNode, newId } from "../aggregate-slot-engine";

export const breadcrumbMapper = {
  propsToChildren(node: ComponentNode): ComponentNode {
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
  },

  childrenToProps(node: ComponentNode): ComponentNode {
    const next = cloneNode(node);
    const p = ensureProps(next);
    const items = ensureChildrenArray(next).filter((c) => c.type === "BreadcrumbItem");
    p.items = items.map((it, i) => pickTextFromNode(it.children?.[0]) ?? `Item ${i + 1}`);
    next.props = Object.keys(p).length > 0 ? p : undefined;
    return next;
  },
};
