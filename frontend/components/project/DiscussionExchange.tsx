import { Exchange } from "@/types/project";

interface DiscussionExchangeProps {
  exchange: Exchange
}

export default function DiscussionExchange({
  exchange,
}: DiscussionExchangeProps) {

  return (
    <div className="space-y-4">
      {/* User */}
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-3xl bg-lime-300 px-5 py-4 text-sm leading-7 text-black">
          {exchange.queryText}
        </div>
      </div>

      {/* Assistant */}
      <div className="flex justify-start">
        <div className="max-w-[85%] rounded-3xl border border-zinc-800 bg-zinc-900 px-5 py-4">
          <p className="text-sm leading-7 text-zinc-200">
            {exchange.responseText}
          </p>
        </div>
      </div>
    </div>
  );
}