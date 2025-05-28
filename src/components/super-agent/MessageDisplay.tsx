
import React, { memo } from 'react';
import { Message } from "@/types/chat";
import { formatTimeStamp } from "@/utils/dateUtils";

interface SuperAgentMessageDisplayProps {
  message: Message;
  isUser: boolean;
}

const SuperAgentMessageDisplay = memo(({ message, isUser }: SuperAgentMessageDisplayProps) => {
  const renderMessageContent = () => {
    if (typeof message.content === 'string') {
      return <p className="text-large whitespace-pre-wrap">{message.content}</p>;
    } else {
      return <p className="text-large whitespace-pre-wrap">{message.content.text}</p>;
    }
  };

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      <div className={isUser ? 'chat-bubble-user' : 'chat-bubble-ai'}>
        {renderMessageContent()}
      </div>
      <span className="text-xs text-muted-foreground mt-1 px-1">
        {formatTimeStamp(message.timestamp)}
      </span>
    </div>
  );
});

SuperAgentMessageDisplay.displayName = 'SuperAgentMessageDisplay';

export default SuperAgentMessageDisplay;
