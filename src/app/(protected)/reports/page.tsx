"use server";

import React from "react";

import { auth } from "@/auth";
import { PageContent } from "@/components/page-context";

const pageContent = {
  title: "Reportes",
  description:
    "En esta sección el usuario podrá generar reportes sobre su información personal y su historial de servicios, permitiendo visualizar y respaldar su trayectoria laboral.",
  sections: [
    {
      title: "Secciones",
      description: "Genera reportes detallados sobre distintos aspectos del expediente del servidor, como su información personal registrada y el cómputo de tiempo de servicios.",
      cards: [
        {
          title: "Ficha personal",
          description: "Visualiza y descarga un reporte con los datos personales y laborales registrados en el sistema.",
          path: "/reports/ficha-personal",
        },
        {
          title: "Cómputo de tiempo",
          description: "Obtén un reporte del tiempo de servicios acumulado según los registros oficiales del sistema.",
          path: "/reports/time",
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
      <PageContent content={pageContent} session={session} color="peach" />
    </div>
  );
};

export default Page;
