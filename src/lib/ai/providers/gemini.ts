import { z } from "zod";
import { AIProvider, ProviderConfig } from "./base";
import { GoogleGenAI } from "@google/genai";

export class GeminiProvider extends AIProvider {
  private ai: GoogleGenAI;

  constructor(config: ProviderConfig = {}) {
    super(config);
    if (!config.apiKey && !process.env.GEMINI_API_KEY) {
      console.warn("GeminiProvider: API Key not found. Falling back to mock behavior or will throw on request.");
    }
    
    // The SDK automatically picks up GEMINI_API_KEY from process.env if not explicitly passed
    this.ai = new GoogleGenAI({ apiKey: config.apiKey });
  }

  async generateStructuredResponse<T>(
    prompt: string,
    schema: z.ZodSchema<T>,
    systemPrompt?: string
  ): Promise<T> {
    const combinedPrompt = `
${systemPrompt ? `SYSTEM INSTRUCTION:\n${systemPrompt}\n\n` : ""}
USER REQUEST:
${prompt}

IMPORTANT: You must return ONLY valid JSON matching the following structure. Do not include markdown formatting (like \`\`\`json) or any other text before or after the JSON.
    `;

    // Assuming we use gemini-1.5-pro for complex extraction and grounding
    const response = await this.ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: combinedPrompt,
      config: {
        responseMimeType: "application/json",
        // In a full implementation, we could dynamically convert the Zod schema to OpenAPI Schema here
        // and pass it to responseSchema.
        temperature: 0.1, // Low temperature for deterministic structured output
        // Optional: Grounding with Google Search can be enabled here using tools config
        // tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    try {
      // The AI orchestrator will validate this against the Zod schema
      return JSON.parse(text) as T;
    } catch (e) {
      throw new Error(`Failed to parse Gemini JSON output: ${text}`);
    }
  }

  async generateText(prompt: string, systemPrompt?: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    return response.text || "";
  }
}
