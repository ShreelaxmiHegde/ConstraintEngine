import { Constraint } from "@/types/project";

interface Props {
  extractedConstraints: Constraint[];
}

export default function ConstraintsPanel({
  extractedConstraints,
}: Props) {
  const grouped = extractedConstraints.reduce(
    (acc, constraint) => {
      if (!acc[constraint.category]) {
        acc[constraint.category] = [];
      }

      acc[constraint.category].push(constraint);

      return acc;
    },
    {} as Record<string, Constraint[]>
  );

  return (
    <div className="rounded-[28px] border border-zinc-900 bg-zinc-950/70">
      <div className="border-b border-zinc-900 p-5">
        <h2 className="font-medium">
          Extracted Constraints
        </h2>
      </div>

      <div className="p-5 space-y-6">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-sm font-medium text-lime-300">
              {category}
            </h3>

            <div className="mt-3 space-y-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-zinc-900 bg-black p-4"
                >
                  <p className="text-sm">
                    {item.value}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                    <span>{item.source}</span>

                    <span>
                      {(item.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}