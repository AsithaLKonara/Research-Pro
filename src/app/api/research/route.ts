import { NextResponse } from "next/server";
import { runResearchPipeline } from "@/lib/research/pipeline";
import { ResearchQuery, AdvancedSettings } from "@/lib/types/research";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const query: ResearchQuery = body.query;
    const settings: AdvancedSettings = body.settings;

    if (!query || !query.rawQuery) {
      return NextResponse.json({ error: "Missing required query parameter" }, { status: 400 });
    }

    // Hardening: Enforce reasonable limits
    if (settings.productCount > 20) {
      settings.productCount = 20;
    }

    // Execute the end-to-end pipeline
    const pipelineResult = await runResearchPipeline(query, settings);

    return NextResponse.json(pipelineResult);
  } catch (error: any) {
    console.error("[API/Research] Pipeline execution failed:", error);
    return NextResponse.json(
      { error: "Failed to generate research report. " + (error?.message || "Unknown error") },
      { status: 500 }
    );
  }
}
