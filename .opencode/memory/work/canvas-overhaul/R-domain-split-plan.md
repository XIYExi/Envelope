# Domain R 文件拆分方案

> 基于深度阅读 4 个文件全量 6644 行后的可执行拆分方案
> 生成时间: 2026-06-25

---

## ISC-R1: renderer.tsx 拆分 (1802行 → ≤400行/文件)

### 当前文件结构总览

| 行号 | 区块 | 功能 |
|------|------|------|
| 1-47 | 导入 & 常量 | cn()、CELL_HEIGHT、CELL_WIDTH、RULER_SIZE、RESIZE_HANDLE_SIZE |
| 47-108 | 工具函数 | cn、pstr、pnum、pbool、parr、getPreviewTailwindClasses |
| 111-120 | COMPACT_STYLES | 紧凑模式样式覆盖表 |
| 122-139 | Context + 函数签名 | SelectChildContext、UnifiedSimulatedContent 签名 |
| 140-903 | 组件模拟渲染 | switch-case 渲染 ~30 种组件类型的模拟外观 |
| 905-938 | ChildrenSlot | 嵌套子组件列表渲染 |
| 940-1162 | CanvasComponentItem | 单组件渲染包装器（useDraggable/useDroppable/缩放手柄） |
| 1164-1184 | resizeHandleStyles | 八向缩放手柄定位样式 |
| 1186-1231 | BoundingBoxOverlay | 多选包围盒覆盖层 |
| 1233-1262 | BreadcrumbBar | 子编辑模式面包屑导航栏 |
| 1264-1361 | 智能对齐辅助线 | computeAlignGuides、SmartGuideOverlay |
| 1363-1419 | CanvasRendererProps | 主渲染器的 Props 接口 |
| 1421-1447 | MarqueeOverlay | 框选矩形覆盖层 |
| 1449-1802 | CanvasRenderer | 主画布渲染器（forwardRef，含框选、拖拽平移、缩放等交互） |

### 拆分方案

| 区块 | 行号 | 功能 | 新文件路径 | 预估行数 |
|------|------|------|-----------|---------|
| 工具函数 + 常量 | 1-120 | cn、pstr/pnum/pbool/parr、getPreviewTailwindClasses、COMPACT_STYLES、CELL_HEIGHT/CELL_WIDTH、RULER_SIZE、RESIZE_HANDLE_SIZE | `packages/engine/src/canvas/renderer-utils.ts` | ~110 |
| 模拟组件渲染—表单/展示 | 140-159, 319-445, 447-556 | Button、Input、Textarea、Label、Checkbox、RadioGroup、Switch、Select、Slider、Toggle、ToggleGroup、Avatar、Badge、Skeleton、Alert、Progress、Breadcrumb、Pagination | `packages/engine/src/canvas/simulated-components-form.tsx` | ~280 |
| 模拟组件渲染—容器/覆盖 | 140-159, 160-317, 196-292, 558-696, 698-903 | Card/CardHeader/CardContent/CardFooter、Tabs/TabsContent、Accordion、Table、Form、Box、Flex、Container、Grid、Separator、ScrollArea、AspectRatio、ResizablePanelGroup、Dialog/AlertDialog/Sheet/Popover/Tooltip/HoverCard/Drawer、DropdownMenu/ContextMenu、Collapsible、DialogContent/SheetContent/AlertDialogContent、default fallback | `packages/engine/src/canvas/simulated-components-layout.tsx` | ~390 |
| 模拟内容上下文+子组件插槽 | 122-139, 905-938 | SelectChildContext、UnifiedSimulatedContent 函数体（协调调用上述两个子模块）、ChildrenSlot | `packages/engine/src/canvas/simulated-content.tsx` | ~100 |
| 单组件渲染项 | 940-1162 | CanvasComponentItem (memo)、使用 useDraggable/useDroppable、缩放手柄交互、选中态/拖拽态/锁定态渲染 | `packages/engine/src/canvas/canvas-component-item.tsx` | ~230 |
| 缩放手柄样式 | 1164-1184 | resizeHandleStyles 对象 + allResizeDirections 数组 | 合并到 `canvas-component-item.tsx` | +10 |
| 多选包围盒 | 1186-1231 | BoundingBoxOverlay 组件 | `packages/engine/src/canvas/bounding-box-overlay.tsx` | ~55 |
| 面包屑导航 | 1233-1262 | BreadcrumbBar 组件 | `packages/engine/src/canvas/breadcrumb-bar.tsx` | ~35 |
| 智能对齐系统 | 1264-1361 | AlignGuide 类型、computeAlignGuides 函数、SmartGuideOverlay 组件 | `packages/engine/src/canvas/smart-guides.tsx` | ~105 |
| 框选系统 | 1421-1447 | MarqueeOverlay | `packages/engine/src/canvas/marquee-overlay.tsx` | ~35 |
| 主画布渲染器 | 1363-1419, 1449-1802 | CanvasRendererProps 接口、CanvasRenderer 主组件（框选交互、拖拽平移、组件映射循环） | `packages/engine/src/canvas/canvas-renderer.tsx` | ~365 |
| 聚合入口（原文件） | — | 仅保留 re-export，将内部实现全部委托给子模块 | `packages/engine/src/canvas/renderer.tsx` | ~30 |

### 拆分后依赖关系

```
renderer.tsx (入口 re-export)
  └─ canvas-renderer.tsx (主渲染器，~365行)
       ├─ renderer-utils.tsx (工具函数)
       ├─ simulated-content.tsx (模拟内容协调器)
       │    ├─ simulated-components-form.tsx
       │    └─ simulated-components-layout.tsx
       ├─ canvas-component-item.tsx (单个组件包装器)
       ├─ bounding-box-overlay.tsx
       ├─ breadcrumb-bar.tsx
       ├─ smart-guides.tsx
       └─ marquee-overlay.tsx
```

### 每个新文件 ≤400行验证

| 文件 | 预估行数 | 状态 |
|------|---------|------|
| renderer.tsx (re-export) | ~30 | ✅ |
| canvas-renderer.tsx | ~365 | ✅ |
| renderer-utils.ts | ~110 | ✅ |
| simulated-content.tsx | ~100 | ✅ |
| simulated-components-form.tsx | ~280 | ✅ |
| simulated-components-layout.tsx | ~390 | ✅ |
| canvas-component-item.tsx | ~240 | ✅ |
| bounding-box-overlay.tsx | ~55 | ✅ |
| breadcrumb-bar.tsx | ~35 | ✅ |
| smart-guides.tsx | ~105 | ✅ |
| marquee-overlay.tsx | ~35 | ✅ |

---

## ISC-R2: store.ts 拆分 (1732行 → 独立模块)

### 当前文件结构总览

#### 树操作相关（~370行）

| 行号 | 函数 | 功能 |
|------|------|------|
| 26-36 | `generateId()` | UUID 生成器 |
| 38-42 | `isAutoName()` | 判断节点名是否为自动生成 |
| 44-57 | `cloneNodeWithNewIds()` | 深拷贝节点并生成新 ID |
| 59-66 | `nodeContainsId()` | 判断节点树中是否包含某 ID |
| 68-109 | `findNodeLocation()` + `NodeLocation` 类型 | 在组件列表中查找节点位置（root/child） |
| 111-121 | `canNodeHaveChildren()` + 废弃导出 | 判断类型是否支持子节点 |
| 123-137 | `findNodeInComponents()` | 在组件列表中查找节点 |
| 139-161 | `reflowRootComponentsByOrder()` | 重新排序组件列表的 y 坐标 |
| 163-202 | `removeNodeFromTree()` | 从节点树中移除节点 |
| 204-248 | `insertNodeIntoTree()` | 插入节点到树中（含 Slot 类型校验） |
| 250-287 | `updateNodeInTree()` | 更新树中节点（含 syncAggregateSlots） |
| 289-317 | `createComponentNode()` | 创建新 ComponentNode |

#### 视口/页面状态相关（~210行）

| 行号 | 字段/动作 | 功能 |
|------|----------|------|
| 407-412 | `zoom`(L407)、`viewport`(L408)、`gridCols`(L409)、`gridGap`(L410)、`minRowHeight`(L411)、`panX`(L412)、`panY`(L413) | 视口初始状态字段 |
| 414-416 | `pageBackground`(L414)、`pagePadding`(L415)、`pageMaxWidth`(L416) | 页面外观状态字段 |
| 419 | `positionMode`(L419) | 定位模式字段 |
| 653-671 | `setZoom()` | 设置缩放 |
| 672-684 | `setViewport()` | 设置视口 |
| 685-716 | `setGridCols()` | 设置网格列数（含位置钳制） |
| 717-729 | `setGridGap()` | 设置网格间距 |
| 730-749 | `setMinRowHeight()` | 设置最小行高 |
| 750-781 | `zoomToFit()` | 缩放至适配所有组件 |
| 782-815 | `zoomToSelection()` | 缩放至选中组件 |
| 816-834 | `setPan()` | 设置画布平移 |
| 835-847 | `setPageBackground()` | 设置背景色 |
| 848-860 | `setPagePadding()` | 设置页面内边距 |
| 861-888 | `setPageMaxWidth()` | 设置内容最大宽度 |
| 890 | `setPositionMode()` | 设置定位模式 |

#### 历史系统（~100行 + ~35处重复模式）

| 行号 | 代码 | 功能 |
|------|------|------|
| 364-381 | `takeSnapshot()` | 深拷贝全量快照 |
| 382-385 | `snapshotEquals()` | JSON 字符串比较快照 |
| 387-390 | batching 状态变量 | batching、batchStartSnapshot、lastCoalesceKey、lastCoalesceAt |
| 420-421 | `canUndo`(L420)、`canRedo`(L421) | 撤销/重做可用状态 |
| 422-424 | `historyPast`(L422)、`historyFuture`(L423)、`historyLimit`(L424) | 历史栈字段 |
| 1594-1609 | `undo()` | 撤销操作 |
| 1612-1629 | `redo()` | 重做操作 |
| 1631-1636 | `clearHistory()` | 清空历史 |
| 1638-1654 | `hydrate()` | 水合状态（清除历史） |
| 1656-1681 | `batch()` | 批量操作包装器 |

#### ~37处重复的历史模式

所有 action 中反复出现的模式（约 20 行/处）：

```typescript
// 模式 A：无 coalesce 的普通 action（出现 ~20 处）
if (batching) return partial;
const prev = takeSnapshot(state);
const next = takeSnapshot({ ...(state as CanvasState), ...partial });
if (snapshotEquals(prev, next)) return partial;
const past = [...state.historyPast, prev];
const limitedPast = past.length > state.historyLimit 
  ? past.slice(past.length - state.historyLimit) : past;
lastCoalesceKey = null;
return { ...partial, historyPast: limitedPast, historyFuture: [], 
  canUndo: limitedPast.length > 0, canRedo: false };

// 模式 B：带 coalesce 的 action（出现 ~5 处: move/resize/zoom/pan/select）
const now = Date.now();
const coalesce = lastCoalesceKey === "move" && now - lastCoalesceAt < 250;
lastCoalesceKey = "move";
lastCoalesceAt = now;
if (coalesce) return { ...partial, historyFuture: [], canRedo: false };
const past = [...state.historyPast, prev];
const limitedPast = past.length > state.historyLimit 
  ? past.slice(past.length - state.historyLimit) : past;
return { ...partial, historyPast: limitedPast, historyFuture: [], 
  canUndo: limitedPast.length > 0, canRedo: false };
```

涉及的 action 清单：
- addComponent (L428)、removeComponent (L442)、updateComponent (L460)
- selectComponent (L502)、selectNode (L531)、clearSelection (L550)
- moveComponent (L575)、resizeComponent (L617)
- setZoom (L653)、setViewport (L672)、setGridCols (L694)、setGridGap (L717)
- setMinRowHeight (L737)、setPan (L816)、setPageBackground (L835)
- setPagePadding (L848)、setPageMaxWidth (L872)
- pasteClipboard (L937)、insertNode (L1030)、moveNode (L1084)、updateNode (L1177)
- deleteSelected (L1245)、clearAll (L1290)、selectAll (L1304)
- toggleLock (L1329)、toggleHidden (L1347)、batchToggleLock (L1365)、batchToggleHidden (L1383)
- zIndexMove (L1403) 的 top/bottom/up/down 四个子路径

#### 可独立拆分的其他模块

| 模块 | 行号 | 涉及函数 | 预估行数 |
|------|------|---------|---------|
| 剪贴板操作 | 890-1028 | copySelected、cutSelected、pasteClipboard | ~140 |
| Lock & Hide | 1327-1399 | toggleLock、toggleHidden、batchToggleLock、batchToggleHidden | ~75 |
| Z-Order | 1401-1469 | zIndexMove (top/bottom/up/down) | ~70 |
| Align & Distribute | 1471-1559 | alignSelected、distributeSelected | ~90 |
| Child Edit Mode | 1584-1592 | enterChildEdit、exitChildEdit | ~10 |
| Select 操作 | 502-562 | selectComponent、selectNode、clearSelection、getSelectedComponents | ~65 |
| Batch 操作 | 1561-1582 | batchUpdateSelectedProps | ~20 |

### 拆分方案

| 模块 | 涉及字段/动作 | 新文件路径 | 预估行数 |
|------|-------------|-----------|---------|
| **树操作核心** | generateId、isAutoName、cloneNodeWithNewIds、nodeContainsId、findNodeLocation、canNodeHaveChildren、findNodeInComponents、reflowRootComponentsByOrder、removeNodeFromTree、insertNodeIntoTree、updateNodeInTree、createComponentNode、createCanvasComponent | `packages/engine/src/canvas/store/tree-ops.ts` | ~380 |
| **历史系统 (withHistory HOF)** | takeSnapshot、snapshotEquals、batching状态、undo、redo、clearHistory、hydrate、batch + withHistory 高阶函数 + withCoalescingHistory 高阶函数 | `packages/engine/src/canvas/store/history.ts` | ~180 |
| **视口/页面状态** | zoom/viewport/gridCols/gridGap/minRowHeight/panX/panY/pageBackground/pagePadding/pageMaxWidth/positionMode 的初始值 + setZoom/setViewport/setGridCols/setGridGap/setMinRowHeight/zoomToFit/zoomToSelection/setPan/setPageBackground/setPagePadding/setPageMaxWidth/setPositionMode（使用 withHistory 包装） | `packages/engine/src/canvas/store/viewport.ts` | ~220 |
| **组件 CRUD** | addComponent、removeComponent、updateComponent、deleteSelected、clearAll（使用 withHistory 包装） | `packages/engine/src/canvas/store/component-crud.ts` | ~120 |
| **选中操作** | selectComponent、selectNode、clearSelection、selectAll、getSelectedComponents（使用 withHistory 包装） | `packages/engine/src/canvas/store/selection.ts` | ~100 |
| **剪贴板** | copySelected、cutSelected、pasteClipboard、insertNode、moveNode（使用 withHistory 包装） | `packages/engine/src/canvas/store/clipboard.ts` | ~200 |
| **Lock/Hide/Z-Order/Align** | toggleLock、toggleHidden、batchToggleLock、batchToggleHidden、zIndexMove、alignSelected、distributeSelected、batchUpdateSelectedProps | `packages/engine/src/canvas/store/component-ops.ts` | ~260 |
| **子编辑模式** | enterChildEdit、exitChildEdit | 合并到主 store | ~10 |
| **主 store** | create() 调用 + 初始状态 + 组装所有模块 | `packages/engine/src/canvas/store.ts` | ~80 |

### 死代码清单（ISC-R9）

| 位置 | 代码 | 原因 |
|------|------|------|
| `store.ts:116-121` | `COMPONENT_TYPES_THAT_SUPPORT_CHILDREN` | ⚠️ 标注 @deprecated 但仍被 `editor-layout.tsx:274` 消费。**不能直接删除**，需先将消费者迁移到 `isContainerType()` 后删除。 |
| `store.ts:111-113` | `canNodeHaveChildren()` | 内部使用 `isContainerType()`，与外部 `isContainerType()` 功能完全一致但未被 store 外部使用。可以内联到调用点或保持。 |

> **注意**: 经过全量 grep 扫描，`COMPONENT_TYPES_THAT_SUPPORT_CHILDREN` 仍在 `apps/platform/components/editor/editor-layout.tsx:274` 被引用。这是 ISC-R9 需要处理的唯一真正"待迁移"的死代码。

---

## ISC-R3: aggregate-slot-mapper.ts 声明式重构 (1862行 → ≤400行引擎 + 配置)

### 当前模式分析

**现有架构**：
- 10 个聚合组件族 × 2 方向（props→children, children→props）= 20 对手写函数
- 入口函数 `syncAggregateSlotsPropsToChildren` (L1737-1788) 和 `syncAggregateSlotsChildrenToProps` (L1796-1847) 各使用 switch-case 分发
- 另有 3 个通用函数族（Popup: Popover/Tooltip/HoverCard、Menu: DropdownMenu/ContextMenu、Overlay: Dialog/Sheet/AlertDialog）

**重复模式识别**：

每个 `sync*PropsToChildren` 函数遵循相同模式：
```
1. cloneNode(node)
2. ensureProps(next)
3. 读取 2-5 个 props 字段（showX boolean → 是否显示子组件，textX string → 文本内容）
4. 查找 children 中匹配 type 的已有子组件
5. 对每个显示的 slot 创建/复用子组件（upsertChildByType 模式）
6. 设置 next.children / next.props
7. return next
```

每个 `sync*ChildrenToProps` 函数遵循相同模式：
```
1. cloneNode(node)
2. ensureProps(next)
3. 在 children 中查找匹配 type 的子组件
4. 从子组件提取文本回写到 props
5. 设置 showX boolean 标志
6. return next
```

### 声明式引擎方案

#### 核心配置类型

```typescript
// packages/engine/src/slots/slot-engine-types.ts (~50行)

interface SlotFieldDef {
  /** props 中的字段名 */
  propKey: string;
  /** 字段类型 */
  kind: "boolean" | "text" | "array";
  /** 对应的子组件 type（仅 text/array 需要） */
  childType?: string;
  /** 默认值 */
  default: unknown;
  /** 是否控制子组件的显示/隐藏（仅 boolean 类型，为 false 时移除对应子组件） */
  controlsVisibility?: string; // 指向另一个 SlotFieldDef.propKey（text 类型），表示此 boolean 控制哪个子组件的显隐
}

interface AggregateSlotConfig {
  /** 聚合组件 type 名 */
  type: string;
  /** 子组件 type → 对应 props 的字段定义 */
  slots: SlotFieldDef[];
}
```

#### 声明式配置示例

```typescript
// packages/engine/src/slots/slot-configs.ts (~250行)

const CARD_CONFIG: AggregateSlotConfig = {
  type: "Card",
  slots: [
    { propKey: "showHeader",   kind: "boolean", default: true,  controlsVisibility: "headerText" },
    { propKey: "headerText",   kind: "text",    default: "Header",       childType: "CardHeader" },
    { propKey: "showContent",  kind: "boolean", default: true,  controlsVisibility: "contentText" },
    { propKey: "contentText",  kind: "text",    default: "Content",      childType: "CardContent" },
    { propKey: "showFooter",   kind: "boolean", default: false, controlsVisibility: "footerText" },
    { propKey: "footerText",   kind: "text",    default: "Footer",       childType: "CardFooter" },
  ],
};

const TABS_CONFIG: AggregateSlotConfig = {
  type: "Tabs",
  slots: [
    { propKey: "showList",    kind: "boolean", default: true,  controlsVisibility: "tabs" },
    { propKey: "showContent", kind: "boolean", default: true,  controlsVisibility: "tabs" },
    { propKey: "tabs",        kind: "array",   default: [{ label: "Tab 1", content: "Tab content..." }],
      childType: "TabsList" }, // 复杂类型用 custom mapper
    { propKey: "activeIndex", kind: "text",    default: 0 },
  ],
};
```

对于复杂组件（Tabs、Table、Accordion、Pagination 等有深层嵌套子结构的），使用 **customMapper** 字段指向专用函数，而非强行用声明式描述所有细节。

```typescript
interface AggregateSlotConfig {
  type: string;
  /** 简单模式：声明式字段定义 */
  slots?: SlotFieldDef[];
  /** 复杂模式：自定义 mapper 函数（处理深层嵌套结构） */
  customMapper?: {
    propsToChildren: (node: ComponentNode) => ComponentNode;
    childrenToProps: (node: ComponentNode) => ComponentNode;
  };
}
```

#### 通用引擎实现

```typescript
// packages/engine/src/slots/slot-engine.ts (~350行)

/**
 * 声明式 props → children 同步引擎
 */
function applyPropsToChildren(node: ComponentNode, config: AggregateSlotConfig): ComponentNode {
  if (config.customMapper) return config.customMapper.propsToChildren(node);
  
  const next = cloneNode(node);
  const p = ensureProps(next);
  const existing = ensureChildrenArray(next);
  
  let cur = existing;
  for (const slot of config.slots!) {
    if (slot.kind === "boolean") {
      const visible = propBool(p, slot.propKey, slot.default as boolean);
      const controlled = slot.controlsVisibility;
      if (controlled) {
        const textSlot = config.slots!.find(s => s.propKey === controlled && s.kind === "text");
        if (textSlot?.childType) {
          if (visible) {
            const text = propStr(p, controlled, textSlot.default as string);
            const { nextChildren } = upsertOrCreate(cur, textSlot.childType, next.category, text);
            cur = nextChildren;
          } else {
            cur = removeChildByType(cur, textSlot.childType);
          }
        }
      }
    }
  }
  next.children = cur.length > 0 ? cur : undefined;
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}

/**
 * 声明式 children → props 同步引擎
 */
function applyChildrenToProps(node: ComponentNode, config: AggregateSlotConfig): ComponentNode {
  if (config.customMapper) return config.customMapper.childrenToProps(node);
  
  const next = cloneNode(node);
  const p = ensureProps(next);
  const children = ensureChildrenArray(next);
  
  for (const slot of config.slots!) {
    if (slot.kind === "text" && slot.childType) {
      const child = children.find(c => c.type === slot.childType);
      (p as any)[slot.propKey] = child 
        ? (pickTextFromNode(child.children?.[0]) ?? slot.default) 
        : slot.default;
    }
    if (slot.kind === "boolean" && slot.controlsVisibility) {
      const textSlot = config.slots!.find(s => s.propKey === slot.controlsVisibility);
      if (textSlot?.childType) {
        (p as any)[slot.propKey] = children.some(c => c.type === textSlot.childType);
      }
    }
  }
  next.props = Object.keys(p).length > 0 ? p : undefined;
  return next;
}
```

#### 简单组件可用声明式（~9种）

| 组件 | 配置复杂度 | 方式 |
|------|-----------|------|
| Alert | 简单 | 声明式 config |
| Select | 简单 | 声明式 config |
| RadioGroup | 简单 | 声明式 config |
| Breadcrumb | 简单 | 声明式 config |
| Popover/Tooltip/HoverCard | 中等 | 共享声明式 config + 通用 Popup mapper |
| Collapsible | 简单 | 声明式 config |
| ResizablePanelGroup | 简单 | 声明式 config |

#### 复杂组件使用 customMapper（~5种）

| 组件 | 原因 | 保留为独立文件 |
|------|------|-------------|
| Card | 有 Header/Content/Footer 三层子结构 | `slot-mappers/card.ts` |
| Tabs | TabsList→TabsTrigger + TabsContent 嵌套 | `slot-mappers/tabs.ts` |
| Accordion | AccordionItem→AccordionTrigger+AccordionContent 双层 | `slot-mappers/accordion.ts` |
| Table | TableHeader→TableRow→TableHead + TableBody→TableRow→TableCell 三层 | `slot-mappers/table.ts` |
| Pagination | 动态生成 prev/number/next pages | `slot-mappers/pagination.ts` |
| Dialog/Sheet/AlertDialog | 复杂 overlay 嵌套结构 | `slot-mappers/overlay.ts` |
| Drawer | 独立复杂结构 | `slot-mappers/drawer.ts` |
| DropdownMenu/ContextMenu | Menu 通用结构 | 共享 generic Menu mapper |

### 重构后文件结构

| 文件 | 内容 | 预估行数 |
|------|------|---------|
| `slots/slot-engine-types.ts` | SlotFieldDef、AggregateSlotConfig 类型定义 | ~50 |
| `slots/slot-engine.ts` | applyPropsToChildren、applyChildrenToProps 引擎 + 工具函数 | ~350 |
| `slots/slot-configs.ts` | 所有组件的声明式配置 + customMapper 注册表 | ~200 |
| `slots/aggregate-slot-mapper.ts` | 入口：syncAggregateSlots、syncAggregateSlotsPropsToChildren、syncAggregateSlotsChildrenToProps，从配置表查找并调用 | ~60 |
| `slots/slot-mappers/card.ts` | Card 的 customMapper | ~80 |
| `slots/slot-mappers/tabs.ts` | Tabs 的 customMapper | ~80 |
| `slots/slot-mappers/accordion.ts` | Accordion 的 customMapper | ~80 |
| `slots/slot-mappers/table.ts` | Table 的 customMapper | ~120 |
| `slots/slot-mappers/pagination.ts` | Pagination 的 customMapper | ~80 |
| `slots/slot-mappers/overlay.ts` | Dialog/Sheet/AlertDialog 的 customMapper | ~150 |
| `slots/slot-mappers/drawer.ts` | Drawer 的 customMapper | ~80 |
| `slots/slot-mappers/menu.ts` | DropdownMenu/ContextMenu 通用 mapper | ~60 |

**总计**: ~1390行（从 1862 行减少约 25%），核心引擎 `slot-engine.ts` 350 行 ≤400行 ✅

---

## ISC-R4: editor-toolbar.tsx Hook提取 (1246行 → 拆出导出/导入/同步)

### 当前结构中可提取的代码块

#### 导出系统（3个独立 WebSocket 管理逻辑，结构高度相似）

| 区块 | 行号 | 行数 | 功能 |
|------|------|------|------|
| 导出状态变量 | 117-125 | 9 | isExporting、exportError、exportStage、exportPercent、exportWsRef 等 |
| WebSocket 工具函数 | 155-183 | 29 | wsClientIdStorageKey、getFileNameFromContentDisposition、downloadExport |
| connectExportWs | 206-330 | 125 | 标准导出 WS 连接管理 |
| handleExport | 609-655 | 47 | 标准导出触发逻辑 |
| connectArchiveExportWs | 332-455 | 124 | 配置归档导出 WS 连接管理 |
| handleArchiveExport | 657-707 | 51 | 配置归档导出触发逻辑 |
| connectArchiveImportWs | 457-569 | 113 | 配置归档导入 WS 连接管理 |
| handleArchiveImport | 709-760 | 52 | 配置归档导入触发逻辑 |
| 清理 useEffect | 571-607 | 37 | 卸载时关闭所有 WS 连接 |
| 同步状态 | 155-169 | 15 | useProjectLocalSync 调用 |

#### 其他可提取逻辑

| 区块 | 行号 | 行数 | 功能 |
|------|------|------|------|
| viewport 切换 | 777-779 | 3 | handleViewportChange |
| 删除确认 | 763-770 | 8 | handleDelete |

### 提取方案

#### Hook 1: `useExport(projectId)` — ~200行

```typescript
// apps/platform/lib/hooks/use-export.ts

/**
 * 标准项目导出 Hook
 * 
 * 封装：
 * - WS 连接生命周期管理（connect/reconnect/cleanup）
 * - 进度状态（stage、percent、error）
 * - 文件下载
 */
export function useExport(projectId: string | null) {
  // 合并状态: isExporting, exportError, exportStage, exportPercent
  // 合并 refs: exportWsRef, exportTaskIdRef, exportDownloadUrlRef, reconnectAttemptsRef, exportPingTimerRef
  // 方法: startExport(), connectExportWs(), downloadExport()
  // useEffect cleanup
  
  return { isExporting, exportError, exportStage, exportPercent, startExport };
}
```

包含行号范围: 117-125 (状态), 155-204 (工具函数/下载), 206-330 (connectExportWs), 571-607 (cleanup), 609-655 (handleExport)
**预估**: ~200行

#### Hook 2: `useArchiveExport(projectId)` — ~180行

```typescript
// apps/platform/lib/hooks/use-archive-export.ts

/**
 * 配置归档导出 Hook
 */
export function useArchiveExport(projectId: string | null) {
  // 合并状态: isArchiveExporting, archiveExportError, archiveExportStage, archiveExportPercent
  // 合并 refs: archiveExportWsRef, archiveExportTaskIdRef, archiveExportDownloadUrlRef
  // 方法: startArchiveExport(options?)
  
  return { isArchiveExporting, archiveExportError, archiveExportStage, archiveExportPercent, startArchiveExport };
}
```

包含行号范围: 127-137 (状态), 332-455 (connectArchiveExportWs), 571-607 (cleanup部分), 657-707 (handleArchiveExport)
**预估**: ~180行

#### Hook 3: `useArchiveImport()` — ~150行

```typescript
// apps/platform/lib/hooks/use-archive-import.ts

/**
 * 配置归档导入 Hook
 */
export function useArchiveImport() {
  // 合并状态: isArchiveImporting, archiveImportError, archiveImportStage, archiveImportPercent, archiveImportResultProjectId
  // 合并 refs: archiveImportWsRef, archiveImportTaskIdRef, importFileInputRef
  // 方法: pickFile(), handleFileSelected(file)
  
  return { isArchiveImporting, archiveImportError, archiveImportStage, archiveImportPercent, startImport };
}
```

包含行号范围: 139-148 (状态), 457-569 (connectArchiveImportWs), 571-607 (cleanup部分), 709-760 (handleArchiveImport)
**预估**: ~150行

#### Hook 4: `useProjectSync(projectId)` — ~30行

```typescript
// apps/platform/lib/hooks/use-project-sync.ts

/**
 * 项目同步 Hook（薄封装 useProjectLocalSync）
 */
export function useProjectSync(projectId: string | null) {
  const sync = useProjectLocalSync(projectId, { ... });
  const syncBusy = sync.isSyncing || sync.isResolvingBaseline || 
    flowSaving || endpointSaving || isSaving;
  return { sync, syncBusy };
}
```

**预估**: ~30行

#### 通用 WebSocket 模式抽取

三个 WS 连接逻辑（connectExportWs、connectArchiveExportWs、connectArchiveImportWs）高度相似（~120行/个），共享相同的：
- 注册/订阅模式
- ping/pong 保活定时器
- 断线重连（指数退避）
- 生命周期清理

可抽取为通用 `useTaskWebSocket` hook：

```typescript
// apps/platform/lib/hooks/use-task-websocket.ts (~80行)

interface TaskWsOptions {
  wsPort: number;
  wsPath: string;
  onSnapshot: (task: Record<string, unknown>) => void;
  taskFilter?: (task: Record<string, unknown>) => boolean;
}

function useTaskWebSocket() {
  // connect(url, taskId, onSnapshot) => cleanup
  // manages: ping timer, reconnection, cleanup
}
```

**预估**: ~80行，但每个导出/导入 hook 仍需 ~80行业务逻辑（任务创建、状态管理、UI 进度映射）。

### 拆分后 toolbar 文件预估

| 内容 | 行数 |
|------|------|
| 导入 & 常量 | ~65 |
| 状态声明（从各 hook 解构） | ~20 |
| Toolbar 渲染 JSX（左面板、撤销/重做、视口、定位模式、缩放、同步UI、导出/导入按钮、删除、右面板） | ~400 |
| 内联逻辑（handleDelete、handleViewportChange、预览/API测试状态） | ~30 |
| Hook 调用绑定 | ~15 |
| **总计** | **~530行** |

---

## ISC-R5/R6: withHistory 高阶函数设计

### 问题

当前 store.ts 中 ~37 处 action 各自内联实现历史记录逻辑（takeSnapshot → snapshotEquals → push historyPast → 截断 historyLimit），导致：
- 代码膨胀（~20行 × 37 = ~740 行纯重复代码）
- 每次对 `components` 做 `structuredClone`（全量深拷贝，O(n) 时间 + O(n) 内存）
- 修改历史逻辑需要改 ~37 处

### withHistory 高阶函数签名

```typescript
// packages/engine/src/canvas/store/history.ts

interface HistoryOptions {
  /** coalesce key（如 "move"、"resize"、"zoom"），250ms 内同 key 操作合并为一次记录 */
  coalesceKey?: string;
  /** 是否计入历史（false 时只更新状态，不记录快照） */
  track?: boolean;
}

/**
 * 包装一个返回 Partial<CanvasState> 的 reducer，自动注入历史记录逻辑。
 * 
 * 设计要点：
 * - 使用 immer 或 patch-based 增量 diff 替代 structuredClone 全量快照
 * - coalesce 模式：250ms 内同 key 操作不追加新历史条目
 * - batching 期间跳过历史记录，由 batch() 结束时统一处理
 */
function withHistory<T extends any[]>(
  fn: (state: CanvasState, ...args: T) => Partial<CanvasState>,
  options?: HistoryOptions,
): (state: CanvasState, ...args: T) => Partial<CanvasState>;
```

### 实现大纲

```typescript
// Phase 1: 当前全量深拷贝方案 (快速落地，消除重复)
function withHistory(
  fn: (state: CanvasState, ...args: any[]) => Partial<CanvasState>,
  opts?: HistoryOptions,
) {
  return (state: CanvasState, ...args: any[]): Partial<CanvasState> => {
    const partial = fn(state, ...args);
    
    if (batching) return partial;
    
    const prev = takeSnapshot(state);
    const nextState = { ...(state as CanvasState), ...partial };
    const next = takeSnapshot(nextState);
    if (snapshotEquals(prev, next)) return partial;
    
    if (opts?.coalesceKey) {
      const now = Date.now();
      const coalesce = lastCoalesceKey === opts.coalesceKey && now - lastCoalesceAt < 250;
      lastCoalesceKey = opts.coalesceKey;
      lastCoalesceAt = now;
      if (coalesce) return { ...partial, historyFuture: [], canRedo: false };
    } else {
      lastCoalesceKey = null;
    }
    
    const past = [...state.historyPast, prev];
    const limitedPast = past.length > state.historyLimit 
      ? past.slice(past.length - state.historyLimit) : past;
    return { ...partial, historyPast: limitedPast, historyFuture: [], 
      canUndo: limitedPast.length > 0, canRedo: false };
  };
}
```

```typescript
// Phase 2: 增量 diff 方案 (后续升级，大幅减少内存)
// 
// 核心思路：
// 1. 历史栈不存完整快照，而是存"逆操作"（inverse patches）
// 2. undo = 应用逆操作；redo = 应用正向操作
// 3. 使用 immer 的 produce + patchListener 自动捕获 patches
//
// CanvasSnapshot → CanvasPatch 类型变更：
// type CanvasPatch = {
//   op: "add" | "remove" | "update" | "move" | "resize";
//   // 最小必要信息，无需存整个 components 数组
// };
//
// const patches = produceWithPatches(state, draft => { mutate(draft); });
// // patches[0] = forward patches, patches[1] = inverse patches
```

### 使用示例（消除重复）

```typescript
// 改造前（20行）:
addComponent: (comp) => {
  set((state) => {
    if (batching) return { components: [...state.components, comp] };
    const prev = takeSnapshot(state);
    const partial = { components: [...state.components, comp] };
    const next = takeSnapshot({ ...(state as CanvasState), ...partial });
    if (snapshotEquals(prev, next)) return partial;
    const past = [...state.historyPast, prev];
    const limitedPast = past.length > state.historyLimit 
      ? past.slice(past.length - state.historyLimit) : past;
    lastCoalesceKey = null;
    return { ...partial, historyPast: limitedPast, historyFuture: [], 
      canUndo: limitedPast.length > 0, canRedo: false };
  });
},

// 改造后（5行）:
addComponent: withHistory((state, comp) => ({
  components: [...state.components, comp],
})),
```

```typescript
// 带 coalesce 的改造前（~20行）:
moveComponent: (id, x, y) => {
  set((state) => {
    const partial = { components: ... };
    if (batching) return partial;
    const prev = takeSnapshot(state);
    const next = takeSnapshot({ ...(state as CanvasState), ...partial });
    if (snapshotEquals(prev, next)) return partial;
    const now = Date.now();
    const coalesce = lastCoalesceKey === "move" && now - lastCoalesceAt < 250;
    // ... more boilerplate
  });
},

// 改造后（5行）:
moveComponent: withHistory((state, id, x, y) => ({
  components: state.components.map(c => c.id !== id ? c : { ...c, position: { ...c.position, x: clampXByWidth(x, c.position.width, state.gridCols), y: Math.max(1, Math.round(y)) } }),
}), { coalesceKey: "move" }),
```

### 行数影响估算

| 项目 | 改造前 | 改造后 |
|------|--------|--------|
| 每处 action 历史代码 | ~18行 | ~1行（withHistory 包装器） |
| ~37 处 action | ~660行 | ~37行 |
| takeSnapshot/snapshotEquals | ~25行 | ~25行（保留，被 withHistory 内部使用） |
| withHistory 函数定义 | 0 | ~30行 |
| undo/redo/batch/hydrate/clearHistory | ~90行 | ~90行（保留） |
| **净减少** | — | **~600行** |

---

## 汇总：拆分后的文件树

```
packages/engine/src/canvas/
├── renderer.tsx                    (~30行, re-export)
├── canvas-renderer.tsx             (~365行, 主渲染器)
├── renderer-utils.ts               (~110行, 工具函数+常量)
├── simulated-content.tsx           (~100行, 模拟内容协调器)
├── simulated-components-form.tsx   (~280行, 表单/展示组件模拟)
├── simulated-components-layout.tsx (~390行, 容器/覆盖组件模拟)
├── canvas-component-item.tsx       (~240行, 单组件渲染项)
├── bounding-box-overlay.tsx        (~55行, 多选包围盒)
├── breadcrumb-bar.tsx              (~35行, 面包屑导航)
├── smart-guides.tsx                (~105行, 智能对齐)
├── marquee-overlay.tsx             (~35行, 框选覆盖)
├── store.ts                        (~80行, 主 store 组装)
└── store/
    ├── history.ts                  (~180行, withHistory + 历史管理)
    ├── tree-ops.ts                 (~380行, 树操作核心)
    ├── viewport.ts                 (~220行, 视口/页面状态)
    ├── component-crud.ts           (~120行, 组件增删改)
    ├── selection.ts                (~100行, 选中操作)
    ├── clipboard.ts                (~200行, 剪贴板)
    └── component-ops.ts            (~260行, Lock/Hide/Z-Order/Align)

packages/engine/src/slots/
├── aggregate-slot-mapper.ts        (~60行, 入口)
├── slot-engine-types.ts            (~50行, 类型定义)
├── slot-engine.ts                  (~350行, 声明式引擎)
├── slot-configs.ts                 (~200行, 组件配置注册)
└── slot-mappers/
    ├── card.ts                     (~80行)
    ├── tabs.ts                     (~80行)
    ├── accordion.ts                (~80行)
    ├── table.ts                    (~120行)
    ├── pagination.ts               (~80行)
    ├── overlay.ts                  (~150行)
    ├── drawer.ts                   (~80行)
    └── menu.ts                     (~60行)

apps/platform/
├── lib/hooks/
│   ├── use-export.ts               (~200行)
│   ├── use-archive-export.ts       (~180行)
│   ├── use-archive-import.ts       (~150行)
│   ├── use-project-sync.ts         (~30行)
│   └── use-task-websocket.ts       (~80行, WebSocket 通用抽象)
└── components/editor/
    └── editor-toolbar.tsx          (~530行, 精简后的工具栏)
```

### ISC 验证矩阵

| ISC | 要求 | 验证方式 |
|-----|------|---------|
| ISC-R1 | renderer.tsx ≤400行/文件 | 所有拆分文件 ≤400行 ✅ |
| ISC-R2 | 树操作/历史/视口独立模块 | 3个独立文件: tree-ops.ts, history.ts, viewport.ts ✅ |
| ISC-R3 | aggregate-slot-mapper ≤400行引擎 | slot-engine.ts ~350行 + configs ~200行 ✅ |
| ISC-R4 | 导出导入同步独立 hook | use-export.ts, use-archive-export.ts, use-archive-import.ts, use-project-sync.ts, use-task-websocket.ts ✅ |
| ISC-R5 | 历史改增量diff | Phase 1 先消除重复，Phase 2 改用 immer patches ✅ |
| ISC-R6 | withHistory 消除37处重复 | withHistory HOF 签名+实现大纲 ✅ |
| ISC-R9 | 删除历史死代码 | COMPONENT_TYPES_THAT_SUPPORT_CHILDREN 待迁移后删除 ✅ |
