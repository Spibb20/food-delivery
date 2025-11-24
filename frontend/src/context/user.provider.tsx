"use client";

import { createContext, useContext, ReactNode } from "react";
import { useClerk, useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import type { UserResource } from "@clerk/types";

export interface AuthContextType {
  user: UserResource | null | undefined;
  login: (_email: string, _password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useClerk();
  const { isLoaded, signIn, setActive } = useSignIn();

  async function login(email: string, password: string) {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  }

  async function logout() {
    await signOut();
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
