
import { QueryAnalysis } from '@/types/super-agent';
import { STATUS_UPDATE_TEMPLATES } from '@/data/superAgentResponses';
import { AGENT_DISPLAY_NAMES, SUPER_AGENT_CONFIG } from '@/data/superAgent';

export class StatusStreamService {
  static *createStatusStream(analysis: QueryAnalysis): Generator<string, void, unknown> {
    // Initial analysis
    yield STATUS_UPDATE_TEMPLATES.analyzing;
    
    // Complexity assessment
    if (analysis.complexity === 'complex') {
      yield STATUS_UPDATE_TEMPLATES.coordinating;
    }
    
    // Primary agent call
    yield STATUS_UPDATE_TEMPLATES.calling(this.formatAgentName(analysis.primaryAgent));
    
    // Account access simulation
    if (analysis.requiredData.includes('account')) {
      yield STATUS_UPDATE_TEMPLATES.accessing;
    }
    
    // Database queries
    yield STATUS_UPDATE_TEMPLATES.querying(this.formatAgentName(analysis.primaryAgent));
    
    // Secondary agents
    for (const agentId of analysis.secondaryAgents) {
      yield STATUS_UPDATE_TEMPLATES.crossReferencing(this.formatAgentName(agentId));
    }
    
    // MCP communication simulation
    if (analysis.complexity === 'complex') {
      yield STATUS_UPDATE_TEMPLATES.mcpCommunication;
    }
    
    // Data verification
    yield STATUS_UPDATE_TEMPLATES.verifying;
    
    // Final response generation
    yield STATUS_UPDATE_TEMPLATES.generating;
  }

  private static formatAgentName(agentId: string): string {
    return AGENT_DISPLAY_NAMES[agentId] || agentId.charAt(0).toUpperCase() + agentId.slice(1);
  }

  static async streamWithDelay(
    updates: Generator<string, void, unknown>,
    onUpdate: (message: string) => void
  ): Promise<void> {
    for (const message of updates) {
      onUpdate(message);
      // Simulate real-time delay using config
      const delay = SUPER_AGENT_CONFIG.statusUpdateDelay;
      await new Promise(resolve => 
        setTimeout(resolve, delay.base + Math.random() * delay.max)
      );
    }
  }
}
