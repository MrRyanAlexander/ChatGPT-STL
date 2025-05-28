
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation, useParams, Link } from "react-router-dom";
import { ArrowUp, Paperclip as Attach, Globe, FileText, Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useChatHistory } from "@/hooks/useChatHistory";
import ResponseActions from "@/components/ResponseActions";
import FeedbackModal from "@/components/FeedbackModal";
import { Message, FeedbackData } from "@/types/chat";
import { AGENT_PROMPTS, DEFAULT_PROMPTS } from "@/data/prompts";
import { getInteractiveResponse, getFollowUpResponse, formatAgentName, formatTimeStamp } from "@/utils/responseUtils";

// Update the props interface for ChatArea to accept chatId
interface ChatAreaProps {
  chatId?: string;
}

const ChatArea = ({ chatId }: ChatAreaProps) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [promptCards, setPromptCards] = useState<string[]>([]);
  const [currentInteraction, setCurrentInteraction] = useState<{
    question: string;
    action: string;
    showFeedback: boolean;
  } | null>(null);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [collectedFeedback, setCollectedFeedback] = useState<FeedbackData[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const { agentId } = useParams<{ agentId: string }>();
  const { toast } = useToast();
  
  const { chatHistories, updateChat, getChatById } = useChatHistory();
  
  // Get a unique key for this chat
  const chatKey = chatId || (location.pathname.startsWith('/chat/history/') 
    ? location.pathname.split('/').pop() || 'home'
    : agentId || 'home');
  
  // Load chat history when component mounts or when key changes
  useEffect(() => {
    const loadChatData = () => {
      // Always clear input when changing chats
      setInputValue("");
      
      // Check if this is a new chat (chatId starts with "new-")
      if (chatKey && chatKey.startsWith('new-')) {
        // This is a new chat, reset messages
        setMessages([]);
        
        // Set agent-specific prompts or default prompts
        if (agentId && AGENT_PROMPTS[agentId]) {
          setPromptCards(AGENT_PROMPTS[agentId]);
        } else {
          setPromptCards(DEFAULT_PROMPTS);
        }
      } else {
        // Try to load existing chat
        const chatData = getChatById(chatKey);
        
        if (chatData?.messages) {
          setMessages(chatData.messages);
          // Hide prompt cards if we have existing messages
          if (chatData.messages.length > 0) {
            setPromptCards([]);
          } else {
            // Set agent-specific prompts or default prompts
            if (agentId && AGENT_PROMPTS[agentId]) {
              setPromptCards(AGENT_PROMPTS[agentId]);
            } else {
              setPromptCards(DEFAULT_PROMPTS);
            }
          }
        } else {
          // Reset messages for new chat
          setMessages([]);
          
          // Set agent-specific prompts or default prompts
          if (agentId && AGENT_PROMPTS[agentId]) {
            setPromptCards(AGENT_PROMPTS[agentId]);
          } else {
            setPromptCards(DEFAULT_PROMPTS);
          }
        }
      }
      
      // Reset interaction tracking
      setCurrentInteraction(null);
    };
    
    loadChatData();
  }, [agentId, location.pathname, chatKey, getChatById]);

  // Save chat history when messages change - with a check to avoid infinite updates
  useEffect(() => {
    if (messages.length > 0) {
      const title = typeof messages[0].content === 'string' 
        ? messages[0].content.substring(0, 30) + (messages[0].content.length > 30 ? "..." : "") 
        : messages[0].content.text.substring(0, 30) + (messages[0].content.text.length > 30 ? "..." : "");
      
      const existingChat = getChatById(chatKey);
      
      // Only update if there's an actual change in messages or if the chat doesn't exist
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
    // Clear input immediately after submission
    setInputValue("");
    
    // Store the current question for the interaction
    setCurrentInteraction({
      question: typeof userMessage.content === 'string' ? userMessage.content : '',
      action: '',
      showFeedback: false
    });
    
    // Simulate response after a short delay
    setTimeout(() => {
      const response = getInteractiveResponse(
        agentId,
        typeof userMessage.content === 'string' ? userMessage.content : ''
      );
      
      const aiResponse: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
    
    // Hide prompt cards once conversation starts
    if (promptCards.length > 0) {
      setPromptCards([]);
    }
  };

  const handlePromptClick = (text: string) => {
    const userMessage: Message = {
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    
    setMessages([userMessage]);
    // Clear input immediately when a prompt is clicked
    setInputValue("");
    
    // Store the current question for the interaction
    setCurrentInteraction({
      question: text,
      action: '',
      showFeedback: false
    });
    
    // Simulate response after a short delay
    setTimeout(() => {
      const response = getInteractiveResponse(agentId, text);
      
      const aiResponse: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
    
    // Hide prompt cards after selection
    setPromptCards([]);
  };

  const handleActionClick = (action: string) => {
    if (!currentInteraction) return;
    
    // Update the current interaction with the selected action
    setCurrentInteraction({
      ...currentInteraction,
      action
    });
    
    // Get the follow-up response
    const followUp = getFollowUpResponse(agentId, action);
    
    // Add the follow-up response to the messages
    const followUpResponse: Message = {
      role: "assistant",
      content: followUp,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, followUpResponse]);
    
    // Check if we should show the feedback modal after this response
    if (followUp.showFeedback) {
      setTimeout(() => {
        setFeedbackModalOpen(true);
      }, 1000);
    }
  };

  const handleFeedbackSubmit = (feedback: FeedbackData) => {
    // Store feedback
    setCollectedFeedback((prev) => [...prev, feedback]);
    
    // You could send this to an API endpoint, log to console, etc.
    console.log('Feedback submitted:', feedback);
    
    // Show a toast or some other confirmation
    toast({
      title: "Thank you for your feedback!",
      description: "Your input helps us improve our service."
    });
  };

  // Helper function to render message content
  const renderMessageContent = (message: Message) => {
    if (typeof message.content === 'string') {
      return <p className="text-large whitespace-pre-wrap">{message.content}</p>;
    } else {
      return (
        <>
          <p className="text-large whitespace-pre-wrap">{message.content.text}</p>
          {message.content.options && message.content.options.length > 0 && (
            <ResponseActions 
              options={message.content.options} 
              onActionClick={handleActionClick}
            />
          )}
        </>
      );
    }
  };

  const isPublicChat = location.pathname === "/public-chat";
  const agentName = formatAgentName(agentId);

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
              {agentName ? `Ask about ${agentName}` : "What's on your mind today?"}
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
                  {renderMessageContent(message)}
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
          <div className="relative max-w-4xl mx-auto w-full">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isPublicChat ? "Group chatting is possible here, but not enabled" : "Ask anything..."}
              className="py-6 pr-12 pl-4 rounded-2xl shadow-sm bg-background border-border text-large"
              disabled={isPublicChat}
            />
            
            <div className="absolute left-2 bottom-[-45px] flex gap-2">
              <Button type="button" variant="ghost" size="sm" className="rounded-full" disabled={isPublicChat}>
                <Attach className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="rounded-full" disabled={isPublicChat}>
                <Globe className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="rounded-full" disabled={isPublicChat}>
                <Mic className="h-5 w-5" />
              </Button>
            </div>
            
            <Button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full h-8 w-8 p-0"
              size="icon"
              disabled={inputValue.trim() === '' || isPublicChat}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-xs text-center text-muted-foreground mt-10">
            By using this app, you agree to our{" "}
            <Link to="/terms" className="underline hover:text-primary">
              Terms
            </Link>{" "}
            and have read our{" "}
            <Link to="/privacy" className="underline hover:text-primary">
              Privacy Policy
            </Link>
            . Built with ❤️ by{" "}
            <a href="https://ryan.chatgptstl.com" className="underline hover:text-primary">
               Ryan
            </a>
          </div>
        </form>
      </div>
      
      {/* Feedback Modal */}
      {currentInteraction && (
        <FeedbackModal
          open={feedbackModalOpen}
          onClose={() => setFeedbackModalOpen(false)}
          interactionId={currentInteraction.question}
          userResponse={currentInteraction.action}
          onSubmitFeedback={handleFeedbackSubmit}
        />
      )}
    </div>
  );
};

export default ChatArea;
