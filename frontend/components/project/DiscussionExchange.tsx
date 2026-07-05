import { Exchange } from "@/types/project";
import { useEffect, useRef } from "react";

interface DiscussionExchangeProps {
  exchanges: Exchange[]
}

export default function DiscussionExchange({
  exchanges,
}: DiscussionExchangeProps) {
  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [exchanges.length]);

  return (
    <>
      {(exchanges.length === 0) ? (
        <div className="p-6">
          <hr />
          <p className="text-lime-400 mt-2">Start making architectural decisions.</p>
          <p className="text-zinc-400 mb-2">Ask about design decisions, trade-offs, scalability, security, or request flow.</p>
          <hr />
        </div>
      ) :
        <div
          className="max-h-[300px] space-y-8 overflow-y-auto p-6"
          ref={chatRef}
        >
          {exchanges.map((exchange) => (
            <>
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
            </>
          ))}
        </div>
      }
    </>
  );
}