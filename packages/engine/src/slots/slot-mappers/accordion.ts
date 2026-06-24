/**
 * Accordion 组件 customMapper
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { ComponentNode } from "../../schemas/page.schema";
import { cloneNode, ensureProps, ensureChildrenArray, pickTextFromNode, makeTextNode, newId, isRecord } from "../aggregate-slot-engine";

export const accordionMapper = {
  propsToChildren(node: ComponentNode): ComponentNode {
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
  },

  childrenToProps(node: ComponentNode): ComponentNode {
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
  },
};
