"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Table } from "./table-data";
import { discapacidadRecord, getDisabilities } from "@/actions/disability-action";
import { Personal } from "@prisma/client";
import { get_current_personal } from "@/actions/personal-action";
import { Create } from "./form-data";
import { Modify } from "./modify-data";
import { checkEditable } from "@/actions/limit-time";

interface ContentDataProps {
  userId?: string;
  user_id?: string;
}

export const ContentData = ({ userId, user_id }: ContentDataProps) => {
  const [items, setItems] = useState<discapacidadRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [disability, setDisability] = useState<boolean | null>(null);
  const [personalData, setPersonalData] = useState<Personal | null>(null);
  const [selectedItem, setSelectedItem] = useState<discapacidadRecord | null>(null);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const router = useRouter();
  const [canEdit, setCanEdit] = useState<boolean>(false);

  const id = (user_id ?? userId) || "";

  useEffect(() => {
    const fnPersonalData = async () => {
      setLoading(true);
      try {
        if (!id) return;
        const response = await get_current_personal(id);
        if (!response.success || !response.data) {
          setPersonalData(null);
          throw new Error("Datos personales aún no registrados.");
        }
        setDisability(response.data.discapacidad);
        setPersonalData(response.data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Error inesperado.");
      } finally {
        setLoading(false);
      }
    };

    fnPersonalData();
  }, [id]);

  const checkEditableClient = async () => {
    try {
      const res = await checkEditable();
      if (res.success && res.editable) setCanEdit(res.editable);
    } catch {
      setCanEdit(false);
    }
  };

  const fnDisabilities = async () => {
    setLoading(true);
    try {
      const response = await getDisabilities();
      if (response.success && response.data) {
        setItems(response.data);
        if (response.data.length === 0) setShowCreate(true);
      } else toast.error(response.message || "No se pudieron obtener las discapacidades.");
    } catch {
      toast.error("Error al obtener las discapacidades.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fnDisabilities();
    if (id) checkEditableClient();
  }, [id]);

  const handleRefresh = () => {
    fnDisabilities();
    setSelectedItem(null);
    setShowCreate(false);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Discapacidad</p>

      {loading ? (
        <p className="text-subtext0 text-center">Cargando datos...</p>
      ) : personalData === null ? (
        <div className="flex justify-center font-text">
          <p className="font-semibold text-subtext0 text-lg text-center">
            Datos personales aún no registrados.
            <br />
          </p>
          <button
            className="mx-2 hover:border-red hover:border-b-2 font-semibold hover:font-bold text-red cursor-pointer"
            onClick={() => router.push("/personal-file/personal-information/personal-data")}
          >
            Registrar
          </button>
        </div>
      ) : disability === false ? (
        <div className="flex justify-center font-text">
          <p className="font-semibold text-subtext0 text-lg text-center">
            No puedes registrar, porque no presentas discapacidad alguna.
            <br />
          </p>
          <button
            className="mx-2 hover:border-mauve hover:border-b-2 font-semibold hover:font-bold text-mauve cursor-pointer"
            onClick={() => router.push("/personal-file/personal-information/personal-data")}
          >
            Modificar datos personales
          </button>
        </div>
      ) : (
        <>
          {items.length > 0 ? (
            <Table items={items} loading={loading} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
          ) : (
            <div className="bg-mantle p-4 rounded-md font-text font-semibold text-lavender text-center">No hay registros</div>
          )}

          {selectedItem && <Modify item={selectedItem} onUpdated={handleRefresh} setSelectedItem={setSelectedItem} edit={canEdit} />}

          {!showCreate && items.length > 0 && (
            <div className="flex flex-row items-center gap-2 font-text font-semibold text-subtext0">
              <p className="border-mauve border-b-2 hover:border-b-4 font-special hover:font-bold text-mauve cursor-pointer" onClick={() => setShowCreate(true)}>
                Registrar
              </p>
              <p>nueva discapacidad</p>
            </div>
          )}

          {showCreate && (
            <Create onCreated={handleRefresh} setSelectedItem={setSelectedItem} onCancel={() => setShowCreate(false)} showCancel={items.length > 0} edit={canEdit} id={id} />
          )}
        </>
      )}
    </div>
  );
};
