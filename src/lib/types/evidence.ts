export type EvidenceConfidence = "high" | "medium" | "low" | "unverified";

export type EvidenceType =
  | "measured" // Directly observed
  | "estimated" // Modelled or sampled
  | "hypothesis"; // Interpretation requiring test

export interface Provenance {
  sourceUrl?: string;
  sourceName: string;
  publicationDate?: string;
  retrievalDate: string;
  geography?: string;
}

export interface EvidenceRecord<T> {
  value: T;
  type: EvidenceType;
  confidence: EvidenceConfidence;
  provenance: Provenance;
}

export interface MetricObservation {
  id: string;
  metricName: string; // e.g. "price", "search_volume", "rating"
  record: EvidenceRecord<string | number>;
}
