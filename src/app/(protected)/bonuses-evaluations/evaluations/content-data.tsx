"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { evaluationRecord, getEvaluations } from "@/actions/evaluation-action";
import { Table } from "./table-data";
import { Create } from "./form-data";
import { Modify } from "./modify-data";
import { checkEditable } from "@/actions/limit-time";

interface ContentDataProps {
  userId?: string;
  user_id?: string;
}

export const ContentData = ({ userId, user_id }: ContentDataProps) => {
  const [evaluations, setEvaluations] = useState<evaluationRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedEvaluation, setSelectedEvaluation] = useState<evaluationRecord | null>(null);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  const id = (user_id ?? userId) || "";

  const fnEvaluations = async () => {
    setLoading(true);
    try {
      const response = await getEvaluations(id);
      if (response.success && response.data) {
        setEvaluations(response.data);
        if (response.data.length === 0) {
          setShowCreate(true);
        }
      } else toast.error(response.message || "No se pudieron obtener las evaluaciones.");
    } catch {
      toast.error("Error al obtener las evaluaciones.");
    } finally {
      setLoading(false);
    }
  };

  const checkEditableClient = async () => {
    if (user_id) {
      setCanEdit(true);
      return;
    }

    try {
      const res = await checkEditable();
      if (res.success && res.editable) setCanEdit(res.editable);
    } catch {
      setCanEdit(false);
    }
  };

  useEffect(() => {
    fnEvaluations();
    if (id) checkEditableClient();
  }, [id]);

  const handleRefresh = () => {
    fnEvaluations();
    setSelectedEvaluation(null);
    setShowCreate(false);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Evaluaciones</p>
      {evaluations.length ? (
        <Table items={evaluations} loading={loading} selectedItem={selectedEvaluation} setSelectedItem={setSelectedEvaluation} />
      ) : (
        <div className="bg-mantle p-4 rounded-md font-text font-semibold text-lavender text-center">No hay registros</div>
      )}

      {selectedEvaluation && <Modify item={selectedEvaluation} onUpdated={handleRefresh} setSelectedItem={setSelectedEvaluation} user_id={id} edit={canEdit} />}

      {!showCreate && evaluations.length > 0 && (
        <div className="flex flex-row items-center gap-2 font-text font-semibold text-subtext0">
          <p className="border-mauve border-b-2 hover:border-b-4 font-special hover:font-bold text-mauve cursor-pointer" onClick={() => setShowCreate(true)}>
            Registrar
          </p>
          <p>nueva renuncia</p>
        </div>
      )}

      {showCreate && (
        <Create
          onCreated={handleRefresh}
          setSelectedItem={setSelectedEvaluation}
          onCancel={() => setShowCreate(false)}
          showCancel={evaluations.length > 0}
          user_id={id}
          edit={canEdit}
        />
      )}
    </div>
  );
};
