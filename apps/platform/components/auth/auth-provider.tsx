"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * 客户端鉴权 Provider
 *
 * 主要职责：
 * - 在客户端初始化 Supabase 并订阅 auth 状态变化
 * - 基于当前 pathname 做“登录态兜底保护”（与 middleware 的服务端拦截互补）
 * - 当 ENABLE_E2E_ROUTES=1 时，将 /e2e 前缀加入公开路由白名单，供 Playwright/E2E 使用
 *
 * 关键点：
 * - 这里的 process.env.ENABLE_E2E_ROUTES 通过 next.config.js 的 env 注入到客户端 bundle，
 *   用于在不改动代码的情况下按环境切换 E2E 路由是否公开
 */

/** 客户端公开路由白名单（不需要登录态即可访问） */
const publicPaths = [
  "/login",
  "/signup",
  "/",
  ...(process.env.ENABLE_E2E_ROUTES === "1" ? ["/e2e"] : []),
];

/**
 * 判断当前路径是否为公开路由
 *
 * @param pathname - usePathname() 返回的 pathname
 * @returns 是否命中公开路由白名单
 */
function isPublicPath(pathname: string): boolean {
  return publicPaths.some((p) => pathname === p || (p !== "/" && pathname.startsWith(`${p}/`)));
}

/**
 * 鉴权 Provider 组件
 *
 * @param props - 组件参数
 * @param props.children - 子树（应用实际页面内容）
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, setUser, setSession, setLoading, setSupabase } = useAuthStore();

  useEffect(() => {
    /**
     * E2E 路由模式：不初始化 Supabase
     *
     * 关键原因：
     * - /e2e 页面用于 Playwright 验证前端交互，不应依赖任何 Supabase 配置
     * - 在未配置 NEXT_PUBLIC_SUPABASE_* 的环境里，createClient() 会直接抛错导致页面无法渲染
     *
     * @note 仅在 ENABLE_E2E_ROUTES=1 且 pathname 以 /e2e 开头时生效
     */
    const bypassSupabase =
      process.env.ENABLE_E2E_ROUTES === "1"
      && typeof pathname === "string"
      && pathname.startsWith("/e2e");

    if (bypassSupabase) {
      setSupabase(null);
      setUser(null);
      setSession(null);
      setLoading(false);
      return;
    }

    const supabase = createClient();
    setSupabase(supabase);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setSession(session);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setSession, setLoading, setSupabase]);

  useEffect(() => {
    if (!isLoading) {
      const isPublic = isPublicPath(pathname);
      if (!user && !isPublic) {
        router.push("/login");
      }
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-4">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
