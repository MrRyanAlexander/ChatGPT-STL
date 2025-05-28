
import { NavigationState } from "@/types/navigation";

export class NavigationService {
  static parseLocationToState(pathname: string): NavigationState {
    const pathParts = pathname.split('/');
    
    if (pathParts[1] === 'chat' && pathParts[2] !== 'history') {
      return {
        activeItem: pathParts[2],
        activeChatId: null
      };
    } 
    
    if (pathParts[1] === 'chat' && pathParts[2] === 'history' && pathParts[3]) {
      return {
        activeItem: null,
        activeChatId: pathParts[3]
      };
    }
    
    return {
      activeItem: null,
      activeChatId: null
    };
  }

  static generateChatPath(agentId: string): string {
    return `/chat/${agentId}`;
  }

  static generateChatHistoryPath(chatId: string): string {
    return `/chat/history/${chatId}`;
  }

  static getChatKeyFromLocation(pathname: string, chatId?: string): string {
    if (chatId) return chatId;
    
    if (pathname.startsWith('/chat/history/')) {
      return pathname.split('/').pop() || 'home';
    }
    
    const pathParts = pathname.split('/');
    return pathParts[2] || 'home';
  }
}
