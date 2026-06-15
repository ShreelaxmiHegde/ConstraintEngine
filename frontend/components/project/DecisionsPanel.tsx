import { Decision } from "@/types/project";

interface Props {
  decisions: Decision[];
}

export default function DecisionsPanel({
  decisions,
}: Props) {
  return (
    <div className="rounded-[28px] border border-zinc-900 bg-zinc-950/70">
      <div className="border-b border-zinc-900 p-5">
        <h2 className="font-medium">
          Agent Decisions
        </h2>
      </div>

      <div className="p-5 space-y-4">
        {decisions.map((decision, index) => (
          <div
            key={index}
            className="rounded-xl border border-zinc-900 bg-black p-4"
          >
            <p className="font-medium">
              {decision.decision}
            </p>

            <p className="mt-2 text-sm text-zinc-400 leading-6">
              {decision.reason}
            </p>

            <p className="mt-3 text-xs text-zinc-500">
              Confidence:{" "}
              {(decision.confidence * 100).toFixed(0)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}