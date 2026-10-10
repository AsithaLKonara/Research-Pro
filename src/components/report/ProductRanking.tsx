import { RankedProduct } from "@/lib/research/ranking";

export function ProductRanking({ products }: { products?: RankedProduct[] }) {
  const displayProducts = products || [];

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0B1019] p-5 sm:p-7">
      <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        Top Candidates
      </h3>
      <div className="space-y-3">
        {displayProducts.length === 0 ? (
          <div className="text-sm text-slate-500">No products available.</div>
        ) : (
          displayProducts.map((product) => (
            <div key={product.modelName} className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-cyan-400/30 hover:bg-cyan-400/[0.02]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] font-mono text-lg font-bold text-white transition-colors group-hover:border-cyan-400/30 group-hover:text-cyan-300">
                #{product.rank}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="truncate font-semibold text-white">{product.modelName}</h4>
                <p className="truncate text-sm text-slate-400">{product.brand}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end">
                <div className="font-mono text-lg font-bold text-cyan-300">{product.overallScore.toFixed(1)}</div>
                <div className="text-[10px] font-medium tracking-wider text-slate-500 uppercase">Score</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
