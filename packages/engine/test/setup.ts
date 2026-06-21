/**
 * Engine 包测试运行时环境初始化
 *
 * 目的：
 * - 为 Node 测试环境补齐浏览器侧常见的全局能力（如 crypto.randomUUID）
 * - 为涉及“生成 ID”的逻辑提供可预测、可断言的行为，降低用例不稳定性
 *
 * 注意：
 * - 这里的实现仅用于单测环境，避免影响生产逻辑
 * - 若后续有更多依赖全局对象的模块，可集中在本文件做统一兜底
 */
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";

declare global {
  var __engineTestUuidSeq: number | undefined;
  var __resetEngineTestUuidSeq: (() => void) | undefined;
}

/**
 * 重置用于 randomUUID 的序列号
 *
 * @param next - 重置后的起始序号（默认 0）
 */
function resetUuidSeq(next: number = 0) {
  globalThis.__engineTestUuidSeq = next;
}

/**
 * 生成一个可预测的“伪 UUID”
 *
 * 关键点：
 * - 仅要求“唯一性”和“可断言”，不追求 UUID v4 的严格格式
 * - 使用自增序号保证在同一测试进程内不重复
 */
function nextUuid(): string {
  const current = globalThis.__engineTestUuidSeq ?? 0;
  globalThis.__engineTestUuidSeq = current + 1;
  return `test-uuid-${current}`;
}

/**
 * 确保 globalThis.crypto.randomUUID 存在
 *
 * @param target - 需要补齐的全局对象（测试中固定为 globalThis）
 */
function ensureCryptoRandomUUID(target: typeof globalThis) {
  const hasCrypto = typeof target.crypto === "object" && target.crypto !== null;
  if (!hasCrypto) {
    Object.defineProperty(target, "crypto", {
      value: { randomUUID: nextUuid },
      writable: true,
      configurable: true,
    });
    return;
  }

  const cryptoObj = target.crypto as unknown as { randomUUID?: () => string };

  try {
    cryptoObj.randomUUID = nextUuid;
    return;
  } catch {
  }

  try {
    Object.defineProperty(cryptoObj, "randomUUID", {
      value: nextUuid,
      writable: true,
      configurable: true,
    });
    return;
  } catch {
  }

  try {
    Object.defineProperty(target, "crypto", {
      value: { ...(target.crypto as unknown as object), randomUUID: nextUuid },
      writable: true,
      configurable: true,
    });
  } catch {
  }
}

ensureCryptoRandomUUID(globalThis);
globalThis.__resetEngineTestUuidSeq = () => resetUuidSeq(0);

beforeEach(() => {
  globalThis.__resetEngineTestUuidSeq?.();
});

afterEach(() => {
  if (typeof document === "undefined") return;
  cleanup();
});

function ensurePointerEvent(target: typeof globalThis) {
  if (typeof target.PointerEvent === "function") return;
  try {
    target.PointerEvent = class PointerEvent extends MouseEvent {} as unknown as typeof PointerEvent;
  } catch {
  }
}

function ensurePointerCapture() {
  const proto = (globalThis.HTMLElement as unknown as { prototype?: unknown })?.prototype as
    | (HTMLElement & {
        setPointerCapture?: (pointerId: number) => void;
        releasePointerCapture?: (pointerId: number) => void;
        hasPointerCapture?: (pointerId: number) => boolean;
      })
    | undefined;
  if (!proto) return;

  const flagKey = "__engine_test_pointer_capture__";

  if (typeof proto.setPointerCapture !== "function") {
    try {
      proto.setPointerCapture = function setPointerCapture(pointerId: number) {
        (this as unknown as Record<string, unknown>)[flagKey] = pointerId;
      };
    } catch {
    }
  }

  if (typeof proto.releasePointerCapture !== "function") {
    try {
      proto.releasePointerCapture = function releasePointerCapture() {
        (this as unknown as Record<string, unknown>)[flagKey] = undefined;
      };
    } catch {
    }
  }

  if (typeof proto.hasPointerCapture !== "function") {
    try {
      proto.hasPointerCapture = function hasPointerCapture(pointerId: number) {
        return (this as unknown as Record<string, unknown>)[flagKey] === pointerId;
      };
    } catch {
    }
  }
}

ensurePointerEvent(globalThis);
ensurePointerCapture();
