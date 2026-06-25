// import { ArchitectureVersion } from "@/types/project";
import JsonTree from "./JsonTree";

// interface ArchitectureStatePanelProps {
//   architectureVersion: ArchitectureVersion;
// }

interface Decision {
  decision: string,
  reason: string,
  confidence: string
}

interface Version {
  summary: string,
  architectureState: Record<string, unknown>,
  decisions: Decision[],
  version: number
}

interface ArchitectureVersion {
  currVersion: Version
}

export default function ArchitectureStatePanel({
  currVersion
}: ArchitectureVersion) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-100">
            Current Architecture
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Version {currVersion.version}
          </p>
        </div>

        <div className="rounded-md border border-zinc-800 px-3 py-2">
          <p className="text-xs text-zinc-500">
            Decisions
          </p>

          <p className="font-medium text-zinc-100">
            {
              currVersion.decisions
                .length
            }
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

      <details className="mt-8">
        <summary className="cursor-pointer text-sm text-zinc-500">
          View Raw Architecture State
        </summary>

        <pre className="mt-4 overflow-auto rounded-lg border border-zinc-800 bg-black/30 p-4 text-xs text-zinc-400">
          {JSON.stringify(
            currVersion.architectureState,
            null,
            2
          )}
        </pre>
      </details>
    </section>
  );
}