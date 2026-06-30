/**
 * Pagination 组件 customMapper
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { ComponentNode } from "../../schemas/page.schema";
import { cloneNode, ensureProps, ensureChildrenArray, propBool, propNum, pickTextFromNode, makeTextNode, newId } from "../aggregate-slot-engine";

export const paginationMapper = {
  propsToChildren(node: ComponentNode): ComponentNode {
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
  },

  childrenToProps(node: ComponentNode): ComponentNode {
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
  },
};
