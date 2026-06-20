import { strFromU8, strToU8, unzipSync, zipSync } from "fflate";
import type { ProjectArchive } from "./archive-types";
import { apiErrors } from "@/lib/api/errors";

/**
 * 归档包序列化/反序列化（ZIP）
 *
 * 文件结构（固定）：
 * - manifest.json
 * - project.json / pages.json / routes.json / flows.json / models.json / endpoints.json / auth.json?
 * - flows/{flowKey}.yaml（可选但默认会生成，用于人类可读）
 */
export type ArchiveZipFile = {
  path: string;
  content: string;
};

export function createArchiveZip(input: ProjectArchive): Uint8Array {
  const zipInput: Record<string, Uint8Array> = {};

  zipInput["manifest.json"] = strToU8(JSON.stringify(input.manifest, null, 2));
  zipInput["project.json"] = strToU8(JSON.stringify(input.project, null, 2));
  zipInput["pages.json"] = strToU8(JSON.stringify(input.pages, null, 2));
  zipInput["routes.json"] = strToU8(JSON.stringify(input.routes, null, 2));
  zipInput["flows.json"] = strToU8(JSON.stringify(input.flows, null, 2));
  zipInput["models.json"] = strToU8(JSON.stringify(input.models, null, 2));
  zipInput["endpoints.json"] = strToU8(JSON.stringify(input.endpoints, null, 2));
  if (input.auth) zipInput["auth.json"] = strToU8(JSON.stringify(input.auth, null, 2));

  for (const flow of input.flows) {
    const safe = flow.key.replace(/[^a-zA-Z0-9._-]/g, "_");
    zipInput[`flows/${safe}.yaml`] = strToU8(flow.yaml_content ?? "");
  }

  return zipSync(zipInput, { level: 6 });
}

function readJsonFile<T>(files: Record<string, Uint8Array>, filePath: string): T {
  const bytes = files[filePath];
  if (!bytes) {
    throw apiErrors.validation({ filePath }, `Missing required file: ${filePath}`);
  }
  try {
    return JSON.parse(strFromU8(bytes)) as T;
  } catch (e) {
    throw apiErrors.validation({ filePath, error: e instanceof Error ? e.message : String(e) }, `Invalid JSON: ${filePath}`);
  }
}

function readOptionalJsonFile<T>(files: Record<string, Uint8Array>, filePath: string): T | undefined {
  if (!files[filePath]) return undefined;
  return readJsonFile<T>(files, filePath);
}

export function parseArchiveZip(bytes: Uint8Array): ProjectArchive {
  let files: Record<string, Uint8Array>;
  try {
    files = unzipSync(bytes);
  } catch (e) {
    throw apiErrors.validation({ error: e instanceof Error ? e.message : String(e) }, "Invalid zip file");
  }

  const manifest = readJsonFile<ProjectArchive["manifest"]>(files, "manifest.json");
  if (manifest.format !== "envelope.platform.archive") {
    throw apiErrors.validation({ format: manifest.format }, "Unsupported archive format");
  }
  if (manifest.formatVersion !== 1) {
    throw apiErrors.validation({ formatVersion: manifest.formatVersion }, "Unsupported archive version");
  }

  const project = readJsonFile<ProjectArchive["project"]>(files, "project.json");
  const pages = readJsonFile<ProjectArchive["pages"]>(files, "pages.json");
  const routes = readJsonFile<ProjectArchive["routes"]>(files, "routes.json");
  const flowsJson = readJsonFile<ProjectArchive["flows"]>(files, "flows.json");
  const models = readJsonFile<ProjectArchive["models"]>(files, "models.json");
  const endpoints = readJsonFile<ProjectArchive["endpoints"]>(files, "endpoints.json");
  const auth = readOptionalJsonFile<ProjectArchive["auth"]>(files, "auth.json");

  const yamlByKey = new Map<string, string>();
  for (const [filePath, content] of Object.entries(files)) {
    if (!filePath.startsWith("flows/") || !filePath.endsWith(".yaml")) continue;
    const key = filePath.slice("flows/".length, -".yaml".length);
    yamlByKey.set(key, strFromU8(content));
  }

  const flows: ProjectArchive["flows"] = (Array.isArray(flowsJson) ? flowsJson : []).map((f) => {
    const safe = (f.key ?? "").replace(/[^a-zA-Z0-9._-]/g, "_");
    const yaml = yamlByKey.get(safe) ?? f.yaml_content ?? "";
    return { ...f, yaml_content: yaml };
  });

  return {
    manifest,
    project,
    pages: Array.isArray(pages) ? pages : [],
    routes: Array.isArray(routes) ? routes : [],
    flows,
    models: Array.isArray(models) ? models : [],
    endpoints: Array.isArray(endpoints) ? endpoints : [],
    auth,
  };
}
