import { EvidenceRecord, Provenance } from "./evidence";
import { ResearchQuery } from "./research";

export type SupportedMetric =
  | "specifications"
  | "retail_price"
  | "expert_review"
  | "customer_rating"
  | "sales_rank"
  | "unit_sales"
  | "search_interest"
  | "social_hashtag"
  | "sentiment"
  | "market_size";

export interface SourceCapability {
  metric: SupportedMetric;
  reliability: "high" | "medium" | "low";
}

export interface SourceResult<T> {
  data?: EvidenceRecord<T>[];
  unavailable: boolean;
  reason?: string;
  provenance: Provenance;
}

export interface SourceAdapter {
  id: string;
  name: string;
  capabilities: SourceCapability[];
  fetchMetrics: (
    query: ResearchQuery,
    metrics: SupportedMetric[]
  ) => Promise<Record<SupportedMetric, SourceResult<any>>>;
}
