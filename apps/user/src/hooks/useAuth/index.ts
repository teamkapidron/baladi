// Node Modules
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@repo/ui/lib/sonner';

// Hooks
import { useRequest } from '@/hooks/useRequest';

// Types
import type {
  GetUserDataRequest,
  SignUpRequest,
  VerifyOTPRequest,
  ResendOTPRequest,
  OnboardingRequest,
  LoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  LogoutRequest,
} from './types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

export function useAuth() {
  const api = useRequest();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [showOTPVerification, setShowOTPVerification] = useState(false);

  const getUserData = useCallback(async () => {
    const response = await api.get<GetUserDataRequest['response']>('/auth/me');
    return response.data.data.user;
  }, [api]);

  const {
    data: user,
    isLoading: isLoadingUser,
    refetch: refetchUser,
  } = useQuery({
    queryKey: [ReactQueryKeys.GET_USER_DATA],
    queryFn: getUserData,
  });

  const signup = useCallback(
    async (payload: SignUpRequest['payload']) => {
      const response = await api.post<SignUpRequest['response']>(
        '/auth/signup',
        payload,
      );
      return response.data;
    },
    [api],
  );

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: function () {
      setShowOTPVerification(true);
    },
  });

  const verifyOTP = useCallback(
    async (payload: VerifyOTPRequest['payload']) => {
      const response = await api.post<VerifyOTPRequest['response']>(
        '/auth/verify-otp',
        payload,
      );
      return response.data;
    },
    [api],
  );

  const verifyOTPMutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: function () {
      refetchUser();
      router.push('/onboarding');
      toast.success('OTP verified successfully');
    },
  });

  const resendOTP = useCallback(
    async (payload: ResendOTPRequest['payload']) => {
      const response = await api.post<ResendOTPRequest['response']>(
        '/auth/resend-otp',
        payload,
      );
      return response.data;
    },
    [api],
  );

  const resendOTPMutation = useMutation({
    mutationFn: resendOTP,
    onSuccess: function () {
      toast.success('OTP resent successfully');
    },
  });

  const onboarding = useCallback(
    async (payload: OnboardingRequest['payload']) => {
      const response = await api.post<OnboardingRequest['response']>(
        '/auth/onboarding',
        payload,
      );
      return response.data;
    },
    [api],
  );

  const onboardingMutation = useMutation({
    mutationFn: onboarding,
    onSuccess: function () {
      refetchUser();
      router.push('/wait-for-approval');
      toast.success('Onboarding successful');
    },
  });

  const login = useCallback(
    async (payload: LoginRequest['payload']) => {
      const response = await api.post<LoginRequest['response']>(
        '/auth/login',
        payload,
      );
      return response.data;
    },
    [api],
  );

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: function () {
      refetchUser();
      router.push('/wait-for-approval');
      toast.success('Login successful');
    },
  });

  const forgotPassword = useCallback(
    async (payload: ForgotPasswordRequest['payload']) => {
      const response = await api.post<ForgotPasswordRequest['response']>(
        '/auth/forgot-password',
        payload,
      );
      return response.data;
    },
    [api],
  );

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: function () {
      toast.success('Password reset link sent to your email');
    },
  });

  const resetPassword = useCallback(
    async (payload: ResetPasswordRequest['payload']) => {
      const response = await api.post<ResetPasswordRequest['response']>(
        '/auth/reset-password',
        payload,
      );
      return response.data;
    },
    [api],
  );

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: function () {
      refetchUser();
      router.push('/login');
      toast.success('Password reset successfully');
    },
  });

  const logout = useCallback(async () => {
    const response = await api.post<LogoutRequest['response']>('/auth/logout');
    return response.data;
  }, [api]);

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: async function () {
      await queryClient.resetQueries({
        queryKey: [ReactQueryKeys.GET_USER_DATA],
      });
      router.push('/login');
      toast.success('Logged out successfully');
    },
  });

  return {
    // States
    user,
    isLoadingUser,
    refetchUser,
    showOTPVerification,
    isAuthenticated: !!user,

    // Mutations
    signupMutation,
    verifyOTPMutation,
    resendOTPMutation,
    onboardingMutation,
    loginMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
    logoutMutation,

    // Actions
    setShowOTPVerification,
  };
}
