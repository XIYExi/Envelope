/**
 * local 媒体存储测试。
 *
 * 验证点：
 * - 上传后应落盘到 mediaRoot 下，并返回可用 key；
 * - 读取时应拒绝目录穿越 key；
 * - 读取到的内容与上传一致。
 *
 * @author xiye
 * @date 2026-06-22
 * @since ISC-38
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import type { RuntimeBackendConfig } from "@/lib/backend/config";
import { ApiError } from "@/lib/api/errors";
import { createLocalMediaRepository, normalizeMediaKey } from "@/lib/backend/media/local";

async function readAll(stream: ReadableStream<Uint8Array>): Promise<Uint8Array> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;
    chunks.push(value);
    total += value.byteLength;
  }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return merged;
}

let tempDir: string | null = null;

afterEach(() => {
  if (tempDir) {
    fs.rmSync(tempDir, { recursive: true, force: true });
    tempDir = null;
  }
});

describe("local media repository", () => {
  it("uploads bytes into mediaRoot and can be opened back", async () => {
    tempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "envelope-media-"));
    const mediaRoot = path.join(tempDir, "media");
    const config: RuntimeBackendConfig = {
      mode: "local",
      storageMode: "local",
      localRoot: tempDir,
      sqlitePath: path.join(tempDir, "envelope.db"),
      mediaRoot,
      localUserId: "local-user",
    };
    const repo = createLocalMediaRepository(config);
    const bytes = new Uint8Array([1, 2, 3, 4]);

    const uploaded = await repo.upload({ fileName: "demo.png", contentType: "image/png", bytes });
    expect(uploaded.key).toMatch(/^uploads\/\d{4}\/\d{2}\/.+\.png$/);

    const storedPath = path.join(mediaRoot, ...uploaded.key.split("/"));
    expect(fs.existsSync(storedPath)).toBe(true);
    expect(fs.readFileSync(storedPath)).toEqual(Buffer.from(bytes));

    const opened = await repo.open(uploaded.key);
    expect(opened.contentType).toBe("image/png");
    const readBack = await readAll(opened.stream);
    expect(Buffer.from(readBack)).toEqual(Buffer.from(bytes));
  });

  it("rejects path traversal keys", () => {
    expect(() => normalizeMediaKey("../secret.txt")).toThrow(ApiError);
    expect(() => normalizeMediaKey("a/../../b")).toThrow(ApiError);
    expect(() => normalizeMediaKey("..")).toThrow(ApiError);
  });
});

