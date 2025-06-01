
export const SUPER_AGENT_PROMPTS = [
  "Help me resolve a water billing dispute with supporting documentation",
  "Find all my city services and their current status across departments", 
  "Coordinate a business license application with all required departments",
  "Research and cross-reference my property tax assessment with recent changes"
];

export const SUPER_AGENT_CONFIG = {
  name: "Super Agent",
  description: "Advanced multi-department coordination system for all St. Louis city services",
  icon: "🤖",
  placeholder: "Ask me to coordinate across multiple city departments...",
  maxComplexityAgents: 5,
  statusUpdateDelay: {
    min: 600,
    max: 1200,
    base: 800
  }
};

export const AGENT_DISPLAY_NAMES: Record<string, string> = {
  water: 'Water Department',
  property: 'Property Records',
  business: 'Business Services',
  utilities: 'Utilities Division',
  county: 'County Services',
  city: 'City Government',
  fire: 'Fire Department',
  police: 'Police Department',
  health: 'Health Department'
};

export const AGENT_KEYWORDS = {
  water: ['water', 'bill', 'billing', 'usage', 'leak', 'pressure', 'outage', 'meter', 'sewer', 'drainage'],
  property: ['property', 'tax', 'assessment', 'real estate', 'deed', 'title', 'ownership', 'zoning'],
  business: ['business', 'license', 'permit', 'application', 'registration', 'llc', 'company', 'commercial'],
  utilities: ['electric', 'gas', 'power', 'energy', 'ameren', 'utility', 'service', 'connection'],
  county: ['county', 'marriage', 'birth', 'death', 'certificate', 'record', 'vital', 'court'],
  city: ['government', 'city', 'municipal', 'ordinance', 'law', 'regulation', 'policy', 'council'],
  fire: ['fire', 'safety', 'inspection', 'emergency', 'prevention', 'alarm', 'evacuation'],
  police: ['police', 'safety', 'crime', 'report', 'traffic', 'parking', 'violation'],
  health: ['health', 'restaurant', 'food', 'sanitation', 'public health', 'inspection']
};

export const INTENT_PATTERNS = {
  payment: ['pay', 'payment', 'bill', 'charge', 'fee', 'cost', 'balance', 'owe'],
  inquiry: ['what', 'how', 'when', 'where', 'why', 'status', 'information', 'check'],
  application: ['apply', 'application', 'request', 'submit', 'file', 'new'],
  dispute: ['dispute', 'problem', 'issue', 'complaint', 'error', 'wrong', 'incorrect'],
  coordination: ['multiple', 'several', 'both', 'all', 'coordinate', 'together', 'cross'],
  emergency: ['emergency', 'urgent', 'immediate', 'asap', 'help', 'crisis']
};
