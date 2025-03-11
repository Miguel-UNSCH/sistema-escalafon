"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TableData } from "./table-data";
import { FormData } from "./form-data";
import { getDisabilities } from "@/actions/disability-action";
import { discapacidad } from "@prisma/client";

export const ContentData = () => {
  const [disabilities, setDisabilities] = useState<discapacidad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDisabilities = async () => {
    setLoading(true);
    try {
      const response = await getDisabilities();
      if (response.success && response.data) {
        setDisabilities(response.data);
        toast.success("Tabla actualizada correctamente.");
      } else toast.error(response.message || "No se pudieron obtener las discapacidades.");

      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener las discapacidades.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisabilities();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Discapacidad</p>
      <TableData disabilities={disabilities} loading={loading} />
      <FormData fetchDisabilities={fetchDisabilities} />
    </div>
  );
};
