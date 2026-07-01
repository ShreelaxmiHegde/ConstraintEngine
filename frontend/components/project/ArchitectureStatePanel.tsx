import { ArchitectureVersion } from "@/types/project";
import JsonTree from "./JsonTree";

interface ArchitectureStatePanelProps {
  currVersion: ArchitectureVersion
}

export default function ArchitectureStatePanel({
  currVersion
}: ArchitectureStatePanelProps) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-black p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-100">
            Current Architecture State
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Version {currVersion.version}
          </p>
        </div>

        <div className="rounded-md border border-zinc-800 px-3 py-2">
          <p className="text-xs text-zinc-500">
            Decisions: {" "}
            {currVersion.decisions.length}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
        <h3 className="text-sm font-medium text-zinc-300">
          Summary
        </h3>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          {currVersion.summary}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-zinc-400">
          Architecture
        </h3>

        <JsonTree
          data={
            currVersion.architectureState
          }
        />
      </div>
    </section>
  );
}