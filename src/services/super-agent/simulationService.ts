
import { SimulatedOperation, UserAccountData, QueryAnalysis } from '@/types/super-agent';

export class SimulationService {
  private static readonly MOCK_USER_ACCOUNT: UserAccountData = {
    address: "1234 Example St, St. Louis MO 63108",
    accounts: {
      water: { 
        balance: 78.45, 
        lastPayment: "2024-11-15", 
        usage: 3200 
      },
      property: { 
        assessment: 195800, 
        taxes: 2850, 
        lastAssessment: "2024-01-01" 
      },
      business: { 
        licenses: ["Food Service License", "Retail Sales License"], 
        applications: ["Liquor License - Pending"] 
      }
    },
    preferences: {
      notifications: true,
      autopay: false,
      language: "en"
    }
  };

  static simulateOperations(analysis: QueryAnalysis): SimulatedOperation[] {
    const operations: SimulatedOperation[] = [];
    
    // Add database operations based on agents involved
    if (analysis.primaryAgent === 'water' || analysis.secondaryAgents.includes('water')) {
      operations.push({
        type: 'database',
        target: 'St. Louis Water Division Database',
        status: 'completed',
        result: { records_found: 156, last_updated: '2024-11-20' }
      });
    }
    
    if (analysis.primaryAgent === 'property' || analysis.secondaryAgents.includes('property')) {
      operations.push({
        type: 'database',
        target: 'County Property Records System',
        status: 'completed',
        result: { assessment_year: 2024, verified: true }
      });
    }
    
    // Add web search simulation for complex queries
    if (analysis.complexity === 'complex') {
      operations.push({
        type: 'web_search',
        target: 'Current St. Louis Service Alerts',
        status: 'completed',
        result: { alerts_found: 2, maintenance_scheduled: true }
      });
    }
    
    // Add account access for relevant queries
    if (analysis.requiredData.includes('account')) {
      operations.push({
        type: 'account_access',
        target: 'User Account Profile',
        status: 'completed',
        result: { profile_verified: true, last_login: '2024-11-20' }
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

  static getUserAccountData(): UserAccountData {
    return this.MOCK_USER_ACCOUNT;
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
    const vendors: Record<string, any> = {
      'ameren': { service_status: 'active', last_bill: 125.67 },
      'msd': { account_status: 'current', next_service: '2024-12-01' },
      'boeing': { hr_verified: true, employment_status: 'active' }
    };
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          vendor,
          status: 'connected',
          data: vendors[vendor] || { status: 'no_data' }
        });
      }, 800 + Math.random() * 700);
    });
  }
}
