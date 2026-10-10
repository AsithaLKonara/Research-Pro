import { ResearchForm } from "@/components/research/ResearchForm";
import { ReportContainer } from "@/components/report/ReportContainer";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="w-full max-w-4xl text-center space-y-6 animate-fade-in mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Product <span className="text-gradient">Intelligence</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          AI-powered global product research and comparison platform.
          Generate evidence-backed reports to find the best products in any category.
        </p>
      </div>

      {/* Main Research Workspace */}
      <div className="w-full max-w-4xl space-y-12">
        <ResearchForm />
        
        <div className="divider" />
        
        {/* Placeholder for results, initially empty or showing a mock for now */}
        <ReportContainer />
      </div>
    </main>
  );
}
