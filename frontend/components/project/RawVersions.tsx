import { ArchitectureVersion } from "@/types/project"

interface RawVersionProps {
  versions: ArchitectureVersion[]
}

export default function RawVersion({
  versions
}: RawVersionProps) {

  return (
    <section className="rounded-xl border border-zinc-800 bg-black p-6 my-5">
      <div>
        <p className="text-sm uppercase tracking-wider text-zinc-300 mb-3">Your architecture version evolution</p>
        {versions.map((v, idx) => (
          <details key={idx}>
            <summary className="cursor-pointer text-sm text-zinc-500">
              Version: {" "}{v.version}
            </summary>
            <pre className="mt-4 overflow-auto rounded-lg border border-zinc-800 bg-black/30 p-4 text-xs text-zinc-400 max-h-[200px] space-y-8 overflow-y-auto p-6">
              {JSON.stringify(
                v,
                null,
                2
              )}
            </pre>
          </details>
        ))}
      </div>
    </section>
  )
}