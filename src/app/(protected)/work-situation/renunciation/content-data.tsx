"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Table } from "./table-data";
import { getRenuncias, renunciaRecord } from "@/actions/renuncia-action";
import { Create } from "./form-data";
import { Modify } from "./modify-data";

export const ContentData = () => {
  const [renuncias, setRenuncias] = useState<renunciaRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRenuncia, setSelectedRenuncia] = useState<renunciaRecord | null>(null);

  const fnRenuncias = async () => {
    setLoading(true);
    try {
      const response = await getRenuncias();
      if (response.success && response.data) setRenuncias(response.data);
      else toast.error(response.message || "No se pudieron obtener las renuncias.");
    } catch (e: unknown) {
      toast.error("Error al obtener las renuncias.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fnRenuncias();
  }, []);

  const handleRefresh = () => {
    fnRenuncias();
    setSelectedRenuncia(null);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Méritos</p>
      {renuncias.length ? (
        <Table renuncias={renuncias} loading={loading} selectedRenuncia={selectedRenuncia} setSelectedRenuncia={setSelectedRenuncia} />
      ) : (
        <div className="bg-mantle p-4 rounded-md font-text font-semibold text-lavender text-center">No hay registros</div>
      )}

      {selectedRenuncia && <Modify renuncia={selectedRenuncia} onUpdated={handleRefresh} setSelectedRenuncia={setSelectedRenuncia} />}
      <Create onRenunciaCreated={handleRefresh} setSelectedRenuncia={setSelectedRenuncia} />
    </div>
  );
};
