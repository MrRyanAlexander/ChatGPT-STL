
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "react-router-dom";
import { ArrowUp, FileText, Globe, Image } from "lucide-react";

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

const DEFAULT_PROMPT_CARDS: PromptCard[] = [
  {
    text: "How do I pay my water bill in St. Louis?",
    onClick: () => {},
  },
  {
    text: "Tell me about Boeing's presence in St. Louis",
    onClick: () => {},
  }
];

const ChatArea = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [promptCards, setPromptCards] = useState<PromptCard[]>(DEFAULT_PROMPT_CARDS);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.defaultPrompt) {
      setInputValue(location.state.defaultPrompt);
    }
  }, [location]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
        content: `This is a simulated response for: "${inputValue}"`,
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
    inputRef.current?.focus();
  };

  const isPublicChat = location.pathname === "/public-chat";

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 md:p-8">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl font-bold mb-8">What can I help with?</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
              {promptCards.map((card, index) => (
                <button
                  key={index}
                  className="border border-border rounded-lg p-4 text-left hover:bg-secondary transition-colors text-large"
                  onClick={() => handlePromptClick(card.text)}
                >
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs">?</span>
                    </div>
                  </div>
                  {card.text}
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
                  <p className="text-large">{message.content}</p>
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
