"use client";

import React from "react";

// oxlint-disable-next-line no-unused-vars
export const FnB = ({ user_id }: FnProps) => {
  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 p-4 w-full">
      <div className="flex flex-col gap-4">
        {[
          ["Apellidos y Nombres", "Aguilar Trujillano William"],
          ["Condición Laboral", "Contratado en Proyecto de Inversión"],
          ["Oficina", "Meta - 164"],
          ["Cargo", "Asistente Legal"],
          ["Profesión", ""],
          ["Nivel Remunerativo", ""],
          ["Fecha de Nacimiento", "Fecha de nacimiento"],
          ["DNI", "40962870"],
        ].map(([label, value], i) => (
          <div key={i} className="flex sm:flex-row flex-col sm:items-center sm:gap-4">
            <p className="w-48 font-primary font-semibold text-sm uppercase text-nowrap">{label}</p>
            <p className="font-special text-xs uppercase">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {[
          ["Reg. Lab.", ""],
          ["Reg. Pens.", ""],
          ["Lug. Nac.", ""],
          [".Est Civil", ""],
          ["Domic.", "Psj. Raul Yangali S/N Huanta"],
          ["", ""],
          ["Motivo", "Pago de Vacaciones Truncas"],
          ["Fecha", "05 de febrero del 2025"],
        ].map(([label, value], i) => (
          <div key={i} className="flex sm:flex-row flex-col sm:items-center sm:gap-4">
            <p className="w-40 font-primary font-semibold text-sm uppercase">{label}</p>
            <p className="font-special text-xs uppercase">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export type FnProps = {
  user_id: string;
};
