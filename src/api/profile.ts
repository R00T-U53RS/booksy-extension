import { apiClient } from '@/api/client';

export interface Profile {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProfileRequest {
  name: string;
  description?: string;
}

export const profileApi = {
  getAll: async (): Promise<Profile[]> => {
    const response = await apiClient.get<Profile[]>('/profile');
    return response.data;
  },

  create: async (data: CreateProfileRequest): Promise<Profile> => {
    const response = await apiClient.post<Profile>('/profile', data);
    return response.data;
  },
};
