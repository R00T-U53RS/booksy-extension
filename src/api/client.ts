import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { BackendErrorResponse } from '@/components/types/login';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002';
const TOKEN_KEY = 'booksy_access_token';

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError<BackendErrorResponse>) => {
    if (error.response?.status === 401) {
      removeToken();
    }

    return Promise.reject(error.response?.data || error);
  }
);
