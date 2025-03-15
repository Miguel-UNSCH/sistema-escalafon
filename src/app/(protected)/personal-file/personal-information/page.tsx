"use server";

import React from "react";

import { auth } from "@/auth";
import { PageContent } from "@/components/page-context";

const pageContent = {
  title: "información personal",
  description: "En esta sección el usuario podrá registrar las bonificaciones y evaluaciones que realizó a lo largo de su vida.",
  sections: [
    {
      title: "secciones",
      description:
        "Responsible for organisation-wide matters. Such as setting the direction of the organisation, approving new ports, adding new maintainers, and cultivating a healthy community.",
      cards: [
        {
          title: "datos personales",
          description: "Learn how to create full-stack web applications with the Next.js App Router.",
          path: "/personal-file/personal-information/personal-data",
        },
        {
          title: "datos del cónyuge",
          description: "Learn how to create full-stack web applications with the Next.js App Router.",
          path: "/personal-file/personal-information/spouse-data",
        },
        {
          title: "datos de los hijos",
          description: "Learn how to create full-stack web applications with the Next.js App Router.",
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
