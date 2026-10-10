import { z } from "zod";

export interface ProviderConfig {
  apiKey?: string;
  maxRetries?: number;
  timeoutMs?: number;
}

export abstract class AIProvider {
  protected config: ProviderConfig;

  constructor(config: ProviderConfig = {}) {
    this.config = {
      maxRetries: 3,
      timeoutMs: 30000,
      ...config,
    };
  }

  /**
   * Generates a structured JSON response matching the given Zod schema.
   */
  abstract generateStructuredResponse<T>(
    prompt: string,
    schema: z.ZodSchema<T>,
    systemPrompt?: string
  ): Promise<T>;

  /**
   * Generates a raw text response (useful for simple synthesis where strict JSON is not required).
   */
  abstract generateText(prompt: string, systemPrompt?: string): Promise<string>;
}
