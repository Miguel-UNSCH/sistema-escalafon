"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { bonusPersonalRecord, getBonusesPer } from "@/actions/bonus_per-action";
import { Table } from "./table-data";
import { Create } from "./form-data";
import { Modify } from "./modify-data";

export const ContentData = () => {
  const [bonuses, setBonuses] = useState<bonusPersonalRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBonus, setSelectedBonus] = useState<bonusPersonalRecord | null>(null);

  const fnBonuses = async () => {
    setLoading(true);
    try {
      const response = await getBonusesPer();
      if (response.success && response.data) setBonuses(response.data);
      else toast.error(response.message || "No se pudieron obtener los bonos personales.");

      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener los bonos personales.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fnBonuses();
  }, []);

  const handleRefresh = () => {
    fnBonuses();
    setSelectedBonus(null);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Bonificacion Personal</p>
      {bonuses.length ? (
        <Table items={bonuses} loading={loading} selectedItem={selectedBonus} setSelectedItem={setSelectedBonus} />
      ) : (
        <div className="bg-mantle p-4 rounded-md font-text font-semibold text-lavender text-center">No hay registros</div>
      )}

      {selectedBonus && <Modify item={selectedBonus} onUpdated={handleRefresh} setSelectedItem={setSelectedBonus} />}
      <Create onCreated={handleRefresh} setSelectedItem={setSelectedBonus} />
    </div>
  );
};
