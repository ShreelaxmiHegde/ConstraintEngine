interface ProjectHeaderProps {
  description: string;
  currentVersion: number;
  constraintCount: number;
  decisionCount: number;
}

export default function ProjectHeader({
  description,
  currentVersion,
  constraintCount,
  decisionCount
}: ProjectHeaderProps) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-black p-6">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-sm uppercase tracking-wider text-lime-400">
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
          <div>
            <p className="text-medium text-zinc-500">
              Current Architecture: {" "}
              <span className="font-medium text-zinc-100">
                v{currentVersion}
              </span>
            </p>

          </div>

          <div>
            <p className="text-medium text-zinc-500">
              Constraints: {" "}
              <span className="font-medium text-zinc-100">
                {constraintCount}
              </span>

            </p>
          </div>

          <div>
            <p className="text-medium text-zinc-500">
              Decisions: {" "}
              <span className="font-medium text-zinc-100">
                {decisionCount}
              </span>

            </p>
          </div>
        </div>
      </div>
    </section>
  );
}