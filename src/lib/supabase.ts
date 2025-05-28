
import { createClient } from '@supabase/supabase-js';
import { ApiResponse, SupabaseError } from '@/types/api';
import { User, AuthResponse } from '@/types/auth';

const supabaseUrl = "https://eperxgscydavxauiryju.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZXJ4Z3NjeWRhdnhhdWlyeWp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwNDM0NjksImV4cCI6MjA2MTYxOTQ2OX0.F6RDaLEmHrYCm0TH6fBnTx_trbaInK1MfYaCVf62Vqw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = User;

const handleSupabaseError = (error: any): SupabaseError => {
  return {
    message: error.message || 'An error occurred',
    details: error.details || '',
    hint: error.hint || '',
    code: error.code || 'UNKNOWN_ERROR'
  };
};

export async function getProfile(): Promise<ApiResponse<Profile>> {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      return {
        data: null,
        error: handleSupabaseError(userError).message,
        success: false,
        status: 401
      };
    }
    
    if (!user) {
      return {
        data: null,
        error: 'No authenticated user found',
        success: false,
        status: 401
      };
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    if (error) {
      return {
        data: null,
        error: handleSupabaseError(error).message,
        success: false,
        status: 400
      };
    }
      
    const profile: Profile = {
      id: user.id,
      email: user.email || '',
      avatar_url: data?.avatar_url,
      username: data?.username || user.email?.split('@')[0],
    };

    return {
      data: profile,
      error: null,
      success: true,
      status: 200
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return {
      data: null,
      error: 'Failed to fetch profile',
      success: false,
      status: 500
    };
  }
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return {
        user: null,
        error: handleSupabaseError(error).message,
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
    return {
      user: null,
      error: 'Authentication failed',
      success: false
    };
  }
}

export async function signUp(email: string, password: string, username?: string): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username || email.split('@')[0]
        }
      }
    });

    if (error) {
      return {
        user: null,
        error: handleSupabaseError(error).message,
        success: false
      };
    }

    return {
      user: data.user ? {
        id: data.user.id,
        email: data.user.email || '',
        username: username || data.user.email?.split('@')[0]
      } : null,
      error: null,
      success: true
    };
  } catch (error) {
    return {
      user: null,
      error: 'Registration failed',
      success: false
    };
  }
}

export async function signOut(): Promise<ApiResponse<null>> {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return {
        data: null,
        error: handleSupabaseError(error).message,
        success: false,
        status: 400
      };
    }

    return {
      data: null,
      error: null,
      success: true,
      status: 200
    };
  } catch (error) {
    return {
      data: null,
      error: 'Sign out failed',
      success: false,
      status: 500
    };
  }
}
