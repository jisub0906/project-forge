"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { AuthError, AuthChangeEvent, User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * 🚀 Project Forge 2025 - 초보자 친화적인 인증 훅
 * - 표준 Supabase Auth 통합
 * - React Query 캐싱
 * - 자동 리다이렉트
 * - 타입 안전성 보장
 */

// 쿼리 키 정의
const authQueryKeys = {
  all: ['auth'] as const,
  user: () => [...authQueryKeys.all, 'user'] as const,
  session: () => [...authQueryKeys.all, 'session'] as const,
} as const;

// 타입 정의
interface AuthData {
  user: User | null;
  session: Session | null;
}

interface SignUpOptions {
  data?: Record<string, unknown>;
  emailRedirectTo?: string;
}

interface SignUpParams {
  email: string;
  password: string;
  options?: SignUpOptions;
}

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const supabase = createClient();
  
  // 현재 사용자 정보 쿼리
  const {
    data: authData,
    isLoading: loading,
    error: queryError,
  } = useQuery({
    queryKey: authQueryKeys.user(),
    queryFn: async (): Promise<AuthData> => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      
      return { user, session };
    },
    staleTime: 5 * 60 * 1000, // 5분
    retry: 1,
  });

  const user = authData?.user || null;
  const session = authData?.session || null;
  const error = queryError as AuthError | null;

  // 로그인 뮤테이션
  const signInMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.user() });
      router.push("/dashboard");
    },
  });

  // 회원가입 뮤테이션
  const signUpMutation = useMutation({
    mutationFn: async ({ 
      email, 
      password, 
      options 
    }: SignUpParams) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.user() });
    },
  });

  // 로그아웃 뮤테이션
  const signOutMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.clear();
      router.push("/");
    },
  });

  // 소셜 로그인
  const signInWithProvider = async (provider: "google" | "github" | "discord") => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
    return data;
  };

  // 비밀번호 재설정
  const resetPasswordMutation = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) throw error;
      return data;
    },
  });

  // 인증 상태 변경 리스너
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        // 인증 상태 변경 시 쿼리 무효화
        queryClient.invalidateQueries({ queryKey: authQueryKeys.user() });
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth, queryClient]);

  return {
    // 상태
    user,
    session,
    loading,
    error,
    
    // 인증 상태 확인
    isAuthenticated: !!user,
    isLoading: loading,
    
    // 액션들
    signIn: signInMutation.mutateAsync,
    signUp: signUpMutation.mutateAsync,
    signOut: signOutMutation.mutateAsync,
    signInWithProvider,
    resetPassword: resetPasswordMutation.mutateAsync,
    
    // 로딩 상태들
    isSigningIn: signInMutation.isPending,
    isSigningUp: signUpMutation.isPending,
    isSigningOut: signOutMutation.isPending,
    isResettingPassword: resetPasswordMutation.isPending,
    
    // 에러들
    signInError: signInMutation.error as AuthError | null,
    signUpError: signUpMutation.error as AuthError | null,
    signOutError: signOutMutation.error as AuthError | null,
    resetPasswordError: resetPasswordMutation.error as AuthError | null,
  };
}

/**
 * 인증이 필요한 페이지에서 사용하는 훅
 * 로그인하지 않은 사용자를 자동으로 리다이렉트
 */
export function useRequireAuth() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  return { user, loading };
}

/**
 * 이미 인증된 사용자를 리다이렉트하는 훅
 * 로그인/회원가입 페이지에서 사용
 */
export function useRedirectIfAuthenticated() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  return { user, loading };
} 