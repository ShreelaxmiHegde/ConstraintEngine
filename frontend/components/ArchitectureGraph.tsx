export default function ArchitectureGraph() {
  return (
    <div className="rounded-[32px] border border-zinc-900 bg-zinc-950/70 overflow-hidden">
      <div className="border-b border-zinc-900 px-6 py-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">
            Generated Architecture Graph
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Runtime topology synthesized from workload constraints
          </p>
        </div>

        <div className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-500">
          Graph Layer
        </div>
      </div>

      <div className="relative p-10 min-h-[420px] bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative flex flex-col items-center gap-12">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 px-8 py-5 text-center shadow-2xl shadow-black/30">
            <p className="text-xs uppercase tracking-widest text-zinc-600">
              Client Layer
            </p>
            <h3 className="mt-3 text-lg font-semibold">Next.js Frontend</h3>
          </div>

          <div className="h-12 w-px bg-zinc-800" />

          <div className="grid grid-cols-2 gap-12">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 px-8 py-5 text-center">
              <p className="text-xs uppercase tracking-widest text-zinc-600">
                Backend Runtime
              </p>
              <h3 className="mt-3 text-lg font-semibold">Node.js API</h3>
            </div>

            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 px-8 py-5 text-center">
              <p className="text-xs uppercase tracking-widest text-emerald-500/60">
                AI Runtime
              </p>
              <h3 className="mt-3 text-lg font-semibold">FastAPI + Agno</h3>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-10">
            {[
              "PostgreSQL",
              "Redis Cache",
              "pgvector",
            ].map((service) => (
              <div
                key={service}
                className="rounded-3xl border border-zinc-900 bg-zinc-950 px-6 py-5 text-center"
              >
                <p className="text-xs uppercase tracking-widest text-zinc-600">
                  Infrastructure
                </p>
                <h3 className="mt-3 text-base font-medium">{service}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}