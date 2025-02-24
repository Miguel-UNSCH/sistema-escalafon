"use client";

import React, { useEffect, useState } from "react";
import { ConyugeForm } from "./FormSpuse";
import { useSession } from "next-auth/react";
import { ZPersonal } from "@/lib/schemas/personal.schema";
import { getCurrentPersonal } from "@/services/personalService";

const Page = () => {
  const { data: session } = useSession();
  const [personal, setPersonal] = useState<ZPersonal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonal = async () => {
      if (session?.user?.id) {
        try {
          setLoading(true);
          const personalData = await getCurrentPersonal(session.user.id);
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

  // Verificar estado civil
  if (personal?.estadoCivil !== "C") {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="bg-red-100 p-6 border border-red-500 rounded-md text-red-700 text-center">
          <p className="font-bold text-lg">No puede registrar datos del cónyuge</p>
          <p className="text-sm">Solo pueden registrar información quienes tienen estado civil C.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex flex-col gap-2 w-4/5">
        <p className="font-inter font-bold text-2xl text-center uppercase">Datos del Cónyuge</p>
        <ConyugeForm />
      </div>
    </div>
  );
};

export default Page;
