type SchemaVersion = string;

interface Migration {
  from: SchemaVersion;
  to: SchemaVersion;
  migrate: (data: Record<string, unknown>) => Record<string, unknown>;
}

const migrations: Migration[] = [];

export function registerMigration(from: SchemaVersion, to: SchemaVersion, migrate: Migration["migrate"]) {
  migrations.push({ from, to, migrate });
}

export function migrateSchema(
  data: Record<string, unknown>,
  fromVersion: SchemaVersion,
  toVersion: SchemaVersion,
): Record<string, unknown> {
  let current = { ...data };
  let currentVersion = fromVersion;

  const applicable = migrations.filter((m) => m.from === currentVersion && m.to === toVersion);

  if (applicable.length === 0 && fromVersion !== toVersion) {
    console.warn(`No migration found from ${fromVersion} to ${toVersion}`);
    return data;
  }

  for (const migration of applicable) {
    current = migration.migrate(current);
    currentVersion = migration.to;
  }

  return current;
}

export function getLatestVersion(): SchemaVersion {
  return "3.0.0";
}
