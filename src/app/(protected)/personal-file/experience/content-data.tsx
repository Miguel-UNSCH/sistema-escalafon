"use client";

import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";

import { Table } from "./table-data";
import { expRecord, getExperiences } from "@/actions/exp-action";
import { Create } from "./form-data";
import { Modify } from "./modify-data";
import { checkEditable } from "@/actions/limit-time";

export type ExperienceRecord = Omit<expRecord, "periodo"> & { periodo: { from: string; to: string } };

interface ContentDataProps {
  userId?: string;
  user_id?: string;
}

export const ContentData = ({ userId, user_id }: ContentDataProps) => {
  const [items, setItems] = useState<ExperienceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<ExperienceRecord | null>(null);
  const [showCreate, setShowCreate] = useState<boolean>(!items.length);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  const id = (user_id ?? userId) || "";

  const fnExperiences = async () => {
    setLoading(true);
    try {
      const response = await getExperiences(id);
      if (response.success && response.data) {
        setItems(response.data as ExperienceRecord[]);
        if (response.data.length === 0) setShowCreate(true);
      } else toast.error(response.message || "No se pudieron obtener las experiencias.");
    } catch {
      toast.error("Error al obtener las experiencias.");
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
    if (items.length === 0) setShowCreate(true);
    else setShowCreate(false);
  }, [items]);

  useEffect(() => {
    fnExperiences();
    if (id) checkEditableClient();
  }, [id]);

  const handleRefresh = () => {
    fnExperiences();
    setSelectedItem(null);
    setShowCreate(false);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Experiencia Laboral</p>

      {items.length ? (
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
          <p>otra experiencia laboral</p>
        </div>
      )}

      {showCreate && (
        <Create onCreated={handleRefresh} setSelectedItem={setSelectedItem} onCancel={() => setShowCreate(false)} showCancel={items.length > 0} edit={canEdit} id={id} />
      )}
    </div>
  );
};
