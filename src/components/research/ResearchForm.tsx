"use client";

import { useState } from "react";
import { AdvancedSettings } from "./AdvancedSettings";

export function ResearchForm() {
  const [query, setQuery] = useState("");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  return (
    <div className="card p-6 md:p-8 space-y-8 animate-scale-in">
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
          />
          <div className="absolute bottom-3 right-3 hidden sm:block">
             <button className="btn btn-generate py-2 px-5 text-sm shadow-md">
               Generate Report
             </button>
          </div>
        </div>
        {/* Mobile button */}
        <div className="sm:hidden pt-2">
          <button className="btn btn-generate w-full">Generate Report</button>
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
            <input className="input" placeholder="e.g. Electronics" />
          </div>
          <div className="form-group">
            <label className="label text-[11px] uppercase tracking-wider">Niche</label>
            <input className="input" placeholder="e.g. Smartphones" />
          </div>
          <div className="form-group">
            <label className="label text-[11px] uppercase tracking-wider">Market</label>
            <select className="input select text-text-primary">
              <option>Worldwide</option>
              <option>US</option>
              <option>EU</option>
              <option>Asia</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label text-[11px] uppercase tracking-wider">Candidates</label>
            <select className="input select text-text-primary" defaultValue="10">
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
    </div>
  );
}
