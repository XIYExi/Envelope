import { create } from "zustand";
import type { AuthState, AuthActions } from "./auth.types";

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  user: null,
  session: null,
  isLoading: true,
  supabase: null,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (isLoading) => set({ isLoading }),
  setSupabase: (supabase) => set({ supabase }),

  signOut: async () => {
    const { supabase } = get();
    if (supabase) {
      await supabase.auth.signOut();
    }
    set({ user: null, session: null });
  },
}));
