"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TableData } from "./table-data";
import { FormData } from "./form-data";
import { getDisabilities } from "@/actions/disability-action";
import { discapacidad } from "@prisma/client";
import { Session } from "next-auth";
import { getCurrentPersonal } from "@/actions/personal-action";

export const ContentData = ({ session }: { session: Session }) => {
  const [disabilities, setDisabilities] = useState<discapacidad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [disability, setDisability] = useState<boolean>(false);

  useEffect(() => {
    const fetchPersonalData = async () => {
      setLoading(true);

      try {
        if (!session.user.email) throw new Error("No se encontró el email en la sesión.");

        const response = await getCurrentPersonal(session.user.email);
        if (!response.success || !response.data) throw new Error(response.message || "Error al obtener datos personales.");

        setDisability(response.data.discapacidad);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Error inesperado.");
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalData();
  }, [session]);

  const fetchDisabilities = async () => {
    setLoading(true);
    try {
      const response = await getDisabilities();
      if (response.success && response.data) {
        setDisabilities(response.data);
        toast.success("Tabla actualizada correctamente.");
      } else toast.error(response.message || "No se pudieron obtener las discapacidades.");

      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener las discapacidades.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisabilities();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Discapacidad</p>
      {loading ? (
        <p className="text-subtext0 text-center">Cargando datos...</p>
      ) : !disability ? (
        <p className="font-semibold text-subtext0 text-lg text-center">
          <span className="px-2">No puedes registrar, porque no presentas discapacidad alguna.</span>
        </p>
      ) : (
        <>
          <TableData disabilities={disabilities} loading={loading} />
          <FormData fetchDisabilities={fetchDisabilities} />
        </>
      )}
    </div>
  );
};
