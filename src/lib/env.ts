import { z } from 'zod';

/**
 * 2025년 완벽한 환경변수 검증 시스템
 * - 스키마 분리 지원
 * - 타입 안전성 보장
 * - 개발/스테이징/프로덕션 환경별 스키마 관리
 */

// 환경변수 스키마 정의
const envSchema = z.object({
  // Next.js 기본 설정
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url('유효한 앱 URL이 필요합니다.').default('http://localhost:3000'),
  
  // Supabase 필수 설정
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('유효한 Supabase URL이 필요합니다.'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'Supabase Anon Key가 필요합니다.'),
  
  // 스키마 분리 설정 (핵심 기능)
  NEXT_PUBLIC_SUPABASE_SCHEMA: z.string().min(1, '프로젝트 스키마명이 필요합니다.').default('public'),
  
  // 환경별 스키마 설정 (선택사항)
  NEXT_PUBLIC_SUPABASE_SCHEMA_DEV: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_SCHEMA_STAGING: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_SCHEMA_PROD: z.string().optional(),
  
  // 서버 전용 변수
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'Supabase Service Role Key가 필요합니다.').optional(),
  
  // 외부 서비스 (선택사항)
  RESEND_API_KEY: z.string().optional(),
  UPLOADTHING_SECRET: z.string().optional(),
  UPLOADTHING_APP_ID: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  
  // 모니터링 (선택사항)
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  
  // 개발 도구 (선택사항)
  DATABASE_URL: z.string().optional(),
  REDIS_URL: z.string().optional(),
  
  // 보안 설정 (선택사항)
  JWT_SECRET: z.string().optional(),
  WEBHOOK_SECRET: z.string().optional(),
});

// 클라이언트 사이드 전용 환경변수 스키마
const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_SCHEMA: z.string().min(1),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
});

/**
 * 서버 사이드에서만 사용 (SSR, API Routes, Server Actions)
 * 모든 환경변수에 접근 가능
 */
export const env = envSchema.parse(process.env);

/**
 * 클라이언트 사이드 전용 환경변수 (브라우저에서 접근 가능)
 * NEXT_PUBLIC_ 접두사가 있는 변수만 포함
 */
export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_SCHEMA: process.env.NEXT_PUBLIC_SUPABASE_SCHEMA,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
});

/**
 * 현재 환경에 맞는 스키마명 반환
 * 환경별 스키마가 설정되어 있으면 우선 사용, 없으면 기본 스키마 사용
 */
export function getCurrentSchema(): string {
  const nodeEnv = env.NODE_ENV;
  
  switch (nodeEnv) {
    case 'development':
      return env.NEXT_PUBLIC_SUPABASE_SCHEMA_DEV || env.NEXT_PUBLIC_SUPABASE_SCHEMA;
    case 'test':
      return env.NEXT_PUBLIC_SUPABASE_SCHEMA_DEV || env.NEXT_PUBLIC_SUPABASE_SCHEMA;
    case 'production':
      // 스테이징과 프로덕션 구분은 추가 환경변수로 처리
      return env.NEXT_PUBLIC_SUPABASE_SCHEMA_PROD || env.NEXT_PUBLIC_SUPABASE_SCHEMA;
    default:
      return env.NEXT_PUBLIC_SUPABASE_SCHEMA;
  }
}

/**
 * 클라이언트에서 현재 스키마명 반환
 */
export function getCurrentSchemaClient(): string {
  return clientEnv.NEXT_PUBLIC_SUPABASE_SCHEMA;
}

/**
 * 환경변수 검증 결과 타입
 */
export type Env = z.infer<typeof envSchema>;
export type ClientEnv = z.infer<typeof clientEnvSchema>; 