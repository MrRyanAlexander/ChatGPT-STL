
import { memo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface MessageSkeletonProps {
  isUser?: boolean;
}

const MessageSkeleton = memo(({ isUser = false }: MessageSkeletonProps) => {
  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      <div className={`${isUser ? 'chat-bubble-user' : 'chat-bubble-ai'} p-4`}>
        <Skeleton className="h-4 w-64 mb-2" />
        <Skeleton className="h-4 w-48 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="h-3 w-16 mt-1" />
    </div>
  );
});

MessageSkeleton.displayName = 'MessageSkeleton';

export default MessageSkeleton;
