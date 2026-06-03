"use client";

import { logout } from "@/api";
import { useAuth } from "@/context/useAuth";
import { useAuthModal } from "@/context/useAuthModal";

export default function Logout() {
  const { setCurrUser } = useAuth();
  const { closeAuth } = useAuthModal();

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.success === true) {
        setCurrUser(null);
      }
      console.log(response.success);
    } catch (err) {
      console.log("Error logging out: ", err);
    } finally {
      closeAuth();
    }
  }

  return (
    <>
      <h2 className="text-xl font-semibold text-white">
        Logout
      </h2>

      <p className="mt-3 text-sm text-zinc-400">
        Are you sure you want to log out of your account?
      </p>

      <div className="mt-8 flex justify-end gap-3">
        <button
          className="rounded-lg border border-white/10 px-4 py-2 text-zinc-300 hover:bg-white/5"
          onClick={closeAuth}
        >
          Cancel
        </button>
        <button
          className="rounded-lg bg-red-500/90 px-4 py-2 font-medium text-white hover:bg-red-500"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
}