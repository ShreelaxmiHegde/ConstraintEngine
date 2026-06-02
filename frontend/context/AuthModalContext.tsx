"use client"

import { AuthModalContextType, AuthModalType, AuthProviderProps } from "@/types";
import { createContext, useState } from "react";
import AuthModal from "@/components/AuthModal";


export const AuthModalContext = createContext<AuthModalContextType | null>(null);

export const AuthModalProvider = ({ children }: AuthProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthModalType>("login");

  function openAuth(type: AuthModalType) {
    setMode(type);
    setIsOpen(true);
  }

  function closeAuth() {
    setIsOpen(false);
  }

  return (
    <AuthModalContext.Provider value={{ openAuth, closeAuth }}>
      {children}
      <AuthModal
        isOpen={isOpen}
        mode={mode}
        onClose={closeAuth}
      />
    </AuthModalContext.Provider>
  )
}