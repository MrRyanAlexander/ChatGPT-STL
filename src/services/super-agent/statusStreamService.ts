
import { QueryAnalysis, StatusUpdate } from '@/types/super-agent';

export class StatusStreamService {
  static *createStatusStream(analysis: QueryAnalysis): Generator<string, void, unknown> {
    const updates = this.generateStatusUpdates(analysis);
    
    for (const update of updates) {
      yield update.message;
    }
  }

  private static generateStatusUpdates(analysis: QueryAnalysis): StatusUpdate[] {
    const updates: StatusUpdate[] = [];
    let step = 1;
    
    // Initial analysis
    updates.push({
      step: step++,
      message: "🤖 Analyzing your request...",
      delay: 800,
      type: 'thinking'
    });
    
    // Complexity assessment
    if (analysis.complexity === 'complex') {
      updates.push({
        step: step++,
        message: "🔍 Detected multi-domain request, coordinating agents...",
        delay: 1000,
        type: 'processing'
      });
    }
    
    // Primary agent call
    updates.push({
      step: step++,
      message: `📞 Calling ${this.formatAgentName(analysis.primaryAgent)} agent...`,
      delay: 1200,
      type: 'calling',
      agentId: analysis.primaryAgent
    });
    
    // Account access simulation
    if (analysis.requiredData.includes('account')) {
      updates.push({
        step: step++,
        message: "🔐 Accessing your account information...",
        delay: 1000,
        type: 'searching'
      });
    }
    
    // Database queries
    updates.push({
      step: step++,
      message: `🗄️ Querying ${this.formatAgentName(analysis.primaryAgent)} database...`,
      delay: 1500,
      type: 'searching'
    });
    
    // Secondary agents
    analysis.secondaryAgents.forEach(agentId => {
      updates.push({
        step: step++,
        message: `🔗 Cross-referencing with ${this.formatAgentName(agentId)} system...`,
        delay: 1000,
        type: 'calling',
        agentId
      });
    });
    
    // MCP communication simulation
    if (analysis.complexity === 'complex') {
      updates.push({
        step: step++,
        message: "🌐 Coordinating with external systems via MCP...",
        delay: 1200,
        type: 'processing'
      });
    }
    
    // Data verification
    updates.push({
      step: step++,
      message: "✅ Verifying data accuracy across systems...",
      delay: 800,
      type: 'processing'
    });
    
    // Final response generation
    updates.push({
      step: step++,
      message: "📋 Generating comprehensive response...",
      delay: 600,
      type: 'completing'
    });
    
    return updates;
  }

  private static formatAgentName(agentId: string): string {
    const agentNames: Record<string, string> = {
      water: 'Water Department',
      property: 'Property Records',
      business: 'Business Services',
      utilities: 'Utilities Division',
      county: 'County Services',
      gov: 'Government Services'
    };
    
    return agentNames[agentId] || agentId.charAt(0).toUpperCase() + agentId.slice(1);
  }

  static async streamWithDelay(
    updates: Generator<string, void, unknown>,
    onUpdate: (message: string) => void
  ): Promise<void> {
    for (const message of updates) {
      onUpdate(message);
      // Simulate real-time delay
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
    }
  }
}
