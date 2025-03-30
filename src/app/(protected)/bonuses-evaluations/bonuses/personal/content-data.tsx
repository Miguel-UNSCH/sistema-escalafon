"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { bonusPersonalRecord, getBonusesPer } from "@/actions/bonus_per-action";
import { Table } from "./table-data";
import { Create } from "./form-data";
import { Modify } from "./modify-data";
import { Session } from "next-auth";
import { checkEditable } from "@/actions/limit-time";

export const ContentData = ({ session }: { session: Session }) => {
  const [bonuses, setBonuses] = useState<bonusPersonalRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBonus, setSelectedBonus] = useState<bonusPersonalRecord | null>(null);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  const fnBonuses = async () => {
    setLoading(true);
    try {
      const response = await getBonusesPer();
      if (response.success && response.data) {
        setBonuses(response.data);
        if (response.data.length === 0) setShowCreate(true);
      } else {
        toast.error(response.message || "No se pudieron obtener los bonos personales.");
      }
    } catch {
      toast.error("Error al obtener los bonos personales.");
    } finally {
      setLoading(false);
    }
  };

  const checkEditableClient = async () => {
    try {
      const res = await checkEditable();
      if (res.success && res.editable) setCanEdit(res.editable);
    } catch {
      setCanEdit(false);
    }
  };

  useEffect(() => {
    fnBonuses();
    if (session?.user) checkEditableClient();
  }, [session?.user]);

  const handleRefresh = () => {
    fnBonuses();
    setSelectedBonus(null);
    setShowCreate(false);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Bonificacion Personal</p>
      {bonuses.length ? (
        <Table items={bonuses} loading={loading} selectedItem={selectedBonus} setSelectedItem={setSelectedBonus} />
      ) : (
        <div className="bg-mantle p-4 rounded-md font-text font-semibold text-lavender text-center">No hay registros</div>
      )}

      {selectedBonus && <Modify item={selectedBonus} onUpdated={handleRefresh} setSelectedItem={setSelectedBonus} user_id={session.user.id} edit={canEdit} />}

      {!showCreate && bonuses.length > 0 && (
        <div className="flex flex-row items-center gap-2 font-text font-semibold text-subtext0">
          <p className="border-mauve border-b-2 hover:border-b-4 font-special hover:font-bold text-mauve cursor-pointer" onClick={() => setShowCreate(true)}>
            Registrar
          </p>
          <p>otra bonificación personal.</p>
        </div>
      )}

      {showCreate && (
        <Create
          onCreated={handleRefresh}
          setSelectedItem={setSelectedBonus}
          onCancel={() => setShowCreate(false)}
          showCancel={bonuses.length > 0}
          user_id={session.user.id}
          edit={canEdit}
        />
      )}
    </div>
  );
};
