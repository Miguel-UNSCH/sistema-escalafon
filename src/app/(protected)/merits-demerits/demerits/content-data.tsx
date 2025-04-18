"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { demeritoRecord, getDemeritos } from "@/actions/m-d-action";
import { Create } from "./form-data";
import { Table } from "./table-data";
import { Modify } from "./modify-data";

export const ContentData = () => {
  const [items, setItems] = useState<demeritoRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<demeritoRecord | null>(null);
  const [showCreate, setShowCreate] = useState<boolean>(false);

  const fnItems = async () => {
    setLoading(true);
    try {
      const response = await getDemeritos();
      if (response.success && response.data) {
        setItems(response.data);
        if (response.data.length === 0) setShowCreate(true);
      } else toast.error(response.message || "No se pudieron obtener los deméritos.");
    } catch {
      toast.error("Error al obtener los deméritos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fnItems();
  }, []);

  const handleRefresh = () => {
    fnItems();
    setSelectedItem(null);
    setShowCreate(false);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-7xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Deméritos</p>
      {items.length ? (
        <Table items={items} loading={loading} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      ) : (
        <div className="bg-mantle p-4 rounded-md font-text font-semibold text-lavender text-center">No hay registros</div>
      )}

      {selectedItem && <Modify item={selectedItem} onUpdated={handleRefresh} setSelectedItem={setSelectedItem} />}

      {!showCreate && items.length > 0 && (
        <div className="flex flex-row items-center gap-2 font-text font-semibold text-subtext0">
          <p className="border-mauve border-b-2 hover:border-b-4 font-special hover:font-bold text-mauve cursor-pointer" onClick={() => setShowCreate(true)}>
            Registrar
          </p>
          <p>otro demérito.</p>
        </div>
      )}

      {showCreate && <Create onItemCreated={handleRefresh} setSelectedItem={setSelectedItem} onCancel={() => setShowCreate(false)} showCancel={items.length > 0} />}
    </div>
  );
};
