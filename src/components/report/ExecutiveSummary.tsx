import { PipelineResult } from "@/lib/research/pipeline";

export function ExecutiveSummary({ result }: { result: PipelineResult }) {
  const topProduct = result.rankedProducts[0];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.02] p-6 sm:p-8 h-full">
      <div className="absolute left-0 top-0 h-full w-1 bg-cyan-400"></div>
      <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-cyan-300 uppercase">
        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
        Executive Summary
      </h3>
      <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-sm sm:text-base">
        <p>
          We analyzed {result.rankedProducts.length} candidates based on your criteria.
          The top recommended product is the <strong>{topProduct?.modelName}</strong> ({topProduct?.brand}), achieving a score of <strong>{topProduct?.overallScore}/100</strong>.
        </p>
        <p className="mt-4">
          This ranking factors in {topProduct?.price ? `a retail price of $${topProduct.price}` : "pricing availability"}, 
          customer ratings, and extracted specifications from multiple evidence sources.
          Review the comparison table below to understand the exact trade-offs between the top candidates.
        </p>
      </div>
    </div>
  );
}
