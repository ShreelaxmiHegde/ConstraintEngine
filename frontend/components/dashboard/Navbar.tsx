"use client";

import { useAuth } from "@/context/useAuth";
import { useAuthModal } from "@/context/useAuthModal";

export default function Navbar() {
  const { openAuth } = useAuthModal();
  const { currUser } = useAuth();

  return (
    <header className="fixed top-6 left-1/2 z-50 w-full max-w-6xl -translate-x-1/2 px-4">
      <nav
        className="flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] px-6"
      >
        {/* App Name */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 rounded-lg bg-white/10 border items-center justify-center border-white/10">⫷</div>
          <span className="text-lg font-semibold tracking-tight text-white">
            <span className="text-lime-300">Constraint</span>Engine
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {!currUser &&
            <>
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
            </>
          }

          {currUser &&
            <>
              <span>User: {currUser.username}</span>
              <button
                className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
                onClick={() => openAuth("logout")}
              >
                Logout
              </button>
            </>
          }

        </div>
      </nav>
    </header>
  );
}