
import { useCallback, useRef } from 'react';

// Debounce utility for performance optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for performance optimization
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Hook for debounced callbacks
export const useDebouncedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  return useCallback(
    debounce((...args: Parameters<T>) => callbackRef.current(...args), delay),
    [delay]
  );
};

// Performance monitoring utility
export class PerformanceMonitor {
  private static measurements: Map<string, number> = new Map();

  static startMeasurement(name: string) {
    this.measurements.set(name, performance.now());
  }

  static endMeasurement(name: string): number {
    const startTime = this.measurements.get(name);
    if (!startTime) {
      console.warn(`No measurement started for: ${name}`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.measurements.delete(name);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`);
    }
    
    return duration;
  }

  static measureAsync<T>(name: string, asyncFn: () => Promise<T>): Promise<T> {
    this.startMeasurement(name);
    return asyncFn().finally(() => {
      this.endMeasurement(name);
    });
  }
}

// Memory leak prevention utility
export const useCleanup = (cleanup: () => void) => {
  const cleanupRef = useRef(cleanup);
  cleanupRef.current = cleanup;

  return useCallback(() => {
    cleanupRef.current();
  }, []);
};
