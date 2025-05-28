
export interface AgentOrchestrationStep {
  id: string;
  agentId: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
  message: string;
  timestamp: Date;
  duration?: number;
}

export interface StatusUpdate {
  step: number;
  message: string;
  delay: number;
  type: 'thinking' | 'calling' | 'searching' | 'processing' | 'completing';
  agentId?: string;
}

export interface SimulatedOperation {
  type: 'database' | 'web_search' | 'account_access' | 'api_call' | 'mcp_communication';
  target: string;
  status: 'pending' | 'active' | 'completed';
  result?: any;
}

export interface UserAccountData {
  address: string;
  accounts: {
    water: { balance: number; lastPayment: string; usage: number };
    property: { assessment: number; taxes: number; lastAssessment: string };
    business: { licenses: string[]; applications: string[] };
  };
  preferences: {
    notifications: boolean;
    autopay: boolean;
    language: string;
  };
}

export interface SuperAgentResponse {
  text: string;
  sources: string[];
  operations: SimulatedOperation[];
  accountData?: Partial<UserAccountData>;
  options?: Array<{
    text: string;
    action: string;
    type: 'primary' | 'secondary';
  }>;
}

export interface QueryAnalysis {
  keywords: string[];
  intents: string[];
  primaryAgent: string;
  secondaryAgents: string[];
  requiredData: string[];
  complexity: 'simple' | 'medium' | 'complex';
}
