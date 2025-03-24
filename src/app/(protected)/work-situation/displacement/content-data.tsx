"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { desplazamientoRecord, getDesplazamientos } from "@/actions/desplazamiento-action";
import { Table } from "./table-data";
import { Create } from "./form-data";
import { Modify } from "./modify-data";

export const ContentData = () => {
  const [items, setItems] = useState<desplazamientoRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<desplazamientoRecord | null>(null);
  const [showCreate, setShowCreate] = useState<boolean>(false);

  const fnDesplazamientos = async () => {
    setLoading(true);
    try {
      const response = await getDesplazamientos();
      if (response.success && response.data) {
        setItems(response.data);
        if (response.data.length === 0) setShowCreate(true);
      } else toast.error(response.message || "No se pudieron obtener los desplazamientos.");

      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener los desplazamientos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fnDesplazamientos();
  }, []);

  const handleRefresh = () => {
    fnDesplazamientos();
    setSelectedItem(null);
    setShowCreate(false);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Desplazamientos</p>
      {items.length ? (
        <Table items={items} loading={loading} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      ) : (
        <div className="bg-mantle p-4 rounded-md font-text font-semibold text-lavender text-center">No hay registros</div>
      )}

      {selectedItem && <Modify item={selectedItem} onUpdated={handleRefresh} setSelectedItem={setSelectedItem} />}
      {showCreate && <Create onCreated={handleRefresh} setSelectedItem={setSelectedItem} onCancel={() => setShowCreate(false)} showCancel={items.length > 0} />}
    </div>
  );
};
