
export interface User {
  id: string;
  email: string;
  username?: string;
  avatar_url?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Profile extends User {}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  username?: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User | null;
  error: string | null;
  success: boolean;
}

export interface SessionData {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: User;
}
