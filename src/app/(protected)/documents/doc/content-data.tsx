"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Table } from "./table-data";
import { Modify } from "./modify-data";
import { documentRecord, getDocumentos } from "@/actions/document-action";
import { Create } from "./form-data";
import { checkEditable } from "@/actions/limit-time";

interface ContentDataProps {
  userId?: string;
  user_id?: string;
}

export const ContentData = ({ userId, user_id }: ContentDataProps) => {
  const [documentos, setDocumentos] = useState<documentRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDocumento, setSelectedDocumento] = useState<documentRecord | null>(null);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  const id = (user_id ?? userId) || "";

  const fnDocumentos = async () => {
    setLoading(true);
    try {
      const response = await getDocumentos(id);
      if (response.success && response.data) {
        setDocumentos(response.data);
        if (response.data.length === 0) setShowCreate(true);
      } else toast.error(response.message || "No se pudieron obtener los documentos.");
    } catch {
      toast.error("Error al obtener los documentos.");
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
    fnDocumentos();
    if (id) checkEditableClient();
  }, [id]);

  const handleRefresh = () => {
    fnDocumentos();
    setSelectedDocumento(null);
    setShowCreate(false);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Documentos</p>

      {documentos.length > 0 ? (
        <Table items={documentos} loading={loading} selectedItem={selectedDocumento} setSelectedItem={setSelectedDocumento} />
      ) : (
        <div className="bg-mantle p-4 rounded-md font-text font-semibold text-lavender text-center">No hay registros</div>
      )}

      {selectedDocumento && <Modify item={selectedDocumento} onUpdated={handleRefresh} setSelectedItem={setSelectedDocumento} user_id={id} edit={canEdit} />}

      {!showCreate && documentos.length > 0 && (
        <div className="flex flex-row items-center gap-2 font-text font-semibold text-subtext0">
          <p className="border-mauve border-b-2 hover:border-b-4 font-special hover:font-bold text-mauve cursor-pointer" onClick={() => setShowCreate(true)}>
            Registrar
          </p>
          <p>nuevo documento</p>
        </div>
      )}

      {showCreate && (
        <Create
          onCreated={handleRefresh}
          setSelectedItem={setSelectedDocumento}
          onCancel={() => setShowCreate(false)}
          showCancel={documentos.length > 0}
          user_id={id}
          edit={canEdit}
        />
      )}
    </div>
  );
};
