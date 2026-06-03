"use client";

import LoginForm from "./LoginForm";
import Logout from "./Logout";
import SignupForm from "./SignupForm";
import { AuthModalProps } from "@/types";


export default function AuthModal({
  isOpen,
  mode,
  onClose,
}: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div
          className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-md p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            ✕
          </button>

          <div className="p-8">
            {mode === "login" && <LoginForm />}
            {mode === "signup" && <SignupForm />}
            {mode === "logout" && <Logout />}
          </div>
        </div>
      </div>
    </div>
  );
}