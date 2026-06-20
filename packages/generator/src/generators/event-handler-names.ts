export function makeEventHandlerName(componentId: string, event: string): string {
  const safeComponent = componentId.replace(/[^a-zA-Z0-9_]/g, "_");
  const safeEvent = event.replace(/[^a-zA-Z0-9_]/g, "_");
  const name = `handle_${safeComponent}_${safeEvent}`;
  if (/^[a-zA-Z_]/.test(name)) return name;
  return `_${name}`;
}

