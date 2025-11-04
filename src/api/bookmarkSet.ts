import { apiClient } from '@/api/client';

export interface BookmarkSet {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookmarkSetRequest {
  name: string;
  description?: string;
}

export const bookmarkSetApi = {
  getAll: async (): Promise<BookmarkSet[]> => {
    const response = await apiClient.get<BookmarkSet[]>('/bookmark-set');
    return response.data;
  },

  create: async (data: CreateBookmarkSetRequest): Promise<BookmarkSet> => {
    const response = await apiClient.post<BookmarkSet>('/bookmark-set', data);
    return response.data;
  },
};
