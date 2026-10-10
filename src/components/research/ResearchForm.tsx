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
    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
      {/* Primary Query Input */}
      <div>
        <label htmlFor="query" className="sr-only">
          What do you want to research?
        </label>
        <div className="relative">
          <textarea
            id="query"
            className="block w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 pr-32 text-sm text-white placeholder-slate-500 shadow-sm transition hover:border-white/[0.16] focus:border-cyan-400 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-cyan-400 disabled:opacity-50"
            placeholder="e.g. Best smartphones in 2026 for under $1000"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={2}
            required
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-3 hidden sm:block">
            <button 
              type="submit" 
              disabled={isLoading || !query} 
              className="inline-flex h-9 items-center justify-center rounded-lg bg-cyan-500 px-4 text-xs font-semibold text-cyan-950 transition hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1019] disabled:pointer-events-none disabled:opacity-50"
            >
              {isLoading ? "Running..." : "Start Research"}
            </button>
          </div>
        </div>
        {/* Mobile button */}
        <div className="mt-3 sm:hidden">
          <button 
            type="submit" 
            disabled={isLoading || !query} 
            className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-cyan-500 px-4 text-sm font-semibold text-cyan-950 transition hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1019] disabled:pointer-events-none disabled:opacity-50"
          >
            {isLoading ? "Running..." : "Start Research"}
          </button>
        </div>
      </div>

      <hr className="border-white/[0.06]" />

      {/* Secondary Parameters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-slate-300">Basic configuration</h4>
          <button
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="text-xs font-medium tracking-wide text-slate-500 transition hover:text-white"
          >
            {isAdvancedOpen ? "Hide advanced" : "Show advanced"}
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400">Category</label>
            <input 
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-sm text-white placeholder-slate-600 transition hover:border-white/[0.16] focus:border-cyan-400 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-cyan-400 disabled:opacity-50" 
              placeholder="e.g. Electronics" 
              value={category} 
              onChange={e => setCategory(e.target.value)} 
              disabled={isLoading} 
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400">Niche</label>
            <input 
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-sm text-white placeholder-slate-600 transition hover:border-white/[0.16] focus:border-cyan-400 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-cyan-400 disabled:opacity-50" 
              placeholder="e.g. Smartphones" 
              value={niche} 
              onChange={e => setNiche(e.target.value)} 
              disabled={isLoading} 
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400">Market</label>
            <select 
              className="w-full appearance-none rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-sm text-white transition hover:border-white/[0.16] focus:border-cyan-400 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-cyan-400 disabled:opacity-50 [&>option]:bg-[#101621] [&>option]:text-white" 
              value={market} 
              onChange={e => setMarket(e.target.value as MarketScope)} 
              disabled={isLoading}
            >
              <option value="Worldwide">Worldwide</option>
              <option value="US">US</option>
              <option value="EU">EU</option>
              <option value="Asia">Asia</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400">Target candidates</label>
            <select 
              className="w-full appearance-none rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-sm text-white transition hover:border-white/[0.16] focus:border-cyan-400 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-cyan-400 disabled:opacity-50 [&>option]:bg-[#101621] [&>option]:text-white" 
              value={productCount} 
              onChange={e => setProductCount(parseInt(e.target.value))} 
              disabled={isLoading}
            >
              <option value="5">Top 5</option>
              <option value="10">Top 10</option>
              <option value="15">Top 15</option>
              <option value="20">Top 20</option>
            </select>
          </div>
        </div>
      </div>

      {isAdvancedOpen && (
        <div className="animate-slide-down mt-2 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.02] p-4">
          <AdvancedSettings />
        </div>
      )}
    </form>
  );
}
