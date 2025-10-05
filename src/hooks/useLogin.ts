import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { setToken, removeToken, getToken } from '@/api/client';
import { authApi } from '@/api/auth';

export const useLogin = () => {
  const queryClient = useQueryClient();

  const hasToken = !!getToken();

  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authApi.me,
    enabled: hasToken,
    retry: false,
    staleTime: Infinity,
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: data => {
      setToken(data.accessToken);
      queryClient.setQueryData(['auth', 'me'], data.user);
    },
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: data => {
      setToken(data.accessToken);
      queryClient.setQueryData(['auth', 'me'], data.user);
    },
  });

  const logout = () => {
    removeToken();
    queryClient.setQueryData(['auth', 'me'], null);
    queryClient.clear();
  };

  const isAuthenticated = hasToken && !!user && !userError;
  const isLoading = hasToken && isLoadingUser;

  return {
    user,
    isAuthenticated,
    isLoading,

    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,

    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    logout,
    refetchUser,
  };
};
