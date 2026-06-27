import DiscussionExchange from "./DiscussionExchange";
import { Exchange } from "@/types/project";

interface DiscussionPanelProps {
  exchanges: Exchange[];
}

export default function DiscussionPanel({
  exchanges,
}: DiscussionPanelProps) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-black my-5">
      <div className="border-b border-zinc-800 p-5">
        <h2 className="text-lg font-semibold text-zinc-100">
          Architecture Discussion
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Conversation history with the architectural reasoning engine.
        </p>
      </div>

      <div className="max-h-[300px] space-y-8 overflow-y-auto p-6">
        {exchanges.map((exchange, idx) => (
          <DiscussionExchange
            key={idx}
            exchange={exchange}
          />
        ))}
      </div>

      <div className="border-t border-zinc-800 p-4">
        <form>
          <textarea
            rows={4}
            placeholder="Ask about scalability, deployment, databases, messaging..."
            className="w-full resize-none rounded-2xl border border-zinc-800 bg-black p-4 text-sm outline-none"
          />

          <button
            className="mt-4 rounded-xl bg-lime-300 px-5 py-3 text-sm font-medium text-black cursor-pointer"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}