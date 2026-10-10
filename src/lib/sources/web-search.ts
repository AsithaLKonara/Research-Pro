import { SupportedMetric, SourceAdapter, SourceResult, SourceCapability } from "../types/source";
import { ResearchQuery } from "../types/research";
import { EvidenceRecord } from "../types/evidence";
import { aiOrchestrator } from "../ai/orchestrator";
import { ExtractedProductSchema, ExtractedProduct } from "../ai/schemas";

export class WebSearchAdapter implements SourceAdapter {
  id = "web_search";
  name = "Google Grounded Web Search";
  
  capabilities: SourceCapability[] = [
    { metric: "specifications", reliability: "high" },
    { metric: "retail_price", reliability: "medium" },
    { metric: "expert_review", reliability: "high" },
  ];

  async fetchMetrics(
    query: ResearchQuery,
    metrics: SupportedMetric[]
  ): Promise<Record<SupportedMetric, SourceResult<any>>> {
    const results: Record<string, SourceResult<any>> = {};

    // For the MVP, we use the Gemini Provider to execute the search and extract data.
    // In a real implementation with grounding, Gemini executes a Google Search tool.
    const searchPrompt = `
    Execute a web search for the query: "${query.rawQuery}".
    Focus on finding specifications, retail prices, and expert reviews for the top products.
    Extract the first product you find in full detail.
    `;

    try {
      const extractedProduct = await aiOrchestrator.generateStructured<ExtractedProduct>(
        "gemini",
        searchPrompt,
        ExtractedProductSchema,
        "You are a web search extraction agent."
      );

      const provenance = {
        sourceName: "Google Search (via Gemini)",
        retrievalDate: new Date().toISOString(),
      };

      if (metrics.includes("specifications")) {
        results["specifications"] = {
          unavailable: false,
          provenance,
          data: [{
            value: extractedProduct.features,
            type: "measured",
            confidence: "medium",
            provenance
          }],
        };
      }

      if (metrics.includes("retail_price") && extractedProduct.price) {
        results["retail_price"] = {
          unavailable: false,
          provenance,
          data: [{
            value: extractedProduct.price,
            type: "measured",
            confidence: "medium",
            provenance
          }],
        };
      } else if (metrics.includes("retail_price")) {
        results["retail_price"] = { unavailable: true, provenance };
      }

    } catch (e) {
      console.error("[WebSearchAdapter] Failed to fetch metrics", e);
      for (const m of metrics) {
        results[m] = {
          unavailable: true,
          reason: e instanceof Error ? e.message : "Unknown extraction error",
          provenance: { sourceName: "Google Search", retrievalDate: new Date().toISOString() }
        };
      }
    }

    return results as Record<SupportedMetric, SourceResult<any>>;
  }
}

export const webSearchAdapter = new WebSearchAdapter();
