"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getCurrentPersonal } from "@/services/personalService";
import { FormHijo } from "./FormChildren";
import { ZPersonal } from "@/lib/schemas/personal.schema";

const Page = () => {
  const { data: session } = useSession();
  const [personal, setPersonal] = useState<(ZPersonal & { id: number }) | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonal = async () => {
      if (session?.user?.id) {
        try {
          setLoading(true);
          const personalData: ZPersonal & { id: number } = await getCurrentPersonal(session.user.id);
          setPersonal(personalData);
          setError(null);
        } catch (err) {
          console.error("Error obteniendo datos personales:", err);
          setError("No se pudo obtener la información personal.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPersonal();
  }, [session]);

  if (loading) return <p className="text-gray-500 text-center">Cargando datos...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex flex-col gap-2 w-3/4">
        <p className="font-inter font-bold text-2xl text-center uppercase">Datos de los Hijos</p>
        {personal?.id ? <FormHijo personalId={personal.id} /> : <p className="font-inter font-bold text-2xl text-center uppercase">No se pudo obtener el id del personal</p>}
      </div>
    </div>
  );
};

export default Page;
