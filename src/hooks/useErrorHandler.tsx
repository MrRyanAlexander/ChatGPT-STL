
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { handleApiError, getErrorMessage, isNetworkError } from '@/utils/errorUtils';

export const useErrorHandler = () => {
  const { toast } = useToast();

  const handleError = useCallback((error: unknown, context?: string) => {
    const appError = handleApiError(error);
    const message = getErrorMessage(error);
    
    console.error(`Error${context ? ` in ${context}` : ''}:`, error);

    // Show appropriate toast based on error type
    if (isNetworkError(error)) {
      toast({
        title: "Connection Error",
        description: "Please check your internet connection and try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      });
    }

    return appError;
  }, [toast]);

  const handleAsyncError = useCallback(async <T,>(
    asyncFn: () => Promise<T>,
    context?: string
  ): Promise<T | null> => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error, context);
      return null;
    }
  }, [handleError]);

  return {
    handleError,
    handleAsyncError
  };
};
