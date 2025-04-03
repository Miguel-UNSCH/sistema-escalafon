"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Table } from "./table-data";
import { getRenuncias, renunciaRecord } from "@/actions/renuncia-action";
import { Create } from "./form-data";
import { Modify } from "./modify-data";
import { checkEditable } from "@/actions/limit-time";

interface ContentDataProps {
  userId?: string;
  user_id?: string;
}

export const ContentData = ({ userId, user_id }: ContentDataProps) => {
  const [renuncias, setRenuncias] = useState<renunciaRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRenuncia, setSelectedRenuncia] = useState<renunciaRecord | null>(null);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  const id = (user_id ?? userId) || "";

  const fnRenuncias = async () => {
    setLoading(true);
    try {
      const response = await getRenuncias(id);
      if (response.success && response.data) {
        setRenuncias(response.data);
        if (response.data.length === 0) {
          setShowCreate(true);
        }
      } else toast.error(response.message || "No se pudieron obtener las renuncias.");
    } catch {
      toast.error("Error al obtener las renuncias.");
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
    fnRenuncias();
    if (id) checkEditableClient();
  }, [id]);

  const handleRefresh = () => {
    fnRenuncias();
    setSelectedRenuncia(null);
    setShowCreate(false);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Renuncias</p>
      {renuncias.length ? (
        <Table renuncias={renuncias} loading={loading} selectedRenuncia={selectedRenuncia} setSelectedRenuncia={setSelectedRenuncia} />
      ) : (
        <div className="bg-mantle p-4 rounded-md font-text font-semibold text-lavender text-center">No hay registros</div>
      )}

      {selectedRenuncia && <Modify renuncia={selectedRenuncia} onUpdated={handleRefresh} setSelectedRenuncia={setSelectedRenuncia} user_id={id} edit={canEdit} />}

      {!showCreate && renuncias.length > 0 && (
        <div className="flex flex-row items-center gap-2 font-text font-semibold text-subtext0">
          <p className="border-mauve border-b-2 hover:border-b-4 font-special hover:font-bold text-mauve cursor-pointer" onClick={() => setShowCreate(true)}>
            Registrar
          </p>
          <p>nueva renuncia</p>
        </div>
      )}

      {showCreate && (
        <Create
          onRenunciaCreated={handleRefresh}
          setSelectedRenuncia={setSelectedRenuncia}
          onCancel={() => setShowCreate(false)}
          showCancel={renuncias.length > 0}
          user_id={id}
          edit={canEdit}
        />
      )}
    </div>
  );
};
