"use client";

import { useState } from "react";
import { AdvancedSettings } from "./AdvancedSettings";

export function ResearchForm() {
  const [query, setQuery] = useState("");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  return (
    <div className="card p-1">
      <div className="p-6 md:p-8 space-y-6">
        {/* Massive Query Bar */}
        <div className="relative">
          <textarea
            id="query"
            className="w-full bg-transparent border-0 text-2xl md:text-3xl text-text-primary placeholder:text-text-muted/50 focus:ring-0 resize-none px-0 py-2"
            placeholder="What do you want to research?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={1}
            style={{ outline: "none", boxShadow: "none" }}
          />
          <div className="absolute bottom-2 right-2 hidden sm:block">
             <button className="btn btn-generate py-2 px-4 text-sm shadow-md">
               Generate Report
             </button>
          </div>
        </div>
        
        {/* Mobile button */}
        <div className="sm:hidden">
          <button className="btn btn-generate w-full">Generate Report</button>
        </div>
        
        <div className="divider" />

        {/* Essential Parameters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="form-group">
            <label className="label text-[10px] uppercase text-text-muted tracking-widest">Category</label>
            <input className="input bg-transparent border-transparent px-0 text-sm focus:border-accent-500 focus:bg-surface-1" placeholder="e.g. Electronics" />
          </div>
          <div className="form-group">
            <label className="label text-[10px] uppercase text-text-muted tracking-widest">Niche</label>
            <input className="input bg-transparent border-transparent px-0 text-sm focus:border-accent-500 focus:bg-surface-1" placeholder="e.g. Smartphones" />
          </div>
          <div className="form-group">
            <label className="label text-[10px] uppercase text-text-muted tracking-widest">Market</label>
            <select className="input select bg-transparent border-transparent px-0 text-sm text-text-primary focus:border-accent-500 focus:bg-surface-1">
              <option>Worldwide</option>
              <option>US</option>
              <option>EU</option>
              <option>Asia</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label text-[10px] uppercase text-text-muted tracking-widest">Candidates</label>
            <select className="input select bg-transparent border-transparent px-0 text-sm text-text-primary focus:border-accent-500 focus:bg-surface-1" defaultValue="10">
              <option value="5">Top 5</option>
              <option value="10">Top 10</option>
              <option value="15">Top 15</option>
              <option value="20">Top 20</option>
            </select>
          </div>
        </div>

        {/* Toggle Advanced */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="text-xs font-mono text-text-muted hover:text-text-primary transition-colors flex items-center gap-1"
          >
            {isAdvancedOpen ? "[−] CLOSE ADVANCED" : "[+] OPEN ADVANCED"}
          </button>
        </div>


      {isAdvancedOpen && (
        <div className="pt-6 border-t border-border-default animate-slide-down">
          <AdvancedSettings />
        </div>
      )}
      </div>
    </div>
  );
}
