
interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class OpenAIService {
  private static getApiKey(): string {
    // Check localStorage first, then fallback to import.meta.env (Vite environment)
    const localKey = localStorage.getItem('OPENAI_KEY');
    const envKey = import.meta.env?.VITE_OPENAI_KEY;
    
    return localKey || envKey || '';
  }

  static async generateResponse(
    messages: OpenAIMessage[],
    agentId?: string
  ): Promise<string> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      throw new Error('OpenAI API key not found. Please set your API key in Settings.');
    }

    // Add system context based on agent
    const systemMessage = this.getSystemMessage(agentId);
    const fullMessages = [systemMessage, ...messages];

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o', // Using GPT-4o as it's the latest stable model
          messages: fullMessages,
          temperature: 0.7,
          max_tokens: 1000,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}${errorData.error?.message ? ` - ${errorData.error.message}` : ''}`);
      }

      const data: OpenAIResponse = await response.json();
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response generated from OpenAI');
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API call failed:', error);
      throw error;
    }
  }

  private static getSystemMessage(agentId?: string): OpenAIMessage {
    const basePrompt = "You are a helpful AI assistant for St. Louis city services. Provide accurate, helpful responses and offer actionable next steps when appropriate.";
    
    const agentPrompts: Record<string, string> = {
      water: "You are a St. Louis water department assistant. Help with billing, service issues, and water-related inquiries.",
      trash: "You are a St. Louis waste management assistant. Help with pickup schedules, bulk waste, and recycling information.",
      sewer: "You are a St. Louis sewer and drainage assistant. Help with maintenance, billing, and infrastructure issues.",
      boeing: "You are a Boeing St. Louis careers assistant. Help with job searches, applications, and company information.",
      dierbergs: "You are a Dierbergs grocery assistant. Help with store locations, delivery, and shopping services.",
      monsanto: "You are a Monsanto/Bayer St. Louis history and facilities assistant. Provide information about the company's legacy in St. Louis."
    };

    return {
      role: 'system',
      content: agentPrompts[agentId || ''] || basePrompt
    };
  }

  // Method to test API key validity
  static async testApiKey(): Promise<boolean> {
    try {
      await this.generateResponse([
        { role: 'user', content: 'Hello' }
      ]);
      return true;
    } catch (error) {
      return false;
    }
  }
}
