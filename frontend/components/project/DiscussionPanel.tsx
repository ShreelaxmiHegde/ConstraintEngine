"use client"

import axios from "axios";
import { SubmitEvent, useState } from "react";
import { Exchange } from "@/types/project";
import { getResponse } from "@/services/conversation";
import DiscussionExchange from "./DiscussionExchange";

interface DiscussionPanelProps {
  exchanges: Exchange[];
  projectId: string;
  conversationId: string;
}

export default function DiscussionPanel({
  exchanges,
  projectId,
  conversationId
}: DiscussionPanelProps) {
  const [exchange, setExchange] = useState("");
  const [uiExchanges, setUiExchanges] = useState<Exchange[]>(exchanges);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleExchangeClick = async (evt: SubmitEvent) => {
    evt.preventDefault();
    if (isSubmitting) return; // overcome double click race condition
    setIsSubmitting(true);
    setError("");

    try {
      const res = await getResponse(exchange, projectId, conversationId);
      const newExchange: Exchange = {
        queryText: exchange,
        responseText: res.response,
      };

      setUiExchanges((prev => [...prev, newExchange]));
      setExchange("");

      return;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data);
        setError(err.response?.data.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

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

      <DiscussionExchange exchanges={uiExchanges} />

      <div className="border-t border-zinc-800 p-4">
        <form onSubmit={handleExchangeClick}>
          <textarea
            rows={4}
            value={exchange}
            placeholder="Ask about scalability, deployment, databases, messaging..."
            className="w-full resize-none rounded-2xl border border-zinc-800 bg-black p-4 text-sm outline-none"
            minLength={1}
            maxLength={300}
            onChange={(e) => setExchange(e.target.value)}
            disabled={isSubmitting}
          />

          <div className="flex gap-2 item-center justify-between mt-4 ">
            {isSubmitting && (
              <p className="animate-pulse text-lime-400">Getting response...</p>
            )}
            {error && (
              <p className="text-red-600"><i>{"> "}{error}</i></p>
            )}
            <button
              className={isSubmitting || exchange.trim() === "" ? "rounded-xl px-5 py-3 text-sm font-medium bg-zinc-700 cursor-not-allowed"
                : "rounded-xl bg-lime-300 px-5 py-3 text-sm font-medium text-black cursor-pointer"}
              disabled={isSubmitting || exchange.trim() === ""}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}