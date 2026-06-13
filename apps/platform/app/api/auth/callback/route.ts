import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

const ALLOWED_NEXT_PATHS = ["/inner", "/"];

function validateNextPath(next: string | null): string {
  if (!next) return "/inner";
  if (ALLOWED_NEXT_PATHS.includes(next)) return next;
  if (next.startsWith("/inner")) return next;
  return "/inner";
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  if (code) {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const safeNext = validateNextPath(next);
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
    console.error("[auth/callback] Code exchange failed:", error.message);
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`);
}
