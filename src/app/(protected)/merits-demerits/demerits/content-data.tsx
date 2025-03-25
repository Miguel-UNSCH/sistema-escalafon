"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TableData } from "./table-data";
import { FormData } from "./form-data";
import { demeritoRecord, getDemeritos } from "@/actions/m-d-action";
import { Session } from "next-auth";

export const ContentData = ({ session }: { session: Session }) => {
  const [items, setItems] = useState<demeritoRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<demeritoRecord | null>(null);
  const [showCreate, setShowCreate] = useState<boolean>(false);

  const fnItems = async () => {
    setLoading(true);
    try {
      const response = await getDemeritos();
      if (response.success && response.data) {
        setItems(response.data);
        if (response.data.length === 0) setShowCreate(true);
      } else toast.error(response.message || "No se pudieron obtener los deméritos.");

      // eslint-disable-next-line no-unused-vars
    } catch {
      toast.error("Error al obtener los deméritos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fnItems();
  }, []);

  const handleRefresh = () => {
    fnItems();
    setSelectedItem(null);
    setShowCreate(false);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Deméritos</p>
      {items.length ? (
        // <Table meritos={items} loading={loading} selectedMerito={selectedItem} setSelectedMerito={setSelectedItem} />
        <p>xd</p>
      ) : (
        <div className="bg-mantle p-4 rounded-md font-text font-semibold text-lavender text-center">No hay registros</div>
      )}

      {/* {selectedMerito && <Modify merito={selectedMerito} onUpdated={handleRefresh} setSelectedMerito={setSelectedMerito} user_id={session.user.id} />} */}

      {!showCreate && items.length > 0 && (
        <div className="flex flex-row items-center gap-2 font-text font-semibold text-subtext0">
          <p className="border-mauve border-b-2 hover:border-b-4 font-special hover:font-bold text-mauve cursor-pointer" onClick={() => setShowCreate(true)}>
            Registrar
          </p>
          <p>otro deméritos.</p>
        </div>
      )}

      {showCreate && <FormData fetchDemeritos={fnItems} />}
    </div>
  );
};
