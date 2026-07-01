"use client"

import React, { ChangeEvent, useState } from "react";
import Discussions from "./Discussions";
import { UiExchange } from "@/types/conversation";
import { getResponse } from "@/services/conversation";

interface DiscussionPanelProps {
  exchanges: UiExchange[];
}

export default function DiscussionPanel({
  exchanges,
}: DiscussionPanelProps) {
  const [exchange, setExchange] = useState("");
  const [uiExchanges, setUiExchanges] = useState<UiExchange[] | []>(exchanges);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setExchange(evt.target.value);
  }

  const handleExchangeClick = async (evt: ChangeEvent) => {
    evt.preventDefault();
    try {
      const newExchange: UiExchange = {
        id: crypto.randomUUID(),
        queryText: exchange,
        responseText: "",
        status: "pending"
      }

      exchanges.push(newExchange);
      setUiExchanges(exchanges);
      setExchange("");

      const res = await getResponse(exchange);
      const updatedExchanges: UiExchange[] = exchanges.map((e) =>
        e.id === newExchange.id ? {
          ...newExchange,
          responseText: res.response,
          status: "completed"
        } : e
      );
      setUiExchanges(updatedExchanges);

      return;
    } catch (err) {
      console.log(err);
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

      <Discussions exchanges={uiExchanges} />

      <div className="border-t border-zinc-800 p-4">
        <form onSubmit={handleExchangeClick}>
          <textarea
            rows={4}
            value={exchange}
            placeholder="Ask about scalability, deployment, databases, messaging..."
            className="w-full resize-none rounded-2xl border border-zinc-800 bg-black p-4 text-sm outline-none"
            minLength={1}
            maxLength={300}
            onChange={handleChange}
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