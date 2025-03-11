"use client";

import toast from "react-hot-toast";
import { Capacitacion } from "@prisma/client";
import React, { useEffect, useState } from "react";

import { FormData } from "./form-data";
import { TableData } from "./table-data";
import { getCapacitaciones } from "@/actions/capacitacion-action";

export type CapacitacionRecord = Omit<Capacitacion, "periodo"> & {
  periodo: { from: string; to: string };
};

export const ContentData = () => {
  const [capacitaciones, setCapacitaciones] = useState<CapacitacionRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCapacitaciones = async () => {
    setLoading(true);
    try {
      const response = await getCapacitaciones();
      if (response.success && response.data) {
        setCapacitaciones(response.data as CapacitacionRecord[]);
        toast.success("Tabla actualizada correctamente.");
      } else toast.error(response.message || "No se pudieron obtener las capacitaciones.");

      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener las capacitaciones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCapacitaciones();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Capacitaciones</p>
      <TableData capacitaciones={capacitaciones} loading={loading} />
      <FormData fetchCapacitaciones={fetchCapacitaciones} />
    </div>
  );
};
