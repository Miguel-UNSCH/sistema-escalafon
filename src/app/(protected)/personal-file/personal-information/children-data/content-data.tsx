"use client";

import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";

import { childrenRecord, getChilds } from "@/actions/children-action";
import { Table } from "./table-data";
import { Create } from "./form-data";
import { Modify } from "./modify-data";

export const ContentData = () => {
  const [items, setItems] = useState<childrenRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<childrenRecord | null>(null);

  const fnChildren = async () => {
    setLoading(true);
    try {
      const response = await getChilds();
      if (response.success && response.data) setItems(response.data as childrenRecord[]);
      else toast.error(response.message || "No se pudieron obtener los hijos.");

      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener los hijos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fnChildren();
  }, []);

  const handleRefresh = () => {
    fnChildren();
    setSelectedItem(null);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Datos de los Hijos</p>
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
