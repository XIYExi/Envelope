/**
 * validation/migration 单测
 *
 * 覆盖目标：
 * - registerMigration：重复注册覆盖逻辑（含警告）
 * - migrateSchema：链式迁移、找不到迁移路径的告警、以及“防死循环”的最大迭代保护
 * - getLatestVersion：无迁移时默认版本、有迁移时返回最大 to 版本
 *
 * 关键点：
 * - migration.ts 内部维护了模块级别的 migrations 数组
 * - 为避免测试之间互相污染，本文件使用 vi.resetModules + 动态 import 获取“干净模块”
 */
import { describe, expect, it, vi } from "vitest";

/**
 * 获取一个“全新”的 migration 模块实例
 *
 * @returns 每次调用都会返回全新模块（migrations 数组为空）
 */
async function loadFreshMigrationModule() {
  vi.resetModules();
  return await import("../src/validation/migration");
}

describe("validation/migration", () => {
  it("migrateSchema：可以按注册顺序链式迁移到目标版本，并且不修改原始对象", async () => {
    const { registerMigration, migrateSchema } = await loadFreshMigrationModule();

    registerMigration("1.0.0", "1.1.0", (data) => ({
      ...data,
      nested: { ...(data.nested as Record<string, unknown>), a: 1 },
    }));
    registerMigration("1.1.0", "1.2.0", (data) => ({ ...data, v: "1.2.0" }));

    const original = { nested: { a: 0 } };
    const migrated = migrateSchema(original, "1.0.0", "1.2.0");

    expect(migrated).toEqual({ nested: { a: 1 }, v: "1.2.0" });
    expect(original).toEqual({ nested: { a: 0 } });
  });

  it("registerMigration：重复注册同一路径时会覆盖并输出警告", async () => {
    const { registerMigration, migrateSchema } = await loadFreshMigrationModule();

    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    registerMigration("1.0.0", "1.1.0", (data) => ({ ...data, step: 1 }));
    registerMigration("1.0.0", "1.1.0", (data) => ({ ...data, step: 2 }));

    const migrated = migrateSchema({} as Record<string, unknown>, "1.0.0", "1.1.0");
    expect(migrated.step).toBe(2);
    expect(warn).toHaveBeenCalledTimes(1);

    warn.mockRestore();
  });

  it("migrateSchema：找不到迁移路径时输出警告并返回当前数据（部分迁移）", async () => {
    const { registerMigration, migrateSchema } = await loadFreshMigrationModule();

    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    registerMigration("1.0.0", "1.1.0", (data) => ({ ...data, ok: true }));

    const migrated = migrateSchema({} as Record<string, unknown>, "1.0.0", "9.9.9");
    expect(migrated).toEqual({ ok: true });
    expect(warn).toHaveBeenCalledTimes(1);

    warn.mockRestore();
  });

  it("migrateSchema：存在循环路径且目标不可达时会触发最大迭代保护并停止", async () => {
    const { registerMigration, migrateSchema } = await loadFreshMigrationModule();

    registerMigration("1.0.0", "1.1.0", (data) => ({
      ...data,
      hop: (((data.hop as number | undefined) ?? 0) + 1),
    }));
    registerMigration("1.1.0", "1.0.0", (data) => ({
      ...data,
      hop: (((data.hop as number | undefined) ?? 0) + 1),
    }));

    const migrated = migrateSchema({ hop: 0 }, "1.0.0", "2.0.0");
    expect(typeof migrated.hop).toBe("number");
    expect((migrated.hop as number) > 0).toBe(true);
  });

  it("getLatestVersion：无迁移时返回 3.0.0，有迁移时返回最大 to 版本", async () => {
    const m1 = await loadFreshMigrationModule();
    expect(m1.getLatestVersion()).toBe("3.0.0");

    const m2 = await loadFreshMigrationModule();
    m2.registerMigration("3.0.0", "3.1.0", (d) => d);
    m2.registerMigration("3.1.0", "3.2.0", (d) => d);
    expect(m2.getLatestVersion()).toBe("3.2.0");
  });
});
