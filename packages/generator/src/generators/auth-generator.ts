/**
 * 认证生成器
 *
 * 将 AuthConfig（认证配置）转换为：
 * - Next.js 中间件（路由守卫）
 * - Supabase 服务端/客户端/中间件客户端
 * - 登录页面
 * - OAuth 回调路由
 * - 认证类型定义
 *
 * @author xiye
 * @date 2026-06-14
 */
import type { AuthConfig } from "@envelope/engine";
import type { VirtualFile } from "../core/file-system";

/**
 * 检查是否启用了邮箱登录
 */
function hasEmailProvider(auth: AuthConfig): boolean {
  return auth.providers.some((p: AuthConfig["providers"][number]) => p.name === "email" && p.enabled);
}

/**
 * 获取启用的 OAuth 提供商列表
 */
function getOAuthProviders(auth: AuthConfig): string[] {
  return auth.providers
    .filter((p: AuthConfig["providers"][number]) => p.name !== "email" && p.enabled)
    .map((p: AuthConfig["providers"][number]) => p.name);
}

/**
 * 生成 Supabase 服务端客户端
 */
function generateServerClient(): string {
  return [
    `import { createServerClient } from "@supabase/ssr";`,
    `import { cookies } from "next/headers";`,
    `import type { Database } from "@/types/database";`,
    ``,
    `export async function createClient() {`,
    `  const cookieStore = await cookies();`,
    ``,
    `  return createServerClient<Database>(`,
    `    process.env.NEXT_PUBLIC_SUPABASE_URL!,`,
    `    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,`,
    `    {`,
    `      cookies: {`,
    `        getAll() {`,
    `          return cookieStore.getAll();`,
    `        },`,
    `        setAll(cookiesToSet) {`,
    `          try {`,
    `            for (const { name, value, options } of cookiesToSet) {`,
    `              cookieStore.set(name, value, options);`,
    `            }`,
    `          } catch {`,
    `            // Cookies can only be modified in Server Actions or Route Handlers`,
    `          }`,
    `        },`,
    `      },`,
    `    },`,
    `  );`,
    `}`,
    ``
  ].join("\n");
}

/**
 * 生成 Supabase 浏览器客户端
 */
function generateBrowserClient(): string {
  return [
    `import { createBrowserClient } from "@supabase/ssr";`,
    `import type { Database } from "@/types/database";`,
    ``,
    `export function createClient() {`,
    `  return createBrowserClient<Database>(`,
    `    process.env.NEXT_PUBLIC_SUPABASE_URL!,`,
    `    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,`,
    `  );`,
    `}`,
    ``
  ].join("\n");
}

/**
 * 生成 Supabase 中间件客户端
 */
function generateMiddlewareClient(): string {
  return [
    `import { createServerClient } from "@supabase/ssr";`,
    `import { NextResponse, type NextRequest } from "next/server";`,
    `import type { Database } from "@/types/database";`,
    ``,
    `export async function updateSession(request: NextRequest) {`,
    `  let supabaseResponse = NextResponse.next({ request });`,
    ``,
    `  const supabase = createServerClient<Database>(`,
    `    process.env.NEXT_PUBLIC_SUPABASE_URL!,`,
    `    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,`,
    `    {`,
    `      cookies: {`,
    `        getAll() {`,
    `          return request.cookies.getAll();`,
    `        },`,
    `        setAll(cookiesToSet) {`,
    `          for (const { name, value } of cookiesToSet) {`,
    `            request.cookies.set(name, value);`,
    `          }`,
    `          supabaseResponse = NextResponse.next({ request });`,
    `          for (const { name, value, options } of cookiesToSet) {`,
    `            supabaseResponse.cookies.set(name, value, options);`,
    `          }`,
    `        },`,
    `      },`,
    `    },`,
    `  );`,
    ``,
    `  const { data: { user } } = await supabase.auth.getUser();`,
    ``,
    `  return { supabaseResponse, user };`,
    `}`,
    ``
  ].join("\n");
}

/**
 * 生成中间件
 *
 * 根据认证配置生成路由守卫中间件，
 * 保护需要登录的页面路由。
 */
function generateMiddleware(auth: AuthConfig): string {
  const oauthProviders = getOAuthProviders(auth);

  return [
    `import { updateSession } from "@/lib/supabase/middleware";`,
    `import { NextResponse, type NextRequest } from "next/server";`,
    ``,
    `export async function middleware(request: NextRequest) {`,
    `  const { supabaseResponse, user } = await updateSession(request);`,
    ``,
    `  const { pathname } = request.nextUrl;`,
    ``,
    `  // 公开路由 — 无需认证即可访问`,
    `  const publicPaths = ["/login", "/auth", "/api/auth"];`,
    `  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));`,
    ``,
    `  // 静态资源不拦截`,
    `  if (`,
    `    pathname.startsWith("/_next") ||`,
    `    pathname.startsWith("/favicon") ||`,
    `    pathname.match(/\\.(svg|png|jpg|jpeg|gif|ico|css|js)$/)`,
    `  ) {`,
    `    return supabaseResponse;`,
    `  }`,
    ``,
    `  // 未登录用户访问受保护页面 → 重定向到登录页`,
    `  if (!user && !isPublicPath) {`,
    `    const loginUrl = new URL("/login", request.url);`,
    `    loginUrl.searchParams.set("redirect", pathname);`,
    `    return NextResponse.redirect(loginUrl);`,
    `  }`,
    ``,
    `  // 已登录用户访问登录页 → 重定向到首页`,
    `  if (user && pathname === "/login") {`,
    `    return NextResponse.redirect(new URL("${auth.redirectUrls.afterLogin || "/"}", request.url));`,
    `  }`,
    ``,
    `  return supabaseResponse;`,
    `}`,
    ``,
    `export const config = {`,
    `  matcher: [`,
    `    "/((?!_next/static|_next/image|favicon.ico).*)",`,
    `  ],`,
    `};`,
    ``
  ].join("\n");
}

/**
 * 生成登录页面
 */
function generateLoginPage(auth: AuthConfig): string {
  const oauthProviders = getOAuthProviders(auth);

  return [
    `"use client";`,
    ``,
    `import { useState } from "react";`,
    `import { useRouter } from "next/navigation";`,
    `import { createClient } from "@/lib/supabase/client";`,
    ...(oauthProviders.length > 0 ? [`import { Provider } from "@supabase/supabase-js";`] : []),
    ``,
    `export default function LoginPage() {`,
    `  const [email, setEmail] = useState("");`,
    `  const [password, setPassword] = useState("");`,
    `  const [loading, setLoading] = useState(false);`,
    `  const [error, setError] = useState<string | null>(null);`,
    `  const router = useRouter();`,
    ``,
    `  const handleEmailLogin = async (e: React.FormEvent) => {`,
    `    e.preventDefault();`,
    `    setLoading(true);`,
    `    setError(null);`,
    ``,
    `    const supabase = createClient();`,
    `    const { error } = await supabase.auth.signInWithPassword({`,
    `      email,`,
    `      password,`,
    `    });`,
    ``,
    `    if (error) {`,
    `      setError(error.message);`,
    `      setLoading(false);`,
    `      return;`,
    `    }`,
    ``,
    `    router.push("${auth.redirectUrls.afterLogin || "/"}");`,
    `    router.refresh();`,
    `  };`,
    ``,
    ...(oauthProviders.length > 0 ? [
      `  const handleOAuthLogin = async (provider: Provider) => {`,
      `    const supabase = createClient();`,
      `    await supabase.auth.signInWithOAuth({`,
      `      provider,`,
      `      options: {`,
      `        redirectTo: \`\${location.origin}/auth/callback\`,`,
      `      },`,
      `    });`,
      `  };`,
    ] : []),
    ``,
    `  return (`,
    `    <div className="flex min-h-screen items-center justify-center">`,
    `      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-sm">`,
    `        <div className="text-center">`,
    `          <h1 className="text-2xl font-bold">Sign In</h1>`,
    `          <p className="text-muted-foreground mt-2">`,
    `            Welcome back`,
    `          </p>`,
    `        </div>`,
    ``,
    ...(hasEmailProvider(auth) ? [
      `        <form onSubmit={handleEmailLogin} className="space-y-4">`,
      `          <div className="space-y-2">`,
      `            <label htmlFor="email" className="text-sm font-medium">`,
      `              Email`,
      `            </label>`,
      `            <input`,
      `              id="email"`,
      `              type="email"`,
      `              value={email}`,
      `              onChange={(e) => setEmail(e.target.value)}`,
      `              required`,
      `              className="w-full rounded-md border px-3 py-2 text-sm"`,
      `              placeholder="you@example.com"`,
      `            />`,
      `          </div>`,
      `          <div className="space-y-2">`,
      `            <label htmlFor="password" className="text-sm font-medium">`,
      `              Password`,
      `            </label>`,
      `            <input`,
      `              id="password"`,
      `              type="password"`,
      `              value={password}`,
      `              onChange={(e) => setPassword(e.target.value)}`,
      `              required`,
      `              className="w-full rounded-md border px-3 py-2 text-sm"`,
      `              placeholder="••••••••"`,
      `            />`,
      `          </div>`,
      ``,
      `          {error && (`,
      `            <p className="text-sm text-destructive">{error}</p>`,
      `          )}`,
      ``,
      `          <button`,
      `            type="submit"`,
      `            disabled={loading}`,
      `            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"`,
      `          >`,
      `            {loading ? "Signing in..." : "Sign In"}`,
      `          </button>`,
      `        </form>`,
      ``,
      ...(oauthProviders.length > 0 ? [
        `        <div className="relative">`,
        `          <div className="absolute inset-0 flex items-center">`,
        `            <span className="w-full border-t" />`,
        `          </div>`,
        `          <div className="relative flex justify-center text-xs uppercase">`,
        `            <span className="bg-background px-2 text-muted-foreground">`,
        `              Or continue with`,
        `            </span>`,
        `          </div>`,
        `        </div>`,
        ``,
        `        <div className="grid gap-2">`,
        ...oauthProviders.map(provider => [
          `          <button`,
          `            onClick={() => handleOAuthLogin("${provider}")}`,
          `            className="w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"`,
          `          >`,
          `            ${capitalize(provider)}`,
          `          </button>`,
        ].join("\n")),
        `        </div>`,
      ] : []),
    ] : []),
    ``,
    `      </div>`,
    `    </div>`,
    `  );`,
    `}`,
    ``
  ].join("\n");
}

/**
 * 生成 OAuth 回调路由
 */
function generateAuthCallback(auth: AuthConfig): string {
  return [
    `import { NextResponse } from "next/server";`,
    `import { createClient } from "@/lib/supabase/server";`,
    ``,
    `export async function GET(request: Request) {`,
    `  const { searchParams, origin } = new URL(request.url);`,
    `  const code = searchParams.get("code");`,
    `  const next = searchParams.get("next") ?? "${auth.redirectUrls.afterLogin || "/"}";`,
    ``,
    `  if (code) {`,
    `    const supabase = await createClient();`,
    `    const { error } = await supabase.auth.exchangeCodeForSession(code);`,
    `    if (!error) {`,
    `      return NextResponse.redirect(\`\${origin}\${next}\`);`,
    `    }`,
    `  }`,
    ``,
    `  return NextResponse.redirect(\`\${origin}/login?error=auth_callback_error\`);`,
    `}`,
    ``
  ].join("\n");
}

/**
 * 生成认证类型定义
 */
function generateAuthTypes(auth: AuthConfig): string {
  const oauthProviders = getOAuthProviders(auth);
  const providerTypes: string[] = [];

  if (hasEmailProvider(auth)) {
    providerTypes.push("  email: true;");
  }
  for (const p of oauthProviders) {
    providerTypes.push(`  ${p}: true;`);
  }

  return [
    `import type { Session, User } from "@supabase/supabase-js";`,
    ``,
    `export interface AuthState {`,
    `  session: Session | null;`,
    `  user: User | null;`,
    `  isLoading: boolean;`,
    `  isAuthenticated: boolean;`,
    `}`,
    ``,
    `export interface AuthProviders {`,
    ...providerTypes,
    `}`,
    ``
  ].join("\n");
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * 生成认证相关所有文件
 *
 * 包含：
 * - middleware.ts — 路由守卫
 * - lib/supabase/server.ts — 服务端 Supabase 客户端
 * - lib/supabase/client.ts — 浏览器 Supabase 客户端
 * - lib/supabase/middleware.ts — 中间件辅助函数
 * - app/login/page.tsx — 登录页面（邮箱登录 + OAuth）
 * - app/auth/callback/route.ts — OAuth 回调处理
 * - types/auth.ts — 认证类型定义
 *
 * @param auth - 认证配置
 * @returns 生成的文件数组
 */
export function generateAuthFiles(auth: AuthConfig): VirtualFile[] {
  const files: VirtualFile[] = [];
  const oauthProviders = getOAuthProviders(auth);

  // 中间件
  files.push({
    path: "middleware.ts",
    content: generateMiddleware(auth),
  });

  // Supabase 客户端
  files.push({
    path: "lib/supabase/server.ts",
    content: generateServerClient(),
  });

  files.push({
    path: "lib/supabase/client.ts",
    content: generateBrowserClient(),
  });

  files.push({
    path: "lib/supabase/middleware.ts",
    content: generateMiddlewareClient(),
  });

  // 认证类型
  files.push({
    path: "types/auth.ts",
    content: generateAuthTypes(auth),
  });

  // 登录页面（如果启用了邮箱登录或 OAuth）
  if (hasEmailProvider(auth) || oauthProviders.length > 0) {
    files.push({
      path: "app/login/page.tsx",
      content: generateLoginPage(auth),
    });
  }

  // OAuth 回调
  if (oauthProviders.length > 0) {
    files.push({
      path: "app/auth/callback/route.ts",
      content: generateAuthCallback(auth),
    });
  }

  return files;
}
