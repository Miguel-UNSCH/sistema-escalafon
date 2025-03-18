"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { evaluationRecord, getEvaluations } from "@/actions/evaluation-action";
import { Table } from "./table-data";
import { Create } from "./form-data";
import { Modify } from "./modify-data";

export const ContentData = () => {
  const [evaluations, setEvaluations] = useState<evaluationRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedEvaluation, setSelectedEvaluation] = useState<evaluationRecord | null>(null);

  const fnEvaluations = async () => {
    setLoading(true);
    try {
      const response = await getEvaluations();
      if (response.success && response.data) setEvaluations(response.data);
      else toast.error(response.message || "No se pudieron obtener las evaluaciones.");

      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener las evaluaciones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fnEvaluations();
  }, []);

  const handleRefresh = () => {
    fnEvaluations();
    setSelectedEvaluation(null);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Evaluaciones</p>
      {evaluations.length ? (
        <Table items={evaluations} loading={loading} selectedItem={selectedEvaluation} setSelectedItem={setSelectedEvaluation} />
      ) : (
        <div className="bg-mantle p-4 rounded-md font-text font-semibold text-lavender text-center">No hay registros</div>
      )}

      {selectedEvaluation && <Modify item={selectedEvaluation} onUpdated={handleRefresh} setSelectedItem={setSelectedEvaluation} />}
      <Create onCreated={handleRefresh} setSelectedItem={setSelectedEvaluation} />
    </div>
  );
};
