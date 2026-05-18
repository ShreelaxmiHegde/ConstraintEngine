export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-900 backdrop-blur-xl bg-black/40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-2xl border border-zinc-800 bg-zinc-950 flex items-center justify-center text-sm font-semibold">
            CE
          </div>

          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              ConstraintEngine
            </h1>
            <p className="text-xs text-zinc-500">
              Infrastructure reasoning runtime
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          <button className="hover:text-zinc-100 transition">
            Architecture
          </button>
          <button className="hover:text-zinc-100 transition">
            Runtime
          </button>
          <button className="hover:text-zinc-100 transition">
            Docs
          </button>
        </div>

        <button className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm hover:bg-zinc-900 transition">
          Sign In
        </button>
      </div>
    </header>
  )
}