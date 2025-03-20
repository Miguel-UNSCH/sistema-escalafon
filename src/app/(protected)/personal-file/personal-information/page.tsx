"use server";

import React from "react";

import { auth } from "@/auth";
import { PageContent } from "@/components/page-context";

const pageContent = {
  title: "Información Personal",
  description: "Completa y actualiza tus datos personales y familiares para efectos del registro escalafonario del Gobierno Regional de Ayacucho.",
  sections: [
    {
      title: "Datos Familiares y Personales",
      description: "Gestiona información básica relacionada contigo y tu grupo familiar directo, según las normativas del escalafón.",
      cards: [
        {
          title: "Datos Personales",
          description: "Registra tus datos personales básicos, domicilio y datos de contacto.",
          path: "/personal-file/personal-information/personal-data",
        },
        {
          title: "Datos del Cónyuge",
          description: "Administra la información personal de tu cónyuge o pareja reconocida.",
          path: "/personal-file/personal-information/spouse-data",
        },
        {
          title: "Datos de los Hijos",
          description: "Registra la información personal relevante de tus hijos o dependientes directos.",
          path: "/personal-file/personal-information/children-data",
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
      <PageContent content={pageContent} session={session} color="teal" />
    </div>
  );
};

export default Page;
