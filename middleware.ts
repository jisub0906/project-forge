import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/middleware';

/**
 * 🚀 Project Forge 2025 - Next.js 미들웨어
 * Supabase 인증 세션을 자동으로 새로고침하고 보호된 라우트를 관리합니다.
 */

export async function middleware(request: NextRequest) {
  // Supabase 세션 업데이트
  const { response } = await updateSession(request);
  
  return response;
}

export const config = {
  matcher: [
    /*
     * 다음을 제외한 모든 요청 경로에 대해 미들웨어 실행:
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     * - public 폴더의 파일들 (.svg, .png, .jpg, .jpeg, .gif, .webp)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}; 