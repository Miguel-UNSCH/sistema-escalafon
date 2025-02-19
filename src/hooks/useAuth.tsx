import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");

  return context;
};
