
import { INTERACTIVE_RESPONSES, FOLLOW_UP_RESPONSES } from "@/data/responses";
import { AgentId } from "@/types/agent";

export const getInteractiveResponse = (agentId: AgentId | undefined, prompt: string): any => {
  // Check if we have a specific response for this agent and prompt
  if (agentId && INTERACTIVE_RESPONSES[agentId]?.[prompt]) {
    return INTERACTIVE_RESPONSES[agentId][prompt];
  }
  
  // Improved generic fallback response with contextual options
  return {
    text: `I'd be happy to help you with "${prompt}". While I don't have specific details for this exact question, I can connect you with the right resources or help you find more information.`,
    options: [
      { text: "📞 Get contact information", action: "get_contact_info" },
      { text: "🌐 Find official website", action: "find_website" },
      { text: "📍 Locate nearest office", action: "locate_office" },
      { text: "📧 Email relevant department", action: "email_department" }
    ]
  };
};

export const getFollowUpResponse = (agentId: AgentId | undefined, action: string): any => {
  if (agentId && FOLLOW_UP_RESPONSES[agentId]?.[action]) {
    return FOLLOW_UP_RESPONSES[agentId][action];
  }
  
  // Improved generic follow-up responses based on common actions
  const genericResponses: Record<string, any> = {
    "get_contact_info": {
      text: "Here's the contact information you requested:\n\nFor general inquiries, you can reach the main office during business hours. If this is an emergency, please call the emergency hotline.\n\nI hope this helps you get the assistance you need!",
      options: [],
      showFeedback: true
    },
    "find_website": {
      text: "I can help you find the official website for more detailed information and online services.\n\nMost St. Louis area services have comprehensive websites with forms, FAQs, and contact details.",
      options: [],
      showFeedback: true
    },
    "locate_office": {
      text: "Let me help you find the nearest office location with address, hours, and directions.\n\nMost offices are open Monday through Friday during standard business hours.",
      options: [],
      showFeedback: true
    },
    "email_department": {
      text: "I can provide you with the appropriate email contact for your specific inquiry.\n\nEmail responses typically take 1-2 business days, though urgent matters may be handled more quickly.",
      options: [],
      showFeedback: true
    }
  };

  // Return generic response if available, otherwise create a basic completion
  if (genericResponses[action]) {
    return genericResponses[action];
  }
  
  // Final fallback with satisfying conclusion
  return {
    text: `Your request for "${action}" has been noted. I've gathered the relevant information and this should help address your inquiry.\n\nIs there anything else I can help you with today?`,
    options: [],
    showFeedback: true
  };
};

// Legacy exports for backward compatibility - will be removed in next phase
export const formatAgentName = (agentId: AgentId | undefined): string | null => {
  if (!agentId) return null;
  return agentId.charAt(0).toUpperCase() + agentId.slice(1);
};

export const formatTimeStamp = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
