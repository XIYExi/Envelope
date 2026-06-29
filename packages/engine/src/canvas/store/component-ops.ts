/**
 * 画布组件操作切片
 *
 * 包含 Lock/Hide、Z-Order、Align/Distribute、批量编辑等操作。
 *
 * @author xiye
 * @date 2026-06-25
 */

import type { CanvasComponent, CanvasState, CanvasActions } from "../types";
import { withHistory } from "./history";
import { findNodeLocation } from "./tree-ops";

export function createComponentOpsSlice(
  set: (partial: Partial<CanvasState & CanvasActions>) => void,
  get: () => CanvasState & CanvasActions,
) {
  return {
    toggleLock: (id: string) => {
      set(withHistory((state) => ({
        components: state.components.map((c) =>
          c.id === id ? { ...c, locked: !c.locked } : c,
        ),
      }))(get(), id));
    },

    toggleHidden: (id: string) => {
      set(withHistory((state) => ({
        components: state.components.map((c) =>
          c.id === id ? { ...c, hidden: !c.hidden } : c,
        ),
      }))(get(), id));
    },

    batchToggleLock: (ids: string[]) => {
      set(withHistory((state) => {
        // 取第一个匹配组件的当前状态，取反作为目标状态，确保批量操作后所有目标组件状态一致
        const firstMatch = state.components.find((c) => ids.includes(c.id));
        const targetLocked = firstMatch ? !firstMatch.locked : true;
        return {
          components: state.components.map((c) =>
            ids.includes(c.id) ? { ...c, locked: targetLocked } : c,
          ),
        };
      })(get(), ids));
    },

    batchToggleHidden: (ids: string[]) => {
      set(withHistory((state) => {
        // 取第一个匹配组件的当前状态，取反作为目标状态，确保批量操作后所有目标组件状态一致
        const firstMatch = state.components.find((c) => ids.includes(c.id));
        const targetHidden = firstMatch ? !firstMatch.hidden : true;
        return {
          components: state.components.map((c) =>
            ids.includes(c.id) ? { ...c, hidden: targetHidden } : c,
          ),
        };
      })(get(), ids));
    },

    zIndexMove: (ids: string[], direction: "up" | "down" | "top" | "bottom") => {
      set(withHistory((state) => {
        const next = state.components.slice();
        const indices = ids
          .map((id) => next.findIndex((c) => c.id === id))
          .filter((i) => i >= 0)
          .sort((a, b) => a - b);

        if (indices.length === 0) return {};

        if (direction === "top") {
          const moved = indices.map((i) => next[i]!);
          const remaining = next.filter((_, i) => !indices.includes(i));
          return { components: [...remaining, ...moved] };
        }

        if (direction === "bottom") {
          const moved = indices.map((i) => next[i]!);
          const remaining = next.filter((_, i) => !indices.includes(i));
          return { components: [...moved, ...remaining] };
        }

        if (direction === "up") {
          for (let i = indices.length - 1; i >= 0; i--) {
            const idx = indices[i]!;
            if (idx < next.length - 1 && !indices.includes(idx + 1)) {
              [next[idx], next[idx + 1]] = [next[idx + 1]!, next[idx]!];
            }
          }
        }

        if (direction === "down") {
          for (let i = 0; i < indices.length; i++) {
            const idx = indices[i]!;
            if (idx > 0 && !indices.includes(idx - 1)) {
              [next[idx], next[idx - 1]] = [next[idx - 1]!, next[idx]!];
            }
          }
        }

        return { components: next };
      })(get(), ids, direction));
    },

    alignSelected: (direction: "left" | "centerH" | "right" | "top" | "centerV" | "bottom") => {
      const state = get();
      const comps = state.components.filter((c) => state.selectedIds.includes(c.id));
      if (comps.length < 2) return;

      const minX = Math.min(...comps.map((c) => c.position.x));
      const maxRight = Math.max(...comps.map((c) => c.position.x + c.position.width - 1));
      const minY = Math.min(...comps.map((c) => c.position.y));
      const maxBottom = Math.max(...comps.map((c) => c.position.y + c.position.height - 1));

      const moves: { id: string; x: number; y: number }[] = [];
      for (const c of comps) {
        let nx = c.position.x;
        let ny = c.position.y;
        switch (direction) {
          case "left": nx = minX; break;
          case "right": nx = maxRight - c.position.width + 1; break;
          case "centerH": nx = Math.round((minX + maxRight) / 2 - c.position.width / 2); break;
          case "top": ny = minY; break;
          case "bottom": ny = maxBottom - c.position.height + 1; break;
          case "centerV": ny = Math.round((minY + maxBottom) / 2 - c.position.height / 2); break;
        }
        if (nx !== c.position.x || ny !== c.position.y) {
          moves.push({ id: c.id, x: nx, y: ny });
        }
      }

      if (moves.length === 0) return;
      state.batch(() => {
        for (const m of moves) {
          state.moveComponent(m.id, m.x, m.y);
        }
      });
    },

    distributeSelected: (direction: "horizontal" | "vertical") => {
      const state = get();
      const comps = state.components.filter((c) => state.selectedIds.includes(c.id));
      if (comps.length < 3) return;

      const sorted = [...comps].sort((a, b) =>
        direction === "horizontal" ? a.position.x - b.position.x : a.position.y - b.position.y,
      );
      const moves: { id: string; x?: number; y?: number }[] = [];

      if (direction === "horizontal") {
        const first = sorted[0]!;
        const last = sorted[sorted.length - 1]!;
        const start = first.position.x;
        const end = last.position.x + last.position.width - 1;
        const totalWidth = sorted.reduce((sum, c) => sum + c.position.width, 0);
        const gap = (end - start + 1 - totalWidth) / (sorted.length - 1);
        let cursor = start;
        for (const c of sorted) {
          const newX = Math.round(cursor);
          if (c.id !== first.id && c.id !== last.id) {
            moves.push({ id: c.id, x: newX });
          }
          cursor += c.position.width + gap;
        }
      } else {
        const first = sorted[0]!;
        const last = sorted[sorted.length - 1]!;
        const start = first.position.y;
        const end = last.position.y + last.position.height - 1;
        const totalHeight = sorted.reduce((sum, c) => sum + c.position.height, 0);
        const gap = (end - start + 1 - totalHeight) / (sorted.length - 1);
        let cursor = start;
        for (const c of sorted) {
          const newY = Math.round(cursor);
          if (c.id !== first.id && c.id !== last.id) {
            moves.push({ id: c.id, y: newY });
          }
          cursor += c.position.height + gap;
        }
      }

      if (moves.length === 0) return;
      state.batch(() => {
        for (const m of moves) {
          const comp = state.components.find((c) => c.id === m.id);
          if (!comp) continue;
          state.moveComponent(m.id, m.x ?? comp.position.x, m.y ?? comp.position.y);
        }
      });
    },

    batchUpdateSelectedProps: (key: string, value: unknown) => {
      const state = get();
      const ids = state.selectedIds;
      if (ids.length === 0) return;
      state.batch(() => {
        for (const id of ids) {
          const loc = findNodeLocation(state.components, id);
          if (!loc) continue;
          const node = loc.node;
          const currentProps = node.props ?? {};
          const nextProps = { ...currentProps };
          if (value === undefined) {
            delete nextProps[key];
          } else {
            nextProps[key] = value;
          }
          state.updateNode(node.id, { props: Object.keys(nextProps).length > 0 ? nextProps : undefined });
        }
      });
    },

    enterChildEdit: (rootId: string, path: { id: string; type: string }[]) => {
      set({ editScope: { rootId, path } });
    },

    exitChildEdit: () => {
      set({ editScope: null });
    },
  };
}
