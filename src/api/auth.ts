import { apiClient } from '@/api/client';
import type {
  LoginFormData,
  RegisterFormData,
  AuthResponse,
  User,
  RegisterFormResponse,
} from '@/components/types/login';

export const authApi = {
  register: async (data: RegisterFormData): Promise<RegisterFormResponse> => {
    const response = await apiClient.post<RegisterFormResponse>(
      '/auth/register',
      data
    );
    return response.data;
  },

  login: async (data: LoginFormData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  me: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },
};
