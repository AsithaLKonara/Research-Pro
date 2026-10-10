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
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-accent-500 animate-pulse-glow"></span>
          Research Report
        </h2>
        <div className="flex gap-2">
          <button className="btn btn-secondary btn-sm">Export CSV</button>
          <button className="btn btn-secondary btn-sm">Export PDF</button>
        </div>
      </div>

      {/* Top Row: Exec Summary + Market Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ExecutiveSummary />
        </div>
        <div className="lg:col-span-1">
          <MarketInsights />
        </div>
      </div>

      {/* Middle Row: Ranking */}
      <ProductRanking />

      {/* Bottom Row: Table & Charts */}
      <ComparisonTable />
      
      <div className="mt-8 pt-8 border-t border-border-subtle">
        <TrendCharts />
      </div>
    </div>
  );
}
