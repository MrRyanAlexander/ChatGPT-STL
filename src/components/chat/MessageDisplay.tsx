
import React, { memo } from 'react';
import { Message } from "@/types/chat";
import ResponseActions from "@/components/ResponseActions";
import { formatTimeStamp } from "@/utils/dateUtils";

interface MessageDisplayProps {
  messages: Message[];
  onActionClick: (action: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageDisplay = memo(({ messages, onActionClick, messagesEndRef }: MessageDisplayProps) => {
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
              onActionClick={onActionClick}
            />
          )}
        </>
      );
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {messages.map((message, index) => (
        <div
          key={`${message.role}-${index}-${message.timestamp.getTime()}`}
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
  );
});

MessageDisplay.displayName = 'MessageDisplay';

export default MessageDisplay;
