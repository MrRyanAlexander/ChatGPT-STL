
import { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Message } from '@/types/chat';
import { ChatService } from '@/services/chatService';
import { AgentService } from '@/services/agentService';
import { NavigationService } from '@/services/navigationService';
import { useChatHistory } from '@/hooks/useChatHistory';

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
}

export const useChatState = (chatId?: string): ChatStateHook => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [promptCards, setPromptCards] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const location = useLocation();
  const { agentId } = useParams<{ agentId: string }>();
  const { updateChat, getChatById } = useChatHistory();
  
  const chatKey = NavigationService.getChatKeyFromLocation(location.pathname, chatId);

  // Load chat data when component mounts or when key changes
  useEffect(() => {
    const loadChatData = () => {
      setInputValue("");
      
      if (chatKey && chatKey.startsWith('new-')) {
        setMessages([]);
        setPromptCards(AgentService.getAgentPrompts(agentId) || AgentService.getDefaultPrompts());
      } else {
        const chatData = getChatById(chatKey);
        
        if (chatData?.messages) {
          setMessages(chatData.messages);
          if (chatData.messages.length > 0) {
            setPromptCards([]);
          } else {
            setPromptCards(AgentService.getAgentPrompts(agentId) || AgentService.getDefaultPrompts());
          }
        } else {
          setMessages([]);
          setPromptCards(AgentService.getAgentPrompts(agentId) || AgentService.getDefaultPrompts());
        }
      }
    };
    
    loadChatData();
  }, [agentId, location.pathname, chatKey, getChatById]);

  // Save chat history when messages change
  useEffect(() => {
    if (messages.length > 0) {
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
    }
  }, [messages, chatKey, agentId, updateChat, getChatById]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
    chatKey
  };
};
