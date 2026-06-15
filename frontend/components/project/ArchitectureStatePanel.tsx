interface Props {
  architectureState: Record<string, unknown>;
}

export default function ArchitectureStatePanel({
  architectureState,
}: Props) {
  return (
    <div className="rounded-[28px] border border-zinc-900 bg-zinc-950/70">
      <div className="border-b border-zinc-900 p-5">
        <h2 className="font-medium">
          Initial Architecture State
        </h2>
      </div>

      <div className="p-5">
        <pre className="overflow-x-auto rounded-xl border border-zinc-900 bg-black p-4 text-xs text-zinc-300">
          {JSON.stringify(
            architectureState,
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}