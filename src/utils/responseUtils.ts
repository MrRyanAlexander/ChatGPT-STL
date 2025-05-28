
import { INTERACTIVE_RESPONSES, FOLLOW_UP_RESPONSES } from "@/data/responses";

export const getInteractiveResponse = (agentId: string | undefined, prompt: string): any => {
  // Check if we have a specific response for this agent and prompt
  if (agentId && INTERACTIVE_RESPONSES[agentId]?.[prompt]) {
    return INTERACTIVE_RESPONSES[agentId][prompt];
  }
  
  // If no specific response, generate a generic one
  return {
    text: `This is a simulated response about ${agentId || "general St. Louis information"} regarding: "${prompt}"`,
    options: []
  };
};

export const getFollowUpResponse = (agentId: string | undefined, action: string): any => {
  if (agentId && FOLLOW_UP_RESPONSES[agentId]?.[action]) {
    return FOLLOW_UP_RESPONSES[agentId][action];
  }
  
  // If no specific follow-up, generate a generic one
  return {
    text: `Follow-up action for "${action}" selected.`,
    options: [],
    showFeedback: true
  };
};

export const formatAgentName = (agentId: string | undefined): string | null => {
  if (!agentId) return null;
  return agentId.charAt(0).toUpperCase() + agentId.slice(1);
};

export const formatTimeStamp = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
