/**
 * Select 组件 customMapper
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { ComponentNode } from "../../schemas/page.schema";
import { cloneNode, ensureProps, ensureChildrenArray, pickTextFromNode, newId } from "../aggregate-slot-engine";

export const selectMapper = {
  propsToChildren(node: ComponentNode): ComponentNode {
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
  },

  childrenToProps(node: ComponentNode): ComponentNode {
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
  },
};
