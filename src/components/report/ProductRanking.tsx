export function ProductRanking() {
  return (
    <div className="card p-6 md:p-8">
      <h3 className="font-mono text-sm text-accent-400 mb-6 tracking-widest uppercase">
        03. Top Products Ranking
      </h3>
      <div className="space-y-3">
        {[1, 2, 3].map((rank) => (
          <div key={rank} className="p-4 rounded-lg bg-surface-2 border border-border-default hover:border-accent-500/50 transition-colors flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-surface-3 border border-border-strong flex items-center justify-center font-mono text-lg font-bold text-text-primary">
              #{rank}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-text-primary">Placeholder Product Model {rank}</h4>
              <p className="text-sm text-text-muted">Brand Name • Category</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-mono text-success-400 font-bold text-lg">{(100 - rank * 5).toFixed(1)}</div>
              <div className="text-xs text-text-muted">SCORE</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
