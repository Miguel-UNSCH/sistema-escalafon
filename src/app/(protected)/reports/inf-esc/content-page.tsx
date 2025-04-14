"use client";

import React from "react";

export const ContentPage = ({ user_id }: { user_id: string }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <p>{user_id} </p>
      <div className="flex flex-col gap-2 w-full">
        <h2 className="bg-maroon p-2 px-4 font-primary text-[1rem] text-base uppercase">situacion laboral</h2>
        <div className="flex flex-col gap-4 gap-x-2 px-4">
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">apellidos y nombres</p>
            <p className="text-sm">: john doe marshall d teach</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">tipo y numero de documento de identidad</p>
            <p className="text-sm">: DNI - 45652541</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">sexo</p>
            <p className="text-sm">: masculino</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">fecha de nacimiento, edad y pais de nacimiento</p>
            <p className="text-sm">: 28/021981 - 43 anios - PERU</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">estado civil</p>
            <p className="text-sm">: no especificado</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">regimen laboral</p>
            <p className="text-sm">: ley 29944 - ley de reforma magistral</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">modalidad/nivel educativo</p>
            <p className="text-sm">: educacion basica regular / ebr - secundaria</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">institucion educativa</p>
            <p className="text-sm">: javier heraud perez</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">cargo actual</p>
            <p className="text-sm">: profesor</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">situacion laboral</p>
            <p className="text-sm">: en actividad</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">fecha de corte</p>
            <p className="text-sm">: 15.03.2024</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">tiempo de servicio</p>
            <p className="text-sm">: 0 anios 5 meses 15 dias</p>
          </div>
        </div>
      </div>

      <h2 className="bg-maroon p-2 px-4 font-primary text-[1rem] text-base uppercase">informacion detallada de la hoja de vida</h2>
      <div className="flex flex-col gap-2 w-full">
        <h3 className="bg-maroon p-2 px-4 font-primary text-[1rem] text-base uppercase">seccion 1: filiacion e identificacion</h3>
        <div className="flex flex-col gap-4 gap-x-2 px-4">
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">apellidos y nombres</p>
            <p className="text-sm">: john doe marshall d teach</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">tipo y numero de documento de identidad</p>
            <p className="text-sm">: DNI - 45652541</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">sexo</p>
            <p className="text-sm">: masculino</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">fecha de nacimiento, edad y pais de nacimiento</p>
            <p className="text-sm">: 28/021981 - 43 anios - PERU</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">estado civil</p>
            <p className="text-sm">: no especificado</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">regimen laboral</p>
            <p className="text-sm">: ley 29944 - ley de reforma magistral</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">modalidad/nivel educativo</p>
            <p className="text-sm">: educacion basica regular / ebr - secundaria</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">institucion educativa</p>
            <p className="text-sm">: javier heraud perez</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">cargo actual</p>
            <p className="text-sm">: profesor</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">situacion laboral</p>
            <p className="text-sm">: en actividad</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">fecha de corte</p>
            <p className="text-sm">: 15.03.2024</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm uppercase">tiempo de servicio</p>
            <p className="text-sm">: 0 anios 5 meses 15 dias</p>
          </div>
        </div>
      </div>
    </div>
  );
};
