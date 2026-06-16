import { ConversationMessage as Message } from "@/types/conversation";

interface Props {
  message: Message;
}

export default function ConversationMessage({
  message,
}: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"
        }`}
    >
      <div
        className={`max-w-[85%] rounded-3xl px-5 py-4 text-sm leading-7 ${isUser ? "bg-lime-300 text-black" : "bg-zinc-950 border border-zinc-900"}`}
      >
        {message.content}
      </div>
    </div>
  );
}