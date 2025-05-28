
import { useState, useCallback, useRef } from 'react';
import { Message } from '@/types/chat';

interface OptimisticUpdate {
  id: string;
  type: 'add' | 'update' | 'delete';
  data: any;
  rollback: () => void;
}

export const useOptimisticUpdates = (
  initialMessages: Message[],
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  const [optimisticUpdates, setOptimisticUpdates] = useState<OptimisticUpdate[]>([]);
  const rollbackTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const addOptimisticMessage = useCallback((message: Message) => {
    const updateId = `optimistic-${Date.now()}`;
    
    // Add message optimistically
    setMessages(prev => [...prev, message]);
    
    // Create rollback function
    const rollback = () => {
      setMessages(prev => prev.filter(m => m !== message));
      setOptimisticUpdates(prev => prev.filter(u => u.id !== updateId));
    };

    // Track the optimistic update
    const update: OptimisticUpdate = {
      id: updateId,
      type: 'add',
      data: message,
      rollback
    };

    setOptimisticUpdates(prev => [...prev, update]);

    // Auto-rollback after 30 seconds if not confirmed
    const timeout = setTimeout(() => {
      rollback();
    }, 30000);

    rollbackTimeouts.current.set(updateId, timeout);

    return updateId;
  }, [setMessages]);

  const confirmOptimisticUpdate = useCallback((updateId: string, confirmedMessage?: Message) => {
    const timeout = rollbackTimeouts.current.get(updateId);
    if (timeout) {
      clearTimeout(timeout);
      rollbackTimeouts.current.delete(updateId);
    }

    setOptimisticUpdates(prev => prev.filter(u => u.id !== updateId));

    if (confirmedMessage) {
      setMessages(prev => prev.map(msg => {
        // Find the optimistic message and replace it with confirmed one
        const update = optimisticUpdates.find(u => u.id === updateId);
        if (update && msg === update.data) {
          return confirmedMessage;
        }
        return msg;
      }));
    }
  }, [optimisticUpdates, setMessages]);

  const rollbackOptimisticUpdate = useCallback((updateId: string) => {
    const update = optimisticUpdates.find(u => u.id === updateId);
    if (update) {
      update.rollback();
    }
  }, [optimisticUpdates]);

  return {
    optimisticUpdates,
    addOptimisticMessage,
    confirmOptimisticUpdate,
    rollbackOptimisticUpdate
  };
};
