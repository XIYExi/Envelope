import type { ProjectConfig, RoutesConfig, PageSchema, DbSchema, AuthConfig } from "@envelope/engine";
import type { VirtualFile } from "./core/file-system.types";
import type { ProjectEndpoint, ProjectFlow } from "./generators/flow-runtime-types";

export type ProjectExport = {
  files: VirtualFile[];
  projectName: string;
  fileCount: number;
  totalSize: number;
};

export type ProgressCallback = (stage: string, percent: number) => void;

export type GenerateProjectInput = {
  projectName?: string;
  project: ProjectConfig;
  routes?: RoutesConfig;
  pages?: PageSchema[];
  dbSchema?: DbSchema;
  auth?: AuthConfig;
  flows?: ProjectFlow[];
  endpoints?: ProjectEndpoint[];
};
