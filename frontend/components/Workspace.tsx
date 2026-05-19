"use client"

import axios from "axios";
import { useState } from "react";
import { firstConvo } from "../api"

type QueryData = {
  query: string;
}

export default function Workspace() {
  const recommendations = [
    {
      category: "Primary Database",
      value: "PostgreSQL",
      reason:
        "Strong transactional consistency, mature relational modeling and scalable indexing capabilities.",
    },
    {
      category: "Caching Layer",
      value: "Redis",
      reason:
        "Low latency cache layer for inventory synchronization and session acceleration.",
    },
    {
      category: "Vector Memory",
      value: "pgvector",
      reason:
        "Semantic retrieval and architecture memory integration within PostgreSQL.",
    },
  ];

  const [query, setQuery] = useState<QueryData>({ query: "" });

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const query = evt.currentTarget.value;
    setQuery({ "query": query })
  }

  const handleSubmit = async (evt: React.SubmitEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      const res = await firstConvo(query);
      console.log("Response got: ", res);

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      } else if (error instanceof Error) {
        console.log(error);
      } else {
        console.log("Unknown Error: ", error)
      }
    }
  }

  return (
    <div className="mt-16 grid grid-cols-12 gap-6">
      {/* Left Input Side */}
      <section className="col-span-12 lg:col-span-5 space-y-6">
        <div className="rounded-[32px] border border-zinc-900 bg-zinc-950/70 backdrop-blur overflow-hidden">
          <div className="border-b border-zinc-900 px-6 py-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">
                Workload Definition
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Describe your architecture and system constraints
              </p>
            </div>

            <div className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-500">
              Input Layer
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full min-h-[260px] resize-none rounded-3xl border border-zinc-900 bg-black px-5 py-5 text-sm leading-8 outline-none placeholder:text-zinc-600"
                placeholder="Building ecommerce system with realtime inventory, analytical queries and scalable transactional workload..."
                value={query.query}
                onChange={handleChange}
              />

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "High write throughput",
                  "Relational schema",
                  "ACID consistency",
                  "Realtime inventory",
                  "Analytics workload",
                  "Scalable API layer",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-zinc-800 bg-black px-3 py-1.5 text-xs text-zinc-400"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <button
                  className="flex-1 rounded-2xl bg-zinc-100 py-3.5 text-sm font-medium text-black hover:bg-zinc-300 transition"
                  type="submit"
                >
                  Run Analysis
                </button>

                <button className="rounded-2xl border border-zinc-800 bg-black px-5 py-3.5 text-sm text-zinc-400 hover:text-zinc-100 transition">
                  Examples
                </button>
              </div>
            </form>

          </div>
        </div>
      </section>

      {/* Right Recommendation Side */}
      <section className="col-span-12 lg:col-span-7 space-y-6">
        {/* Recommendation Output */}
        <div className="rounded-[32px] border border-zinc-900 bg-zinc-950/70 overflow-hidden">
          <div className="border-b border-zinc-900 px-6 py-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">
                Infrastructure Recommendation
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Generated architecture synthesis output
              </p>
            </div>

            <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
              Runtime Active
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            {recommendations.map((item) => (
              <div
                key={item.category}
                className="rounded-3xl border border-zinc-900 bg-black p-5"
              >
                <p className="text-xs uppercase tracking-wider text-zinc-600">
                  {item.category}
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                  {item.value}
                </h2>

                <p className="mt-5 text-sm leading-7 text-zinc-500">
                  {item.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Reasoning Output */}
        <div className="rounded-[32px] border border-zinc-900 bg-zinc-950/70 overflow-hidden">
          <div className="border-b border-zinc-900 px-6 py-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">
                Constraint Reasoning
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Internal infrastructure analysis generated by the reasoning engine
              </p>
            </div>

            <div className="text-xs text-zinc-600">
              latency 1.2s
            </div>
          </div>

          <div className="p-6">
            <div className="rounded-3xl border border-zinc-900 bg-black p-6">
              <p className="text-sm leading-8 text-zinc-300">
                The workload indicates a transactional system requiring
                strong relational consistency alongside analytical querying
                and inventory synchronization. PostgreSQL is recommended as
                the primary operational database because it provides mature
                ACID guarantees, indexing flexibility and scalable
                relational modeling. Redis should be introduced as a
                supplementary caching layer to accelerate realtime access
                paths and reduce repeated query pressure.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}