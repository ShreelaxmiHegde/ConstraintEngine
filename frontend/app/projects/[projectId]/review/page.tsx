import ProjectReviewHeader from "@/components/project/ProjectReviewHeader";
import ConstraintsPanel from "@/components/project/ConstraintsPanel";
import DecisionsPanel from "@/components/project/DecisionsPanel";
import QuestionsPanel from "@/components/project/QuestionsPanel";
import ArchitectureStatePanel from "@/components/project/ArchitectureStatePanel";
import ConfirmProjectBar from "@/components/project/ConfirmProjectBar";
import { data } from "@/contents/project";

export default async function Page() {
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