
import { SimulatedOperation, QueryAnalysis } from '@/types/super-agent';
import { MOCK_USER_ACCOUNT, MOCK_OPERATION_RESULTS } from '@/data/userAccountData';

export class SimulationEngine {
  static simulateOperations(analysis: QueryAnalysis): SimulatedOperation[] {
    const operations: SimulatedOperation[] = [];
    
    // Add database operations based on agents involved
    if (analysis.primaryAgent === 'water' || analysis.secondaryAgents.includes('water')) {
      operations.push({
        type: 'database',
        target: 'St. Louis Water Division Database',
        status: 'completed',
        result: MOCK_OPERATION_RESULTS.waterDatabase
      });
    }
    
    if (analysis.primaryAgent === 'property' || analysis.secondaryAgents.includes('property')) {
      operations.push({
        type: 'database',
        target: 'County Property Records System',
        status: 'completed',
        result: MOCK_OPERATION_RESULTS.propertyRecords
      });
    }
    
    // Add web search simulation for complex queries
    if (analysis.complexity === 'complex') {
      operations.push({
        type: 'web_search',
        target: 'Current St. Louis Service Alerts',
        status: 'completed',
        result: MOCK_OPERATION_RESULTS.webSearch
      });
    }
    
    // Add account access for relevant queries
    if (analysis.requiredData.includes('account')) {
      operations.push({
        type: 'account_access',
        target: 'User Account Profile',
        status: 'completed',
        result: MOCK_OPERATION_RESULTS.accountAccess
      });
    }
    
    // Add MCP communication for multi-agent scenarios
    if (analysis.secondaryAgents.length > 1) {
      operations.push({
        type: 'mcp_communication',
        target: 'Inter-System Coordination Protocol',
        status: 'completed',
        result: { systems_coordinated: analysis.secondaryAgents.length + 1 }
      });
    }
    
    return operations;
  }

  static getUserAccountData() {
    return MOCK_USER_ACCOUNT;
  }

  static simulateApiCall(endpoint: string): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'success',
          endpoint,
          timestamp: new Date().toISOString(),
          data: { message: `Simulated response from ${endpoint}` }
        });
      }, 500 + Math.random() * 1000);
    });
  }

  static simulateThirdPartyIntegration(vendor: string): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          vendor,
          status: 'connected',
          data: MOCK_OPERATION_RESULTS.thirdPartyVendors[vendor as keyof typeof MOCK_OPERATION_RESULTS.thirdPartyVendors] || { status: 'no_data' }
        });
      }, 800 + Math.random() * 700);
    });
  }
}
