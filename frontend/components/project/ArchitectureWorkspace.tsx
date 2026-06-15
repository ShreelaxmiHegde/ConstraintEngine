interface Props {
  architectureState: Record<string, unknown>;
}

export default function ArchitectureWorkspace({
  architectureState,
}: Props) {
  return (
    <div className="rounded-[28px] border border-zinc-900 bg-zinc-950/70">
      <div className="border-b border-zinc-900 p-5">
        <h2 className="font-medium">
          Architecture State
        </h2>
      </div>

      <div className="p-5 space-y-5">
        {Object.entries(architectureState).map(
          ([domain, value]) => (
            <div
              key={domain}
              className="
                rounded-2xl
                border
                border-zinc-900
                bg-black
                p-5
              "
            >
              <h3 className="font-medium capitalize text-lime-300">
                {domain}
              </h3>

              <pre className="mt-3 whitespace-pre-wrap text-sm text-zinc-400">
                {JSON.stringify(value, null, 2)}
              </pre>
            </div>
          )
        )}
      </div>
    </div>
  );
}