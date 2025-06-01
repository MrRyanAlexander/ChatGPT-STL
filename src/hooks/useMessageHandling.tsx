
import { useCallback, useMemo } from 'react';
import { Message } from '@/types/chat';
import { ChatService } from '@/services/chatService';
import { useAsyncState } from '@/hooks/useAsyncState';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { PerformanceMonitor } from '@/utils/performanceUtils';

interface MessageHandlingHook {
  handleSubmit: (
    inputValue: string,
    messages: Message[],
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    setPromptCards: React.Dispatch<React.SetStateAction<string[]>>,
    setCurrentInteraction: React.Dispatch<React.SetStateAction<{
      question: string;
      action: string;
      showFeedback: boolean;
    } | null>>,
    agentId?: string
  ) => void;
  handlePromptClick: (
    text: string,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    setPromptCards: React.Dispatch<React.SetStateAction<string[]>>,
    setCurrentInteraction: React.Dispatch<React.SetStateAction<{
      question: string;
      action: string;
      showFeedback: boolean;
    } | null>>,
    agentId?: string
  ) => void;
  handleActionClick: (
    action: string,
    currentInteraction: {
      question: string;
      action: string;
      showFeedback: boolean;
    } | null,
    setCurrentInteraction: React.Dispatch<React.SetStateAction<{
      question: string;
      action: string;
      showFeedback: boolean;
    } | null>>,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setShowInlineFeedback: React.Dispatch<React.SetStateAction<boolean>>,
    agentId?: string
  ) => void;
  isProcessing: boolean;
}

export const useMessageHandling = (): MessageHandlingHook => {
  const { loading: isProcessing, execute } = useAsyncState();
  const { handleAsyncError } = useErrorHandler();

  // Memoized function to create user message
  const createUserMessage = useMemo(() => 
    (content: string) => ChatService.generateUserMessage(content),
    []
  );

  // Memoized function to create interaction state
  const createInteractionState = useMemo(() => 
    (question: string) => ({
      question,
      action: '',
      showFeedback: false
    }),
    []
  );

  const handleSubmit = useCallback((
    inputValue: string,
    messages: Message[],
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    setPromptCards: React.Dispatch<React.SetStateAction<string[]>>,
    setCurrentInteraction: React.Dispatch<React.SetStateAction<{
      question: string;
      action: string;
      showFeedback: boolean;
    } | null>>,
    agentId?: string
  ) => {
    if (!inputValue.trim() || isProcessing) return;
    
    const userMessage = createUserMessage(inputValue);
    const userContent = typeof userMessage.content === 'string' ? userMessage.content : '';
    
    // Optimistic update
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setPromptCards([]);
    
    setCurrentInteraction(createInteractionState(userContent));
    
    // Generate AI response with performance monitoring
    execute(async () => {
      return PerformanceMonitor.measureAsync('ai-response-generation', async () => {
        // Add realistic delay for department coordination
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const aiResponse = await ChatService.generateAIResponse(agentId, userContent);
        setMessages(prev => [...prev, aiResponse]);
        return aiResponse;
      });
    });
  }, [isProcessing, execute, createUserMessage, createInteractionState]);

  const handlePromptClick = useCallback((
    text: string,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    setPromptCards: React.Dispatch<React.SetStateAction<string[]>>,
    setCurrentInteraction: React.Dispatch<React.SetStateAction<{
      question: string;
      action: string;
      showFeedback: boolean;
    } | null>>,
    agentId?: string
  ) => {
    if (isProcessing) return;

    const userMessage = createUserMessage(text);
    
    // Optimistic update
    setMessages([userMessage]);
    setInputValue("");
    setPromptCards([]);
    
    setCurrentInteraction(createInteractionState(text));
    
    // Generate AI response with performance monitoring
    execute(async () => {
      return PerformanceMonitor.measureAsync('ai-prompt-response', async () => {
        // Add realistic delay for department coordination
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const aiResponse = await ChatService.generateAIResponse(agentId, text);
        setMessages(prev => [...prev, aiResponse]);
        return aiResponse;
      });
    });
  }, [isProcessing, execute, createUserMessage, createInteractionState]);

  const handleActionClick = useCallback((
    action: string,
    currentInteraction: {
      question: string;
      action: string;
      showFeedback: boolean;
    } | null,
    setCurrentInteraction: React.Dispatch<React.SetStateAction<{
      question: string;
      action: string;
      showFeedback: boolean;
    } | null>>,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setShowInlineFeedback: React.Dispatch<React.SetStateAction<boolean>>,
    agentId?: string
  ) => {
    if (!currentInteraction || isProcessing) return;
    
    // Update interaction with action
    setCurrentInteraction({
      ...currentInteraction,
      action,
      showFeedback: false
    });
    
    // Generate follow-up response with error handling and performance monitoring
    handleAsyncError(async () => {
      return PerformanceMonitor.measureAsync('followup-response', async () => {
        // Add realistic delay for processing
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        const followUpResponse = await ChatService.generateFollowUpResponse(agentId, action);
        setMessages(prev => [...prev, followUpResponse]);
        
        // Instead of automatic feedback modal, enable inline feedback button
        const content = followUpResponse.content;
        if (typeof content === 'object' && content.showFeedback) {
          setCurrentInteraction(prev => prev ? {
            ...prev,
            action,
            showFeedback: true
          } : null);
          
          // Show inline feedback button instead of modal
          setShowInlineFeedback(true);
        }
      });
    }, 'action click');
  }, [isProcessing, handleAsyncError]);

  return {
    handleSubmit,
    handlePromptClick,
    handleActionClick,
    isProcessing
  };
};
