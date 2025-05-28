
export const AGENT_RESPONSE_TEMPLATES: Record<string, string> = {
  'water': `Water Department: Found your account information and billing history.`,
  'property': `Property Records: Retrieved current assessment and tax information.`,
  'business': `Business Services: Located your license applications and requirements.`,
  'utilities': `Utilities: Checked service status and connection information.`,
  'county': `County Services: Verified records and cross-referenced data.`
};

export const RESPONSE_TEMPLATES = {
  header: "🤖 **Comprehensive Analysis Complete**\n\n",
  accountSection: "🏠 **Account Information**\n",
  resultsSection: "📊 **Agent Coordination Results**\n",
  verificationSection: "\n✅ **Cross-System Verification Complete**\n",
  verificationText: "All data sources have been verified and cross-referenced for accuracy."
};

export const DEFAULT_ACTION_OPTIONS = [
  { text: 'View Detailed Report', action: 'view_report', type: 'primary' as const },
  { text: 'Schedule Follow-up', action: 'schedule_followup', type: 'secondary' as const },
  { text: 'Contact Department', action: 'contact_dept', type: 'secondary' as const },
  { text: 'Save to Account', action: 'save_account', type: 'secondary' as const }
];

export const STATUS_UPDATE_TEMPLATES = {
  analyzing: "🤖 Analyzing your request...",
  coordinating: "🔍 Detected multi-domain request, coordinating agents...",
  calling: (agentName: string) => `📞 Calling ${agentName} agent...`,
  accessing: "🔐 Accessing your account information...",
  querying: (agentName: string) => `🗄️ Querying ${agentName} database...`,
  crossReferencing: (agentName: string) => `🔗 Cross-referencing with ${agentName} system...`,
  mcpCommunication: "🌐 Coordinating with external systems via MCP...",
  verifying: "✅ Verifying data accuracy across systems...",
  generating: "📋 Generating comprehensive response..."
};
