"use client";

import toast from "react-hot-toast";
import { Prisma } from "@prisma/client";
import React, { useEffect, useState } from "react";

import { FormData } from "./form-data";
import { TableData } from "./table-data";
import { getExperiences } from "@/actions/exp-action";

export type ExperienceRecord = Omit<Prisma.ExperienceGetPayload<{ include: { cargo: true; dependencia: true } }>, "periodo"> & {
  periodo: { from: string; to: string };
};

export const ContentData = () => {
  const [experiences, setExperiences] = useState<ExperienceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Función para obtener las experiencias y actualizar la tabla
  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const response = await getExperiences();
      if (response.success && response.data) {
        setExperiences(response.data as ExperienceRecord[]);
        toast.success("Tabla actualizada correctamente.");
      } else {
        toast.error(response.message || "No se pudieron obtener las experiencias.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener las experiencias.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Experiencia Laboral</p>
      <TableData experiences={experiences} loading={loading} />
      <FormData fetchExperiences={fetchExperiences} />
    </div>
  );
};
