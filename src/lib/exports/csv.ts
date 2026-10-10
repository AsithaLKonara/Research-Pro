import Papa from "papaparse";
import { RankedProduct } from "../research/ranking";

/**
 * Converts a list of ranked products into a downloadable CSV string.
 */
export function generateCsv(products: RankedProduct[]): string {
  // Flatten the product data for CSV
  const flatData = products.map(product => {
    // Flatten features into separate columns
    const flatFeatures: Record<string, string> = {};
    if (product.features) {
      for (const [key, value] of Object.entries(product.features)) {
        flatFeatures[`Feature_${key}`] = value as string;
      }
    }

    return {
      Rank: product.rank,
      ModelName: product.modelName,
      Brand: product.brand,
      OverallScore: product.overallScore,
      PriceScore: product.scoreBreakdown.priceScore,
      RatingScore: product.scoreBreakdown.ratingScore,
      FeatureScore: product.scoreBreakdown.featureScore,
      Penalty: product.scoreBreakdown.penalty,
      PriceUSD: product.price ?? "N/A",
      Currency: product.currency ?? "N/A",
      Rating: product.rating ?? "N/A",
      ...flatFeatures
    };
  });

  return Papa.unparse(flatData);
}

/**
 * Triggers a browser download of the CSV string.
 */
export function downloadCsv(csvContent: string, filename: string = "research_report.csv") {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
