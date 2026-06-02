"use client";

import { useAuthModal } from "@/context/useAuthModal";

export default function Navbar() {
  const { openAuth } = useAuthModal();

  return (
    <header className="fixed top-6 left-1/2 z-50 w-full max-w-6xl -translate-x-1/2 px-4">
      <nav
        className="flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] px-6"
      >
        {/* App Name */}
        <div className="flex items-center gap-3">
          <div
            className="h-8 w-8 rounded-lg bg-white/10 border border-white/10"
          />
          <span className="text-lg font-semibold tracking-tight text-white">
            ConstraintEngine
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
            onClick={() => openAuth("login")}
          >
            Login
          </button>

          <button
            className="rounded-lg border border-white/10 bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
            onClick={() => openAuth("signup")}
          >
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  );
}