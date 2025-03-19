"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ascensoRecord, getAscensos } from "@/actions/ascenso-action";
import { Table } from "./table-data";
import { Create } from "./form-data";
import { Modify } from "./modify-data";

export const ContentData = () => {
  const [items, setItems] = useState<ascensoRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<ascensoRecord | null>(null);

  const fnAscensos = async () => {
    setLoading(true);
    try {
      const response = await getAscensos();
      if (response.success && response.data) setItems(response.data);
      else toast.error(response.message || "No se pudieron obtener los ascensos.");

      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener los ascensos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fnAscensos();
  }, []);

  const handleRefresh = () => {
    fnAscensos();
    setSelectedItem(null);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Ascenso</p>
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
