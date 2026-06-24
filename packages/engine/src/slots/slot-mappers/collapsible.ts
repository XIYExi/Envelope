/**
 * Collapsible 组件 customMapper
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { ComponentNode } from "../../schemas/page.schema";
import { cloneNode, ensureProps, ensureChildrenArray, propBool, propStr, pickTextFromNode, makeTextNode, newId } from "../aggregate-slot-engine";

export const collapsibleMapper = {
  propsToChildren(node: ComponentNode): ComponentNode {
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
  },

  childrenToProps(node: ComponentNode): ComponentNode {
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
  },
};
