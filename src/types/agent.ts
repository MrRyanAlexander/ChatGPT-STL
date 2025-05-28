
export interface AgentItem {
  name: string;
  slug: string;
}

export interface AgentCategory {
  name: string;
  items: AgentItem[];
}

export type AgentId = string;
