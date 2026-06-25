interface ProjectHeaderProps {
  description: string;
  currentVersion: number;
  constraintCount: number;
  decisionCount: number;
  exchangeCount: number;
}

export default function ProjectHeader({
  description,
  currentVersion,
  constraintCount,
  decisionCount,
  exchangeCount,
}: ProjectHeaderProps) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-sm uppercase tracking-wider text-zinc-500">
            Project
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-zinc-100">
            Software Architecture Review
          </h1>

          <p className="mt-3 max-w-4xl text-sm leading-6 text-zinc-400">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-md border border-zinc-800 px-3 py-2">
            <p className="text-xs text-zinc-500">
              Current Architecture
            </p>

            <p className="font-medium text-zinc-100">
              V{currentVersion}
            </p>
          </div>

          <div className="rounded-md border border-zinc-800 px-3 py-2">
            <p className="text-xs text-zinc-500">
              Constraints
            </p>

            <p className="font-medium text-zinc-100">
              {constraintCount}
            </p>
          </div>

          <div className="rounded-md border border-zinc-800 px-3 py-2">
            <p className="text-xs text-zinc-500">
              Decisions
            </p>

            <p className="font-medium text-zinc-100">
              {decisionCount}
            </p>
          </div>

          <div className="rounded-md border border-zinc-800 px-3 py-2">
            <p className="text-xs text-zinc-500">
              Exchanges
            </p>

            <p className="font-medium text-zinc-100">
              {exchangeCount}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}