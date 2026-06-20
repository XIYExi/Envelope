import { describe, expect, it } from "vitest";
import type { VirtualFile } from "../src/core/file-system";
import { generateProject } from "../src/generate";
import { blogProjectFixture } from "./fixtures/reference-projects/blog";
import { dashboardProjectFixture } from "./fixtures/reference-projects/dashboard";
import { ecommerceProjectFixture } from "./fixtures/reference-projects/e-commerce";

function comparePath(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

function normalizeSnapshotText(text: string): string {
  return text.replace(/\r\n/g, "\n");
}

/**
 * 将 generateProject 产出的 VirtualFS 文件集合收敛为适合快照的结构：
 * - files: 完整的文件清单（按路径稳定排序）
 * - keyFiles: 关键文件内容（按传入顺序输出，缺失则为 null）
 */
function toProjectSnapshot(files: VirtualFile[], keyFilePaths: string[]) {
  const sortedFiles = files.slice().sort((a, b) => comparePath(a.path, b.path));
  const fileList = sortedFiles.map((f) => f.path);

  const fileMap = new Map(sortedFiles.map((f) => [f.path, normalizeSnapshotText(f.content)]));
  const keyFiles = Object.fromEntries(
    keyFilePaths.map((p) => [p, fileMap.get(p) ?? null]),
  );

  return {
    files: fileList,
    keyFiles,
  };
}

describe("@envelope/generator - reference project snapshots", () => {
  it("blog snapshot", async () => {
    const exported = await generateProject(blogProjectFixture);
    expect(
      toProjectSnapshot(exported.files, [
        "package.json",
        "README.md",
        "app/layout.tsx",
        "app/page.tsx",
        "app/posts/page.tsx",
        "app/posts/[slug]/page.tsx",
      ]),
    ).toMatchSnapshot();
  });

  it("dashboard snapshot", async () => {
    const exported = await generateProject(dashboardProjectFixture);
    expect(
      toProjectSnapshot(exported.files, [
        "package.json",
        "middleware.ts",
        "app/login/page.tsx",
        "app/dashboard/page.tsx",
        "lib/flows/registry.ts",
        "app/api/flows/[flowId]/route.ts",
      ]),
    ).toMatchSnapshot();
  });

  it("e-commerce snapshot", async () => {
    const exported = await generateProject(ecommerceProjectFixture);
    expect(
      toProjectSnapshot(exported.files, [
        "package.json",
        "supabase/migrations/001_initial_schema.sql",
        "types/database.ts",
        "app/products/page.tsx",
        "app/checkout/page.tsx",
        "app/api/checkout/route.ts",
        "lib/flows/runtime.ts",
      ]),
    ).toMatchSnapshot();
  });
});

