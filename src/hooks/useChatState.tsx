
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Message } from '@/types/chat';
import { ChatService } from '@/services/chatService';
import { AgentService } from '@/services/agentService';
import { NavigationService } from '@/services/navigationService';
import { useChatHistory } from '@/hooks/useChatHistory';
import { useAsyncState } from '@/hooks/useAsyncState';

interface ChatStateHook {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  promptCards: string[];
  setPromptCards: React.Dispatch<React.SetStateAction<string[]>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  chatKey: string;
  isLoading: boolean;
  showClearButton: boolean;
  clearMessages: () => void;
}

export const useChatState = (chatId?: string): ChatStateHook => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [promptCards, setPromptCards] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showClearButton, setShowClearButton] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const location = useLocation();
  const { agentId } = useParams<{ agentId: string }>();
  const { updateChat, getChatById, loading: historyLoading } = useChatHistory();
  const { loading: isLoading, execute } = useAsyncState();
  
  const chatKey = useMemo(() => 
    NavigationService.getChatKeyFromLocation(location.pathname, chatId),
    [location.pathname, chatId]
  );

  // Memoize agent prompts to avoid unnecessary recalculations
  const agentPrompts = useMemo(() => 
    AgentService.getAgentPrompts(agentId) || AgentService.getDefaultPrompts(),
    [agentId]
  );

  // Clear messages function
  const clearMessages = useCallback(() => {
    setMessages([]);
    setInputValue("");
    setPromptCards(agentPrompts);
    setShowClearButton(false);
  }, [agentPrompts]);

  // Show clear button when messages exist
  useEffect(() => {
    setShowClearButton(messages.length > 0);
  }, [messages]);

  // Debounced update chat function
  const debouncedUpdateChat = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (key: string, messages: Message[], agentId?: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const title = ChatService.generateChatTitle(messages);
          const existingChat = getChatById(key);
          
          if (!existingChat || existingChat.messages.length !== messages.length) {
            updateChat(key, {
              id: key,
              title: title,
              messages: messages,
              createdAt: existingChat?.createdAt || messages[0].timestamp,
              updatedAt: new Date(),
              agentId: agentId || null
            });
          }
        }, 500);
      };
    })(),
    [updateChat, getChatById]
  );

  // Load chat data when component mounts or when key changes
  useEffect(() => {
    execute(async () => {
      setInputValue("");
      
      // Check if this is a history route
      const isHistoryRoute = location.pathname.includes('/history/');
      
      if (isHistoryRoute) {
        // Only load from history if it's a history route
        const chatData = getChatById(chatKey);
        
        if (chatData?.messages) {
          setMessages(chatData.messages);
          if (chatData.messages.length > 0) {
            setPromptCards([]);
          } else {
            setPromptCards(agentPrompts);
          }
        } else {
          setMessages([]);
          setPromptCards(agentPrompts);
        }
      } else {
        // For regular agent chats, always start fresh - no loading from history
        setMessages([]);
        setPromptCards(agentPrompts);
      }
      
      return true;
    });
  }, [agentId, location.pathname, chatKey, getChatById, agentPrompts, execute]);

  // Save chat history when messages change - only for non-history routes
  useEffect(() => {
    if (messages.length === 0 || location.pathname.includes('/history/')) return;
    debouncedUpdateChat(chatKey, messages, agentId);
  }, [messages, chatKey, agentId, debouncedUpdateChat, location.pathname]);

  return {
    messages,
    setMessages,
    promptCards,
    setPromptCards,
    inputValue,
    setInputValue,
    messagesEndRef,
    inputRef,
    chatKey,
    isLoading: isLoading || historyLoading,
    showClearButton,
    clearMessages
  };
};
