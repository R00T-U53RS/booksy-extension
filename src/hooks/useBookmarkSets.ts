import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { bookmarkSetApi, type BookmarkSet } from '@/api/bookmarkSet';
import { getToken } from '@/api/client';

export const useBookmarkSets = () => {
  const queryClient = useQueryClient();
  const hasToken = !!getToken();

  const {
    data: bookmarkSets,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['bookmark-sets'],
    queryFn: bookmarkSetApi.getAll,
    enabled: hasToken,
    retry: false,
  });

  const createMutation = useMutation({
    mutationFn: bookmarkSetApi.create,
    onSuccess: newBookmarkSet => {
      // Add the new bookmark set to the existing cache instead of refetching
      queryClient.setQueryData<BookmarkSet[]>(['bookmark-sets'], oldData => {
        return [...(oldData || []), newBookmarkSet];
      });
    },
  });

  return {
    bookmarkSets: bookmarkSets || [],
    isLoading,
    error,
    refetch,

    create: createMutation.mutate,
    createAsync: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error,
  };
};
