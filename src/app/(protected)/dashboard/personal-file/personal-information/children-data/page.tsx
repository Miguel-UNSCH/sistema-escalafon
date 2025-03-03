"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getCurrentPersonal } from "@/services/personalService";
import { FormHijo } from "./FormChildren";
import { ZPersonal } from "@/lib/schemas/personal.schema";
import { Sprout, UserRoundPlus } from "lucide-react";

const Page = () => {
  const { data: session } = useSession();
  const [personal, setPersonal] = useState<(ZPersonal & { id: string }) | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonal = async () => {
      if (session?.user?.id) {
        try {
          setLoading(true);
          const personalData: ZPersonal & { id: string } = await getCurrentPersonal(session.user.id);
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
        <div className="flex flex-row justify-evenly p-5">
          <div className="flex flex-row items-center gap-2 bg-teal hover:bg-green px-4 py-2 rounded-full text-crust cursor-pointer">
            <Sprout size={16} />
            <p>Ver hijos</p>
          </div>
          <div className="flex flex-row items-center gap-2 bg-maroon hover:bg-red px-4 py-2 rounded-full text-crust cursor-pointer">
            <UserRoundPlus size={16} />
            <p>Registrar</p>
          </div>
        </div>
        {personal?.id ? <FormHijo personalId={personal.id} /> : <p className="font-inter font-bold text-2xl text-center uppercase">No se pudo obtener el id del personal</p>}
        <table className="border border-surface0 w-full border-collapse table-fixed">
          <thead className="">
            <tr className="text-sm text-left">
              <th className="px-4 py-2">Nombres y Apellidos</th>
              <th className="px-4 py-2">Fecha de Nacimiento</th>
              <th className="px-4 py-2">Lugar de Nacimiwnto</th>
              <th className="px-4 py-2">Grado de Instruccion</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-xs text-left">
              <td className="px-4 py-2">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td className="px-4 py-2">Malcolm Lockyer</td>
              <td className="px-4 py-2">1961</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
