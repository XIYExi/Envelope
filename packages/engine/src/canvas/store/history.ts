/**
 * 画布历史系统 — withHistory 高阶函数 + undo/redo/batch
 *
 * 策略模式：每个 action 只需关注业务逻辑，
 * withHistory 自动处理快照、比较、推入历史栈、coalesce 合并。
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { CanvasState, CanvasSnapshot } from "../types";

/** 深拷贝全量快照 */
export function takeSnapshot(state: CanvasState): CanvasSnapshot {
  return {
    components: structuredClone(state.components),
    selectedIds: structuredClone(state.selectedIds),
    activeNodeId: state.activeNodeId,
    zoom: state.zoom,
    viewport: state.viewport,
    gridCols: state.gridCols,
    gridGap: state.gridGap,
    minRowHeight: state.minRowHeight,
    panX: state.panX,
    panY: state.panY,
    pageBackground: state.pageBackground,
    pagePadding: state.pagePadding,
    pageMaxWidth: state.pageMaxWidth,
    positionMode: state.positionMode,
  };
}

/** JSON 字符串比较快照 */
export function snapshotEquals(a: CanvasSnapshot, b: CanvasSnapshot): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

/** 批量操作状态（模块级，确保跨分片共享） */
let batching = false;
let batchStartSnapshot: CanvasSnapshot | null = null;
let lastCoalesceKey: string | null = null;
let lastCoalesceAt = 0;

/** 清除历史相关状态（用于 hydrate/clearHistory） */
export function resetHistoryState() {
  lastCoalesceKey = null;
  batchStartSnapshot = null;
  batching = false;
}

export interface HistoryOptions {
  /** coalesce 合并键，250ms 内同 key 操作合并为一次记录 */
  coalesceKey?: string;
}

/**
 * withHistory 高阶函数 — 消除所有 action 中的历史记录重复代码。
 *
 * @param fn 纯业务逻辑 reducer
 * @param options coalesce 合并键
 */
export function withHistory(
  fn: (state: CanvasState, ...args: any[]) => Partial<CanvasState>,
  options?: HistoryOptions,
): (state: CanvasState, ...args: any[]) => Partial<CanvasState> {
  return (state: CanvasState, ...args: any[]): Partial<CanvasState> => {
    const partial = fn(state, ...args);

    if (batching) return partial;

    const prev = takeSnapshot(state);
    const nextState = { ...(state as CanvasState), ...partial };
    const next = takeSnapshot(nextState);
    if (snapshotEquals(prev, next)) return partial;

    if (options?.coalesceKey) {
      const now = Date.now();
      const coalesce = lastCoalesceKey === options.coalesceKey && now - lastCoalesceAt < 250;
      lastCoalesceKey = options.coalesceKey;
      lastCoalesceAt = now;
      if (coalesce) {
        return { ...partial, historyFuture: [], canRedo: false };
      }
    } else {
      lastCoalesceKey = null;
    }

    const past = [...state.historyPast, prev];
    const limitedPast = past.length > state.historyLimit
      ? past.slice(past.length - state.historyLimit)
      : past;
    return {
      ...partial,
      historyPast: limitedPast,
      historyFuture: [],
      canUndo: limitedPast.length > 0,
      canRedo: false,
    };
  };
}

/** undo 操作 */
export function undoOp(state: CanvasState): Partial<CanvasState> {
  if (state.historyPast.length === 0) return {};
  const past = state.historyPast.slice();
  const prev = past.pop()!;
  const current = takeSnapshot(state);
  const future = [...state.historyFuture, current];
  lastCoalesceKey = null;
  return {
    ...prev,
    historyPast: past,
    historyFuture: future,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
  };
}

/** redo 操作 */
export function redoOp(state: CanvasState): Partial<CanvasState> {
  if (state.historyFuture.length === 0) return {};
  const future = state.historyFuture.slice();
  const nextItem = future.pop()!;
  const current = takeSnapshot(state);
  const past = [...state.historyPast, current];
  const limitedPast = past.length > state.historyLimit ? past.slice(past.length - state.historyLimit) : past;
  lastCoalesceKey = null;
  return {
    ...nextItem,
    historyPast: limitedPast,
    historyFuture: future,
    canUndo: limitedPast.length > 0,
    canRedo: future.length > 0,
  };
}

/** 清空历史 */
export function clearHistoryOp(): Partial<CanvasState> {
  resetHistoryState();
  return { historyPast: [], historyFuture: [], canUndo: false, canRedo: false };
}

/** hydrate 状态（清除历史） */
export function hydrateOp(partial: Partial<CanvasSnapshot>): Partial<CanvasState> {
  resetHistoryState();
  return {
    ...partial,
    selectedIds: partial.selectedIds ?? [],
    activeNodeId: partial.activeNodeId ?? null,
    pageMaxWidth: partial.pageMaxWidth ?? null,
    minRowHeight: partial.minRowHeight ?? 40,
    historyPast: [],
    historyFuture: [],
    canUndo: false,
    canRedo: false,
    clipboard: null,
  };
}

/**
 * 批量操作包装器
 *
 * 将一组操作合并为一个 histoire 条目。
 */
export function batchOp(get: () => CanvasState, set: (partial: Partial<CanvasState>) => void, fn: () => void) {
  if (batching) {
    fn();
    return;
  }
  batching = true;
  batchStartSnapshot = takeSnapshot(get());
  lastCoalesceKey = null;
  lastCoalesceAt = 0;
  try {
    fn();
  } finally {
    batching = false;
  }
  const before = batchStartSnapshot;
  batchStartSnapshot = null;
  if (!before) return;
  const after = takeSnapshot(get());
  if (snapshotEquals(before, after)) return;
  set({
    historyPast: [
      ...get().historyPast,
      before,
    ].slice(-get().historyLimit),
    historyFuture: [],
    canUndo: true,
    canRedo: false,
  });
}

/** 用于切片内访问的 getter/setter（由主 store 注入） */
let _get: (() => CanvasState) | null = null;
let _set: ((partial: Partial<CanvasState>) => void) | null = null;

export function setStoreAccessors(get: () => CanvasState, set: (partial: Partial<CanvasState>) => void) {
  _get = get;
  _set = set;
}

export function getStoreState(): CanvasState {
  if (!_get) throw new Error("Store accessors not initialized");
  return _get();
}
