
import { v4 as uuidv4 } from "uuid";
import { Message } from "@/types/chat";
import { AgentId } from "@/types/agent";
import { getInteractiveResponse, getFollowUpResponse } from "@/utils/responseUtils";
import { OpenAIService } from "./openaiService";

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
    try {
      // Try OpenAI first if API key is available
      const localKey = localStorage.getItem('OPENAI_KEY');
      const envKey = import.meta.env?.VITE_OPENAI_KEY;
      const openaiKey = localKey || envKey;
      
      if (openaiKey) {
        const openaiResponse = await OpenAIService.generateResponse([
          { role: 'user', content: prompt }
        ]);
        
        return {
          role: "assistant",
          content: openaiResponse,
          timestamp: new Date(),
        };
      }
    } catch (error) {
      console.warn('OpenAI service failed, falling back to local responses:', error);
    }

    // Fallback to local responses
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
    try {
      // Try OpenAI first if API key is available
      const localKey = localStorage.getItem('OPENAI_KEY');
      const envKey = import.meta.env?.VITE_OPENAI_KEY;
      const openaiKey = localKey || envKey;
      
      if (openaiKey) {
        const contextPrompt = `User selected action: "${action}". Provide a helpful follow-up response as if you're processing this request and providing next steps or confirmation.`;
        
        const openaiResponse = await OpenAIService.generateResponse([
          { role: 'user', content: contextPrompt }
        ]);
        
        return {
          role: "assistant",
          content: {
            text: openaiResponse,
            showFeedback: true
          },
          timestamp: new Date(),
        };
      }
    } catch (error) {
      console.warn('OpenAI service failed for follow-up, falling back to local responses:', error);
    }

    // Fallback to local responses
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
