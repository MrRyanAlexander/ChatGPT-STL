
import { ApiError, SupabaseError } from '@/types/api';

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleApiError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }
  
  if (error instanceof Error) {
    return new AppError(error.message, 'UNKNOWN_ERROR', 500);
  }

  if (typeof error === 'object' && error !== null) {
    const apiError = error as Partial<ApiError>;
    return new AppError(
      apiError.message || 'An unexpected error occurred',
      apiError.code || 'UNKNOWN_ERROR',
      apiError.statusCode || 500,
      apiError.details
    );
  }
  
  return new AppError('An unexpected error occurred', 'UNKNOWN_ERROR', 500);
};

export const handleSupabaseError = (error: any): AppError => {
  const supabaseError = error as SupabaseError;
  return new AppError(
    supabaseError.message || 'Database operation failed',
    supabaseError.code || 'SUPABASE_ERROR',
    400,
    {
      details: supabaseError.details,
      hint: supabaseError.hint
    }
  );
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AppError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null) {
    const apiError = error as Partial<ApiError>;
    return apiError.message || 'An unexpected error occurred';
  }
  
  return 'An unexpected error occurred';
};

export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof Error) {
    return error.message.includes('fetch') || 
           error.message.includes('network') ||
           error.message.includes('timeout') ||
           error.message.includes('connection');
  }
  
  if (typeof error === 'object' && error !== null) {
    const apiError = error as Partial<ApiError>;
    return apiError.code === 'NETWORK_ERROR' || 
           apiError.statusCode === 0 ||
           (apiError.statusCode || 0) >= 500;
  }
  
  return false;
};

export const isValidationError = (error: unknown): boolean => {
  if (error instanceof AppError) {
    return error.code === 'VALIDATION_ERROR' || error.statusCode === 400;
  }
  
  return false;
};

export const isAuthenticationError = (error: unknown): boolean => {
  if (error instanceof AppError) {
    return error.code === 'AUTH_ERROR' || error.statusCode === 401;
  }
  
  return false;
};

export const createValidationError = (message: string, field?: string): AppError => {
  return new AppError(message, 'VALIDATION_ERROR', 400, { field });
};

export const createNetworkError = (message: string = 'Network connection failed'): AppError => {
  return new AppError(message, 'NETWORK_ERROR', 0);
};

export const createAuthError = (message: string = 'Authentication required'): AppError => {
  return new AppError(message, 'AUTH_ERROR', 401);
};
