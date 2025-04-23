"use server";

import React from "react";

import { auth } from "@/auth";
import { PageContent } from "@/components/page-context";

const pageContent = {
  title: "documentos / otros",
  description: "En esta sección el usuario podrá registrar  documentos relevantes obtenidos durante su trayectoria profesional.",
  sections: [
    {
      title: "Secciones",
      description:
        "Accede a las diferentes categorías de documentos asociados a tu historial laboral, como constancias de participación, evaluaciones internas y otros archivos relacionados.",
      cards: [
        {
          title: "Documentos",
          description: "Sube y gestiona documentos generales.",
          path: "/documents/doc",
        },
        {
          title: "Constancias",
          description: "Registra constancias.",
          path: "/documents/cons",
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
