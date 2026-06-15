import ProjectReviewHeader from "@/components/project/ProjectReviewHeader";
import ConstraintsPanel from "@/components/project/ConstraintsPanel";
import DecisionsPanel from "@/components/project/DecisionsPanel";
import QuestionsPanel from "@/components/project/QuestionsPanel";
import ArchitectureStatePanel from "@/components/project/ArchitectureStatePanel";
import ConfirmProjectBar from "@/components/project/ConfirmProjectBar";

export default async function Page() {
  // replace with actual fetch

  const data = {
    constraints: [
      {
        category: "Database",
        value: "PostgreSQL",
        source: "User Description",
        confidence: 0.96,
      },
      {
        category: "Scale",
        value: "100k concurrent users",
        source: "User Description",
        confidence: 0.87,
      },
      {
        category: "Authentication",
        value: "RBAC",
        source: "User Description",
        confidence: 0.91,
      },
    ],

    decisions: [
      {
        decision:
          "Use relational database",
        reason:
          "Strong transactional consistency required.",
        confidence: 0.93,
      },
    ],

    unresolvedQuestions: [
      {
        question:
          "Expected inventory update rate?",
        reason:
          "Impacts caching and replication strategy.",
      },
    ],

    architectureState: {
      frontend: {
        framework: "Next.js",
      },
      backend: {
        runtime: "Node.js",
      },
      database: {
        engine: "PostgreSQL",
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
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

      <main className="relative max-w-7xl mx-auto px-4 py-10">
        <ProjectReviewHeader
          title="Ecommerce Platform"
          description="Building ecommerce system with realtime inventory updates, transactional workload, analytical reporting and future horizontal scalability."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ConstraintsPanel
              constraints={data.constraints}
            />
          </div>

          <div className="lg:col-span-7">
            <DecisionsPanel
              decisions={data.decisions}
            />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <QuestionsPanel
              questions={
                data.unresolvedQuestions
              }
            />
          </div>

          <div className="lg:col-span-6">
            <ArchitectureStatePanel
              architectureState={
                data.architectureState
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <ConfirmProjectBar />
        </div>
      </main>
    </div>
  );
}