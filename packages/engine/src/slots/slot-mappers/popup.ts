/**
 * Popover / Tooltip / HoverCard 组件 customMapper（通用）
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { ComponentNode } from "../../schemas/page.schema";
import { cloneNode, ensureProps, ensureChildrenArray, propBool, propStr, pickTextFromNode, makeTextNode, newId } from "../aggregate-slot-engine";

export function makePopupMapper(triggerType: string, contentType: string) {
  return {
    propsToChildren(node: ComponentNode): ComponentNode {
      const next = cloneNode(node);
      const p = ensureProps(next);
      const category = next.category;

      const showTrigger = propBool(p, "showTrigger", true);
      const showContent = propBool(p, "showContent", true);
      const triggerText = propStr(p, "triggerText", "Open");
      const contentText = propStr(p, "contentText", "");

      const existing = ensureChildrenArray(next);
      const reuseTrigger = existing.find((c) => c.type === triggerType);
      const reuseContent = existing.find((c) => c.type === contentType);

      const children: ComponentNode[] = [];

      if (showTrigger) {
        const triggerId = reuseTrigger?.id ?? newId();
        const reuseBtn = reuseTrigger ? ensureChildrenArray(reuseTrigger).find((c) => c.type === "Button") : undefined;
        const restTriggerChildren = reuseTrigger ? ensureChildrenArray(reuseTrigger).filter((c) => c.type !== "Button") : [];
        children.push({
          id: triggerId,
          type: triggerType,
          name: `${triggerType}-${triggerId}`,
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
          type: contentType,
          name: `${contentType}-${contentId}`,
          category,
          props: reuseContent?.props,
          children: contentText ? [makeTextNode(contentText, category, reuseText), ...rest] : rest,
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

      const trigger = children.find((c) => c.type === triggerType);
      const content = children.find((c) => c.type === contentType);

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
    },
  };
}

export const popoverMapper = makePopupMapper("PopoverTrigger", "PopoverContent");
export const tooltipMapper = makePopupMapper("TooltipTrigger", "TooltipContent");
export const hoverCardMapper = makePopupMapper("HoverCardTrigger", "HoverCardContent");
