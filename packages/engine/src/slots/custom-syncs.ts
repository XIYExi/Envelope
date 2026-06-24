/**
 * 复杂组件的自定义 Slot 同步函数
 *
 * 这些组件结构太复杂，无法用 SimpleSlot/ArraySlot 通用模式表达，
 * 但每个函数高度聚焦（< 80 行），替代原手写 1917 行同步代码。
 */
import type { ComponentNode } from "../schemas/page.schema";
import type { SlotDefinition } from "@envelope/materials";
import { registerCustomSlotSync, type SlotSyncFn } from "./slot-engine";
import {
  newId,
  ensureProps,
  ensureChildren,
  propBool,
  propStr,
  propNum,
  isRecord,
  makeTextNode,
  pickTextFromNode,
  cloneNode,
} from "../shared/canvas-utils";

/* ═══════════════ Tabs ═══════════════ */

const syncTabsForward: SlotSyncFn = (node) => {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const category = next.category;
  const showList = propBool(p, "showList", true);
  const showContent = propBool(p, "showContent", true);

  const tabsRaw = p.tabs;
  const tabs = Array.isArray(tabsRaw)
    ? tabsRaw.filter(isRecord).map((it, i) => ({
        label: typeof it.label === "string" ? it.label : "Tab",
        content: typeof it.content === "string" ? it.content : "Tab content...",
      }))
    : [];

  const existing = ensureChildren(next);
  const existingList = existing.find((c) => c.type === "TabsList");
  const existingContents = existing.filter((c) => c.type === "TabsContent");
  const nextChildren: ComponentNode[] = [];

  if (showList) {
    const existingTriggers = ensureChildren(existingList ?? ({} as ComponentNode)).filter((c) => c.type === "TabsTrigger");
    const triggers = tabs.map((t, i) => {
      const reuse = existingTriggers[i];
      const textReuse = ensureChildren(reuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");
      return {
        id: reuse?.id ?? newId(),
        type: "TabsTrigger",
        name: `TabsTrigger-${reuse?.id ?? newId()}`,
        category,
        props: { ...(reuse?.props as Record<string, unknown> | undefined), value: `tab-${i}` },
        children: [makeTextNode(t.label, category, textReuse)],
      };
    });
    nextChildren.push({
      id: existingList?.id ?? newId(),
      type: "TabsList",
      name: `TabsList-${existingList?.id ?? newId()}`,
      category,
      props: existingList?.props,
      children: triggers,
    });
  }

  if (showContent) {
    const contents = tabs.map((t, i) => {
      const reuse = existingContents[i];
      const textReuse = ensureChildren(reuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");
      return {
        id: reuse?.id ?? newId(),
        type: "TabsContent",
        name: `TabsContent-${reuse?.id ?? newId()}`,
        category,
        props: { ...(reuse?.props as Record<string, unknown> | undefined), value: `tab-${i}` },
        children: [makeTextNode(t.content, category, textReuse)],
      };
    });
    nextChildren.push(...contents);
  }

  p.defaultValue = `tab-${0}`;
  next.children = nextChildren.length > 0 ? nextChildren : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
};

const syncTabsReverse: SlotSyncFn = (node) => {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const children = ensureChildren(next);
  const list = children.find((c) => c.type === "TabsList");
  const triggers = list ? ensureChildren(list).filter((c) => c.type === "TabsTrigger") : [];
  const contents = children.filter((c) => c.type === "TabsContent");
  p.showList = Boolean(list);
  p.showContent = contents.length > 0;
  p.tabs = triggers.map((tr, i) => ({
    label: pickTextFromNode(tr.children?.[0]) ?? `Tab ${i + 1}`,
    content: pickTextFromNode(contents[i]?.children?.[0]) ?? "Tab content...",
  }));
  const dv = typeof p.defaultValue === "string" ? p.defaultValue : "";
  const m = dv.match(/^tab-(\d+)$/);
  if (m) p.activeIndex = Number(m[1]) || 0;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
};

/* ═══════════════ Accordion ═══════════════ */

const syncAccordionForward: SlotSyncFn = (node) => {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const itemsRaw = p.items;
  const items = Array.isArray(itemsRaw)
    ? itemsRaw.filter(isRecord).map((it, i) => ({
        title: typeof it.title === "string" ? it.title : `Section ${i + 1}`,
        content: typeof it.content === "string" ? it.content : "Accordion content...",
      }))
    : [];
  const existingItems = ensureChildren(next).filter((c) => c.type === "AccordionItem");
  next.children = items.map((it, i) => {
    const reuse = existingItems[i];
    const reuseChildren = ensureChildren(reuse ?? ({} as ComponentNode));
    const triggerReuse = reuseChildren.find((c) => c.type === "AccordionTrigger");
    const contentReuse = reuseChildren.find((c) => c.type === "AccordionContent");
    const ttReuse = ensureChildren(triggerReuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");
    const ctReuse = ensureChildren(contentReuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");
    return {
      id: reuse?.id ?? newId(),
      type: "AccordionItem",
      name: `AccordionItem-${reuse?.id ?? newId()}`,
      category: next.category,
      props: { ...(reuse?.props as Record<string, unknown> | undefined), value: `item-${i}` },
      children: [
        {
          id: triggerReuse?.id ?? newId(),
          type: "AccordionTrigger",
          name: `AccordionTrigger-${triggerReuse?.id ?? newId()}`,
          category: next.category,
          props: triggerReuse?.props,
          children: [makeTextNode(it.title, next.category, ttReuse)],
        },
        {
          id: contentReuse?.id ?? newId(),
          type: "AccordionContent",
          name: `AccordionContent-${contentReuse?.id ?? newId()}`,
          category: next.category,
          props: contentReuse?.props,
          children: [makeTextNode(it.content, next.category, ctReuse)],
        },
      ],
    };
  }).filter((c) => c !== null) as ComponentNode[];
  if (!next.children || next.children.length === 0) next.children = undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
};

const syncAccordionReverse: SlotSyncFn = (node) => {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const items = ensureChildren(next).filter((c) => c.type === "AccordionItem");
  p.items = items.map((it, i) => {
    const cs = ensureChildren(it);
    const trigger = cs.find((c) => c.type === "AccordionTrigger");
    const content = cs.find((c) => c.type === "AccordionContent");
    return {
      title: pickTextFromNode(trigger?.children?.[0]) ?? `Section ${i + 1}`,
      content: pickTextFromNode(content?.children?.[0]) ?? "Accordion content...",
    };
  });
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
};

/* ═══════════════ Table ═══════════════ */

const syncTableForward: SlotSyncFn = (node) => {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const category = next.category;
  const showHeader = propBool(p, "showHeader", true);
  const columns = Array.isArray(p.columns) ? (p.columns as string[]).filter((v) => typeof v === "string") : [];
  const safeColumns = columns.length > 0 ? columns : ["Col 1"];
  const rowCount = Math.max(0, Math.floor(propNum(p, "rowCount", 2)));
  const existing = ensureChildren(next);
  const reuseHeader = existing.find((c) => c.type === "TableHeader");
  const reuseBody = existing.find((c) => c.type === "TableBody");
  const nextChildren: ComponentNode[] = [];

  if (showHeader) {
    const reuseRow = reuseHeader ? ensureChildren(reuseHeader).find((c) => c.type === "TableRow") : undefined;
    const reuseHeads = reuseRow ? ensureChildren(reuseRow).filter((c) => c.type === "TableHead") : [];
    const heads = safeColumns.map((col, i) => {
      const r = reuseHeads[i];
      const t = ensureChildren(r ?? ({} as ComponentNode)).find((x) => x.type === "Text");
      return { id: r?.id ?? newId(), type: "TableHead", name: `TableHead-${r?.id ?? newId()}`, category, props: r?.props, children: [makeTextNode(col, category, t)] };
    });
    nextChildren.push({
      id: reuseHeader?.id ?? newId(), type: "TableHeader", name: `TableHeader-${reuseHeader?.id ?? newId()}`, category,
      props: reuseHeader?.props,
      children: [{ id: reuseRow?.id ?? newId(), type: "TableRow", name: `TableRow-${reuseRow?.id ?? newId()}`, category, props: reuseRow?.props, children: heads }],
    });
  }

  const reuseRows = reuseBody ? ensureChildren(reuseBody).filter((c) => c.type === "TableRow") : [];
  const bodyRows = Array.from({ length: rowCount }, (_, r) => {
    const rr = reuseRows[r];
    const reuseCells = ensureChildren(rr ?? ({} as ComponentNode)).filter((c) => c.type === "TableCell");
    const cells = safeColumns.map((_, c) => {
      const rc = reuseCells[c];
      const t = ensureChildren(rc ?? ({} as ComponentNode)).find((x) => x.type === "Text");
      return { id: rc?.id ?? newId(), type: "TableCell", name: `TableCell-${rc?.id ?? newId()}`, category, props: rc?.props, children: [makeTextNode(`Cell ${r + 1}-${c + 1}`, category, t)] };
    });
    return { id: rr?.id ?? newId(), type: "TableRow", name: `TableRow-${rr?.id ?? newId()}`, category, props: rr?.props, children: cells };
  });
  nextChildren.push({
    id: reuseBody?.id ?? newId(), type: "TableBody", name: `TableBody-${reuseBody?.id ?? newId()}`, category,
    props: reuseBody?.props, children: bodyRows,
  });

  next.children = nextChildren.length > 0 ? nextChildren : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
};

const syncTableReverse: SlotSyncFn = (node) => {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const children = ensureChildren(next);
  const header = children.find((c) => c.type === "TableHeader");
  const body = children.find((c) => c.type === "TableBody");
  p.showHeader = Boolean(header);
  const headerRow = header ? ensureChildren(header).find((c) => c.type === "TableRow") : undefined;
  const headCells = headerRow ? ensureChildren(headerRow).filter((c) => c.type === "TableHead") : [];
  if (headCells.length > 0) p.columns = headCells.map((hc, i) => pickTextFromNode(hc.children?.[0]) ?? `Col ${i + 1}`);
  const bodyRows = body ? ensureChildren(body).filter((c) => c.type === "TableRow") : [];
  p.rowCount = bodyRows.length;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
};

/* ═══════════════ Overlay (Dialog / Sheet / AlertDialog) ═══════════════ */

const syncOverlayForward: SlotSyncFn = (node) => {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const category = next.category;
  const showTrigger = propBool(p, "showTrigger", true);
  const showHeader = propBool(p, "showHeader", true);
  const showDescription = propBool(p, "showDescription", true);
  const showFooter = propBool(p, "showFooter", true);
  const triggerText = propStr(p, "triggerText", "Open");
  const titleText = propStr(p, "titleText", "Dialog title");
  const descriptionText = propStr(p, "descriptionText", "Dialog description...");
  const primaryActionText = propStr(p, "primaryActionText", "Confirm");
  const secondaryActionText = propStr(p, "secondaryActionText", "Cancel");

  const isDialog = next.type === "Dialog";
  const triggerType = isDialog ? "DialogTrigger" : next.type === "Sheet" ? "SheetTrigger" : "AlertDialogTrigger";
  const contentType = isDialog ? "DialogContent" : next.type === "Sheet" ? "SheetContent" : "AlertDialogContent";
  const headerType = isDialog ? "DialogHeader" : next.type === "Sheet" ? "SheetHeader" : "AlertDialogHeader";
  const titleType = isDialog ? "DialogTitle" : next.type === "Sheet" ? "SheetTitle" : "AlertDialogTitle";
  const descType = isDialog ? "DialogDescription" : next.type === "Sheet" ? "SheetDescription" : "AlertDialogDescription";
  const footerType = isDialog ? "DialogFooter" : next.type === "Sheet" ? "SheetFooter" : "AlertDialogFooter";
  const actionType = isDialog ? "Button" : next.type === "Sheet" ? "Button" : "AlertDialogAction";
  const cancelType = isDialog ? "Button" : next.type === "Sheet" ? "Button" : "AlertDialogCancel";

  const existing = ensureChildren(next);
  const reuseTrigger = existing.find((c) => c.type === triggerType);
  const reuseContent = existing.find((c) => c.type === contentType);
  const children: ComponentNode[] = [];

  if (showTrigger) {
    const btnReuse = reuseTrigger ? ensureChildren(reuseTrigger).find((c) => c.type === "Button") : undefined;
    children.push({
      id: reuseTrigger?.id ?? newId(), type: triggerType, name: `${triggerType}-${reuseTrigger?.id ?? newId()}`, category,
      props: reuseTrigger?.props,
      children: [{ id: btnReuse?.id ?? newId(), type: "Button", name: `Button-${btnReuse?.id ?? newId()}`, category, props: { ...(btnReuse?.props as Record<string, unknown> | undefined), text: triggerText } }],
    });
  }

  const contentChildren: ComponentNode[] = [];
  const contentReuseChildren = ensureChildren(reuseContent ?? ({} as ComponentNode));
  const reuseHdr = contentReuseChildren.find((c) => c.type === headerType);
  const reuseFtr = contentReuseChildren.find((c) => c.type === footerType);

  if (showHeader) {
    const hdrChildren: ComponentNode[] = [];
    const reuseHdrChildren = ensureChildren(reuseHdr ?? ({} as ComponentNode));
    const titleReuse = reuseHdrChildren.find((c) => c.type === titleType);
    const descReuse = reuseHdrChildren.find((c) => c.type === descType);
    const titleTextReuse = ensureChildren(titleReuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");
    const descTextReuse = ensureChildren(descReuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");

    if (titleReuse || titleText) {
      hdrChildren.push({
        id: titleReuse?.id ?? newId(), type: titleType, name: `${titleType}-${titleReuse?.id ?? newId()}`, category,
        props: titleReuse?.props,
        children: [makeTextNode(titleText, category, titleTextReuse)],
      });
    }
    if (showDescription) {
      hdrChildren.push({
        id: descReuse?.id ?? newId(), type: descType, name: `${descType}-${descReuse?.id ?? newId()}`, category,
        props: descReuse?.props,
        children: [makeTextNode(descriptionText, category, descTextReuse)],
      });
    }
    contentChildren.push({
      id: reuseHdr?.id ?? newId(), type: headerType, name: `${headerType}-${reuseHdr?.id ?? newId()}`, category,
      props: reuseHdr?.props, children: hdrChildren,
    });
  }

  if (showFooter) {
    const reuseFtrChildren = ensureChildren(reuseFtr ?? ({} as ComponentNode));
    const primaryReuse = reuseFtrChildren.find((c) => c.type === actionType);
    const secondaryReuse = reuseFtrChildren.find((c) => c.type === cancelType);
    const primaryTxtReuse = ensureChildren(primaryReuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");
    const secondaryTxtReuse = ensureChildren(secondaryReuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");
    contentChildren.push({
      id: reuseFtr?.id ?? newId(), type: footerType, name: `${footerType}-${reuseFtr?.id ?? newId()}`, category,
      props: reuseFtr?.props,
      children: [
        { id: primaryReuse?.id ?? newId(), type: actionType, name: `${actionType}-${primaryReuse?.id ?? newId()}`, category, props: { ...(primaryReuse?.props as Record<string, unknown> | undefined), text: primaryActionText }, children: [makeTextNode(primaryActionText, category, primaryTxtReuse)] },
        { id: secondaryReuse?.id ?? newId(), type: cancelType, name: `${cancelType}-${secondaryReuse?.id ?? newId()}`, category, props: { ...(secondaryReuse?.props as Record<string, unknown> | undefined), text: secondaryActionText }, children: [makeTextNode(secondaryActionText, category, secondaryTxtReuse)] },
      ],
    });
  }

  children.push({
    id: reuseContent?.id ?? newId(), type: contentType, name: `${contentType}-${reuseContent?.id ?? newId()}`, category,
    props: reuseContent?.props, children: contentChildren,
  });

  next.children = children.length > 0 ? children : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
};

const syncOverlayReverse: SlotSyncFn = (node) => {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const children = ensureChildren(next);
  const isDialog = next.type === "Dialog";
  const triggerType = isDialog ? "DialogTrigger" : next.type === "Sheet" ? "SheetTrigger" : "AlertDialogTrigger";
  const contentType = isDialog ? "DialogContent" : next.type === "Sheet" ? "SheetContent" : "AlertDialogContent";
  const headerType = isDialog ? "DialogHeader" : next.type === "Sheet" ? "SheetHeader" : "AlertDialogHeader";
  const titleType = isDialog ? "DialogTitle" : next.type === "Sheet" ? "SheetTitle" : "AlertDialogTitle";
  const descType = isDialog ? "DialogDescription" : next.type === "Sheet" ? "SheetDescription" : "AlertDialogDescription";
  const footerType = isDialog ? "DialogFooter" : next.type === "Sheet" ? "SheetFooter" : "AlertDialogFooter";

  const triggerEl = children.find((c) => c.type === triggerType);
  const contentEl = children.find((c) => c.type === contentType);
  const contentChildren = contentEl ? ensureChildren(contentEl) : [];
  const headerEl = contentChildren.find((c) => c.type === headerType);
  const footerEl = contentChildren.find((c) => c.type === footerType);
  const headerChildren = headerEl ? ensureChildren(headerEl) : [];
  const titleEl = headerChildren.find((c) => c.type === titleType);
  const descEl = headerChildren.find((c) => c.type === descType);

  p.showTrigger = Boolean(triggerEl);
  p.showHeader = Boolean(headerEl);
  p.showDescription = Boolean(descEl);
  p.showFooter = Boolean(footerEl);
  if (triggerEl) {
    const btnText = pickTextFromNode(triggerEl.children?.[0]);
    if (btnText) p.triggerText = btnText;
  }
  if (titleEl) {
    const t = pickTextFromNode(titleEl.children?.[0]);
    if (t) p.titleText = t;
  }
  if (descEl) {
    const t = pickTextFromNode(descEl.children?.[0]);
    if (t) p.descriptionText = t;
  }

  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
};

/* ═══════════════ Menu (DropdownMenu / ContextMenu) ═══════════════ */

const syncMenuForward: SlotSyncFn = (node, slots) => {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const category = next.category;
  const isDropdown = next.type === "DropdownMenu";
  const triggerType = isDropdown ? "DropdownMenuTrigger" : "ContextMenuTrigger";
  const contentType = isDropdown ? "DropdownMenuContent" : "ContextMenuContent";
  const itemType = isDropdown ? "DropdownMenuItem" : "ContextMenuItem";
  const showTrigger = propBool(p, "showTrigger", true);
  const triggerText = propStr(p, "triggerText", isDropdown ? "Open" : "Right click");
  const items = Array.isArray(p.items) ? (p.items as string[]).filter((v) => typeof v === "string") : [];

  const existing = ensureChildren(next);
  const existingContent = existing.find((c) => c.type === contentType);
  const existingItems = existingContent ? ensureChildren(existingContent).filter((c) => c.type === itemType) : [];
  const children: ComponentNode[] = [];

  if (showTrigger) {
    const btnReuse = existing.find((c) => c.type === triggerType);
    const btnChildReuse = btnReuse ? ensureChildren(btnReuse).find((c) => c.type === "Button") : undefined;
    children.push({
      id: btnReuse?.id ?? newId(), type: triggerType, name: `${triggerType}-${btnReuse?.id ?? newId()}`, category,
      props: btnReuse?.props,
      children: [{ id: btnChildReuse?.id ?? newId(), type: "Button", name: `Button-${btnChildReuse?.id ?? newId()}`, category, props: { ...(btnChildReuse?.props as Record<string, unknown> | undefined), text: triggerText } }],
    });
  }

  const contentChildren = items.map((label, i) => {
    const reuse = existingItems[i];
    const textReuse = ensureChildren(reuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");
    return {
      id: reuse?.id ?? newId(), type: itemType, name: `${itemType}-${reuse?.id ?? newId()}`, category,
      props: reuse?.props,
      children: [makeTextNode(label, category, textReuse)],
    };
  });

  children.push({
    id: existingContent?.id ?? newId(), type: contentType, name: `${contentType}-${existingContent?.id ?? newId()}`, category,
    props: existingContent?.props, children: contentChildren,
  });

  next.children = children.length > 0 ? children : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
};

const syncMenuReverse: SlotSyncFn = (node) => {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const children = ensureChildren(next);
  const isDropdown = next.type === "DropdownMenu";
  const triggerType = isDropdown ? "DropdownMenuTrigger" : "ContextMenuTrigger";
  const contentType = isDropdown ? "DropdownMenuContent" : "ContextMenuContent";
  const itemType = isDropdown ? "DropdownMenuItem" : "ContextMenuItem";

  const triggerEl = children.find((c) => c.type === triggerType);
  const contentEl = children.find((c) => c.type === contentType);
  p.showTrigger = Boolean(triggerEl);
  if (triggerEl) {
    const t = pickTextFromNode(triggerEl.children?.[0]);
    if (t) p.triggerText = t;
  }
  if (contentEl) {
    const items = ensureChildren(contentEl).filter((c) => c.type === itemType);
    p.items = items.map((it, i) => pickTextFromNode(it.children?.[0]) ?? `Item ${i + 1}`);
  }
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
};

/* ═══════════════ Drawer ═══════════════ */

const syncDrawerForward: SlotSyncFn = (node) => {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const category = next.category;
  const showTrigger = propBool(p, "showTrigger", true);
  const showContent = propBool(p, "showContent", true);
  const triggerText = propStr(p, "triggerText", "Open");
  const contentText = propStr(p, "contentText", "Content");
  const reuseTrigger = ensureChildren(next).find((c) => c.type === "DrawerTrigger");
  const reuseContent = ensureChildren(next).find((c) => c.type === "DrawerContent");
  const children: ComponentNode[] = [];

  if (showTrigger) {
    const btnReuse = reuseTrigger ? ensureChildren(reuseTrigger).find((c) => c.type === "Button") : undefined;
    children.push({
      id: reuseTrigger?.id ?? newId(), type: "DrawerTrigger", name: `DrawerTrigger-${reuseTrigger?.id ?? newId()}`, category,
      props: reuseTrigger?.props,
      children: [{ id: btnReuse?.id ?? newId(), type: "Button", name: `Button-${btnReuse?.id ?? newId()}`, category, props: { ...(btnReuse?.props as Record<string, unknown> | undefined), text: triggerText } }],
    });
  }

  if (showContent) {
    const textReuse = ensureChildren(reuseContent ?? ({} as ComponentNode)).find((c) => c.type === "Text");
    children.push({
      id: reuseContent?.id ?? newId(), type: "DrawerContent", name: `DrawerContent-${reuseContent?.id ?? newId()}`, category,
      props: reuseContent?.props,
      children: [makeTextNode(contentText, category, textReuse)],
    });
  }

  next.children = children.length > 0 ? children : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
};

const syncDrawerReverse: SlotSyncFn = (node) => {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const children = ensureChildren(next);
  const triggerEl = children.find((c) => c.type === "DrawerTrigger");
  const contentEl = children.find((c) => c.type === "DrawerContent");
  p.showTrigger = Boolean(triggerEl);
  p.showContent = Boolean(contentEl);
  if (triggerEl) {
    const t = pickTextFromNode(triggerEl.children?.[0]);
    if (t) p.triggerText = t;
  }
  if (contentEl) {
    const t = pickTextFromNode(contentEl.children?.[0]);
    if (t) p.contentText = t;
  }
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
};

/* ═══════════════ ResizablePanelGroup ═══════════════ */

const syncPanelGroupForward: SlotSyncFn = (node) => {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const category = next.category;
  const panelCount = Math.max(1, Math.floor(propNum(p, "panelCount", 2)));
  const existing = ensureChildren(next).filter((c) => c.type === "ResizablePanel");
  next.children = Array.from({ length: panelCount }, (_, i) => {
    const reuse = existing[i];
    const textReuse = ensureChildren(reuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");
    return {
      id: reuse?.id ?? newId(), type: "ResizablePanel", name: `ResizablePanel-${reuse?.id ?? newId()}`, category,
      props: { ...(reuse?.props as Record<string, unknown> | undefined), defaultSize: Math.floor(100 / panelCount) },
      children: [makeTextNode(`Panel ${i + 1}`, category, textReuse)],
    };
  });
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
};

const syncPanelGroupReverse: SlotSyncFn = (node) => {
  const next = cloneNode(node);
  const p = ensureProps(next);
  p.panelCount = ensureChildren(next).filter((c) => c.type === "ResizablePanel").length;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
};

/* ═══════════════ Pagination (CountSlot — too unique for generic) ═══════════════ */

const syncPaginationForward: SlotSyncFn = (node) => {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const category = next.category;
  const pageCount = Math.max(0, Math.floor(propNum(p, "pageCount", 5)));
  const currentPage = Math.max(1, Math.floor(propNum(p, "currentPage", 1)));
  const showPrevNext = propBool(p, "showPrevNext", true);
  const existing = ensureChildren(next).filter((c) => c.type === "PaginationItem");
  let idx = 0;
  const children: ComponentNode[] = [];

  if (showPrevNext) {
    const reuse = existing[idx++];
    const t = ensureChildren(reuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");
    children.push({ id: reuse?.id ?? newId(), type: "PaginationItem", name: `PaginationItem-${reuse?.id ?? newId()}`, category, props: { ...(reuse?.props as Record<string, unknown> | undefined), kind: "prev" }, children: [makeTextNode("Prev", category, t)] });
  }
  for (let pno = 1; pno <= pageCount; pno += 1) {
    const reuse = existing[idx++];
    const t = ensureChildren(reuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");
    children.push({ id: reuse?.id ?? newId(), type: "PaginationItem", name: `PaginationItem-${reuse?.id ?? newId()}`, category, props: { ...(reuse?.props as Record<string, unknown> | undefined), page: pno, active: pno === currentPage }, children: [makeTextNode(String(pno), category, t)] });
  }
  if (showPrevNext) {
    const reuse = existing[idx++];
    const t = ensureChildren(reuse ?? ({} as ComponentNode)).find((c) => c.type === "Text");
    children.push({ id: reuse?.id ?? newId(), type: "PaginationItem", name: `PaginationItem-${reuse?.id ?? newId()}`, category, props: { ...(reuse?.props as Record<string, unknown> | undefined), kind: "next" }, children: [makeTextNode("Next", category, t)] });
  }

  next.children = children.length > 0 ? children : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
};

const syncPaginationReverse: SlotSyncFn = (node) => {
  const next = cloneNode(node);
  const p = ensureProps(next);
  const items = ensureChildren(next).filter((c) => c.type === "PaginationItem");
  p.showPrevNext = items.some((c) => {
    const props = c.props as Record<string, unknown> | undefined;
    return props?.kind === "prev" || props?.kind === "next";
  });
  p.pageCount = items.filter((c) => {
    const props = c.props as Record<string, unknown> | undefined;
    return !props?.kind || props.kind === "page";
  }).length;
  // currentPage: find the active page
  const activeItem = items.find((c) => {
    const props = c.props as Record<string, unknown> | undefined;
    return props?.active === true;
  });
  if (activeItem) {
    const activeProps = activeItem.props as Record<string, unknown> | undefined;
    p.currentPage = typeof activeProps?.page === "number" ? activeProps.page : 1;
  }
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
};

/* ───────── 注册所有自定义同步 ───────── */

export function registerAllCustomSyncs(): void {
  registerCustomSlotSync("Tabs", syncTabsForward, syncTabsReverse);
  registerCustomSlotSync("Accordion", syncAccordionForward, syncAccordionReverse);
  registerCustomSlotSync("Table", syncTableForward, syncTableReverse);
  registerCustomSlotSync("Dialog", syncOverlayForward, syncOverlayReverse);
  registerCustomSlotSync("Sheet", syncOverlayForward, syncOverlayReverse);
  registerCustomSlotSync("AlertDialog", syncOverlayForward, syncOverlayReverse);
  registerCustomSlotSync("DropdownMenu", syncMenuForward, syncMenuReverse);
  registerCustomSlotSync("ContextMenu", syncMenuForward, syncMenuReverse);
  registerCustomSlotSync("Drawer", syncDrawerForward, syncDrawerReverse);
  registerCustomSlotSync("ResizablePanelGroup", syncPanelGroupForward, syncPanelGroupReverse);
  registerCustomSlotSync("Pagination", syncPaginationForward, syncPaginationReverse);
}
