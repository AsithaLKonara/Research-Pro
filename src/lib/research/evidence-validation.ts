import { ExtractedProduct } from "../ai/schemas";

export interface ValidationIssue {
  type: "CONFLICT" | "STALE" | "MISSING_CRITICAL";
  message: string;
  severity: "high" | "medium" | "low";
}

/**
 * Validates the extracted products for obvious consistency errors.
 */
export function validateEvidence(products: ExtractedProduct[]): Record<string, ValidationIssue[]> {
  const issues: Record<string, ValidationIssue[]> = {};

  products.forEach(product => {
    const productIssues: ValidationIssue[] = [];

    // Check for missing critical data
    if (!product.price) {
      productIssues.push({
        type: "MISSING_CRITICAL",
        message: "Retail price could not be verified from any reliable source.",
        severity: "high"
      });
    }

    if (!product.rating) {
      productIssues.push({
        type: "MISSING_CRITICAL",
        message: "Customer ratings or expert reviews are missing.",
        severity: "medium"
      });
    }

    // Example Conflict Rule: If battery says "mAh" but the number is suspiciously low
    if (product.features && product.features["Battery"]) {
      const batteryStr = product.features["Battery"].toLowerCase();
      if (batteryStr.includes("mah")) {
        const amountMatch = batteryStr.match(/[0-9]+/);
        if (amountMatch) {
          const amount = parseInt(amountMatch[0], 10);
          if (amount < 1000) {
            productIssues.push({
              type: "CONFLICT",
              message: `Battery capacity of ${amount}mAh appears suspiciously low for modern standards.`,
              severity: "low"
            });
          }
        }
      }
    }

    if (productIssues.length > 0) {
      issues[product.modelName] = productIssues;
    }
  });

  return issues;
}
