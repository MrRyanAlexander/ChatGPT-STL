
import { memo } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProcessingStatusProps {
  message: string;
  isActive: boolean;
  className?: string;
}

const ProcessingStatus = memo(({ message, isActive, className }: ProcessingStatusProps) => {
  return (
    <div className={cn(
      "flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border",
      "animate-pulse",
      className
    )}>
      <Loader2 className={cn(
        "h-5 w-5 text-primary",
        isActive && "animate-spin"
      )} />
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">
          {message || "Processing your request..."}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <div className="h-1 w-1 rounded-full bg-primary animate-ping" />
          <div className="h-1 w-1 rounded-full bg-primary animate-ping delay-100" />
          <div className="h-1 w-1 rounded-full bg-primary animate-ping delay-200" />
          <span className="text-xs text-muted-foreground ml-2">
            Coordinating systems...
          </span>
        </div>
      </div>
    </div>
  );
});

ProcessingStatus.displayName = 'ProcessingStatus';

export default ProcessingStatus;
