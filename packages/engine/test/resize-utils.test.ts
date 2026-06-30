/**
 * resize-utils 单测
 *
 * 覆盖目标：
 * - snapGridDelta：验证“跨过完整网格才变化”的对齐策略（含浮点边界与负数）
 * - calcResizeNext：验证不同方向缩放的计算、最小值约束、以及 x/width 的右边界钳制
 *
 * 说明：
 * - 这些函数属于纯计算逻辑，是画布交互手感的核心，适合用单测锁定行为
 */
import { describe, expect, it } from "vitest";
import { calcResizeNext, snapGridDelta, type ResizeStartState } from "../src/canvas/resize-utils";

/**
 * 构造一个常用的起始状态
 *
 * @param partial - 需要覆盖的字段（只写与当前用例相关的字段即可）
 */
function start(partial: Partial<ResizeStartState> = {}): ResizeStartState {
  return { x: 5, y: 3, width: 3, height: 2, gridCols: 12, ...partial };
}

describe("canvas/resize-utils", () => {
  describe("snapGridDelta", () => {
    it("正数：未跨过 1 个网格时保持为 0", () => {
      expect(snapGridDelta(0.1)).toBe(0);
      expect(snapGridDelta(0.999)).toBe(0);
    });

    it("正数：接近整数边界时使用 eps 向上稳定", () => {
      expect(snapGridDelta(0.9999999)).toBe(1);
      expect(snapGridDelta(1.0000001)).toBe(1);
    });

    it("负数：未跨过 -1 个网格时保持为 0", () => {
      expect(snapGridDelta(-0.1)).toBe(0);
      expect(snapGridDelta(-0.999)).toBe(0);
    });

    it("负数：接近 -1 时使用 eps 向下稳定", () => {
      expect(snapGridDelta(-0.9999999)).toBe(-1);
      expect(snapGridDelta(-1.0000001)).toBe(-1);
    });
  });

  describe("calcResizeNext", () => {
    it("向东缩放：只改变 width，并钳制到右边界", () => {
      const s = start({ x: 10, width: 2, gridCols: 12 });
      expect(calcResizeNext("e", s, 1, 0)).toEqual({ x: 10, y: 3, width: 3, height: 2 });
      expect(calcResizeNext("e", s, 100, 0)).toEqual({ x: 10, y: 3, width: 3, height: 2 });
    });

    it("向西缩放：同时改变 x 与 width，并保证 width >= 1", () => {
      const s = start({ x: 5, width: 3 });
      expect(calcResizeNext("w", s, -4, 0)).toEqual({ x: 1, y: 3, width: 7, height: 2 });
      expect(calcResizeNext("w", s, 2, 0)).toEqual({ x: 7, y: 3, width: 1, height: 2 });
    });

    it("向北缩放：同时改变 y 与 height，并保证 y/height 最小为 1", () => {
      const s = start({ y: 3, height: 2 });
      expect(calcResizeNext("n", s, 0, -10)).toEqual({ x: 5, y: 1, width: 3, height: 4 });
      expect(calcResizeNext("n", s, 0, 1)).toEqual({ x: 5, y: 4, width: 3, height: 1 });
    });

    it("向东南缩放：同时改变 width 与 height", () => {
      const s = start({ x: 2, y: 2, width: 3, height: 2, gridCols: 6 });
      expect(calcResizeNext("se", s, 2, 3)).toEqual({ x: 2, y: 2, width: 5, height: 5 });
      expect(calcResizeNext("se", s, 100, -10)).toEqual({ x: 2, y: 2, width: 5, height: 1 });
    });

    it("最终钳制：当 x 被推到最右侧时，width 会按 x 重新钳制", () => {
      const s = start({ x: 11, width: 2, gridCols: 12 });
      expect(calcResizeNext("w", s, 10, 0)).toEqual({ x: 12, y: 3, width: 1, height: 2 });
    });
  });
});

