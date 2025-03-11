"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TableData } from "./table-data";
import { FormData } from "./form-data";
import { getRenuncias } from "@/actions/renuncia-action";
import { Prisma } from "@prisma/client";

export type RenunciaRecord = Prisma.renunciaGetPayload<{ include: { cargo: true; dependencia: true } }>;

export const ContentData = () => {
  const [renuncias, setRenuncias] = useState<RenunciaRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRenuncias = async () => {
    setLoading(true);
    try {
      const response = await getRenuncias();
      if (response.success && response.data) {
        setRenuncias(response.data as RenunciaRecord[]);
        toast.success("Tabla actualizada correctamente.");
      } else toast.error(response.message || "No se pudieron obtener las renuncias.");

      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener las renuncias.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRenuncias();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Renuncia</p>
      <TableData renuncias={renuncias} loading={loading} />
      <FormData fetchRenuncias={fetchRenuncias} />
    </div>
  );
};
