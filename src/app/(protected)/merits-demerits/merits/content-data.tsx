"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Table } from "./table-data";
import { Create } from "./form-data";
import { getMeritos, meritoRecord } from "@/actions/m-d-action";
import { Modify } from "./modify-data";

export const ContentData = () => {
  const [meritos, setMeritos] = useState<meritoRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMerito, setSelectedMerito] = useState<meritoRecord | null>(null);

  const fnMeritos = async () => {
    setLoading(true);
    try {
      const response = await getMeritos();
      if (response.success && response.data) {
        setMeritos(response.data);
      } else {
        toast.error(response.message || "No se pudieron obtener los méritos.");
      }
    } catch {
      toast.error("Error al obtener los méritos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fnMeritos();
  }, []);

  const handleRefresh = () => {
    fnMeritos();
    setSelectedMerito(null);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Méritos</p>
      {meritos.length ? (
        <Table meritos={meritos} loading={loading} selectedMerito={selectedMerito} setSelectedMerito={setSelectedMerito} />
      ) : (
        <div className="bg-mantle p-4 rounded-md font-text font-semibold text-lavender text-center">No hay registros</div>
      )}

      {selectedMerito && <Modify merito={selectedMerito} onUpdated={handleRefresh} setSelectedMerito={setSelectedMerito} />}
      <Create onMeritoCreated={handleRefresh} setSelectedMerito={setSelectedMerito} />
    </div>
  );
};
