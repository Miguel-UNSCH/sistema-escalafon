"use client";

import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { FormacionAcademica } from "@prisma/client";

import { FormData } from "./form-data";
import { TableData } from "./table-data";
import { getStudies } from "@/actions/studies-action";

export type StudyRecord = Omit<FormacionAcademica, "periodo"> & {
  periodo: { from: string; to: string };
};

export const ContentData = () => {
  const [formAc, setFormAc] = useState<StudyRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFormAc = async () => {
    setLoading(true);
    try {
      const response = await getStudies();
      if (response.success && response.data) {
        setFormAc(response.data as StudyRecord[]);
        toast.success("Tabla actualizada correctamente.");
      } else {
        toast.error(response.message || "No se pudieron obtener los estudios.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener los estudios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormAc();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Estudios</p>
      <TableData formAc={formAc} loading={loading} />
      <FormData fetchFormAc={fetchFormAc} />
    </div>
  );
};
