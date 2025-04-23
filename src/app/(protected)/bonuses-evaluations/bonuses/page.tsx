"use server";

import React from "react";

import { auth } from "@/auth";
import { PageContent } from "@/components/page-context";

const pageContent = {
  title: "Bonificaciones",
  description: "Registra aquí tus bonificaciones personales y familiares para fines de escalafón laboral.",
  sections: [
    {
      title: "Tipos de Bonificaciones",
      description: "Selecciona y registra las bonificaciones correspondientes para mantener actualizado tu escalafón en el Gobierno Regional de Ayacucho.",
      cards: [
        {
          title: "Bonificación Personal",
          description: "Registra las bonificaciones personales obtenidas por desempeño laboral o méritos específicos.",
          path: "/bonuses-evaluations/bonuses/personal",
        },
        {
          title: "Bonificación Familiar",
          description: "Registra bonificaciones relacionadas con cargas familiares según las normas vigentes.",
          path: "/bonuses-evaluations/bonuses/family",
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
