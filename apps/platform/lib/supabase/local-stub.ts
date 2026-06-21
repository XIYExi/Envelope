import type { Session, SupabaseClient, User } from "@supabase/supabase-js";

type AuthStateChangeCallback = (event: string, session: Session | null) => void;

type Subscription = { unsubscribe: () => void };

function nextTick(fn: () => void) {
  Promise.resolve().then(fn);
}

/**
 * 构造 local 模式下的固定用户对象。
 *
 * 说明：
 * - 用于在未配置 Supabase URL/KEY 的情况下，仍可让 UI 链路拥有“已登录用户”；
 * - 该用户 ID 默认与后端 local 模式的 `ENVELOPE_LOCAL_USER_ID` 默认值保持一致（`local-user`）。
 *
 * @param email 可选邮箱（用于本地登录表单输入）
 * @returns 伪造的 Supabase User
 * @author xiye
 * @date 2026-06-22
 */
export function createLocalUser(email?: string): User {
  return {
    id: "local-user",
    aud: "authenticated",
    role: "authenticated",
    email: email?.trim() || "local@envelope.dev",
    app_metadata: {},
    user_metadata: {},
    created_at: new Date(0).toISOString(),
  } as unknown as User;
}

/**
 * 构造 local 模式下的 Session。
 *
 * @param email 可选邮箱（用于本地登录表单输入）
 * @returns 伪造的 Supabase Session
 * @author xiye
 * @date 2026-06-22
 */
export function createLocalSession(email?: string): Session {
  const user = createLocalUser(email);
  return {
    access_token: "local-access-token",
    refresh_token: "local-refresh-token",
    token_type: "bearer",
    expires_in: 60 * 60 * 24 * 365,
    expires_at: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
    user,
  } as unknown as Session;
}

/**
 * 创建一个仅覆盖 Auth 相关能力的 Supabase stub。
 *
 * 用途：
 * - local 模式下 middleware / auth-provider / login / signup / auth-callback 需要“短路”；
 * - 避免强制要求 `NEXT_PUBLIC_SUPABASE_URL` 与 `NEXT_PUBLIC_SUPABASE_ANON_KEY`；
 * - 让依赖 supabase-js 类型的 UI/逻辑仍能正常运行（至少在 auth 层面）。
 *
 * 注意：
 * - 该 stub 仅实现当前项目实际使用到的 `auth.*` 方法；
 * - 如果后续调用到未实现的 supabase 能力，应在对应调用方改为按后端模式分流。
 *
 * @returns SupabaseClient stub
 * @author xiye
 * @date 2026-06-22
 */
export function createLocalSupabaseStub(): SupabaseClient {
  let currentSession: Session | null = createLocalSession();
  const listeners = new Set<AuthStateChangeCallback>();

  const notify = (event: string, session: Session | null) => {
    listeners.forEach((cb) => cb(event, session));
  };

  const auth = {
    getSession: async () => ({ data: { session: currentSession }, error: null }),
    onAuthStateChange: (callback: AuthStateChangeCallback) => {
      listeners.add(callback);
      nextTick(() => callback("INITIAL_SESSION", currentSession));
      const subscription: Subscription = {
        unsubscribe: () => listeners.delete(callback),
      };
      return { data: { subscription } };
    },
    signInWithPassword: async (input: { email: string; password: string }) => {
      currentSession = createLocalSession(input.email);
      notify("SIGNED_IN", currentSession);
      return { data: { session: currentSession, user: currentSession.user }, error: null };
    },
    signUp: async (input: { email: string; password: string; options?: Record<string, unknown> }) => {
      currentSession = createLocalSession(input.email);
      notify("SIGNED_IN", currentSession);
      return { data: { session: currentSession, user: currentSession.user }, error: null };
    },
    signOut: async () => {
      currentSession = null;
      notify("SIGNED_OUT", null);
      return { error: null };
    },
    exchangeCodeForSession: async (_code: string) => ({ data: { session: currentSession }, error: null }),
  };

  return {
    auth,
  } as unknown as SupabaseClient;
}

