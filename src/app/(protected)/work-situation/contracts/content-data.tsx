"use client";

import toast from "react-hot-toast";
import { Prisma } from "@prisma/client";
import React, { useEffect, useState } from "react";

import { FormData } from "./form-data";
import { TableData } from "./table-data";
import { getContracts } from "@/actions/contract-action";

export type ContractRecord = Prisma.ContratoGetPayload<{ include: { cargo: true; dependencia: true } }>;

export const ContentData = () => {
  const [contracts, setContracts] = useState<ContractRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchContracts = async () => {
    setLoading(true);
    try {
      const response = await getContracts();
      if (response.success && response.data) {
        setContracts(response.data);
        toast.success("Tabla actualizada correctamente.");
      } else toast.error(response.message || "No se pudieron obtener los contratos.");

      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener los contratos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Contratos</p>
      <TableData contracts={contracts} loading={loading} />
      <FormData fetchContracts={fetchContracts} />
    </div>
  );
};
