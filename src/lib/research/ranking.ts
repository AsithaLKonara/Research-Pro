import { ExtractedProduct } from "../ai/schemas";
import { AdvancedSettings } from "../types/research";

export interface RankedProduct extends ExtractedProduct {
  overallScore: number;
  rank: number;
  scoreBreakdown: {
    priceScore: number;
    ratingScore: number;
    featureScore: number;
    penalty: number;
  };
}

/**
 * Deterministically ranks products based on the objective selected.
 */
export function rankProducts(
  products: ExtractedProduct[],
  settings: AdvancedSettings
): RankedProduct[] {
  // Define weightings based on the objective
  let priceWeight = 0.3;
  let ratingWeight = 0.4;
  let featureWeight = 0.3;

  switch (settings.objective) {
    case "value":
      priceWeight = 0.6;
      ratingWeight = 0.3;
      featureWeight = 0.1;
      break;
    case "performance":
      priceWeight = 0.1;
      ratingWeight = 0.2;
      featureWeight = 0.7;
      break;
    case "popularity":
    case "sales":
      priceWeight = 0.2;
      ratingWeight = 0.7;
      featureWeight = 0.1;
      break;
  }

  // Find max/min for normalization
  const maxPrice = Math.max(...products.map(p => p.price || 0), 1);
  const maxFeatures = Math.max(...products.map(p => Object.keys(p.features || {}).length), 1);

  const scoredProducts = products.map((product) => {
    let penalty = 0;

    // 1. Price Score (Lower is better, inverted scale 0-100)
    // If price is missing, calculate penalty based on settings
    let priceScore = 0;
    if (product.price) {
      priceScore = 100 - ((product.price / maxPrice) * 100);
    } else {
      if (settings.missingDataRule === "penalize") penalty += 20;
      priceScore = 50; // Neutral baseline if missing but not strictly penalized
    }

    // 2. Rating Score (Direct scale 0-100 based on 5.0 max)
    let ratingScore = 0;
    if (product.rating) {
      ratingScore = (product.rating / 5.0) * 100;
    } else {
      if (settings.missingDataRule === "penalize") penalty += 20;
      ratingScore = 50;
    }

    // 3. Feature Score (Proxy: amount of specs successfully extracted)
    const featureCount = Object.keys(product.features || {}).length;
    let featureScore = (featureCount / maxFeatures) * 100;
    if (featureCount === 0 && settings.missingDataRule === "penalize") {
      penalty += 10;
    }

    // Calculate final weighted score
    let overallScore = (
      (priceScore * priceWeight) +
      (ratingScore * ratingWeight) +
      (featureScore * featureWeight)
    ) - penalty;

    // Clamp between 0 and 100
    overallScore = Math.max(0, Math.min(100, overallScore));

    return {
      ...product,
      overallScore: Math.round(overallScore * 10) / 10,
      rank: 0, // Will set after sorting
      scoreBreakdown: {
        priceScore: Math.round(priceScore),
        ratingScore: Math.round(ratingScore),
        featureScore: Math.round(featureScore),
        penalty
      }
    };
  });

  // Sort descending by overall score
  scoredProducts.sort((a, b) => b.overallScore - a.overallScore);

  // Assign ranks, handling ties
  let currentRank = 1;
  for (let i = 0; i < scoredProducts.length; i++) {
    if (i > 0 && scoredProducts[i].overallScore < scoredProducts[i - 1].overallScore) {
      currentRank = i + 1;
    }
    scoredProducts[i].rank = currentRank;
  }

  return scoredProducts;
}
