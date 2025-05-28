
import { Message } from '@/types/chat';
import { QueryAnalysis, SuperAgentResponse, UserAccountData } from '@/types/super-agent';
import { AgentRouterService } from './agentRouterService';
import { StatusStreamService } from './statusStreamService';
import { SimulationService } from './simulationService';

export class SuperAgentService {
  static async processQuery(query: string): Promise<{
    analysis: QueryAnalysis;
    statusUpdates: Generator<string, void, unknown>;
    response: Promise<SuperAgentResponse>;
  }> {
    // Analyze the query to determine routing and complexity
    const analysis = AgentRouterService.analyzeQuery(query);
    
    // Create status update stream
    const statusUpdates = StatusStreamService.createStatusStream(analysis);
    
    // Generate the comprehensive response
    const response = this.generateSuperAgentResponse(analysis, query);
    
    return {
      analysis,
      statusUpdates,
      response
    };
  }

  private static async generateSuperAgentResponse(
    analysis: QueryAnalysis, 
    query: string
  ): Promise<SuperAgentResponse> {
    // Simulate processing time based on complexity
    const baseDelay = analysis.complexity === 'complex' ? 3000 : 
                     analysis.complexity === 'medium' ? 2000 : 1000;
    
    await new Promise(resolve => setTimeout(resolve, baseDelay));

    // Get simulated operations
    const operations = SimulationService.simulateOperations(analysis);
    
    // Get user account data if needed
    const accountData = analysis.requiredData.includes('account') 
      ? SimulationService.getUserAccountData() 
      : undefined;

    // Generate comprehensive response
    const response = this.buildComprehensiveResponse(analysis, query, operations, accountData);
    
    return response;
  }

  private static buildComprehensiveResponse(
    analysis: QueryAnalysis,
    query: string,
    operations: any[],
    accountData?: UserAccountData
  ): SuperAgentResponse {
    const responses = this.getAgentResponses(analysis, query);
    const sources = this.generateSources(analysis);
    const options = this.generateActionOptions(analysis);

    return {
      text: this.combineResponses(responses, accountData),
      sources,
      operations,
      accountData,
      options
    };
  }

  private static getAgentResponses(analysis: QueryAnalysis, query: string): string[] {
    const responses: string[] = [];
    
    // Get response from primary agent
    responses.push(this.getAgentResponse(analysis.primaryAgent, query));
    
    // Get responses from secondary agents
    analysis.secondaryAgents.forEach(agentId => {
      responses.push(this.getAgentResponse(agentId, query));
    });
    
    return responses;
  }

  private static getAgentResponse(agentId: string, query: string): string {
    // Simulate getting response from specific agent
    const agentResponses: Record<string, string> = {
      'water': `Water Department: Found your account information and billing history.`,
      'property': `Property Records: Retrieved current assessment and tax information.`,
      'business': `Business Services: Located your license applications and requirements.`,
      'utilities': `Utilities: Checked service status and connection information.`,
      'county': `County Services: Verified records and cross-referenced data.`
    };
    
    return agentResponses[agentId] || `${agentId}: Processing your request...`;
  }

  private static combineResponses(responses: string[], accountData?: UserAccountData): string {
    let combinedText = "🤖 **Comprehensive Analysis Complete**\n\n";
    
    if (accountData) {
      combinedText += `🏠 **Account Information**\n`;
      combinedText += `Address: ${accountData.address}\n`;
      combinedText += `Water Balance: $${accountData.accounts.water.balance}\n`;
      combinedText += `Property Assessment: $${accountData.accounts.property.assessment.toLocaleString()}\n\n`;
    }
    
    combinedText += "📊 **Agent Coordination Results**\n";
    responses.forEach((response, index) => {
      combinedText += `${index + 1}. ${response}\n`;
    });
    
    combinedText += "\n✅ **Cross-System Verification Complete**\n";
    combinedText += "All data sources have been verified and cross-referenced for accuracy.";
    
    return combinedText;
  }

  private static generateSources(analysis: QueryAnalysis): string[] {
    const sources = [`${analysis.primaryAgent} Department Database`];
    
    analysis.secondaryAgents.forEach(agent => {
      sources.push(`${agent} System Records`);
    });
    
    sources.push('St. Louis City Integration Hub');
    
    return sources;
  }

  private static generateActionOptions(analysis: QueryAnalysis): Array<{
    text: string;
    action: string;
    type: 'primary' | 'secondary';
  }> {
    return [
      { text: 'View Detailed Report', action: 'view_report', type: 'primary' },
      { text: 'Schedule Follow-up', action: 'schedule_followup', type: 'secondary' },
      { text: 'Contact Department', action: 'contact_dept', type: 'secondary' },
      { text: 'Save to Account', action: 'save_account', type: 'secondary' }
    ];
  }

  static generateUserMessage(content: string): Message {
    return {
      role: "user",
      content,
      timestamp: new Date(),
    };
  }

  static generateAIMessage(response: SuperAgentResponse): Message {
    return {
      role: "assistant",
      content: {
        text: response.text,
        options: response.options,
        metadata: {
          sources: response.sources,
          operations: response.operations,
          accountData: response.accountData
        }
      },
      timestamp: new Date(),
    };
  }
}
