export function sanitizeHtml(input: unknown): string {
  if (typeof input !== 'string') return '';
  let html = input;
  html = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '');
  html = html.replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, '');
  html = html.replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '');
  html = html.replace(
    /\b(href|src)\s*=\s*(['"])\s*(javascript:|data:text\/html)[^'"]*\2/gi,
    '$1=$2#$2'
  );
  return html;
}
