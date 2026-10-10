export function ExecutiveSummary() {
  return (
    <div className="card p-6 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-accent-500"></div>
      <h3 className="font-mono text-sm text-accent-400 mb-4 tracking-widest uppercase flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse-glow"></span>
        01. Executive Summary
      </h3>
      <div className="prose prose-invert max-w-none text-text-primary text-lg leading-relaxed">
        <p>
          This is a placeholder for the AI-generated executive summary. It will highlight the best overall product,
          category winners, key findings, and important caveats based on the retrieved evidence.
        </p>
      </div>
    </div>
  );
}
