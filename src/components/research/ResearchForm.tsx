"use client";

import { useState } from "react";
import { AdvancedSettings } from "./AdvancedSettings";

export function ResearchForm() {
  const [query, setQuery] = useState("");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  return (
    <div className="card p-6 md:p-8 space-y-6 animate-scale-in">
      <div className="space-y-2">
        <label htmlFor="query" className="label text-sm uppercase tracking-wider text-accent-400">
          Product Research Query
        </label>
        <textarea
          id="query"
          className="input-query"
          placeholder="e.g. Best smartphones in 2026"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={1}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="form-group">
          <label className="label">Category</label>
          <input className="input" placeholder="e.g. Electronics" />
        </div>
        <div className="form-group">
          <label className="label">Niche</label>
          <input className="input" placeholder="e.g. Smartphones" />
        </div>
        <div className="form-group">
          <label className="label">Market</label>
          <select className="input select text-text-primary">
            <option>Worldwide</option>
            <option>US</option>
            <option>EU</option>
            <option>Asia</option>
          </select>
        </div>
        <div className="form-group">
          <label className="label">Product Count</label>
          <select className="input select text-text-primary">
            <option value="5">5 products</option>
            <option value="10" selected>10 products</option>
            <option value="15">15 products</option>
            <option value="20">20 products</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <button
          type="button"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="btn btn-ghost btn-sm text-text-muted hover:text-text-primary"
        >
          {isAdvancedOpen ? "− Hide" : "+ Show"} Advanced Settings
        </button>
        <button className="btn btn-generate w-full sm:w-auto">
          Generate Research Report
        </button>
      </div>

      {isAdvancedOpen && (
        <div className="pt-6 border-t border-border-default animate-slide-down">
          <AdvancedSettings />
        </div>
      )}
    </div>
  );
}
