
import { useSuperAgentChat } from '@/hooks/super-agent/useSuperAgentChat';
import ProcessingStatus from './ProcessingStatus';
import SuperAgentMessageDisplay from './MessageDisplay';
import PromptCards from '@/components/chat/PromptCards';
import ResponseActions from '@/components/ResponseActions';
import FeedbackModal from '@/components/FeedbackModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, RotateCcw, MessageSquare } from 'lucide-react';
import { SUPER_AGENT_PROMPTS, SUPER_AGENT_CONFIG } from '@/data/superAgent';

const SuperAgentChat = () => {
  const {
    messages,
    inputValue,
    setInputValue,
    isProcessing,
    statusMessage,
    showStatus,
    showClearButton,
    showInlineFeedback,
    messagesEndRef,
    inputRef,
    statusRef,
    currentInteraction,
    feedbackModalOpen,
    handleSubmit,
    handleInputSubmit,
    handleActionClick,
    handleInlineFeedbackClick,
    clearMessages,
    handleFeedbackSubmit,
    handleFeedbackClose
  } = useSuperAgentChat();

  const handlePromptClick = (text: string) => {
    handleSubmit(text);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header with Clear Button */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">{SUPER_AGENT_CONFIG.icon}</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold">{SUPER_AGENT_CONFIG.name}</h1>
              <p className="text-sm text-muted-foreground">
                {SUPER_AGENT_CONFIG.description}
              </p>
            </div>
          </div>
          
          {showClearButton && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearMessages}
              className={`flex items-center gap-2 ${
                showClearButton ? 'ring-2 ring-blue-500 ring-offset-2' : ''
              }`}
            >
              <RotateCcw className="h-4 w-4" />
              Clear Chat
            </Button>
          )}
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 overflow-auto p-4">
        {messages.length === 0 ? (
          <PromptCards
            agentName={SUPER_AGENT_CONFIG.name}
            promptCards={SUPER_AGENT_PROMPTS}
            onPromptClick={handlePromptClick}
          />
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index}>
                <SuperAgentMessageDisplay
                  message={message}
                  isUser={message.role === 'user'}
                />
                {message.role === 'assistant' && 
                 typeof message.content === 'object' && 
                 message.content.options && (
                  <ResponseActions
                    options={message.content.options}
                    onActionClick={handleActionClick}
                  />
                )}
              </div>
            ))}
            
            {/* Show status indicator during processing with ref for scrolling */}
            {showStatus && (
              <div ref={statusRef}>
                <ProcessingStatus 
                  message={statusMessage}
                  isActive={isProcessing}
                />
              </div>
            )}
            
            {/* Show processing spinner when no status but still processing */}
            {isProcessing && !showStatus && (
              <div className="flex justify-start mt-4" ref={statusRef}>
                <div className="chat-bubble-ai">
                  <LoadingSpinner size="sm" text="Processing..." />
                </div>
              </div>
            )}
            
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
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4">
        <form onSubmit={handleInputSubmit} className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={SUPER_AGENT_CONFIG.placeholder}
            disabled={isProcessing}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isProcessing || !inputValue.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Feedback Modal */}
      {currentInteraction && (
        <FeedbackModal
          open={feedbackModalOpen}
          onClose={handleFeedbackClose}
          interactionId={`super-agent-${Date.now()}`}
          userResponse={currentInteraction.question}
          onSubmitFeedback={handleFeedbackSubmit}
        />
      )}
    </div>
  );
};

export default SuperAgentChat;
