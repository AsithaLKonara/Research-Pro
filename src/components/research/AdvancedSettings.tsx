"use client";

export function AdvancedSettings() {
  const selectClasses = "w-full appearance-none rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-sm text-slate-300 transition hover:border-white/[0.16] focus:border-cyan-400 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-cyan-400 [&>option]:bg-[#101621] [&>option]:text-white";
  const labelClasses = "mb-1.5 block text-xs font-medium text-slate-400";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div>
        <label className={labelClasses}>Ranking Objective</label>
        <select className={selectClasses} defaultValue="Best overall">
          <option value="Best overall">Best overall</option>
          <option value="Value for money">Value for money</option>
          <option value="Performance">Performance</option>
          <option value="Popularity">Popularity</option>
          <option value="Customer satisfaction">Customer satisfaction</option>
        </select>
      </div>

      <div>
        <label className={labelClasses}>Research Period</label>
        <select className={selectClasses} defaultValue="Last 12 months">
          <option value="Last 12 months">Last 12 months</option>
          <option value="Current year">Current year</option>
          <option value="Previous year">Previous year</option>
        </select>
      </div>

      <div>
        <label className={labelClasses}>Source Quality</label>
        <select className={selectClasses} defaultValue="Primary & reputable sources">
          <option value="Primary & reputable sources">Primary & reputable sources</option>
          <option value="Expert reviews">Expert reviews</option>
          <option value="All available sources">All available sources</option>
        </select>
      </div>

      <div>
        <label className={labelClasses}>Minimum Evidence</label>
        <select className={selectClasses} defaultValue="Moderate">
          <option value="Moderate">Moderate</option>
          <option value="Relaxed">Relaxed</option>
          <option value="Strict">Strict</option>
        </select>
      </div>

      <div>
        <label className={labelClasses}>Missing Data Rule</label>
        <select className={selectClasses} defaultValue="Mark unavailable">
          <option value="Mark unavailable">Mark unavailable</option>
          <option value="Exclude from score">Exclude from score</option>
          <option value="Penalize score">Penalize score</option>
        </select>
      </div>

      <div>
        <label className={labelClasses}>Report Output Mode</label>
        <select className={selectClasses} defaultValue="Comprehensive report">
          <option value="Comprehensive report">Comprehensive report</option>
          <option value="Executive summary">Executive summary</option>
          <option value="Business pitch / Sales">Business pitch / Sales</option>
        </select>
      </div>
    </div>
  );
}
