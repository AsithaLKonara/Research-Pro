import { EvidenceRecord } from "./evidence";

export interface ProductFeature {
  name: string;
  value: string | number | boolean;
  evidenceId?: string;
}

export interface ProductProfile {
  id: string;
  name: string;
  brand: string;
  category: string;
  image?: string;
  price?: EvidenceRecord<number>;
  rating?: EvidenceRecord<number>;
  reviewCount?: EvidenceRecord<number>;
  features: ProductFeature[];
  strengths: string[];
  weaknesses: string[];
  bestFitSegment: string;
}

export interface ScoredProduct extends ProductProfile {
  overallScore: number;
  rank: number;
  metrics: {
    demandScore: number;
    momentumScore: number;
    customerValueScore: number;
    competitionScore: number;
    profitabilityScore: number;
    futureResilienceScore: number;
  };
}

export interface MarketInsight {
  title: string;
  description: string;
  trendDirection: "up" | "down" | "flat";
  evidenceId?: string;
}

export interface ResearchReport {
  jobId: string;
  generatedAt: string;
  querySummary: string;
  executiveSummary: string;
  methodology: string;
  marketInsights: MarketInsight[];
  products: ScoredProduct[];
  futureScenarios: string;
}
