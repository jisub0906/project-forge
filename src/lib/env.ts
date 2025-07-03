import { z } from 'zod';

/**
 * 🚀 Project Forge 2025 - 초보자 친화적인 환경변수 검증
 * Supabase MCP Server 중심의 단순하고 명확한 설정
 */

// 🎯 환경변수 스키마 (필수 항목만 포함)
const envSchema = z.object({
  // 공개 변수 (클라이언트에서 접근 가능)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('유효한 Supabase URL이 필요합니다.'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'Supabase Anon Key가 필요합니다.'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  
  // 서버 전용 변수 (절대 클라이언트에 노출되지 않음)
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'Supabase Service Role Key가 필요합니다.').optional(),
  
  // Next.js 환경
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // 선택적 외부 서비스 (고급 사용자용)
  RESEND_API_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
});

// 서버 사이드에서만 사용 (SSR, API Routes, Server Actions)
export const env = envSchema.parse(process.env);

// 클라이언트 사이드 전용 환경변수 (브라우저에서 접근 가능)
const clientEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

// 🎯 타입 안전성을 위한 환경변수 접근 함수들
export const getSupabaseUrl = () => clientEnv.NEXT_PUBLIC_SUPABASE_URL;
export const getSupabaseAnonKey = () => clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const getAppUrl = () => clientEnv.NEXT_PUBLIC_APP_URL;
export const isDevelopment = () => env.NODE_ENV === 'development';
export const isProduction = () => env.NODE_ENV === 'production';

// 타입 정의
export type Env = z.infer<typeof envSchema>;
export type ClientEnv = z.infer<typeof clientEnvSchema>; 