"use client"

import { SubmitEvent, useEffect, useState } from "react";
import Step from "@/components/dashboard/Step";
import { steps } from "@/contents/dashboard";
import { createProject, fetchAllProjects } from "@/services/project.service";
import { useAuth } from "@/context/useAuth";
import { ProjectType } from "@/types/project";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Page() {
  const [projectDesc, setProjectDesc] = useState("");
  const [projects, setProjects] = useState<ProjectType[] | null>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { currUser } = useAuth();
  const router = useRouter();

  const handleProjectClick = async (evt: SubmitEvent) => {
    evt.preventDefault();
    if (isSubmitting) return; // overcome double click race condition
    setIsSubmitting(true);
    setError("");

    try {
      const res = await createProject(projectDesc);
      console.log(res);
      router.push(`/projects/${res.projectId}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data);
        setError(err.response?.data.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    async function getProjects() {
      try {
        const res = await fetchAllProjects();
        console.log(res.projects);
        setProjects(res.projects);
      } catch (err) {
        console.log(err);
      }
    }

    getProjects();
  }, []);

  return (
    <>
      <section className="max-w-4xl">
        <p className="text-xs uppercase tracking-[0.25em] text-lime-300">
          ConstraintEngine
        </p>

        <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-none">
          Constraint-aware <br /> architecture <br /> reasoning.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
          Transform project requirements into
          structured constraints, architectural
          decisions and infrastructure strategies.
        </p>
      </section>

      <div className="mt-12 rounded-[28px] border border-zinc-900 bg-zinc-950/70 backdrop-blur p-6">
        <div className="grid md:grid-cols-4 gap-6 mb-4">
          {steps.map((step) => (
            <Step
              key={step.number}
              number={step.number}
              title={step.title}
              text={step.text}
            />
          ))}
        </div>

        {(currUser && (projects?.length != 0)) && (
          <div className="border-t border-zinc-900">
            <h2 className="font-medium text-zinc-300 my-3">
              Your Projects
            </h2>

            <div>
              {projects?.map((project, idx) => (
                <div key={idx} className="flex gap-1">
                  <span className="text-xs">{idx + 1} {"."} </span>
                  <Link href={`/projects/${project.id}`} className="flex gap-2">
                    <p className="cursor-pointer underline text-sky-500 text-xs gap-r-2">
                      {project.id}
                    </p>
                    <ExternalLink size={18} className="text-sky-500" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 rounded-[32px] border border-zinc-900 bg-zinc-950/70 backdrop-blur overflow-hidden">
        <div className="flex justify-between border-b border-zinc-900 px-6 py-5">
          <div>
            <h2 className="font-medium">
              Describe Your Project
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Constraint extraction starts here.
            </p>
          </div>
          <span className="text-xs text-zinc-600">
            No account required
          </span>
        </div>

        <div className="p-6">
          <form onSubmit={handleProjectClick}>
            <textarea
              className="w-full min-h-[180px] resize-none rounded-3xl border border-zinc-900 bg-black px-5 py-5 text-sm leading-8 outline-none"
              placeholder="Building ecommerce platform with realtime inventory synchronization, high transactional throughput and analytical reporting..."
              minLength={20}
              maxLength={5000}
              value={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
              disabled={isSubmitting}
            />

            <div className="flex gap-2 item-center justify-between mt-4">
              <button
                className="rounded-2xl bg-lime-300 px-6 py-3 text-sm font-medium text-black disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isSubmitting || projectDesc.trim() === ""}
              >
                Analyze Project
              </button>

              {isSubmitting && (
                <p className="animate-pulse text-lime-400">Validating your message...</p>
              )}
              {error && (
                <p className="text-red-600"><i>{"> "}{error}</i></p>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}