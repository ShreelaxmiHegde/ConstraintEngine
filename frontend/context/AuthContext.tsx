"use client";

import { AuthContextType, AuthProviderProps } from "@/types";
import { createContext, useState } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currUser, setCurrUser] = useState<AuthContextType["currUser"]>(null);

  return (
    <AuthContext.Provider value={{ currUser, setCurrUser }}>
      {children}
    </AuthContext.Provider>
  );
}