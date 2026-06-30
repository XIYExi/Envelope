import type { Database } from "./database.types";

export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
export type ProjectUpdate = Database["public"]["Tables"]["projects"]["Update"];

export type ProjectPage = Database["public"]["Tables"]["project_pages"]["Row"];
export type ProjectPageInsert = Database["public"]["Tables"]["project_pages"]["Insert"];

export type ProjectRoute = Database["public"]["Tables"]["project_routes"]["Row"];
export type ProjectRouteInsert = Database["public"]["Tables"]["project_routes"]["Insert"];

export type ProjectFlow = Database["public"]["Tables"]["project_flows"]["Row"];
export type ProjectFlowInsert = Database["public"]["Tables"]["project_flows"]["Insert"];

export type ProjectModel = Database["public"]["Tables"]["project_models"]["Row"];
export type ProjectModelInsert = Database["public"]["Tables"]["project_models"]["Insert"];

export type ProjectEndpoint = Database["public"]["Tables"]["project_endpoints"]["Row"];
export type ProjectEndpointInsert = Database["public"]["Tables"]["project_endpoints"]["Insert"];

export type ProjectAuth = Database["public"]["Tables"]["project_auth"]["Row"];
export type ProjectAuthInsert = Database["public"]["Tables"]["project_auth"]["Insert"];
