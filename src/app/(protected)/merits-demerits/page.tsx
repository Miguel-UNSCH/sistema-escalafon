"use server";

import React from "react";

import { auth } from "@/auth";
import { PageContent } from "@/components/page-context";

const pageContent = {
  title: "méritos y deméritos",
  description: "En esta sección el usuario podrá registrar las bonificaciones y evaluaciones que realizó a lo largo de su vida.",
  sections: [
    {
      title: "seccioes",
      description:
        "Responsible for organisation-wide matters. Such as setting the direction of the organisation, approving new ports, adding new maintainers, and cultivating a healthy community.",
      cards: [
        { title: "méritos", description: "Learn how to create full-stack web applications with the Next.js App Router.", path: "/merits-demerits/merits" },
        { title: "deméritos", description: "Learn how to create full-stack web applications with the Next.js App Router.", path: "/merits-demerits/demerits" },
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
