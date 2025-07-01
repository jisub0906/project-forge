import { createBrowserClient } from "@supabase/ssr";
import { clientEnv, getCurrentSchemaClient } from "./env";

/**
 * 2025년 완벽한 Supabase 클라이언트 - 스키마 분리 지원
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
 * 브라우저용 Supabase 클라이언트 생성 (스키마 자동 주입)
 * 
 * @description Next.js 클라이언트 컴포넌트에서 사용하는 Supabase 클라이언트
 * 현재 프로젝트의 스키마가 자동으로 적용됩니다.
 * 
 * @returns {SupabaseClient} 브라우저 환경에 최적화된 Supabase 클라이언트
 * 
 * @example
 * ```tsx
 * import { createClient } from '@/lib/client';
 * 
 * export default function MyComponent() {
 *   const supabase = createClient();
 *   
 *   // 자동으로 현재 프로젝트 스키마가 적용됨
 *   const { data } = await supabase.from('users').select('*');
 * }
 * ```
 */
export const createClient = () => {
  const client = createBrowserClient(
    clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const currentSchema = getCurrentSchemaClient();

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
 * 스키마 자동 주입 클라이언트 타입
 */
export type SchemaAwareSupabaseClient = ReturnType<typeof createClient>;
