"use client";

import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";

import { capacitacionRecord, getCapacitaciones } from "@/actions/capacitacion-action";
import { Table } from "./table-data";
import { Create } from "./form-data";
import { Modify } from "./modify-data";

export type CapacitacionRecord = Omit<capacitacionRecord, "periodo"> & {
  periodo: { from: string; to: string };
};

export const ContentData = () => {
  const [items, setItems] = useState<CapacitacionRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<CapacitacionRecord | null>(null);
  const [showCreate, setShowCreate] = useState<boolean>(false);

  const fnCapacitaciones = async () => {
    setLoading(true);
    try {
      const response = await getCapacitaciones();
      if (response.success && response.data) setItems(response.data as CapacitacionRecord[]);
      else toast.error(response.message || "No se pudieron obtener las capacitaciones.");

      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener las capacitaciones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fnCapacitaciones();
  }, []);

  const handleRefresh = () => {
    fnCapacitaciones();
    setSelectedItem(null);
    setShowCreate(false);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Capacitaciones</p>
      {items.length ? (
        <Table items={items} loading={loading} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      ) : (
        <div className="bg-mantle p-4 rounded-md font-text font-semibold text-lavender text-center">No hay registros</div>
      )}

      {selectedItem && <Modify item={selectedItem} onUpdated={handleRefresh} setSelectedItem={setSelectedItem} />}

      {!showCreate && items.length > 0 && (
        <div className="flex flex-row items-center gap-2 font-text font-semibold text-subtext0">
          <p className="border-mauve border-b-2 hover:border-b-4 font-special hover:font-bold text-mauve cursor-pointer" onClick={() => setShowCreate(true)}>
            Agregar
          </p>
          <p>mas capacitaciones.</p>
        </div>
      )}
      {showCreate && <Create onCreated={handleRefresh} setSelectedItem={setSelectedItem} onCancel={() => setShowCreate(false)} showCancel={items.length > 0} />}
    </div>
  );
};
