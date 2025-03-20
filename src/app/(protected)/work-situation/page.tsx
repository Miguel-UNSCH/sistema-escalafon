"use server";

import React from "react";

import { auth } from "@/auth";
import { PageContent } from "@/components/page-context";

const pageContent = {
  title: "Situación Laboral",
  description: "Registra y actualiza tu situación laboral para efectos del escalafón en el Gobierno Regional de Ayacucho.",
  sections: [
    {
      title: "Gestión Laboral",
      description: "Selecciona la categoría correspondiente para gestionar información sobre tu trayectoria y condición laboral.",
      cards: [
        {
          title: "Contratos y Nombramiento",
          description: "Gestiona información sobre contratos y nombramiento en tu carrera pública.",
          path: "/work-situation/contracts",
        },
        {
          title: "Renuncia",
          description: "Registra o consulta información relacionada con renuncias laborales.",
          path: "/work-situation/renunciation",
        },
        {
          title: "Desplazamiento",
          description: "Gestiona información sobre desplazamientos o transferencias laborales realizadas.",
          path: "/work-situation/displacement",
        },
        {
          title: "Descanso Médico",
          description: "Registra periodos de descanso médico o incapacidad laboral temporal.",
          path: "/work-situation/medical-rest",
        },
        {
          title: "Permisos / Licencias",
          description: "Administra tus solicitudes de permisos o licencias aprobadas.",
          path: "/work-situation/permissions",
        },
        {
          title: "Ascensos",
          description: "Consulta y actualiza información sobre tus ascensos laborales.",
          path: "/work-situation/promotions",
        },
      ],
    },
  ],
};

const Page = async () => {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="flex justify-center py-2 w-full">
      <PageContent content={pageContent} session={session} color="green" />
    </div>
  );
};

export default Page;
