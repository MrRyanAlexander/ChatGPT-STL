
import { Message } from '@/types/chat';
import { ChatService } from '@/services/chatService';
import { getInteractiveResponse, getFollowUpResponse } from '@/utils/responseUtils';

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
}

export const useMessageHandling = (): MessageHandlingHook => {
  const handleSubmit = (
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
    if (!inputValue.trim()) return;
    
    const userMessage = ChatService.generateUserMessage(inputValue);
    setMessages([...messages, userMessage]);
    setInputValue("");
    
    setCurrentInteraction({
      question: typeof userMessage.content === 'string' ? userMessage.content : '',
      action: '',
      showFeedback: false
    });
    
    // Simulate AI response
    setTimeout(async () => {
      const aiResponse = await ChatService.generateAIResponse(
        agentId,
        typeof userMessage.content === 'string' ? userMessage.content : ''
      );
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
    
    if (setPromptCards) {
      setPromptCards([]);
    }
  };

  const handlePromptClick = (
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
    const userMessage = ChatService.generateUserMessage(text);
    setMessages([userMessage]);
    setInputValue("");
    
    setCurrentInteraction({
      question: text,
      action: '',
      showFeedback: false
    });
    
    // Simulate AI response
    setTimeout(async () => {
      const aiResponse = await ChatService.generateAIResponse(agentId, text);
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
    
    setPromptCards([]);
  };

  const handleActionClick = (
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
    if (!currentInteraction) return;
    
    setCurrentInteraction({
      ...currentInteraction,
      action
    });
    
    // Generate follow-up response
    setTimeout(async () => {
      const followUpResponse = await ChatService.generateFollowUpResponse(agentId, action);
      setMessages((prev) => [...prev, followUpResponse]);
      
      // Check if feedback should be shown - properly check the type
      const content = followUpResponse.content;
      if (typeof content === 'object' && content.showFeedback) {
        setTimeout(() => {
          setFeedbackModalOpen(true);
        }, 1000);
      }
    }, 500);
  };

  return {
    handleSubmit,
    handlePromptClick,
    handleActionClick
  };
};
