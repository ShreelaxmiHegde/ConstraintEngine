import Navbar from "@/components/dashboard/Navbar";
import Footer from "./dashboard/Footer";

export function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#050505]">
      <div className="min-h-screen text-zinc-100  relative max-w-6xl mx-auto px-4 pt-16 pb-10 mt-10">
        {/* Background Grid */}
        <div className="fixed inset-0 opacity-[0.04] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  );
}