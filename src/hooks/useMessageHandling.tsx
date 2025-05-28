
import { useCallback } from 'react';
import { Message } from '@/types/chat';
import { ChatService } from '@/services/chatService';
import { useAsyncState } from '@/hooks/useAsyncState';
import { useOptimisticUpdates } from '@/hooks/useOptimisticUpdates';
import { useErrorHandler } from '@/hooks/useErrorHandler';

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
    setFeedbackModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    agentId?: string
  ) => void;
  isProcessing: boolean;
}

export const useMessageHandling = (): MessageHandlingHook => {
  const { loading: isProcessing, execute } = useAsyncState();
  const { handleAsyncError } = useErrorHandler();

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
    
    const userMessage = ChatService.generateUserMessage(inputValue);
    setMessages([...messages, userMessage]);
    setInputValue("");
    
    setCurrentInteraction({
      question: typeof userMessage.content === 'string' ? userMessage.content : '',
      action: '',
      showFeedback: false
    });
    
    // Generate AI response with error handling
    execute(async () => {
      const aiResponse = await ChatService.generateAIResponse(
        agentId,
        typeof userMessage.content === 'string' ? userMessage.content : ''
      );
      setMessages((prev) => [...prev, aiResponse]);
      return aiResponse;
    });
    
    if (setPromptCards) {
      setPromptCards([]);
    }
  }, [isProcessing, execute]);

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

    const userMessage = ChatService.generateUserMessage(text);
    setMessages([userMessage]);
    setInputValue("");
    
    setCurrentInteraction({
      question: text,
      action: '',
      showFeedback: false
    });
    
    // Generate AI response with error handling
    execute(async () => {
      const aiResponse = await ChatService.generateAIResponse(agentId, text);
      setMessages((prev) => [...prev, aiResponse]);
      return aiResponse;
    });
    
    setPromptCards([]);
  }, [isProcessing, execute]);

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
    setFeedbackModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    agentId?: string
  ) => {
    if (!currentInteraction || isProcessing) return;
    
    setCurrentInteraction({
      ...currentInteraction,
      action
    });
    
    // Generate follow-up response with error handling
    handleAsyncError(async () => {
      const followUpResponse = await ChatService.generateFollowUpResponse(agentId, action);
      setMessages((prev) => [...prev, followUpResponse]);
      
      // Check if feedback should be shown - properly check the type
      const content = followUpResponse.content;
      if (typeof content === 'object' && content.showFeedback) {
        setTimeout(() => {
          setFeedbackModalOpen(true);
        }, 1000);
      }
    }, 'action click');
  }, [currentInteraction, isProcessing, handleAsyncError]);

  return {
    handleSubmit,
    handlePromptClick,
    handleActionClick,
    isProcessing
  };
};
