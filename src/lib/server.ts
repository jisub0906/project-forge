import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env, getSupabaseUrl, getSupabaseAnonKey } from "./env";

/**
 * 🚀 Project Forge 2025 - 초보자 친화적인 서버 Supabase 클라이언트
 * 표준 Supabase 서버 클라이언트로 모든 기능 사용 가능
 */

/**
 * 서버용 Supabase 클라이언트 생성
 * 
 * @description Next.js 서버 컴포넌트, API 라우트, 서버 액션에서 사용하는 표준 Supabase 클라이언트
 * 
 * @returns {Promise<SupabaseClient>} 서버 환경에 최적화된 Supabase 클라이언트
 * 
 * @example
 * ```tsx
 * import { createClient } from '@/lib/server';
 * 
 * export default async function ServerComponent() {
 *   const supabase = await createClient();
 *   
 *   // 표준 Supabase 사용법
 *   const { data } = await supabase.from('users').select('*');
 *   
 *   // 인증된 사용자 정보
 *   const { data: { user } } = await supabase.auth.getUser();
 * }
 * ```
 */
export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
            console.warn(
              "Unable to set cookies in Server Component. This is expected behavior when called from a Server Component. Ensure middleware is configured to refresh user sessions."
            );
          }
        },
      },
    }
  );
};

/**
 * 서버 액션용 Supabase 관리자 클라이언트 생성
 * 
 * @description 서버 액션에서 관리자 권한이 필요한 작업에 사용
 * @returns {SupabaseClient} 서비스 롤 키를 사용하는 Supabase 클라이언트
 * 
 * @example
 * ```ts
 * 'use server';
 * import { createAdminClient } from '@/lib/server';
 * 
 * export async function deleteUser(userId: string) {
 *   const supabase = createAdminClient();
 *   // 관리자 권한으로 사용자 삭제
 *   await supabase.auth.admin.deleteUser(userId);
 * }
 * ```
 */
export const createAdminClient = () => {
  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY environment variable. Please check your .env.local file."
    );
  }

  return createServerClient(
    getSupabaseUrl(),
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      cookies: {
        getAll: () => [],
        setAll: () => {},
      },
    }
  );
};

/**
 * 쿠키 스토어 없이 서버용 Supabase 클라이언트 생성
 * 
 * @description API 라우트나 서버 액션에서 사용자 세션이 불필요한 경우 사용
 * @returns {SupabaseClient} 쿠키 스토어 없는 Supabase 클라이언트
 * 
 * @example
 * ```ts
 * import { createClientWithoutCookies } from '@/lib/server';
 * 
 * export async function GET() {
 *   const supabase = createClientWithoutCookies();
 *   // 공개 데이터 조회
 *   const { data } = await supabase.from('posts').select('*');
 * }
 * ```
 */
export const createClientWithoutCookies = () => {
  return createServerClient(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
    {
      cookies: {
        getAll: () => [],
        setAll: () => {},
      },
    }
  );
};

/**
 * Supabase 서버 클라이언트 타입들
 */
export type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;
export type SupabaseAdminClient = ReturnType<typeof createAdminClient>;
export type SupabaseClientWithoutCookies = ReturnType<typeof createClientWithoutCookies>;
