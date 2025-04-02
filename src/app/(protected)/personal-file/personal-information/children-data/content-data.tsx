"use client";

import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { childrenRecord, getChilds } from "@/actions/children-action";
import { get_current_personal } from "@/actions/personal-action";
import { Table } from "./table-data";
import { Modify } from "./modify-data";
import { Create } from "./form-data";
import { checkEditable } from "@/actions/limit-time";

interface ContentDataProps {
  userId?: string;
  user_id?: string;
}

export const ContentData = ({ userId, user_id }: ContentDataProps) => {
  const [items, setItems] = useState<childrenRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<childrenRecord | null>(null);
  const [numeroHijos, setNumeroHijos] = useState<number | null>(null);
  const [personalExists, setPersonalExists] = useState<boolean>(true);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const router = useRouter();
  const [canEdit, setCanEdit] = useState<boolean>(false);

  const id = (user_id ?? userId) || "";

  const fetchPersonalData = async () => {
    setLoading(true);
    try {
      if (!id) return;
      const response = await get_current_personal(id);
      if (!response.success || !response.data) {
        setPersonalExists(false);
        return;
      }
      setNumeroHijos(response.data.numero_hijos);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error inesperado.");
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
    fetchPersonalData();
    if (id) checkEditableClient();
  }, [id]);

  const fnChildren = async () => {
    setLoading(true);
    try {
      const response = await getChilds();
      if (response.success && response.data) {
        setItems(response.data as childrenRecord[]);
        if (response.data.length === 0) setShowCreate(true);
      } else toast.error(response.message || "No se pudieron obtener los hijos.");
    } catch {
      toast.error("Error al obtener los hijos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fnChildren();
    if (id) checkEditableClient();
  }, [id]);

  const handleRefresh = async () => {
    await fetchPersonalData();
    await fnChildren();
    setSelectedItem(null);
    setShowCreate(false);
  };

  if (loading) return <p className="text-subtext0 text-center">Cargando datos...</p>;

  if (!personalExists) {
    return (
      <div className="flex flex-row justify-center items-center font-text">
        <p className="font-semibold text-subtext0 text-lg text-center">Datos personales aún no registrados.</p>
        <button
          className="mx-2 hover:border-red hover:border-b-2 font-semibold text-red cursor-pointer"
          onClick={() => router.push("/personal-file/personal-information/personal-data")}
        >
          Registrar
        </button>
      </div>
    );
  }

  if (numeroHijos === 0) {
    return (
      <div className="flex flex-row justify-center items-center font-text">
        <p className="font-semibold text-subtext0 text-lg text-center">No puedes registrar hijos, ya que has indicado que no tienes.</p>
        <button
          className="mx-2 hover:border-red hover:border-b-2 font-semibold text-red cursor-pointer"
          onClick={() => router.push("/personal-file/personal-information/personal-data")}
        >
          Modificar datos personales
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Datos de los Hijos</p>

      {items.length ? (
        <Table items={items} loading={loading} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      ) : (
        <div className="bg-mantle p-4 rounded-md font-text font-semibold text-lavender text-center">No hay registros</div>
      )}

      {selectedItem && <Modify item={selectedItem} onUpdated={handleRefresh} setSelectedItem={setSelectedItem} edit={canEdit} />}
      {items.length < (numeroHijos ?? 0) ? (
        <>
          {!showCreate && items.length > 0 && (
            <div className="flex flex-row items-center gap-2 font-text font-semibold text-subtext0">
              <p className="border-mauve border-b-2 hover:border-b-4 font-special hover:font-bold text-mauve cursor-pointer" onClick={() => setShowCreate(true)}>
                Registrar
              </p>
              <p>datos de otro hijo.</p>
            </div>
          )}
          {showCreate && (
            <Create onCreated={handleRefresh} setSelectedItem={setSelectedItem} onCancel={() => setShowCreate(false)} showCancel={items.length > 0} edit={canEdit} id={id} />
          )}
        </>
      ) : (
        <div className="flex flex-row justify-center items-center font-text">
          <p className="font-semibold text-subtext0 text-lg text-center">
            Has alcanzado el límite de hijos registrados según tus datos personales.
            <span
              className="mx-2 hover:border-mauve hover:border-b-2 font-semibold text-mauve cursor-pointer"
              onClick={() => router.push("/personal-file/personal-information/personal-data")}
            >
              Modificar número de hijos
            </span>
          </p>
        </div>
      )}
    </div>
  );
};
