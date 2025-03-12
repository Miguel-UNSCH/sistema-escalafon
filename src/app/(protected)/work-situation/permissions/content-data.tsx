"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TableData } from "./table-data";
import { FormData } from "./form-data";
import { getPerLicVacs } from "@/actions/per-lic-vac-action";
import { Prisma } from "@prisma/client";

export type PerLicVacRecord = Omit<Prisma.per_lic_vacGetPayload<{ include: { cargo: true; dependencia: true } }>, "periodo"> & {
  periodo: { from: string; to: string };
};

export const ContentData = () => {
  const [perLicVacs, setPerLicVacs] = useState<PerLicVacRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPerLicVacs = async () => {
    setLoading(true);
    try {
      const response = await getPerLicVacs();
      if (response.success && response.data) {
        setPerLicVacs(response.data as PerLicVacRecord[]);
        toast.success("Tabla actualizada correctamente.");
      } else {
        toast.error(response.message || "No se pudieron obtener los permisos/licencias/vacaciones.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      toast.error("Error al obtener los permisos/licencias/vacaciones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerLicVacs();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Permisos / Licencias / Vacaciones</p>
      <TableData perLicVacs={perLicVacs} loading={loading} />
      <FormData fetchPerLicVacs={fetchPerLicVacs} />
    </div>
  );
};
