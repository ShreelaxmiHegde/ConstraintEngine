import DiscussionExchange from "./DiscussionExchange";
import { useEffect, useRef } from "react";
import { Exchange } from "@/types/project";

interface DiscussionPanelProps {
  exchanges: Exchange[];
}

export default function Discussions({
  exchanges
}: DiscussionPanelProps) {
  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [exchanges.length]);

  return (
    <div
      className="max-h-[300px] space-y-8 overflow-y-auto p-6"
      ref={chatRef}
    >
      {exchanges.map((exchange, idx) => (
        <DiscussionExchange
          key={idx}
          exchange={exchange}
        />
      ))}
    </div>
  )
}