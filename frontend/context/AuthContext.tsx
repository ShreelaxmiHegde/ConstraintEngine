"use client";

import { getMe } from "@/api";
import { AuthContextType, AuthProviderProps } from "@/types";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currUser, setCurrUser] = useState<AuthContextType["currUser"]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const data = await getMe();
        setCurrUser(data.user);
      } catch {
        setCurrUser(null);
      } finally {
        setLoading(false);
      }
    }

    bootstrapAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ currUser, setCurrUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}