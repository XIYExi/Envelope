/**
 * Dialog / Sheet / AlertDialog 组件 customMapper
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { ComponentNode } from "../../schemas/page.schema";
import { cloneNode, ensureProps, ensureChildrenArray, propBool, propStr, pickTextFromNode, makeTextNode, newId } from "../aggregate-slot-engine";

export const overlayMapper = {
  propsToChildren(node: ComponentNode): ComponentNode {
    const next = cloneNode(node);
    const p = ensureProps(next);
    const category = next.category;

    if (next.type === "Dialog") {
      const showTrigger = propBool(p, "showTrigger", true);
      const showHeader = propBool(p, "showHeader", true);
      const showDescription = propBool(p, "showDescription", true);
      const showFooter = propBool(p, "showFooter", true);
      const triggerText = propStr(p, "triggerText", "Open");
      const titleText = propStr(p, "titleText", "Dialog title");
      const descriptionText = propStr(p, "descriptionText", "Dialog description...");
      const primaryActionText = propStr(p, "primaryActionText", "Confirm");
      const secondaryActionText = propStr(p, "secondaryActionText", "Cancel");

      const existing = ensureChildrenArray(next);
      const reuseTrigger = existing.find((c) => c.type === "DialogTrigger");
      const reuseContent = existing.find((c) => c.type === "DialogContent");

      const children: ComponentNode[] = [];

      if (showTrigger) {
        const triggerId = reuseTrigger?.id ?? newId();
        const reuseBtn = reuseTrigger ? ensureChildrenArray(reuseTrigger).find((c) => c.type === "Button") : undefined;
        children.push({
          id: triggerId,
          type: "DialogTrigger",
          name: `DialogTrigger-${triggerId}`,
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
          ],
        });
      }

      const contentId = reuseContent?.id ?? newId();
      const reuseContentChildren = ensureChildrenArray(reuseContent ?? ({} as ComponentNode));
      const reuseHeader = reuseContentChildren.find((c) => c.type === "DialogHeader");
      const reuseFooter = reuseContentChildren.find((c) => c.type === "DialogFooter");

      const contentChildren: ComponentNode[] = [];

      if (showHeader) {
        const headerId = reuseHeader?.id ?? newId();
        const reuseHeaderChildren = ensureChildrenArray(reuseHeader ?? ({} as ComponentNode));
        const reuseTitle = reuseHeaderChildren.find((c) => c.type === "DialogTitle");
        const reuseDesc = reuseHeaderChildren.find((c) => c.type === "DialogDescription");
        const titleTextReuse = reuseTitle ? ensureChildrenArray(reuseTitle).find((c) => c.type === "Text") : undefined;
        const descTextReuse = reuseDesc ? ensureChildrenArray(reuseDesc).find((c) => c.type === "Text") : undefined;

        const headerChildren: ComponentNode[] = [
          {
            id: reuseTitle?.id ?? newId(),
            type: "DialogTitle",
            name: `DialogTitle-${reuseTitle?.id ?? ""}`.replace(/-$/, ""),
            category,
            props: reuseTitle?.props,
            children: [makeTextNode(titleText, category, titleTextReuse)],
          },
        ];
        if (showDescription) {
          headerChildren.push({
            id: reuseDesc?.id ?? newId(),
            type: "DialogDescription",
            name: `DialogDescription-${reuseDesc?.id ?? ""}`.replace(/-$/, ""),
            category,
            props: reuseDesc?.props,
            children: [makeTextNode(descriptionText, category, descTextReuse)],
          });
        }
        contentChildren.push({
          id: headerId,
          type: "DialogHeader",
          name: `DialogHeader-${headerId}`,
          category,
          props: reuseHeader?.props,
          children: headerChildren,
        });
      }

      if (showFooter) {
        const footerId = reuseFooter?.id ?? newId();
        const reuseFooterChildren = ensureChildrenArray(reuseFooter ?? ({} as ComponentNode));
        const reuseSecondary = reuseFooterChildren.find((c) => c.type === "Button");
        const reusePrimary = reuseFooterChildren.filter((c) => c.type === "Button")[1];
        contentChildren.push({
          id: footerId,
          type: "DialogFooter",
          name: `DialogFooter-${footerId}`,
          category,
          props: reuseFooter?.props,
          children: [
            {
              id: reuseSecondary?.id ?? newId(),
              type: "Button",
              name: `Button-${reuseSecondary?.id ?? ""}`.replace(/-$/, ""),
              category,
              props: { ...(reuseSecondary?.props as Record<string, unknown> | undefined), text: secondaryActionText, variant: "outline" },
            },
            {
              id: reusePrimary?.id ?? newId(),
              type: "Button",
              name: `Button-${reusePrimary?.id ?? ""}`.replace(/-$/, ""),
              category,
              props: { ...(reusePrimary?.props as Record<string, unknown> | undefined), text: primaryActionText },
            },
          ],
        });
      }

      children.push({
        id: contentId,
        type: "DialogContent",
        name: `DialogContent-${contentId}`,
        category,
        props: reuseContent?.props,
        children: contentChildren,
      });

      next.children = children.length > 0 ? children : undefined;
      next.props = Object.keys(p).length > 0 ? p : undefined;
      return next;
    }

    if (next.type === "Sheet") {
      const showTrigger = propBool(p, "showTrigger", true);
      const showHeader = propBool(p, "showHeader", true);
      const showContent = propBool(p, "showContent", true);
      const triggerText = propStr(p, "triggerText", "Open");
      const titleText = propStr(p, "titleText", "Sheet");
      const descriptionText = propStr(p, "descriptionText", "Sheet description...");
      const bodyText = propStr(p, "bodyText", "Sheet content...");

      const existing = ensureChildrenArray(next);
      const reuseTrigger = existing.find((c) => c.type === "SheetTrigger");
      const reuseContent = existing.find((c) => c.type === "SheetContent");

      const children: ComponentNode[] = [];

      if (showTrigger) {
        const triggerId = reuseTrigger?.id ?? newId();
        const reuseBtn = reuseTrigger ? ensureChildrenArray(reuseTrigger).find((c) => c.type === "Button") : undefined;
        children.push({
          id: triggerId,
          type: "SheetTrigger",
          name: `SheetTrigger-${triggerId}`,
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
          ],
        });
      }

      const contentId = reuseContent?.id ?? newId();
      const reuseContentChildren = ensureChildrenArray(reuseContent ?? ({} as ComponentNode));
      const reuseHeader = reuseContentChildren.find((c) => c.type === "SheetHeader");
      const reuseBodyText = reuseContentChildren.find((c) => c.type === "Text");

      const contentChildren: ComponentNode[] = [];

      if (showHeader) {
        const headerId = reuseHeader?.id ?? newId();
        const reuseHeaderChildren = ensureChildrenArray(reuseHeader ?? ({} as ComponentNode));
        const reuseTitle = reuseHeaderChildren.find((c) => c.type === "SheetTitle");
        const reuseDesc = reuseHeaderChildren.find((c) => c.type === "SheetDescription");
        const titleTextReuse = reuseTitle ? ensureChildrenArray(reuseTitle).find((c) => c.type === "Text") : undefined;
        const descTextReuse = reuseDesc ? ensureChildrenArray(reuseDesc).find((c) => c.type === "Text") : undefined;
        contentChildren.push({
          id: headerId,
          type: "SheetHeader",
          name: `SheetHeader-${headerId}`,
          category,
          props: reuseHeader?.props,
          children: [
            {
              id: reuseTitle?.id ?? newId(),
              type: "SheetTitle",
              name: `SheetTitle-${reuseTitle?.id ?? ""}`.replace(/-$/, ""),
              category,
              props: reuseTitle?.props,
              children: [makeTextNode(titleText, category, titleTextReuse)],
            },
            {
              id: reuseDesc?.id ?? newId(),
              type: "SheetDescription",
              name: `SheetDescription-${reuseDesc?.id ?? ""}`.replace(/-$/, ""),
              category,
              props: reuseDesc?.props,
              children: [makeTextNode(descriptionText, category, descTextReuse)],
            },
          ],
        });
      }

      if (showContent) {
        contentChildren.push(makeTextNode(bodyText, category, reuseBodyText));
      }

      children.push({
        id: contentId,
        type: "SheetContent",
        name: `SheetContent-${contentId}`,
        category,
        props: reuseContent?.props,
        children: contentChildren,
      });

      next.children = children.length > 0 ? children : undefined;
      next.props = Object.keys(p).length > 0 ? p : undefined;
      return next;
    }

    if (next.type === "AlertDialog") {
      const showTrigger = propBool(p, "showTrigger", true);
      const showHeader = propBool(p, "showHeader", true);
      const showDescription = propBool(p, "showDescription", true);
      const showActions = propBool(p, "showActions", true);
      const showCancel = propBool(p, "showCancel", true);
      const triggerText = propStr(p, "triggerText", "Open");
      const titleText = propStr(p, "titleText", "Are you absolutely sure?");
      const descriptionText = propStr(p, "descriptionText", "This action cannot be undone.");
      const actionText = propStr(p, "actionText", "Continue");
      const cancelText = propStr(p, "cancelText", "Cancel");

      const existing = ensureChildrenArray(next);
      const reuseTrigger = existing.find((c) => c.type === "AlertDialogTrigger");
      const reuseContent = existing.find((c) => c.type === "AlertDialogContent");

      const children: ComponentNode[] = [];

      if (showTrigger) {
        const triggerId = reuseTrigger?.id ?? newId();
        const reuseBtn = reuseTrigger ? ensureChildrenArray(reuseTrigger).find((c) => c.type === "Button") : undefined;
        children.push({
          id: triggerId,
          type: "AlertDialogTrigger",
          name: `AlertDialogTrigger-${triggerId}`,
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
          ],
        });
      }

      const contentId = reuseContent?.id ?? newId();
      const reuseContentChildren = ensureChildrenArray(reuseContent ?? ({} as ComponentNode));
      const reuseHeader = reuseContentChildren.find((c) => c.type === "AlertDialogHeader");
      const reuseAction = reuseContentChildren.find((c) => c.type === "AlertDialogAction");
      const reuseCancel = reuseContentChildren.find((c) => c.type === "AlertDialogCancel");

      const contentChildren: ComponentNode[] = [];

      if (showHeader) {
        const headerId = reuseHeader?.id ?? newId();
        const reuseHeaderChildren = ensureChildrenArray(reuseHeader ?? ({} as ComponentNode));
        const reuseTitle = reuseHeaderChildren.find((c) => c.type === "AlertDialogTitle");
        const reuseDesc = reuseHeaderChildren.find((c) => c.type === "AlertDialogDescription");
        const titleTextReuse = reuseTitle ? ensureChildrenArray(reuseTitle).find((c) => c.type === "Text") : undefined;
        const descTextReuse = reuseDesc ? ensureChildrenArray(reuseDesc).find((c) => c.type === "Text") : undefined;
        const headerChildren: ComponentNode[] = [
          {
            id: reuseTitle?.id ?? newId(),
            type: "AlertDialogTitle",
            name: `AlertDialogTitle-${reuseTitle?.id ?? ""}`.replace(/-$/, ""),
            category,
            props: reuseTitle?.props,
            children: [makeTextNode(titleText, category, titleTextReuse)],
          },
        ];
        if (showDescription) {
          headerChildren.push({
            id: reuseDesc?.id ?? newId(),
            type: "AlertDialogDescription",
            name: `AlertDialogDescription-${reuseDesc?.id ?? ""}`.replace(/-$/, ""),
            category,
            props: reuseDesc?.props,
            children: [makeTextNode(descriptionText, category, descTextReuse)],
          });
        }
        contentChildren.push({
          id: headerId,
          type: "AlertDialogHeader",
          name: `AlertDialogHeader-${headerId}`,
          category,
          props: reuseHeader?.props,
          children: headerChildren,
        });
      }

      if (showActions) {
        if (showCancel) {
          const cancelId = reuseCancel?.id ?? newId();
          const reuseBtn = reuseCancel ? ensureChildrenArray(reuseCancel).find((c) => c.type === "Button") : undefined;
          contentChildren.push({
            id: cancelId,
            type: "AlertDialogCancel",
            name: `AlertDialogCancel-${cancelId}`,
            category,
            props: reuseCancel?.props,
            children: [
              {
                id: reuseBtn?.id ?? newId(),
                type: "Button",
                name: `Button-${reuseBtn?.id ?? ""}`.replace(/-$/, ""),
                category,
                props: { ...(reuseBtn?.props as Record<string, unknown> | undefined), text: cancelText, variant: "outline" },
              },
            ],
          });
        }
        const actionId = reuseAction?.id ?? newId();
        const reuseBtn = reuseAction ? ensureChildrenArray(reuseAction).find((c) => c.type === "Button") : undefined;
        contentChildren.push({
          id: actionId,
          type: "AlertDialogAction",
          name: `AlertDialogAction-${actionId}`,
          category,
          props: reuseAction?.props,
          children: [
            {
              id: reuseBtn?.id ?? newId(),
              type: "Button",
              name: `Button-${reuseBtn?.id ?? ""}`.replace(/-$/, ""),
              category,
              props: { ...(reuseBtn?.props as Record<string, unknown> | undefined), text: actionText, variant: "destructive" },
            },
          ],
        });
      }

      children.push({
        id: contentId,
        type: "AlertDialogContent",
        name: `AlertDialogContent-${contentId}`,
        category,
        props: reuseContent?.props,
        children: contentChildren,
      });

      next.children = children.length > 0 ? children : undefined;
      next.props = Object.keys(p).length > 0 ? p : undefined;
      return next;
    }

    return next;
  },

  childrenToProps(node: ComponentNode): ComponentNode {
    const next = cloneNode(node);
    const p = ensureProps(next);
    const children = ensureChildrenArray(next);

    if (next.type === "Dialog") {
      const trigger = children.find((c) => c.type === "DialogTrigger");
      const content = children.find((c) => c.type === "DialogContent");
      p.showTrigger = Boolean(trigger);
      if (trigger) {
        const btn = trigger.children?.find((c) => c.type === "Button");
        p.triggerText = pickTextFromNode(btn) ?? propStr(p, "triggerText", "Open");
      }
      p.showHeader = Boolean(content?.children?.find((c) => c.type === "DialogHeader"));
      p.showFooter = Boolean(content?.children?.find((c) => c.type === "DialogFooter"));
      const header = content?.children?.find((c) => c.type === "DialogHeader");
      const title = header?.children?.find((c) => c.type === "DialogTitle");
      const desc = header?.children?.find((c) => c.type === "DialogDescription");
      p.titleText = pickTextFromNode(title?.children?.[0]) ?? propStr(p, "titleText", "Dialog title");
      p.showDescription = Boolean(desc);
      if (desc) p.descriptionText = pickTextFromNode(desc.children?.[0]) ?? propStr(p, "descriptionText", "Dialog description...");
      const footer = content?.children?.find((c) => c.type === "DialogFooter");
      const buttons = footer ? ensureChildrenArray(footer).filter((c) => c.type === "Button") : [];
      if (buttons[0]) p.secondaryActionText = pickTextFromNode(buttons[0]) ?? propStr(p, "secondaryActionText", "Cancel");
      if (buttons[1]) p.primaryActionText = pickTextFromNode(buttons[1]) ?? propStr(p, "primaryActionText", "Confirm");
      next.props = Object.keys(p).length > 0 ? p : undefined;
      return next;
    }

    if (next.type === "Sheet") {
      const trigger = children.find((c) => c.type === "SheetTrigger");
      const content = children.find((c) => c.type === "SheetContent");
      p.showTrigger = Boolean(trigger);
      if (trigger) {
        const btn = trigger.children?.find((c) => c.type === "Button");
        p.triggerText = pickTextFromNode(btn) ?? propStr(p, "triggerText", "Open");
      }
      const header = content?.children?.find((c) => c.type === "SheetHeader");
      p.showHeader = Boolean(header);
      const title = header?.children?.find((c) => c.type === "SheetTitle");
      const desc = header?.children?.find((c) => c.type === "SheetDescription");
      if (title) p.titleText = pickTextFromNode(title.children?.[0]) ?? propStr(p, "titleText", "Sheet");
      if (desc) p.descriptionText = pickTextFromNode(desc.children?.[0]) ?? propStr(p, "descriptionText", "Sheet description...");
      const bodyText = content?.children?.find((c) => c.type === "Text");
      p.showContent = Boolean(bodyText);
      if (bodyText) p.bodyText = pickTextFromNode(bodyText) ?? propStr(p, "bodyText", "Sheet content...");
      next.props = Object.keys(p).length > 0 ? p : undefined;
      return next;
    }

    if (next.type === "AlertDialog") {
      const trigger = children.find((c) => c.type === "AlertDialogTrigger");
      const content = children.find((c) => c.type === "AlertDialogContent");
      p.showTrigger = Boolean(trigger);
      if (trigger) {
        const btn = trigger.children?.find((c) => c.type === "Button");
        p.triggerText = pickTextFromNode(btn) ?? propStr(p, "triggerText", "Open");
      }
      const header = content?.children?.find((c) => c.type === "AlertDialogHeader");
      p.showHeader = Boolean(header);
      const title = header?.children?.find((c) => c.type === "AlertDialogTitle");
      const desc = header?.children?.find((c) => c.type === "AlertDialogDescription");
      if (title) p.titleText = pickTextFromNode(title.children?.[0]) ?? propStr(p, "titleText", "Are you absolutely sure?");
      p.showDescription = Boolean(desc);
      if (desc) p.descriptionText = pickTextFromNode(desc.children?.[0]) ?? propStr(p, "descriptionText", "This action cannot be undone.");
      const action = content?.children?.find((c) => c.type === "AlertDialogAction");
      const cancel = content?.children?.find((c) => c.type === "AlertDialogCancel");
      p.showActions = Boolean(action || cancel);
      p.showCancel = Boolean(cancel);
      if (action) {
        const btn = action.children?.find((c) => c.type === "Button");
        p.actionText = pickTextFromNode(btn) ?? propStr(p, "actionText", "Continue");
      }
      if (cancel) {
        const btn = cancel.children?.find((c) => c.type === "Button");
        p.cancelText = pickTextFromNode(btn) ?? propStr(p, "cancelText", "Cancel");
      }
      next.props = Object.keys(p).length > 0 ? p : undefined;
      return next;
    }

    return next;
  },
};
