
import { useState, useEffect, useRef, useMemo } from 'react';
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
  inputRef: React.RefObject<HTMLInputElement>;
  chatKey: string;
  isLoading: boolean;
}

export const useChatState = (chatId?: string): ChatStateHook => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [promptCards, setPromptCards] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
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

  // Load chat data when component mounts or when key changes
  useEffect(() => {
    execute(async () => {
      setInputValue("");
      
      if (chatKey && chatKey.startsWith('new-')) {
        setMessages([]);
        setPromptCards(agentPrompts);
      } else {
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
      }
      
      return true;
    });
  }, [agentId, location.pathname, chatKey, getChatById, agentPrompts, execute]);

  // Save chat history when messages change - optimized with debouncing
  useEffect(() => {
    if (messages.length === 0) return;

    const timeoutId = setTimeout(() => {
      const title = ChatService.generateChatTitle(messages);
      const existingChat = getChatById(chatKey);
      
      if (!existingChat || existingChat.messages.length !== messages.length) {
        updateChat(chatKey, {
          id: chatKey,
          title: title,
          messages: messages,
          createdAt: existingChat?.createdAt || messages[0].timestamp,
          updatedAt: new Date(),
          agentId: agentId || null
        });
      }
    }, 500); // Debounce for 500ms

    return () => clearTimeout(timeoutId);
  }, [messages, chatKey, agentId, updateChat, getChatById]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [messages]);

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
    isLoading: isLoading || historyLoading
  };
};
