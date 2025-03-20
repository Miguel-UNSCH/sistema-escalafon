"use server";

import React from "react";

import { auth } from "@/auth";
import { PageContent } from "@/components/page-context";

const pageContent = {
  title: "Ficha Personal",
  description: "Administra tu información personal y profesional para fines escalafonarios en el Gobierno Regional de Ayacucho.",
  sections: [
    {
      title: "Datos Personales y Profesionales",
      description: "Completa y actualiza tu información personal, académica y laboral según los requisitos escalafonarios.",
      cards: [
        {
          title: "Información Personal",
          description: "Registra y actualiza tus datos personales básicos y familiares.",
          path: "/personal-file/personal-information",
        },
        {
          title: "Estudios y Capacitación",
          description: "Administra tus registros académicos, títulos y capacitaciones obtenidas.",
          path: "/personal-file/studies-training",
        },
        {
          title: "Experiencia Laboral",
          description: "Registra tu trayectoria y experiencia laboral en instituciones públicas y privadas.",
          path: "/personal-file/experience",
        },
        {
          title: "Discapacidad",
          description: "Declara y gestiona información relacionada con condiciones de discapacidad según corresponda.",
          path: "/personal-file/disability",
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
