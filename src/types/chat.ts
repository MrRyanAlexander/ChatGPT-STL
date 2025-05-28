
export type ActionOption = {
  text: string;
  action: string;
};

export type MessageContent = {
  text: string;
  options?: ActionOption[];
  showFeedback?: boolean;
};

export type Message = {
  role: 'user' | 'assistant';
  content: string | MessageContent;
  timestamp: Date;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  agentId: string | null;
};

export type FeedbackData = {
  interactionId: string;
  userResponse: string;
  feedback: {
    helpful: boolean;
    comment: string | null;
  };
};
