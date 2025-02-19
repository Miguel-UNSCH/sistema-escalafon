/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useEffect, useState, ReactNode } from "react";

// Definir el tipo de datos del contexto
interface AuthContextType {
  session: any; // Reemplaza `any` con el tipo exacto si lo tienes
  loading: boolean;
}

// Crear el contexto con valores por defecto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider para manejar la sesión globalmente
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/session"); // Llamamos a la API creada
        if (!response.ok) throw new Error("Error al obtener la sesión");
        const data = await response.json();
        setSession(data);
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return <AuthContext.Provider value={{ session, loading }}>{children}</AuthContext.Provider>;
};
