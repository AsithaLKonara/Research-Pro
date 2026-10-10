import { z } from "zod";
import { AIProvider } from "./providers/base";
import { MockProvider } from "./providers/mock";
import { GeminiProvider } from "./providers/gemini";
import { GroqProvider } from "./providers/groq";

export type ProviderType = "gemini" | "groq" | "mock";

export class AIOrchestrator {
  private providers: Record<ProviderType, AIProvider>;

  constructor() {
    this.providers = {
      mock: new MockProvider(),
      gemini: new GeminiProvider(),
      groq: new GroqProvider(),
    };
  }

  /**
   * Routes a structured generation request to the specified provider, with built-in retries.
   */
  async generateStructured<T>(
    providerType: ProviderType,
    prompt: string,
    schema: z.ZodSchema<T>,
    systemPrompt?: string
  ): Promise<T> {
    const provider = this.providers[providerType];
    if (!provider) {
      throw new Error(`Provider ${providerType} is not configured.`);
    }

    let lastError: any;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const result = await provider.generateStructuredResponse(prompt, schema, systemPrompt);
        
        // Final sanity check: validate the output through Zod before returning to the app
        return schema.parse(result);
      } catch (error) {
        lastError = error;
        console.warn(`[AIOrchestrator] Attempt ${attempt} failed for ${providerType}:`, error);
        
        // Wait before retrying (exponential backoff)
        if (attempt < 3) {
          await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        }
      }
    }

    throw new Error(`[AIOrchestrator] Failed after 3 attempts. Last error: ${lastError?.message}`);
  }

  /**
   * Routes a raw text generation request.
   */
  async generateText(
    providerType: ProviderType,
    prompt: string,
    systemPrompt?: string
  ): Promise<string> {
    const provider = this.providers[providerType];
    return provider.generateText(prompt, systemPrompt);
  }
}

// Export a singleton instance for use across the application
export const aiOrchestrator = new AIOrchestrator();
