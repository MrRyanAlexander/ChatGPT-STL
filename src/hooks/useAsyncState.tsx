
import { useState, useCallback } from 'react';
import { handleApiError, AppError } from '@/utils/errorUtils';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: AppError | null;
}

interface AsyncStateActions<T> {
  execute: (asyncFn: () => Promise<T>) => Promise<T | null>;
  reset: () => void;
  setData: (data: T) => void;
  setError: (error: AppError | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAsyncState = <T,>(
  initialData: T | null = null
): AsyncState<T> & AsyncStateActions<T> => {
  const [state, setState] = useState<AsyncState<T>>({
    data: initialData,
    loading: false,
    error: null
  });

  const execute = useCallback(async (asyncFn: () => Promise<T>): Promise<T | null> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await asyncFn();
      setState(prev => ({ ...prev, data: result, loading: false }));
      return result;
    } catch (error) {
      const appError = handleApiError(error);
      setState(prev => ({ ...prev, error: appError, loading: false }));
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: initialData, loading: false, error: null });
  }, [initialData]);

  const setData = useCallback((data: T) => {
    setState(prev => ({ ...prev, data }));
  }, []);

  const setError = useCallback((error: AppError | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  return {
    ...state,
    execute,
    reset,
    setData,
    setError,
    setLoading
  };
};
