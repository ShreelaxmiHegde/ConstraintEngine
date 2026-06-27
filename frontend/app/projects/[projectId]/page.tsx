"use client"

import { useEffect, useState } from "react";
import { fetchProject } from "@/services/project.service";
import { ProjectType } from "@/types/project";
import RawVersion from "@/components/project/RawVersions";
import ProjectHeader from "@/components/project/ProjectHeader";
import DiscussionPanel from "@/components/project/DiscussionPanel";
import ConstraintsPanel from "@/components/project/ConstraintsPanel";
import ArchitectureStatePanel from "@/components/project/ArchitectureStatePanel";
import ArchitecturalReasoningPanel from "@/components/project/ArchitecturalReasoningPanel";


export default function Page() {
  const [project, setProject] = useState<ProjectType | null>(null);
  const [loading, setLoading] = useState(true);

  const projectId = "46892039-6c80-4fa3-aa7e-7266e49481d0";

  const countDecision = project?.archVersions.reduce(
    (count, version) => count + version.decisions.length,
    0
  ) ?? 0;

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetchProject(projectId);
        console.log(res);
        setProject(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, []);

  return (
    <>
      {(!loading && project) &&
        (<>
          <ProjectHeader
            description={project.project.desc}
            currentVersion={project.project.version}
            constraintCount={project.project.constraints.length}
            decisionCount={countDecision}
          />

          <div className="grid lg:grid-cols-12 gap-4 my-5">
            <div className="col-span-6">
              <ArchitectureStatePanel
                currVersion={project.archVersions[0]}
              />
              <DiscussionPanel exchanges={project.conversation.exchanges} />
            </div>

            <div className="col-span-6">
              <ConstraintsPanel
                constraints={project.project.constraints}
              />
              <ArchitecturalReasoningPanel
                decisions={project.archVersions[0].decisions}
              />
              <RawVersion versions={project.archVersions} />
            </div>
          </div>
        </>)
      }

      {
        loading && (
          <h1>loading...</h1>
        )
      }

    </>
  )
}