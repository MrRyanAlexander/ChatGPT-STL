
import { useState, useEffect, useCallback } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
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

// Global chat history storage
const CHAT_HISTORY_KEY = 'stl-chat-history';
let globalChatHistories: Record<string, Chat> = {};

// Try to load from localStorage on initial load
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
    
    globalChatHistories = parsedHistory;
  }
} catch (error) {
  console.error('Failed to load chat history from localStorage:', error);
}

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
          content: 'To pay your St. Louis water/refuse bill, you have several options:\n\n1.  **Online:** Use the PayIt St. Louis website (payitstlouis.com) or the PayIt St. Louis mobile app. You can also find links via the City\'s Water Division website. You\'ll need your account information.\n\n2.  **By Phone:** For billing questions, call the Water Division at 314-771-2255. For questions about payment options, contact the Collector of Revenue\'s office at 314-622-3628.\n\n3.  **In Person:** Pay at City Hall, 1200 Market Street. Check current hours before visiting.\n\n4.  **By Mail:** Send a check or money order (payable to Collector of Revenue) with your bill stub to: Gregory F.X. Daly, Collector of Revenue, PO Box 66877, St. Louis MO 63166-6877.\n\nPayment due dates vary; refer to your specific bill to avoid late fees.',
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
          content: 'Boeing consistently hires for a wide range of roles at its St. Louis facilities. Common areas of recruitment include:\n\n*   Aerospace, Software, Mechanical, and Systems Engineers\n*   Manufacturing and Production Specialists (including technicians and mechanics)\n*   Supply Chain and Logistics Professionals\n*   Information Technology and Cybersecurity Specialists\n*   Program and Project Managers\n*   Finance and Business Support Roles\n\nBoeing is known for offering competitive compensation and benefits packages. To find the most current job openings, visit the official Boeing careers website at **careers.boeing.com** and filter the search by "St. Louis, Missouri" or related local areas. Boeing also frequently engages with local talent through university partnerships (including Washington University, SLU, UMSL, and Missouri S&T) and participation in regional job fairs.',
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
          content: 'Trash collection days in St. Louis City depend on your specific address. Here\'s how to find your day:\n\n1.  **Online Lookup:** Visit the City\'s website (stlouis-mo.gov) and look for the Refuse Division or Streets Department section. There should be an address lookup tool to find your collection schedule.\n\n2.  **Call CSB:** Contact the Citizens\' Service Bureau (CSB) at **314-622-4800**.\n\n**General Collection Rules:**\n*   Place your city-provided trash bin (rollcart or dumpster access) out by **6:00 AM** on your collection day.\n*   Ensure the lid is closed.\n*   Keep bins several feet away (e.g., 3-5 feet) from obstructions like parked cars, mailboxes, poles, or other bins.\n*   Bring rollcarts back onto your property by the evening of your collection day.\n\n**Holiday Schedule:** If a designated city holiday falls on your collection day, pickup is usually delayed by one day for the rest of that week. Check the city\'s website for the official holiday schedule.',
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
          content: 'The Metropolitan St. Louis Sewer District (MSD) maintains the vast sewer and stormwater system in its service area (St. Louis City and most of St. Louis County) through a multi-faceted approach:\n\n1.  **Inspections & Monitoring:** Regularly inspecting sewer lines, often using camera technology, to identify blockages, damage, or potential failures.\n\n2.  **Cleaning & Preventative Maintenance:** Proactively cleaning sewer lines to remove grease, roots, debris, and other obstructions that can cause backups and overflows.\n\n3.  **Repair & Rehabilitation:** Repairing or replacing aging or damaged sewer pipes and infrastructure.\n\n4.  **Project Clear:** This is a major, long-term capital improvement program (spanning decades and costing billions) mandated by a consent decree to reduce sewer overflows and improve water quality through system upgrades, separating combined sewers, and building new infrastructure.\n\n5.  **Wastewater Treatment:** Operating multiple wastewater treatment plants that treat hundreds of millions of gallons of wastewater daily before returning it safely to local rivers.\n\n6.  **Stormwater Management:** Constructing and maintaining stormwater infrastructure like detention basins, rain gardens, and green infrastructure solutions to manage rainwater runoff, reduce flooding, and lessen the burden on the sewer system.\n\nThese extensive operations are primarily funded by the monthly sewer charges included on residents\' water/sewer bills.',
          timestamp: new Date(Date.now() - 690000)
        }
      ],
      createdAt: new Date(Date.now() - 700000),
      updatedAt: new Date(Date.now() - 690000),
      agentId: 'sewer'
    },
    'chat-5': {
      id: 'chat-5',
      title: 'Monsanto history in St. Louis',
      messages: [
        {
          role: 'user',
          content: 'What is Monsanto\'s history in St. Louis?',
          timestamp: new Date(Date.now() - 600000)
        },
        {
          role: 'assistant',
          content: 'Monsanto had a long and significant history rooted in St. Louis:\n\n*   **Founding:** Established in St. Louis in **1901** by John F. Queeny, who named the company after his wife\'s maiden name, Monsanto.\n*   **Early Products:** Its first product was the artificial sweetener **saccharin**. The company later expanded into industrial chemicals, plastics, and pharmaceuticals.\n*   **Shift to Agriculture:** Following World War II, Monsanto increasingly focused on agricultural chemicals, introducing the widely known herbicide **Roundup** in the mid-1970s.\n*   **Biotechnology:** In the 1980s and 1990s, Monsanto became a pioneer in agricultural biotechnology and genetically modified seeds (GMOs).\n*   **Local Hub:** For decades, its world headquarters was located in **Creve Coeur** in St. Louis County, with major research facilities also in Chesterfield. At its peak, it was a major employer in the region.\n*   **Acquisition:** In **2018**, Monsanto was acquired by the German company **Bayer AG** for approximately $63 billion.\n\nFollowing the acquisition, Bayer retired the Monsanto name, but the company\'s legacy as a major St. Louis corporation remains.',
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
          content: 'Yes, Dierbergs offers grocery delivery and curbside pickup options in the St. Louis area:\n\n1.  **Delivery Partners:** Dierbergs primarily utilizes third-party services **Shipt** and **Instacart** for same-day grocery delivery. You can place orders through the Dierbergs website or mobile app, or directly through the Shipt or Instacart platforms.\n\n2.  **How it Works:** Select items online, choose a delivery window, and a personal shopper fulfills and delivers your order.\n\n3.  **Delivery Area:** Service is generally available throughout the St. Louis metropolitan area where Dierbergs stores and its delivery partners operate. Check availability for your specific address.\n\n4.  **Fees & Minimums:** Delivery fees, service fees, and order minimums (often around $35) are determined by the delivery partner (Shipt or Instacart) and vary based on order size, speed, and membership status. Peak times may have extra fees.\n\n5.  **Curbside Pickup (Dierbergs Express Lane):** Dierbergs also offers curbside pickup at most locations. Order online and select a pickup time. There is typically a pickup fee (around $5), which may be waived for orders exceeding a certain amount (check current promotions).',
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
  
  // Save to localStorage whenever chat histories change
  useEffect(() => {
    try {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatHistories));
      globalChatHistories = chatHistories; // Update global reference
    } catch (error) {
      console.error('Failed to save chat history to localStorage:', error);
    }
  }, [chatHistories]);
  
  // Add new chat
  const addChat = useCallback((chat: Chat) => {
    setChatHistories(prev => ({
      ...prev,
      [chat.id]: chat
    }));
  }, []);
  
  // Update existing chat
  const updateChat = useCallback((chatId: string, updatedChat: Chat) => {
    setChatHistories(prev => ({
      ...prev,
      [chatId]: updatedChat
    }));
  }, []);
  
  // Get chat by ID
  const getChatById = useCallback((chatId: string) => {
    return chatHistories[chatId];
  }, [chatHistories]);
  
  // Get all chats
  const getAllChats = useCallback(() => {
    return Object.values(chatHistories).sort((a, b) => 
      b.updatedAt.getTime() - a.updatedAt.getTime()
    );
  }, [chatHistories]);
  
  // Delete chat
  const deleteChat = useCallback((chatId: string) => {
    setChatHistories(prev => {
      const newHistories = { ...prev };
      delete newHistories[chatId];
      return newHistories;
    });
  }, []);
  
  return {
    chatHistories,
    addChat,
    updateChat,
    getChatById,
    getAllChats,
    deleteChat
  };
};
