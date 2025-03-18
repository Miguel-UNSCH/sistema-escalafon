"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getPerLicVacs, perLicRecord } from "@/actions/per-lic-vac-action";
import { Table } from "./table-data";
import { Create } from "./form-data";
import { Modify } from "./modify-data";

export type PerLicVacRecord = Omit<perLicRecord, "periodo"> & {
  periodo: { from: string; to: string };
};

export const ContentData = () => {
  const [items, setItems] = useState<PerLicVacRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<PerLicVacRecord | null>(null);

  const fnPerLicVacs = async () => {
    setLoading(true);
    try {
      const response = await getPerLicVacs();
      if (response.success && response.data) setItems(response.data as PerLicVacRecord[]);
      else toast.error(response.message || "No se pudieron obtener los permisos/licencias/vacaciones.");
    } catch (e: unknown) {
      toast.error("Error al obtener los permisos/licencias/vacaciones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fnPerLicVacs();
  }, []);

  const handleRefresh = () => {
    fnPerLicVacs();
    setSelectedItem(null);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Permisos / Licencias / Vacaciones</p>
      {items.length ? (
        <Table items={items} loading={loading} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      ) : (
        <div className="bg-mantle p-4 rounded-md font-text font-semibold text-lavender text-center">No hay registros</div>
      )}

      {selectedItem && <Modify item={selectedItem} onUpdated={handleRefresh} setSelectedItem={setSelectedItem} />}
      <Create onCreated={handleRefresh} setSelectedItem={setSelectedItem} />
    </div>
  );
};
