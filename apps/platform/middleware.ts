import { type NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

/**
 * Next.js Middleware：鉴权拦截与公开路由白名单
 *
 * 设计目标：
 * - 默认对除公开路由外的所有页面进行登录态校验
 * - 允许通过环境变量 ENABLE_E2E_ROUTES=1 在运行时开放 Playwright/E2E 专用路由前缀 /e2e
 *
 * 关键说明：
 * - middleware 运行在 Edge Runtime，不能依赖 Node.js 特性
 * - 公开路由通过 pathname 前缀匹配；例如 publicPaths 包含 "/e2e" 时，
 *   "/e2e/canvas" 也会被视作公开路由
 */

/** 公开路由白名单（不需要登录态即可访问） */
const publicPaths = [
  "/login",
  "/signup",
  "/api/auth/callback",
  ...(process.env.ENABLE_E2E_ROUTES === "1" ? ["/e2e"] : []),
];

/**
 * 判断当前请求路径是否属于公开路由
 *
 * @param pathname - NextRequest.nextUrl.pathname（不含 query）
 * @returns 是否命中公开路由白名单
 */
function isPublicPath(pathname: string): boolean {
  return publicPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/**
 * 中间件入口：未登录用户访问私有路由时重定向到 /login
 *
 * @param request - Next.js Middleware 请求对象
 * @returns NextResponse（继续请求 / 重定向）
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon") || pathname === "/") {
    return NextResponse.next();
  }

  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("next", pathname + request.nextUrl.search);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

/**
 * Middleware 匹配规则
 *
 * 说明：
 * - 排除 Next.js 静态资源与常见静态文件后缀
 * - 其余路径均走 middleware 做鉴权拦截
 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)$).*)"],
};
