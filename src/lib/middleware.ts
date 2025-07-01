import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env, getCurrentSchema } from "./env";

/**
 * 2025년 완벽한 미들웨어 Supabase 클라이언트 - 스키마 분리 지원
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
 * 미들웨어용 Supabase 클라이언트 생성 (스키마 자동 주입)
 * 
 * @description Next.js 미들웨어에서 사용하는 Supabase 클라이언트
 * 현재 프로젝트의 스키마가 자동으로 적용됩니다.
 * 
 * @param {NextRequest} request - Next.js 요청 객체
 * @returns {{ supabase: SupabaseClient, response: NextResponse }} Supabase 클라이언트와 응답 객체
 * 
 * @example
 * ```ts
 * import { createClient } from '@/lib/middleware';
 * 
 * export async function middleware(request: NextRequest) {
 *   const { supabase, response } = createClient(request);
 *   
 *   // 자동으로 현재 프로젝트 스키마가 적용됨
 *   const { data: { user } } = await supabase.auth.getUser();
 *   return response;
 * }
 * ```
 */
export const createClient = (request: NextRequest) => {
  const currentSchema = getCurrentSchema();

  // Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const client = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Apply cookies to the request for immediate access
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          // Create a new response to forward the cookies
          supabaseResponse = NextResponse.next({
            request,
          });

          // Apply cookies to the response for persistence
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // 스키마 자동 주입 래퍼 객체 생성
  const schemaAwareClient = {
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

  return {
    supabase: schemaAwareClient,
    response: supabaseResponse,
  };
};

/**
 * 스키마 자동 주입 미들웨어 클라이언트 타입
 */
export type SchemaAwareSupabaseMiddlewareClient = ReturnType<typeof createClient>['supabase'];

/**
 * 미들웨어에서 사용자 인증 상태 확인
 * 
 * @description 사용자 인증 상태를 확인하고 적절한 응답을 반환
 * @param {NextRequest} request - Next.js 요청 객체
 * @returns {Promise<{ user: User | null, response: NextResponse }>} 사용자 정보와 응답 객체
 * 
 * @example
 * ```ts
 * import { updateSession } from '@/lib/middleware';
 * 
 * export async function middleware(request: NextRequest) {
 *   return await updateSession(request);
 * }
 * ```
 */
export const updateSession = async (request: NextRequest) => {
  const { supabase, response } = createClient(request);

  try {
    // Refresh session if expired - required for Server Components
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error getting user in middleware:", error.message);
    }

    return {
      user,
      response,
    };
  } catch (error) {
    console.error("Unexpected error in middleware:", error);
    return {
      user: null,
      response,
    };
  }
};
