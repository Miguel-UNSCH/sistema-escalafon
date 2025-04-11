"use client";

import { fn_rt_b } from "@/actions/reports-action";
import React, { useEffect, useState } from "react";

export type FnProps = {
  user_id: string;
};

export const FnB = ({ user_id }: FnProps) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true); // 🌀 loader

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true); // empieza la carga
      const res = await fn_rt_b(user_id);
      if (res.success && res.data) {
        setData(res.data);
      }
      setIsLoading(false); // termina la carga
    };

    loadData();
  }, [user_id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="border-gray-900 border-b-2 rounded-full w-8 h-8 animate-spin" />
        <span className="ml-3 text-gray-600 text-sm">Cargando datos...</span>
      </div>
    );
  }

  if (!data) {
    return <p className="p-4 text-red-500">No se pudieron cargar los datos.</p>;
  }

  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 p-4 w-full">
      <div className="flex flex-col gap-4">
        {[
          ["Apellidos y Nombres", data.name_lastname],
          ["Condición Laboral", data.cond_lab],
          ["Oficina", data.oficina],
          ["Cargo", data.cargo],
          ["Profesión", data.profesion],
          ["Nivel Remunerativo", data.n_rem],
          ["Fecha de Nacimiento", data.fecha_nac],
          ["DNI", data.dni],
        ].map(([label, value], i) => (
          <div key={i} className="flex sm:flex-row flex-col sm:items-center sm:gap-4">
            <p className="w-48 font-primary font-semibold text-sm uppercase text-nowrap">{label}</p>
            <p className="font-text text-xs">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {[
          ["Reg. Lab.", data.reg_lab],
          ["Meta", data.meta],
          ["Lug. Nac.", data.lug_nac],
          ["Est Civil", data.est_civil],
          ["Domic.", data.domicilio],
          ["tipo contrato", data.t_contract],
          ["Motivo", data.motivo],
          ["Fecha", data.fecha],
        ].map(([label, value], i) => (
          <div key={i} className="flex sm:flex-row flex-col sm:items-center sm:gap-4">
            <p className="w-40 font-primary font-semibold text-sm uppercase">{label}</p>
            <p className="font-text text-xs">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
