"use client";

import { consRecord, getCons } from "@/actions/cons-action";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Create } from "./form-data";
import { Table } from "./table-data";
import { Modify } from "./modify-data";
import { checkEditable } from "@/actions/limit-time";

export type ConsRecord = Omit<consRecord, "periodo"> & {
  periodo: { from: string; to: string };
};

interface ContentDataProps {
  userId?: string;
  user_id?: string;
}

export const ContentData = ({ userId, user_id }: ContentDataProps) => {
  const [items, setItems] = useState<ConsRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<ConsRecord | null>(null);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  const id = (user_id ?? userId) || "";

  const fnItems = async () => {
    setLoading(true);
    try {
      const response = await getCons(id);
      if (response.success && response.data) {
        setItems(response.data as ConsRecord[]);
        if (response.data.length === 0) {
          setShowCreate(true);
        }
      } else {
        toast.error(response.message || "No se pudieron obtener los datos.");
      }
    } catch {
      toast.error("Error al obtener los datos.");
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
    fnItems();
    if (id) checkEditableClient();
  }, [id]);

  const handleRefresh = () => {
    fnItems();
    setSelectedItem(null);
    setShowCreate(false);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Constancia de pagos de haberes y descuentos</p>

      {items.length > 0 ? (
        <Table items={items} loading={loading} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      ) : (
        <div className="bg-mantle p-4 rounded-md font-text font-semibold text-lavender text-center">No hay registros</div>
      )}

      {selectedItem && <Modify item={selectedItem} onUpdated={handleRefresh} setSelectedItem={setSelectedItem} user_id={id} edit={canEdit} />}

      {!showCreate && items.length > 0 && (
        <div className="flex flex-row items-center gap-2 font-text font-semibold text-subtext0">
          <p className="border-mauve border-b-2 hover:border-b-4 font-special hover:font-bold text-mauve cursor-pointer" onClick={() => setShowCreate(true)}>
            Registrar
          </p>
          <p>nueva constancia.</p>
        </div>
      )}

      {showCreate && (
        <Create onCreated={handleRefresh} setSelectedItem={setSelectedItem} onCancel={() => setShowCreate(false)} showCancel={items.length > 0} user_id={id} edit={canEdit} />
      )}
    </div>
  );
};
