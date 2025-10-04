export interface LoginFormData {
  username: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

export interface RegisterFormResponse {
  message: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface BackendErrorResponse {
  message: string;
  error?: string;
  statusCode?: number;
}

export interface AuthError {
  message: string;
  errors?: Record<string, string[]>;
}
