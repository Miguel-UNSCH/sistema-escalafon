"use client";

import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";

import { FormData } from "./form-data";
import { TableData } from "./table-data";
import { documentRecord, getDocumentos } from "@/actions/document-action";

export const ContentData = () => {
  const [documentos, setDocumentos] = useState<documentRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDocumentos = async () => {
    setLoading(true);
    try {
      const response = await getDocumentos();
      if (response.success && response.data) {
        setDocumentos(response.data);
        toast.success("Tabla actualizada correctamente.");
      } else toast.error(response.message || "No se pudieron obtener los documentos.");

      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener los documentos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocumentos();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Documentos</p>
      <TableData documentos={documentos} loading={loading} />
      <FormData fetchDocumentos={fetchDocumentos} />
    </div>
  );
};
