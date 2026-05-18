export default function HistoryPage() {
  const sessions = [
    "Realtime Ecommerce Infrastructure",
    "Distributed Analytics Platform",
    "Financial Transaction System",
    "Event-driven Notification Pipeline",
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div>
          <h1 className="text-5xl font-semibold tracking-tight">
            Architecture Sessions
          </h1>

          <p className="mt-4 text-zinc-500 max-w-2xl leading-8">
            Persisted infrastructure reasoning sessions, runtime outputs and database architecture analyses.
          </p>
        </div>

        <div className="mt-12 grid gap-5">
          {sessions.map((session, index) => (
            <div
              key={session}
              className="rounded-[28px] border border-zinc-900 bg-zinc-950/70 p-6 flex items-center justify-between"
            >
              <div>
                <p className="text-xl font-medium tracking-tight">
                  {session}
                </p>

                <p className="mt-2 text-sm text-zinc-500">
                  Generated runtime topology, schema reasoning and infrastructure recommendations.
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-zinc-600">
                  session_{index + 1}
                </p>

                <button className="mt-3 rounded-2xl border border-zinc-800 bg-black px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 transition">
                  Open Workspace
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}