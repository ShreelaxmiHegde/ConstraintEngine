"use client";

import { CheckCircle } from "lucide-react";
import { XCircle } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { Info } from "lucide-react";

interface Props {
  type:
  | "success"
  | "error"
  | "warning"
  | "info";

  message: string;
}

export default function Toast({
  type,
  message,
}: Props) {
  const config = {
    success: {
      icon: <CheckCircle size={18} />,
      border: "border-green-500/30",
    },
    error: {
      icon: <XCircle size={18} />,
      border: "border-red-500/30",
    },
    warning: {
      icon: <AlertTriangle size={18} />,
      border: "border-yellow-500/30",
    },
    info: {
      icon: <Info size={18} />,
      border: "border-blue-500/30",
    },
  };

  return (
    <div
      className={
        `flex items-center gap-3 min-w-[320px] rounded-xl border ${config[type].border} bg-[#0A0A0A]/95 backdrop-blur-xl px-4 py-3 shadow-xl`
      }
    >
      {config[type].icon}

      <p className="text-sm text-zinc-200"> {message}
      </p>
    </div>
  );
}