"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getCurrentSpouse, spouseRecord } from "@/actions/conyuge-action";
import { get_current_personal } from "@/actions/personal-action";
import { Session } from "next-auth";
import { CreateData } from "./form-data";
import { ModifyData } from "./modify-data";
import { checkEditable } from "@/actions/limit-time";

export const ContentData = ({ session }: { session: Session }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [estadoCivil, setEstadoCivil] = useState<string | null>(null);
  const [personalExists, setPersonalExists] = useState<boolean>(true);
  const [spouseExists, setSpouseExists] = useState<boolean>(false);
  const [spouseData, setSpouseData] = useState<spouseRecord>({} as spouseRecord);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  const router = useRouter();

  const fetchPersonalData = async () => {
    setLoading(true);
    try {
      if (!session.user.email) throw new Error("No se encontró el email en la sesión.");
      const response = await get_current_personal(session.user.id);
      if (!response.success || !response.data) {
        setPersonalExists(false);
        return;
      }
      setEstadoCivil(response.data.estado_civil);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error inesperado.");
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
    fetchPersonalData();
    if (session?.user) checkEditableClient();
  }, [session]);

  const fetchSpouseData = async () => {
    try {
      const response = await getCurrentSpouse();
      setSpouseExists(response.success && !!response.data);
      if (response.success && !!response.data) setSpouseData(response.data);
    } catch {
      toast.error("Error al cargar los datos del cónyuge.");
    }
  };

  useEffect(() => {
    if (estadoCivil === "c") {
      fetchSpouseData();
    }
  }, [estadoCivil]);

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

  if (estadoCivil !== "c") {
    return (
      <div className="flex flex-row justify-center items-center font-text">
        <p className="font-semibold text-subtext0 text-lg text-center">No puedes registrar, porque no estás casado.</p>
        <button
          className="mx-2 hover:border-mauve hover:border-b-2 font-semibold text-mauve cursor-pointer"
          onClick={() => router.push("/personal-file/personal-information/personal-data")}
        >
          Modificar datos personales
        </button>
      </div>
    );
  }

  const handleRefresh = async () => {
    await fetchPersonalData();
    if (estadoCivil === "c") {
      await fetchSpouseData();
    }
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-2 w-full max-w-5xl">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Datos del conyuge</p>
      {spouseExists ? <ModifyData spouseData={spouseData} onRefresh={handleRefresh} edit={canEdit} /> : <CreateData onRefresh={handleRefresh} edit={canEdit} />}
    </div>
  );
};
