"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getPerLicVacs, perLicRecord } from "@/actions/per-lic-vac-action";
import { Table } from "./table-data";
import { Create } from "./form-data";
import { Modify } from "./modify-data";
import { checkEditable } from "@/actions/limit-time";

export type PerLicVacRecord = Omit<perLicRecord, "periodo"> & {
  periodo: { from: string; to: string };
};

interface ContentDataProps {
  userId?: string;
  user_id?: string;
}

export const ContentData = ({ userId, user_id }: ContentDataProps) => {
  const [items, setItems] = useState<PerLicVacRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<PerLicVacRecord | null>(null);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  const id = (user_id ?? userId) || "";

  const fnPerLicVacs = async () => {
    setLoading(true);
    try {
      const response = await getPerLicVacs(id);
      if (response.success && response.data) {
        setItems(response.data as PerLicVacRecord[]);
        if (response.data.length === 0) {
          setShowCreate(true);
        }
      } else {
        toast.error(response.message || "No se pudieron obtener los permisos/licencias/vacaciones.");
      }
    } catch {
      toast.error("Error al obtener los permisos/licencias/vacaciones.");
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
    fnPerLicVacs();
    if (id) checkEditableClient();
  }, [id]);

  const handleRefresh = () => {
    fnPerLicVacs();
    setSelectedItem(null);
    setShowCreate(false);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Permisos / Licencias / Vacaciones</p>

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
          <p>nuevo permiso / licencia / vacaciones</p>
        </div>
      )}

      {showCreate && (
        <Create onCreated={handleRefresh} setSelectedItem={setSelectedItem} onCancel={() => setShowCreate(false)} showCancel={items.length > 0} user_id={id} edit={canEdit} />
      )}
    </div>
  );
};
