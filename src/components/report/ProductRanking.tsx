export function ProductRanking() {
  return (
    <div className="card p-6 md:p-8">
      <h3 className="text-xl font-bold mb-4">02. Top Products Ranking</h3>
      <div className="space-y-4">
        {[1, 2, 3].map((rank) => (
          <div key={rank} className="p-4 rounded-lg bg-surface-2 border border-border-default flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-accent-500/20 text-accent-400 flex items-center justify-center font-bold">
              #{rank}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-text-primary">Placeholder Product Model {rank}</h4>
              <p className="text-sm text-text-muted">Brand Name • Category</p>
            </div>
            <div className="text-right">
              <div className="font-mono text-success-400 font-medium">Score: {(100 - rank * 5).toFixed(1)}</div>
              <div className="text-sm text-text-muted">Est. $999</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
