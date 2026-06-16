import ConstraintsPanel from "@/components/project/ConstraintsPanel";
import ArchitectureWorkspace from "@/components/project/ArchitectureWorkspace";
import DiscussionPanel from "@/components/project/DiscussionPanel";
import ArchitectureDiffPanel from "@/components/project/ArchitectureDiffPanel";
import ProjectReviewHeader from "@/components/project/ProjectReviewHeader";
import { project, messages, changes } from "@/contents/project";

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
          title={project.title}
          description={project.description}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ConstraintsPanel
              constraints={project.constraints}
            />
          </div>

          <div className="lg:col-span-8">
            <ArchitectureWorkspace
              architectureState={
                project.architectureState
              }
            />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <DiscussionPanel
              messages={messages}
            />
          </div>

          <div className="lg:col-span-5">
            <ArchitectureDiffPanel
              changes={changes}
            />
          </div>
        </div>
      </main>
    </div>
  );
}