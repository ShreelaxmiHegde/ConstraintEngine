interface Exchange {
  query: string,
  response: string
}

interface AnalysisHistoryPanelProps {
  exchanges: Exchange[];
}

export default function AnalysisPanel({
  exchanges,
}: AnalysisHistoryPanelProps) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-100">
          Analysis History
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Conversation history between the user and ConstraintEngine.
        </p>
      </div>

      <div className="space-y-6">
        {exchanges.map((exchange, index) => (
          <article
            key={index}
            className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-5"
          >
            {/* User */}

            <div>
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                User
              </p>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-zinc-100">
                {exchange.query}
              </p>
            </div>

            {/* AI */}

            <div className="mt-6">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                ConstraintEngine
              </p>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-zinc-300">
                {exchange.response}
              </p>
            </div>

            {/* Architecture Result */}

            {/* <div className="mt-6 border-t border-zinc-800 pt-4">
              {exchange.archStateChanged ? (
                <div className="rounded-md border border-emerald-900 bg-emerald-950/30 p-3">
                  <p className="text-sm font-medium text-emerald-300">
                    ✓ Architecture Updated
                  </p>

                  {exchange.versionCaused && (
                    <p className="mt-1 text-sm text-zinc-300">
                      Created Version{" "}
                      <span className="font-semibold">
                        V{exchange.versionCaused.version}
                      </span>
                    </p>
                  )}
                </div>
              ) : (
                <div className="rounded-md border border-zinc-800 bg-zinc-900 p-3">
                  <p className="text-sm text-zinc-400">
                    No architecture changes were made.
                  </p>
                </div>
              )}
            </div> */}
          </article>
        ))}
      </div>
    </section>
  );
}