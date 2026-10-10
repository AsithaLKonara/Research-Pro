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
    <div className="card p-6 md:p-8 overflow-x-auto">
      <h3 className="font-mono text-sm text-accent-400 mb-6 tracking-widest uppercase">
        04. Side-by-side Comparison
      </h3>
      <table className="data-table w-full">
        <thead>
          <tr>
            <th className="text-left">Product</th>
            <th className="text-left">Price</th>
            <th className="text-left">Rating</th>
            {columns.map(col => <th key={col} className="text-left">{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {displayProducts.map((product) => (
            <tr key={product.modelName}>
              <td className="highlight">{product.modelName}</td>
              <td className="font-mono">{product.price ? `$${product.price}` : "N/A"}</td>
              <td className="font-mono">{product.rating ? `${product.rating}/5` : "N/A"}</td>
              {columns.map(col => (
                <td key={col}>{product.features?.[col] || "-"}</td>
              ))}
            </tr>
          ))}
          {displayProducts.length === 0 && (
            <tr>
              <td colSpan={3 + columns.length} className="text-center text-text-muted py-4">
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
