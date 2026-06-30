# Domain U 完整方案 — 编辑器交互与持久化

> **隶属 ISA:** canvas-overhaul (E4 Deep)
> **状态:** Phase 4/5 — BUILD + EXECUTE
> **关联 Feature:** F-R21 (编辑器交互持久化)
> **14 条 ISC** | 优先级分组: P0(必须) / P1(重要) / P2(增强)

---

## 总体架构原则

1. **增量演进**: 所有修改在现有 Zustand + dnd-kit + Tailwind 栈上演进，不替换核心库
2. **用户偏好持久化**: 编辑器 UI 状态通过 `editor-store` Zustand `persist` 中间件持久化到 localStorage
3. **单一数据源**: 消除 editor-store 与 canvas-store 之间的状态双源漂移
4. **懒卸载优先**: 折叠面板卸载 DOM 而非 CSS 隐藏，减少内存占用

---

## ISC-U1 — 三栏面板宽度可拖拽调整非固定 w-48 w-64 w-72

### 当前状态
- `right-panel.tsx:389` — 固定 `w-72`，折叠用 `w-0 overflow-hidden`
- `editor-layout.tsx:722-726` — LeftPanel 有宽度传参但未使用可变宽度
- 无拖拽手柄，无宽度持久化

### 实现方案

**1. 扩展 editor-store 存储面板宽度**

```typescript
// editor.ts — partialize 中增加 panelWidths
interface EditorState {
  panelWidths: {
    left: number;   // default 256 (w-64)
    right: number;  // default 288 (w-72)
    material: number; // default 240 (w-60)
  };
}
```

**2. 创建 ResizableHandle 组件**

```tsx
// components/ui/resizable-handle.tsx
// - 垂直拖拽分隔线，宽 4px，hover 时高亮
// - onMouseDown → 监听 document mousemove/mouseup
// - 回调用 setPanelWidth 更新 store
// - min 180px, max 400px
```

**3. EditorLayout 集成**

```tsx
// editor-layout.tsx
<ResizablePanelGroup direction="horizontal">
  <ResizablePanel 
    defaultSize={20} 
    minSize={15} 
    maxSize={35}
    onResize={(size) => updatePanelWidth('left', size)}
  >
    <LeftPanel />
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={60}>
    <CanvasDropZone />
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
    <RightPanel />
  </ResizablePanel>
</ResizablePanelGroup>
```

**4. 替代方案（无三方库的自实现）**
若不引入 `react-resizable-panels`，直接用 CSS `grid-template-columns` + ref 计算：
- 父容器 `display: grid; grid-template-columns: var(--left-width) 4px 1fr 4px var(--right-width)`
- 拖拽手柄 `cursor: col-resize`，拖拽过程更新 CSS 变量
- 拖拽结束将宽度持久化到 editor-store

### 变更文件
- `apps/platform/stores/editor.ts` — 新增 panelWidths 状态
- `apps/platform/stores/editor.types.ts` — 扩展 EditorState
- `apps/platform/components/editor/editor-layout.tsx` — 集成 ResizablePanelGroup 或 grid 方案
- `apps/platform/components/ui/resizable-handle.tsx` — 新文件

---

## ISC-U2 — 折叠面板卸载内容而非仅视觉隐藏

### 当前状态
- `editor-layout.tsx:722` — LeftPanel: `{!leftPanelCollapsed && <LeftPanel/>}` ✅ 条件渲染已卸载
- `editor-layout.tsx:725` — RightPanel: `<RightPanel collapsed={rightPanelCollapsed}/>` ❌ 始终渲染，`w-0 overflow-hidden` 仅 CSS 隐藏
- 非 pages 模式（line 738-745）：`{!leftPanelCollapsed && <LeftPanel/>}` ✅ LeftPanel 正确卸载

### 修复方案

```tsx
// editor-layout.tsx line 725
{!rightPanelCollapsed && <RightPanel />}
// 移除 RightPanel 的 collapsed prop
```

同时调整 RightPanel 样式：
```tsx
// right-panel.tsx — 移除 collapsed 相关样式逻辑
// className 从 `w-72` 改为固定宽度，动画由父级条件渲染处理
```

### 变更文件
- `apps/platform/components/editor/editor-layout.tsx` — 行 725
- `apps/platform/components/editor/right-panel.tsx` — 移除 `collapsed` prop 和动画过渡样式

---

## ISC-U3 — findNodeById 建立 id→node 索引缓存避免递归

### 当前状态
- `right-panel.tsx:24-32` — 递归 findNodeById，每次 active 组件变化时遍历整树
- `component-tree-panel.tsx:48-52` — 独立实现，同样递归
- `canvas/store.ts:119-133` — findNodeInComponents 也是递归
- 组件 200+ 时，每次 selection 变化触发 O(n) 遍历

### 实现方案

**方案 A: 在 canvas store 中维护索引**
```typescript
// canvas/store.ts — 加入派生索引
interface CanvasState {
  // ...现有字段
  nodeIndex: Map<string, ComponentNode>; // id → node 的扁平索引
}

// 在 hydrate 和所有修改 components 的操作中重建索引
function buildNodeIndex(components: CanvasComponent[]): Map<string, ComponentNode> {
  const map = new Map<string, ComponentNode>();
  for (const comp of components) {
    const walk = (node: ComponentNode) => {
      map.set(node.id, node);
      for (const child of node.children ?? []) walk(child);
    };
    walk(comp.node);
  }
  return map;
}
```

**方案 B: useMemo 派生（无侵入，推荐）**
```typescript
// hooks/use-node-index.ts
export function useNodeIndex(components: CanvasComponent[]) {
  return useMemo(() => {
    const map = new Map<string, ComponentNode>();
    for (const comp of components) {
      const walk = (node: ComponentNode) => {
        map.set(node.id, node);
        for (const child of node.children ?? []) walk(child);
      };
      walk(comp.node);
    }
    return map;
  }, [components]);
}
```

然后在 right-panel、component-tree-panel 中直接消费索引：
```typescript
const nodeIndex = useNodeIndex(components);
const active = nodeIndex.get(activeNodeId); // O(1)
```

### 变更文件
- `apps/platform/lib/hooks/use-node-index.ts` — 新文件
- `apps/platform/components/editor/right-panel.tsx` — 替换 findNodeById
- `apps/platform/components/editor/component-tree-panel.tsx` — 替换 findNodeById
- `packages/engine/src/canvas/store.ts` — 可选：加入 built-in nodeIndex

---

## ISC-U4 — autoSave 30s 定时器保证最长 30s 必触发非仅重置

### 当前状态
- `project-pages.ts:189-193` — `scheduleAutosave` 每次调用 `clearTimeout + setTimeout`，每次修改重置 30s 计时
- `editor-layout.tsx:451` — 每次组件变化调用 `scheduleAutosave(30_000)`
- 用户在 29s 时修改 → 计时器重置到 30s → 永远不触发

### 修复方案

改用 **max-delay guard** 模式：同时维护两个计时器，一个是标准的 debounce（比如 5s），另一个是截止时间（30s）。

```typescript
// project-pages.ts
interface AutosaveState {
  autoSaveTimer: ReturnType<typeof setTimeout> | null;
  maxDelayTimer: ReturnType<typeof setTimeout> | null;
  firstDirtyAt: number | null;
}

function scheduleAutosave(delayMs = 30_000) {
  const state = get();
  
  // 记录首次脏状态时间
  if (!state.firstDirtyAt) {
    set({ firstDirtyAt: Date.now() });
  }
  
  // 标准防抖：每次修改重置（用于静默期快速保存）
  if (this.autoSaveTimer) clearTimeout(this.autoSaveTimer);
  this.autoSaveTimer = setTimeout(() => save(), delayMs);
  
  // 截止时间：从首次脏状态开始算起，一旦设定永不重置
  if (!this.maxDelayTimer) {
    const elapsed = Date.now() - (state.firstDirtyAt ?? Date.now());
    const remaining = Math.max(0, delayMs - elapsed);
    this.maxDelayTimer = setTimeout(() => {
      save();
      this.maxDelayTimer = null;
    }, remaining);
  }
}
```

**清理逻辑**：save 成功后清除两个计时器和 `firstDirtyAt`。

### 变更文件
- `apps/platform/stores/project-pages.ts` — 重构 scheduleAutosave
- `apps/platform/stores/editor.ts` — 可选：添加 lastSaveAt 时间戳

---

## ISC-U5 — 视口状态统一为单一 store 消除双源漂移

### 当前状态
- `editor.ts:44` — `canvasViewport: "desktop"`（持久化层，用户偏好）
- `canvas/store.ts:403` — `viewport: "desktop"`（运行时层，渲染驱动）
- `editor-layout.tsx:379-381` — effect 单向同步 editor→canvas
- `editor-toolbar.tsx:764-767` — 切换时同时写两个 store

双源写入路径：
1. EditorStore.partialize 持久化 `canvasViewport`（用于下次打开恢复）
2. CanvasStore.viewport 控制渲染（运行时唯一依据）
3. Toolbar 同时 `setCanvasViewport(vp)` + `setViewport(vp)`

风险：外部代码可能只写其中一个 store 导致漂移。

### 实现方案

**方案：把 canvasStore.viewport 作为唯一事实来源，editorStore 仅作持久化缓存**

```typescript
// editor-layout.tsx — 同步方向不变，但增加反向守卫
useEffect(() => {
  // 编辑器恢复时：从持久化偏好初始化运行时
  setViewport(canvasViewport);
}, []); // 仅首次执行

// 当 canvasViewport 变化时（来自编辑器 store 的 persist 恢复），同步到运行时
useEffect(() => {
  setViewport(canvasViewport);
}, [canvasViewport, setViewport]);

// 工具栏从 canvasStore 读取当前视口，写 canvasStore
// editorStore.canvasViewport 只在页面刷新恢复时使用
```

**消除双源的方法**：将 editorStore.canvasViewport 改为从 canvasStore 派生的计算值：
```typescript
// editor.ts — 移除 canvasViewport 状态，改为：
readonly canvasViewport: () => useCanvasStore.getState().viewport;
// 但 persist 需要序列化，所以保留 canvasViewport 但作为同步写
```

**最终方案**: 
- 运行时：`canvasStore.viewport`（唯一真实来源）
- 持久化：`editorStore.canvasViewport`（仅在 hydrate 时写入，toolbar 切换时同时写两端）
- 双向同步：hydration 方向 editor→canvas；运行时方向 canvas→view（读 canvasStore）

### 变更文件
- `apps/platform/stores/editor.ts` — 调整视图相关注释与逻辑
- `apps/platform/components/editor/editor-layout.tsx` — 增加 hydration 守卫
- `apps/platform/components/editor/editor-toolbar.tsx` — 确认单源写入

---

## ISC-U6 — 删除操作撤销栈满时提示用户或要求确认

### 当前状态
- `canvas/store.ts:416-418` — `historyLimit: 200`，超出时 `slice` 静默丢弃旧条目
- `deleteSelected()` 无确认对话框（行 1216-1258）
- 工具栏的 `handleDelete`（`editor-toolbar.tsx:753-755`）直接调 `deleteSelected()`

### 实现方案

**1. 面板显示栈状态**

```tsx
// editor-toolbar.tsx — 在撤销/重做按钮旁添加栈使用率提示
const historyUsage = historyPast.length / historyLimit;
{historyUsage > 0.8 && (
  <span className="text-[9px] text-amber-500" title="历史栈接近上限">
    {Math.round(historyUsage * 100)}%
  </span>
)}
```

**2. 删除前检查栈状态**

```typescript
// canvas/store.ts — 修改 deleteSelected
deleteSelected: () => {
  const state = get();
  if (state.selectedIds.length === 0) return;
  
  // 如果历史栈 > 80%，弹出确认
  if (state.historyPast.length > state.historyLimit * 0.8) {
    // 通过回调让调用方决定 — 或直接在 store 中 emit 事件
    // 这里用 store 外部的 confirmCallback 模式
    const confirmed = window.confirm?.('历史栈即将存满，删除后可能无法撤销。继续吗？');
    if (!confirmed) return;
  }
  
  // ...现有删除逻辑
}
```

**3. shadcn Dialog 替代 window.confirm** (ISC-R10 要求)
通过回调机制让 UI 层展示 Dialog：
```typescript
// editor-store.ts — 增加删除确认状态
deleteConfirmRequired: boolean;
pendingDeleteAction: (() => void) | null;
requestDeleteConfirm: (action: () => void) => void;
```

### 变更文件
- `packages/engine/src/canvas/store.ts` — 修改 deleteSelected
- `apps/platform/components/editor/editor-toolbar.tsx` — 显示栈状态
- `apps/platform/stores/editor.ts` — 增加删除确认状态

---

## ISC-U7 — 工具栏同步状态 Badge 折叠为单图标点击展开详情

### 当前状态
- `editor-toolbar.tsx:868-891` — 5+ Badge 同时显示：sync badgeVariant、detail 文本、conflictCount、localOnlyCount、remoteOnlyCount
- 占用了大量工具栏空间，在组件少时界面割裂

### 实现方案

```tsx
// editor-toolbar.tsx — 替代方案
// 折叠为单个 SyncStatusIcon 按钮
<Popover>
  <PopoverTrigger asChild>
    <Button variant="ghost" size="sm" className="h-7 px-1.5">
      <SyncIcon className={cn("h-3.5 w-3.5", sync.isSyncing && "animate-spin")} />
      {sync.summary.conflictCount > 0 && (
        <span className="ml-0.5 text-[9px] text-destructive">{sync.summary.conflictCount}</span>
      )}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-72 text-[10px]" align="end">
    {/* 折叠前所有 Badge 详情 */}
    <div className="space-y-1">
      <div className="flex justify-between">
        <span>Sync Status:</span>
        <span className="font-medium">{sync.summary.badgeLabel}</span>
      </div>
      <Separator />
      <div className="flex justify-between">
        <span>Conflicts:</span>
        <span className={cn(sync.compareSummary.conflictCount > 0 && "text-destructive")}>
          {sync.compareSummary.conflictCount}
        </span>
      </div>
      <!-- localOnly / remoteOnly 同 pattern -->
    </div>
  </PopoverContent>
</Popover>
```

### 变更文件
- `apps/platform/components/editor/editor-toolbar.tsx` — 重构同步状态区

---

## ISC-U8 — 路由 layout 字段从文本输入改为布局列表选择

### 当前状态
- `routing-editor.tsx:528-535` — `CompactInput` 文本输入框，用户手动输入 `dashboard-layout`
- 无下拉建议、无布局自动发现、无布局是否存在的校验
- `RouteDef.layout: string` — 自由字符串

### 实现方案

```tsx
// routing-editor.tsx — 替换 CompactInput 为 SelectField
const layoutRoutes = routes.filter(r => r.type === "layout");

<SelectField
  label="Layout"
  value={selectedRoute.layout}
  onChange={(v) => updateRoute(selectedRoute.id, { layout: v })}
  options={[
    { value: "", label: "None (No Layout)" },
    ...layoutRoutes.map(r => ({ value: r.id, label: r.path || r.id })),
  ]}
  placeholder="Select a layout..."
/>
```

**扩展点**：如果 layout 也可以从 PageSchema 的 `layout` 字段关联，需要同时读取已注册的布局页面列表。

### 变更文件
- `apps/platform/components/editor/routing-editor.tsx` — 替换 layout 输入组件

---

## ISC-U9 — 动态路由 params 传递到页面组件与 flow 输入

### 当前状态
- `page.schema.ts` — PageSchema 无 `params` 定义
- `page-generator.ts` — 无 params 解构代码生成
- `flow-runtime-generator.ts:719-728` — 已传递 `ctx?.params ?? {}` 到 runFlow，但需要链路完整

### 实现方案

**1. PageSchema 扩展**

```typescript
// page.schema.ts — 新增动态参数声明
export interface PageSchema {
  // ...现有字段
  /** 动态路由参数声明，如 ["id", "slug"] 对应 [id] 和 [slug] */
  params?: string[];
  /** 参数默认值（用于预览） */
  defaultParams?: Record<string, string>;
}
```

**2. 页面编辑器 UI**
```tsx
// routing-editor.tsx — 当路由路径包含 [param] 时自动解析并填入 params
useEffect(() => {
  const extracted = [...selectedRoute.path.matchAll(/\[(\w+)\]/g)].map(m => m[1]);
  if (extracted.length > 0) {
    updateRoute(selectedRoute.id, { params: extracted });
  }
}, [selectedRoute.path]);
```

**3. 生成器代码**
```typescript
// page-generator.ts — 生成页面组件时解构 params
// 当前路径: /users/[id]/posts/[postId]
// 生成:
export default function Page({ params }: { params: { id: string; postId: string } }) {
  // params 自动注入到 page 组件和 flow 上下文中
}
```

**4. Flow runtime 集成**（flow-runtime-generator 已支持 params 上下文传递）

### 变更文件
- `packages/engine/src/schemas/page.schema.ts` — 新增 params 字段
- `packages/generator/src/generators/page-generator.ts` — params 解构生成
- `apps/platform/components/editor/routing-editor.tsx` — params 自动提取 UI
- `apps/platform/stores/project-routes.ts` — params 持久化

---

## ISC-U10 — API customHandler 字段持久化并生成对应代码

### 当前状态
- 无 customHandler 字段存在
- API 路由的 handler 逻辑通过 `boundFlow` 绑定 flow 执行
- 缺少让用户编写自定义 handler 代码的入口

### 实现方案

**1. RouteDef 扩展**

```typescript
// routing-editor.tsx — RouteDef 新增字段
interface RouteDef {
  // ...现有字段
  /** 自定义 handler 代码（覆盖默认 flow 调用） */
  customHandler?: string;
  /** handler 类型 */
  handlerType: "flow" | "custom";
}
```

**2. 编辑器 UI**
```tsx
// routing-editor.tsx — 在 API 路由配置区增加
{selectedRoute.type === "api" && (
  <>
    <SelectField
      label="Handler Type"
      value={selectedRoute.handlerType}
      onChange={(v) => updateRoute(selectedRoute.id, { handlerType: v })}
      options={[
        { value: "flow", label: "Flow" },
        { value: "custom", label: "Custom Code" },
      ]}
    />
    {selectedRoute.handlerType === "custom" && (
      <CodeField
        label="Custom Handler"
        value={selectedRoute.customHandler ?? ""}
        onChange={(v) => updateRoute(selectedRoute.id, { customHandler: v })}
        language="typescript"
        placeholder="export async function handler(req, ctx) { ... }"
      />
    )}
  </>
)}
```

**3. 生成器代码**
```typescript
// api-route-generator.ts
if (route.handlerType === "custom") {
  // 直接将 customHandler 代码注入到生成的路由文件
  lines.push(route.customHandler!);
} else {
  // 现有 flow 调用逻辑
  lines.push(`export async function handler(req, ctx) { ... }`);
}
```

### 变更文件
- `apps/platform/components/editor/routing-editor.tsx` — customHandler UI
- `packages/generator/src/generators/api-route-generator.ts` — 代码生成
- `packages/engine/src/schemas/route.schema.ts` — customHandler schema（如存在）

---

## ISC-U11 — API 请求 body 运行时按 schema 校验拦截非法请求

### 当前状态
- API 端点生成 basic handler，body 无 schema 校验
- 现有 `db-schema.schema.ts` 有完整的 Zod schema，但未被 API 端点消费

### 实现方案

**1. API Route Schema 声明**
```typescript
// route.schema.ts — 新增 bodySchema 和 validation
interface RouteDef {
  // ...现有字段
  /** 请求 body 的 Zod schema 定义（JSON 格式） */
  bodySchema?: Record<string, unknown>;
  /** 校验模式 */
  validationMode: "none" | "strict" | "warn";
}
```

**2. 编辑器 UI** — 可视化的 body schema 构建器
```tsx
// routing-editor.tsx — API 端点配置面板
// - 选择 validation mode
// - body schema 构建器（字段名 + 类型 + required）
// 或复用 data-model-editor 的列定义组件
```

**3. 生成器代码**

```typescript
// api-route-generator.ts — 生成 Zod 校验中间件
if (route.validationMode !== "none") {
  lines.push(`
import { z } from "zod";

const bodySchema = z.object({
  ${Object.entries(route.bodySchema ?? {}).map(([key, def]) => {
    const required = def.required ? "" : ".optional()";
    return `${key}: z.${mapTypeToZod(def.type)}()${required},`;
  }).join('\n  ')}
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  // ...后续 flow 调用或 customHandler
}
  `);
}
```

### 变更文件
- `packages/engine/src/schemas/route.schema.ts` — 新增 bodySchema + validationMode
- `apps/platform/components/editor/routing-editor.tsx` — schema 构建 UI
- `packages/generator/src/generators/api-route-generator.ts` — 校验代码生成

---

## ISC-U12 — RLS 策略模板生成完整 SQL 而非仅存模板标识

### 当前状态
- `db-schema.schema.ts:95-110` — `rlsPolicySchema` 存完整的 `using`/`check` SQL 字符串
- `data-model-generator.ts:144` — `rlsPolicyToSQL` 将字符串拼接到 SQL
- 当前存储的是完整 SQL 片段，不是模板标识 ✅ 已接近目标
- 但问题是：用户需要在 UI 中手动编写 `using` 表达式（原始 SQL 字符串）

### 实现方案

**1. RLS 模板系统**

```typescript
// rls-templates.ts
const RLS_TEMPLATES = {
  "owner_access": {
    name: "Owner Access",
    description: "用户只能访问自己创建的数据",
    generate: (tableName: string, params: { userIdColumn?: string }) => `
      ${params.userIdColumn ?? "user_id"} = auth.uid()
    `,
  },
  "admin_all": {
    name: "Admin Full Access",
    description: "管理员可以访问所有数据（需配合 role 守卫）",
    generate: (tableName: string) => `
      (SELECT role FROM user_roles WHERE user_id = auth.uid()) = 'admin'
    `,
  },
  "custom": {
    name: "Custom Policy",
    description: "手写 SQL 表达式",
    generate: (tableName: string, params: { expression: string }) => params.expression,
  },
} as const;
```

**2. 编辑器 UI**

```tsx
// data-model-editor.tsx — RLS 策略编辑面板
// - Select template: owner_access / admin_all / custom
// - 根据模板显示参数输入（如 userIdColumn 下拉选择表列）
// - custom 模式显示 SQL 文本编辑器
// - 预览区显示生成的完整 SQL
```

**3. 生成器链路**

```typescript
// data-model-generator.ts — rlsPolicyToSQL
function rlsPolicyToSQL(policy: RlsPolicyDefinition, tableName: string): string {
  const template = RLS_TEMPLATES[policy.templateId ?? "custom"];
  if (!template) return `-- Unknown template: ${policy.templateId}`;
  
  const expression = template.generate(tableName, policy.templateParams ?? {});
  const checkClause = policy.checkClause ? ` WITH CHECK (${policy.checkClause})` : "";
  
  return [
    `-- ${policy.name}`,
    `CREATE POLICY "${policy.name}" ON "${tableName}"`,
    `  FOR ${policy.operation}`,
    `  USING (${expression})${checkClause};`,
  ].join('\n');
}
```

**4. Schema 扩展**

```typescript
// db-schema.schema.ts — rlsPolicySchema 新增模板字段
export const rlsPolicySchema = z.object({
  name: z.string(),
  operation: z.enum(["SELECT", "INSERT", "UPDATE", "DELETE", "ALL"]),
  /** 模板 ID（owner_access / admin_all / custom） */
  templateId: z.string().default("custom"),
  /** 模板参数 */
  templateParams: z.record(z.unknown()).optional(),
  /** 原始 SQL 表达式（custom 模式或模板展开后的缓存） */
  using: z.string(),
  check: z.string().optional(),
});
```

### 变更文件
- `packages/engine/src/schemas/db-schema.schema.ts` — rlsPolicySchema 扩展
- `packages/engine/src/generators/rls-templates.ts` — 新文件，模板定义
- `packages/generator/src/generators/data-model-generator.ts` — 模板引擎集成
- `apps/platform/components/editor/data-model-editor.tsx` — RLS 可视化编辑 UI

---

## ISC-U13 — 事件 args 完整传递到 flow trigger 节点供消费

### 当前状态
- `flow-runtime-generator.ts:719-728` — `runFlow(flowId, { query, params: ctx?.params ?? {} })` 已传 query 和 params
- `page-generator.ts` — event handler 中 `callFlow` 不包含事件特定的参数（如表单数据、按钮点击事件对象）
- `right-panel.tsx` — 已支持 eventBinding 多 flow 绑定，但绑定时没有指定参数映射

### 实现方案

**1. 事件参数映射 UI**

```typescript
// right-panel.tsx eventBinding 入口 — 扩展为可配置参数映射
interface EventBindingConfig {
  flowIds: string[];
  /** 参数映射: { "event.data.email" → "input.email", "event.target.value" → "input.value" } */
  argMapping?: Record<string, string>;
}
```

**2. 生成器代码增强**

```typescript
// page-generator.ts — generateEventBindings
// 当前生成:
//   const flowResult = await callFlow("flow-id", { query, params });

// 增强后生成:
function buildEventArgs(eventBinding: EventBindingConfig, componentId: string): string {
  // 收集表单组件值
  const formFields = findFormFieldsInSameForm(componentId);
  const formData = formFields.map(f => `${f.id}: document.querySelector('#${f.id}')?.value`);
  
  // 合并事件对象
  return `{
    event: { type: "${eventName}", target: { id: "${componentId}" } },
    form: { ${formData.join(', ')} },
    pageParams: ctx?.params ?? {},
    searchParams: ctx?.searchParams ?? {},
  }`;
}
```

**3. Flow 运行时消费**

```typescript
// flow-runtime-generator.ts — trigger 节点输入
// 当前: runFlow(flowId, { query, params })
// 增强: runFlow(flowId, { 
//   query, 
//   params: ctx?.params ?? {},
//   event: eventArgs,
// })
```

### 变更文件
- `packages/generator/src/generators/page-generator.ts` — 增强 eventArgs 生成
- `packages/generator/src/generators/flow-runtime-generator.ts` — trigger 节点数据消费
- `apps/platform/components/editor/right-panel.tsx` — eventBinding 参数映射 UI

---

## ISC-U14 — 依赖组件类型的事件白名单如 Card 不可绑 onSubmit

### 当前状态
- `material.ts:46-68` — `editablePropSchema` 支持 `eventBinding` 类型
- 但 MaterialDefinition 没有 `bindableEvents` 白名单字段
- 任何组件都可以通过 editableProps 声明任意事件绑定
- 无约束机制阻止 Card 组件声明 `onSubmit` 事件

### 实现方案

**1. MaterialDefinition 扩展**

```typescript
// material.ts — materialDefinitionSchema 新增字段
export const materialDefinitionSchema = z.object({
  // ...现有字段
  /** 可绑定事件白名单，如 ["onClick", "onChange"] */
  /** 不设置时默认不开放任何事件绑定 */
  bindableEvents: z.array(z.string()).optional(),
  /** 默认事件绑定（当有 eventBinding 属性时使用此列表） */
  defaultBindableEvents: z.array(z.string()).default(["onClick"]),
});
```

**2. 物料注册——组件声明白名单**

```typescript
// 在 Button material 定义中:
{
  name: "Button",
  displayName: "Button",
  // ...
  editableProps: [
    { key: "onClick", label: "On Click", type: "eventBinding" },
  ],
  bindableEvents: ["onClick"],
}

// 在 Card material 定义中:
{
  name: "Card",
  displayName: "Card",
  bindableEvents: [], // Card 不可绑定任何事件
  // 没有 editableProps 为 eventBinding 类型
}
```

**3. 属性编辑器校验**

```typescript
// right-panel.tsx — handlePropChange 中增加白名单校验
if (type === "eventBinding") {
  const material = registry.get(active.type);
  const allowed = material?.bindableEvents ?? [];
  
  if (allowed.length > 0 && !allowed.includes(key)) {
    toast.error(`"${active.type}" 组件不支持 "${key}" 事件`);
    return;
  }
  // ...现有 eventBinding 处理逻辑
}
```

**4. EventBindField 组件过滤**

```tsx
// EventBindField 下拉框中只显示 bindableEvents 允许的事件类型
const allowedEvents = material?.bindableEvents ?? [];
const availableBindings = allowedEvents.length > 0
  ? allowedEvents
  : Object.keys(flowList); // 无白名单时显示所有 flow（向后兼容）
```

### 变更文件
- `packages/materials/src/types/material.ts` — 新增 bindableEvents 字段
- `apps/platform/components/editor/right-panel.tsx` — 白名单校验分支
- `packages/materials/src/registry/*.ts` — 各物料声明白名单（可选，向后兼容默认不限）

---

## 实现路线图

| 优先级 | ISC | 工作量 | 依赖 | 说明 |
|--------|-----|--------|------|------|
| P0 | U2 | 0.5d | — | 一行改动，立即受益 |
| P0 | U3 | 1d | — | 性能优化，随选随用 |
| P0 | U4 | 1d | — | 数据不丢失的关键修复 |
| P0 | U5 | 0.5d | — | 架构清理，风险低 |
| P1 | U1 | 2d | — | 用户体验提升 |
| P1 | U7 | 1d | — | UI 清理 |
| P1 | U8 | 0.5d | — | 小改动，体验提升大 |
| P1 | U14 | 1d | — | 防止不合理绑定 |
| P2 | U6 | 1d | U4 | 删除安全，选做 |
| P2 | U9 | 2d | F-R12 | 动态路由完整链路 |
| P2 | U10 | 2d | — | 自定义 handler |
| P2 | U11 | 2d | U10 | body 校验 |
| P2 | U12 | 2d | — | RLS 模板系统 |
| P2 | U13 | 1d | F-R12 | 事件参数传递 |

**总计**: ~16.5 人日 | P0 核心: 3 人日

---

## 关键文件变更清单

| 文件 | U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8 | U9 | U10 | U11 | U12 | U13 | U14 |
|------|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:---:|:---:|:---:|:---:|:---:|
| `stores/editor.ts` | ✅ | | | | ✅ | ✅ | | | | | | | | |
| `stores/editor.types.ts` | ✅ | | | | | | | | | | | | | |
| `stores/project-pages.ts` | | | | ✅ | | | | | | | | | | |
| `stores/project-routes.ts` | | | | | | | | | ✅ | | | | | |
| `components/editor/editor-layout.tsx` | ✅ | ✅ | | | ✅ | | | | | | | | | |
| `components/editor/editor-toolbar.tsx` | | | | | ✅ | ✅ | ✅ | | | | | | | |
| `components/editor/right-panel.tsx` | | ✅ | ✅ | | | | | | | | | | ✅ | ✅ |
| `components/editor/component-tree-panel.tsx` | | | ✅ | | | | | | | | | | | |
| `components/editor/routing-editor.tsx` | | | | | | | | ✅ | ✅ | ✅ | ✅ | | | |
| `components/editor/data-model-editor.tsx` | | | | | | | | | | | | ✅ | | |
| `components/ui/resizable-handle.tsx` | ✅ | | | | | | | | | | | | | |
| `hooks/use-node-index.ts` | | | ✅ | | | | | | | | | | | |
| `engine/src/schemas/page.schema.ts` | | | | | | | | | ✅ | | | | | |
| `engine/src/schemas/route.schema.ts` | | | | | | | | | | ✅ | ✅ | | | |
| `engine/src/schemas/db-schema.schema.ts` | | | | | | | | | | | | ✅ | | |
| `engine/src/canvas/store.ts` | | | ✅ | | ✅ | ✅ | | | | | | | | |
| `materials/src/types/material.ts` | | | | | | | | | | | | | | ✅ |
| `generator/src/generators/page-generator.ts` | | | | | | | | | ✅ | | | | ✅ | |
| `generator/src/generators/api-route-generator.ts` | | | | | | | | | | ✅ | ✅ | | | |
| `generator/src/generators/data-model-generator.ts` | | | | | | | | | | | | ✅ | | |
| `generator/src/generators/flow-runtime-generator.ts` | | | | | | | | | ✅ | | | | ✅ | |

---

## 验证策略

| ISC | 验证方法 | 工具 |
|-----|----------|------|
| U1 | Playwright: 拖拽分隔线后验证 DOM 宽度 | Playwright |
| U2 | 折叠时 DOM 检测该面板节点是否存在 | Playwright + snapshot |
| U3 | 200 组件时 selection 响应时间 < 16ms | Vitest (benchmark) |
| U4 | 连续修改 > 30s 后检测 save 调用 | Vitest (timers mock) |
| U5 | 切换视口后两个 store 值一致 | Vitest (unit) |
| U6 | 历史栈 > 80% 时 delete 弹出确认 | Playwright |
| U7 | 同步状态显示为单图标，点击展开 Popover | Playwright |
| U8 | layout 字段为下拉选择而非文本输入 | Playwright (DOM snapshot) |
| U9 | 生成代码包含 params 解构 | Vitest (snapshot) |
| U10 | 生成代码包含 customHandler 函数 | Vitest (snapshot) |
| U11 | 非法 body 返回 400 Zod error | Vitest (integration) |
| U12 | RLS 模板生成完整 CREATE POLICY SQL | Vitest (snapshot) |
| U13 | flow trigger 节点输入包含 event.args | Vitest (snapshot) |
| U14 | Card 绑定 onSubmit 被拒绝 | Playwright |
