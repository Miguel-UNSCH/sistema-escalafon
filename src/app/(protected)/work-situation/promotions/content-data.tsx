"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TableData } from "./table-data";
import { FormData } from "./form-data";
import { ascensoRecord, getAscensos } from "@/actions/ascenso-action";

export const ContentData = () => {
  const [ascensos, setAscensos] = useState<ascensoRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAscensos = async () => {
    setLoading(true);
    try {
      const response = await getAscensos();
      if (response.success && response.data) {
        setAscensos(response.data);
        toast.success("Tabla actualizada correctamente.");
      } else {
        toast.error(response.message || "No se pudieron obtener los ascensos.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener los ascensos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAscensos();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Ascensos</p>
      <TableData ascensos={ascensos} loading={loading} />
      <FormData fetchAscensos={fetchAscensos} />
    </div>
  );
};
