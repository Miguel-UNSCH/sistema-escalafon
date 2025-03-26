"use client";

import { Code, File, Folder, Grid2x2Check, Lightbulb } from "lucide-react";
import React, { useState } from "react";
import { NotesList, Table } from "./other";
import { DependenciaDoc } from "./dependencia-doc";
import { CargoDoc } from "./cargo-doc";
import { UserDoc } from "./user-doc";

export const DocComponent = () => {
  const [activeTab, setActiveTab] = useState("usuarios");

  const tabs = [
    { id: "usuarios", label: "Usuarios", component: <UserDoc />, hoverClass: "border-red text-red" },
    { id: "cargos", label: "Cargos", component: <CargoDoc />, hoverClass: "border-green text-green" },
    { id: "dependencias", label: "Dependencias", component: <DependenciaDoc />, hoverClass: "border-peach text-peach" },
  ];

  return (
    <div className="p-6 w-full">
      <h2 className="flex items-center gap-2 mb-4 font-black text-lavender text-2xl">Documentación de Subida Masiva</h2>

      <section className="flex flex-col gap-2 mb-6">
        <h3 className="flex flex-row items-center gap-0.5 font-primary font-medium text-lg">
          <Folder size={16} /> <p>Especificaciones de Archivos</p>
        </h3>

        <div className="flex flex-col gap-2 px-4">
          <Table
            headers={["Formato", "Extensión", "Tamaño Máximo", "Descripción"]}
            rows={[
              [
                "Excel",
                <span key="xlsx" className="bg-crust px-1 rounded-sm font-code text-xs">
                  .xlsx
                </span>,
                "10MB",
                "Estructura tabular con múltiples filas y columnas.",
              ],
              [
                "JSON",
                <span key="json" className="bg-crust px-1 rounded-sm font-code text-xs">
                  .json
                </span>,
                "5MB",
                "Representación en formato clave-valor.",
              ],
            ]}
          />

          <div>
            <p className="font-primary font-semibold text-subtext0 text-sm">Notas Importantes:</p>
            <NotesList
              notes={[
                "El archivo debe respetar la estructura definida en las plantillas.",
                "No se aceptan archivos de Excel en formato antiguo (.xls).",
                "JSON debe estar bien formado (sin errores de sintaxis).",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-2 mb-6">
        <h3 className="flex flex-row items-center gap-0.5 font-primary font-medium text-lg">
          <File size={16} /> <p>Estructura de los Archivos</p>
        </h3>

        <div className="flex flex-col gap-2 bg-mantle pb-4 border-2 border-surface0 rounded-md">
          <div className="flex border-surface0 border-b-2 font-primary capitalize">
            <div className="flex flex-row items-center gap-5 p-4">
              <Code />
              {tabs.map((tab) => (
                <p
                  key={tab.id}
                  className={`border-b-2 font-semibold cursor-pointer transition-colors 
                ${activeTab === tab.id ? tab.hoverClass : "border-transparent"}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </p>
              ))}
            </div>
          </div>

          <div>{tabs.find((tab) => tab.id === activeTab)?.component}</div>
        </div>

        <div className="flex flex-col gap-2 px-4">
          <p className="font-primary font-semibold text-subtext0 text-sm">Notas Importantes:</p>
          <NotesList
            notes={["Formato válido: .xlsx o .json.", "Tamaño dentro del límite permitido.", "JSON mal formado generará errores.", "Excel debe contener la estructura correcta."]}
          />
        </div>
      </section>

      <section className="flex flex-col gap-2 mb-6">
        <h3 className="flex flex-row items-center gap-0.5 font-primary font-medium text-lg">
          <Grid2x2Check size={16} /> Validaciones y Errores
        </h3>

        <div className="flex flex-col gap-2 px-4">
          <NotesList
            notes={["Formato válido: .xlsx o .json.", "Tamaño dentro del límite permitido.", "JSON mal formado generará errores.", "Excel debe contener la estructura correcta."]}
          />
        </div>
      </section>

      <section className="flex flex-col gap-2 mb-6">
        <h3 className="flex flex-row items-center gap-0.5 font-primary font-medium text-lg">
          <Lightbulb size={16} /> Recomendaciones
        </h3>

        <div className="flex flex-col gap-2 px-4">
          <NotesList
            notes={[
              "Usa la plantilla proporcionada para evitar errores.",
              "Revisa que los datos sean correctos antes de subir.",
              "Evita caracteres especiales en los nombres (@, #, etc.).",
            ]}
          />
        </div>
      </section>
    </div>
  );
};
