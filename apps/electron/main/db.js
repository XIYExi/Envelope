const Database = require("better-sqlite3");
const { app } = require("electron");
const { createLocalBackendStorage } = require("./local-backend-storage");

let db = null;
const localBackendStorage = createLocalBackendStorage({ app });

function getDBPath() {
  return localBackendStorage.getRuntimeEnv().ENVELOPE_LOCAL_SQLITE_PATH;
}

function initSQLite() {
  if (db) return db;

  const dbPath = getDBPath();
  db = new Database(dbPath);

  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT DEFAULT '',
      schema_version TEXT DEFAULT '3.0.0',
      config TEXT NOT NULL DEFAULT '{}',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      synced_at TEXT
    );

    CREATE TABLE IF NOT EXISTS project_pages (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      path TEXT NOT NULL,
      title TEXT NOT NULL,
      schema TEXT NOT NULL DEFAULT '{}',
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS project_flows (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      description TEXT DEFAULT '',
      flow_type TEXT NOT NULL DEFAULT 'action',
      yaml_content TEXT NOT NULL DEFAULT '',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS project_models (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      table_name TEXT NOT NULL,
      schema TEXT NOT NULL DEFAULT '{}',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_pages_project ON project_pages(project_id);
    CREATE INDEX IF NOT EXISTS idx_flows_project ON project_flows(project_id);
    CREATE INDEX IF NOT EXISTS idx_models_project ON project_models(project_id);
  `);

  return db;
}

function closeSQLite() {
  if (db) {
    db.close();
    db = null;
  }
}

module.exports = { initSQLite, closeSQLite };
