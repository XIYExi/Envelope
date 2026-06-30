-- Migration: 001_platform_tables
-- Description: Core platform tables for Envelope V3

-- ============================================================
-- Projects
-- ============================================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  schema_version TEXT NOT NULL DEFAULT '3.0.0',
  config JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_updated_at ON projects(updated_at DESC);

-- ============================================================
-- Pages
-- ============================================================
CREATE TABLE IF NOT EXISTS project_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  path TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  schema JSONB NOT NULL DEFAULT '{}'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(project_id, path)
);

CREATE INDEX idx_pages_project_id ON project_pages(project_id, sort_order);

-- ============================================================
-- Routes
-- ============================================================
CREATE TABLE IF NOT EXISTS project_routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  path TEXT NOT NULL,
  page_id UUID REFERENCES project_pages(id) ON DELETE SET NULL,
  layout_id TEXT,
  auth_required BOOLEAN NOT NULL DEFAULT false,
  roles TEXT[] DEFAULT '{}',
  middleware_config JSONB DEFAULT '{}'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  parent_route_id UUID REFERENCES project_routes(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(project_id, path)
);

CREATE INDEX idx_routes_project_id ON project_routes(project_id);

-- ============================================================
-- Flows (Business Logic)
-- ============================================================
CREATE TABLE IF NOT EXISTS project_flows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  flow_type TEXT NOT NULL DEFAULT 'action',
  yaml_content TEXT NOT NULL DEFAULT '',
  trigger_event TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_flows_project_id ON project_flows(project_id);

-- ============================================================
-- Data Models
-- ============================================================
CREATE TABLE IF NOT EXISTS project_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  table_name TEXT NOT NULL,
  schema JSONB NOT NULL DEFAULT '{}'::jsonb,
  rls_policies JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(project_id, table_name)
);

CREATE INDEX idx_models_project_id ON project_models(project_id);

-- ============================================================
-- API Endpoints
-- ============================================================
CREATE TABLE IF NOT EXISTS project_endpoints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  method TEXT NOT NULL CHECK (method IN ('GET', 'POST', 'PUT', 'PATCH', 'DELETE')),
  path TEXT NOT NULL,
  description TEXT DEFAULT '',
  request_schema JSONB DEFAULT '{}'::jsonb,
  response_schema JSONB DEFAULT '{}'::jsonb,
  middleware JSONB DEFAULT '[]'::jsonb,
  flow_id UUID REFERENCES project_flows(id) ON DELETE SET NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(project_id, method, path)
);

CREATE INDEX idx_endpoints_project_id ON project_endpoints(project_id);

-- ============================================================
-- Auth Configuration (per-project)
-- ============================================================
CREATE TABLE IF NOT EXISTS project_auth (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE UNIQUE,
  providers JSONB NOT NULL DEFAULT '[]'::jsonb,
  redirect_urls JSONB DEFAULT '{}'::jsonb,
  session_config JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- RLS Policies
-- ============================================================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_flows ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_endpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_auth ENABLE ROW LEVEL SECURITY;

-- Users can only access their own projects
CREATE POLICY "Users can manage own projects"
  ON projects FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can access project resources through their project ownership
CREATE POLICY "Users can manage own project pages"
  ON project_pages FOR ALL
  USING (EXISTS (SELECT 1 FROM projects WHERE id = project_pages.project_id AND user_id = auth.uid()));

CREATE POLICY "Users can manage own project routes"
  ON project_routes FOR ALL
  USING (EXISTS (SELECT 1 FROM projects WHERE id = project_routes.project_id AND user_id = auth.uid()));

CREATE POLICY "Users can manage own project flows"
  ON project_flows FOR ALL
  USING (EXISTS (SELECT 1 FROM projects WHERE id = project_flows.project_id AND user_id = auth.uid()));

CREATE POLICY "Users can manage own project models"
  ON project_models FOR ALL
  USING (EXISTS (SELECT 1 FROM projects WHERE id = project_models.project_id AND user_id = auth.uid()));

CREATE POLICY "Users can manage own project endpoints"
  ON project_endpoints FOR ALL
  USING (EXISTS (SELECT 1 FROM projects WHERE id = project_endpoints.project_id AND user_id = auth.uid()));

CREATE POLICY "Users can manage own project auth"
  ON project_auth FOR ALL
  USING (EXISTS (SELECT 1 FROM projects WHERE id = project_auth.project_id AND user_id = auth.uid()));

-- ============================================================
-- Trigger: auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_pages_updated_at
  BEFORE UPDATE ON project_pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_routes_updated_at
  BEFORE UPDATE ON project_routes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_flows_updated_at
  BEFORE UPDATE ON project_flows FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_models_updated_at
  BEFORE UPDATE ON project_models FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_endpoints_updated_at
  BEFORE UPDATE ON project_endpoints FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_auth_updated_at
  BEFORE UPDATE ON project_auth FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
