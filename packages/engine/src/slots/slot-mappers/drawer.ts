/**
 * Drawer 组件 customMapper
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { ComponentNode } from "../../schemas/page.schema";
import { cloneNode, ensureProps, ensureChildrenArray, propBool, propStr, pickTextFromNode, makeTextNode, newId } from "../aggregate-slot-engine";

export const drawerMapper = {
  propsToChildren(node: ComponentNode): ComponentNode {
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
  },

  childrenToProps(node: ComponentNode): ComponentNode {
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
  },
};
