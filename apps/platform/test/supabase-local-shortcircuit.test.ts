import { describe, expect, it } from "vitest";
import { createLocalSupabaseStub } from "@/lib/supabase/local-stub";
import { isSupabaseAuthEnabled, resolveSupabaseRuntimeState } from "@/lib/supabase/runtime";

describe("supabase local shortcircuit", () => {
  it("treats missing supabase env as disabled", () => {
    expect(isSupabaseAuthEnabled({})).toBe(false);
    expect(resolveSupabaseRuntimeState({})).toEqual({
      enabled: false,
      config: {
        url: null,
        anonKey: null,
      },
    });
  });

  it("enables when url and anon key exist", () => {
    const env = {
      NEXT_PUBLIC_SUPABASE_URL: "https://demo.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-key",
    };
    expect(isSupabaseAuthEnabled(env)).toBe(true);
    expect(resolveSupabaseRuntimeState(env).enabled).toBe(true);
  });

  it("local stub can emit initial session and sign out", async () => {
    const supabase = createLocalSupabaseStub();

    const initial = await supabase.auth.getSession();
    expect(initial.data.session?.user?.id).toBe("local-user");

    let initialEventSeen = false;
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") {
        initialEventSeen = true;
        expect(session?.user?.id).toBe("local-user");
      }
    });

    await new Promise((r) => setTimeout(r, 0));
    expect(initialEventSeen).toBe(true);

    await supabase.auth.signOut();
    const after = await supabase.auth.getSession();
    expect(after.data.session).toBeNull();

    data.subscription.unsubscribe();
  });
});

