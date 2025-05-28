
import { useLocation, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, Paperclip as Attach, Globe, Mic } from "lucide-react";
import ResponseActions from "@/components/ResponseActions";
import FeedbackModal from "@/components/FeedbackModal";
import MessageDisplay from "@/components/chat/MessageDisplay";
import PromptCards from "@/components/chat/PromptCards";
import ChatHeader from "@/components/chat/ChatHeader";
import { Message } from "@/types/chat";
import { AgentService } from "@/services/agentService";
import { formatTimeStamp } from "@/utils/dateUtils";
import { useChatState } from "@/hooks/useChatState";
import { useFeedback } from "@/hooks/useFeedback";
import { useMessageHandling } from "@/hooks/useMessageHandling";

interface ChatAreaProps {
  chatId?: string;
}

const ChatArea = ({ chatId }: ChatAreaProps) => {
  const location = useLocation();
  const { agentId } = useParams<{ agentId: string }>();
  
  const {
    messages,
    setMessages,
    promptCards,
    setPromptCards,
    inputValue,
    setInputValue,
    messagesEndRef,
    inputRef
  } = useChatState(chatId);

  const {
    currentInteraction,
    setCurrentInteraction,
    feedbackModalOpen,
    setFeedbackModalOpen,
    handleFeedbackSubmit
  } = useFeedback();

  const { handleSubmit, handlePromptClick, handleActionClick } = useMessageHandling();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    handleActionClick(
      action,
      currentInteraction,
      setCurrentInteraction,
      setMessages,
      setFeedbackModalOpen,
      agentId
    );
  };

  const isPublicChat = location.pathname === "/public-chat";
  const agentName = AgentService.formatAgentName(agentId);

  return (
    <div className="flex flex-col h-full">
      <ChatHeader agentName={agentName} />
      
      <div className="flex-1 overflow-auto p-4 md:p-8">
        {messages.length === 0 ? (
          <PromptCards
            agentName={agentName}
            promptCards={promptCards}
            onPromptClick={onPromptClick}
          />
        ) : (
          <MessageDisplay
            messages={messages}
            onActionClick={onActionClick}
            messagesEndRef={messagesEndRef}
          />
        )}
      </div>
      
      <div className="p-4 border-t border-border">
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
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
