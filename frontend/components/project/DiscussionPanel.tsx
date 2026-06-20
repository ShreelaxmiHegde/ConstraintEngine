"use client";

import { ChangeEvent, useState } from "react";
import ConversationMessage from "./ConversationMessage";
import { ConversationMessage as Message } from "@/types/conversation";

interface Props {
  messages: Message[];
}

export default function DiscussionPanel({
  messages,
}: Props) {
  const [prompt, setPrompt] = useState("");

  const handlePromptSubmit = async (evt: ChangeEvent) => {
    evt.preventDefault();

    try {
      console.log("You asked: ", prompt);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="rounded-[28px] border border-zinc-900 bg-zinc-950/70">
      <div className="border-b border-zinc-900 p-5">
        <h2 className="font-medium">
          Architecture Discussion
        </h2>
      </div>

      <div className="h-[500px] overflow-y-auto p-5 space-y-4">
        {messages.map((message) => (
          <ConversationMessage
            key={message.id}
            message={message}
          />
        ))}
      </div>

      <div className="border-t border-zinc-900 p-4">
        <form onSubmit={handlePromptSubmit}>
          <textarea
            value={prompt}
            onChange={(e) =>
              setPrompt(e.target.value)
            }
            rows={4}
            placeholder="Ask about scaling, database design, deployment strategy..."
            className="w-full resize-none rounded-2xl border border-zinc-800 bg-black p-4 text-sm outline-none"
          />
          <button
            className="mt-4 rounded-2xl bg-lime-300 px-5 py-3 text-sm font-medium text-black"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}