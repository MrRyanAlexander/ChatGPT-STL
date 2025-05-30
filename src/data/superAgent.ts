
export const SUPER_AGENT_PROMPTS = [
  "Help me resolve a water billing dispute with supporting documentation",
  "Find all my city services and their current status across departments", 
  "Coordinate a business license application with all required departments",
  "Research and cross-reference my property tax assessment with recent changes"
];

export const SUPER_AGENT_CONFIG = {
  name: "Super Agent",
  description: "Advanced multi-agent coordination system",
  icon: "🤖",
  placeholder: "Ask me to coordinate across multiple departments...",
  maxComplexityAgents: 3,
  statusUpdateDelay: {
    min: 400,
    max: 800,
    base: 800
  }
};

export const AGENT_DISPLAY_NAMES: Record<string, string> = {
  water: 'Water Department',
  property: 'Property Records',
  business: 'Business Services',
  utilities: 'Utilities Division',
  county: 'County Services',
  gov: 'Government Services'
};

export const AGENT_KEYWORDS = {
  water: ['water', 'bill', 'billing', 'usage', 'leak', 'pressure', 'outage', 'meter'],
  property: ['property', 'tax', 'assessment', 'real estate', 'deed', 'title', 'ownership'],
  business: ['business', 'license', 'permit', 'application', 'registration', 'llc', 'company'],
  utilities: ['electric', 'gas', 'power', 'energy', 'ameren', 'utility', 'service'],
  county: ['county', 'marriage', 'birth', 'death', 'certificate', 'record', 'vital'],
  gov: ['government', 'city', 'municipal', 'ordinance', 'law', 'regulation', 'policy']
};

export const INTENT_PATTERNS = {
  payment: ['pay', 'payment', 'bill', 'charge', 'fee', 'cost', 'balance'],
  inquiry: ['what', 'how', 'when', 'where', 'why', 'status', 'information'],
  application: ['apply', 'application', 'request', 'submit', 'file'],
  dispute: ['dispute', 'problem', 'issue', 'complaint', 'error', 'wrong'],
  coordination: ['multiple', 'several', 'both', 'all', 'coordinate', 'together']
};
