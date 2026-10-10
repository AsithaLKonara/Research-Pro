export type MarketScope = "Worldwide" | "US" | "EU" | "Asia";

export interface ResearchQuery {
  rawQuery: string;
  category: string;
  niche: string;
  market: MarketScope;
  productCount: number;
  dateRange: {
    from: string; // ISO date string
    to: string; // ISO date string
  };
}

export type RankingObjective = 
  | "overall" 
  | "value" 
  | "performance" 
  | "popularity" 
  | "sales" 
  | "satisfaction";

export interface AdvancedSettings {
  objective: RankingObjective;
  marketScope: MarketScope;
  productCount: number;
  sourceQuality: "primary" | "expert" | "all";
  minimumEvidence: "relaxed" | "balanced" | "strict";
  missingDataRule: "exclude" | "penalize" | "show";
}

export interface ResearchJob {
  id: string;
  status: "planning" | "discovery" | "extraction" | "validation" | "ranking" | "synthesis" | "done" | "error";
  progress: number; // 0-100
  query: ResearchQuery;
  settings: AdvancedSettings;
  createdAt: string;
  error?: string;
}
