
export interface NavigationState {
  activeItem: string | null;
  activeChatId: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface NavigationHandlers {
  handleAgentClick: (slug: string) => void;
  handleNewChat: () => void;
  handleChatHistoryClick: (chatId: string) => void;
  handleNavigationClick: (path: string) => void;
  handleGoBack: () => void;
  handleGoForward: () => void;
}

export interface RouteParams {
  agentId?: string;
  chatId?: string;
  [key: string]: string | undefined;
}

export interface NavigationContext {
  state: NavigationState;
  handlers: NavigationHandlers;
  currentRoute: string;
  routeParams: RouteParams;
}

export type NavigationMode = 'push' | 'replace' | 'back' | 'forward';
