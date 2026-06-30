# V4-B Dragging 架构（AutoScroll + DropLocation 统一模型）

> 本文档是 **V4-B Dragging 闭环** 的权威交接文档。后续 AI 在修改 Dragon/Scroller/Location/drop 提交相关代码前，必须先读本文档，再读对应源码。

## 1. 设计对齐对象

| 概念 | lowcode-engine 位置 | Envelope 对应 |
|------|---------------------|---------------|
| locate 循环（scroller + location） | `builtin-simulator/host.ts locate(e)` | `Dragon.onDragMove(...)` |
| DropLocation（语义对象） | `designer/src/designer/location.ts DropLocation` | `packages/engine/src/canvas/types.ts DropLocation` |
| Designer 持有 dropLocation | `designer.ts _dropLocation + createLocation/clearLocation` | `Dragon.currentDropLocation + getDropLocation()` |
| Scroller 接入点 | `host.locate(e) → scroller.scrolling(e)` | `Dragon.onDragMove(...) → scroller.scrolling(...)` |
| AutoScroll 驱动 | 真实 scrollTop/Left | `CanvasScroller onScroll(dx,dy) → store.setPan` |
| 第二处 scroller（outline） | `plugin-outline-pane/pane-controller.ts locate(e)` | **本轮不实现，接口预留** |

## 2. 坐标系统（统一为 lowcode 风格 globalX/globalY）

- 所有 locate/scroller 计算只使用 `globalX/globalY`（鼠标在视口的 client 坐标）。
- 由 `editor-layout.tsx` 在 `handleDragMove` 计算 `globalX = activatorEvent.clientX + delta.x`，传入 Dragon。
- Dragon 内部禁止再访问 `event.activatorEvent`（类型不稳定，lowcode 也是在外层订正事件）。

## 3. 确认点（已定义，不再变动）

1. **viewportRect 来源**：`document.querySelector('[data-role="canvas-viewport"]')` 的 `getBoundingClientRect()`。
   - 这是对齐 lowcode-engine `scrollable.bounds` 的视口边界。
   - `canvas-grid` 的 rect 仅用于 Location 坐标归一化（canvasX/canvasY），不用于 scroller。
2. **DropLocation.source 命名**：本轮固定 `"canvas"`。
   - 后续扩展 outline/tree 时新增 `"tree"` / `"outline"`。
   - Dragon 在 locate 时根据当前 sensor 设置 source（本轮只有 canvas sensor）。
3. **pages 重排不纳入 Dragon**：保持 `editor-layout.tsx` 直接处理 `page-drop:` 协议（对齐 lowcode-engine 把页面管理留在 project UI 层）。

## 4. 类型契约（新增/扩展）

### `packages/engine/src/canvas/types.ts`

```ts
/** 拖拽对象（对齐 lowcode IPublicModelDragObject 的最小子集） */
export interface DragObject {
  type: "material" | "canvas-component";
  materialName?: string;
  componentId?: string;
  data?: Record<string, unknown>;
}

/** locate 事件（对齐 lowcode ILocateEvent 的最小子集） */
export interface LocateEvent {
  type: "LocateEvent";
  globalX: number;
  globalY: number;
  dragObject: DragObject;
  originalEvent?: DragMoveEvent;
}

/** DropLocation 详情（对齐 lowcode IPublicTypeLocationDetail 的最小子集） */
export interface DropLocationDetail {
  type: "Children";
  index: number;
  nearNodeId?: string;
  insertType?: "before" | "after" | "cover";
  isVertical?: boolean;
  valid: boolean;
  rect?: { x: number; y: number; width: number; height: number };
}

/** DropLocation（语义对象，Dragon 持有） */
export interface DropLocation {
  targetContainerId: string;
  detail: DropLocationDetail;
  event: LocateEvent;
  source: "canvas";
}
```

### DropLocation 与 DropTargetInfo 的关系

- `DropTargetInfo`（现有）：渲染用，InsertionView/BorderContainer 消费。
- `DropLocation`（新增）：语义用，dragEnd 提交消费。
- 映射：`DropLocation.detail.rect` + `detail.insertType` → `DropTargetInfo`。
- Dragon 同时维护两者，editor-layout 各取所需。

## 5. Dragon 公开 API（本轮目标）

```ts
class Dragon {
  // Phase A
  onDragMove(event, state, viewport, viewportRect, gridRect, globalX, globalY): DragMoveResult;
  // Phase B
  getDropLocation(): DropLocation | null;
  getDragObject(): DragObject | null;
  onDragEnd(): void;  // 清空 dropLocation + cancel scroller
}
```

## 6. editor-layout 调用契约（本轮目标）

```ts
// dragMove
const { globalX, globalY } = computeGlobalCoords(event);
const result = dragon.onDragMove(event, state, viewport, viewportRect, gridRect, globalX, globalY);
setDragAlignInfo(result.alignInfo);
useCanvasStore.getState().setDropTarget(result.dropTarget);

// dragEnd（非 pages）
const loc = dragon.getDropLocation();
const obj = dragon.getDragObject();
if (loc && obj) {
  commitDrop(loc, obj);  // 统一提交：insertNode/moveNode/moveComponent
}
```

## 7. 不做（明确边界）

- 不做 outline/tree autoscroll（接口预留 `source: "tree"`）
- 不做 Location 二分/性能优化（B2）
- 不引入 OffsetObserver 全量体系
- 不改 BEM Tools 渲染结构
- 不改 materials/NodeManager 内部结构

## 8. 验证标准

- Engine 单测：170+ → 保持通过，新增 autoscroll + dropLocation 用例
- Platform 测试：42 → 不回归
- 手工：拖拽到画布边缘 → 自动滚动 + insertion 指示持续更新
