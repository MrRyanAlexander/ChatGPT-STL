import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY || import.meta.env?.VITE_OPENAI_KEY || ""
});

interface OpenAIMessage {
  role: 'user';
  content: string;
}

export class OpenAIService {
  static async generateResponse(
    messages: OpenAIMessage[],
    effort: 'low' | 'medium' | 'high' = 'medium',
    model: string = 'gpt-4o'
  ): Promise<string> {
    if (!openai.apiKey) {
      throw new Error('OpenAI API key not found. Set OPENAI_KEY in your server environment.');
    }

    try {
      const response = await openai.responses.create({
        model,
        reasoning: { effort },
        input: messages
      });

      return response.output_text;
    } catch (error) {
      console.error("OpenAI Responses API call failed:", error);
      throw error;
    }
  }

  static async classifyScope(query: string): Promise<'IN_SCOPE' | 'OUT_OF_SCOPE' | 'UNKNOWN'> {
    const prompt = `Analyze this St. Louis city services query and determine if it relates to: water billing, property records, business licenses, utilities, county services, or general government services.

Query: "${query}"

Respond with:
- "IN_SCOPE" if it relates to city services, departments, billing, permits, licenses, property, utilities, or government processes
- "OUT_OF_SCOPE" if it's about general topics, weather, sports, entertainment, or unrelated subjects

Classification:`;

    const result = await this.generateResponse([{ role: 'user', content: prompt }]);
    if (result.includes('IN_SCOPE')) return 'IN_SCOPE';
    if (result.includes('OUT_OF_SCOPE')) return 'OUT_OF_SCOPE';
    return 'UNKNOWN';
  }

  static async testApiKey(): Promise<boolean> {
    try {
      const output = await this.generateResponse(
        [{ role: 'user', content: 'Say hello if you can hear me.' }],
        'low',
        'o4-mini'
      );
      return output.toLowerCase().includes('hello');
    } catch {
      return false;
    }
  }
}
