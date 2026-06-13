type SchemaVersion = string;

interface Migration {
  from: SchemaVersion;
  to: SchemaVersion;
  migrate: (data: Record<string, unknown>) => Record<string, unknown>;
}

const migrations: Migration[] = [];

export function registerMigration(from: SchemaVersion, to: SchemaVersion, migrate: Migration["migrate"]) {
  const existing = migrations.find((m) => m.from === from && m.to === to);
  if (existing) {
    console.warn(`Migration ${from}→${to} already registered, overwriting.`);
    existing.migrate = migrate;
    return;
  }
  migrations.push({ from, to, migrate });
}

export function migrateSchema(
  data: Record<string, unknown>,
  fromVersion: SchemaVersion,
  toVersion: SchemaVersion,
): Record<string, unknown> {
  if (fromVersion === toVersion) return data;

  let current = structuredClone(data);
  let currentVersion = fromVersion;
  const maxIterations = migrations.length + 1;
  let iterations = 0;

  while (currentVersion !== toVersion && iterations < maxIterations) {
    iterations++;
    const next = migrations.find((m) => m.from === currentVersion);
    if (!next) {
      console.warn(`No migration found from ${currentVersion} to ${toVersion}`);
      return current;
    }
    current = next.migrate(current);
    currentVersion = next.to;
  }

  return current;
}

export function getLatestVersion(): SchemaVersion {
  if (migrations.length === 0) return "3.0.0";
  const versions = new Set(migrations.map((m) => m.to));
  return [...versions].sort().pop() ?? "3.0.0";
}
