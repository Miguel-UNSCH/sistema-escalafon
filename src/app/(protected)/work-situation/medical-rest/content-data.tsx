"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TableData } from "./table-data";
import { FormData } from "./form-data";
import { getDescansos } from "@/actions/descanso-action";
import { Prisma } from "@prisma/client";

export type DescansoMedicoRecord = Omit<Prisma.descanso_medicoGetPayload<{ include: { cargo: true; dependencia: true } }>, "periodo"> & {
  periodo: { from: string; to: string };
};
export const ContentData = () => {
  const [descansos, setDescansos] = useState<DescansoMedicoRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDescansos = async () => {
    setLoading(true);
    try {
      const response = await getDescansos();
      if (response.success && response.data) {
        setDescansos(response.data as DescansoMedicoRecord[]);
        toast.success("Tabla actualizada correctamente.");
      } else toast.error(response.message || "No se pudieron obtener los descansos médicos.");

      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener los descansos médicos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDescansos();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Descanso Médico</p>
      <TableData descansos={descansos} loading={loading} />
      <FormData fetchDescansos={fetchDescansos} />
    </div>
  );
};
