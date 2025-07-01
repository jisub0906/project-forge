import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env, getCurrentSchema } from "./env";

/**
 * 2025년 완벽한 서버 사이드 Supabase 클라이언트 - 스키마 분리 지원
 * - 자동 스키마 주입
 * - 타입 안전성 보장
 * - 실수 방지 구조
 */

// 타입 정의
interface RpcOptions {
  count?: 'exact' | 'planned' | 'estimated';
  head?: boolean;
}

interface RpcArgs {
  [key: string]: unknown;
}

/**
 * 서버용 Supabase 클라이언트 생성 (스키마 자동 주입)
 * 
 * @description Next.js 서버 컴포넌트, API 라우트, 서버 액션에서 사용하는 Supabase 클라이언트
 * 현재 프로젝트의 스키마가 자동으로 적용됩니다.
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
 *   // 자동으로 현재 프로젝트 스키마가 적용됨
 *   const { data } = await supabase.from('users').select('*');
 * }
 * ```
 */
export const createClient = async () => {
  const cookieStore = await cookies();
  const currentSchema = getCurrentSchema();

  const client = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
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

  // 스키마 자동 주입 래퍼 객체 반환
  return {
    // 기본 클라이언트 메서드들 (스키마와 무관한 기능들)
    auth: client.auth,
    storage: client.storage,
    realtime: client.realtime,
    
    // 스키마 자동 적용 테이블 접근
    from: (table: string) => client.schema(currentSchema).from(table),
    
    // RPC 호출 (스키마 자동 적용)
    rpc: (fn: string, args?: RpcArgs, options?: RpcOptions) => {
      return client.schema(currentSchema).rpc(fn, args, options);
    },
    
    // 원본 클라이언트 접근 (특별한 경우에만 사용)
    _raw: client,
    
    // 현재 사용 중인 스키마명 확인
    getCurrentSchema: () => currentSchema,
    
    // 다른 스키마로 임시 접근 (특별한 경우에만 사용)
    withSchema: (schema: string) => ({
      from: (table: string) => client.schema(schema).from(table),
      rpc: (fn: string, args?: RpcArgs, options?: RpcOptions) => {
        return client.schema(schema).rpc(fn, args, options);
      },
    }),
  };
};

/**
 * 서버 액션용 Supabase 클라이언트 생성 (관리자 권한 + 스키마 자동 주입)
 * 
 * @description 서버 액션에서 관리자 권한이 필요한 작업에 사용
 * @returns {SupabaseClient} 서비스 롤 키를 사용하는 Supabase 클라이언트
 * 
 * @example
 * ```ts
 * import { createAdminClient } from '@/lib/server';
 * 
 * export async function deleteUser(userId: string) {
 *   const supabase = createAdminClient();
 *   // 관리자 권한으로 사용자 삭제 (자동 스키마 적용)
 * }
 * ```
 */
export const createAdminClient = () => {
  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY environment variable. Please check your .env.local file."
    );
  }

  const currentSchema = getCurrentSchema();

  const client = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      cookies: {
        getAll: () => [],
        setAll: () => {},
      },
    }
  );

  // 스키마 자동 주입 래퍼 객체 반환
  return {
    // 기본 클라이언트 메서드들 (스키마와 무관한 기능들)
    auth: client.auth,
    storage: client.storage,
    realtime: client.realtime,
    
    // 스키마 자동 적용 테이블 접근
    from: (table: string) => client.schema(currentSchema).from(table),
    
    // RPC 호출 (스키마 자동 적용)
    rpc: (fn: string, args?: RpcArgs, options?: RpcOptions) => {
      return client.schema(currentSchema).rpc(fn, args, options);
    },
    
    // 원본 클라이언트 접근 (특별한 경우에만 사용)
    _raw: client,
    
    // 현재 사용 중인 스키마명 확인
    getCurrentSchema: () => currentSchema,
    
    // 다른 스키마로 임시 접근 (특별한 경우에만 사용)
    withSchema: (schema: string) => ({
      from: (table: string) => client.schema(schema).from(table),
      rpc: (fn: string, args?: RpcArgs, options?: RpcOptions) => {
        return client.schema(schema).rpc(fn, args, options);
      },
    }),
  };
};

/**
 * 쿠키 스토어 없이 서버용 Supabase 클라이언트 생성 (스키마 자동 주입)
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
 *   // 공개 데이터 조회 (자동 스키마 적용)
 * }
 * ```
 */
export const createClientWithoutCookies = () => {
  const currentSchema = getCurrentSchema();

  const client = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => [],
        setAll: () => {},
      },
    }
  );

  // 스키마 자동 주입 래퍼 객체 반환
  return {
    // 기본 클라이언트 메서드들 (스키마와 무관한 기능들)
    auth: client.auth,
    storage: client.storage,
    realtime: client.realtime,
    
    // 스키마 자동 적용 테이블 접근
    from: (table: string) => client.schema(currentSchema).from(table),
    
    // RPC 호출 (스키마 자동 적용)
    rpc: (fn: string, args?: RpcArgs, options?: RpcOptions) => {
      return client.schema(currentSchema).rpc(fn, args, options);
    },
    
    // 원본 클라이언트 접근 (특별한 경우에만 사용)
    _raw: client,
    
    // 현재 사용 중인 스키마명 확인
    getCurrentSchema: () => currentSchema,
    
    // 다른 스키마로 임시 접근 (특별한 경우에만 사용)
    withSchema: (schema: string) => ({
      from: (table: string) => client.schema(schema).from(table),
      rpc: (fn: string, args?: RpcArgs, options?: RpcOptions) => {
        return client.schema(schema).rpc(fn, args, options);
      },
    }),
  };
};

/**
 * 스키마 자동 주입 서버 클라이언트 타입들
 */
export type SchemaAwareSupabaseServerClient = Awaited<ReturnType<typeof createClient>>;
export type SchemaAwareSupabaseAdminClient = ReturnType<typeof createAdminClient>;
