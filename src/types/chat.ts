
export type ActionOption = {
  text: string;
  action: string;
  data?: Record<string, any>;
};

export type MessageContent = {
  text: string;
  options?: ActionOption[];
  showFeedback?: boolean;
  metadata?: Record<string, any>;
};

export type MessageRole = 'user' | 'assistant' | 'system';

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'failed';

export type Message = {
  id?: string;
  role: MessageRole;
  content: string | MessageContent;
  timestamp: Date;
  status?: MessageStatus;
  metadata?: Record<string, any>;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  agentId: string | null;
  status?: 'active' | 'archived' | 'deleted';
  metadata?: Record<string, any>;
};

export type FeedbackType = 'helpful' | 'not_helpful' | 'report';

export type FeedbackData = {
  interactionId: string;
  userResponse: string;
  feedback: {
    type: FeedbackType;
    helpful: boolean;
    comment: string | null;
    timestamp: Date;
  };
};

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  currentChat: Chat | null;
}

export interface ChatFilters {
  agentId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  status?: Chat['status'];
  searchTerm?: string;
}
