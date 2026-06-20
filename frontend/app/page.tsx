"use client"

import React, { ChangeEvent, useState } from "react";
import Step from "@/components/dashboard/Step";
import { examples, steps } from "@/contents/dashboard";
import { createProject } from "@/services/project.service";

export default function Page() {
  const [projectDesc, setProjectDesc] = useState("");

  const handleChange = async (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProjectDesc(evt.target.value)
  }

  const handleProjectClick = async (evt: ChangeEvent) => {
    evt.preventDefault();

    try {
      const res = await createProject(projectDesc);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

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
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step) => (
            <Step
              key={step.number}
              number={step.number}
              title={step.title}
              text={step.text}
            />
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-[32px] border border-zinc-900 bg-zinc-950/70 backdrop-blur overflow-hidden">
        <div className="border-b border-zinc-900 px-6 py-5">
          <h2 className="font-medium">
            Describe Your Project
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Constraint extraction starts here.
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleProjectClick}>
            <textarea
              className="w-full min-h-[180px] resize-none rounded-3xl border border-zinc-900 bg-black px-5 py-5 text-sm leading-8 outline-none"
              placeholder="Building ecommerce platform with realtime inventory synchronization, high transactional throughput and analytical reporting..."
              onChange={handleChange}
            />

            <div className="mt-6 flex justify-between items-center">
              <span className="text-xs text-zinc-600">
                No account required
              </span>

              <button
                className="rounded-2xl bg-lime-300 px-6 py-3 text-sm font-medium text-black"
              >
                Analyze Project
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-12">
        <p className="text-sm text-zinc-500">
          Example Workloads
        </p>

        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {examples.map((example) => (
            <button
              key={example}
              className="text-left rounded-2xl border border-zinc-900 bg-zinc-950/70 p-5 hover:border-zinc-700 transition">
              {example}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}