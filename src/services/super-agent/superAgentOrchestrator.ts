
import { Message } from '@/types/chat';
import { QueryAnalysis, SuperAgentResponse } from '@/types/super-agent';
import { AgentRouterService } from './agentRouterService';
import { StatusStreamService } from './statusStreamService';
import { SimulationEngine } from './simulationEngine';
import { RESPONSE_TEMPLATES, AGENT_RESPONSE_TEMPLATES, DEFAULT_ACTION_OPTIONS } from '@/data/superAgentResponses';
import { MOCK_USER_ACCOUNT } from '@/data/userAccountData';

export class SuperAgentOrchestrator {
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
    const operations = SimulationEngine.simulateOperations(analysis);
    
    // Get user account data if needed
    const accountData = analysis.requiredData.includes('account') 
      ? MOCK_USER_ACCOUNT 
      : undefined;

    // Generate comprehensive response
    const response = this.buildComprehensiveResponse(analysis, query, operations, accountData);
    
    return response;
  }

  private static buildComprehensiveResponse(
    analysis: QueryAnalysis,
    query: string,
    operations: any[],
    accountData?: typeof MOCK_USER_ACCOUNT
  ): SuperAgentResponse {
    const responses = this.getAgentResponses(analysis);
    const sources = this.generateSources(analysis);

    return {
      text: this.combineResponses(responses, accountData),
      sources,
      operations,
      accountData,
      options: DEFAULT_ACTION_OPTIONS
    };
  }

  private static getAgentResponses(analysis: QueryAnalysis): string[] {
    const responses: string[] = [];
    
    // Get response from primary agent
    responses.push(AGENT_RESPONSE_TEMPLATES[analysis.primaryAgent] || `${analysis.primaryAgent}: Processing your request...`);
    
    // Get responses from secondary agents
    analysis.secondaryAgents.forEach(agentId => {
      responses.push(AGENT_RESPONSE_TEMPLATES[agentId] || `${agentId}: Processing your request...`);
    });
    
    return responses;
  }

  private static combineResponses(responses: string[], accountData?: typeof MOCK_USER_ACCOUNT): string {
    let combinedText = RESPONSE_TEMPLATES.header;
    
    if (accountData) {
      combinedText += RESPONSE_TEMPLATES.accountSection;
      combinedText += `Address: ${accountData.address}\n`;
      combinedText += `Water Balance: $${accountData.accounts.water.balance}\n`;
      combinedText += `Property Assessment: $${accountData.accounts.property.assessment.toLocaleString()}\n\n`;
    }
    
    combinedText += RESPONSE_TEMPLATES.resultsSection;
    responses.forEach((response, index) => {
      combinedText += `${index + 1}. ${response}\n`;
    });
    
    combinedText += RESPONSE_TEMPLATES.verificationSection;
    combinedText += RESPONSE_TEMPLATES.verificationText;
    
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
