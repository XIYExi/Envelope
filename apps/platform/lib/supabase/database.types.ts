export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string;
          schema_version: string;
          config: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string;
          schema_version?: string;
          config?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string;
          schema_version?: string;
          config?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
      };
      project_pages: {
        Row: {
          id: string;
          project_id: string;
          path: string;
          title: string;
          description: string;
          schema: Record<string, unknown>;
          metadata: Record<string, unknown>;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          path: string;
          title: string;
          description?: string;
          schema?: Record<string, unknown>;
          metadata?: Record<string, unknown>;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          path?: string;
          title?: string;
          description?: string;
          schema?: Record<string, unknown>;
          metadata?: Record<string, unknown>;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      project_routes: {
        Row: {
          id: string;
          project_id: string;
          path: string;
          page_id: string | null;
          layout_id: string | null;
          auth_required: boolean;
          roles: string[];
          middleware_config: Record<string, unknown>;
          metadata: Record<string, unknown>;
          parent_route_id: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          path: string;
          page_id?: string | null;
          layout_id?: string | null;
          auth_required?: boolean;
          roles?: string[];
          middleware_config?: Record<string, unknown>;
          metadata?: Record<string, unknown>;
          parent_route_id?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          path?: string;
          page_id?: string | null;
          layout_id?: string | null;
          auth_required?: boolean;
          roles?: string[];
          middleware_config?: Record<string, unknown>;
          metadata?: Record<string, unknown>;
          parent_route_id?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      project_flows: {
        Row: {
          id: string;
          project_id: string;
          name: string;
          description: string;
          flow_type: string;
          yaml_content: string;
          trigger_event: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          name: string;
          description?: string;
          flow_type?: string;
          yaml_content?: string;
          trigger_event?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          name?: string;
          description?: string;
          flow_type?: string;
          yaml_content?: string;
          trigger_event?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      project_models: {
        Row: {
          id: string;
          project_id: string;
          table_name: string;
          schema: Record<string, unknown>;
          rls_policies: Record<string, unknown>[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          table_name: string;
          schema?: Record<string, unknown>;
          rls_policies?: Record<string, unknown>[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          table_name?: string;
          schema?: Record<string, unknown>;
          rls_policies?: Record<string, unknown>[];
          created_at?: string;
          updated_at?: string;
        };
      };
      project_endpoints: {
        Row: {
          id: string;
          project_id: string;
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
          path: string;
          description: string;
          request_schema: Record<string, unknown>;
          response_schema: Record<string, unknown>;
          middleware: Record<string, unknown>[];
          flow_id: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
          path: string;
          description?: string;
          request_schema?: Record<string, unknown>;
          response_schema?: Record<string, unknown>;
          middleware?: Record<string, unknown>[];
          flow_id?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
          path?: string;
          description?: string;
          request_schema?: Record<string, unknown>;
          response_schema?: Record<string, unknown>;
          middleware?: Record<string, unknown>[];
          flow_id?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      project_auth: {
        Row: {
          id: string;
          project_id: string;
          providers: Record<string, unknown>[];
          redirect_urls: Record<string, unknown>;
          session_config: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          providers?: Record<string, unknown>[];
          redirect_urls?: Record<string, unknown>;
          session_config?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          providers?: Record<string, unknown>[];
          redirect_urls?: Record<string, unknown>;
          session_config?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
