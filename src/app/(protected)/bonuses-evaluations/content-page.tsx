"use client";

import { Boxes } from "lucide-react";
import React from "react";

export const ContentPage = () => {
  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <h2 className="font-primary font-black text-peach text-3xl tracking-tight">Bonificaciones y Evaluaciones</h2>

      <p className="font-text">En esta seccion el usuario podra registrar las bonificaciones y evaluaciones que realizo a lo largo de su vida.</p>

      <div className="flex flex-col gap-5 py-4">
        <div className="flex flex-col gap-2 pb-2">
          <h3 className="flex flex-row items-center gap-2 font-primary font-bold text-xl text-nowrap">
            <Boxes size={20} />
            Bonificaciones
          </h3>
          <p className="capitalize">
            Responsible for organisation wide matters. Such as setting the direction of the organisation, approving new ports, adding new maintainers, and cultivating a healthy
            community.
          </p>

          <div className="gap-4 grid grid-cols-3">
            <div className="flex flex-col gap-2 bg-mantle p-4 border-2 border-surface0 rounded-lg text-red hover:text-text cursor-grab select-none">
              <p className="font-special font-bold capitalize">bonificación personal</p>
              <p className="text-subtext0 text-sm">Learn how to create full-stack web applications with the Next.js App Router.</p>
            </div>

            <div className="flex flex-col gap-2 bg-mantle p-4 border-2 border-surface0 rounded-lg text-red hover:text-text cursor-grab">
              <p className="font-special font-bold capitalize">bonificación familiar</p>
              <p className="text-subtext0 text-sm">Learn how to create full-stack web applications with the Next.js App Router.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="flex flex-row items-center gap-2 font-primary font-bold text-xl text-nowrap">
            <Boxes size={20} />
            Evaluaciones
          </h3>
          <p className="capitalize">
            Responsible for organisation wide matters. Such as setting the direction of the organisation, approving new ports, adding new maintainers, and cultivating a healthy
            community.
          </p>

          <div className="gap-4 grid grid-cols-3">
            <div className="flex flex-col gap-2 bg-mantle p-4 border-2 border-surface0 rounded-lg text-red hover:text-text cursor-grab">
              <p className="font-special font-bold capitalize">ficha de evaluación</p>
              <p className="text-subtext0 text-sm">Learn how to create full-stack web applications with the Next.js App Router.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
