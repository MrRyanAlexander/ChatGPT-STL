
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavigationService } from '@/services/navigationService';
import { ChatService } from '@/services/chatService';
import { AgentService } from '@/services/agentService';
import { NavigationState, NavigationHandlers } from '@/types/navigation';

export const useNavigation = (): NavigationState & NavigationHandlers => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update navigation state based on current URL
  useEffect(() => {
    const navigationState = NavigationService.parseLocationToState(location.pathname);
    setActiveItem(navigationState.activeItem);
    setActiveChatId(navigationState.activeChatId);
  }, [location.pathname]);

  const handleAgentClick = (slug: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      setActiveItem(slug);
      setActiveChatId(null);
      
      const path = NavigationService.generateChatPath(slug);
      navigate(path, { 
        state: { 
          defaultPrompt: AgentService.getAgentPrompts(slug)[0] || "" 
        } 
      });
    } catch (err) {
      setError('Failed to navigate to agent');
      console.error('Navigation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setIsLoading(true);
    setError(null);
    
    try {
      setActiveItem(null);
      setActiveChatId(null);
      
      const newChatId = ChatService.generateChatId();
      navigate("/", { 
        replace: true, 
        state: { 
          newChat: true,
          chatId: newChatId 
        } 
      });
    } catch (err) {
      setError('Failed to create new chat');
      console.error('New chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatHistoryClick = (chatId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      setActiveItem(null);
      setActiveChatId(chatId);
      
      const path = NavigationService.generateChatHistoryPath(chatId);
      navigate(path);
    } catch (err) {
      setError('Failed to navigate to chat history');
      console.error('Chat history navigation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigationClick = (path: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      navigate(path);
    } catch (err) {
      setError('Failed to navigate');
      console.error('Navigation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    setIsLoading(true);
    setError(null);
    
    try {
      navigate(-1);
    } catch (err) {
      setError('Failed to go back');
      console.error('Go back error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoForward = () => {
    setIsLoading(true);
    setError(null);
    
    try {
      navigate(1);
    } catch (err) {
      setError('Failed to go forward');
      console.error('Go forward error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    activeItem,
    activeChatId,
    isLoading,
    error,
    handleAgentClick,
    handleNewChat,
    handleChatHistoryClick,
    handleNavigationClick,
    handleGoBack,
    handleGoForward
  };
};
