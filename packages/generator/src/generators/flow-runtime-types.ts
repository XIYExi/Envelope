export type ProjectEndpoint = {
  id: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  flow_id: string | null;
};

export type ProjectFlow = {
  id: string;
  name: string;
  yaml_content: string;
  description?: string;
};

export type GenerateFlowRuntimeOptions = {
  flows?: ProjectFlow[];
  endpoints?: ProjectEndpoint[];
};
