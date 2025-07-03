import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseUrl, getSupabaseAnonKey } from "./env";

/**
 * 🚀 Project Forge 2025 - 초보자 친화적인 미들웨어 Supabase 클라이언트
 * 표준 Supabase 미들웨어로 모든 기능 사용 가능
 */

/**
 * 미들웨어용 Supabase 클라이언트 생성
 * 
 * @description Next.js 미들웨어에서 사용하는 표준 Supabase 클라이언트
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
 *   // 표준 Supabase 사용법
 *   const { data: { user } } = await supabase.auth.getUser();
 *   
 *   if (!user) {
 *     return NextResponse.redirect(new URL('/auth/login', request.url));
 *   }
 *   
 *   return response;
 * }
 * ```
 */
export const createClient = (request: NextRequest) => {
  // Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
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

  return {
    supabase,
    response: supabaseResponse,
  };
};

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

/**
 * Supabase 미들웨어 클라이언트 타입
 */
export type SupabaseMiddlewareClient = ReturnType<typeof createClient>['supabase'];
