
import React, { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
  retryCount: number;
}

class ErrorBoundary extends Component<Props, State> {
  private maxRetries = 3;

  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      retryCount: 0 
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({
      errorInfo
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error details for debugging
    console.group('Error Boundary Details');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Component Stack:', errorInfo.componentStack);
    console.groupEnd();
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: undefined, 
      errorInfo: undefined,
      retryCount: this.state.retryCount + 1 
    });
  };

  handleGoHome = () => {
    this.setState({ 
      hasError: false, 
      error: undefined, 
      errorInfo: undefined,
      retryCount: 0 
    });
    
    // Navigate to home page
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isRepeatedError = this.state.retryCount >= this.maxRetries;

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center max-w-2xl mx-auto">
          <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            {isRepeatedError ? 'Persistent Error Detected' : 'Something went wrong'}
          </h2>
          <p className="text-muted-foreground mb-4">
            {isRepeatedError 
              ? 'The same error occurred multiple times. Please try going back to the home page.'
              : this.state.error?.message || 'An unexpected error occurred. Please try again.'
            }
          </p>
          
          {!isRepeatedError && (
            <p className="text-sm text-muted-foreground mb-6">
              Retry attempt: {this.state.retryCount + 1} of {this.maxRetries}
            </p>
          )}

          <div className="flex gap-3">
            {!isRepeatedError && (
              <Button onClick={this.handleReset} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            )}
            
            <Button 
              onClick={this.handleGoHome} 
              variant={isRepeatedError ? "default" : "outline"}
              className="gap-2"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </div>

          {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
            <details className="mt-6 text-left w-full">
              <summary className="text-sm font-medium cursor-pointer">
                Error Details (Development Only)
              </summary>
              <pre className="text-xs mt-2 p-3 bg-muted rounded overflow-auto max-h-32">
                {this.state.error?.stack}
              </pre>
              <pre className="text-xs mt-2 p-3 bg-muted rounded overflow-auto max-h-32">
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
