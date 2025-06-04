import { useState, useEffect, useCallback } from 'react';
import { Chat, Message } from '@/types/chat';
import { useAsyncState } from '@/hooks/useAsyncState';
import { useErrorHandler } from '@/hooks/useErrorHandler';

// Global chat history storage
const CHAT_HISTORY_KEY = 'stl-chat-history';
let globalChatHistories: Record<string, Chat> = {};

// Try to load from localStorage on initial load
const loadChatHistoryFromStorage = (): Record<string, Chat> => {
  try {
    const savedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      
      // Convert string dates back to Date objects
      Object.keys(parsedHistory).forEach(key => {
        if (parsedHistory[key]?.messages) {
          parsedHistory[key].messages = parsedHistory[key].messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
        }
        if (parsedHistory[key]?.createdAt) {
          parsedHistory[key].createdAt = new Date(parsedHistory[key].createdAt);
        }
        if (parsedHistory[key]?.updatedAt) {
          parsedHistory[key].updatedAt = new Date(parsedHistory[key].updatedAt);
        }
      });
      
      return parsedHistory;
    }
  } catch (error) {
    console.error('Failed to load chat history from localStorage:', error);
  }
  return {};
};

// Initialize chat histories
globalChatHistories = loadChatHistoryFromStorage();

// Initialize with sample data if empty
if (Object.keys(globalChatHistories).length === 0) {
  const sampleChats: Record<string, Chat> = {
    'super-agent-sample': {
      id: 'super-agent-sample',
      title: 'Super Agent Introduction',
      messages: [
        {
          role: 'assistant',
          content: { text: 'Hello! I\'m the St. Louis Super Agent. Ask me about any city service and I\'ll coordinate across departments.' },
          timestamp: new Date(Date.now() - 60000)
        },
        {
          role: 'user',
          content: 'What can you help with?',
          timestamp: new Date(Date.now() - 50000)
        },
        {
          role: 'assistant',
          content: { text: 'I can assist with water billing issues, property records, business licenses and more.' },
          timestamp: new Date(Date.now() - 40000)
        }
      ],
      createdAt: new Date(Date.now() - 60000),
      updatedAt: new Date(Date.now() - 40000),
      agentId: 'super-agent'
    }
  };
  
  globalChatHistories = sampleChats;
}

export const useChatHistory = () => {
  const [chatHistories, setChatHistories] = useState<Record<string, Chat>>(globalChatHistories);
  const { loading, execute } = useAsyncState();
  const { handleError } = useErrorHandler();
  
  // Save to localStorage with error handling
  const saveToStorage = useCallback(async (histories: Record<string, Chat>) => {
    return execute(async () => {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(histories));
      globalChatHistories = histories;
      return true;
    });
  }, [execute]);
  
  // Save to localStorage whenever chat histories change
  useEffect(() => {
    if (Object.keys(chatHistories).length > 0) {
      saveToStorage(chatHistories).catch(error => {
        handleError(error, 'saving chat history');
      });
    }
  }, [chatHistories, saveToStorage, handleError]);
  
  // Add new chat with optimistic updates
  const addChat = useCallback(async (chat: Chat) => {
    // Optimistic update
    setChatHistories(prev => ({
      ...prev,
      [chat.id]: chat
    }));
    
    // Persist to storage
    await saveToStorage({
      ...chatHistories,
      [chat.id]: chat
    });
  }, [chatHistories, saveToStorage]);
  
  // Update existing chat with optimistic updates
  const updateChat = useCallback(async (chatId: string, updatedChat: Chat) => {
    // Optimistic update
    setChatHistories(prev => ({
      ...prev,
      [chatId]: updatedChat
    }));
    
    // Persist to storage
    await saveToStorage({
      ...chatHistories,
      [chatId]: updatedChat
    });
  }, [chatHistories, saveToStorage]);
  
  // Get chat by ID with error handling
  const getChatById = useCallback((chatId: string) => {
    try {
      return chatHistories[chatId];
    } catch (error) {
      handleError(error, 'getting chat by ID');
      return undefined;
    }
  }, [chatHistories, handleError]);
  
  // Get all chats with sorting and error handling
  const getAllChats = useCallback(() => {
    try {
      return Object.values(chatHistories).sort((a, b) => 
        b.updatedAt.getTime() - a.updatedAt.getTime()
      );
    } catch (error) {
      handleError(error, 'getting all chats');
      return [];
    }
  }, [chatHistories, handleError]);
  
  // Delete chat with optimistic updates
  const deleteChat = useCallback(async (chatId: string) => {
    // Optimistic update
    setChatHistories(prev => {
      const newHistories = { ...prev };
      delete newHistories[chatId];
      return newHistories;
    });
    
    // Persist to storage
    const newHistories = { ...chatHistories };
    delete newHistories[chatId];
    await saveToStorage(newHistories);
  }, [chatHistories, saveToStorage]);
  
  // Clear all chats
  const clearAllChats = useCallback(async () => {
    setChatHistories({});
    await saveToStorage({});
  }, [saveToStorage]);
  
  return {
    chatHistories,
    loading,
    addChat,
    updateChat,
    getChatById,
    getAllChats,
    deleteChat,
    clearAllChats
  };
};
