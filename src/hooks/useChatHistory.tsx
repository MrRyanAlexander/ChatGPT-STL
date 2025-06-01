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
    'water': {
      id: 'water',
      title: 'Water bill payment and setup',
      messages: [
        {
          role: 'user',
          content: 'How do I pay my water bill in St. Louis?',
          timestamp: new Date(Date.now() - 300000)
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
          timestamp: new Date(Date.now() - 290000)
        },
        {
          role: 'assistant',
          content: {
            text: "Perfect! I've set up autopay for your water account. Your next bill of $64.22 will be automatically withdrawn on March 15th.\n\nYou'll receive email confirmations before each payment. You can modify or cancel autopay anytime through your account portal.",
            showFeedback: true
          },
          timestamp: new Date(Date.now() - 280000)
        }
      ],
      createdAt: new Date(Date.now() - 300000),
      updatedAt: new Date(Date.now() - 280000),
      agentId: 'water'
    },
    'boeing': {
      id: 'boeing',
      title: 'Boeing career opportunities search',
      messages: [
        {
          role: 'user',
          content: 'What engineering jobs is Boeing hiring for in St. Louis?',
          timestamp: new Date(Date.now() - 250000)
        },
        {
          role: 'assistant',
          content: {
            text: "Found 47 engineering positions currently open at Boeing Defense in St. Louis:\n\n• Systems Engineers (12 openings)\n• Software Engineers (8 openings) \n• Aerospace Engineers (15 openings)\n• Electrical Engineers (7 openings)\n• Manufacturing Engineers (5 openings)\n\nWant me to:",
            options: [
              { text: "🔍 Filter by experience level", action: "filter_experience" },
              { text: "📍 Show remote/hybrid options", action: "remote_options" },
              { text: "📧 Email me detailed job descriptions", action: "email_jobs" },
              { text: "💰 Show salary ranges", action: "salary_info" }
            ]
          },
          timestamp: new Date(Date.now() - 240000)
        },
        {
          role: 'assistant',
          content: {
            text: "Here are the remote/hybrid engineering positions:\n\n**Fully Remote (3 positions):**\n• Senior Software Engineer - $95k-$125k\n• Systems Integration Engineer - $88k-$115k\n\n**Hybrid (2-3 days in office, 15 positions):**\n• Aerospace Engineers - $82k-$108k\n• Electrical Engineers - $78k-$102k\n• Manufacturing Engineers - $75k-$98k\n\nAll positions include full benefits, 401k matching, and Boeing's education assistance program. Would you like me to start an application for any of these roles?",
            showFeedback: true
          },
          timestamp: new Date(Date.now() - 230000)
        }
      ],
      createdAt: new Date(Date.now() - 250000),
      updatedAt: new Date(Date.now() - 230000),
      agentId: 'boeing'
    },
    'trash': {
      id: 'trash',
      title: 'Bulk pickup scheduling',
      messages: [
        {
          role: 'user',
          content: 'I need to schedule a bulk trash pickup for old furniture',
          timestamp: new Date(Date.now() - 200000)
        },
        {
          role: 'assistant',
          content: {
            text: "I can help schedule your bulk pickup! Your regular collection day is Thursday.\n\nFor your address (1234 Example Ave), next available bulk pickup dates:",
            options: [
              { text: "📅 March 21st (Next Thursday)", action: "schedule_march_21" },
              { text: "📅 March 28th", action: "schedule_march_28" },
              { text: "📅 April 4th", action: "schedule_april_4" },
              { text: "❓ What items are accepted?", action: "bulk_items_info" }
            ]
          },
          timestamp: new Date(Date.now() - 190000)
        },
        {
          role: 'assistant',
          content: {
            text: "✅ **Bulk pickup scheduled for March 21st!**\n\n**Confirmation #:** BP-2024-0321-1234\n\n**Instructions:**\n• Place items curbside by 6 AM on March 21st\n• Keep items separate from regular trash\n• No electronics, hazardous materials, or tires\n\n**Your items:** Old furniture (couches, chairs, tables)\n\nYou'll receive a reminder email 24 hours before pickup. Need anything else?",
            showFeedback: true
          },
          timestamp: new Date(Date.now() - 180000)
        }
      ],
      createdAt: new Date(Date.now() - 200000),
      updatedAt: new Date(Date.now() - 180000),
      agentId: 'trash'
    },
    'sewer': {
      id: 'sewer',
      title: 'Basement backup prevention',
      messages: [
        {
          role: 'user',
          content: 'My basement flooded last month. How can I prevent sewer backups?',
          timestamp: new Date(Date.now() - 150000)
        },
        {
          role: 'assistant',
          content: {
            text: "Sorry to hear about your basement flooding! MSD offers several backup prevention solutions:\n\n**Immediate steps:**",
            options: [
              { text: "🔧 Install a backwater valve", action: "backwater_valve" },
              { text: "🌧️ Check your property's drainage", action: "drainage_check" },
              { text: "💰 Apply for MSD's flood prevention rebate", action: "flood_rebate" },
              { text: "📞 Schedule a free property assessment", action: "assessment" }
            ]
          },
          timestamp: new Date(Date.now() - 140000)
        },
        {
          role: 'assistant',
          content: {
            text: "Great choice! MSD offers up to $2,500 in rebates for backwater valve installation.\n\n**Rebate Program Details:**\n• Covers 50% of installation costs (max $2,500)\n• Must use MSD-approved contractors\n• Includes 2-year warranty\n• Typical installation: $3,000-$5,000\n\n**Next Steps:**\n1. I'll email you the pre-approved contractor list\n2. Get 2-3 quotes for comparison\n3. Submit rebate application before work begins\n\nYour address qualifies for expedited processing due to previous flooding. Application link sent to your email!",
            showFeedback: true
          },
          timestamp: new Date(Date.now() - 130000)
        }
      ],
      createdAt: new Date(Date.now() - 150000),
      updatedAt: new Date(Date.now() - 130000),
      agentId: 'sewer'
    },
    'dierbergs': {
      id: 'dierbergs',
      title: 'Grocery delivery setup and order',
      messages: [
        {
          role: 'user',
          content: 'Can I get groceries delivered from Dierbergs today?',
          timestamp: new Date(Date.now() - 100000)
        },
        {
          role: 'assistant',
          content: {
            text: "Yes! Dierbergs offers same-day delivery to your area. Available options:\n\n**Today's Delivery Windows:**\n• 2:00 PM - 4:00 PM ($9.95 fee)\n• 4:00 PM - 6:00 PM ($7.95 fee)\n• 6:00 PM - 8:00 PM ($7.95 fee)\n\nWhat would you like to do?",
            options: [
              { text: "🛒 Start shopping now", action: "start_shopping" },
              { text: "📋 Create a weekly order", action: "weekly_order" },
              { text: "🚗 Schedule curbside pickup instead", action: "curbside" },
              { text: "💲 Compare delivery services", action: "compare_delivery" }
            ]
          },
          timestamp: new Date(Date.now() - 90000)
        },
        {
          role: 'assistant',
          content: {
            text: "Perfect! I've started your Dierbergs delivery order for today.\n\n**Order Details:**\n• Delivery window: 4:00 PM - 6:00 PM\n• Delivery fee: $7.95\n• Store: Dierbergs Brentwood (closest to you)\n• Driver tip: Added to final checkout\n\n**Your cart is ready!** Added your usual items:\n• Milk, bread, eggs, bananas\n• Previous week's favorites\n\n**Subtotal so far:** $24.50\n\nYou can add more items or checkout when ready. Minimum order $35 for delivery.",
            showFeedback: true
          },
          timestamp: new Date(Date.now() - 80000)
        }
      ],
      createdAt: new Date(Date.now() - 100000),
      updatedAt: new Date(Date.now() - 80000),
      agentId: 'dierbergs'
    },
    'monsanto': {
      id: 'monsanto',
      title: 'Research facility tour inquiry',
      messages: [
        {
          role: 'user',
          content: 'Are there any tours available of former Monsanto research facilities?',
          timestamp: new Date(Date.now() - 50000)
        },
        {
          role: 'assistant',
          content: {
            text: "While the original Monsanto campus in Creve Coeur is now part of Bayer, there are several ways to explore this important St. Louis history:\n\n**Available Options:**",
            options: [
              { text: "🏛️ Missouri History Museum exhibits", action: "history_museum" },
              { text: "🧪 Danforth Plant Science Center tours", action: "danforth_tours" },
              { text: "📚 Washington University archives", action: "washu_archives" },
              { text: "🌾 Agricultural research center visits", action: "ag_research" }
            ]
          },
          timestamp: new Date(Date.now() - 40000)
        },
        {
          role: 'assistant',
          content: {
            text: "Excellent choice! The Danforth Plant Science Center offers public tours showcasing plant research legacy.\n\n**Tour Information:**\n• **When:** Every 2nd Saturday, 10 AM & 2 PM\n• **Duration:** 90 minutes\n• **Cost:** Free (donations welcome)\n• **Next available:** March 23rd\n\n**Tour Includes:**\n• Growth chambers and greenhouses\n• Plant genomics laboratory\n• Interactive exhibits on crop development\n• Discussion of Monsanto's agricultural innovations\n• Current research on sustainable farming\n\n**Reserved your spot for March 23rd at 10 AM!** Confirmation email sent. Please arrive 15 minutes early.",
            showFeedback: true
          },
          timestamp: new Date(Date.now() - 30000)
        }
      ],
      createdAt: new Date(Date.now() - 50000),
      updatedAt: new Date(Date.now() - 30000),
      agentId: 'monsanto'
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
