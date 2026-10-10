import { z } from "zod";
import { AIProvider } from "./base";
import { ResearchPlanSchema, ReportSynthesisSchema } from "../schemas";

/**
 * A mock provider that returns fixed fixture data.
 * Used for development to avoid API quota usage.
 */
export class MockProvider extends AIProvider {
  async generateStructuredResponse<T>(
    prompt: string,
    schema: z.ZodSchema<T>,
    systemPrompt?: string
  ): Promise<T> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // For ResearchPlan
    if ((schema as any) === ResearchPlanSchema) {
      return {
        query: "What is the best smartphone in 2026?",
        category: "Electronics",
        niche: "Smartphones",
        market: "Worldwide",
        targetCount: 10,
        searchQueries: [
          "Best smartphones 2026",
          "Top rated mobile phones 2026 specs",
          "Smartphone camera comparisons 2026",
        ],
        requiredMetrics: ["Battery Life", "Processor", "Camera Megapixels", "Screen Refresh Rate"],
        rankingCriteria: "Best overall combination of processing power, camera quality, battery life, and value for money.",
      } as unknown as T;
    }

    // For Report Synthesis
    if ((schema as any) === ReportSynthesisSchema) {
      return {
        executiveSummary: "The 2026 smartphone market is dominated by AI-integrated processors and solid-state battery technology. The top tier features devices from Apple, Samsung, and Google, while mid-range devices from Xiaomi and Nothing offer unprecedented value.",
        marketInsights: {
          trendDescription: "Rapid adoption of on-device LLMs and satellite connectivity.",
          sentiment: "Highly Positive",
          priceVolatility: "Moderate",
        },
        futureScenarios: [
          { scenario: "Upside", description: "Solid-state batteries reach mass production, extending lifespan by 40%." },
          { scenario: "Downside", description: "Supply chain constraints on 2nm chips increase premium tier pricing by $200." },
        ],
        businessOpportunity: "Focusing on privacy-first on-device AI capabilities offers the strongest differentiation in a crowded market.",
      } as unknown as T;
    }

    throw new Error("MockProvider: Unknown schema requested. Cannot generate fixture.");
  }

  async generateText(prompt: string, systemPrompt?: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return "This is a mocked text response based on the prompt: " + prompt.substring(0, 30) + "...";
  }
}
