
import { UserAccountData } from '@/types/super-agent';

export const MOCK_USER_ACCOUNT: UserAccountData = {
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

export const MOCK_OPERATION_RESULTS = {
  waterDatabase: { records_found: 156, last_updated: '2024-11-20' },
  propertyRecords: { assessment_year: 2024, verified: true },
  webSearch: { alerts_found: 2, maintenance_scheduled: true },
  accountAccess: { profile_verified: true, last_login: '2024-11-20' },
  thirdPartyVendors: {
    'ameren': { service_status: 'active', last_bill: 125.67 },
    'msd': { account_status: 'current', next_service: '2024-12-01' },
    'boeing': { hr_verified: true, employment_status: 'active' }
  }
};
