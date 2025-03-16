"use server";

import React from "react";

import { auth } from "@/auth";
import { PageContent } from "@/components/page-context";

const pageContent = {
  title: "estudios y capacitación",
  description: "En esta sección el usuario podrá registrar las bonificaciones y evaluaciones que realizó a lo largo de su vida.",
  sections: [
    {
      title: "secciones",
      description:
        "Responsible for organisation-wide matters. Such as setting the direction of the organisation, approving new ports, adding new maintainers, and cultivating a healthy community.",
      cards: [
        {
          title: "estudios",
          description: "Learn how to create full-stack web applications with the Next.js App Router.",
          path: "/personal-file/studies-training/studies",
        },
        {
          title: "capacitación",
          description: "Learn how to create full-stack web applications with the Next.js App Router.",
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
