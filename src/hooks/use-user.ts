'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/client';
import { useAuth } from './use-auth';
import type { UpdateProfileInput } from '@/lib/schemas/auth';

/**
 * 사용자 프로필 타입
 */
export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  location?: string;
  created_at: string;
  updated_at?: string;
}

// 쿼리 키 정의
const userQueryKeys = {
  all: ['users'] as const,
  profile: (userId: string) => [...userQueryKeys.all, 'profile', userId] as const,
  currentProfile: () => [...userQueryKeys.all, 'profile', 'current'] as const,
} as const;

/**
 * 현재 로그인한 사용자의 프로필을 관리하는 훅
 */
export function useUser() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const supabase = createClient();

  // 프로필 조회
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: userQueryKeys.currentProfile(),
    queryFn: async (): Promise<UserProfile | null> => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        // 프로필이 없는 경우 자동 생성
        if (error.code === 'PGRST116') {
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              email: user.email,
              name: user.user_metadata?.name,
            })
            .select()
            .single();

          if (createError) throw createError;
          return newProfile;
        }
        throw error;
      }

      return data;
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5분
  });

  // 프로필 업데이트
  const updateProfileMutation = useMutation({
    mutationFn: async (input: UpdateProfileInput) => {
      if (!user) throw new Error('인증이 필요합니다.');

      const { data, error } = await supabase
        .from('profiles')
        .update(input)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKeys.currentProfile(), data);
    },
  });

  // 아바타 업로드
  const uploadAvatarMutation = useMutation({
    mutationFn: async (file: File) => {
      if (!user) throw new Error('인증이 필요합니다.');

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // 기존 아바타 삭제
      if (profile?.avatar_url) {
        const oldPath = profile.avatar_url.split('/').pop();
        if (oldPath) {
          await supabase.storage.from('avatars').remove([`avatars/${oldPath}`]);
        }
      }

      // 새 아바타 업로드
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 공개 URL 가져오기
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // 프로필 업데이트
      await updateProfileMutation.mutateAsync({ avatar_url: publicUrl });

      return publicUrl;
    },
  });

  return {
    // 상태
    profile,
    isLoading,
    error,

    // 액션
    updateProfile: updateProfileMutation.mutateAsync,
    uploadAvatar: uploadAvatarMutation.mutateAsync,

    // 로딩 상태
    isUpdatingProfile: updateProfileMutation.isPending,
    isUploadingAvatar: uploadAvatarMutation.isPending,

    // 에러
    updateProfileError: updateProfileMutation.error,
    uploadAvatarError: uploadAvatarMutation.error,
  };
}

/**
 * 특정 사용자의 프로필을 조회하는 훅
 */
export function useUserProfile(userId: string) {
  const supabase = createClient();

  return useQuery({
    queryKey: userQueryKeys.profile(userId),
    queryFn: async (): Promise<UserProfile> => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
    staleTime: 10 * 60 * 1000, // 10분
  });
} 