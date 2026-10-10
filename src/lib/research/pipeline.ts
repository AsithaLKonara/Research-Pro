import { ResearchQuery, AdvancedSettings } from "../types/research";
import { aiOrchestrator } from "../ai/orchestrator";
import { ResearchPlanSchema, ResearchPlan } from "../ai/schemas";
import { RESEARCH_PLANNING_SYSTEM_PROMPT } from "../ai/prompts/planning";
import { sourceRegistry } from "../sources/registry";
import { buildCoverageMatrix } from "../sources/normalization";
import { rankProducts, RankedProduct } from "./ranking";
import { validateEvidence, ValidationIssue } from "./evidence-validation";
import { SupportedMetric, SourceResult } from "../types/source";

export interface PipelineResult {
  plan: ResearchPlan;
  coverage: Record<SupportedMetric, { available: boolean; sourceCount: number }>;
  rankedProducts: RankedProduct[];
  validationIssues: Record<string, ValidationIssue[]>;
}

/**
 * The master pipeline that orchestrates AI planning, source extraction, and deterministic ranking.
 */
export async function runResearchPipeline(
  query: ResearchQuery,
  settings: AdvancedSettings
): Promise<PipelineResult> {
  // 1. Planning Phase (AI Orchestrator)
  const planningPrompt = `
    User Query: ${query.rawQuery}
    Target Count: ${settings.productCount}
    Market Scope: ${settings.marketScope}
  `;

  const plan = await aiOrchestrator.generateStructured<ResearchPlan>(
    "gemini",
    planningPrompt,
    ResearchPlanSchema,
    RESEARCH_PLANNING_SYSTEM_PROMPT
  );

  // 2. Discovery & Extraction Phase (Source Registry)
  // In a real flow, we would map the plan's required metrics to SupportedMetrics
  const requiredMetrics: SupportedMetric[] = ["specifications", "retail_price", "expert_review"];
  
  // We query all registered adapters
  const rawResults = await Promise.all(
    sourceRegistry.getAllAdapters().map(async (adapter) => {
      const res = await adapter.fetchMetrics(query, requiredMetrics);
      return { id: adapter.id, results: res };
    })
  );

  // Re-key by adapter ID
  const adapterResults: Record<string, Record<SupportedMetric, SourceResult<any>>> = {};
  for (const r of rawResults) {
    adapterResults[r.id] = r.results;
  }

  // Calculate Coverage Matrix
  const coverage = buildCoverageMatrix(adapterResults);

  // Extract products (Mocking the aggregation step here. The WebSearchAdapter 
  // actually returns the extracted features directly in the MVP)
  // In a full architecture, we'd pass all the raw evidence to Groq to extract into `ExtractedProduct[]`.
  // For now, we'll simulate the structured extraction from the webSearchAdapter.
  const webData = adapterResults["web_search"]?.["specifications"]?.data?.[0];
  const webPrice = adapterResults["web_search"]?.["retail_price"]?.data?.[0];
  
  // Create a dummy list based on the target count to simulate the pipeline
  const extractedProducts = Array.from({ length: plan.targetCount }).map((_, i) => ({
    modelName: `Candidate Phone ${i + 1}`,
    brand: "Generic Brand",
    price: (webPrice?.value as number) || (600 + (Math.random() * 400)),
    currency: "USD",
    features: (webData?.value as Record<string, string>) || {
      "Processor": "Snapdragon 8 Gen 3",
      "Battery": "5000mAh",
      "Camera": "50MP"
    },
    rating: 4.0 + (Math.random()),
  }));

  // 3. Validation Phase
  const validationIssues = validateEvidence(extractedProducts);

  // 4. Ranking Phase (Deterministic)
  const rankedProducts = rankProducts(extractedProducts, settings);

  return {
    plan,
    coverage,
    rankedProducts,
    validationIssues
  };
}
