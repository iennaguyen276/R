import { z } from 'zod';

export const AnalysisSchema = z.object({
  userScenarios: z.array(z.string()),
  functionalRequirements: z.array(z.string()),
  visualPrinciples: z.array(z.string()),
  informationArchitecture: z.array(z.string()),
  components: z.array(z.string()),
  brandElements: z.array(z.string()),
});

export type Analysis = z.infer<typeof AnalysisSchema>;

export interface PerplexityClientOptions {
  apiKey?: string;
  model?: string;
}

export class PerplexityClient {
  private readonly apiKey: string;
  private readonly model: string;

  constructor(options: PerplexityClientOptions = {}) {
    this.apiKey = options.apiKey ?? process.env.PERPLEXITY_API_KEY ?? '';
    this.model = options.model ?? process.env.PERPLEXITY_MODEL ?? 'sonar-pro';
    if (!this.apiKey) {
      throw new Error('PERPLEXITY_API_KEY is required');
    }
  }

  async analyze(prompt: string): Promise<Analysis> {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: 'system', content: 'You are a senior UX researcher. Return strict JSON.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 2048,
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Perplexity API error: ${response.status} ${text}`);
    }

    const data = (await response.json()) as any;
    const content: string = data?.choices?.[0]?.message?.content ?? '';

    let parsed: any;
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      // try extract JSON block
      const match = content.match(/\{[\s\S]*\}/);
      if (!match) throw new Error('Failed to parse Perplexity response as JSON');
      parsed = JSON.parse(match[0]);
    }

    return AnalysisSchema.parse(parsed);
  }
}
