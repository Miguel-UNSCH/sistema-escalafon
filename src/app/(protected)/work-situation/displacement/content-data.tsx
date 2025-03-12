"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TableData } from "./table-data";
import { FormData } from "./form-data";
import { desplazamientoRecord, getDesplazamientos } from "@/actions/desplazamiento-action";

export const ContentData = () => {
  const [desplazamientos, setDesplazamientos] = useState<desplazamientoRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDesplazamientos = async () => {
    setLoading(true);
    try {
      const response = await getDesplazamientos();
      if (response.success && response.data) {
        setDesplazamientos(response.data);
        toast.success("Tabla actualizada correctamente.");
      } else toast.error(response.message || "No se pudieron obtener los desplazamientos.");

      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener los desplazamientos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesplazamientos();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Desplazamientos</p>
      <TableData desplazamientos={desplazamientos} loading={loading} />
      <FormData fetchDesplazamientos={fetchDesplazamientos} />
    </div>
  );
};
