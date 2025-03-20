"use server";

import React from "react";

import { auth } from "@/auth";
import { PageContent } from "@/components/page-context";

const pageContent = {
  title: "Bonificaciones y Evaluaciones",
  description: "Registra tus bonificaciones y evaluaciones obtenidas en tu trayectoria laboral.",
  sections: [
    {
      title: "Gestión de Escalafón",
      description: "Administra tu información relacionada a bonificaciones y evaluaciones para actualizar tu nivel escalafonario en el Gobierno Regional de Ayacucho.",
      cards: [
        {
          title: "Bonificaciones",
          description: "Registra y actualiza tus bonificaciones obtenidas durante tu servicio público.",
          path: "/bonuses-evaluations/bonuses",
        },
        {
          title: "Evaluaciones",
          description: "Registra los resultados de tus evaluaciones laborales periódicas.",
          path: "/bonuses-evaluations/evaluations",
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
