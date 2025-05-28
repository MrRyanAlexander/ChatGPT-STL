
export interface NavigationState {
  activeItem: string | null;
  activeChatId: string | null;
}

export interface NavigationHandlers {
  handleAgentClick: (slug: string) => void;
  handleNewChat: () => void;
  handleChatHistoryClick: (chatId: string) => void;
  handleNavigationClick: (path: string) => void;
}
