"use client";

import React from "react";
import { Boxes } from "lucide-react";
import { useRouter } from "next/navigation";

import { Session } from "next-auth";
import { admin_routes } from "@/utils/other";

export interface PageContent {
  title: string;
  description: string;
  sections: {
    title: string;
    description: string;
    cards: {
      title: string;
      description: string;
      path: string;
    }[];
  }[];
}

const Card = ({ title, description, path }: { title: string; description: string; path: string }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(path);
  };

  return (
    <div className="flex flex-col gap-2 bg-mantle p-4 border-2 border-surface0 rounded-lg text-red hover:text-text cursor-pointer" onClick={handleClick}>
      <p className="font-special font-bold capitalize">{title}</p>
      <p className="text-subtext0 text-sm">{description}</p>
    </div>
  );
};

export const PageContent = ({ content, session }: { content: PageContent; session: Session }) => {
  return (
    <div className="flex flex-col gap-5 p-2 w-4/5">
      <h2 className="font-primary font-black text-peach text-3xl tracking-tight">{content.title}</h2>
      <p className="font-text">{content.description}</p>

      <div className="flex flex-col gap-5 py-4">
        {content.sections.map((section, index) => {
          const isAdminOnly = admin_routes.some((route) => section.cards.some((card) => card.path.startsWith(route)));
          if (isAdminOnly && session.user.role !== "admin") return null;

          return (
            <div key={index} className="flex flex-col gap-2 pb-2">
              <h3 className="flex flex-row items-center gap-2 font-primary font-bold text-xl text-nowrap">
                <Boxes size={20} />
                {section.title}
              </h3>
              <p className="capitalize">{section.description}</p>

              <div className="gap-4 grid grid-cols-3">
                {section.cards.map((card, cardIndex) => {
                  const isCardAdminOnly = admin_routes.some((route) => card.path.startsWith(route));

                  if (isCardAdminOnly && session.user.role !== "admin") return null;

                  return <Card key={cardIndex} title={card.title} description={card.description} path={card.path} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
