"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TableData } from "./table-data";
import { FormData } from "./form-data";
import { demeritoRecord, getDemeritos } from "@/actions/m-d-action";

export const ContentData = () => {
  const [demeritos, setDemeritos] = useState<demeritoRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDemeritos = async () => {
    setLoading(true);
    try {
      const response = await getDemeritos();
      if (response.success && response.data) {
        setDemeritos(response.data);
        toast.success("Tabla actualizada correctamente.");
      } else toast.error(response.message || "No se pudieron obtener los deméritos.");

      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener los deméritos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemeritos();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Deméritos</p>
      <TableData demeritos={demeritos} loading={loading} />
      <FormData fetchDemeritos={fetchDemeritos} />
    </div>
  );
};
