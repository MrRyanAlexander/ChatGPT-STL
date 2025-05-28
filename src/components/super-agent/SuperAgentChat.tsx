
import { useState, useEffect, useRef } from 'react';
import { Message } from '@/types/chat';
import { SuperAgentService } from '@/services/super-agent/superAgentService';
import { StatusStreamService } from '@/services/super-agent/statusStreamService';
import ProcessingStatus from './ProcessingStatus';
import SuperAgentMessageDisplay from './MessageDisplay';
import PromptCards from '@/components/chat/PromptCards';
import ResponseActions from '@/components/ResponseActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

const SUPER_AGENT_PROMPTS = [
  "Help me resolve a water billing dispute with supporting documentation",
  "Find all my city services and their current status across departments", 
  "Coordinate a business license application with all required departments",
  "Research and cross-reference my property tax assessment with recent changes"
];

const SuperAgentChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, statusMessage]);

  const handleSubmit = async (query: string) => {
    if (!query.trim() || isProcessing) return;
    
    // Add user message
    const userMessage = SuperAgentService.generateUserMessage(query);
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsProcessing(true);
    setShowStatus(true);
    
    try {
      // Get query analysis and status stream
      const { analysis, statusUpdates, response } = await SuperAgentService.processQuery(query);
      
      // Stream status updates
      StatusStreamService.streamWithDelay(statusUpdates, (message) => {
        setStatusMessage(message);
      });
      
      // Wait for and add AI response
      const aiResponse = await response;
      const aiMessage = SuperAgentService.generateAIMessage(aiResponse);
      
      setMessages(prev => [...prev, aiMessage]);
      setShowStatus(false);
      setStatusMessage("");
      
    } catch (error) {
      console.error('Super Agent processing error:', error);
      setShowStatus(false);
      setStatusMessage("");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePromptClick = (text: string) => {
    handleSubmit(text);
  };

  const handleActionClick = (action: string) => {
    console.log('Super Agent action clicked:', action);
    // Handle super agent specific actions
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(inputValue);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">🤖</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold">AI Assistant</h1>
            <p className="text-sm text-muted-foreground">
              Advanced multi-agent coordination system
            </p>
          </div>
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 overflow-auto p-4">
        {messages.length === 0 ? (
          <PromptCards
            agentName="AI Assistant"
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
            placeholder="Ask me to coordinate across multiple departments..."
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
