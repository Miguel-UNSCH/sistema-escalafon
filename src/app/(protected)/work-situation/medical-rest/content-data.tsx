"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Create } from "./form-data";
import { descanso_medicoRecord, getDescansos } from "@/actions/descanso-action";
import { Table } from "./table-data";
import { Modify } from "./modify-data";

export type DescansoMedicoRecord = Omit<descanso_medicoRecord, "periodo"> & {
  periodo: { from: string; to: string };
};
export const ContentData = () => {
  const [medicals, setMedicals] = useState<DescansoMedicoRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMedical, setSelectedMedical] = useState<DescansoMedicoRecord | null>(null);

  const fnDescansos = async () => {
    setLoading(true);
    try {
      const response = await getDescansos();
      if (response.success && response.data) setMedicals(response.data as DescansoMedicoRecord[]);
      else toast.error(response.message || "No se pudieron obtener los descansos médicos.");
    } catch (e: unknown) {
      toast.error("Error al obtener los descansos médicos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fnDescansos();
  }, []);

  const handleRefresh = () => {
    fnDescansos();
    setSelectedMedical(null);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Descansos</p>
      {medicals.length ? (
        <Table medicals={medicals} loading={loading} selectedMedical={selectedMedical} setSelectedMedical={setSelectedMedical} />
      ) : (
        <div className="bg-mantle p-4 rounded-md font-text font-semibold text-lavender text-center">No hay registros</div>
      )}

      {selectedMedical && <Modify medical={selectedMedical} onUpdated={handleRefresh} setSelectedMedical={setSelectedMedical} />}
      <Create onMedicalCreated={handleRefresh} setSelectedMedical={setSelectedMedical} />
    </div>
  );
};
