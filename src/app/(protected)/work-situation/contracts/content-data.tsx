"use client";

import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";

import { contractRecord, getContracts } from "@/actions/contract-action";
import { Table } from "./table-data";
import { Create } from "./form-data";
import { Modify } from "./modify-data";
import { Session } from "next-auth";
import { checkEditable } from "@/actions/limit-time";

export type ContractRecord = Omit<contractRecord, "periodo"> & {
  periodo: { from: string; to: string };
};

export const ContentData = ({ session }: { session: Session }) => {
  const [items, setItems] = useState<ContractRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<ContractRecord | null>(null);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  const fnItems = async () => {
    setLoading(true);
    try {
      const response = await getContracts();
      if (response.success && response.data) {
        setItems(response.data as ContractRecord[]);
        if (response.data.length === 0) {
          setShowCreate(true);
        }
      } else toast.error(response.message || "No se pudieron obtener los contratos.");
    } catch {
      toast.error("Error al obtener los contratos.");
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
    fnItems();
    if (session?.user) checkEditableClient();
  }, [session?.user]);

  const handleRefresh = () => {
    fnItems();
    setSelectedItem(null);
    setShowCreate(false);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Contratos y Nombramientos</p>
      {items.length ? (
        <Table items={items} loading={loading} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      ) : (
        <div className="bg-mantle p-4 rounded-md font-text font-semibold text-lavender text-center">No hay registros</div>
      )}

      {selectedItem && <Modify item={selectedItem} onUpdated={handleRefresh} setSelectedItem={setSelectedItem} user_id={session.user.id} edit={canEdit} />}

      {!showCreate && items.length > 0 && (
        <div className="flex flex-row items-center gap-2 font-text font-semibold text-subtext0">
          <p className="border-mauve border-b-2 hover:border-b-4 font-special hover:font-bold text-mauve cursor-pointer" onClick={() => setShowCreate(true)}>
            Registrar
          </p>
          <p>nuevo contrato.</p>
        </div>
      )}

      {showCreate && (
        <Create
          onCreated={handleRefresh}
          setSelectedItem={setSelectedItem}
          onCancel={() => setShowCreate(false)}
          showCancel={items.length > 0}
          user_id={session.user.id}
          edit={canEdit}
        />
      )}
    </div>
  );
};
