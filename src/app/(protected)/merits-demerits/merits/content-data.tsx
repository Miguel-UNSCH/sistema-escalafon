"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Table } from "./table-data";
import { Create } from "./form-data";
import { getMeritos, meritoRecord } from "@/actions/m-d-action";
import { Modify } from "./modify-data";
import { checkEditable } from "@/actions/limit-time";

interface ContentDataProps {
  userId?: string;
  user_id?: string;
}

export const ContentData = ({ userId, user_id }: ContentDataProps) => {
  const [meritos, setMeritos] = useState<meritoRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMerito, setSelectedMerito] = useState<meritoRecord | null>(null);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  const id = (user_id ?? userId) || "";

  const fnMeritos = async () => {
    setLoading(true);
    try {
      const response = await getMeritos(id);
      if (response.success && response.data) {
        setMeritos(response.data);
        if (response.data.length === 0) setShowCreate(true);
      } else toast.error(response.message || "No se pudieron obtener los méritos.");
    } catch {
      toast.error("Error al obtener los méritos.");
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
    fnMeritos();
    if (id) checkEditableClient();
  }, [id]);

  const handleRefresh = () => {
    fnMeritos();
    setSelectedMerito(null);
    setShowCreate(false);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Méritos</p>
      {meritos.length ? (
        <Table meritos={meritos} loading={loading} selectedMerito={selectedMerito} setSelectedMerito={setSelectedMerito} />
      ) : (
        <div className="bg-mantle p-4 rounded-md font-text font-semibold text-lavender text-center">No hay registros</div>
      )}

      {selectedMerito && <Modify merito={selectedMerito} onUpdated={handleRefresh} setSelectedMerito={setSelectedMerito} user_id={id} edit={canEdit} />}

      {!showCreate && meritos.length > 0 && (
        <div className="flex flex-row items-center gap-2 font-text font-semibold text-subtext0">
          <p className="border-mauve border-b-2 hover:border-b-4 font-special hover:font-bold text-mauve cursor-pointer" onClick={() => setShowCreate(true)}>
            Registrar
          </p>
          <p>otro merito.</p>
        </div>
      )}

      {showCreate && (
        <Create
          onMeritoCreated={handleRefresh}
          setSelectedMerito={setSelectedMerito}
          onCancel={() => setShowCreate(false)}
          showCancel={meritos.length > 0}
          user_id={id}
          edit={canEdit}
        />
      )}
    </div>
  );
};
