
export interface AgentItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  avatar?: string;
  isActive?: boolean;
  metadata?: Record<string, any>;
}

export interface AgentCategory {
  id: string;
  name: string;
  description?: string;
  items: AgentItem[];
  order?: number;
  isVisible?: boolean;
}

export type AgentId = string;

export interface AgentConfig {
  prompts: string[];
  responses: Record<string, any>;
  settings: {
    temperature?: number;
    maxTokens?: number;
    model?: string;
  };
}

export interface AgentCapability {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}
