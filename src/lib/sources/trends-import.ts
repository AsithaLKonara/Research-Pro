import { SupportedMetric, SourceAdapter, SourceResult, SourceCapability } from "../types/source";
import { ResearchQuery } from "../types/research";
import { Provenance } from "../types/evidence";
import Papa from "papaparse";

// Simulate reading a local CSV file for trends
// In a real app, this would read from a blob store or an uploaded file
const MOCK_CSV_DATA = `date,interest
2026-01-01,45
2026-02-01,55
2026-03-01,80
2026-04-01,65`;

export class TrendsImportAdapter implements SourceAdapter {
  id = "google_trends_csv";
  name = "Google Trends CSV Import";

  capabilities: SourceCapability[] = [
    { metric: "search_interest", reliability: "high" },
  ];

  async fetchMetrics(
    query: ResearchQuery,
    metrics: SupportedMetric[]
  ): Promise<Record<SupportedMetric, SourceResult<any>>> {
    const results: Record<string, SourceResult<any>> = {};
    const provenance: Provenance = {
      sourceName: "Google Trends (CSV)",
      retrievalDate: new Date().toISOString(),
    };

    if (metrics.includes("search_interest")) {
      try {
        // Parse CSV using papaparse
        const parsed = Papa.parse(MOCK_CSV_DATA, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        results["search_interest"] = {
          unavailable: false,
          provenance,
          data: [{
            value: parsed.data, // Array of { date, interest }
            type: "measured",
            confidence: "high",
            provenance
          }],
        };
      } catch (e) {
        results["search_interest"] = {
          unavailable: true,
          reason: "Failed to parse CSV data",
          provenance
        };
      }
    }

    // Mark unhandled metrics as unavailable
    for (const m of metrics) {
      if (!results[m]) {
        results[m] = { unavailable: true, provenance };
      }
    }

    return results as Record<SupportedMetric, SourceResult<any>>;
  }
}

export const trendsImportAdapter = new TrendsImportAdapter();
