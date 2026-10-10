"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ResearchForm } from "@/components/research/ResearchForm";
import { ReportContainer } from "@/components/report/ReportContainer";
import type {
  ResearchQuery,
  AdvancedSettings,
} from "@/lib/types/research";
import type { PipelineResult } from "@/lib/research/pipeline";

function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: "search" | "chart" | "shield" | "globe" | "arrow" | "file" | "spark" | "close";
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m16 16 4 4" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="m7 14 4-4 4 3 6-7" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      );
    case "file":
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <path d="M14 2v6h6M8 13h8M8 17h8" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
          <path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="m18 6-12 12M6 6l12 12" />
        </svg>
      );
  }
}

function FeatureCard({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: "chart" | "globe" | "shield";
}) {
  return (
    <article className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition duration-200 hover:border-white/[0.16] hover:bg-white/[0.045]">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium tracking-[0.16em] text-slate-500">
          {number}
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-slate-300 transition group-hover:text-cyan-300">
          <Icon name={icon} />
        </span>
      </div>
      <h3 className="mt-5 text-base font-semibold tracking-tight text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
    </article>
  );
}

export default function Home() {
  const [result, setResult] = useState<PipelineResult | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeRequest = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      activeRequest.current?.abort();
      activeRequest.current = null;
    };
  }, []);

  const handleResearchSubmit = useCallback(
    async (query: ResearchQuery, settings: AdvancedSettings) => {
      // Avoid duplicate requests if the form is submitted repeatedly.
      if (activeRequest.current) return;

      const controller = new AbortController();
      activeRequest.current = controller;

      setIsLoading(true);
      setError(null);
      setResult(undefined);

      try {
        const response = await fetch("/api/research", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, settings }),
          signal: controller.signal,
        });

        const payload: unknown = await response.json().catch(() => null);

        if (!response.ok) {
          let message = `Research request failed (${response.status}).`;

          if (
            payload &&
            typeof payload === "object" &&
            "error" in payload &&
            typeof payload.error === "string"
          ) {
            message = payload.error;
          }

          throw new Error(message);
        }

        if (!payload || typeof payload !== "object") {
          throw new Error("The research service returned an invalid response.");
        }

        setResult(payload as PipelineResult);
      } catch (err: unknown) {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error
            ? err.message
            : "An unexpected error occurred. Please try again."
        );
      } finally {
        if (activeRequest.current === controller) {
          activeRequest.current = null;
          setIsLoading(false);
        }
      }
    },
    []
  );

  const cancelResearch = () => {
    activeRequest.current?.abort();
    activeRequest.current = null;
    setIsLoading(false);
    setError(null);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080B12] text-white selection:bg-cyan-400/25">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(37,99,235,0.16),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
      />

      <div className="relative mx-auto max-w-[1440px] px-4 pb-20 sm:px-6 lg:px-10">
        {/* Top navigation */}
        <nav className="flex h-[76px] items-center justify-between border-b border-white/[0.08]">
          <a
            href="#home"
            className="flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Product Intelligence home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 to-blue-600 text-[#06101E] shadow-lg shadow-blue-950/30">
              <Icon name="chart" className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-tight text-white">
                Product Intelligence
              </span>
              <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                Research workspace
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs text-slate-400">
              AI research engine
            </span>
          </div>

          <a
            href="#methodology"
            className="text-xs font-medium text-slate-400 transition hover:text-white"
          >
            Methodology
          </a>
        </nav>

        {/* Hero */}
        <header id="home" className="mx-auto max-w-4xl pb-10 pt-16 text-center sm:pb-12 sm:pt-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-3.5 py-2 text-xs font-medium text-cyan-200">
            <Icon name="spark" className="h-4 w-4" />
            Global product research, in one workspace
          </div>

          <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-6xl lg:text-[72px]">
            Make your next
            <br className="hidden sm:block" /> product decision
            <span className="block bg-gradient-to-r from-cyan-200 via-blue-300 to-indigo-300 bg-clip-text pb-2 text-transparent">
              with evidence.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            Research products across markets. Compare specifications, prices,
            customer feedback and demand signals. Turn sourced evidence into a
            report your team can act on.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-2">
              <Icon name="globe" className="h-4 w-4 text-slate-400" />
              Global market coverage
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-700 sm:block" />
            <span className="inline-flex items-center gap-2">
              <Icon name="shield" className="h-4 w-4 text-slate-400" />
              Source-backed findings
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-700 sm:block" />
            <span className="inline-flex items-center gap-2">
              <Icon name="file" className="h-4 w-4 text-slate-400" />
              PDF and CSV reports
            </span>
          </div>
        </header>

        {/* Research form */}
        <section
          aria-label="Product research configuration"
          className="mx-auto max-w-5xl scroll-mt-8"
        >
          <div className="rounded-[26px] border border-white/[0.10] bg-[#101621]/90 p-3 shadow-[0_30px_100px_-45px_rgba(37,99,235,0.35)] sm:p-6 lg:p-7">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3 px-1">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  Research studio
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  What do you want to discover?
                </h2>
                <p className="mt-1.5 text-sm leading-6 text-slate-400">
                  Describe your research goal, then configure the comparison.
                </p>
              </div>

              <span className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-[11px] font-medium text-slate-400">
                No account required
              </span>
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-[#0B1019] p-3 sm:p-5">
              <ResearchForm
                onSubmit={handleResearchSubmit}
                isLoading={isLoading}
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
              <p className="max-w-xl text-xs leading-5 text-slate-500">
                Results depend on accessible sources. Sales figures, search
                volumes and ratings will be identified by source and data type.
              </p>
              <span className="text-xs text-slate-500">
                Gemini + Groq
              </span>
            </div>
          </div>
        </section>

        {/* Research progress */}
        {isLoading && (
          <section
            role="status"
            aria-live="polite"
            className="mx-auto mt-8 max-w-5xl rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.035] p-5 sm:p-7"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-200">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-cyan-300/25 border-t-cyan-200" />
                </div>
                <div>
                  <p className="font-semibold text-white">
                    Research is in progress
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Collecting and processing available evidence. Completion
                    time depends on source availability and response times.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={cancelResearch}
                className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <Icon name="close" className="h-4 w-4" />
                Cancel research
              </button>
            </div>
            <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full w-1/3 animate-[research-progress_1.8s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
            </div>
            <style jsx>{`
              @keyframes research-progress {
                0% {
                  transform: translateX(-110%);
                }
                100% {
                  transform: translateX(330%);
                }
              }
            `}</style>
          </section>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <section
            role="alert"
            className="mx-auto mt-8 max-w-5xl rounded-2xl border border-rose-400/20 bg-rose-400/[0.045] p-5 sm:p-6"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-400/10 text-rose-300">
                !
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-rose-100">
                  We couldn&apos;t complete the research
                </h3>
                <p className="mt-2 break-words text-sm leading-6 text-rose-100/70">
                  {error}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Your settings have not been saved. Review the configuration
                  and try again.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Empty state / capabilities */}
        {!result && !isLoading && !error && (
          <section className="mx-auto mt-14 max-w-5xl sm:mt-16">
            <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Built for better decisions
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  From product discovery to a clear decision
                </h2>
              </div>
              <p className="text-sm text-slate-500">
                One workflow. Multiple evidence sources.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                number="01"
                title="Compare what matters"
                description="Evaluate product specifications, prices, customer ratings and expert testing side by side, where reliable data is available."
                icon="chart"
              />
              <FeatureCard
                number="02"
                title="Understand market signals"
                description="Explore available search-interest, social engagement and regional indicators without confusing attention with actual sales."
                icon="globe"
              />
              <FeatureCard
                number="03"
                title="Keep evidence visible"
                description="Trace important findings back to their sources. Identify estimates, missing metrics and conclusions that need further validation."
                icon="shield"
              />
            </div>

            <div
              id="methodology"
              className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-slate-300">
                  <Icon name="shield" />
                </span>
                <div>
                  <h3 className="font-semibold text-white">
                    Evidence before conclusions
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                    Product rankings depend on the selected criteria and the
                    evidence available. Public data rarely covers every
                    product or country equally. The report should distinguish
                    observed facts, third-party estimates and AI-generated
                    interpretations.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Completed report */}
        {result && !isLoading && (
          <section
            aria-label="Generated research report"
            className="mx-auto mt-12 max-w-[1320px] scroll-mt-6"
          >
            <div className="mb-6 flex flex-col justify-between gap-4 border-b border-white/[0.08] pb-5 sm:flex-row sm:items-end">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Research completed
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Your research report
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Review the findings, inspect the sources and export your
                  comparison.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setResult(undefined);
                  setError(null);
                  document
                    .querySelector("main")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.03] px-4 text-sm font-medium text-slate-200 transition hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                New research
                <Icon name="arrow" className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0D121C] p-3 sm:p-5 lg:p-7">
              <ReportContainer result={result} />
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-20 border-t border-white/[0.07] pt-6">
          <div className="flex flex-col justify-between gap-3 text-xs leading-5 text-slate-600 sm:flex-row sm:items-center">
            <p>
              Product Intelligence
              <span className="mx-2 text-slate-700">/</span>
              Research and comparison workspace
            </p>
            <p>
              AI-assisted analysis. Verify important decisions against
              original sources.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
