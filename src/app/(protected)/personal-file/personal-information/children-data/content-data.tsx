"use client";

import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { childrenRecord, getChilds } from "@/actions/children-action";
import { getCurrentPersonal } from "@/actions/personal-action";
import { Table } from "./table-data";
import { Create } from "./form-data";
import { Modify } from "./modify-data";

export const ContentData = ({ session }: { session: any }) => {
  const [items, setItems] = useState<childrenRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<childrenRecord | null>(null);
  const [numeroHijos, setNumeroHijos] = useState<number | null>(null);
  const [personalExists, setPersonalExists] = useState<boolean>(true);
  const router = useRouter();

  const fetchPersonalData = async () => {
    setLoading(true);
    try {
      if (!session?.user?.email) throw new Error("No se encontró el email en la sesión.");
      const response = await getCurrentPersonal(session.user.email);
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

  useEffect(() => {
    fetchPersonalData();
  }, [session]);

  const fnChildren = async () => {
    // setLoading(true);
    try {
      const response = await getChilds();
      if (response.success && response.data) {
        setItems(response.data as childrenRecord[]);
      } else {
        toast.error(response.message || "No se pudieron obtener los hijos.");
      }
    } catch (e) {
      toast.error("Error al obtener los hijos.");
    }
    //  finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    fnChildren();
  }, []);

  const handleRefresh = async () => {
    await fetchPersonalData();
    await fnChildren();
    setSelectedItem(null);
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

      {selectedItem && <Modify item={selectedItem} onUpdated={handleRefresh} setSelectedItem={setSelectedItem} />}

      {items.length < (numeroHijos ?? 0) ? (
        <Create onCreated={handleRefresh} setSelectedItem={setSelectedItem} />
      ) : (
        <div className="flex flex-row justify-center items-center font-text">
          <p className="font-semibold text-subtext0 text-lg text-center">
            Has alcanzado el límite de hijos registrados según tus datos personales.{" "}
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
