import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { profileApi, type Profile } from '@/api/profile';
import { getToken } from '@/api/client';

export const useProfiles = () => {
  const queryClient = useQueryClient();
  const hasToken = !!getToken();

  const {
    data: profiles,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['profiles'],
    queryFn: profileApi.getAll,
    enabled: hasToken,
    retry: false,
  });

  const createMutation = useMutation({
    mutationFn: profileApi.create,
    onSuccess: newProfile => {
      // Add the new profile to the existing cache instead of refetching
      queryClient.setQueryData<Profile[]>(['profiles'], oldData => {
        return [...(oldData || []), newProfile];
      });
    },
  });

  return {
    profiles: profiles || [],
    isLoading,
    error,
    refetch,

    create: createMutation.mutate,
    createAsync: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error,
  };
};
