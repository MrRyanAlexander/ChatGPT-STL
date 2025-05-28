
// Re-export all types for easier imports
export * from './agent';
export * from './navigation';
export * from './chat';
export * from './auth';
export * from './api';

// Common utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// Status types used across the application
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
export type AsyncStatus = 'pending' | 'fulfilled' | 'rejected';

// Generic data fetching types
export interface DataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastUpdated?: Date;
}

// Event handler types
export type EventHandler<T = void> = (data: T) => void;
export type AsyncEventHandler<T = void> = (data: T) => Promise<void>;

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

export interface ComponentWithLoading extends BaseComponentProps {
  isLoading?: boolean;
  loadingComponent?: React.ReactNode;
}

export interface ComponentWithError extends BaseComponentProps {
  error?: string | null;
  errorComponent?: React.ReactNode;
  onRetry?: () => void;
}
