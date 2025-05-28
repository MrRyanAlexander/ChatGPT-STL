
export interface ApiResponse<T = any> {
  data: T | null;
  error: string | null;
  success: boolean;
  status: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
  details?: Record<string, any>;
}

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
}

export interface SupabaseError {
  message: string;
  details: string;
  hint: string;
  code: string;
}
