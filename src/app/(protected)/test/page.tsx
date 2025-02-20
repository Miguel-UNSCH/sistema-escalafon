"use client";

import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession(); // ✅ Usamos useSession
  console.log("Estado de sesión:", status, session);

  if (status === "loading") return <div>Cargando sesión...</div>;
  if (!session) return <div>No autenticado</div>;
  if (session.user?.role !== "ADMIN") return <div>Solo administradores pueden ver esto</div>;

  return <pre>{JSON.stringify(session, null, 2)}</pre>;
}
