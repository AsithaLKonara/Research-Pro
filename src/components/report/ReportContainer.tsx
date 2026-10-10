"use client";

import { PipelineResult } from "@/lib/research/pipeline";
import { generateCsv, downloadCsv } from "@/lib/exports/csv";
import { downloadPdf } from "@/lib/exports/pdf";
import { ProductRanking } from "./ProductRanking";
import { ComparisonTable } from "./ComparisonTable";
import { ExecutiveSummary } from "./ExecutiveSummary";

export function ReportContainer({ result }: { result: PipelineResult }) {
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
    <div className="space-y-8 animate-fade-in text-white">
      {/* Export Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
            ✓
          </span>
          <div>
            <p className="text-sm font-semibold">Report Generated</p>
            <p className="text-xs text-slate-400">
              Evaluated {result.rankedProducts.length} products
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportCsv}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 text-xs font-medium text-slate-300 transition hover:bg-white/[0.07]"
          >
            Export CSV
          </button>
          <button
            onClick={handleExportPdf}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 text-xs font-semibold text-cyan-950 transition hover:bg-cyan-400"
          >
            Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ExecutiveSummary result={result} />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Coverage Summary */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#0B1019] p-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 mb-4">
              Data Coverage
            </h3>
            <div className="space-y-3">
              {Object.entries(result.coverage || {}).slice(0, 5).map(([metric, data]) => (
                <div key={metric} className="flex justify-between items-center text-sm">
                  <span className="text-slate-300 capitalize">{metric.replace("_", " ")}</span>
                  {data.available ? (
                    <span className="text-emerald-400 text-xs font-mono">{data.sourceCount} Sources</span>
                  ) : (
                    <span className="text-rose-400 text-xs font-mono">Missing</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ProductRanking products={result.rankedProducts} />

      <ComparisonTable products={result.rankedProducts} />
      
    </div>
  );
}
