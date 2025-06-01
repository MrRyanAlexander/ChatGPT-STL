
import { useLocation, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, Paperclip as Attach, Globe, Mic, RotateCcw, MessageSquare } from "lucide-react";
import FeedbackModal from "@/components/FeedbackModal";
import MessageDisplay from "@/components/chat/MessageDisplay";
import PromptCards from "@/components/chat/PromptCards";
import ChatHeader from "@/components/chat/ChatHeader";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AgentService } from "@/services/agentService";
import { useChatState } from "@/hooks/useChatState";
import { useFeedback } from "@/hooks/useFeedback";
import { useMessageHandling } from "@/hooks/useMessageHandling";
import { useState, useEffect, useRef } from "react";

interface ChatAreaProps {
  chatId?: string;
}

const ChatArea = ({ chatId }: ChatAreaProps) => {
  const location = useLocation();
  const { agentId } = useParams<{ agentId: string }>();
  const [showInlineFeedback, setShowInlineFeedback] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  
  const {
    messages,
    setMessages,
    promptCards,
    setPromptCards,
    inputValue,
    setInputValue,
    messagesEndRef,
    inputRef,
    isLoading,
    showClearButton,
    clearMessages
  } = useChatState(chatId);

  const {
    currentInteraction,
    setCurrentInteraction,
    feedbackModalOpen,
    setFeedbackModalOpen,
    handleFeedbackSubmit
  } = useFeedback();

  const { handleSubmit, handlePromptClick, handleActionClick, isProcessing } = useMessageHandling();

  // Improved scroll to bottom with debouncing
  const scrollToBottom = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ 
          behavior: "smooth",
          block: "end"
        });
      }
    }, 100);
  };

  // Auto-scroll when messages change
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length, isProcessing]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowInlineFeedback(false);
    handleSubmit(
      inputValue,
      messages,
      setMessages,
      setInputValue,
      setPromptCards,
      setCurrentInteraction,
      agentId
    );
  };

  const onPromptClick = (text: string) => {
    setShowInlineFeedback(false);
    handlePromptClick(
      text,
      setMessages,
      setInputValue,
      setPromptCards,
      setCurrentInteraction,
      agentId
    );
  };

  const onActionClick = (action: string) => {
    setShowInlineFeedback(false);
    handleActionClick(
      action,
      currentInteraction,
      setCurrentInteraction,
      setMessages,
      setShowInlineFeedback,
      agentId
    );
  };

  const handleInlineFeedbackClick = () => {
    setFeedbackModalOpen(true);
  };

  const handleFeedbackClose = () => {
    setFeedbackModalOpen(false);
    setShowInlineFeedback(false);
  };

  const isPublicChat = location.pathname === "/public-chat";
  const agentName = AgentService.formatAgentName(agentId);
  const isInputDisabled = isPublicChat || isProcessing;

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-full">
        {/* Chat Header with Clear Button */}
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <ChatHeader agentName={agentName} />
            </div>
            
            {showClearButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearMessages}
                className="flex items-center gap-2 ring-2 ring-blue-500 ring-offset-2"
              >
                <RotateCcw className="h-4 w-4" />
                Clear Chat
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <LoadingSpinner size="lg" text="Loading chat..." />
            </div>
          ) : messages.length === 0 ? (
            <PromptCards
              agentName={agentName}
              promptCards={promptCards}
              onPromptClick={onPromptClick}
            />
          ) : (
            <div className="space-y-4">
              <MessageDisplay
                messages={messages}
                onActionClick={onActionClick}
                messagesEndRef={messagesEndRef}
              />
              
              {/* Inline Feedback Button */}
              {showInlineFeedback && !isProcessing && (
                <div className="flex justify-center mt-6">
                  <Button
                    onClick={handleInlineFeedbackClick}
                    variant="outline"
                    className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Done? Leave Feedback
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {isProcessing && (
            <div className="flex justify-start mt-4">
              <div className="chat-bubble-ai">
                <LoadingSpinner size="sm" text="Coordinating with departments..." />
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-border">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="relative max-w-4xl mx-auto w-full">
              <div className="relative">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isPublicChat ? "Group chatting is possible here, but not enabled" : "Ask anything..."}
                  className="py-6 pr-16 pl-16 rounded-2xl shadow-sm bg-background border-border text-large resize-none"
                  disabled={isInputDisabled}
                />
                
                {/* Left side buttons inside input */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                  <Button type="button" variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0" disabled={isInputDisabled}>
                    <Attach className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0" disabled={isInputDisabled}>
                    <Globe className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0" disabled={isInputDisabled}>
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Submit button */}
                <Button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full h-8 w-8 p-0"
                  size="icon"
                  disabled={inputValue.trim() === '' || isInputDisabled}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="text-xs text-center text-muted-foreground">
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
        
        {currentInteraction && (
          <FeedbackModal
            open={feedbackModalOpen}
            onClose={handleFeedbackClose}
            interactionId={currentInteraction.question}
            userResponse={currentInteraction.action}
            onSubmitFeedback={handleFeedbackSubmit}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default ChatArea;
