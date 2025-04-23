"use server";

import React from "react";

import { auth } from "@/auth";
import { PageContent } from "@/components/page-context";

const pageContent = {
  title: "méritos y deméritos",
  description: "En esta sección el usuario podrá registrar y consultar los méritos y deméritos acumulados durante su carrera profesional.",
  sections: [
    {
      title: "Secciones",
      description: "Gestiona los reconocimientos y sanciones que forman parte del historial del servidor público, permitiendo un seguimiento transparente de su desempeño.",
      cards: [
        {
          title: "Méritos",
          description: "Registra condecoraciones, felicitaciones u otros reconocimientos obtenidos en el ejercicio de funciones.",
          path: "/merits-demerits/merits",
        },
        {
          title: "Deméritos",
          description: "Documenta amonestaciones, sanciones u observaciones disciplinarias aplicadas durante el servicio.",
          path: "/merits-demerits/demerits",
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
      <PageContent content={pageContent} session={session} color="yellow" />
    </div>
  );
};

export default Page;
