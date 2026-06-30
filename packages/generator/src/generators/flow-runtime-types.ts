export type ProjectEndpoint = {
  id: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  flow_id: string | null;
  custom_handler?: string | null;
  /** U11: 请求定义（包含 requestBodySchema 等） */
  request_schema?: Record<string, unknown> | null;
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
