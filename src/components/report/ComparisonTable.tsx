import { RankedProduct } from "@/lib/research/ranking";

export function ComparisonTable({ products }: { products?: RankedProduct[] }) {
  const displayProducts = products || [];
  
  // Extract all unique feature keys across all products
  const featureKeys = new Set<string>();
  displayProducts.forEach(p => {
    if (p.features) {
      Object.keys(p.features).forEach(k => featureKeys.add(k));
    }
  });
  const columns = Array.from(featureKeys).slice(0, 4); // Show up to 4 features

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0B1019] p-5 sm:p-7 overflow-x-auto">
      <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        Side-by-side Comparison
      </h3>
      <div className="min-w-[800px]">
        <table className="w-full text-left text-sm text-slate-300">
          <thead>
            <tr className="border-b border-white/[0.08] text-xs font-medium uppercase tracking-wider text-slate-500">
              <th className="pb-4 font-medium pl-2">Product</th>
              <th className="pb-4 font-medium">Price</th>
              <th className="pb-4 font-medium">Rating</th>
              {columns.map(col => <th key={col} className="pb-4 font-medium">{col}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {displayProducts.map((product) => (
              <tr key={product.modelName} className="transition-colors hover:bg-white/[0.02]">
                <td className="py-4 pl-2 font-medium text-white">{product.modelName}</td>
                <td className="py-4 font-mono text-cyan-300">{product.price ? `$${product.price}` : "N/A"}</td>
                <td className="py-4 font-mono">{product.rating ? `${product.rating}/5` : "N/A"}</td>
                {columns.map(col => (
                  <td key={col} className="py-4 text-slate-400">{product.features?.[col] || "-"}</td>
                ))}
              </tr>
            ))}
            {displayProducts.length === 0 && (
              <tr>
                <td colSpan={3 + columns.length} className="py-8 text-center text-slate-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
