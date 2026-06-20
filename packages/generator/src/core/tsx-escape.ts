export function tsStringLiteral(value: string): string {
  return JSON.stringify(value);
}

export function jsxText(value: string): string {
  return `{${tsStringLiteral(value)}}`;
}

export function sanitizeJsxComment(value: string): string {
  return value.replace(/\*\//g, "* /");
}
