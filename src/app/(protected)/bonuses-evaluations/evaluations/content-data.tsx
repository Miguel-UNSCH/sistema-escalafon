"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TableData } from "./table-data";
import { FormData } from "./form-data";
import { evaluationRecord, getEvaluations } from "@/actions/evaluation-action";

export const ContentData = () => {
  const [evaluations, setEvaluations] = useState<evaluationRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEvaluations = async () => {
    setLoading(true);
    try {
      const response = await getEvaluations();
      if (response.success && response.data) {
        setEvaluations(response.data);
        toast.success("Tabla actualizada correctamente.");
      } else toast.error(response.message || "No se pudieron obtener las evaluaciones.");

      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener las evaluaciones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvaluations();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Evaluaciones</p>
      <TableData evaluations={evaluations} loading={loading} />
      <FormData fetchEvaluations={fetchEvaluations} />
    </div>
  );
};
