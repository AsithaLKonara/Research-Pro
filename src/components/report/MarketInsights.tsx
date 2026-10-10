export function MarketInsights() {
  return (
    <div className="card p-6 md:p-8">
      <h3 className="font-mono text-sm text-accent-400 mb-6 tracking-widest uppercase">
        02. Market Insights
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-inner p-5 flex flex-col justify-between">
          <div className="text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Search Trend</div>
          <div className="text-2xl font-semibold text-success-400 flex items-center gap-2">
            ↗ +15%
          </div>
        </div>
        <div className="card-inner p-5 flex flex-col justify-between">
          <div className="text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Sentiment</div>
          <div className="text-2xl font-semibold text-text-primary">Highly Positive</div>
        </div>
        <div className="card-inner p-5 flex flex-col justify-between">
          <div className="text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Price Volatility</div>
          <div className="text-2xl font-semibold text-warning-400">Moderate</div>
        </div>
      </div>
    </div>
  );
}
