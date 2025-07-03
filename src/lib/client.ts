import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseUrl, getSupabaseAnonKey } from "./env";

/**
 * 🚀 Project Forge 2025 - 초보자 친화적인 Supabase 클라이언트
 * 표준 Supabase 클라이언트로 모든 기능 사용 가능
 */

/**
 * 브라우저용 Supabase 클라이언트 생성
 * 
 * @description Next.js 클라이언트 컴포넌트에서 사용하는 표준 Supabase 클라이언트
 * 
 * @returns {SupabaseClient} 브라우저 환경에 최적화된 Supabase 클라이언트
 * 
 * @example
 * ```tsx
 * 'use client';
 * import { createClient } from '@/lib/client';
 * 
 * export default function MyComponent() {
 *   const supabase = createClient();
 *   
 *   // 표준 Supabase 사용법
 *   const { data } = await supabase.from('users').select('*');
 *   
 *   // 인증
 *   const { data: { user } } = await supabase.auth.getUser();
 *   
 *   // 스토리지
 *   const { data } = await supabase.storage.from('avatars').list();
 * }
 * ```
 */
export const createClient = () => {
  return createBrowserClient(
    getSupabaseUrl(),
    getSupabaseAnonKey()
  );
};

/**
 * Supabase 클라이언트 타입
 */
export type SupabaseClient = ReturnType<typeof createClient>;
