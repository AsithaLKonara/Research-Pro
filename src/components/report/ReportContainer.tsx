"use client";

import { ExecutiveSummary } from "./ExecutiveSummary";
import { ProductRanking } from "./ProductRanking";
import { ComparisonTable } from "./ComparisonTable";
import { MarketInsights } from "./MarketInsights";
import { TrendCharts } from "./TrendCharts";

export function ReportContainer() {
  // In Sprint 1, this just renders placeholders.
  // In Sprint 6, this will take the `ResearchReport` object as a prop.

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Research Report</h2>
        <div className="flex gap-2">
          <button className="btn btn-secondary btn-sm">Export CSV</button>
          <button className="btn btn-secondary btn-sm">Export PDF</button>
        </div>
      </div>

      <ExecutiveSummary />
      <MarketInsights />
      <ProductRanking />
      <ComparisonTable />
      <TrendCharts />
    </div>
  );
}
