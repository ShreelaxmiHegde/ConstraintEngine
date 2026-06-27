import { Constraint } from "@/types/project";

interface ConstraintsPanelProps {
  constraints: Constraint[];
}

export default function ConstraintsPanel({
  constraints,
}: ConstraintsPanelProps) {
  const groupedConstraints = constraints.reduce<
    Record<string, Constraint[]>
  >((acc, constraint) => {
    if (!acc[constraint.category]) {
      acc[constraint.category] = [];
    }

    acc[constraint.category].push(constraint);

    return acc;
  }, {});

  return (
    <section className="rounded-xl border border-zinc-800 bg-black p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-100">
          Extracted Constraints
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          {constraints.length} extracted constraints
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedConstraints).map(
          ([category, categoryConstraints]) => (
            <div key={category}>
              <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-zinc-400">
                {category}
              </h3>

              <div className="space-y-3">
                {categoryConstraints.map((constraint, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3"
                  >
                    <p className="text-sm text-zinc-100">
                      {constraint.value}
                    </p>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-zinc-500">
                        Confidence
                      </span>

                      <span className="text-xs font-medium text-zinc-300">
                        {Math.round(
                          constraint.confidence * 100
                        )}
                        %
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}