"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { desplazamientoRecord, getDesplazamientos } from "@/actions/desplazamiento-action";
import { Table } from "./table-data";
import { Create } from "./form-data";
import { Modify } from "./modify-data";
import { Session } from "next-auth";
import { checkEditable } from "@/actions/limit-time";

export const ContentData = ({ session }: { session: Session }) => {
  const [items, setItems] = useState<desplazamientoRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<desplazamientoRecord | null>(null);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  const fnDesplazamientos = async () => {
    setLoading(true);
    try {
      const response = await getDesplazamientos();
      if (response.success && response.data) {
        setItems(response.data);
        if (response.data.length === 0) setShowCreate(true);
      } else {
        toast.error(response.message || "No se pudieron obtener los desplazamientos.");
      }
    } catch {
      toast.error("Error al obtener los desplazamientos.");
    } finally {
      setLoading(false);
    }
  };

  const checkEditableClient = async () => {
    try {
      const res = await checkEditable();
      if (res.success && res.editable) setCanEdit(res.editable);
    } catch {
      setCanEdit(false);
    }
  };

  useEffect(() => {
    fnDesplazamientos();
    if (session?.user) checkEditableClient();
  }, [session?.user]);

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

      {selectedItem && <Modify item={selectedItem} onUpdated={handleRefresh} setSelectedItem={setSelectedItem} edit={canEdit} />}

      {!showCreate && items.length > 0 && (
        <div className="flex flex-row items-center gap-2 font-text font-semibold text-subtext0">
          <p className="border-mauve border-b-2 hover:border-b-4 font-special hover:font-bold text-mauve cursor-pointer" onClick={() => setShowCreate(true)}>
            Registrar
          </p>
          <p>otro desplazamiento laboral.</p>
        </div>
      )}

      {showCreate && <Create onCreated={handleRefresh} setSelectedItem={setSelectedItem} onCancel={() => setShowCreate(false)} showCancel={items.length > 0} edit={canEdit} />}
    </div>
  );
};
