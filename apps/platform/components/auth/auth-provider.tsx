"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth";
import { Skeleton } from "@/components/ui/skeleton";

const publicPaths = ["/login", "/signup", "/"];

function isPublicPath(pathname: string): boolean {
  return publicPaths.some((p) => pathname === p || (p !== "/" && pathname.startsWith(`${p}/`)));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, setUser, setSession, setLoading, setSupabase } = useAuthStore();

  useEffect(() => {
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
