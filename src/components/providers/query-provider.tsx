"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/**
 * 🚀 Project Forge 2025 - 초보자 친화적인 TanStack Query 설정
 * - React 19 Concurrent Features 지원
 * - 자동 재시도 및 백그라운드 업데이트
 * - 개발 도구 통합
 * - 메모리 효율적인 캐싱
 */
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR에서 데이터가 즉시 사용 가능할 때까지 기다림
        staleTime: 60 * 1000, // 1분
        // 데이터가 캐시에서 삭제되기까지의 시간
        gcTime: 10 * 60 * 1000, // 10분 (이전 cacheTime)
        // 에러 발생 시 재시도 횟수
        retry: (failureCount, error: unknown) => {
          // 4xx 에러는 재시도하지 않음
          if (error && typeof error === 'object' && 'status' in error) {
            const status = (error as { status: number }).status;
            if (status >= 400 && status < 500) {
              return false;
            }
          }
          // 3번까지 재시도
          return failureCount < 3;
        },
        // 백그라운드에서 자동 재검증
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: true,
      },
      mutations: {
        // 뮤테이션 에러 시 자동 재시도
        retry: 1,
        // 뮤테이션 타임아웃
        networkMode: 'online',
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // SSR: 항상 새로운 쿼리 클라이언트 생성
    return makeQueryClient();
  } else {
    // 브라우저: 기존 클라이언트가 없으면 새로 생성
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

interface QueryProviderProps {
  children: React.ReactNode;
}

/**
 * 쿼리 프로바이더 컴포넌트
 * Next.js App Router와 완벽히 호환되는 TanStack Query 설정
 */
export function QueryProvider({ children }: QueryProviderProps) {
  // 클라이언트는 한 번만 생성하고 재사용
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 개발 환경에서만 DevTools 표시 */}
      <ReactQueryDevtools 
        initialIsOpen={false} 
        buttonPosition="bottom-left"
        position="bottom"
      />
    </QueryClientProvider>
  );
}

/**
 * 서버 컴포넌트에서 쿼리 클라이언트를 가져오는 헬퍼
 */
export function getServerQueryClient() {
  return makeQueryClient();
} 