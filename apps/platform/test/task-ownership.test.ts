import { describe, expect, it } from "vitest";
import { getExportTaskForUser } from "@/lib/export/export-task-manager";
import { getArchiveExportTaskForUser, getArchiveImportTaskForUser } from "@/lib/archive/archive-task-manager";

describe("task ownership", () => {
  it("export task ownership enforced", () => {
    (globalThis as any).__envelopeExportTaskManager = {
      tasks: new Map([
        [
          "t1",
          {
            taskId: "t1",
            projectId: "p1",
            ownerUserId: "u1",
            state: "running",
            stage: "x",
            percent: 1,
            createdAt: 1,
            updatedAt: 1,
            expiresAt: Date.now() + 60_000,
            lastBroadcastAt: 0,
            lastBroadcastPercent: -1,
          },
        ],
      ]),
    };

    expect(getExportTaskForUser("t1", "u2")).toBeNull();
    expect(getExportTaskForUser("t1", "u1")?.taskId).toBe("t1");
  });

  it("archive tasks ownership enforced", () => {
    (globalThis as any).__envelopeArchiveTaskManager = {
      exports: new Map([
        [
          "a1",
          {
            taskId: "a1",
            kind: "archive_export",
            projectId: "p1",
            ownerUserId: "u1",
            state: "running",
            stage: "x",
            percent: 1,
            createdAt: 1,
            updatedAt: 1,
            expiresAt: Date.now() + 60_000,
            lastBroadcastAt: 0,
            lastBroadcastPercent: -1,
          },
        ],
      ]),
      imports: new Map([
        [
          "i1",
          {
            taskId: "i1",
            kind: "archive_import",
            ownerUserId: "u1",
            state: "running",
            stage: "x",
            percent: 1,
            createdAt: 1,
            updatedAt: 1,
            uploadPath: "x",
            options: { mode: "create" },
            expiresAt: Date.now() + 60_000,
            lastBroadcastAt: 0,
            lastBroadcastPercent: -1,
          },
        ],
      ]),
    };

    expect(getArchiveExportTaskForUser("a1", "u2")).toBeNull();
    expect(getArchiveExportTaskForUser("a1", "u1")?.taskId).toBe("a1");

    expect(getArchiveImportTaskForUser("i1", "u2")).toBeNull();
    expect(getArchiveImportTaskForUser("i1", "u1")?.taskId).toBe("i1");
  });
});

