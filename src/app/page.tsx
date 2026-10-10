"use client";

import { useState } from "react";
import { ResearchForm } from "@/components/research/ResearchForm";
import { ReportContainer } from "@/components/report/ReportContainer";
import { ResearchQuery, AdvancedSettings } from "@/lib/types/research";
import { PipelineResult } from "@/lib/research/pipeline";

export default function Home() {
  const [result, setResult] = useState<PipelineResult | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResearchSubmit = async (query: ResearchQuery, settings: AdvancedSettings) => {
    setIsLoading(true);
    setError(null);
    setResult(undefined);

    try {
      const response = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, settings }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate report");
      }

      const data: PipelineResult = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-start py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <header className="w-full max-w-4xl text-center space-y-6 animate-fade-in mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-2 border border-border-default text-xs font-mono text-text-muted mb-4">
          <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse-glow"></span>
          Powered by Gemini 1.5 Pro & Llama-3
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-text-primary">
          Product Intelligence <br className="hidden sm:block" />
          <span className="text-text-muted font-normal">Terminal</span>
        </h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Deep-dive global product research. We aggregate live web evidence, analyze features, and rank candidates—delivering export-ready intelligence in seconds.
        </p>
      </header>

      {/* Main Research Workspace */}
      <section className="w-full max-w-4xl space-y-12">
        <ResearchForm onSubmit={handleResearchSubmit} isLoading={isLoading} />
        
        {/* Features / Trust signals shown before a search is done */}
        {!result && !isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-border-subtle animate-fade-in">
            <div className="space-y-2">
              <h3 className="font-mono text-sm text-text-primary font-medium">01 // Live Extraction</h3>
              <p className="text-sm text-text-muted">Bypasses static training data by scraping live specs, reviews, and pricing from global retailers.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-mono text-sm text-text-primary font-medium">02 // Multi-model Reasoning</h3>
              <p className="text-sm text-text-muted">Gemini handles search and grounding, while Groq structured-data models extract exact metrics.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-mono text-sm text-text-primary font-medium">03 // Evidence Backed</h3>
              <p className="text-sm text-text-muted">Every data point is tied to provenance. If we can't prove a claim, it's flagged as unverified.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-danger-500/10 border border-danger-500/20 rounded-lg text-danger-500">
            <h3 className="font-bold mb-1">Research Failed</h3>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="py-20 text-center animate-pulse">
            <div className="inline-block w-8 h-8 rounded-full border-2 border-accent-500 border-t-transparent animate-spin mb-4"></div>
            <p className="text-text-muted font-mono tracking-widest text-sm">INITIALIZING PIPELINE...</p>
          </div>
        )}

        {result && !isLoading && (
          <div className="animate-slide-up">
            <ReportContainer result={result} />
          </div>
        )}
      </section>
    </main>
  );
}
