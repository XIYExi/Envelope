/**
 * 画布历史系统 — withHistory 高阶函数 + undo/redo/batch
 *
 * 使用 immer produceWithPatches 替代 structuredClone + JSON.stringify，
 * 通过增量 diff（patches）实现 O(1) 变化检测和高效的状态回退。
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { CanvasState, CanvasSnapshot, HistoryEntry } from "../types";
import { produceWithPatches, applyPatches, enablePatches } from "immer";
enablePatches();

/** 深拷贝全量快照（仅用于创建 HistoryEntry.snapshot 回退兼容） */
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

/** 从 CanvasState 提取 CanvasSnapshot 字段 */
function extractSnapshot(state: CanvasState): CanvasSnapshot {
  return {
    components: state.components,
    selectedIds: state.selectedIds,
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
 * 使用 immer produceWithPatches 检测变化并生成增量 diff，
 * 替代传统的 structuredClone + JSON.stringify 全量比较。
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

    // 使用 immer 的 produceWithPatches 计算增量 diff
    // patches.length === 0 意味着两次状态相等（替代 JSON.stringify 比较）
    const [, patches, inversePatches] = produceWithPatches(
      state as CanvasState,
      (draft) => {
        Object.assign(draft, partial);
      },
    );

    if (patches.length === 0) return partial;

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

    const prevSnapshot = takeSnapshot(state);
    const entry: HistoryEntry = { snapshot: prevSnapshot, patches, inversePatches };
    const past = [...state.historyPast, entry];
    const limitedPast = past.length > state.historyLimit
      ? past.slice(past.length - state.historyLimit)
      : past;

    return {
      ...partial,
      historyPast: limitedPast as any,
      historyFuture: [],
      canUndo: limitedPast.length > 0,
      canRedo: false,
    };
  };
}

/** undo 操作 — 通过 applyPatches 应用逆向增量回退状态 */
export function undoOp(state: CanvasState): Partial<CanvasState> {
  if (state.historyPast.length === 0) return {};
  const past = state.historyPast.slice();
  const entry = past.pop()!;

  // 应用逆向 patches 重建前一状态
  const prevState = applyPatches(state as CanvasState, entry.inversePatches);

  // 为 redo 计算新的正向 patches（从 prevState → 当前状态）
  const currentSnapshot = takeSnapshot(state);
  const [, redoPatches, redoInversePatches] = produceWithPatches(
    prevState as CanvasState,
    (draft) => {
      Object.assign(draft, currentSnapshot);
    },
  );

  const redoEntry: HistoryEntry = {
    snapshot: currentSnapshot,
    patches: redoPatches,
    inversePatches: redoInversePatches,
  };

  return {
    ...extractSnapshot(prevState),
    historyPast: past as any,
    historyFuture: [...state.historyFuture, redoEntry] as any,
    canUndo: past.length > 0,
    canRedo: true,
  };
}

/** redo 操作 — 通过 applyPatches 应用正向增量前进状态 */
export function redoOp(state: CanvasState): Partial<CanvasState> {
  if (state.historyFuture.length === 0) return {};
  const future = state.historyFuture.slice();
  const entry = future.pop()!;

  // 应用正向 patches 重建下一状态
  const nextState = applyPatches(state as CanvasState, entry.patches);

  // 为 undo 计算新的逆向 patches（从 nextState → 当前状态）
  const currentSnapshot = takeSnapshot(state);
  const [, undoPatches, undoInversePatches] = produceWithPatches(
    nextState as CanvasState,
    (draft) => {
      Object.assign(draft, currentSnapshot);
    },
  );

  const undoEntry: HistoryEntry = {
    snapshot: currentSnapshot,
    patches: undoPatches,
    inversePatches: undoInversePatches,
  };

  const past = [...state.historyPast, undoEntry];
  const limitedPast = past.length > state.historyLimit
    ? past.slice(past.length - state.historyLimit)
    : past;

  return {
    ...extractSnapshot(nextState),
    historyPast: limitedPast as any,
    historyFuture: future as any,
    canUndo: true,
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
    editScope: null,
  };
}

/**
 * 批量操作包装器
 *
 * 将一组操作合并为一个历史条目。
 * 使用 immer produceWithPatches 检测变化。
 */
export function batchOp(
  get: () => CanvasState,
  set: (partial: Partial<CanvasState>) => void,
  fn: () => void,
) {
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

  // 使用 immer 检测是否有实际变化
  const [, patches, inversePatches] = produceWithPatches(
    before,
    (draft) => {
      Object.assign(draft, after);
    },
  );
  if (patches.length === 0) return;

  const entry: HistoryEntry = { snapshot: before, patches, inversePatches };
  const state = get();
  const past = [...state.historyPast, entry].slice(-state.historyLimit);

  set({
    historyPast: past as any,
    historyFuture: [],
    canUndo: true,
    canRedo: false,
  });
}

/** 用于切片内访问的 getter/setter（由主 store 注入） */
let _get: (() => CanvasState) | null = null;
let _set: ((partial: Partial<CanvasState>) => void) | null = null;

export function setStoreAccessors(
  get: () => CanvasState,
  set: (partial: Partial<CanvasState>) => void,
) {
  _get = get;
  _set = set;
}

export function getStoreState(): CanvasState {
  if (!_get) throw new Error("Store accessors not initialized");
  return _get();
}
