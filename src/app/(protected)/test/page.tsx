"use client";

import { useAuth } from "@/hooks/useAuth";

export default function Page() {
  const { session, loading } = useAuth();

  if (loading) return <div>Cargando sesión...</div>;
  if (!session) return <div>No autenticado</div>;
  if (session?.user?.role !== "ADMIN") return <div>Solo administradores pueden ver esto</div>;

  return <pre>{JSON.stringify(session, null, 2)}</pre>;
}
