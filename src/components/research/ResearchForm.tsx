"use client";

import { useState } from "react";
import { AdvancedSettings } from "./AdvancedSettings";
import { ResearchQuery, AdvancedSettings as AdvancedSettingsType, MarketScope } from "@/lib/types/research";

interface Props {
  onSubmit: (query: ResearchQuery, settings: AdvancedSettingsType) => void;
  isLoading?: boolean;
}

export function ResearchForm({ onSubmit, isLoading }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [niche, setNiche] = useState("Smartphones");
  const [market, setMarket] = useState<MarketScope>("Worldwide");
  const [productCount, setProductCount] = useState(10);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // Simplified default settings for MVP
  const defaultSettings: AdvancedSettingsType = {
    objective: "overall",
    marketScope: market,
    productCount: productCount,
    sourceQuality: "primary",
    minimumEvidence: "balanced",
    missingDataRule: "penalize",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    const researchQuery: ResearchQuery = {
      rawQuery: query,
      category,
      niche,
      market,
      productCount,
      dateRange: { from: "2026-01-01", to: new Date().toISOString() }
    };

    onSubmit(researchQuery, defaultSettings);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-8 animate-scale-in">
      {/* Primary Query Input */}
      <div className="space-y-3">
        <label htmlFor="query" className="label text-sm uppercase tracking-wider text-accent-400 font-semibold">
          What do you want to research?
        </label>
        <div className="relative">
          <textarea
            id="query"
            className="input-query pr-32"
            placeholder="e.g. Best smartphones in 2026 for under $1000"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={2}
            required
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-3 hidden sm:block">
             <button type="submit" disabled={isLoading || !query} className="btn btn-generate py-2 px-5 text-sm shadow-md disabled:opacity-50">
               {isLoading ? "Running..." : "Generate Report"}
             </button>
          </div>
        </div>
        {/* Mobile button */}
        <div className="sm:hidden pt-2">
          <button type="submit" disabled={isLoading || !query} className="btn btn-generate w-full disabled:opacity-50">
            {isLoading ? "Running..." : "Generate Report"}
          </button>
        </div>
      </div>
      
      <div className="divider" />

      {/* Secondary Parameters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-text-primary">Research Parameters</h4>
          <button
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="text-xs font-mono text-text-muted hover:text-text-primary transition-colors flex items-center gap-1"
          >
            {isAdvancedOpen ? "[−] ADVANCED" : "[+] ADVANCED"}
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="form-group">
            <label className="label text-[11px] uppercase tracking-wider">Category</label>
            <input className="input" placeholder="e.g. Electronics" value={category} onChange={e => setCategory(e.target.value)} disabled={isLoading} />
          </div>
          <div className="form-group">
            <label className="label text-[11px] uppercase tracking-wider">Niche</label>
            <input className="input" placeholder="e.g. Smartphones" value={niche} onChange={e => setNiche(e.target.value)} disabled={isLoading} />
          </div>
          <div className="form-group">
            <label className="label text-[11px] uppercase tracking-wider">Market</label>
            <select className="input select text-text-primary" value={market} onChange={e => setMarket(e.target.value as MarketScope)} disabled={isLoading}>
              <option value="Worldwide">Worldwide</option>
              <option value="US">US</option>
              <option value="EU">EU</option>
              <option value="Asia">Asia</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label text-[11px] uppercase tracking-wider">Candidates</label>
            <select className="input select text-text-primary" value={productCount} onChange={e => setProductCount(parseInt(e.target.value))} disabled={isLoading}>
              <option value="5">Top 5</option>
              <option value="10">Top 10</option>
              <option value="15">Top 15</option>
              <option value="20">Top 20</option>
            </select>
          </div>
        </div>
      </div>

      {isAdvancedOpen && (
        <div className="pt-6 border-t border-border-default animate-slide-down">
          <AdvancedSettings />
        </div>
      )}
    </form>
  );
}
