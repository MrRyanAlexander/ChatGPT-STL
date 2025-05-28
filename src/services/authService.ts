
import { supabase } from '@/lib/supabase';
import { AuthResponse, LoginCredentials, SignupCredentials } from '@/types/auth';
import { handleApiError } from '@/utils/errorUtils';

export class AuthService {
  static async signIn(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (error) {
        return {
          user: null,
          error: error.message,
          success: false
        };
      }

      return {
        user: data.user ? {
          id: data.user.id,
          email: data.user.email || '',
          username: data.user.email?.split('@')[0]
        } : null,
        error: null,
        success: true
      };
    } catch (error) {
      const appError = handleApiError(error);
      return {
        user: null,
        error: appError.message,
        success: false
      };
    }
  }

  static async signUp(credentials: SignupCredentials): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            username: credentials.username || credentials.email.split('@')[0]
          }
        }
      });

      if (error) {
        return {
          user: null,
          error: error.message,
          success: false
        };
      }

      return {
        user: data.user ? {
          id: data.user.id,
          email: data.user.email || '',
          username: credentials.username || data.user.email?.split('@')[0]
        } : null,
        error: null,
        success: true
      };
    } catch (error) {
      const appError = handleApiError(error);
      return {
        user: null,
        error: appError.message,
        success: false
      };
    }
  }

  static async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      return { error: error?.message || null };
    } catch (error) {
      const appError = handleApiError(error);
      return { error: appError.message };
    }
  }

  static async resetPassword(email: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      return { error: error?.message || null };
    } catch (error) {
      const appError = handleApiError(error);
      return { error: appError.message };
    }
  }

  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        return { user: null, error: error.message };
      }

      return { 
        user: user ? {
          id: user.id,
          email: user.email || '',
          username: user.email?.split('@')[0]
        } : null, 
        error: null 
      };
    } catch (error) {
      const appError = handleApiError(error);
      return { user: null, error: appError.message };
    }
  }
}
