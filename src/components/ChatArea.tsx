
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation, useParams } from "react-router-dom";
import { ArrowUp, FileText, Globe, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

type PromptCard = {
  text: string;
  onClick: () => void;
};

const formatTimeStamp = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Agent-specific prompt cards
const AGENT_PROMPTS: Record<string, string[]> = {
  // GOV
  "county": [
    "How do I pay my property taxes in St. Louis County?",
    "What are the hours for the St. Louis County Recorder of Deeds office?"
  ],
  "city": [
    "How do I get a business license in St. Louis City?",
    "What are the recycling guidelines for St. Louis City?"
  ],
  // UTILITIES
  "water": [
    "How do I pay my water bill in St. Louis?",
    "How can I report a water main break?"
  ],
  "trash": [
    "What day is trash collection in my area?",
    "How do I dispose of large items like furniture?"
  ],
  "sewer": [
    "Who do I call for sewer backup issues?",
    "How is the sewer system maintained in St. Louis?"
  ],
  // COMPANIES
  "boeing": [
    "Tell me about Boeing's presence in St. Louis",
    "What jobs is Boeing hiring for in St. Louis?"
  ],
  "monsanto": [
    "What is Monsanto's history in St. Louis?",
    "How has Bayer's acquisition affected Monsanto's St. Louis operations?"
  ],
  "amazon": [
    "Where are Amazon fulfillment centers in the St. Louis area?",
    "How many people does Amazon employ in St. Louis?"
  ],
  "handyman": [
    "How do I find a reliable handyman in St. Louis?",
    "What's the average cost of handyman services in St. Louis?"
  ],
  "dierbergs": [
    "What are Dierbergs' store hours?",
    "Does Dierbergs offer grocery delivery in St. Louis?"
  ]
};

// Default prompt cards for home page
const DEFAULT_PROMPTS = [
  "How do I pay my water bill in St. Louis?",
  "Tell me about Boeing's presence in St. Louis"
];

// Simulated agent responses for demo
const SIMULATED_RESPONSES: Record<string, Record<string, string>> = {
  "water": {
    "How do I pay my water bill in St. Louis?": "To pay your St. Louis water bill, you have several options:\n\n1. Online: Visit stlwater.com and select 'Pay My Bill'. You'll need your account number.\n\n2. By Phone: Call 314-633-9900 and follow the prompts.\n\n3. In Person: Visit the city hall at 1200 Market Street.\n\n4. By Mail: Send your payment to: St. Louis Water Division, 1640 S. Kingshighway Blvd, St. Louis, MO 63110.\n\nPayments are due by the 15th of each month to avoid late fees."
  },
  "boeing": {
    "Tell me about Boeing's presence in St. Louis": "Boeing has a significant presence in St. Louis, with operations dating back to 1939 when they acquired McDonnell Douglas.\n\nCurrent operations in St. Louis include:\n\n• Boeing Defense, Space & Security headquarters\n• Manufacturing of F-15 and F/A-18 fighter jets\n• Research and development facilities\n• Approximately 14,000 employees in the region\n\nThe St. Louis campus is located near St. Louis Lambert International Airport and remains one of the largest manufacturing employers in Missouri."
  },
  // Add more simulated responses as needed
};

const ChatArea = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [promptCards, setPromptCards] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const { agentId } = useParams<{ agentId: string }>();
  const { toast } = useToast();

  // Set agent-specific prompts or default prompts
  useEffect(() => {
    if (agentId && AGENT_PROMPTS[agentId]) {
      setPromptCards(AGENT_PROMPTS[agentId]);
    } else {
      setPromptCards(DEFAULT_PROMPTS);
    }
    
    // Clear messages when changing agents/routes
    setMessages([]);
    
    // Set default prompt from location state if available
    if (location.state?.defaultPrompt) {
      setInputValue(location.state.defaultPrompt);
    } else {
      setInputValue("");
    }
  }, [agentId, location.state]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getSimulatedResponse = (prompt: string): string => {
    // Check if we have a specific response for this agent and prompt
    if (agentId && SIMULATED_RESPONSES[agentId]?.[prompt]) {
      return SIMULATED_RESPONSES[agentId][prompt];
    }
    
    // If no specific response, generate a generic one
    return `This is a simulated response about ${agentId || "general St. Louis information"} regarding: "${prompt}"`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInputValue("");
    
    // Simulate response after a short delay
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: getSimulatedResponse(userMessage.content),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
    
    // Hide prompt cards once conversation starts
    if (messages.length === 0) {
      setPromptCards([]);
    }
  };

  const handlePromptClick = (text: string) => {
    setInputValue(text);
    
    // Auto-submit the form after setting the input value
    setTimeout(() => {
      const userMessage: Message = {
        role: "user",
        content: text,
        timestamp: new Date(),
      };
      
      setMessages([userMessage]);
      
      // Simulate response after a short delay
      setTimeout(() => {
        const aiResponse: Message = {
          role: "assistant",
          content: getSimulatedResponse(text),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
      
      // Hide prompt cards after selection
      setPromptCards([]);
    }, 100);
  };

  const isPublicChat = location.pathname === "/public-chat";
  const agentName = agentId ? agentId.charAt(0).toUpperCase() + agentId.slice(1) : null;

  return (
    <div className="flex flex-col h-full">
      {agentName && (
        <div className="bg-secondary/50 py-2 px-4 border-b border-border">
          <h2 className="text-xl font-medium">{agentName} Assistant</h2>
        </div>
      )}
      
      <div className="flex-1 overflow-auto p-4 md:p-8">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl font-bold mb-8">
              {agentName ? `Ask about ${agentName}` : "What can I help with?"}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
              {promptCards.map((text, index) => (
                <button
                  key={index}
                  className="border border-border rounded-lg p-4 text-left hover:bg-secondary transition-colors text-large"
                  onClick={() => handlePromptClick(text)}
                >
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs">?</span>
                    </div>
                  </div>
                  {text}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {messages.length > 0 && (
          <div className="flex flex-col space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                  <p className="text-large whitespace-pre-wrap">{message.content}</p>
                </div>
                <span className="text-xs text-muted-foreground mt-1 px-1">
                  {formatTimeStamp(message.timestamp)}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-border">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex items-center gap-2 relative">
            <div className="flex gap-2 absolute left-2">
              <Button type="button" variant="ghost" size="icon">
                <Image className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon">
                <FileText className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
              </Button>
            </div>
            
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isPublicChat ? "Public chat is view-only" : "Ask anything"}
              className="pl-24 pr-12 py-6 text-large"
              disabled={isPublicChat}
            />
            
            <Button
              type="submit"
              className="absolute right-2"
              size="icon"
              disabled={inputValue.trim() === '' || isPublicChat}
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="text-xs text-center text-muted-foreground">
            By using this app, you agree to our{" "}
            <a href="/terms" className="underline hover:text-primary">
              Terms
            </a>{" "}
            and have read our{" "}
            <a href="/privacy" className="underline hover:text-primary">
              Privacy Policy
            </a>
            . Built with ❤️ by Ryan
          </div>
          
          {isPublicChat && (
            <div className="bg-secondary rounded-md p-4 mt-2 text-center">
              <p className="text-large font-medium">Join our Discord community</p>
              <a 
                href="https://discord.gg/stlouis" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline mt-2 inline-block"
              >
                discord.gg/stlouis
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
