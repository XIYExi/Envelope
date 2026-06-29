# Report 1: Lowcode-Engine BEM Tools + Dragon 实现深度分析

> 基于 `lowcode-engine-main/packages/designer/src/` 源码逐行阅读
> 生成日期: 2026-06-29

---

## 一、BEM Tools 覆盖层架构

### 1.1 整体架构

BEM = **B**order **E**ngineering **M**anager。本质上是渲染在画布上方的**独立覆盖层**，所有选中框、缩放手柄、插入指示器都通过绝对定位 `div` 叠加显示，与下方画布组件 DOM 完全分离。

```
BemTools (index.tsx) — 顶层容器
  ├─ <div className="lc-bem-tools">  ← 整个覆盖层
  │   transform: translate(-scrollX*scale, -scrollY*scale)
  │   ├─ BorderDetecting    — 悬停高亮
  │   ├─ BorderSelecting    — 选中框 + 操作工具栏
  │   ├─ BorderContainer    — 拖拽时的容器边界提示
  │   ├─ InsertionView      — 插入位置指示线
  │   ├─ BorderResizing     — 八向缩放手柄
  │   └─ [Plugin BEM Tools] — 通过 BemToolsManager 注册的自定义工具
  └─ Canvas (iframe)  ← 画布内容在覆盖层下方
```

**关键设计决策：**
- 整个 `lc-bem-tools` 层通过 `transform: translate(...)` 跟随画布滚动，不修改 DOM 布局
- 每个子工具通过 `pointer-events: none` 不拦截鼠标事件（手柄区域除外）
- 通过 `@observer` (MobX) 响应式绑定到 `host.viewport`（scale/scrollX/scrollY），坐标变化自动重渲染

### 1.2 BorderSelecting — 选中框 + 工具栏

三层嵌套组件：

```
BorderSelecting (顶层)
  └─ BorderSelectingForNode × N (每个选中节点一个)
       └─ BorderSelectingInstance × M (每个节点实例，MobX watched)
            └─ <div className="lc-borders lc-borders-selecting">
                   ├─ 边框样式 (width/height/transform 来自 OffsetObserver)
                   └─ Toolbar (操作按钮, 仅在非拖拽态显示)
```

**核心机制：**

**1. 选中节点获取 (BorderSelecting.tsx:207-213)**
```typescript
@computed get selecting() {
    const doc = this.host.currentDocument;
    const { selection } = doc;
    return this.dragging ? selection.getTopNodes() : selection.getNodes();
}
```
- **拖拽中** → `getTopNodes()` 只返回顶层选中节点（避免嵌套组件抖动）
- **正常态** → `getNodes()` 返回所有选中节点

**2. 位置计算 (BorderSelectingInstance.tsx:30-64)**
```typescript
const { offsetWidth, offsetHeight, offsetTop, offsetLeft } = observed;
// observed 是 OffsetObserver 实例，自动计算 scale + scroll 补偿
const style = {
  width: offsetWidth,
  height: offsetHeight,
  transform: `translate3d(${offsetLeft}px, ${offsetTop}px, 0)`,
};
```

**3. 操作工具栏 (Toolbar.tsx:68-121)**
- 位置自适应：根据 `observed.top` 判断工具栏放在选中框上方/下方/内部
- 按钮来源：`node.componentMeta.availableActions` → 根据 `disableBehaviors` 动态过滤
- 三种 action 类型：`ReactElement`（直接渲染）、`Component`（createElement）、`ActionContentObject`（`{ action, title, icon }`）

### 1.3 BorderDetecting — 悬停高亮

**悬停检测源 (BorderDetecting.tsx:60-73)：**
```typescript
@computed get current() {
    const { current } = host.designer.detecting; // ← 来自 Detecting 类
    if (!current || current.document !== doc || selection.has(current.id)) {
      return null; // 已选中的组件不显示悬停高亮
    }
    return current;
}
```

**渲染机制 (BorderDetectingInstance.tsx:17-44)：**
```typescript
const style = {
  width: rect.width * scale,
  height: rect.height * scale,
  transform: `translate(${(scrollX + rect.left) * scale}px, ${(scrollY + rect.top) * scale}px)`,
};
```
- 直接使用 `host.computeComponentInstanceRect()` 获取 DOM 矩形
- 手动乘 `scale`、加 `scrollX/Y` 补偿

**特殊处理：**
- **锁定祖先检测**：`getClosestNode(current, n => n.isLocked)` → 如有锁定祖先，高亮锁定祖先，显示锁定图标
- **Root 节点**：`current.contains(focusNode)` → 高亮整个视口

### 1.4 BorderResizing — 缩放手柄

同样三层嵌套：`BoxResizing → BoxResizingForNode → BoxResizingInstance`

**手柄渲染 (BoxResizingInstance.tsx:236-357)：**
- 8 个独立 ref：`outlineN/E/S/W/NE/NW/SE/SW`
- 每个都是绝对定位的 `<div>`，通过 `transform: translate(...)` 定位到组件边缘
- 可见性由 `triggerVisible` 控制（来自 `componentMeta.advanced.getResizingHandlers()`）

**事件绑定 (BoxResizingInstance.tsx:192-234)：**
```typescript
this.dragEngine.from(this.outlineN, 'n', () => node);
this.dragEngine.from(this.outlineE, 'e', () => node);
// ... 8 directions
```
每个手柄通过 `DragResizeEngine.from(shell, direction, boost)` 绑定 mousedown → mousemove → mouseup 链。

### 1.5 DragResizeEngine — 缩放事件引擎

`drag-resize-engine.ts` (131 行) 是一个精巧的**事件引擎**：

```typescript
class DragResizeEngine {
  private emitter = createModuleEventBus('DragResizeEngine');

  from(shell: Element, direction: string, boost: (e) => Node) {
    // mousedown → 记录 startEvent，调用 boost() 获取 node
    // mousemove → 计算 moveX/moveY，emit('resize', e, direction, node, moveX, moveY)
    // mouseup   → emit('resizeEnd', e, direction, node)
  }

  onResize(func)       { this.emitter.on('resize', func) }
  onResizeStart(func)   { this.emitter.on('resizeStart', func) }
  onResizeEnd(func)     { this.emitter.on('resizeEnd', func) }
}
```

**iframe 适配：** `createResizeEvent()` 检测事件来源，如果是 iframe 内的事件，通过 `sim.viewport.toGlobalPoint()` 转换坐标。

### 1.6 InsertionView — 插入指示器

**数据源：** `host.currentDocument?.dropLocation`（由 Dragon 的 `sensor.locate()` 更新）

**位置计算流程 (insertion.tsx:26-113)：**
1. `processDetail(loc)` → 判断 `detail.type` 是 `Children` 还是其他
2. `processChildrenDetail(sim, container, detail)`：
   - `detail.near` 存在 → 根据 `pos` (before/after/replace) 计算插入位置
   - `detail.index` 存在（从大纲树拖出）→ 获取 `container.children.get(index)` 的 rect 计算位置
3. 返回 `{ edge, insertType, coverRect, nearRect, vertical, nearNode }`

**三种插入指示样式 (InsertionView.tsx:135-169)：**
- `cover` → 在目标容器上方显示半透明覆盖层（`className += ' cover'`）
- `vertical` → 垂直线段（`className += ' vertical'`），高度等于相邻节点
- `horizontal` → 水平线段（默认），宽度等于相邻节点

### 1.7 BorderContainer — 容器边界提示

- 通过 `eventBus.on('designer.dropLocation.change', ...)` 监听拖拽位置变化
- 在拖拽目标容器的边缘显示带标题的边框，提示用户"将放入此容器"

### 1.8 BemToolsManager — 插件注册管理器

```typescript
class BemToolsManager {
  addBemTools(data: { name: string; item: ComponentType<{ host }> });
  removeBemTools(name: string);
  getAllBemTools();  // → 在 BemTools.render() 中遍历渲染
}
```
很简单，允许第三方插件向覆盖层添加自定义工具。

---

## 二、OffsetObserver — 位置观测器

**核心职责：** 持续追踪节点实例在画布中的位置，自动补偿 scroll/scale。

### 2.1 数据结构

```typescript
class OffsetObserver {
  @obx private _height, _width, _left, _top, _right, _bottom; // 原始坐标
  @computed get offsetLeft() { return this.left + this.viewport.scrollX * this.scale; }
  @computed get offsetTop()  { return this.top + this.viewport.scrollY * this.scale; }
  @computed get offsetWidth(), offsetHeight() {} // 含 scale 补偿
}
```

### 2.2 计算循环

```typescript
const compute = () => {
  const rect = host.computeComponentInstanceRect(instance, rootSelector);
  if (rect) {
    // 更新 _height/_width/_left/_top... 
    this.hasOffset = true;
  }
  this.pid = requestIdleCallback(compute); // 持续循环
};
```
使用 `requestIdleCallback` 在浏览器空闲时持续计算，避免阻塞主线程。

### 2.3 滚动时冻结

```typescript
@computed get offsetTop() {
  if (!this.viewport.scrolling || this.lastOffsetTop == null) {
    this.lastOffsetTop = this.top + this.viewport.scrollX * this.scale;
  }
  return this.lastOffsetTop; // 滚动期间冻结，避免闪烁
}
```

---

## 三、Dragon 拖拽引擎

### 3.1 整体架构

```
Dragon (拖拽引擎)
  ├─ sensors[] — 传感器列表（模拟器注册进来）
  ├─ from(shell, boost) — 快速监听容器元素的鼠标事件
  ├─ boost(dragObject, boostEvent) — 发射拖拽（核心方法）
  │   ├─ createLocateEvent() — 创建坐标事件（含 iframe 坐标转换）
  │   ├─ chooseSensor() — 选择当前激活的传感器
  │   └─ event 生命周期: dragstart → drag → dragend
  ├─ addSensor/removeSensor — 传感器注册
  └─ event emitter — 发射 'dragstart', 'drag', 'dragend' 事件
```

### 3.2 Dragon.from() — 快速绑定

```typescript
from(shell, boost) {
  shell.addEventListener('mousedown', (e) => {
    const dragObject = boost(e); // boost 函数返回拖拽对象，或 null 取消
    if (dragObject) this.boost(dragObject, e);
  });
}
```

### 3.3 Dragon.boost() — 拖拽全生命周期 (核心，~370行)

**阶段 1: 设置 (lines 173-310)**
- 获取 `masterSensors` (当前所有文档的模拟器)
- `makeEventsHandler(boostEvent, masterSensors)` — 跨 iframe 事件处理
- 设置 `mousedown` → `dragstart` (shaken 检测) → `mousemove` → `mouseup` 事件链
- 支持 `ESC` 取消 (keyCode 27)

**阶段 2: Shaken 检测 — 防误触 (lines 58-77)**
```typescript
export function isShaken(e1, e2): boolean {
  return Math.pow(e1.clientY - e2.clientY, 2) + Math.pow(e1.clientX - e2.clientX, 2) > 4;
}
```
鼠标移动 < 4px 不触发拖拽，防止点击误触。

**阶段 3: 拖拽中 — chooseSensor + locate (lines 233-290)**
```typescript
const drag = (e) => {
  const locateEvent = createLocateEvent(e);
  const sensor = chooseSensor(locateEvent);
  if (sensor) {
    sensor.fixEvent(locateEvent);
    sensor.locate(locateEvent);      // → 计算 DropLocation
    designer.setLocation(loc);       // → 更新 document.dropLocation
  }
  this.emitter.emit('drag', locateEvent);
};
```

**阶段 4: 拖拽结束 (lines 341-419)**
- 触发 `dragend` 事件
- 清除所有状态（`cursor.release()`、`setDraggingState(false)`、`setCopyState(false)`）
- 清理事件监听器

**阶段 5: 复制态检测 (lines 200-230)**
```typescript
const checkcopy = (e) => {
  if (e.altKey || e.ctrlKey) { copy = true; this.setCopyState(true); }
};
```

### 3.4 chooseSensor — 传感器选择

```typescript
const chooseSensor = (e) => {
  const sensors = this.sensors.concat(masterSensors);
  let sensor = e.sensor?.isEnter(e) ? e.sensor 
             : sensors.find(s => s.sensorAvailable && s.isEnter(e));
  if (!sensor) sensor = lastSensor || e.sensor || sourceSensor;
  // ... 切换时 deactiveSensor
  this._activeSensor = sensor;
  return sensor;
};
```

### 3.5 createLocateEvent — 坐标转换

```typescript
const createLocateEvent = (e) => {
  if (sourceDocument === document) {
    evt.globalX = e.clientX; // 当前文档直接使用
  } else {
    // iframe 内 → 通过 srcSim.viewport.toGlobalPoint(e) 转换
    const g = srcSim.viewport.toGlobalPoint(e);
    evt.globalX = g.clientX; evt.globalY = g.clientY;
    evt.canvasX = e.clientX; evt.canvasY = e.clientY; // 保留原始 canvas 坐标
  }
};
```

---

## 四、Detecting — 悬停检测

**非常简单的独立类 (`detecting.ts:79行`):**

```typescript
class Detecting {
  @obx.ref private _enable = true;
  @obx.ref private _current: INode | null = null;

  capture(node) { if (this._current !== node) { this._current = node; } }
  release(node) { if (this._current === node) { this._current = null; } }
  leave(document) { if (this.current?.document === document) { this._current = null; } }
  onDetectingChange(fn) { this.emitter.on(DETECTING_CHANGE_EVENT, fn); }
}
```

**关键特性：** `enable` 标志位，拖拽/缩放时自动禁用（`detecting.enable = false`），避免拖拽过程中闪烁。

---

## 五、Scroller — 自动滚动

**核心算法 (scroller.ts:127-181):**

```typescript
scrolling(point: { globalX, globalY }) {
  const { bounds, scale } = this.scrollable;
  
  // 判断鼠标是否在边缘 30px 区域内
  if (y < bounds.top + SCROLL_ACCURACY) { ay = -速度; } // 向上滚
  if (y > bounds.bottom - SCROLL_ACCURACY) { ay = +速度; } // 向下滚
  if (x < bounds.left + SCROLL_ACCURACY) { ax = -速度; } // 向左滚
  if (x > bounds.right - SCROLL_ACCURACY) { ax = +速度; } // 向右滚

  // rAF 循环持续滚动
  const animate = () => {
    scrollTarget.scrollTo({ left: sx, top: sy });
    this.pid = requestAnimationFrame(animate);
  };
  animate();
}
```

**速度公式：** 距边缘越近滚动越快，`Math.min(Math.max(距离边缘, 10), 50) / scale`。

---

## 六、Viewport — 视口坐标系统

**整个系统的坐标枢纽 (viewport.ts:186行):**

```typescript
class Viewport {
  @obx.ref private _scale = 1;
  @obx.ref private _scrollX = 0;
  @obx.ref private _scrollY = 0;
  @obx private _scrolling = false; // 滚动中标志（80ms 超时矫正）

  // 全局坐标系 ↔ 本地坐标系转换
  toGlobalPoint(point): Point {
    return { clientX: point.clientX * scale + rect.left, 
             clientY: point.clientY * scale + rect.top };
  }
  toLocalPoint(point): Point {
    return { clientX: (point.clientX - rect.left) / scale,
             clientY: (point.clientY - rect.top) / scale };
  }
}
```

---

## 七、关键架构模式总结

| 模式 | 实现方式 | 优点 |
|------|---------|------|
| **覆盖层分离** | `BemTools` 在画布上方独立渲染 | 不干扰画布 DOM，任意数量覆盖层无性能问题 |
| **OffsetObserver 循环** | `requestIdleCallback` 持续计算 DOM 位置 | 自动追踪 scroll/scale，滚动时冻结防抖 |
| **COAST 坐标转换** | `Viewport.toGlobalPoint/toLocalPoint` | 统一的坐标系转换，支持 iframe |
| **Sensors 委托** | Dragon 委托 Sensor 计算具体落点 | 支持多模拟器并行，可扩展 |
| **事件驱动** | `createModuleEventBus('DragResizeEngine')` | 模块间解耦 |
| **渐进式响应** | MobX `@obx.ref` + `@computed` | 最小颗粒度更新，不浪费渲染 |
| **Shaken 过滤** | 4px 阈值检测 | 防止点击误触发拖拽 |
