import { useContext } from "react";
import { AuthModalContext } from "./AuthModalContext";

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);

  if (!ctx) {
    throw new Error(
      "useAuthModal must be used inside AuthProvider"
    );
  }

  return ctx;
}