"use client";

import ConstraintsPanel from "@/components/project/ConstraintsPanel";
import ArchitectureWorkspace from "@/components/project/ArchitectureWorkspace";
import DiscussionPanel from "@/components/project/DiscussionPanel";
import ArchitectureDiffPanel from "@/components/project/ArchitectureDiffPanel";
import ProjectReviewHeader from "@/components/project/ProjectReviewHeader";
import DecisionsPanel from "@/components/project/DecisionsPanel";
import ArchitectureStatePanel from "@/components/project/ArchitectureStatePanel";
import { messages, changes } from "@/contents/project";
import { useEffect, useState } from "react";
import { fetchProject } from "@/services/project.service";
// import { ProjectType } from "@/types/project";

interface Constraint {
  category: string;
  value: string;
  source: string;
  confidence: number;
}

interface ProjectType {
  title: string;
  rawDescription: string;
  extractedConstraints: Constraint[];
}

export default function Page() {
  const [project, setProject] = useState<ProjectType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetchProject();
        console.log(res)
        const pro = res.projects[0];
        setProject(pro); // adjust according to API
        console.log(project);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>No project found</div>;
  }

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
          description={project.rawDescription}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <ConstraintsPanel
              extractedConstraints={project.extractedConstraints}
            />
          </div>

          {/* <div className="lg:col-span-6">
            <ArchitectureWorkspace
              architectureState={
                project.architectureState
              }
            />
          </div>

          <div className="lg:col-span-6">
            <DecisionsPanel
              decisions={project.decisions}
            />
          </div>

          <div className="lg:col-span-6">
            <ArchitectureStatePanel
              architectureState={project.architectureState}
            />
          </div> */}
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