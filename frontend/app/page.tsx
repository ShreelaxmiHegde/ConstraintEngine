import AnalysisMetadata from "@/components/AnalysisMetadata";
import ArchitectureGraph from "@/components/ArchitectureGraph";
import HistoryPage from "@/components/HistoryPage";
import ReasoningTrace from "@/components/ReasoningTrace";
import Workspace from "@/components/Workspace";
import Navbar from "@/shared/Navbar";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      {/* Background Grid */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Navbar />

      {/* Hero + Workspace */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-4 py-2 text-xs text-zinc-400">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            AI Agent Runtime Operational
          </div>

          <h1 className="mt-8 text-5xl md:text-7xl font-semibold tracking-tight leading-none">
            Constraint-aware
            <br />
            infrastructure reasoning.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
            Analyze backend workloads, schema design, database selection,
            indexing strategies and infrastructure tradeoffs through an AI-native
            systems reasoning engine.
          </p>
        </div>

        <Workspace />
      </section>

      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-10">
        <ArchitectureGraph />
        <AnalysisMetadata />
        <ReasoningTrace />
        <HistoryPage />
      </section>
    </div>
  );
}