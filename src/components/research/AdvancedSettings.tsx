"use client";

export function AdvancedSettings() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="form-group">
        <label className="label">Ranking Objective</label>
        <select className="input select text-text-primary">
          <option>Best overall</option>
          <option>Value for money</option>
          <option>Performance</option>
          <option>Popularity</option>
          <option>Customer satisfaction</option>
          <option>Business opportunity</option>
        </select>
      </div>

      <div className="form-group">
        <label className="label">Research Period</label>
        <select className="input select text-text-primary">
          <option>Last 12 months</option>
          <option>Current year</option>
          <option>Previous year</option>
        </select>
      </div>

      <div className="form-group">
        <label className="label">Source Quality</label>
        <select className="input select text-text-primary">
          <option>Primary & reputable sources</option>
          <option>Expert reviews</option>
          <option>All available sources</option>
        </select>
      </div>

      <div className="form-group">
        <label className="label">Minimum Evidence</label>
        <select className="input select text-text-primary">
          <option>Moderate</option>
          <option>Relaxed</option>
          <option>Strict</option>
        </select>
      </div>

      <div className="form-group">
        <label className="label">Missing Data Rule</label>
        <select className="input select text-text-primary">
          <option>Mark unavailable</option>
          <option>Exclude from score</option>
          <option>Penalize score</option>
        </select>
      </div>

      <div className="form-group">
        <label className="label">Report Output Mode</label>
        <select className="input select text-text-primary">
          <option>Comprehensive report</option>
          <option>Executive summary</option>
          <option>Business pitch / Sales</option>
        </select>
      </div>
    </div>
  );
}
