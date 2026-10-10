import { EvidenceRecord } from "../types/evidence";
import { SupportedMetric, SourceResult } from "../types/source";

/**
 * Normalizes URLs, ensuring they have https:// protocols.
 */
export function normalizeUrl(url: string): string {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "https://" + url;
  }
  return url;
}

/**
 * Normalizes a currency amount to USD if possible, 
 * or just strips non-numeric characters if the currency is unknown.
 */
export function normalizePrice(priceString: string): number | null {
  const numericStr = priceString.replace(/[^0-9.]/g, "");
  const value = parseFloat(numericStr);
  return isNaN(value) ? null : value;
}

/**
 * Builds a data-coverage matrix showing which metrics are available across sources.
 */
export function buildCoverageMatrix(
  results: Record<string, Record<SupportedMetric, SourceResult<any>>>
): Record<SupportedMetric, { available: boolean; sourceCount: number }> {
  
  const metrics: SupportedMetric[] = [
    "specifications", "retail_price", "expert_review", 
    "customer_rating", "sales_rank", "unit_sales", 
    "search_interest", "social_hashtag", "sentiment", "market_size"
  ];

  const coverage: Record<string, { available: boolean; sourceCount: number }> = {};

  for (const metric of metrics) {
    coverage[metric] = { available: false, sourceCount: 0 };
    
    // Check all source results
    for (const sourceId in results) {
      const result = results[sourceId][metric];
      if (result && !result.unavailable && result.data && result.data.length > 0) {
        coverage[metric].available = true;
        coverage[metric].sourceCount += 1;
      }
    }
  }

  return coverage as Record<SupportedMetric, { available: boolean; sourceCount: number }>;
}
