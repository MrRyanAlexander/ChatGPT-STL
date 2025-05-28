
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

  // Update navigation state based on current URL
  useEffect(() => {
    const navigationState = NavigationService.parseLocationToState(location.pathname);
    setActiveItem(navigationState.activeItem);
    setActiveChatId(navigationState.activeChatId);
  }, [location.pathname]);

  const handleAgentClick = (slug: string) => {
    setActiveItem(slug);
    setActiveChatId(null);
    
    const path = NavigationService.generateChatPath(slug);
    navigate(path, { 
      state: { 
        defaultPrompt: AgentService.getAgentPrompts(slug)[0] || "" 
      } 
    });
  };

  const handleNewChat = () => {
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
  };

  const handleChatHistoryClick = (chatId: string) => {
    setActiveItem(null);
    setActiveChatId(chatId);
    
    const path = NavigationService.generateChatHistoryPath(chatId);
    navigate(path);
  };

  const handleNavigationClick = (path: string) => {
    navigate(path);
  };

  return {
    activeItem,
    activeChatId,
    handleAgentClick,
    handleNewChat,
    handleChatHistoryClick,
    handleNavigationClick
  };
};
