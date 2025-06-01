
import { Message } from '@/types/chat';
import { QueryAnalysis, SuperAgentResponse } from '@/types/super-agent';
import { AgentRouterService } from './agentRouterService';
import { StatusStreamService } from './statusStreamService';
import { SimulationEngine } from './simulationEngine';
import { OpenAIService } from '../openaiService';
import { SUPER_AGENT_PROMPT_RESPONSES, SUPER_AGENT_ACTION_RESPONSES } from '@/data/superAgentPromptResponses';
import { RESPONSE_TEMPLATES, AGENT_RESPONSE_TEMPLATES, DEFAULT_ACTION_OPTIONS } from '@/data/superAgentResponses';
import { MOCK_USER_ACCOUNT } from '@/data/userAccountData';

export class SuperAgentOrchestrator {
  static async processQuery(query: string): Promise<{
    analysis: QueryAnalysis;
    statusUpdates: Generator<string, void, unknown>;
    response: Promise<SuperAgentResponse>;
  }> {
    // Check if this is a specific prompt from the Super Agent prompts
    const promptResponse = SUPER_AGENT_PROMPT_RESPONSES[query];
    if (promptResponse) {
      // For specific prompts, use pre-defined responses
      const analysis = AgentRouterService.analyzeQuery(query);
      const statusUpdates = StatusStreamService.createStatusStream(analysis);
      const response = Promise.resolve(promptResponse);
      
      return {
        analysis,
        statusUpdates,
        response
      };
    }

    // Analyze query for routing decision
    const analysis = AgentRouterService.analyzeQuery(query);
    const statusUpdates = StatusStreamService.createStatusStream(analysis);
    
    // Use OpenAI for intent classification and response generation
    const response = this.generateIntelligentResponse(analysis, query);
    
    return {
      analysis,
      statusUpdates,
      response
    };
  }

  private static async generateIntelligentResponse(
    analysis: QueryAnalysis, 
    query: string
  ): Promise<SuperAgentResponse> {
    try {
      // Step 1: Classification call to determine if within agent scope
      const classificationPrompt = `Analyze this St. Louis city services query and determine if it relates to: water billing, property records, business licenses, utilities, county services, or general government services.

Query: "${query}"

Respond with:
- "IN_SCOPE" if it relates to city services, departments, billing, permits, licenses, property, utilities, or government processes
- "OUT_OF_SCOPE" if it's about general topics, weather, sports, entertainment, or unrelated subjects

Classification:`;

      const classification = await OpenAIService.generateResponse([
        { role: 'user', content: classificationPrompt }
      ]);

      if (classification.includes('IN_SCOPE')) {
        // Route to internal simulation logic
        return this.generateSimulatedResponse(analysis, query);
      } else {
        // Make second API call for general response
        const generalResponse = await OpenAIService.generateResponse([
          { role: 'user', content: query }
        ]);

        return {
          text: `🤖 **General Information Response**\n\n${generalResponse}\n\n*Note: For St. Louis city services, I can provide more detailed assistance with water billing, property records, business licenses, and other municipal services.*`,
          sources: ['OpenAI GPT-4o'],
          operations: [],
          options: [
            { text: 'Ask About City Services', action: 'ask_city_services', type: 'primary' },
            { text: 'Contact Support', action: 'contact_support', type: 'secondary' }
          ]
        };
      }
    } catch (error) {
      console.warn('OpenAI classification failed, falling back to simulation:', error);
      // Fallback to simulation on error
      return this.generateSimulatedResponse(analysis, query);
    }
  }

  private static async generateSimulatedResponse(
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

  static async processAction(action: string): Promise<SuperAgentResponse> {
    // Add minimum 3-second delay for all actions
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Check if we have a specific response for this action
    const actionResponse = SUPER_AGENT_ACTION_RESPONSES[action];
    if (actionResponse) {
      return actionResponse;
    }

    // Try OpenAI for unknown actions
    try {
      const actionPrompt = `User selected action: "${action}". As a St. Louis city services super agent, provide a helpful follow-up response that processes this request and provides next steps or confirmation. Include realistic details about St. Louis city services.`;
      
      const openaiResponse = await OpenAIService.generateResponse([
        { role: 'user', content: actionPrompt }
      ]);

      return {
        text: openaiResponse,
        sources: ['Super Agent Action Processing System'],
        operations: [],
        options: [
          { text: 'Continue Process', action: 'continue_process', type: 'primary' },
          { text: 'Get More Information', action: 'get_more_info', type: 'secondary' }
        ],
        showFeedback: true
      };
    } catch (error) {
      // Fallback to generic response
      return {
        text: `Action "${action}" has been processed successfully. The relevant departments have been notified and any necessary follow-up steps have been initiated.

You should receive confirmation within 1-2 business days for any actions requiring additional processing.`,
        sources: ['Super Agent Action Processing System'],
        operations: [],
        options: []
      };
    }
  }

  private static buildComprehensiveResponse(
    analysis: QueryAnalysis,
    query: string,
    operations: any[],
    accountData?: typeof MOCK_USER_ACCOUNT
  ): SuperAgentResponse {
    const responses = this.getConsolidatedAgentResponses(analysis);
    const sources = this.generateSources(analysis);

    return {
      text: this.combineResponses(responses, accountData),
      sources,
      operations,
      accountData,
      options: DEFAULT_ACTION_OPTIONS,
      showFeedback: true
    };
  }

  private static getConsolidatedAgentResponses(analysis: QueryAnalysis): string[] {
    const responses: string[] = [];
    
    // Consolidated response templates from all legacy agents
    const consolidatedTemplates = {
      water: 'Water Department: Account verified, billing history retrieved, service status confirmed.',
      property: 'Property Records: Assessment data located, tax information current, ownership verified.',
      business: 'Business Services: License status checked, permit requirements identified, application ready.',
      utilities: 'Utilities Division: Service connections verified, usage patterns analyzed, billing reconciled.',
      county: 'County Services: Records accessed, documentation verified, cross-department coordination complete.',
      city: 'City Services: Municipal records reviewed, policy compliance verified, department coordination active.'
    };
    
    // Get response from primary agent
    responses.push(consolidatedTemplates[analysis.primaryAgent as keyof typeof consolidatedTemplates] || 
                  `${analysis.primaryAgent}: Processing your request with full department coordination...`);
    
    // Get responses from secondary agents
    analysis.secondaryAgents.forEach(agentId => {
      responses.push(consolidatedTemplates[agentId as keyof typeof consolidatedTemplates] || 
                    `${agentId}: Cross-referencing data and providing support...`);
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
        showFeedback: response.showFeedback,
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
