"use client";

import { ExecutiveSummary } from "./ExecutiveSummary";
import { ProductRanking } from "./ProductRanking";
import { ComparisonTable } from "./ComparisonTable";
import { MarketInsights } from "./MarketInsights";
import { TrendCharts } from "./TrendCharts";
import { PipelineResult } from "@/lib/research/pipeline";
import { generateCsv, downloadCsv } from "@/lib/exports/csv";
import { downloadPdf } from "@/lib/exports/pdf";

export function ReportContainer({ result }: { result?: PipelineResult }) {
  const handleExportCsv = () => {
    if (!result?.rankedProducts) return;
    const csvStr = generateCsv(result.rankedProducts);
    downloadCsv(csvStr, "product_intelligence_report.csv");
  };

  const handleExportPdf = async () => {
    if (!result?.rankedProducts) return;
    await downloadPdf(result.rankedProducts, "product_intelligence_report.pdf");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-accent-500 animate-pulse-glow"></span>
          Research Report
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={handleExportCsv}
            disabled={!result}
            className="btn btn-secondary btn-sm disabled:opacity-50"
          >
            Export CSV
          </button>
          <button 
            onClick={handleExportPdf}
            disabled={!result}
            className="btn btn-secondary btn-sm disabled:opacity-50"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Top Row: Exec Summary + Market Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* ExecutiveSummary would also take plan/coverage later */}
          <ExecutiveSummary />
        </div>
        <div className="lg:col-span-1">
          <MarketInsights />
        </div>
      </div>

      {/* Middle Row: Ranking */}
      <ProductRanking products={result?.rankedProducts} />

      {/* Bottom Row: Table & Charts */}
      <ComparisonTable products={result?.rankedProducts} />
      
      <div className="mt-8 pt-8 border-t border-border-subtle">
        <TrendCharts />
      </div>
    </div>
  );
}
