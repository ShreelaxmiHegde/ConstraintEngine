"use client";

import { useAuth } from "@/context/useAuth";
import { useAuthModal } from "@/context/useAuthModal";
import { UserCircle, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { openAuth } = useAuthModal();
  const { currUser } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-6 left-1/2 z-50 w-full max-w-6xl -translate-x-1/2 px-4">
      <nav
        className="flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] px-6"
      >
        {/* App Name */}
        <Link href={"/"}>
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 rounded-lg bg-white/10 border items-center justify-center border-white/10">⫷</div>
            <span className="text-lg font-semibold tracking-tight text-white">
              <span className="text-lime-300">Constraint</span>Engine
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3">
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
              <div className="flex justify-center gap-1">
                <UserCircle size={23} className="text-lime-300" />
                <span>{currUser.username}</span>
              </div>
              <button
                className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
                onClick={() => openAuth("logout")}
              >
                Logout
              </button>
            </>
          }
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
          <Menu className="h-6 w-6 text-white" />
        </button>

        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/40" onClick={closeMenu}>
            <div
              className="absolute p-3 right-2 top-2 w-60 border border-zinc-800 rounded-lg bg-zinc-950 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-end border-b border-zinc-800 pb-2 mb-5">
                <button onClick={closeMenu}>
                  <X />
                </button>
              </div>

              {/* Auth Buttons */}
              {!currUser &&
                <div className="flex flex-col gap-3">
                  <button
                    className="rounded-lg px-4 py-2 border border-zinc-800 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
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
              }

              {currUser &&
                <div className="flex flex-col gap-3">
                  <div className="flex justify-center gap-1">
                    <UserCircle size={23} className="text-lime-300" />
                    <span>{currUser.username}</span>
                  </div>
                  <button
                    className="rounded-lg border border-zinc-800 px-4 py-2 text-sm font-medium text-red-400"
                    onClick={() => openAuth("logout")}
                  >
                    Logout
                  </button>
                </div>
              }
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}