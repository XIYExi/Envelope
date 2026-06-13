import type { SupabaseClient, User, Session } from "@supabase/supabase-js";

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  supabase: SupabaseClient | null;
}

export interface AuthActions {
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setSupabase: (client: SupabaseClient) => void;
  signOut: () => Promise<void>;
}
