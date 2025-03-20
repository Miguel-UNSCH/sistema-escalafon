"use server";

import React from "react";

import { auth } from "@/auth";
import { PageContent } from "@/components/page-context";

const pageContent = {
  title: "Estudios y Capacitación",
  description: "Registra tus estudios académicos y capacitaciones para mantener actualizado tu escalafón en el Gobierno Regional de Ayacucho.",
  sections: [
    {
      title: "Formación Académica y Profesional",
      description: "Administra y actualiza la información sobre tus estudios superiores, grados académicos y cursos realizados.",
      cards: [
        {
          title: "Estudios",
          description: "Registra tu formación académica oficial, títulos y grados obtenidos.",
          path: "/personal-file/studies-training/studies",
        },
        {
          title: "Capacitación",
          description: "Registra los cursos, seminarios o capacitaciones realizadas durante tu trayectoria laboral.",
          path: "/personal-file/studies-training/training",
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
      <PageContent content={pageContent} session={session} color="mauve" />
    </div>
  );
};

export default Page;
