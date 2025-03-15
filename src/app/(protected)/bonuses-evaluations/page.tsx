"use server";

import { ContentPage } from "@/components/page-context";
import React from "react";

const pageContent = {
  title: "bonificaciones y evaluaciones",
  description: "En esta sección el usuario podrá registrar las bonificaciones y evaluaciones que realizó a lo largo de su vida.",
  sections: [
    {
      title: "bonificaciones",
      description:
        "Responsible for organisation-wide matters. Such as setting the direction of the organisation, approving new ports, adding new maintainers, and cultivating a healthy community.",
      cards: [
        { title: "Bonificación Personal", description: "Learn how to create full-stack web applications with the Next.js App Router." },
        { title: "Bonificación Familiar", description: "Learn how to create full-stack web applications with the Next.js App Router." },
      ],
    },
    {
      title: "evaluaciones",
      description:
        "Responsible for organisation-wide matters. Such as setting the direction of the organisation, approving new ports, adding new maintainers, and cultivating a healthy community.",
      cards: [{ title: "Ficha de Evaluación", description: "Learn how to create full-stack web applications with the Next.js App Router." }],
    },
  ],
};

const page = () => {
  return (
    <div className="flex justify-center py-2 w-full">
      <ContentPage content={pageContent} />
    </div>
  );
};

export default page;
