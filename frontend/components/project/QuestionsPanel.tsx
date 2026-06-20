"use client";

import { useState } from "react";
import { Question } from "@/types/project";

interface Props {
  questions: Question[];
}

export default function QuestionsPanel({
  questions,
}: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  return (
    <div className="rounded-[28px] border border-zinc-900 bg-zinc-950/70">
      <div className="border-b border-zinc-900 p-5">
        <h2 className="font-medium">
          Unresolved Questions
        </h2>
      </div>

      <div className="p-5 space-y-5">
        {questions.map((q, index) => (
          <div
            key={index}
            className="rounded-xl border border-zinc-900 bg-black p-4"
          >
            <p className="font-medium">
              {q.question}
            </p>

            <p className="mt-2 text-sm text-zinc-500">
              {q.reason}
            </p>

            <textarea
              className="mt-4 w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm outline-none"
              rows={3}
              placeholder="Provide additional context..."
              value={answers[index]}
              onChange={(e) =>
                setAnswers((prev) => ({
                  ...prev,
                  [index]: e.target.value,
                }))
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}