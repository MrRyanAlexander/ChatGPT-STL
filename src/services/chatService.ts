
import { v4 as uuidv4 } from "uuid";
import { Message } from "@/types/chat";
import { AgentId } from "@/types/agent";
import { getInteractiveResponse, getFollowUpResponse } from "@/utils/responseUtils";

export class ChatService {
  static generateChatId(): string {
    return `new-${uuidv4()}`;
  }

  static generateUserMessage(content: string): Message {
    return {
      role: "user",
      content,
      timestamp: new Date(),
    };
  }

  static async generateAIResponse(agentId: AgentId | undefined, prompt: string): Promise<Message> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = getInteractiveResponse(agentId, prompt);
        resolve({
          role: "assistant",
          content: response,
          timestamp: new Date(),
        });
      }, 1000);
    });
  }

  static async generateFollowUpResponse(agentId: AgentId | undefined, action: string): Promise<Message> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const followUp = getFollowUpResponse(agentId, action);
        resolve({
          role: "assistant",
          content: followUp,
          timestamp: new Date(),
        });
      }, 500);
    });
  }

  static generateChatTitle(messages: Message[]): string {
    if (messages.length === 0) return "New Chat";
    
    const firstMessage = messages[0];
    const content = typeof firstMessage.content === 'string' 
      ? firstMessage.content 
      : firstMessage.content.text;
    
    return content.substring(0, 30) + (content.length > 30 ? "..." : "");
  }
}
