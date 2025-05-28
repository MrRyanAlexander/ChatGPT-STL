
import { QueryAnalysis } from '@/types/super-agent';
import { AGENT_KEYWORDS, INTENT_PATTERNS } from '@/data/superAgent';

export class AgentRouterService {
  static analyzeQuery(query: string): QueryAnalysis {
    const normalizedQuery = query.toLowerCase();
    const words = normalizedQuery.split(/\s+/);
    
    // Extract keywords
    const keywords = this.extractKeywords(words);
    
    // Detect intents
    const intents = this.detectIntents(words);
    
    // Determine agents
    const agentScores = this.scoreAgents(words);
    const primaryAgent = this.getPrimaryAgent(agentScores);
    const secondaryAgents = this.getSecondaryAgents(agentScores, primaryAgent);
    
    // Determine required data
    const requiredData = this.identifyDataNeeds(intents, agentScores);
    
    // Assess complexity
    const complexity = this.assessComplexity(agentScores, intents);
    
    return {
      keywords,
      intents,
      primaryAgent,
      secondaryAgents,
      requiredData,
      complexity
    };
  }

  private static extractKeywords(words: string[]): string[] {
    const keywords: string[] = [];
    
    Object.entries(AGENT_KEYWORDS).forEach(([agent, agentKeywords]) => {
      agentKeywords.forEach(keyword => {
        if (words.some(word => word.includes(keyword))) {
          keywords.push(keyword);
        }
      });
    });
    
    return [...new Set(keywords)];
  }

  private static detectIntents(words: string[]): string[] {
    const intents: string[] = [];
    
    Object.entries(INTENT_PATTERNS).forEach(([intent, patterns]) => {
      if (patterns.some(pattern => words.some(word => word.includes(pattern)))) {
        intents.push(intent);
      }
    });
    
    return intents;
  }

  private static scoreAgents(words: string[]): Record<string, number> {
    const scores: Record<string, number> = {};
    
    Object.entries(AGENT_KEYWORDS).forEach(([agent, keywords]) => {
      scores[agent] = 0;
      keywords.forEach(keyword => {
        if (words.some(word => word.includes(keyword))) {
          scores[agent] += 1;
        }
      });
    });
    
    return scores;
  }

  private static getPrimaryAgent(scores: Record<string, number>): string {
    const sortedAgents = Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .filter(([,score]) => score > 0);
    
    return sortedAgents.length > 0 ? sortedAgents[0][0] : 'gov';
  }

  private static getSecondaryAgents(
    scores: Record<string, number>, 
    primaryAgent: string
  ): string[] {
    return Object.entries(scores)
      .filter(([agent, score]) => agent !== primaryAgent && score > 0)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2)
      .map(([agent]) => agent);
  }

  private static identifyDataNeeds(
    intents: string[], 
    agentScores: Record<string, number>
  ): string[] {
    const dataNeeds: string[] = [];
    
    // If any agent is involved, we likely need account data
    if (Object.values(agentScores).some(score => score > 0)) {
      dataNeeds.push('account');
    }
    
    // Payment intents need billing data
    if (intents.includes('payment')) {
      dataNeeds.push('billing');
    }
    
    // Property agent needs assessment data
    if (agentScores.property > 0) {
      dataNeeds.push('property_records');
    }
    
    // Business agent needs license data
    if (agentScores.business > 0) {
      dataNeeds.push('business_records');
    }
    
    return dataNeeds;
  }

  private static assessComplexity(
    agentScores: Record<string, number>, 
    intents: string[]
  ): 'simple' | 'medium' | 'complex' {
    const agentCount = Object.values(agentScores).filter(score => score > 0).length;
    const intentCount = intents.length;
    
    if (agentCount >= 3 || intentCount >= 3 || intents.includes('coordination')) {
      return 'complex';
    } else if (agentCount >= 2 || intentCount >= 2) {
      return 'medium';
    }
    
    return 'simple';
  }
}
