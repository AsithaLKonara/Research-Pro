export function MarketInsights() {
  return (
    <div className="card p-6 md:p-8">
      <h3 className="text-xl font-bold mb-4">04. Market Insights</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-surface-2 border border-border-default">
          <div className="text-sm text-text-muted mb-1">Search Trend</div>
          <div className="text-lg font-semibold text-success-400">+15% Growth</div>
        </div>
        <div className="p-4 rounded-lg bg-surface-2 border border-border-default">
          <div className="text-sm text-text-muted mb-1">Market Sentiment</div>
          <div className="text-lg font-semibold text-text-primary">Highly Positive</div>
        </div>
        <div className="p-4 rounded-lg bg-surface-2 border border-border-default">
          <div className="text-sm text-text-muted mb-1">Price Volatility</div>
          <div className="text-lg font-semibold text-warning-400">Moderate</div>
        </div>
      </div>
    </div>
  );
}
