import { z } from "zod";
import { AIProvider, ProviderConfig } from "./base";
import Groq from "groq-sdk";

export class GroqProvider extends AIProvider {
  private groq: Groq;

  constructor(config: ProviderConfig = {}) {
    super(config);
    const key = config.apiKey || process.env.GROQ_API_KEY;
    if (!key) {
      console.warn("GroqProvider: API Key not found. Falling back to mock behavior or will throw on request.");
    }
    
    this.groq = new Groq({
      apiKey: key || "DUMMY_BUILD_KEY_DO_NOT_USE",
    });
  }

  async generateStructuredResponse<T>(
    prompt: string,
    schema: z.ZodSchema<T>,
    systemPrompt?: string
  ): Promise<T> {
    const combinedPrompt = `
USER REQUEST:
${prompt}

IMPORTANT: You must return ONLY valid JSON matching the exact requested structure. Do not include markdown formatting like \`\`\`json. Return raw JSON.
    `;

    // Llama 3 8b or 70b are extremely fast and good at structured extraction
    const response = await this.groq.chat.completions.create({
      model: "llama3-70b-8192", // High capacity, highly capable
      messages: [
        {
          role: "system",
          content: systemPrompt || "You are an AI assistant that ONLY outputs raw, valid JSON.",
        },
        {
          role: "user",
          content: combinedPrompt,
        },
      ],
      temperature: 0.1,
      response_format: { type: "json_object" },
    });

    const text = response.choices[0]?.message?.content || "";
    try {
      return JSON.parse(text) as T;
    } catch (e) {
      throw new Error(`Failed to parse Groq JSON output: ${text}`);
    }
  }

  async generateText(prompt: string, systemPrompt?: string): Promise<string> {
    const response = await this.groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content: systemPrompt || "You are a helpful AI assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return response.choices[0]?.message?.content || "";
  }
}
