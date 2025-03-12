"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TableData } from "./table-data";
import { FormData } from "./form-data";
import { bonusPersonalRecord, getBonusesPer } from "@/actions/bonus_per-action";

export const ContentData = () => {
  const [bonuses, setBonuses] = useState<bonusPersonalRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBonuses = async () => {
    setLoading(true);
    try {
      const response = await getBonusesPer();
      if (response.success && response.data) {
        setBonuses(response.data);
        toast.success("Tabla actualizada correctamente.");
      } else toast.error(response.message || "No se pudieron obtener los bonos personales.");

      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener los bonos personales.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBonuses();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Bonificación Personal</p>
      <TableData bonuses={bonuses} loading={loading} />
      <FormData fetchBonuses={fetchBonuses} />
    </div>
  );
};
