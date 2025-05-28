
import { AGENT_CATEGORIES } from "@/data/agentCategories";
import { AGENT_PROMPTS, DEFAULT_PROMPTS } from "@/data/prompts";
import { AgentCategory, AgentId } from "@/types/agent";

export class AgentService {
  static getCategories(): AgentCategory[] {
    return AGENT_CATEGORIES;
  }

  static getAgentPrompts(agentId: AgentId): string[] {
    return AGENT_PROMPTS[agentId] || DEFAULT_PROMPTS;
  }

  static formatAgentName(agentId: AgentId | undefined): string | null {
    if (!agentId) return null;
    return agentId.charAt(0).toUpperCase() + agentId.slice(1);
  }

  static getDefaultPrompts(): string[] {
    return DEFAULT_PROMPTS;
  }

  static isValidAgent(agentId: string): boolean {
    return Object.keys(AGENT_PROMPTS).includes(agentId);
  }
}
