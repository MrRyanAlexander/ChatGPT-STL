
import { useSuperAgentChat } from '@/hooks/super-agent/useSuperAgentChat';
import ProcessingStatus from './ProcessingStatus';
import SuperAgentMessageDisplay from './MessageDisplay';
import PromptCards from '@/components/chat/PromptCards';
import ResponseActions from '@/components/ResponseActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { SUPER_AGENT_PROMPTS, SUPER_AGENT_CONFIG } from '@/data/superAgent';

const SuperAgentChat = () => {
  const {
    messages,
    inputValue,
    setInputValue,
    isProcessing,
    statusMessage,
    showStatus,
    messagesEndRef,
    inputRef,
    handleSubmit,
    handleInputSubmit
  } = useSuperAgentChat();

  const handlePromptClick = (text: string) => {
    handleSubmit(text);
  };

  const handleActionClick = (action: string) => {
    console.log('Super Agent action clicked:', action);
    // Handle super agent specific actions
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="border-b border-border p-4">
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
            
            {showStatus && (
              <ProcessingStatus 
                message={statusMessage}
                isActive={isProcessing}
              />
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
    </div>
  );
};

export default SuperAgentChat;
