# Report 2: Envelope Phase 1 改造方案 — BEM Tools + Dragon

> 基于 lowcode-engine 分析报告，在 Envelope 现有 Zustand + dnd-kit + React 技术栈上适配实现
> 生成日期: 2026-06-29

---

## 0. 改造上下文：Envelope 当前画布交互现状

### 0.1 当前架构

```
CanvasRenderer (Canvas组件容器)
  ├── Ruler, Grid Background, Minimap
  └── CanvasComponentItem × N  ← 选中框/缩放手柄/悬停全嵌入此处
       ├── useDraggable (dnd-kit)
       ├── useDroppable (dnd-kit)  ← 嵌套容器接收拖放
       ├── [选中框] inline style on div
       ├── [缩放手柄] 8个 div + pointer events
       ├── [悬停标签] conditional render
       └── UnifiedSimulatedContent (组件模拟渲染)
```

### 0.2 问题汇总

| 问题 | 当前实现 | 影响 |
|------|---------|------|
| **覆盖层嵌入组件** | 选中框/缩放手柄/悬停标签都在 `CanvasComponentItem` 内 | 组件重渲染会导致覆盖层闪烁；无法独立控制覆盖层级 |
| **选中框位置计算** | 从 Zustand store 读取 position + zoom 直接计算 | 无 OffsetObserver 循环，容器滚动时不更新 |
| **缩放手柄事件** | inline pointer events + calcResizeNext | 与组件 onSelect/onHover 同层，事件冒泡互相干扰 |
| **无独立 Detecting** | hover 在 CanvasComponentItem 内 `onMouseEnter/Leave` | 每次 hover 都会触发组件重渲染 |
| **无 InsertionView** | 拖拽插入位置依赖 dnd-kit 的 `over` 事件 | 拖拽时看不到插入位置 |
| **无 Dragon 引擎** | dnd-kit 的 `onDragEnd` 直接调用 store.moveComponent | 拖拽逻辑散落在 editor-layout + store 中 |
| **无 Scroller 独立模块** | autoScroll 内联在 editor-layout.tsx (110行) | 不可配置、不易测试 |

---

## 1. 总体改造方案

### 1.1 改造原则

1. **不替换 dnd-kit** — 在其上封装 Dragon 层，dnd-kit 提供底层传感器、useDraggable/useDroppable
2. **不替换 Zustand** — BEM Tools 状态保持现有 store，增加独立 Observing 机制
3. **渐进式** — 先做 BEM Tools 覆盖层分离，再做 Dragon 引擎封装
4. **零功能损失** — 现有 202 ISC 必须全部保留

### 1.2 改造后架构

```
CanvasContainer (顶层容器)
  ├── CanvasRenderer (Grid画布)  ← 只负责组件渲染
  │    └── CanvasComponentItem × N
  │         └── UnifiedSimulatedContent (渲染组件 UI)
  ├── BemTools (独立覆盖层, pointer-events: none)
  │    ├── BorderSelecting  (选中框 + Toolbar)
  │    ├── BorderDetecting  (悬停高亮)
  │    ├── BorderResizing   (缩放手柄)
  │    ├── InsertionView    (插入指示器)
  │    └── [Future] BorderContainer
  ├── SmartGuideOverlay (对齐辅助线, 已有)
  ├── MarqueeOverlay (框选覆盖层, 已有)
  └── DragOverlay (dnd-kit 浮动缩略图, 已有)
```

### 1.3 新增/修改文件清单

```
packages/engine/src/canvas/
├── bem-tools/                          [NEW]
│   ├── index.tsx                       BemTools 顶层容器
│   ├── manager.ts                      BemToolsManager 注册器
│   ├── border-selecting.tsx            选中框 + 操作工具栏
│   ├── border-detecting.tsx            悬停高亮
│   ├── border-resizing.tsx             八向缩放手柄
│   ├── drag-resize-engine.ts           缩放事件引擎 (参考 dnd-kit)
│   ├── insertion.tsx                   插入指示器
│   └── border-container.tsx            (可选)容器边界提示
├── dragon/                             [NEW]
│   ├── index.ts                        Dragon 类导出
│   ├── dragon.ts                       Dragon 拖拽引擎
│   ├── location.ts                     位置计算引擎
│   ├── detecting.ts                    悬停检测
│   ├── scroller.ts                     自动滚动
│   └── offset-observer.ts              位置观测器
├── canvas-renderer.tsx                 [MODIFY] 精简，只保留组件渲染
├── canvas-component-item.tsx           [MODIFY] 移除嵌入的选中框/缩放手柄
├── types.ts                            [MODIFY] 新增 BEM 相关类型
└── index.ts                            [MODIFY] 导出新模块
```

---

## 2. 详细改造方案

### 2.1 Step 1: BemTools 覆盖层基础设施

#### 2.1.1 `bem-tools/index.tsx` — 覆盖层容器

参考 `lowcode-engine/builtin-simulator/bem-tools/index.tsx`

```tsx
// 核心实现
export const BemTools = ({ host }: { host: BemToolHost }) => {
  const { zoom, panX, panY } = useCanvasStore(s => ({ zoom: s.zoom, panX: s.panX, panY: s.panY }));
  const bemTools = BemToolsManager.getAll();

  return (
    <div
      className="bem-tools"
      style={{
        transform: `translate(${-panX}px, ${-panY}px) scale(${zoom})`,
        transformOrigin: '0 0',
        pointerEvents: 'none',    // 不拦截画布交互
      }}
    >
      <BorderDetecting />
      <BorderSelecting />
      <InsertionView />
      <BorderResizing />
      {bemTools.map(T => <T key={T.name} />)}
    </div>
  );
};
```

**适配要点（相对于 lowcode-engine 的变更）：**
- lowcode-engine 用 MobX `@computed` + `@observer` → Envelope 用 Zustand `useCanvasStore` selector
- `transform: translate(-scrollX*scale, -scrollY*scale)` → `translate(-panX, -panY) scale(zoom)`（Envelope 的 pan/zoom 语义）
- `transformOrigin: '0 0'` 保证缩放时左上角为原点

#### 2.1.2 `bem-tools/manager.ts` — 注册管理器

直接移植 lowcode-engine 实现，用 React `ComponentType` 替代。

```typescript
export type BemToolComponent = ComponentType<Record<string, never>>;

class BemToolsManager {
  private tools: Map<string, BemToolComponent> = new Map();

  add(name: string, comp: BemToolComponent) { /* 不允许重复 */ }
  remove(name: string) { this.tools.delete(name); }
  getAll() { return Array.from(this.tools.values()); }
}

export const bemToolsManager = new BemToolsManager();
```

### 2.2 Step 2: BorderSelecting — 选中覆盖层

#### 2.2.1 分离选中框到覆盖层

**当前 (canvas-component-item.tsx):**
```tsx
// 选中框在组件内混合渲染
{isSelected && (
  <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none" />
)}
```

**改后 (bem-tools/border-selecting.tsx):**
```tsx
export const BorderSelecting = () => {
  const components = useCanvasStore(useShallow(s => s.components));
  const selectedIds = useCanvasStore(s => s.selectedIds);
  const zoom = useCanvasStore(s => s.zoom);
  const panX = useCanvasStore(s => s.panX);
  const panY = useCanvasStore(s => s.panY);

  const selected = components.filter(c => selectedIds.includes(c.id));

  return (
    <>
      {selected.map(comp => (
        <BorderBox
          key={comp.id}
          comp={comp}
          zoom={zoom}
          panX={panX}
          panY={panY}
        />
      ))}
    </>
  );
};

const BorderBox = ({ comp, zoom, panX, panY }: BorderBoxProps) => {
  const { x, y, width, height } = comp.position;
  // 网格单位 → 像素 (由画布网格计算得出)
  const left = gridToPixel(x, CELL_WIDTH);
  const top = gridToPixel(y, CELL_HEIGHT);
  const w = gridToPixel(width, CELL_WIDTH) - gridGap;
  const h = gridToPixel(height, CELL_HEIGHT) - gridGap;

  return (
    <div
      className="bem-border-selecting"
      style={{
        position: 'absolute',
        left: left + panX,
        top: top + panY,
        width: w * zoom,
        height: h * zoom,
        border: '2px solid #3b82f6',
        pointerEvents: 'auto',  // 只有工具栏区域需要捕获事件
      }}
    >
      <Toolbar comp={comp} />
    </div>
  );
};
```

**适配要点：**
- 不使用 `OffsetObserver`（Envelope 没有 iframe），直接从 store 的 position 字段计算位置
- 使用 `gridToPixel()` 将网格单位转为像素，乘以 `zoom`、加上 `panX/panY`
- `pointerEvents: 'auto'` 仅对工具栏区域启用

#### 2.2.2 Toolbar 组件

参考 lowcode-engine 的 `Toolbar` 位置计算逻辑，但简化：Envelope 的工具栏放在选中框右上角。

```tsx
const Toolbar = ({ comp }: { comp: CanvasComponent }) => {
  const { deleteSelected, toggleLock, copySelected } = useCanvasStore(actions);

  return (
    <div className="flex items-center gap-1 bg-blue-500 text-white rounded-t px-1 text-xs"
         style={{ position: 'absolute', top: -22, right: 0 }}
    >
      <ActionBtn icon="Copy" onClick={copySelected} />
      <ActionBtn icon="Lock" onClick={() => toggleLock(comp.id)} />
      <ActionBtn icon="Trash2" onClick={deleteSelected} />
    </div>
  );
};
```

### 2.3 Step 3: BorderDetecting — 悬停覆盖层

**当前：** 悬停在 `CanvasComponentItem` 内的 `onMouseEnter/Leave` 中处理，通过 `hoveredId` state 传递。

**改后：** 完全独立的覆盖层，从 store 读取 `hoveredId`：

```tsx
export const BorderDetecting = () => {
  const components = useCanvasStore(s => s.components);
  const hoveredId = useCanvasStore(s => s.hoveredId);
  // ... 与 BorderSelecting 类似的 position 计算

  if (!hoveredId) return null;
  const comp = findComponent(components, hoveredId);
  // 如果已选中，不显示悬停 (参考 lowcode-engine: selection.has(current.id) return null)
  if (selectedIds.includes(hoveredId!)) return null;

  return <div className="bem-border-detecting" style={{...}} />;
};
```

### 2.4 Step 4: BorderResizing — 缩放手柄覆盖层

**当前：** 缩放手柄是 `CanvasComponentItem` 内的 8 个 div，与组件同层渲染。

**改后：** 覆盖层中渲染，使用引用 `ref` + 原生事件绑定。

```tsx
export const BorderResizing = () => {
  const selectedComp = getSelectedPrimary();
  if (!selectedComp) return null;

  return (
    <div className="bem-resize-handles pointer-events-none">
      {RESIZE_DIRECTIONS.map(dir => (
        <ResizeHandle
          key={dir}
          direction={dir as ResizeDirection}
          comp={selectedComp}
        />
      ))}
    </div>
  );
};

const ResizeHandle = ({ direction, comp }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const startResize = useResizeStart(comp.id, direction);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // 原生 mousedown 事件，不通过 React 合成事件
    el.addEventListener('mousedown', startResize);
    return () => el.removeEventListener('mousedown', startResize);
  }, [startResize]);

  // 根据 direction 计算位置 (N/E/S/W/NE/NW/SE/SW)
  const pos = getHandlePosition(direction, comp);
  return (
    <div
      ref={ref}
      className={`resize-handle ${direction}`}
      style={{
        position: 'absolute', ...pos,
        width: 10, height: 10,
        pointerEvents: 'auto',
        cursor: `${direction}-resize`,
      }}
    />
  );
};
```

**事件引擎选择：** 不直接移植 `DragResizeEngine`（其事件总线模式对 Envelope 过重）。使用 `useResizeStart` hook 封装 mousedown → mousemove → mouseup 逻辑，直接更新 store。

```typescript
function useResizeStart(compId: string, direction: string) {
  const store = useCanvasStore();
  return useCallback((e: MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX, startY = e.clientY;
    const startPos = store.components.find(c => c.id === compId)?.position;

    const onMove = (ev: MouseEvent) => {
      const dx = (ev.clientX - startX) / zoom / CELL_WIDTH;
      const dy = (ev.clientY - startY) / zoom / CELL_HEIGHT;
      // calcResizeNext 计算新尺寸 (已有)
      const next = calcResizeNext(direction, startPos, dx, dy);
      store.resizeComponent(compId, next.w, next.h, next.x, next.y);
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, [compId, direction]);
}
```

### 2.5 Step 5: InsertionView — 插入指示器

**核心逻辑：** 拖拽过程中实时计算插入位置并显示指示线/块。

```tsx
export const InsertionView = () => {
  const dropTarget = useCanvasStore(s => s.dropTarget); // 新增 store 字段

  if (!dropTarget) return null;

  const { type, rect, isVertical } = dropTarget;

  if (type === 'cover') {
    return <div className="bem-insertion-cover" style={{
      position: 'absolute',
      left: rect.left, top: rect.top,
      width: rect.width, height: rect.height,
      backgroundColor: 'rgba(59,130,246,0.1)',
      border: '2px dashed #3b82f6',
      pointerEvents: 'none',
    }} />;
  }

  // before/after 插入线
  const isVertical = type === 'before' || type === 'after';
  return <div className={`bem-insertion-line ${type}`} style={{
    position: 'absolute',
    ...(isVertical ? {
      left: rect.x, top: rect.y,
      width: 2, height: rect.height,
    } : {
      left: rect.x, top: rect.y,
      height: 2, width: rect.width,
    }),
    backgroundColor: '#3b82f6',
    pointerEvents: 'none',
  }} />;
};
```

**数据源整合：** 当前 Envelope 的拖拽落点信息来自 dnd-kit 的 `onDragMove` 事件中的 `over` 和 `collision`。需要在 dnd-kit 的 `onDragMove` 中计算位置并写入 `dropTarget store field`。

### 2.6 Step 6: CanvasComponentItem 剥离

**核心改动：** 从 `CanvasComponentItem` 中移除：
1. 选中框样式 → 移至 `BorderSelecting`
2. 缩放手柄 → 移至 `BorderResizing`
3. 悬停标签 → 移至 `BorderDetecting`

改后的 `CanvasComponentItem` 只保留：
- `useDraggable` + `useDroppable` 绑定
- `UnifiedSimulatedContent` 渲染
- 选中态和锁定态仅用于样式调整（不渲染选中框）
- `onClick` → store.selectComponent
- `onMouseEnter/Leave` → store.setHoveredId

```
CanvasComponentItem (精简后)
  ├── useDraggable/useDroppable (dnd-kit refs)
  ├── onClick → onSelect
  ├── onDoubleClick → 进入子编辑
  ├── onMouseEnter/Leave → store.setHoveredId
  ├── [isDimmed / isLocked 样式]
  └── UnifiedSimulatedContent (组件 UI 渲染)
```

### 2.7 Step 7: Dragon 引擎封装

不替换 dnd-kit，而是封装一层 `Dragon` 类作为**拖拽状态管理和位置计算的协调层**。

```typescript
// dragon/dragon.ts
class Dragon {
  private _dragging = false;
  private lastDropTarget: DropTarget | null = null;

  // 在 dnd-kit 的 onDragStart/onDragMove/onDragEnd 中调用
  onDragStart(event: DragStartEvent) {
    this._dragging = true;
    // emit canvas drag state
  }

  onDragMove(event: DragMoveEvent, collision: Collision | null) {
    // 1. 计算插入位置 (location.ts 算法)
    const target = this.calculateDropTarget(event, collision);
    // 2. 更新 store.dropTarget → InsertionView 消费
    useCanvasStore.getState().setDropTarget(target);
    // 3. 处理自动滚动 (scroller.ts)
    scroller.scrolling(event);
  }

  onDragEnd(event: DragEndEvent) {
    this._dragging = false;
    // 1. 清除 dropTarget
    useCanvasStore.getState().setDropTarget(null);
    // 2. 执行真正的放置操作
    this.executeDrop(event);
  }
}
```

**为何封装 Dragon 而不是直接用 dnd-kit 回调？**
- `Dragon` 统一管理拖拽相关的所有副状态（`_dragging`, `lastDropTarget`, copy/move 模式）
- 未来可以添加多传感器支持（iframe 拖拽、大纲树拖拽）
- 解耦业务逻辑和 UI 层

### 2.8 Step 8: Scroller 独立模块

**当前：** autoScroll 逻辑在 `editor-layout.tsx` 中约 110 行。

**改后：** 独立 `scroller.ts` 模块，与 lowcode-engine 的 Scroller 设计一致。

```typescript
// dragon/scroller.ts
const SCROLL_ACCURACY = 30;

export interface ScrollConfig {
  enabled: boolean;
  accuracy?: number;  // 边缘触发距离，默认 30px
  maxSpeed?: number;  // 最大滚动速度，默认 50
  minSpeed?: number;  // 最小滚动速度，默认 10
}

class CanvasScroller {
  private pid: number | undefined;
  private config: ScrollConfig;

  constructor(private scrollable: { scrollLeft: number; scrollTop: number }) {}

  scrolling(point: { clientX: number; clientY: number }, viewport: DOMRect) {
    if (!this.config.enabled) return;
    // 距边缘越近，滚动越快
    const ax = this.calculateAxis(point.clientX, viewport.left, viewport.right);
    const ay = this.calculateAxis(point.clientY, viewport.top, viewport.bottom);
    if (!ax && !ay) return this.cancel();
    // rAF 循环
    this.animate(ax, ay);
  }

  private calculateAxis(pos: number, min: number, max: number): number { /* 同 lowcode 算法 */ }
  private animate(ax: number, ay: number) { /* rAF scroll loop */ }
  cancel() { /* clear pid */ }
}
```

### 2.9 Step 9: OffsetObserver — 位置观测器

Envelope 由于没有 iframe，位置观测比 lowcode-engine 简单很多。但仍然需要 OffsetObserver 用于：

1. **容器滚动时补偿 BEM Tools 位置** — 如果 CanvasRenderer 放在 scrollable 容器内
2. **响应式视口切换时更新位置**

```typescript
// dragon/offset-observer.ts
class CanvasOffsetObserver {
  private pid: number | undefined;
  private lastRect: DOMRect | null = null;

  constructor(
    private getRect: () => DOMRect | null,
    private onUpdate: (rect: DOMRect) => void,
  ) {}

  start() {
    const check = () => {
      const rect = this.getRect();
      if (rect && (!this.lastRect || 
          rect.left !== this.lastRect.left || 
          rect.top !== this.lastRect.top)) {
        this.onUpdate(rect);
        this.lastRect = rect;
      }
      this.pid = requestAnimationFrame(check);
    };
    check();
  }

  stop() { cancelAnimationFrame(this.pid); }
}
```

使用 `requestAnimationFrame` 替代 lowcode-engine 的 `requestIdleCallback`，在 Envelope 中更简单可控。

---

## 3. 执行计划

### Phase 1.1 — BEM Tools 基础设施 (估算: 2-3 天)

| 步骤 | 任务 | 涉及文件 | 验证 |
|------|------|---------|------|
| 1.1.1 | 创建 `bem-tools/` 目录结构 + `BemToolsManager` | `bem-tools/manager.ts`, `bem-tools/index.tsx` | `pnpm build` 通过 |
| 1.1.2 | 实现 `BorderDetecting` 覆盖层 | `bem-tools/border-detecting.tsx` | hover 选中组件时不再显示悬停高亮 (由覆盖层接管) |
| 1.1.3 | 实现 `BorderSelecting` 覆盖层 + Toolbar | `bem-tools/border-selecting.tsx` | 选中框从组件内移到覆盖层，位置正确 |
| 1.1.4 | 实现 `BorderResizing` 覆盖层 + resize hook | `bem-tools/border-resizing.tsx` | 缩放手柄在覆盖层，功能正常 |
| 1.1.5 | 剥离 `CanvasComponentItem` 中的选中/缩放/悬停 | `canvas-component-item.tsx` | 删除约 80 行选中框和缩放手柄代码 |
| 1.1.6 | 将 `BemTools` 集成到现有 CanvasRenderer 外层 | `canvas-renderer.tsx` + 调用方 | 视觉功能一致，无退化 |

### Phase 1.2 — InsertionView 和 DnD 增强 (估算: 1-2 天)

| 步骤 | 任务 | 涉及文件 | 验证 |
|------|------|---------|------|
| 1.2.1 | 实现 `InsertionView` 覆盖层 | `bem-tools/insertion.tsx` | 拖拽时显示插入位置指示 |
| 1.2.2 | 在 store 中新增 `dropTarget` 状态 | `store/`, `types.ts` | 位置更新实时反映在覆盖层 |
| 1.2.3 | 在 dnd-kit `onDragMove` 中计算插入位置 | `editor-layout.tsx` 的 DnD 处理 | 插入位置与鼠标位置一致 |

### Phase 1.3 — Scroller + Dragon 封装 (估算: 1-2 天)

| 步骤 | 任务 | 涉及文件 | 验证 |
|------|------|---------|------|
| 1.3.1 | 实现 `Scroller` 独立模块 | `dragon/scroller.ts` | 拖拽到画布边缘时自动滚动 |
| 1.3.2 | 封装 `Dragon` 类 | `dragon/dragon.ts` | 拖拽状态集中管理 |
| 1.3.3 | 用 `Dragon` 替换现有的散落 DnD 逻辑 | `editor-layout.tsx` 中的 dnd-kit 回调 | 功能无退化 |
| 1.3.4 | 实现 `Detecting` 独立模块 | `dragon/detecting.ts` | 悬停检测可开关 |

---

## 4. 风险与注意事项

| 风险 | 影响 | 缓解措施 |
|------|------|---------|
| BEM Tools 覆盖层挡住画布交互 | 组件无法点击选中 | 覆盖层 `pointerEvents: 'none'`，工具区域单独控制 |
| 拖拽时覆盖层位置不同步 | 插入指示器/选中框偏移 | `requestAnimationFrame` 同步，确保在同一个 frame 更新 |
| 现有选中/缩放功能退化 | 用户操作异常 | 每步验证 `pnpm test` 和人工 QA |
| dnd-kit 升级冲突 | 版本不兼容 | 锁定当前 dnd-kit 版本，不升级 |
| 覆盖层过多影响性能 | 拖拽时卡顿 | BEM Tools 子组件使用 `React.memo`，Zustand selector 精细订阅 |

---

## 5. 核心架构改变总结

```
BEFORE:
CanvasComponentItem (选中框/缩放手柄/悬停标签 全部嵌入组件)
  └── 事件冒泡互相干扰、重渲染互相触发

AFTER:
CanvasRenderer (纯组件渲染, 无 UI 装饰)
BemTools (纯覆盖层, 无组件渲染)
  ├── BorderSelecting → 选中框位置 = store.position × zoom + pan
  ├── BorderDetecting  → 悬停高亮位置 = 同上
  ├── BorderResizing   → 手柄位置 = 同上, 事件 = native mousedown
  └── InsertionView    → 插入位置 = dnd-kit collision + Dragon Location
Dragon (拖拽协调层)
  ├── 封装 dnd-kit 回调
  ├── 管理拖拽状态 (dragging/copy/move)
  ├── 协调 Scroller (自动滚动)
  └── 计算 DropTarget → store.dropTarget
```

这种架构下，**画布组件渲染**和**覆盖层装饰**彻底解耦，各自独立渲染、各自独立更新，互不影响。
