import { createClient } from '@/lib/client';
import { createClient as createServerClient } from '@/lib/server';

/**
 * API 응답 타입
 */
export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

/**
 * 클라이언트 사이드 API 헬퍼
 */
export const api = {
  /**
   * Supabase 클라이언트 인스턴스
   */
  client: createClient(),

  /**
   * 에러 핸들링 헬퍼
   */
  handleError(error: unknown): ApiError {
    if (error instanceof Error) {
      return {
        message: error.message,
        code: 'UNKNOWN_ERROR',
      };
    }
    return {
      message: '알 수 없는 오류가 발생했습니다.',
      code: 'UNKNOWN_ERROR',
    };
  },

  /**
   * 성공 응답 생성
   */
  success<T>(data: T): ApiResponse<T> {
    return { data, error: null };
  },

  /**
   * 에러 응답 생성
   */
  error(error: ApiError): ApiResponse<never> {
    return { data: null, error };
  },
};

/**
 * 서버 사이드 API 헬퍼
 */
export const serverApi = {
  /**
   * Supabase 서버 클라이언트 생성
   */
  async client() {
    return createServerClient();
  },

  /**
   * 에러 핸들링 헬퍼
   */
  handleError: api.handleError,

  /**
   * 성공 응답 생성
   */
  success: api.success,

  /**
   * 에러 응답 생성
   */
  error: api.error,
};

/**
 * HTTP 상태 코드별 에러 메시지
 */
export const ERROR_MESSAGES = {
  400: '잘못된 요청입니다.',
  401: '인증이 필요합니다.',
  403: '권한이 없습니다.',
  404: '요청한 리소스를 찾을 수 없습니다.',
  429: '너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요.',
  500: '서버 오류가 발생했습니다.',
} as const; 