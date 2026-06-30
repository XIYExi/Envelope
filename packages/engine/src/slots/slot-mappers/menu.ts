/**
 * DropdownMenu / ContextMenu 组件 customMapper
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { ComponentNode } from "../../schemas/page.schema";
import { cloneNode, ensureProps, ensureChildrenArray, propBool, propStr, pickTextFromNode, makeTextNode, newId } from "../aggregate-slot-engine";

export const menuMapper = {
  propsToChildren(node: ComponentNode): ComponentNode {
    const next = cloneNode(node);
    const p = ensureProps(next);
    const category = next.category;

    const showTrigger = propBool(p, "showTrigger", true);
    const showContent = propBool(p, "showContent", true);
    const triggerText = propStr(p, "triggerText", next.type === "ContextMenu" ? "Right click" : "Open");
    const itemsRaw = p.items;
    const items = Array.isArray(itemsRaw) ? itemsRaw.filter((v) => typeof v === "string") as string[] : [];

    const existing = ensureChildrenArray(next);
    const reuseTrigger = existing.find((c) => c.type === `${next.type}Trigger`);
    const reuseContent = existing.find((c) => c.type === `${next.type}Content`);
    const reuseItems = reuseContent ? ensureChildrenArray(reuseContent).filter((c) => c.type === `${next.type}Item`) : [];

    const children: ComponentNode[] = [];

    if (showTrigger) {
      const triggerId = reuseTrigger?.id ?? newId();
      const reuseBtn = reuseTrigger ? ensureChildrenArray(reuseTrigger).find((c) => c.type === "Button") : undefined;
      const restTriggerChildren = reuseTrigger ? ensureChildrenArray(reuseTrigger).filter((c) => c.type !== "Button") : [];
      children.push({
        id: triggerId,
        type: `${next.type}Trigger`,
        name: `${next.type}Trigger-${triggerId}`,
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
          type: `${next.type}Item`,
          name: `${next.type}Item-${id}`,
          category,
          props: reuse?.props,
          children: [makeTextNode(label, category, reuseText), ...rest],
        };
      });

      children.push({
        id: contentId,
        type: `${next.type}Content`,
        name: `${next.type}Content-${contentId}`,
        category,
        props: reuseContent?.props,
        children: contentChildren,
      });
    }

    next.children = children.length > 0 ? children : undefined;
    next.props = Object.keys(p).length > 0 ? p : undefined;
    return next;
  },

  childrenToProps(node: ComponentNode): ComponentNode {
    const next = cloneNode(node);
    const p = ensureProps(next);
    const children = ensureChildrenArray(next);

    const trigger = children.find((c) => c.type === `${next.type}Trigger`);
    const content = children.find((c) => c.type === `${next.type}Content`);

    p.showTrigger = Boolean(trigger);
    p.showContent = Boolean(content);

    if (trigger) {
      const btn = trigger.children?.find((c) => c.type === "Button");
      p.triggerText = pickTextFromNode(btn) ?? propStr(p, "triggerText", next.type === "ContextMenu" ? "Right click" : "Open");
    }

    if (content) {
      const items = ensureChildrenArray(content).filter((c) => c.type === `${next.type}Item`);
      p.items = items.map((it, i) => pickTextFromNode(it.children?.[0]) ?? `Item ${i + 1}`);
    }

    next.props = Object.keys(p).length > 0 ? p : undefined;
    return next;
  },
};
