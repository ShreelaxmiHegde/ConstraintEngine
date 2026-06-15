import { ArchitectureChange } from "@/types/conversation";

interface Props {
  changes: ArchitectureChange[];
}

export default function ArchitectureDiffPanel({
  changes,
}: Props) {
  const styles = {
    added:
      "border-lime-300/40 bg-lime-300/5",
    updated:
      "border-blue-400/40 bg-blue-400/5",
    removed:
      "border-red-400/40 bg-red-400/5",
  };

  return (
    <div className="rounded-[28px] border border-zinc-900 bg-zinc-950/70">
      <div className="border-b border-zinc-900 p-5">
        <h2 className="font-medium">
          Architecture Changes
        </h2>
      </div>

      <div className="p-5 space-y-4">
        {changes.map((change, index) => (
          <div
            key={index}
            className={`
              rounded-2xl
              border
              p-4
              ${styles[change.type]}
            `}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium">
                {change.title}
              </h3>

              <span className="text-xs uppercase">
                {change.type}
              </span>
            </div>

            <p className="mt-2 text-sm text-zinc-400 leading-6">
              {change.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}