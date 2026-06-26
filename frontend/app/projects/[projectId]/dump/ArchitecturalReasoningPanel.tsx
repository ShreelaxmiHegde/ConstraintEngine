interface Decision {
  decision: string,
  reason: string,
  confidence: number
}

interface ArchitecturalReasoningPanelProps {
  decisions: Decision[];
}

export default function ArchitecturalReasoningPanel({
  decisions,
}: ArchitecturalReasoningPanelProps) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-100">
            Architectural Reasoning
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            AI-generated architectural decisions and their rationale.
          </p>
        </div>

        <div className="rounded-md border border-zinc-800 px-3 py-2">
          <p className="text-xs text-zinc-500">
            Decisions
          </p>

          <p className="font-medium text-zinc-100">
            {decisions.length}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {decisions.map((decision, index) => (
          <article
            key={index}
            className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Decision
                </p>

                <h3 className="mt-1 text-base font-medium text-zinc-100">
                  {decision.decision}
                </h3>
              </div>

              <div className="rounded-md border border-zinc-800 px-2 py-1">
                <span className="text-xs text-zinc-400">
                  {Math.round(decision.confidence * 100)}%
                </span>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Reasoning
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {decision.reason}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}