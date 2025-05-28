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
    'chat-1': {
      id: 'chat-1',
      title: 'Water bill payments',
      messages: [
        {
          role: 'user',
          content: 'How do I pay my water bill in St. Louis?',
          timestamp: new Date(Date.now() - 1000000)
        },
        {
          role: 'assistant',
          content: {
            text: "I've pulled up your latest bill: $64.22 due for your service at 1234 Example Ave.\n\nWould you like to:",
            options: [
              { text: "💳 Pay now", action: "pay_now" },
              { text: "🔁 Set up autopay", action: "setup_autopay" },
              { text: "🕒 Schedule a reminder", action: "schedule_reminder" },
              { text: "📜 View full billing history", action: "view_history" }
            ]
          },
          timestamp: new Date(Date.now() - 990000)
        }
      ],
      createdAt: new Date(Date.now() - 1000000),
      updatedAt: new Date(Date.now() - 990000),
      agentId: 'water'
    },
    'chat-2': {
      id: 'chat-2',
      title: 'Boeing job opportunities',
      messages: [
        {
          role: 'user',
          content: 'What jobs is Boeing hiring for in St. Louis?',
          timestamp: new Date(Date.now() - 900000)
        },
        {
          role: 'assistant',
          content: {
            text: "There are 120+ open roles right now.\n\nWant me to:",
            options: [
              { text: "🔍 Filter by remote/onsite", action: "filter_jobs" },
              { text: "🎓 Show entry-level paths", action: "entry_level" },
              { text: "📩 Email you current listings", action: "email_listings" }
            ]
          },
          timestamp: new Date(Date.now() - 890000)
        }
      ],
      createdAt: new Date(Date.now() - 900000),
      updatedAt: new Date(Date.now() - 890000),
      agentId: 'boeing'
    },
    'chat-3': {
      id: 'chat-3',
      title: 'Trash collection schedule',
      messages: [
        {
          role: 'user',
          content: 'What day is trash collection in my area?',
          timestamp: new Date(Date.now() - 800000)
        },
        {
          role: 'assistant',
          content: {
            text: "You're in the Thursday pickup zone.\n\nWant me to:",
            options: [
              { text: "🔔 Send a reminder", action: "send_reminder" },
              { text: "📦 Schedule a bulk pickup", action: "bulk_pickup" },
              { text: "🔄 Check recycling rules", action: "recycling_rules" }
            ]
          },
          timestamp: new Date(Date.now() - 790000)
        }
      ],
      createdAt: new Date(Date.now() - 800000),
      updatedAt: new Date(Date.now() - 790000),
      agentId: 'trash'
    },
    'chat-4': {
      id: 'chat-4',
      title: 'Sewer maintenance in St. Louis',
      messages: [
        {
          role: 'user',
          content: 'How is the sewer system maintained in St. Louis?',
          timestamp: new Date(Date.now() - 700000)
        },
        {
          role: 'assistant',
          content: {
            text: "The sewer system is actively managed by MSD through remote sensors, crew inspections, and predictive maintenance.\n\nWant a breakdown of:",
            options: [
              { text: "🔧️ Current maintenance in your area", action: "local_maintenance" },
              { text: "💧 Tips to prevent home backups", action: "prevention_tips" },
              { text: "🔄 How your monthly fees are used", action: "fee_usage" }
            ]
          },
          timestamp: new Date(Date.now() - 690000)
        }
      ],
      createdAt: new Date(Date.now() - 700000),
      updatedAt: new Date(Date.now() - 690000),
      agentId: 'sewer'
    },
    'chat-5': {
      id: 'chat-5',
      title: "Monsanto's history in St. Louis",
      messages: [
        {
          role: 'user',
          content: "What is Monsanto's history in St. Louis?",
          timestamp: new Date(Date.now() - 600000)
        },
        {
          role: 'assistant',
          content: {
            text: "Monsanto was founded here in 1901 and later became a global biotech leader. The HQ was based in Creve Coeur until the Bayer acquisition.\n\nWant me to:",
            options: [
              { text: "🏢 Show a timeline of milestones", action: "show_timeline" },
              { text: "🧪 Highlight legacy research facilities", action: "research_facilities" },
              { text: "🌽 Pull up biotech patents from STL", action: "biotech_patents" }
            ]
          },
          timestamp: new Date(Date.now() - 590000)
        }
      ],
      createdAt: new Date(Date.now() - 600000),
      updatedAt: new Date(Date.now() - 590000),
      agentId: 'monsanto'
    },
    'chat-6': {
      id: 'chat-6',
      title: 'Dierbergs grocery delivery',
      messages: [
        {
          role: 'user',
          content: 'Does Dierbergs offer grocery delivery in St. Louis?',
          timestamp: new Date(Date.now() - 500000)
        },
        {
          role: 'assistant',
          content: {
            text: "Yes. Dierbergs partners with Instacart and Shipt, plus curbside pickup via Express Lane.\n\nWant help:",
            options: [
              { text: "🛒 Placing a delivery order", action: "place_order" },
              { text: "📦 Scheduling curbside pickup", action: "curbside_pickup" },
              { text: "💲 Comparing fees and services", action: "compare_fees" }
            ]
          },
          timestamp: new Date(Date.now() - 490000)
        }
      ],
      createdAt: new Date(Date.now() - 500000),
      updatedAt: new Date(Date.now() - 490000),
      agentId: 'dierbergs'
    },
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
